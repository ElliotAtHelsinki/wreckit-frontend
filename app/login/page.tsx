'use client'
import { InputField, Wrapper } from '@/components'
import { LoginDocument, MeDocument, PostsDocument } from '@/generated/graphql/graphql'
import { errorMapper } from '@/utils'
import { useMutation, useQuery } from '@apollo/client'
import { Link } from '@chakra-ui/next-js'
import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter, useSearchParams } from 'next/navigation'


const LoginPage: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { refetch } = useQuery(MeDocument)
  const { refetch: refetchPosts } = useQuery(PostsDocument)
  const [login] = useMutation(LoginDocument)

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ variables: { input: values } })
          const errors = response.data?.login.errors
          if (errors) {
            setErrors(errorMapper(errors))
          }
          else if (response.data?.login.user) {
            // Successful login
            await refetch()   // Refetch client-side
            await refetchPosts()
            const destination = searchParams.get('redirect')
            if (destination) {
              router.push(destination)
            }
            else {
              router.push('/')
            }
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name='username' label='Username' placeholder='username' />
            <Box mt={4}>
              <InputField name='password' label='Password' placeholder='password' type='password' />
            </Box>
            <Box mt={4}>
              <Link href='/forgot-password'>Forgot password?</Link>
            </Box>
            <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting}>Login</Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}
export default LoginPage
