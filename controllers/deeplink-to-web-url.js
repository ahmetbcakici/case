//import { getNameById, getPage, getQuery, getContentIdFromURL, getIdByName, generateCode, getBoutiqueIdFromURL, getCampaignIdFromLink, getContentIdFromLink, getMerchantIdFromLink, getMerchantIdFromURL, getQueryFromLink, getSectionIdFromLink, getSectionName, getURLPath } from '../utils'

export default (req, res) => {
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
}