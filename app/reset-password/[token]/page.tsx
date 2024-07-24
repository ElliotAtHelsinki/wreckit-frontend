import { PasswordResetForm } from '@/components'
import { SESSION_COOKIE_NAME } from '@/constants'
import { CheckResetPasswordTokenDocument } from '@/generated/graphql/graphql'
import { createApolloClient } from '@/lib'
import { Text } from '@chakra-ui/react'
import { cookies } from 'next/headers'

interface Props {
  params: {
    token: string
  }
}

export const dynamic = 'force-dynamic'

const ResetPasswordPage: React.FC<Props> = async ({ params: { token } }) => {
  const cookieStore = cookies()
  const cookie = cookieStore.get(SESSION_COOKIE_NAME)?.value
  const apollo = await createApolloClient(cookie)
  const { data, loading } = await apollo.query({ query: CheckResetPasswordTokenDocument, variables: { token } })

  if (loading) {
    return <Text>Loading...</Text>
  }

  else if (!data.checkResetPasswordToken) {
    return <Text>Invalid token!</Text>
  }

  else {
    return <PasswordResetForm token={token}/>
  }


}
export default ResetPasswordPage
