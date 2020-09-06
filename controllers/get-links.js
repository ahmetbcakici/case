/**
 * @swagger
 * path:
 *  /api/get-links/{code}:
 *    get:
 *      summary: Link Shorter
 *      parameters:
 *        - in: path
 *          name: code
 *          schema:
 *            type: string
 *            required: true
 *            description: Short code for original links.
 *      responses:
 *        "200":
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    webURL:
 *                      type: string
 *                    deeplink:
 *                      type: string
 *        "400":
 *          description: You have to send code on request parameter.
 */

import * as linkService from '../services/link.service'
import * as conversionService from '../services/conversion.service'

export default async (req, res) => {
  const { code } = req.params

  const conversionId = await linkService.getConversionIdByCode({ code })
  if (!conversionId) return res.json({ msg: `Could not found shortened link with this code: ${code}` })

  const { deeplink, weburl: webURL } = await conversionService.getConversionById({ id: conversionId })
  res.json({ deeplink, webURL })
}