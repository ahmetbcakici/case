import request from 'supertest'
import app from '../index'
import * as util from '../utils'

describe('Utils', () => {
  it('Should be true.', () => {
    const result = util.deeplinkCheck('ty://?Page=Home')
    expect(result).toEqual(true)
  })

  it('Should be true.', () => {
    const result = util.urlCheck('www.trendyol.com')
    expect(result).toEqual(true)
  })

  it('Should be equal.', () => {
    const result = util.getURLPath('https://www.trendyol.com/butik/liste/kadin')
    expect(result).toEqual('/butik/liste/kadin')
  })

  it('Should be equal.', () => {
    const result = util.getPage('ty://?Page=Search')
    expect(result).toEqual('Search')
  })
})