import { createContext, useContext } from "react";

export const AccountContextInitialState = "";

export type AccountContextType = {
  accountId: string;
  setAccountId: (accountId: string) => void;
};

export const AccountContext = createContext<AccountContextType>({
  accountId: AccountContextInitialState,
  setAccountId: () => console.warn("no account provider"),
});

export const useAccounts = (): AccountContextType =>
  useContext(AccountContext);
