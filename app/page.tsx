'use client'
import { Post, Wrapper } from '@/components'
import { PostsDocument } from '@/generated/graphql/graphql'
import { useQuery } from '@apollo/client'
import { Link } from '@chakra-ui/next-js'
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { useState } from 'react'


const Home = (): React.ReactNode => {
  // https://www.apollographql.com/docs/react/pagination/core-api/
  const { data, loading, fetchMore } = useQuery(PostsDocument)
  const [doesntHaveMore, setDoesntHaveMore] = useState(false)

  return (
    <Box w='100%'>
      <Wrapper>
        <Flex mb={4} w='100%'>
          <Heading as='h3' size='lg'>WreckIt</Heading>
          <Link href='/create-post' ml='auto'>
            <Button>Create Post</Button>
          </Link>
        </Flex>
        <Flex flexDir='column' alignItems='center'>
          {
            loading && !data?.posts &&
            <Text>Loading...</Text>
          }
          <Stack spacing={4} mb={4}>
            {
              data?.posts.map(p => <Post post={p} />)
            }
          </Stack>

          <Flex w='100%'>
            {
              (data?.posts?.length && !doesntHaveMore) ?
                <Button
                  onClick={async () => {
                    const result = await fetchMore({ variables: { cursor: data.posts[data.posts.length - 1].createdAt } })
                    if (result.data.posts.length == 0) {
                      setDoesntHaveMore(true)
                    }
                  }}
                  m='auto'
                >
                  More
                </Button>
                : <></>
            }
          </Flex>
        </Flex>
      </Wrapper>
    </Box>
  )
}

export default Home
