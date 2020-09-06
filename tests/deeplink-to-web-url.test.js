import request from 'supertest'
import app from '../index'

describe('Get /deeplink-to-web-url', () => {
  it('Homepage', async () => {
    const res = await request(app)
      .get('/api/deeplink-to-web-url')
      .send({
        deeplink: 'ty://?Page=Home'
      })
    expect(res.status).toEqual(200)
    expect(res.body.webURL).toEqual('https://www.trendyol.com')
  })

  it('Homepage', async () => {
    const res = await request(app)
      .get('/api/deeplink-to-web-url')
      .send({
        deeplink: 'ty://?Page=Home&SectionId=2'
      })
    expect(res.status).toEqual(200)
    expect(res.body.webURL).toEqual('https://www.trendyol.com/butik/liste/erkek')
  })

  it('Product', async () => {
    const res = await request(app)
      .get('/api/deeplink-to-web-url')
      .send({
        deeplink: 'ty://?Page=Product&ContentId=1925865&CampaignId=439892&MerchantId=105064'
      })
    expect(res.status).toEqual(200)
    expect(res.body.webURL).toEqual('https://www.trendyol.com/brand/name-p-1925865?boutiqueId=439892&merchantId=105064')
  })

  it('Product', async () => {
    const res = await request(app)
      .get('/api/deeplink-to-web-url')
      .send({
        deeplink: 'ty://?Page=Product&ContentId=1925865'
      })
    expect(res.status).toEqual(200)
    expect(res.body.webURL).toEqual('https://www.trendyol.com/brand/name-p-1925865')
  })

  it('Product', async () => {
    const res = await request(app)
      .get('/api/deeplink-to-web-url')
      .send({
        deeplink: 'ty://?Page=Product&ContentId=1925865&CampaignId=439892'
      })
    expect(res.status).toEqual(200)
    expect(res.body.webURL).toEqual('https://www.trendyol.com/brand/name-p-1925865?boutiqueId=439892')
  })

  it('Product', async () => {
    const res = await request(app)
      .get('/api/deeplink-to-web-url')
      .send({
        deeplink: 'ty://?Page=Product&ContentId=1925866&MerchantId=105064'
      })
    expect(res.status).toEqual(200)
    expect(res.body.webURL).toEqual('https://www.trendyol.com/brand/name-p-1925866?merchantId=105064')
  })

  it('Search', async () => {
    const res = await request(app)
      .get('/api/deeplink-to-web-url')
      .send({
        deeplink: 'ty://?Page=Search&Query=elbise'
      })
    expect(res.status).toEqual(200)
    expect(res.body.webURL).toEqual('https://www.trendyol.com/tum--urunler?q=elbise')
  })

  it('Search', async () => {
    const res = await request(app)
      .get('/api/deeplink-to-web-url')
      .send({
        deeplink: 'ty://?Page=Search&Query=ütü'
      })
    expect(res.status).toEqual(200)
    expect(res.body.webURL).toEqual('https://www.trendyol.com/tum--urunler?q=%C3%BCt%C3%BC')
  })

  /* it('Other - Homepage', async () => {
    const res = await request(app)
      .get('/api/deeplink-to-web-url')
      .send({
        deeplink: 'ty://?Page=Favorites'
      })
    expect(res.status).toEqual(200)
    expect(res.body.webURL).toEqual('https://www.trendyol.com')
  })

  it('Other - Homepage', async () => {
    const res = await request(app)
      .get('/api/deeplink-to-web-url')
      .send({
        deeplink: 'ty://?Page=Orders'
      })
    expect(res.status).toEqual(200)
    expect(res.body.webURL).toEqual('https://www.trendyol.com')
  }) */
})