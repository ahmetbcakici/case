const express = require('express');
const bodyParser = require('body-parser');

const sectionMapping = require('./dummy-data/sectionName-sectionId.map');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ msg: "test" })
});

/* Task-1 */
app.get('/web-url-to-deeplink', (req, res) => {
  const { webURL } = req.body;
  /* @TODO: store coming request on db & log */
  const path = getURLPath(webURL)
  /* home page url */
  /* console.log(getSectionName(path)) // if not null that means format 1
  const sectionId = getIdByName('erkek') // make dynamic section name
  return res.json({ Deeplink: `ty://?Page=Home&SectionId=${sectionId}` }) */

  /* product detail page url */
  /* const contentId = getContentIdFromURL(path)
  const boutiqueId = getBoutiqueIdFromURL(path) // check for existing
  const merchantId = getMerchantIdFromURL(path) // check for existing
  console.log(contentId, boutiqueId, merchantId)
  
  return res.json({ Deeplink: `ty://?Page=Product&ContentId=${contentId}&CampaignId=${boutiqueId}&MerchantId=${merchantId}` }) */

  /* search page url */
  /*const query = getQuery(path)
  return res.json({ Deeplink: `ty://?Page=Search&Query=${query}` })*/


  /* other */
  /* return res.json({ Deeplink: 'ty://?Page=Home' })*/
});

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("Server is running")
})

/* utils */
const getURLPath = (url) => url.split('.com')[1]
const getSectionName = (url) => url.split('/butik/liste')[1]
const getIdByName = (sectionName) => sectionMapping.find(item => item.name.toLowerCase() == sectionName).id
const getContentIdFromURL = (url) => url.split('-p-').pop().split('?')[0];
const getBoutiqueIdFromURL = (url) => url.split('boutiqueId=').pop().split('&')[0];
const getMerchantIdFromURL = (url) => url.split('merchantId=').pop().split('&')[0];
const getQuery = (url) => url.split('tum--urunler?q=')[1];
const isProductDetailURL = (url) => {
  //var productURL = /\/([A-Za-z])\/*-p-([0-9])/
  //productURL.test('/casio/erkek-p-1231')

  var str = "/aasdaas/dasd-p-223";
  var patt = new RegExp("/([a-z])/([a-z])(-p-)([0-9])");
  var res = patt.test(str);
  console.log(res)
}