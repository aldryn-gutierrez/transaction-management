import React, { ReactElement } from 'react';
import { Box, Heading } from 'theme-ui';
import { useAccounts } from '../../contexts/AccountContext';
import { useAccountTransactionsQuery } from '../../queries/account';
import HistoricalTransaction from './HistoricalTransaction';

const HistoricalTransactions = ():ReactElement => {
  const { accountId } = useAccounts();

  const { data: transactions, isSuccess } = useAccountTransactionsQuery(accountId);

  console.log(transactions)

  return (
    <React.Fragment>
      <Heading>Historical Transaction {accountId != "" && `For ${accountId}`}</Heading>
      {isSuccess && (
        <Box m={2}>
          {transactions?.reverse().map(
            transaction => <HistoricalTransaction key={transaction.transaction_id} transaction={transaction} /> 
          )}
        </Box>
      )}
    </React.Fragment>
  )
}

export default HistoricalTransactions;