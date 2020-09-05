import { generateCode } from '../utils'
import * as linkService from '../services/link.service'

export default async (req, res) => {
  const { link } = req.body
  const shortCode = await linkService.getCodeByLink({ link })
  if (shortCode) return res.json({ msg: `This link is shortened already as http://localhost:8080/${shortCode}` })
  const isHttpContains = /http(s)?:\/\/.+/.test(link)
  if (!isHttpContains) return res.json({ msg: 'Please specify http/s prefix of your link.' })

  const code = generateCode();
  await linkService.saveShortenedLink({ link, code })
  /* @TODO: /api prefix need */
  res.json({ shortlink: `http://localhost:8080/${code}` })
}