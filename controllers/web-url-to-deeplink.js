import { getURLPath, urlCheck } from '../utils'
import * as sectionService from '../services/section.service'
import * as conversionService from '../services/conversion.service'

export default async (req, res, next) => {
  const { webURL } = req.body;

  if (!urlCheck(webURL)) {
    const err = new Error('Not correct webURL!')
    return next(err);
  }
  const path = getURLPath(webURL) // can result => ['/butik/liste/12','/casio/erkek-p-1231','/tum--urunler?q=elbise']

  let deeplink = await conversionService.getConversionIfExisting({ webURL })
  if (deeplink) return res.json({ deeplink })
  deeplink = 'ty://?Page=Home'

  const isHomepage = /\/butik\/liste\/[a-zA-Z]+/.test(path)
  if (isHomepage) {
    const sectionName = path.split('/butik/liste/')[1]
    const sectionId = await sectionService.findSectionIdByName({ sectionName })
    if (!sectionId) {
      const err = new Error(`Could not find section with this name: ${sectionName}`)
      return next(err);
    }

    deeplink = `ty://?Page=Home&SectionId=${sectionId}`
  }

  const isProduct = /\/\w+\/[\w-]+-p-\d+/.test(path)
  if (isProduct) {
    const contentId = path.split('-p-').pop().split('?')[0];
    const boutiqueId = path.split('boutiqueId=').pop().split('&')[0];
    const merchantId = path.split('merchantId=').pop().split('&')[0];

    let link = `ty://?Page=Product&ContentId=${contentId}`
    link += (boutiqueId !== path ? `&CampaignId=${boutiqueId}` : '')
    link += (merchantId !== path ? `&MerchantId=${merchantId}` : '')
    /* @TODO: some incorrect things on validation */
    deeplink = link
  }

  const isSearch = /\/tum--urunler\?q=.+/.test(path)
  if (isSearch) {
    const query = path.split('tum--urunler?q=')[1];
    deeplink = `ty://?Page=Search&Query=${query}`
  }

  await conversionService.saveConversion({ deeplink, webURL }) // @TODO: think on error handling
  res.json({ deeplink })
}

/*
Homepage:
 it contains sectionName if starts with /butik/liste
 find id by name (careful about tr character)

 sample:
 webURL: https://www.trendyol.com/butik/liste/${sectionName}
 deeplink: ty://?Page=Home&SectionId=${sectionName}

Product:
  must contain '-p-' and contentId after -p- prefix
  URL can contain boutiqueId and/or merchantId
  boutiqueId is CampaignId for deeplink

  sample:
  Web URL: https://www.trendyol.com/casio/erkek-kol-saati-p-1925865?boutiqueId=439892&merchantId=105064
  Deeplink: ty://?Page=Product&ContentId=1925865&CampaignId=439892&MerchantId=105064

Search:
  must contain 'tum--urunler' and q parameter (will be gonna Query on deeplink)
  careful about TR character

  sample:
  Web URL: https://www.trendyol.com/tum--urunler?q=elbise
  Deeplink: ty://?Page=Search&Query=elbise

Other:
    return ty://?Page=Home
*/