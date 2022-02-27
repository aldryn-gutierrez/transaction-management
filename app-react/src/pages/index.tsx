import { GetStaticPropsResult } from 'next';
import { Params } from 'next/dist/server/router';
import React, { ReactElement, useState } from 'react';
import { Grid, Box} from 'theme-ui';
import HistoricalTransactions from '../components/Transaction/HistoricalTransactions';
import TransactionCreation from '../components/Transaction/TransactionCreation';
import { AccountContext } from '../contexts/AccountContext';

export const HomePage = (): ReactElement => {
  const [accountId, setAccountId] = useState("");
  return (
    <AccountContext.Provider value={{ accountId, setAccountId }}>
      <Grid columns={"4fr 8fr"} p={3}>
        <Box sx={{ border: "1px solid black" }}>
          <TransactionCreation/>
        </Box>
        <Box sx={{ border: "1px solid black" }}>
          <HistoricalTransactions/>
        </Box>
      </Grid>
    </AccountContext.Provider>
  )
}

export function getStaticProps(): GetStaticPropsResult<Params> {
  return {
    props: {},
  };
}

export default HomePage;