import React from 'react';
import { Box, Button } from '@blockstack/ui';
import { authenticate } from '../auth';

export const Signin = () => {
  return (    
    <Box>
      <Button onClick={() => authenticate()}>Connect</Button>
    </Box>         
  );
};
