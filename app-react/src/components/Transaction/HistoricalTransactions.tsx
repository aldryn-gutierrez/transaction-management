import React, { ReactElement } from 'react';
import { Box, Heading } from 'theme-ui';
import HistoricalTransaction from './HistoricalTransaction';

const HistoricalTransactions = ():ReactElement => {
  return (
    <React.Fragment>
      <Heading>Historical Transaction</Heading>
      <Box m={2}>
        <HistoricalTransaction />
        <HistoricalTransaction />
        <HistoricalTransaction />
      </Box>
    </React.Fragment>
  )
}

export default HistoricalTransactions;