import { supabase } from "../../lib/initSupabase"


const getUser = async (req, res) => {
  const { token } = req.headers

  const { data: user, error } = await supabase.auth.api.getUser(token)

  if (error) return res.status(401).json({ error: error.message })
  return res.status(200).json(user)
}

export default getUser