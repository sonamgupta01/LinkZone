import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcryptjs.compare(password, hashedPassword)
}

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    console.log('Verifying token with secret length:', JWT_SECRET.length)
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    console.log('Token decoded successfully, userId:', decoded.userId)
    return decoded
  } catch (error) {
    console.log('Token verification error:', error)
    return null
  }
}

export interface AuthUser {
  id: string
  email: string
  name: string
  bio?: string
}
