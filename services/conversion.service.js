import { con } from '../index'
import { getURLPath, getPage, deeplinkCheck, urlCheck } from '../utils'
import * as sectionService from '../services/section.service'

export const convertWeburlToDeeplink = ({ webURL }) => new Promise(async (resolve, reject) => {
  if (!urlCheck(webURL)) {
    const err = new Error('Not correct webURL!')
    return reject(err)
  }

  let { deeplink, conversionId } = await getConversionIfExisting({ webURL })
  if (deeplink && process.env.NODE_ENV !== 'test') return resolve({ deeplink, conversionId })

  const path = getURLPath(webURL)

  deeplink = 'ty://?Page=Home'

  const isHomepage = /\/butik\/liste\/[a-zA-Z]+/.test(path)
  if (isHomepage) {
    const sectionName = path.split('/butik/liste/')[1]
    const sectionId = await sectionService.findSectionIdByName({ sectionName })
    if (!sectionId) {
      const err = new Error(`Could not find section with this name: ${sectionName}`)
      return reject(err)
    }

    deeplink = `ty://?Page=Home&SectionId=${sectionId}`
  }

  const isProduct = /\/\w+\/[\w-]+-p-\d+/.test(path)
  if (isProduct) {
    const contentId = path.split('-p-').pop().split('?')[0]
    const boutiqueId = path.split('boutiqueId=').pop().split('&')[0]
    const merchantId = path.split('merchantId=').pop().split('&')[0]

    let link = `ty://?Page=Product&ContentId=${contentId}`
    link += (boutiqueId !== path ? `&CampaignId=${boutiqueId}` : '')
    link += (merchantId !== path ? `&MerchantId=${merchantId}` : '')
    deeplink = link
  }

  const isSearch = /\/tum--urunler\?q=.+/.test(path)
  if (isSearch) {
    let query = path.split('tum--urunler?q=')[1]
    query = encodeURI(query)
    deeplink = `ty://?Page=Search&Query=${query}`
  }

  conversionId = await saveConversion({ deeplink, webURL })
  return resolve({ deeplink, conversionId })
})

export const convertDeeplinkToWeburl = ({ deeplink }) => new Promise(async (resolve, reject) => {
  if (!deeplinkCheck(deeplink)) {
    const err = new Error('Not correct Deeplink!')
    return reject(err)
  }

  let { webURL, conversionId } = await getConversionIfExisting({ deeplink })
  if (webURL && process.env.NODE_ENV !== 'test') return resolve({ webURL, conversionId })

  const page = getPage(deeplink)
  webURL = 'https://www.trendyol.com'

  switch (page) {
    case 'Home':
      const sectionId = deeplink.split('SectionId=').pop().split('&')[0]
      if (sectionId === deeplink) break // if there is no sectionId break
      const sectionName = await sectionService.findSectionNameById({ sectionId })
      if (!sectionName) {
        const err = new Error(`Could not find section with this ID: ${sectionId}`)
        return reject(err)
      }
      webURL = `https://www.trendyol.com/butik/liste/${sectionName}`
      break
    case 'Product':
      const contentId = deeplink.split('ContentId=').pop().split('&')[0]
      const campaignId = deeplink.split('CampaignId=').pop().split('&')[0]
      const merchantId = deeplink.split('MerchantId=').pop().split('&')[0]

      let url = `https://www.trendyol.com/brand/name-p-${contentId}?`
      url += (campaignId !== 'ty://?Page=Product' ? `&boutiqueId=${campaignId}` : '')
      url += (merchantId !== 'ty://?Page=Product' ? `&merchantId=${merchantId}` : '')
      url = url.replace(/\?&/, '?')

      if (!url.split('?')[1]) url = url.replace(/\?/, '')

      webURL = url
      break
    case 'Search':
      let query = deeplink.split('Query=')[1]
      query = encodeURI(query)
      webURL = `https://www.trendyol.com/tum--urunler?q=${query}`
      break
    default:
      webURL = 'https://www.trendyol.com'
      break
  }

  conversionId = await saveConversion({ deeplink, webURL })
  return resolve({ webURL, conversionId })
})


export const saveConversion = ({ deeplink, webURL }) => new Promise((resolve, reject) => {
  con.query(`INSERT INTO conversions (deeplink,weburl) VALUES ('${deeplink}','${webURL}')`, (err, result) => {
    if (err) return reject(err)
    return resolve(result.insertId)
  })
})

export const getConversionIfExisting = ({ deeplink, webURL }) => new Promise((resolve, reject) => {
  con.query(`SELECT * FROM conversions WHERE deeplink='${deeplink}' OR weburl='${webURL}'`, (err, result) => {
    if (err) return reject(err)
    if (result.length < 1) return resolve(false)
    const obj = {
      conversionId: result[0].id,
      deeplink: result[0].deeplink,
      webURL: result[0].weburl,
    }
    return resolve(obj)
  })
})

export const getConversionById = ({ id }) => new Promise((resolve, reject) => {
  con.query(`SELECT * FROM conversions WHERE id=${id}`, (err, result) => {
    if (err) return reject(err)
    if (result.length < 1) return resolve(false)
    return resolve(result[0])
  })
})

export const getShortCodeByConversionId = ({ conversionId }) => new Promise((resolve, reject) => {
  con.query(`SELECT * FROM links WHERE conversionId=${conversionId}`, (err, result) => {
    if (err) return reject(err)
    if (result.length < 1) return resolve(false)
    return resolve(result[0].short_code)
  })
})