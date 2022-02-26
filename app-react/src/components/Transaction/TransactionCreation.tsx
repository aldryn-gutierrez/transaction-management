import React from 'react';
import { ReactElement } from 'react';
import { Heading } from 'theme-ui';
import TransactionForm from './TransactionForm';

const TransactionCreation = () : ReactElement => {
  return (
    <React.Fragment>
      <Heading>Submit New Transaction</Heading>
      <TransactionForm />
    </React.Fragment>
  );
}

export default TransactionCreation;