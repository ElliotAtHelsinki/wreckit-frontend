/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "fragment RegularError on FieldError {\n  field\n  message\n}": types.RegularErrorFragmentDoc,
    "fragment RegularPost on Post {\n  id\n  authorID\n  title\n  content\n  createdAt\n  updatedAt\n  snippet\n  points\n  upvoted\n  downvoted\n  author {\n    ...RegularUser\n  }\n}": types.RegularPostFragmentDoc,
    "fragment RegularPostResponse on PostResponse {\n  errors {\n    ...RegularError\n  }\n  post {\n    ...RegularPost\n  }\n}": types.RegularPostResponseFragmentDoc,
    "fragment RegularUser on User {\n  id\n  email\n  username\n  createdAt\n  updatedAt\n}": types.RegularUserFragmentDoc,
    "fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}": types.RegularUserResponseFragmentDoc,
    "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    ...RegularPostResponse\n  }\n}": types.CreatePostDocument,
    "mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}": types.DeletePostDocument,
    "mutation Downvote($postID: Int!) {\n  downvote(postID: $postID) {\n    ...RegularPost\n  }\n}": types.DownvoteDocument,
    "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email) {\n    errors {\n      ...RegularError\n    }\n    message\n    messageType\n  }\n}": types.ForgotPasswordDocument,
    "mutation Login($input: UsernamePasswordInput!) {\n  login(input: $input) {\n    ...RegularUserResponse\n  }\n}": types.LoginDocument,
    "mutation Logout {\n  logout\n}": types.LogoutDocument,
    "mutation Register($input: UsernamePasswordInput!) {\n  register(input: $input) {\n    ...RegularUserResponse\n  }\n}": types.RegisterDocument,
    "mutation RemoveDownvote($postID: Int!) {\n  removeDownvote(postID: $postID) {\n    ...RegularPost\n  }\n}": types.RemoveDownvoteDocument,
    "mutation RemoveUpvote($postID: Int!) {\n  removeUpvote(postID: $postID) {\n    ...RegularPost\n  }\n}": types.RemoveUpvoteDocument,
    "mutation ResetPassword($newPassword: String!, $token: String!) {\n  resetPassword(newPassword: $newPassword, token: $token) {\n    errors {\n      ...RegularError\n    }\n    message\n    messageType\n  }\n}": types.ResetPasswordDocument,
    "mutation UpdatePost($id: Int!, $title: String!, $content: String!) {\n  updatePost(id: $id, title: $title, content: $content) {\n    errors {\n      ...RegularError\n    }\n    post {\n      ...RegularPost\n    }\n  }\n}": types.UpdatePostDocument,
    "mutation Upvote($postID: Int!) {\n  upvote(postID: $postID) {\n    ...RegularPost\n  }\n}": types.UpvoteDocument,
    "query CheckResetPasswordToken($token: String!) {\n  checkResetPasswordToken(token: $token)\n}": types.CheckResetPasswordTokenDocument,
    "query Me {\n  me {\n    ...RegularUser\n  }\n}": types.MeDocument,
    "query Post($id: Int!) {\n  post(id: $id) {\n    ...RegularPost\n  }\n}": types.PostDocument,
    "query Posts($limit: Int, $cursor: Timestamp) {\n  posts(limit: $limit, cursor: $cursor) {\n    ...RegularPost\n  }\n}": types.PostsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularError on FieldError {\n  field\n  message\n}"): (typeof documents)["fragment RegularError on FieldError {\n  field\n  message\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularPost on Post {\n  id\n  authorID\n  title\n  content\n  createdAt\n  updatedAt\n  snippet\n  points\n  upvoted\n  downvoted\n  author {\n    ...RegularUser\n  }\n}"): (typeof documents)["fragment RegularPost on Post {\n  id\n  authorID\n  title\n  content\n  createdAt\n  updatedAt\n  snippet\n  points\n  upvoted\n  downvoted\n  author {\n    ...RegularUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularPostResponse on PostResponse {\n  errors {\n    ...RegularError\n  }\n  post {\n    ...RegularPost\n  }\n}"): (typeof documents)["fragment RegularPostResponse on PostResponse {\n  errors {\n    ...RegularError\n  }\n  post {\n    ...RegularPost\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUser on User {\n  id\n  email\n  username\n  createdAt\n  updatedAt\n}"): (typeof documents)["fragment RegularUser on User {\n  id\n  email\n  username\n  createdAt\n  updatedAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}"): (typeof documents)["fragment RegularUserResponse on UserResponse {\n  errors {\n    ...RegularError\n  }\n  user {\n    ...RegularUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    ...RegularPostResponse\n  }\n}"): (typeof documents)["mutation CreatePost($input: PostInput!) {\n  createPost(input: $input) {\n    ...RegularPostResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}"): (typeof documents)["mutation DeletePost($id: Int!) {\n  deletePost(id: $id)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Downvote($postID: Int!) {\n  downvote(postID: $postID) {\n    ...RegularPost\n  }\n}"): (typeof documents)["mutation Downvote($postID: Int!) {\n  downvote(postID: $postID) {\n    ...RegularPost\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email) {\n    errors {\n      ...RegularError\n    }\n    message\n    messageType\n  }\n}"): (typeof documents)["mutation ForgotPassword($email: String!) {\n  forgotPassword(email: $email) {\n    errors {\n      ...RegularError\n    }\n    message\n    messageType\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Login($input: UsernamePasswordInput!) {\n  login(input: $input) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation Login($input: UsernamePasswordInput!) {\n  login(input: $input) {\n    ...RegularUserResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Logout {\n  logout\n}"): (typeof documents)["mutation Logout {\n  logout\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Register($input: UsernamePasswordInput!) {\n  register(input: $input) {\n    ...RegularUserResponse\n  }\n}"): (typeof documents)["mutation Register($input: UsernamePasswordInput!) {\n  register(input: $input) {\n    ...RegularUserResponse\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveDownvote($postID: Int!) {\n  removeDownvote(postID: $postID) {\n    ...RegularPost\n  }\n}"): (typeof documents)["mutation RemoveDownvote($postID: Int!) {\n  removeDownvote(postID: $postID) {\n    ...RegularPost\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveUpvote($postID: Int!) {\n  removeUpvote(postID: $postID) {\n    ...RegularPost\n  }\n}"): (typeof documents)["mutation RemoveUpvote($postID: Int!) {\n  removeUpvote(postID: $postID) {\n    ...RegularPost\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ResetPassword($newPassword: String!, $token: String!) {\n  resetPassword(newPassword: $newPassword, token: $token) {\n    errors {\n      ...RegularError\n    }\n    message\n    messageType\n  }\n}"): (typeof documents)["mutation ResetPassword($newPassword: String!, $token: String!) {\n  resetPassword(newPassword: $newPassword, token: $token) {\n    errors {\n      ...RegularError\n    }\n    message\n    messageType\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation UpdatePost($id: Int!, $title: String!, $content: String!) {\n  updatePost(id: $id, title: $title, content: $content) {\n    errors {\n      ...RegularError\n    }\n    post {\n      ...RegularPost\n    }\n  }\n}"): (typeof documents)["mutation UpdatePost($id: Int!, $title: String!, $content: String!) {\n  updatePost(id: $id, title: $title, content: $content) {\n    errors {\n      ...RegularError\n    }\n    post {\n      ...RegularPost\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation Upvote($postID: Int!) {\n  upvote(postID: $postID) {\n    ...RegularPost\n  }\n}"): (typeof documents)["mutation Upvote($postID: Int!) {\n  upvote(postID: $postID) {\n    ...RegularPost\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query CheckResetPasswordToken($token: String!) {\n  checkResetPasswordToken(token: $token)\n}"): (typeof documents)["query CheckResetPasswordToken($token: String!) {\n  checkResetPasswordToken(token: $token)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Me {\n  me {\n    ...RegularUser\n  }\n}"): (typeof documents)["query Me {\n  me {\n    ...RegularUser\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Post($id: Int!) {\n  post(id: $id) {\n    ...RegularPost\n  }\n}"): (typeof documents)["query Post($id: Int!) {\n  post(id: $id) {\n    ...RegularPost\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Posts($limit: Int, $cursor: Timestamp) {\n  posts(limit: $limit, cursor: $cursor) {\n    ...RegularPost\n  }\n}"): (typeof documents)["query Posts($limit: Int, $cursor: Timestamp) {\n  posts(limit: $limit, cursor: $cursor) {\n    ...RegularPost\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;