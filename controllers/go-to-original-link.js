import * as linkService from '../services/link.service'

export default async (req, res) => {
  const { code } = req.params;

  const originalLink = await linkService.getOriginalLink({ code })
  if (originalLink) return res.redirect(`${originalLink}`)
  return res.json({ msg: `Could not found shortened link with this code: ${code}` })
}
/* @TODO: not redirect, return weburl & deeplink of original */