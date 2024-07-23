'use client'
import { LogoutDocument, MeDocument } from '@/generated/graphql/graphql'
import { useMutation, useQuery } from '@apollo/client'
import { Link } from '@chakra-ui/next-js'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'

const NavBar: React.FC = () => {
  const { data, loading, refetch } = useQuery(MeDocument)
  const [logout] = useMutation(LogoutDocument)
  const router = useRouter()
  const pathname = usePathname()

  return (
    <Flex bgColor='tan' paddingY={4} paddingX={6} ml='auto' minH='72px' alignItems='center'>
      <Box mr='auto'>
        <Link href='/'>
          <Button>Home</Button>
        </Link>
      </Box>
      <Box ml='auto'>
        {
          loading &&
          <Text>Loading...</Text>
        }
        {
          !loading && !data?.me &&
          <>
            <Link href='/login' mr={4}>
              <Button>Login</Button>
            </Link>
            <Link href='/register' mr={4}>
              <Button>Register</Button>
            </Link>
          </>
        }
        {
          data?.me &&
          <Flex alignItems='center'>
            <Text mr={4}>Logged in as {data.me.username}!</Text>
            <Button
              onClick={async () => {
                await logout()
                await refetch() // Calling refetch will also refetch the data for any other components using useQuery(MeDocument)
                if (pathname == '/') {
                  router.refresh()
                }
                else {
                  router.push('/')
                }

              }}
            >
              Log out
            </Button>
          </Flex>
        }
      </Box>
    </Flex>
  )
}
export default NavBar
