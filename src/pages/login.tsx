import React from "react";

import { useRouter } from "next/router";
import NextLink from "next/link";

import { Formik, Form } from "formik";
import {
  Box,
  Button,
  Flex,
  Link,
} from "@chakra-ui/core";

import { Wrapper } from "../components/atom/wrapper";
import { InputField } from "../components/particle/inputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMaps";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface loginProps { }

const Login: React.FC<loginProps> = ({ }) => {
  const router = useRouter();
  const [, login] = useLoginMutation()
  return (
    <Wrapper small>
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit= { async (values, { setErrors }) =>  {
          const response = await login(values);
          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
          return response
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="usernameOrEmail"
              placeholder="Username or Email"
              label="Username or Email"
              autoComplete="current-password"
              isRequired
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="password"
                label="Password"
                type="password"
                isRequired
                autoComplete="current-password"
              />
            </Box>
            <Flex mt={2}>
              <NextLink href="/forgot-password">
                <Link ml={"auto"}>forgot password?</Link>
              </NextLink>
            </Flex>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Login
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);