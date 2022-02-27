import axios from "axios";
import { useMutation, UseMutationResult } from "react-query";
import ITransaction from "../interfaces/ITransaction";

export const useAddTransactionMutation = (
  accountId: string,
  amount: number,
  onSuccess?: (data: ITransaction) => void,
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
