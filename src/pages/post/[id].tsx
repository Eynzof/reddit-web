import { Box, Heading } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { Layout } from '../../components/Layout';
import { usePostQuery } from '../../gql/graphql';
import { createUrqlClient } from '../../utils/createUrqlClient';

export const Post = ({}) => {
  const router = useRouter();
  // 根据路由传入的参数解析出postid
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;

  // intId: 318
  console.log('intId:', intId);
  const [{ data, error, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  console.log('fetching', fetching);
  // undefined
  console.log('data', data);
  if (fetching) {
    return <Layout>loading ...</Layout>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>could not find post</Box>
      </Layout>
    );
  }
  return (
    <Layout>
      <Heading mb={4}>{data?.post?.title}</Heading>
      {data?.post?.text}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
