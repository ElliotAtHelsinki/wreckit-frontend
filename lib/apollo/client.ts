import { ApolloClient, InMemoryCache } from '@apollo/client'
import { PostsQuery } from '@/generated/graphql/graphql'
import { uniqueIfy } from '@/utils'

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
            merge: (existing: PostsQuery['posts'] = [], incoming: PostsQuery['posts']) => {
              return uniqueIfy([...existing, ...incoming])
            },
          }
        }
      }
    }
  }),
  uri: process.env.NEXT_PUBLIC_BACKEND_URI
})
