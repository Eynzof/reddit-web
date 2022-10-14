import React from "react";
import { Field, Form, Formik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";

// import { useRegisterMutation } from "../../../reddit/src/gql/index";
import { useRegisterMutation } from "../gql/graphql";

interface registerProps {}


export const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, {setErrors}) => {
          const response = await register(values); 
          if (response.data?.register.errors) {
          
            setErrors({username:"I'm an error"})
          }
        }}>
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"></InputField>
            <Box mt="4">
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"></InputField>
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal">
              register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
