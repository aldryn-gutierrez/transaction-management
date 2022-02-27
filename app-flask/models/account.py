import json

class Account:
    def __init__(self, account_id, balance):
        self.account_id = account_id
        self.balance = balance
    
    def toJson(self):
        return json.loads(json.dumps(self, default=lambda o: o.__dict__))