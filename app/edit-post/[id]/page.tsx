'use client'
import { FormSuccessMessage, InputField, TextareaField, Wrapper } from '@/components'
import { PostDocument, PostInput, UpdatePostDocument } from '@/generated/graphql/graphql'
import { useAuthenticate } from '@/hooks'
import { errorMapper } from '@/utils'
import { useMutation, useQuery } from '@apollo/client'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import { useState } from 'react'

interface Props {
  params: {
    id: string
  }
}


const EditPostPage: React.FC<Props> = ({ params: { id } }) => {
  useAuthenticate()
  const { data, loading, refetch } = useQuery(PostDocument, { variables: { id } })
  const [updatePost] = useMutation(UpdatePostDocument)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  if (loading) {
    return <Text>Loading...</Text>
  }

  return (
    <Wrapper variant='small'>
      <Formik
        initialValues={{ title: data?.post?.title || '', content: data?.post?.content || '' } as PostInput}
        onSubmit={async ({ title, content }, { setErrors }) => {
          const response = await updatePost({ variables: { id, title, content } })
          const errors = response.data?.updatePost.errors
          if (errors) {
            setErrors(errorMapper(errors))
          }
          else if (response.data?.updatePost.post) {
            refetch()
            setShowSuccessMessage(true)
            setTimeout(() => {
              setShowSuccessMessage(false)
            }, 10000)
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
              {showSuccessMessage && <FormSuccessMessage message='Post successfully updated!' />}
              <Button type='submit' colorScheme='teal' mt={4} isLoading={isSubmitting} alignSelf='center'>Update</Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Wrapper>
  )
}

export default EditPostPage
