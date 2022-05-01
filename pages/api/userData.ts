// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

interface User {
  email: string
  password: string
}

const USER = {
  email: 'example@email.com',
  password: '12345',
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<User>
) {
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(USER))
}
