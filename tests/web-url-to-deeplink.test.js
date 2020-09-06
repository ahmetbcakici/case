import request from 'supertest'
import app from '../index'

describe('Get /web-url-to-deeplink', () => {
  it('Homepage', async () => {
    const res = await request(app)
      .get('/api/web-url-to-deeplink')
      .send({
        webURL: 'https://www.trendyol.com'
      })
    expect(res.status).toEqual(200)
    expect(res.body.deeplink).toEqual('ty://?Page=Home')
  })

  it('Homepage', async () => {
    const res = await request(app)
      .get('/api/web-url-to-deeplink')
      .send({
        webURL: 'https://www.trendyol.com/butik/liste/kadin'
      })
    expect(res.status).toEqual(200)
    expect(res.body.deeplink).toEqual('ty://?Page=Home&SectionId=1')
  })

  it('Product', async () => {
    const res = await request(app)
      .get('/api/web-url-to-deeplink')
      .send({
        webURL: 'https://www.trendyol.com/brand/name-p-1925865?boutiqueId=439892&merchantId=105064'
      })
    expect(res.status).toEqual(200)
    expect(res.body.deeplink).toEqual('ty://?Page=Product&ContentId=1925865&CampaignId=439892&MerchantId=105064')
  })

  it('Product', async () => {
    const res = await request(app)
      .get('/api/web-url-to-deeplink')
      .send({
        webURL: 'https://www.trendyol.com/brand/name-p-1925865'
      })
    expect(res.status).toEqual(200)
    expect(res.body.deeplink).toEqual('ty://?Page=Product&ContentId=1925865')
  })

  it('Product', async () => {
    const res = await request(app)
      .get('/api/web-url-to-deeplink')
      .send({
        webURL: 'https://www.trendyol.com/brand/name-p-1925865?boutiqueId=439892'
      })
    expect(res.status).toEqual(200)
    expect(res.body.deeplink).toEqual('ty://?Page=Product&ContentId=1925865&CampaignId=439892')
  })

  it('Product', async () => {
    const res = await request(app)
      .get('/api/web-url-to-deeplink')
      .send({
        webURL: 'https://www.trendyol.com/brand/name-p-1925865?merchantId=105064'
      })
    expect(res.status).toEqual(200)
    expect(res.body.deeplink).toEqual('ty://?Page=Product&ContentId=1925865&MerchantId=105064')
  })

  it('Search', async () => {
    const res = await request(app)
      .get('/api/web-url-to-deeplink')
      .send({
        webURL: 'https://www.trendyol.com/tum--urunler?q=elbise'
      })
    expect(res.status).toEqual(200)
    expect(res.body.deeplink).toEqual('ty://?Page=Search&Query=elbise')
  })

  it('Search', async () => {
    const res = await request(app)
      .get('/api/web-url-to-deeplink')
      .send({
        webURL: 'https://www.trendyol.com/tum--urunler?q=ütü'
      })
    expect(res.status).toEqual(200)
    expect(res.body.deeplink).toEqual('ty://?Page=Search&Query=%C3%BCt%C3%BC')
  })

  /* it('Other - Homepage', async () => {
    const res = await request(app)
      .get('/api/web-url-to-deeplink')
      .send({
        webURL: 'https://www.trendyol.com/Hesabim/Favoriler'
      })
    expect(res.status).toEqual(200)
    expect(res.body.deeplink).toEqual('ty://?Page=Home')
  })

  it('Other - Homepage', async () => {
    const res = await request(app)
      .get('/api/web-url-to-deeplink')
      .send({
        webURL: 'https://www.trendyol.com/Hesabim/#/Siparislerim'
      })
    expect(res.status).toEqual(200)
    expect(res.body.deeplink).toEqual('ty://?Page=Home')
  }) */
})