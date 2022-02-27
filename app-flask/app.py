import json
from flask import request, Flask
from flask_caching import Cache
from flask_cors import CORS
from services.account_service import AccountService
from services.transaction_service import TransactionService

config = {
    "DEBUG": True,          # some Flask specific configs
    "CACHE_TYPE": "SimpleCache",  # Flask-Caching related configs
    "CACHE_DEFAULT_TIMEOUT": 300
}

app = Flask(__name__)
CORS(app)
# tell Flask to use the above defined config
app.config.from_mapping(config)
cache = Cache(app)

account_service = AccountService(cache)
transaction_service = TransactionService(cache)

@app.route('/ping', methods=['GET'])
def ping():
    return {"message": "pong"}, 200

@app.route('/accounts/<account_id>', methods=['GET'])
def get_account(account_id):
    try:
        account = account_service.get_by_account_id(account_id)
    except:
        # To Add Error Logging and Rollback Mechanism here
        return {"message": "Unexpected Error Occured"}, 500

    if account is None:
        return {"message": "Account not found"}, 404

    return account.toJson(), 200

@app.route('/transactions', methods=['POST'])
def post_transaction():
    data = request.get_json()

    if (data["account_id"] is None):
        return {"message": "Please enter the account id"}, 400

    if (data["amount"] is None):
        return {"message": "Please enter the amount"}, 400
    
    try:
        account = account_service.get_by_account_id(data["account_id"])
        if account is None:
            # Create an account
            account = account_service.create(data["account_id"], 0)

        # Persist all account changes
        account_service.update(account, data["amount"])

        # Persist in Transactions
        transaction = transaction_service.create(data["amount"], data["account_id"], account.balance)
    except:
        # To Add Error Logging and Rollback Mechanism here
        return {"message": "Unexpected Error Occured"}, 500

    return transaction.toJson(), 201

@app.route('/transactions/<transaction_id>', methods=['GET'])
def get_transaction(transaction_id):
    try:
        transaction = transaction_service.get_by_transaction_id(transaction_id) 
    except:
        # To Add Error Logging and Rollback Mechanism here
        return {"message": "Unexpected Error Occured"}, 500

    if transaction is None:
        return {"message": "Transaction not found"}, 400

    return transaction.toJson(), 200

@app.route('/transactions', methods=['GET'])
def get_transactions():
    try:
        transactions = transaction_service.get_all() 
    except:
        # To Add Error Logging and Rollback Mechanism here
        return {"message": "Unexpected Error Occured"}, 500

    return json.dumps(transactions, default=lambda x: x.__dict__), 200

if __name__ == '__main__':
    app.run(debug=True)
