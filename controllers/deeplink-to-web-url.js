import { deeplinkCheck, getPage } from '../utils'
import * as sectionService from '../services/section.service'
import * as conversionService from '../services/conversion.service'

export default async (req, res, next) => {
  const { deeplink } = req.body;

  if (!deeplinkCheck(deeplink)) {
    const err = new Error('Not correct Deeplink!')
    return next(err);
  }

  const page = getPage(deeplink)
  let webURL = await conversionService.getConversionIfExisting({ deeplink })
  if (webURL) return res.json({ webURL })
  switch (page) {
    case 'Home':
      const sectionId = deeplink.split('SectionId=').pop().split('&')[0];
      const sectionName = await sectionService.findSectionNameById({ sectionId })
      if (!sectionName) {
        const err = new Error(`Could not find section with this ID: ${sectionId}`)
        return next(err);
      }
      webURL = `https://www.trendyol.com/butik/liste/${sectionName}`
      break;
    case 'Product':
      const contentId = deeplink.split('ContentId=').pop().split('&')[0];
      const campaignId = deeplink.split('CampaignId=').pop().split('&')[0];
      const merchantId = deeplink.split('MerchantId=').pop().split('&')[0];
      /* @TODO: some incorrect things on combining ( & )*/

      let url = `https://www.trendyol.com/brand/name-p-${contentId}?`
      url += (campaignId !== deeplink ? `&boutiqueId=${campaignId}` : '')
      url += (merchantId !== deeplink ? `&merchantId=${merchantId}` : '')

      webURL = url;
      break;
    case 'Search':
      const query = deeplink.split('Query=').pop().split(/\W+/)[0];
      webURL = `https://www.trendyol.com/tum--urunler?q=${query}`;
      break;
    default:
      webURL = 'https://www.trendyol.com';
      break;
  }
  await conversionService.saveConversion({ deeplink, webURL }) // @TODO: think on error handling
  res.json({ webURL })
}