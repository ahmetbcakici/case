const express = require('express');
const bodyParser = require('body-parser');

const sectionMapping = require('./dummy-data');

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.json({ msg: 'test' })
});

/* Task-2 */
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

/* Task-3 */
app.get('/deeplink-to-web-url', (req, res) => {
  const { deeplink } = req.body;
  /* @TODO: store coming request on db & log */
  const page = getPage(deeplink)
  switch (page) {
    case 'Home':
      const sectionId = getSectionIdFromLink(deeplink)
      const sectionName = getNameById(sectionId)
      return res.json({ webURL: `https://www.trendyol.com/butik/liste/${sectionName}` })
    case 'Product':
      const contentId = getContentIdFromLink(deeplink)
      const campaignId = getCampaignIdFromLink(deeplink)
      const merchantId = getMerchantIdFromLink(deeplink)
      return res.json({
        webURL: `https://www.trendyol.com/brand/name-p-${contentId}?boutiqueId=${campaignId}&merchantId=${merchantId}`
      })
    case 'Search':
      const query = getQueryFromLink(deeplink)
      return res.json({
        webURL: `https://www.trendyol.com/tum--urunler?q=${query}`
      })
    default:
      return res.json({
        webURL: `https://www.trendyol.com`
      })
  }

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
  console.log('Server is running')
})

/* utils */
const getURLPath = (url) => url.split('.com')[1]
const getSectionName = (path) => path.split('/butik/liste')[1]
const getIdByName = (sectionName) => sectionMapping.find(item => item.name.toLowerCase() == sectionName).id
const getNameById = (sectionId) => sectionMapping.find(item => item.id == sectionId).name.toLowerCase()
const getContentIdFromURL = (path) => path.split('-p-').pop().split('?')[0];
const getBoutiqueIdFromURL = (path) => path.split('boutiqueId=').pop().split('&')[0];
const getMerchantIdFromURL = (path) => path.split('merchantId=').pop().split('&')[0];
const getQuery = (path) => path.split('tum--urunler?q=')[1];
const isProductDetailURL = (url) => {
  //var productURL = /\/([A-Za-z])\/*-p-([0-9])/
  //productURL.test('/casio/erkek-p-1231')

  var str = '/aasdaas/dasd-p-223';
  var patt = new RegExp('/([a-z])/([a-z])(-p-)([0-9])');
  var res = patt.test(str);
  console.log(res)
}

const getPage = (link) => link.split('Page=').pop().split('&')[0];
const getSectionIdFromLink = (path) => path.split('SectionId=').pop().split('&')[0];
const getContentIdFromLink = (path) => path.split('ContentId=').pop().split('&')[0];
const getCampaignIdFromLink = (path) => path.split('CampaignId=').pop().split('&')[0];
const getMerchantIdFromLink = (path) => path.split('MerchantId=').pop().split('&')[0];
const getQueryFromLink = (link) => link.split('Query=').pop().split('&')[0];