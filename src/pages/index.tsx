import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { usePostsQuery } from '../gql/graphql';
import { Layout } from '../components/Layout';
import NextLink from 'next/link';
import { Box, Button, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });
  return (
    <Layout>
      <Flex align="center" mb={8}>
        <Heading>Reddit</Heading>
        <NextLink href={'/create-post'}>
          <Link ml="auto">create post</Link>
        </NextLink>
      </Flex>
      {!data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      <Flex>
        <Button m="auto" my={8}>
          Load More
        </Button>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
