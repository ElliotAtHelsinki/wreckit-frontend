import { MeDocument } from '@/generated/graphql/graphql'
import { useQuery } from '@apollo/client'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const useAuthenticate = () => {
  const router = useRouter()
  const { data, loading } = useQuery(MeDocument)
  const pathname = usePathname()
  useEffect(() => {
    if (!loading && !data?.me) {
      router.replace(`/login?redirect=${pathname}`)
    }
  }, [router, data, loading])
}