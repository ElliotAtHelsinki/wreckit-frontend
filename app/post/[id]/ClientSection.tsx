'use client'
import { DeletePostDocument, PostQuery } from '@/generated/graphql/graphql'
import { useMutation } from '@apollo/client'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, IconButton, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

interface Props {
  data: PostQuery
}

export const ClientSection: React.FC<Props> = ({ data }) => {
  const router = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef: any = useRef()
  const [deletePost] = useMutation(DeletePostDocument)

  return (
    <Flex mr='auto' alignItems='center' mt={4}>
      <Link href={`/edit-post/${data?.post?.id}`}>
        <IconButton
          aria-label='edit-button'
          icon={<EditIcon />}
          mr={4}
        />
      </Link>
      <IconButton
        aria-label='delete-button'
        icon={<DeleteIcon />}
        colorScheme='red'
        onClick={onOpen}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Post
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={async () => {
                  await deletePost({
                    variables: { id: data.post?.id! },
                    // https://stackoverflow.com/questions/63192774/apollo-client-delete-item-from-cache
                    // https://www.apollographql.com/docs/react/caching/garbage-collection/#cacheevict
                    update: cache => {
                      const normalizedId = cache.identify({ id: data.post?.id!, __typename: 'Post' })
                      cache.evict({ id: normalizedId })
                      cache.gc()
                    }
                  })
                  router.refresh()                  
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  )
}