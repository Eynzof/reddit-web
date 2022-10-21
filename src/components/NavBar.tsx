import { Box, Button, Flex, Link } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../gql/graphql';
import { isServer } from '../utils/isServer';

import { useRouter } from 'next/router';
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  let isServer: true;



  const [{ data, fetching }] = useMeQuery({
    // only fetch on client side
    // pause: typeof window === 'undefined',
    // pause: isServer;
  });
  // if (typeof window !== 'undefined') {
  //   // Client-side-only code
  // }
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  // console.log(router.pathname);
  // console.log(isServer());
  console.log('data:', data);

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2}>login</Link>
        </NextLink>
        <NextLink href="/register">
          <Link>register</Link>
        </NextLink>
      </>
    );
    // user is logged in
  } else {
    body = (
      <Flex>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={() => {
            logout({});
          }}
          isLoading={logoutFetching}
          variant="link"
        >
          logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" p={4}>
      <Box ml={'auto'}>{body}</Box>
    </Flex>
  );
};
