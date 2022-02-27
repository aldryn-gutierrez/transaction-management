import axios from "axios";
import { QueryObserverResult, useMutation, UseMutationResult, useQuery } from "react-query";
import ITransaction from "../interfaces/ITransaction";

const ENDPOINT_URL = "http://localhost:5000/transactions"; // Move to config

export const useAddTransactionMutation = (
  accountId: string,
  amount: number,
  onSuccess?: VoidFunction,
): UseMutationResult<ITransaction, unknown, void, unknown> => {
  return useMutation(async () => {
    const { data } = await axios.request<ITransaction>({
      method: "POST",
      url: ENDPOINT_URL,
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
        url: ENDPOINT_URL,
      });
    
      return data;
    }
  );
};
