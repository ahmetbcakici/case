/**
 * @swagger
 * path:
 *  /api/link-shorter:
 *    post:
 *      summary: Link Shorter
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                link:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Link shortened.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    shortlink:
 *                      type: string
 *        "400":
 *          description: You have to send link on request body.
 */

import { generateCode, deeplinkCheck } from '../utils'
import * as linkService from '../services/link.service'
import * as conversionService from '../services/conversion.service'

export default async (req, res, next) => {
  const { link } = req.body

  if (!link) {
    const err = new Error('You can not leave fields empty.')
    err.status = 400
    return next(err)
  }

  const result = await conversionService.getConversionIfExisting({ deeplink: link, webURL: link })
  if (result) {
    const shortCode = await conversionService.getShortCodeByConversionId({ conversionId: result.conversionId })
    if (shortCode) return res.json({ msg: `This link is shortened already as http://localhost:8080/api/${shortCode}` })
  }

  const isDeeplink = deeplinkCheck(link)

  let conversionId
  if (!isDeeplink) {
    const result = await conversionService.convertWeburlToDeeplink({ webURL: link })
    conversionId = result.conversionId
  }

  if (isDeeplink) {
    const result = await conversionService.convertDeeplinkToWeburl({ deeplink: link })
    conversionId = result.conversionId
  }

  /* unique check for generated short code */
  let code, data
  do {
    code = generateCode()
    data = await linkService.getConversionIdByCode({ code })
  } while (data)
  await linkService.saveShortenedLink({ code, conversionId })
  res.json({ shortlink: `http://localhost:8080/api/${code}` })
}