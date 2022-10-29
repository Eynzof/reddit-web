import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Stack,
} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { Layout } from '../components/Layout';
import { useDeletePostMutation, usePostsQuery } from '../gql/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

import { Text } from '@chakra-ui/react';
import { useState } from 'react';
import { UpdootSection } from '../components/UpdootSection';
import { DeleteIcon } from '@chakra-ui/icons';
const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  const [, deletepost] = useDeletePostMutation();

  // console.log(variables);

  if (!fetching && !data) {
    return <div>queried failed for some reason</div>;
  }
  return (
    <Layout>
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data!.posts.posts.map((p) =>
            // 因为缓存操作的invalide，会出现null的 post
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by: {p.creator.username}</Text>
                  <Flex align={'center'}>
                    <Text flex={1} mt={4}>
                      {p.textSnippet}
                    </Text>
                    <IconButton
                      colorScheme={'red'}
                      aria-label={'Delete Post'}
                      icon={<DeleteIcon />}
                      onClick={() => {
                        deletepost({ id: p.id });
                      }}
                    />
                  </Flex>
                </Box>
              </Flex>
            ),
          )}
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
