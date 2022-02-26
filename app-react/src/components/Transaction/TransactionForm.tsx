import React from 'react';
import { ReactElement } from 'react';
import { Box, Label, Input, Button } from 'theme-ui';

const TransactionForm = () : ReactElement => {
  return (
    <Box as="form" p={2} onSubmit={(e) => e.preventDefault()}>
      <Label htmlFor="account_id">Account Id</Label>
      <Input name="account_id" id="account_id" mb={3} />
      <Label htmlFor="amount">Amount</Label>
      <Input name="amount" id="amount" mb={3} />
      <Button>Submit</Button>
    </Box>
  );
}

export default TransactionForm;