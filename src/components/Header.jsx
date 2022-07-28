import React from 'react';
import { Flex, Box, Text } from '@blockstack/ui';
import { userSession } from '../auth';
import { Signin } from './Signin';
import Logo from '../assets/logo.png';

const Auth = () => {
  if (!userSession.isUserSignedIn()) {
    return <Signin />
  }

  return (
    <Box>      
      <Text
        fontWeight="300"
        display="inline-block"
        ml={5}
        color="ink.400"
        cursor="pointer"
        onClick={() => {
          userSession.signUserOut();
          window.location = '/';
        }}
      >
        Sign out
      </Text>
    </Box>
  );
};

export const Header = () => {
  return (
    <Flex width="100%" justifyContent="space-between" px={4} py={3}>
      <div onClick={() => (document.location = '/')} style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
        <img src={Logo} style={{ position: 'relative', width: '40px', top: '-1px' }} alt="Logo" />
        <Text ml={2} display="inline-block" fontWeight="600">
          ChifiBot
        </Text>
      </div>
      <Auth />
    </Flex>
  );
};
