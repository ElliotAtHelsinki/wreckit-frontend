'use client'
import { DeletePostDocument, DownvoteDocument, MeDocument, PostDocument, Post as PostType, RemoveDownvoteDocument, RemoveUpvoteDocument, UpvoteDocument } from '@/generated/graphql/graphql'
import { useMutation, useQuery } from '@apollo/client'
import { ArrowDownIcon, ArrowUpIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Flex, Heading, IconButton, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface Props {
  post: PostType
}

export const Post: React.FC<Props> = ({ post: p }) => {
  const { data } = useQuery(MeDocument)
  const router = useRouter()
  const { refetch } = useQuery(PostDocument)
  const [upvote, { loading: upvoting }] = useMutation(UpvoteDocument)
  const [downvote, { loading: downvoting }] = useMutation(DownvoteDocument)
  const [removeUpvote, { loading: removingUpvote }] = useMutation(RemoveUpvoteDocument)
  const [removeDownvote, { loading: removingDownvote }] = useMutation(RemoveDownvoteDocument)
  const [deletePost, { loading: deletingPost }] = useMutation(DeletePostDocument)

  return ( <Flex key={p.id} p={5} borderWidth='1px'>
      <Flex flexDir='column' mr='4' justifyContent='space-between' alignItems='center'>
        <IconButton
          aria-label='upvote-button'
          icon={<ArrowUpIcon />}
          color={p.upvoted ? 'green' : ''}
          isLoading={upvoting || removingUpvote }
          onClick={async () => {
            if (!data?.me) {
              router.push('/login')
            }
            if (p.upvoted) {
              await removeUpvote({ variables: { postID: p.id } })
              // Apollo Client automatically refetches one single post and merge it with the cache of previous posts and updating the result of useQuery(PostsDocument), so we don't need to refetch every post.
              await refetch({ id: p.id })
            }
            else {
              await upvote({ variables: { postID: p.id } })
              await refetch({ id: p.id })
            }
          }}
        />
        <Text marginY='2'>{p.points}</Text>
        <IconButton
          aria-label='downvote-button'
          icon={<ArrowDownIcon />}
          color={p.downvoted ? 'red' : ''}
          isLoading={downvoting || removingDownvote}
          onClick={async () => {
            if (!data?.me) {
              router.push('/login')
            }
            if (p.downvoted) {
              await removeDownvote({ variables: { postID: p.id } })
              await refetch({ id: p.id })
            }
            else {
              await downvote({ variables: { postID: p.id } })
              await refetch({ id: p.id })
            }
          }}
        />
      </Flex>
      <Box>
        <Link href={`/post/${p.id}`}>
          <Heading as='h3' size='md'>{p.title}</Heading>
        </Link>
        <Text>Posted by {p.author.username}</Text>
        <Text mt={4}>{p.snippet}</Text>
      </Box>
      {
        p.authorID == data?.me?.id &&
        <Flex flexDir='column' ml='auto' justifyContent='space-between' alignItems='center'>
          <Link href={`/edit-post/${p.id}`}>
            <IconButton
              aria-label='edit-button'
              icon={<EditIcon />}
            />
          </Link>
          <IconButton
            aria-label='delete-button'
            icon={<DeleteIcon />}
            colorScheme='red'
            isLoading={deletingPost}
            onClick={async () => {
              await deletePost({
                variables: { id: p.id },
                // https://stackoverflow.com/questions/63192774/apollo-client-delete-item-from-cache
                // https://www.apollographql.com/docs/react/caching/garbage-collection/#cacheevict
                update: cache => {
                  const normalizedId = cache.identify({ id: p.id, __typename: 'Post' })
                  cache.evict({ id: normalizedId })
                  cache.gc()
                }
              })
            }}
          />
        </Flex>
      }
    </Flex>
  )
}