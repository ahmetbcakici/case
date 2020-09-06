/**
 * @swagger
 * path:
 *  /api/web-url-to-deeplink:
 *    get:
 *      summary: Convert WebURL to Deeplink
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                webURL:
 *                  type: string
 *      responses:
 *        "200":
 *          description: WebURL converted to deeplink.
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                    deeplink:
 *                      type: string
 *        "400":
 *          description: You have to send webURL on request body.
 */

import * as conversionService from '../services/conversion.service'

export default async (req, res, next) => {
  const { webURL } = req.body

  if (!webURL) {
    const err = new Error('You can not leave fields empty.')
    err.status = 400
    return next(err)
  }

  try {
    const { deeplink } = await conversionService.convertWeburlToDeeplink({ webURL })
    return res.json({ deeplink })
  } catch (err) {
    return next(err)
  }
}