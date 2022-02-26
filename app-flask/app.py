import json
import pprint
from uuid import uuid1
from flask import request, jsonify, Flask
from flask_caching import Cache

from models.account import Account
from models.transaction import Transaction

config = {
    "DEBUG": True,          # some Flask specific configs
    "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 300
}

app = Flask(__name__)
# tell Flask to use the above defined config
app.config.from_mapping(config)
cache = Cache(app)

accounts = {
    "001": Account("001", 10),
    "002": Account("002", 20),
    "003": Account("003", 30)
}

transactions = []

cache.set("accounts", accounts)
cache.set("transactions", transactions)

@app.route('/ping', methods=['GET'])
def ping():
    return {"message": "pong"}, 200

@app.route('/account', methods=['GET'])
def get_accounts():
    accounts: dict[str, Account]= cache.get("accounts")
    return  {"Success": json.dump()} , 200

@app.route('/accounts/<account_id>', methods=['GET'])
def get_account(account_id):
    accounts = cache.get("accounts")
    account: Account | None = accounts[account_id]

    if account is None:
        return {"message": "Account not found"}, 404
    
    return account.toJson(), 200

@app.route('/transactions', methods=['POST'])
def post_transaction():
    data = request.get_json()
    
    accounts: dict[str, Account] = cache.get("accounts")
    if data["account_id"] not in accounts:
        # Create an account
        account = Account(data["account_id"], 0)
        accounts[data["account_id"]] = account
        cache.set("accounts", accounts)

    account = accounts[data["account_id"]]

    transaction_id = str(uuid1())
    transaction = Transaction(transaction_id, data["amount"], data["account_id"], 0)

    # Persist all account changes
    account.balance = account.balance + data["amount"]
    accounts[data["account_id"]] = account
    cache.set("accounts", accounts)

    # Persist in Transactions
    transactions: list  = cache.get("transactions")
    transactions.append(transaction)
    cache.set("transactions", transactions)

    return transaction.toJson(), 201

@app.route('/transactions/<transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    transactions: list = cache.get("transactions")
    transaction: Transaction | None = next((item for item in transactions if item.transaction_id == transaction_id), None)

    if transaction is None:
        return {"message": "Transaction not found"}, 400

    return transaction.toJson(), 200

if __name__ == '__main__':
    app.run(debug=True)
