import ITransaction from "./ITransaction";

export default interface IAccount {
  account_id: string
  balance: number;
  transactions?: Array<ITransaction>
}