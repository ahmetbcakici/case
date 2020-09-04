import { deeplinkCheck, getPage } from '../utils'

export default (req, res, next) => {
  const { deeplink } = req.body;
  /* @TODO: store coming request on db & log */
  if (!deeplinkCheck(deeplink)) {
    const err = new Error('Not correct Deeplink!')
    return next(err);
  }

  const page = getPage(deeplink)
  switch (page) {
    case 'Home':
      const sectionId = deeplink.split('SectionId=').pop().split('&')[0];
      console.log(sectionId)
      /* @TODO: find name by id */
      return res.json({ webURL: `https://www.trendyol.com/butik/liste/${'sectionName'}` })
    case 'Product':
      const contentId = deeplink.split('ContentId=').pop().split('&')[0];
      const campaignId = deeplink.split('CampaignId=').pop().split('&')[0];
      const merchantId = deeplink.split('MerchantId=').pop().split('&')[0];
      /* @TODO: some incorrect things on combining ( & )*/

      let webURL = `https://www.trendyol.com/brand/name-p-${contentId}?`
      webURL += (campaignId !== deeplink ? `&boutiqueId=${campaignId}` : '')
      webURL += (merchantId !== deeplink ? `&merchantId=${merchantId}` : '')

      return res.json({ webURL })
    case 'Search':
      const query = deeplink.split('Query=').pop().split(/\W+/)[0];
      return res.json({
        webURL: `https://www.trendyol.com/tum--urunler?q=${query}`
      })
    default:
      return res.json({ webURL: `https://www.trendyol.com` })
  }
}