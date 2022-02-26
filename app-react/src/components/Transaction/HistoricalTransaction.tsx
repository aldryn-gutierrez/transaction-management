import React, { ReactElement } from 'react';
import { Flex, Text } from 'theme-ui';

const HistoricalTransaction = ():ReactElement => {
  return (
    <Flex mb={2} sx={{ border: "1px solid black", flexDirection: "column" }}>
      <Text>Transferred $7 from account 813aa1a8</Text>
      <Text>The current account balance is -$7</Text>
    </Flex>
  )
}

export default HistoricalTransaction;