import axios from "axios";
import { QueryObserverResult, useMutation, UseMutationResult, useQuery } from "react-query";
import ITransaction from "../interfaces/ITransaction";

export const useAddTransactionMutation = (
  accountId: string,
  amount: number,
  onSuccess?: VoidFunction,
): UseMutationResult<ITransaction, unknown, void, unknown> => {
  return useMutation(async () => {
    const { data } = await axios.request<ITransaction>({
      method: "POST",
      url: `http://localhost:5000/transactions`,
      data: {
        account_id: accountId,
        amount
      },
    });
  
    return data;
  },
  {
    onSuccess: onSuccess
  });
};

export const useTransactionsQuery = (): QueryObserverResult<Array<ITransaction>> => {
  return useQuery(
    ["transactions"],
    async () => {
      const { data } = await axios.request<Array<ITransaction>>({
        method: "GET",
        url: `http://localhost:5000/transactions`,
      });
    
      return data;
    }
  );
};
