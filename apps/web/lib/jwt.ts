import jwt from 'jsonwebtoken'

export function sign(data: Record<string, any>) {
  return jwt.sign(data, process.env.NEXT_PUBLIC_JWT_SECRET || 'backup')
}

export function verify(token: string) {
  if(!token || !token.length) return 

  try {
  const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET || 'backup')
  return decoded ? decoded : false
  } catch (e) {
    console.error(e);
    return false
  }
}