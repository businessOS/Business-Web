import React, { useState } from 'react'

import { Box, Button, Flex } from '@chakra-ui/core'
import { Formik, Form } from 'formik'

import { withUrqlClient } from 'next-urql'

import { Wrapper } from '../components/atom/wrapper'
import { InputField } from '../components/particle/inputField'
import { createUrqlClient } from '../utils/createUrqlClient'
import { useForgotPasswordMutation } from "../generated/graphql";

const forgotPassword: React.FC<{}> = ({ }) => {
  const [complete, setComplete] = useState(false);

  const [, forgotPassword ] = useForgotPasswordMutation();
   return (
    <Wrapper small>
      <Formik
        initialValues={{ email: "" }}
        onSubmit= { async ( values ) =>  {
          await forgotPassword(values);
          setComplete(true);
        }}
      >
         {({ isSubmitting }) =>
           complete ? (
             <Flex>
               <Box>If an account with that email exists, we sent you an email...!</Box>
             </Flex>
           )
           : (<Form>
            <InputField
              name="email"
              placeholder="Email"
              label="Email"
              autoComplete="current-password"
              isRequired
            />
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
   )
}

export default withUrqlClient(createUrqlClient)(forgotPassword);
