import { fireEvent, getByText, render, screen } from "@testing-library/react";
import HistoricalTransaction from "../../../src/components/Transaction/HistoricalTransaction"
import ITransaction from "../../../src/interfaces/ITransaction";
import '@testing-library/jest-dom/extend-expect';

const transaction: ITransaction = {
  transaction_id: "trans",
  account_id: "acc",
  amount: 10,
  balance: 20
}

describe("HistoricalTransaction Component display balance information correctly", () => {
  it("Renders with correct information", () => {
    render(<HistoricalTransaction transaction={transaction} isActiveClient={true} />);
    expect(screen.getByText(`Transferred $${transaction.amount} from account ${transaction.account_id}`)).toBeTruthy();
    expect(screen.getByText(`The current account balance is $${transaction.balance}`)).toBeTruthy();
  });
})

describe("HistoricalTransaction Component display balance information correctly", () => {
  it("Renders with the balance if same client", () => {
    render(<HistoricalTransaction transaction={transaction} isActiveClient={true} />);
    expect(screen.getByText(`The current account balance is $${transaction.balance}`)).toBeTruthy();
  });

  it("Renders with the balance if not same client", () => {
    render(<HistoricalTransaction transaction={transaction} isActiveClient={false} />);
    const balanceText = screen.queryByText(`The current account balance is $${transaction.balance}`)
    expect(balanceText).not.toBeInTheDocument()
  });
})
