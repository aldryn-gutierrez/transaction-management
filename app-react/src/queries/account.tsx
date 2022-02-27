import axios from "axios";
import { QueryObserverResult, useQuery } from "react-query";
import IAccount from "../interfaces/IAccount";
import ITransaction from "../interfaces/ITransaction";

export const useAccountTransactionsQuery = (accountId: string): QueryObserverResult<Array<ITransaction>> => {
  return useQuery(
    ["transactions", accountId],
    async () => {
      const { data } = await axios.request<IAccount>({
        method: "GET",
        url: `http://localhost:5000/accounts/${accountId}`,
      });

      return data.transactions;
    },
    {
      enabled: accountId != ""
    }
  );
};
