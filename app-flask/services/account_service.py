from flask_caching import Cache
from models.account import Account

class AccountService:
  def __init__(self, cache: Cache):
    accounts = []
    self.table_name = "accounts"
    self.cache = cache
    self.cache.set(self.table_name, accounts, timeout=0)

  def get_by_account_id(self, account_id: str):
    accounts = self.cache.get("accounts")
    account: Account | None = next((item for item in accounts if item.account_id == account_id), None)

    return account

  def get_all(self):
    return self.cache.get(self.table_name)

  def create(self, account_id, amount):
    account = Account(account_id, amount)
    accounts: list = self.cache.get(self.table_name)
    accounts.append(account)

    self.cache.set(self.table_name, accounts)

    return account

  def update(self, account: Account, amount):
    # Upate the account in the list, remove old instance of the account to be updated
    cachedAccounts: list = self.cache.get(self.table_name)
    accounts = [item for item in cachedAccounts if not (item.account_id == account.account_id)]

    account.balance = account.balance + amount
    accounts.append(account)
    self.cache.set(self.table_name, accounts)
