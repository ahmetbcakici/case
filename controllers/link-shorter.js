import { getCodeByLink, saveShortenedLink } from '../models'
import { generateCode } from '../utils'

export default async (req, res) => {
  const { link } = req.body
  const shortCode = await getCodeByLink({ link })
  if (shortCode) return res.json({ msg: `This link is shortened already as http://localhost:8080/${shortCode}` })
  const isHttpContains = /http(s)?:\/\/.+/.test(link)
  if (!isHttpContains) return res.json({ msg: 'Please specify http/s prefix of your link.' })

  const code = generateCode();
  await saveShortenedLink({ link, code })
  /* @TODO: /api prefix need */
  res.json({ shortlink: `http://localhost:8080/${code}` })
}