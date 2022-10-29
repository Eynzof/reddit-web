import { Box, Button, Flex, Heading, Link } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useLogoutMutation, useMeQuery } from '../gql/graphql';
import { useRouter } from 'next/router';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {

  const router = useRouter();

  // default is server: paused true
  const [paused, setpaused] = useState(true);

  // browser specific code
  useEffect(() => setpaused(false), []);

  const [{ data, fetching }] = useMeQuery({
    pause: paused,
    // pause: isServer(),
    // only fetch on client side
    // pause: typeof window === 'undefined',
  });
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let body = null;

  // console.log('data:', data);

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
      <Flex align={'center'}>
        <NextLink href="/create-post">
          <Button as={Link} mr={4}>
            create post
          </Button>
        </NextLink>
        <Box mr={2}>{data.me.username}</Box>
        <Button
          onClick={async () => {
            await logout({});
            router.reload()
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
    <Flex zIndex={2} position="sticky" top={0} bg="tan" p={4}>
      <Flex flex={1} m="auto" align="center" maxW={800}>
        <NextLink href={'/'}>
          <Link>
            <Heading>Reddit</Heading>
          </Link>
        </NextLink>
        <Box ml={'auto'}>{body}</Box>
      </Flex>
    </Flex>
  );
};
