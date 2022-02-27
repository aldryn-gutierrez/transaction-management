import React, { ReactElement } from 'react';
import { Box, Heading } from 'theme-ui';
import { useAccounts } from '../../contexts/AccountContext';
import { useTransactionsQuery } from '../../queries/transaction';
import HistoricalTransaction from './HistoricalTransaction';

const HistoricalTransactions = ():ReactElement => {
  const { accountId } = useAccounts();
  const { data: transactions, isSuccess } = useTransactionsQuery();

  return (
    <React.Fragment>
      <Heading>Historical Transaction</Heading>
      {isSuccess && (
        <Box m={2}>
          {transactions?.reverse().map(
            transaction => { 
              const isActiveClient = accountId === transaction.account_id;
              return <HistoricalTransaction key={transaction.transaction_id} transaction={transaction} isActiveClient={isActiveClient} />
            } 
          )}
        </Box>
      )}
    </React.Fragment>
  )
}

export default HistoricalTransactions;