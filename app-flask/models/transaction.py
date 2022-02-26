import json

class Transaction:
    # Class attribute
    species = "Canis familiaris"

    def __init__(self, id, amount, account_id, balance):
        self.id = id
        self.amount = amount
        self.account_id = account_id
        self.balance = balance
    
    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__)