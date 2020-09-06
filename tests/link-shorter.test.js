import request from 'supertest'
import app from '../index'

describe('Post /link-shorter', () => {
  it('Should be correct response.', async () => {
    const res = await request(app)
      .post('/api/link-shorter')
      .send({
        link: 'https://www.trendyol.com/asus/dizustu-laptop-p-19304'
      })
    expect(res.status).toEqual(200)
  })

  it('Not valid request.', async () => {
    const res = await request(app)
      .post('/api/link-shorter')
      .send({})
    expect(res.status).toEqual(400)
  })
})