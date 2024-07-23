import { ApolloClient, InMemoryCache } from '@apollo/client'
import { PostsQuery } from '@/generated/graphql/graphql'

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
              const posts: PostsQuery['posts'] = JSON.parse(JSON.stringify(existing))
              for (let i = 0; i < incoming.length; i++) {
                if (!posts.includes(incoming[i])) {
                  posts.push(incoming[i])
                }
              }
              return posts
            },
          }
        }
      }
    } 
  }),
  uri: process.env.NEXT_PUBLIC_BACKEND_URI
})
