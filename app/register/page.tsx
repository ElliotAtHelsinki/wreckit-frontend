'use client'
import { InputField, Wrapper } from '@/components'
import { MeDocument, RegisterDocument } from '@/generated/graphql/graphql'
import { errorMapper } from '@/utils'
import { useMutation, useQuery } from '@apollo/client'
import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'


const RegisterPage: React.FC = () => {
  const router = useRouter()
  const { refetch } = useQuery(MeDocument)
  const [register] = useMutation(RegisterDocument)
  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register({ variables: { input: values } })
          const errors = response.data?.register.errors
          if (errors) {
            setErrors(errorMapper(errors))
          }
          else if (response.data?.register.user) {
            // Successful register
            await refetch()
            router.push('/')
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='email' label='Email' placeholder='email' />
            <Box mt={4}>
              <InputField name='username' label='Username' placeholder='username' />
            </Box>
            <Box mt={4}>
              <InputField name='password' label='Password' placeholder='password' type='password' />
            </Box>
            <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting}>Register</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}
export default RegisterPage
