import { Box, Button, Flex, Heading, Link, Stack } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import NextLink from 'next/link';
import { Layout } from '../components/Layout';
import { useMeQuery, usePostsQuery } from '../gql/graphql';
import { createUrqlClient } from '../utils/createUrqlClient';

import { Text } from '@chakra-ui/react';
import { useState } from 'react';
import { EditDeletePostButtons } from '../components/EditDeletePostButtons';
import { UpdootSection } from '../components/UpdootSection';
const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  const [{ data: medata }] = useMeQuery();

  // console.log(variables);

  if (!fetching && !data) {
    return (
      <div>
        <div>queried failed for some reason</div>
        <div>{error?.message}</div>
      </div>
    );
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
                    {medata?.me?.id == p.creator.id ? (
                      <EditDeletePostButtons
                        id={p.id}
                        creatorId={p.creator.id}
                      />
                    ) : null}
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
