/**
 * @swagger
 * path:
 *  /api/deeplink-to-web-url:
 *    get:
 *      summary: Convert Deeplink to webURL
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                deeplink:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Deeplink converted to webURL.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    webURL:
 *                      type: string
 *        "400":
 *          description: You have to send deeplink on request body.
 */

import * as conversionService from '../services/conversion.service'

export default async (req, res, next) => {
  const { deeplink } = req.body

  if (!deeplink) {
    const err = new Error('You can not leave fields empty.')
    err.status = 400
    return next(err)
  }

  try {
    const { webURL } = await conversionService.convertDeeplinkToWeburl({ deeplink })
    return res.json({ webURL })
  } catch (err) {
    return next(err)
  }
}