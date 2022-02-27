import React, { useState } from 'react';
import { ReactElement } from 'react';
import { useQueryClient } from 'react-query';
import { Box, Label, Input, Button, Text } from 'theme-ui';
import { useAccounts } from '../../contexts/AccountContext';
import ITransaction from '../../interfaces/ITransaction';
// import { useAccountQuery } from '../../queries/account';
import { useAddTransactionMutation } from '../../queries/transaction';

const TransactionForm = () : ReactElement => {

  const queryClient = useQueryClient();
  
  const [accountId, setAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { setAccountId: setClientAccount } = useAccounts();

  const mutation = useAddTransactionMutation(
    accountId,
    parseFloat(amount),
    (data: ITransaction) => {
      setClientAccount(accountId);
      const transactions: Array<ITransaction> | undefined = queryClient.getQueryData(["transactions", accountId])
      if (transactions) {
        transactions.push(data)
        queryClient.setQueryData(["transactions", accountId], transactions)
      }

      // void queryClient.invalidateQueries(["transactions", accountId]);
      setAmount("");
      setAccountId("");
    }
  );

  const isUUIDValid = (accountId: string) => {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(accountId);
  }


  const handleSubmit = () => {
    setErrorMessage("")

    
    if (accountId == "" || !isUUIDValid(accountId)) {
      setErrorMessage("Please enter your Account Id");
      return;
    }

    if (amount == "" || isNaN(amount)) {
      setErrorMessage("Please enter valid amount");
      return;
    }

    mutation.mutate();
  }

  return (
    <Box 
      as="form" 
      p={2} 
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <Label htmlFor="account_id">Account Id</Label>
      <Input 
        name="account_id" 
        data-type="account-id" 
        id="account_id" 
        mb={3} 
        value={accountId}
        placeholder={"Enter your account id"}
        onChange={(event) => {
          setAccountId(event.target.value)
        }}
      />
      <Label htmlFor="amount">Amount</Label>
      <Input 
        name="amount" 
        data-type="amount" 
        id="amount" 
        mb={3} 
        value={amount}
        onChange={(event) => {
          const input = event.target.value;
          setAmount(input)
        }}
      />
      <Button type="submit" data-type="transaction-submit" >Submit</Button>
      {errorMessage && <Text ml={1} color={"red"}>{errorMessage}</Text>}
    </Box>
  );
}

export default TransactionForm;