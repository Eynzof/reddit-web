import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMeQuery } from "../gql/graphql";
interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();

  console.log(data);

  let body = null;

  // data is loading
  if (fetching) {
    // user not logged in
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link mr={2} color={"white"}>
            login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color={"white"}>register</Link>
        </NextLink>
      </>
    );
  } else {
    body = <Box>{data.me.username}</Box>;
  }
  return (
    <Flex bg="tomato" p={4}>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
