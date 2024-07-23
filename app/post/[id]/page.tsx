import { Wrapper } from '@/components'
import { SESSION_COOKIE_NAME } from '@/constants'
import { MeDocument, PostDocument } from '@/generated/graphql/graphql'
import { createApolloClient } from '@/lib'
import { Heading, Text } from '@chakra-ui/react'
import { cookies } from 'next/headers'
import { ClientSection } from './ClientSection'

interface Props {
  params: {
    id: string
  }
}

const PostPage: React.FC<Props> = async ({ params: { id } }) => {
  const cookieStore = cookies()
  const cookie = cookieStore.get(SESSION_COOKIE_NAME)?.value
  const apollo = createApolloClient(cookie)
  const { data } = await apollo.query({ query: PostDocument, variables: { id: parseInt(id) } })
  const { data: meData } = await apollo.query({ query: MeDocument })

  return (
    <Wrapper>
      {
        data?.post ?
          <>
            <Heading as='h3' size='md'>{data.post.title}</Heading>
            <Text>Posted by {data.post.author.username}</Text>
            <Text mt={4}>{data.post.content}</Text>
            {
              data?.post?.authorID == meData?.me?.id &&
              <ClientSection data={data} />
            }
          </>
          :
          <>Post not found!</>
      }
    </Wrapper>
  )
}
export default PostPage
