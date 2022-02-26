import json

class Transaction:
    # Class attribute
    species = "Canis familiaris"

    def __init__(self, transaction_id, amount, account_id, balance):
        self.transaction_id = transaction_id
        self.amount = amount
        self.account_id = account_id
        self.balance = balance
    
    def toJson(self):
        return json.loads(json.dumps(self, default=lambda o: o.__dict__))