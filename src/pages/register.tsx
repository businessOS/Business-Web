import React from "react";
import { Formik, Form } from "formik";
import {
  Box,
  Button,
} from "@chakra-ui/core";
import { Wrapper } from "../components/atom/wrapper";
import { InputField } from "../components/particle/inputField";
import { useMutation } from "urql";

interface registerProps { }

const REGISTER_MUT = `
  mutation Register($username: String!, $password: String!) {
    register(options: { username: $username, password:$password }) {
      errors {
        field
        message
      }
      user {
        _id
        username
      }
    }
  }
`;

const Register: React.FC<registerProps> = ({ }) => {
  const [, register] = useMutation(REGISTER_MUT)
  return (
    <Wrapper small>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit= { async (values) =>  {
          const response = await register(values);
          return response
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username"
              isRequired
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
                isRequired
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;