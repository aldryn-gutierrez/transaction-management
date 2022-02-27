import React, { memo, ReactElement } from 'react';
import { Flex, Text } from 'theme-ui';
import ITransaction from '../../interfaces/ITransaction';

const HistoricalTransaction = ({ transaction, isActiveClient } : { transaction: ITransaction, isActiveClient: boolean }): ReactElement => {
  return (
    <Flex 
      data-type="transaction"
      data-account-id={transaction.account_id}
      data-amount={transaction.amount}
      data-balance={transaction.balance}
      mb={2} 
      sx={{ border: "1px solid black", flexDirection: "column" }}
    >
      <Text>Transferred ${`${transaction.amount}`} {`${isActiveClient ? "from" : "to"}`} account {`${transaction.account_id}`}</Text>
      {isActiveClient && <Text>The current account balance is ${`${transaction.balance}`}</Text>}
    </Flex>
  )
}

export default memo(HistoricalTransaction);