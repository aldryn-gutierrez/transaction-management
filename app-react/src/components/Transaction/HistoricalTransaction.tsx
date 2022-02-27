import React, { ReactElement } from 'react';
import { Flex, Text } from 'theme-ui';
import { useAccounts } from '../../contexts/AccountContext';
import ITransaction from '../../interfaces/ITransaction';

const HistoricalTransaction = ({ transaction } : { transaction: ITransaction }):ReactElement => {
  return (
    <Flex 
      data-type="transaction"
      data-account-id={transaction.account_id}
      data-amount={transaction.amount}
      data-balance={transaction.balance}
      mb={2} 
      sx={{ border: "1px solid black", flexDirection: "column" }}
    >
      <Text>Transferred ${`${transaction.amount}`} from account {`${transaction.account_id}`}</Text>
      <Text>The current account balance is ${`${transaction.balance}`}</Text>
    </Flex>
  )
}

export default HistoricalTransaction;