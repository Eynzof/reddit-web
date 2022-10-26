import { Flex, Button, Box } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useEffect } from 'react';
import { InputField } from '../components/InputField';
import { useCreatePostMutation, useMeQuery } from '../gql/graphql';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClient';
import { Layout } from '../components/Layout';
const CreatePost: React.FC<{}> = ({}) => {
  const [{ data }] = useMeQuery();
  const router = useRouter();
  // == componentDidmount
  useEffect(() => {
    if (!data?.me) {
      router.replace('/login');
    }
  // Only re-run the effect if data or router changes 
  }, [data, router]);
  const [, createPost] = useCreatePostMutation();
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: '', text: '' }}
        onSubmit={async (values) => {
          console.log(values);
          const { error } = await createPost({ input: values });
          if (!error) {
            router.push('/');
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <InputField
                textarea
                name="text"
                placeholder="text..."
                label="Body"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              create post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};
export default withUrqlClient(createUrqlClient)(CreatePost);
