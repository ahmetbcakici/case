import { getOriginalLink } from '../models'

export default async (req, res) => {
  const { code } = req.params;

  const originalLink = await getOriginalLink({ code })
  if (originalLink) return res.redirect(`${originalLink}`)
  return res.json({ msg: `Could not found shortened link with this code: ${code}` })
}