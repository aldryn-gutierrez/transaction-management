from uuid import uuid1
from flask_caching import Cache
from models.transaction import Transaction

class TransactionService:
  def __init__(self, cache: Cache):
    transactions = []
    self.table_name = "transactions"
    self.cache = cache
    self.cache.set(self.table_name, transactions, timeout=0)

  def get_all(self):
    return self.cache.get(self.table_name)

  def create(self, amount, account_id, balance):
    transaction_id = str(uuid1())
    transaction = Transaction(transaction_id, amount, account_id, balance)
    transactions: list  = self.cache.get(self.table_name)
    transactions.append(transaction)

    self.cache.set(self.table_name, transactions)
    
    return transaction
  
  def get_by_transaction_id(self, transaction_id: str):
    transactions = self.cache.get(self.table_name)
    transaction: Transaction | None = next((item for item in transactions if item.transaction_id == transaction_id), None)

    return transaction