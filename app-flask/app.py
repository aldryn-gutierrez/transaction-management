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

@app.route('/init', methods=['GET'])
def init():

    accounts = {
        "001": Account("001", 10),
        "002": Account("002", 20),
        "003": Account("003", 30)
    }

    cache.set("accounts", accounts)
    return {"message": "Successfully initialized"}, 200


@app.route('/account', methods=['GET'])
def get_accounts():
    accounts: dict[str, Account]= cache.get("accounts")



    return  {"Success": json.dump()} , 200

@app.route('/account/<account_id>', methods=['GET'])
def get_account(account_id):
    accounts = cache.get("accounts")
    account = accounts[account_id]

    if account is None:
        return {"message": "Account not found"}, 404
    
    return account, 200

@app.route('/transaction', methods=['GET', 'POST'])
def transaction():
    authenticated_account_id = request.headers.get('account_id')
    if authenticated_account_id is None:
        return {"message": "Unauthorized"}, 401
        
    if request.method == 'POST':
        data = request.get_json()

        accounts: dict[str, Account] = cache.get("accounts")
        if authenticated_account_id not in accounts:
            return {"message": "Authenticated Account not found"}, 400

        if data["account_id"] not in accounts:
            return {"message": "Account not found"}, 400

        account = accounts[authenticated_account_id]


        # Update Account if not same as Authenticated
        is_same_account = authenticated_account_id == data["account_id"]
        balance = account.amount + data["amount"]
        if not is_same_account:
            target_account = accounts[data["account_id"]]
            target_account.amount = target_account.amount + data["amount"]
            accounts[data["account_id"]] = target_account

            # Subtract Amount from Authenticated Account
            balance = account.amount - data["amount"]

        
        # Add Authenticated Account Transactions
        transaction = Transaction(str(uuid1()), data["amount"], data["account_id"], balance)
        account.transactions.append(transaction)
        
        # Persist all account changes
        account.amount = balance
        accounts[authenticated_account_id] = account
        cache.set("accounts", accounts)

        return json.dumps([transaction.__dict__ for transaction in account.transactions]), 200
    else:
        # You probably don't have args at this route with GET
        # method, but if you do, you can access them like so:
        # yourarg = flask.request.args.get('argname')
        # your_register_template_rendering(yourarg)
        
        data = request.get_json()

        accounts: dict[str, Account] = cache.get("accounts")
        account = accounts[authenticated_account_id]

        if account is None:
            return {"message": "Account not found"}, 400

        return json.dumps([transaction.__dict__ for transaction in account.transactions]), 200

if __name__ == '__main__':
    app.run(debug=True)
