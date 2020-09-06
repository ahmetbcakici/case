import { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { api, swaggerConfig } from '../config'
import { webUrlToDeeplink, deeplinkToWebUrl, linkShorter, getLinks } from '../controllers'

const router = Router()
const specs = swaggerJsdoc(swaggerConfig)

router.use(api.specs, swaggerUi.serve)
router.get(
  api.specs,
  swaggerUi.setup(specs, {
    explorer: true,
  })
)
/* Task-2 */
router.get('/web-url-to-deeplink', webUrlToDeeplink)

/* Task-3 */
router.get('/deeplink-to-web-url', deeplinkToWebUrl)

/* Task-4 */
router.get('/get-links/:code', getLinks)
router.post('/link-shorter', linkShorter)

export default router