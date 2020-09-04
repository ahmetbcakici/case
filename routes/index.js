import { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

import { api, swaggerConfig } from '../config'
import { webUrlToDeeplink, deeplinkToWebUrl } from '../controllers'

const router = Router()
const specs = swaggerJsdoc(swaggerConfig)

router.use(api.specs, swaggerUi.serve)
router.get(
  api.specs,
  swaggerUi.setup(specs, {
    explorer: true,
  })
)

const sectionMapping = require('../dummy-data');

/* Task-2 */
router.get('/web-url-to-deeplink', webUrlToDeeplink);

/* Task-3 */
router.get('/deeplink-to-web-url', deeplinkToWebUrl);

/* Task-4 */
router.post('/link-shorter', (req, res) => {
  const { link } = req.body
  /* already exist check */
  /* con.query(`SELECT COUNT(*) AS linkCount FROM links WHERE url='${link}'`, (err, result) => {
    if (err) throw err
    const { linkCount } = result[0]
    if (linkCount)
      return res.json({ msg: 'Already exists!' })
  }) */

  // @TODO: http(S) control on save
  const code = generateCode();
  /* con.query(`INSERT INTO links (url,short_code) VALUES ('${link}','${code}')`) */
  res.json({ shortlink: `localhost:3000/${code}` })
})

router.get('/:code', (req, res) => {
  const { code } = req.params;

  /* con.query(`SELECT * FROM links WHERE short_code='${code}'`, (err, result) => {
    if (err) throw err
    return res.redirect(`https://${result[0].url}`)
  }) */
})


export default router