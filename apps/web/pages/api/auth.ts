import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../lib/initSupabase";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  supabase.auth.api.setAuthCookie(req, res)
}