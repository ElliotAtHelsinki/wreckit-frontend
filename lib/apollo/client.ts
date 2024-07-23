import { uniqueIfy } from '@/utils'
import { ApolloClient, InMemoryCache } from '@apollo/client'

// This is the client-side client
export const apollo = new ApolloClient({
  credentials: 'include', // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // https://www.apollographql.com/docs/react/pagination/core-api/
          posts: {
            // Don't cache separate results based on
            // any of this field's arguments.
            keyArgs: false,

            // Concatenate the incoming list items with
            // the existing list items.
            merge: (existing: { __ref: string }[] = [], incoming: { __ref: string }[]) => {
              const cacheItems: typeof existing = JSON.parse(JSON.stringify(existing))
              const refs = existing.map(e => e.__ref)
              for (let i = 0;i < incoming.length;i++) {
                if (!refs.includes(incoming[i].__ref)) {
                  cacheItems.push(incoming[i])
                  refs.push(incoming[i].__ref)
                }
              }
              return cacheItems
            },
          }
        }
      }
    }
  }),
  uri: process.env.NEXT_PUBLIC_BACKEND_URI
})
