import { FieldError } from '@/generated/graphql/graphql'

type Result = Record<string, string>

export const errorMapper = (errors: FieldError[]): Result => {
  const result: Result = {}
  errors.forEach(({ field, message }) => {
    result[field] = message
  })
  return result
}