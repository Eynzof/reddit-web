import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../gql/graphql';
import { Layout } from '../components/Layout';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
} from '@chakra-ui/react';

import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import { useState } from 'react';
import { UpdootSection } from '../components/UpdootSection';
const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  // console.log(variables);

  if (!fetching && !data) {
    return <div>queried failed for some reason</div>;
  }
  return (
    <Layout>
      <Flex align="center" mb={8}>
        <Heading>Reddit</Heading>
        <NextLink href={'/create-post'}>
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) => (
            <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
              <UpdootSection post={p} />
              <Box>
                <Heading fontSize="xl">{p.title}</Heading>
                <Text>posted by: {p.creator.username}</Text>
                <Text mt={4}>{p.textSnippet}</Text>
              </Box>
            </Flex>
          ))}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
            isLoading={fetching}
            m="auto"
            my={8}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
