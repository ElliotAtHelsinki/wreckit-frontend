'use client'
import { FormErrorMessage, FormSuccessMessage, InputField, Wrapper } from '@/components'
import { ForgotPasswordDocument } from '@/generated/graphql/graphql'
import { errorMapper } from '@/utils'
import { useMutation } from '@apollo/client'
import { Button, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useState } from 'react'

const ForgotPasswordPage: React.FC = () => {
  const [forgotPassword] = useMutation(ForgotPasswordDocument)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ email: '' }}
        onSubmit={async ({ email }, { setErrors }) => {
          setMessage('')
          setMessageType('')
          const response = await forgotPassword({ variables: { email } })
          const errors = response.data?.forgotPassword.errors
          if (errors) {
            setErrors(errorMapper(errors))
          }
          else if (response.data?.forgotPassword.message) {
            setMessage(response.data.forgotPassword.message)
            setMessageType(response.data.forgotPassword.messageType as any)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='email' label="Enter your account's email to reset your password:" placeholder='email' />
            {
              (message && messageType == 'success') &&
              <FormSuccessMessage message={message}/>
            }
            {
              (message && messageType == 'error') &&
              <FormErrorMessage message={message}/>
            }
            <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting}>Submit</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default ForgotPasswordPage