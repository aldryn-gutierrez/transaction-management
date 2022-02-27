from datetime import datetime
import json

class Transaction:
    def __init__(self, transaction_id, amount, account_id, balance):
        self.transaction_id = transaction_id
        self.amount = amount
        self.account_id = account_id
        self.balance = balance
        self.created_at = datetime.now().astimezone().strftime("%Y-%m-%dT%H:%M:%S.%f%z")
    
    def toJson(self):
        return json.loads(json.dumps(self, default=lambda o: o.__dict__))