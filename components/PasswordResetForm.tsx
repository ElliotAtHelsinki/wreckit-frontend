'use client'
import { FormErrorMessage, FormSuccessMessage, InputField, Wrapper } from '@/components'
import { MeDocument, ResetPasswordDocument } from '@/generated/graphql/graphql'
import { errorMapper } from '@/utils'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface Props {
  token: string
}

export const PasswordResetForm: React.FC<Props> = ({ token }) => {
  const router = useRouter()
  const [resetPassword] = useMutation(ResetPasswordDocument)
  const { refetch } = useQuery(MeDocument)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('')

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ newPassword: '' }}
        onSubmit={async ({ newPassword }, { setErrors }) => {
          const response = await resetPassword({ variables: { newPassword, token } })
          const errors = response.data?.resetPassword.errors
          if (errors) {
            setErrors(errorMapper(errors))
          }
          else if (response.data?.resetPassword.message) {
            setMessage(response.data.resetPassword.message)
            setMessageType(response.data.resetPassword.messageType as any)
            if (response.data.resetPassword.messageType == 'success') {
              await refetch()
              setTimeout(() => { router.push('/login') }, 1500)
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='newPassword' label='Enter your new password:' placeholder='password' type='password' />
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

