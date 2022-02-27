export default interface ITransaction {
  transaction_id: string
  account_id: string;
  amount: number;
  balance?: number;
}