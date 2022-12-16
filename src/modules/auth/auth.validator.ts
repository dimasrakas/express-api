import { z } from 'zod'

interface LoginPayloadArgs {
  email: String
  password: String
}

export const validateLoginPayload = ({ email, password }: LoginPayloadArgs) => {
  const UserSchema = z.object({
    email: z.string(),
    password: z.string(),
  })
  const validate = UserSchema.safeParse({ email, password })

  return validate
}
