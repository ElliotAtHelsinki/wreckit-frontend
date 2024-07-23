'use client'
import { InputField, TextareaField, Wrapper } from '@/components'
import { CreatePostDocument, PostInput, PostsDocument } from '@/generated/graphql/graphql'
import { useAuthenticate } from '@/hooks'
import { errorMapper } from '@/utils'
import { useMutation, useQuery } from '@apollo/client'
import { Box, Button, Flex } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useRouter } from 'next/navigation'


const CreatePostPage: React.FC = () => {
  useAuthenticate()
  const router = useRouter()
  const [createPost] = useMutation(CreatePostDocument)
  const { refetch } = useQuery(PostsDocument)

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ title: '', content: '' } as PostInput}
        onSubmit={async (values, { setErrors }) => {
          const response = await createPost({ variables: { input: values } })
          const errors = response.data?.createPost.errors
          if (errors) {
            setErrors(errorMapper(errors))
          }
          else if (response.data?.createPost.post) {
            refetch()
            router.push(`/post/${response.data.createPost.post.id}`)
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Flex flexDir='column' justifyContent='center'>
              <InputField name='title' label='Title' placeholder='title' />
              <Box mt={4}>
                <TextareaField name='content' label='Content' placeholder='content' />
              </Box>
              <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting} alignSelf='center'>Create</Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}
export default CreatePostPage
