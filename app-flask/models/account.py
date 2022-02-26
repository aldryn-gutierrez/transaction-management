import json


class Account:
    # Class attribute
    species = "Canis familiaris"

    def __init__(self, id, amount):
        self.id = id
        self.amount = amount
        self.transactions = []
    
    def toJson(self):
        return json.dumps(self, default=lambda o: o.__dict__, 
            sort_keys=True, indent=4)