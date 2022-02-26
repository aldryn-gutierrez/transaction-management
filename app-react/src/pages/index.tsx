import { GetStaticPropsResult } from 'next';
import { Params } from 'next/dist/server/router';
import React, { ReactElement } from 'react';
import { Grid, Box} from 'theme-ui';
import HistoricalTransactions from '../components/Transaction/HistoricalTransactions';
import TransactionCreation from '../components/Transaction/TransactionCreation';

export const HomePage = (): ReactElement => {
  return (
    <Grid columns={"4fr 8fr"} p={3}>
      <Box sx={{ border: "1px solid black" }}>
        <TransactionCreation/>
      </Box>
      <Box sx={{ border: "1px solid black" }}>
        <HistoricalTransactions/>
      </Box>
    </Grid>
  )
}

export function getStaticProps(): GetStaticPropsResult<Params> {
  return {
    props: {},
  };
}

export default HomePage;