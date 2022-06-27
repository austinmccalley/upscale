import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "../../lib/initSupabase"


const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token } = req.headers

  if (!token) return res.status(400).json({ error: 'Missing token' })
  if (Array.isArray(token)) return res.status(400).json({ error: 'Type error. Expected a string' })

  const { data: user, error } = await supabase.auth.api.getUser(token || '')

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(user)
}

export default getUser