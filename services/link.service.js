import { con } from '../index'

export const getCodeByLink = ({ link }) => new Promise((resolve, reject) => {
  con.query(`SELECT short_code as shortCode FROM links WHERE url='${link}'`, (err, result) => {
    if (err) return reject(err)
    if (result.length < 1) return resolve(false)
    return resolve(result[0].shortCode)
  })
})

export const saveShortenedLink = ({ code, conversionId }) => new Promise((resolve, reject) => {
  con.query(`INSERT INTO links (short_code,conversionId) VALUES ('${code}',${conversionId})`, (err, result) => {
    if (err) return reject(err)
    return resolve()
  })
})

export const getConversionIdByCode = ({ code }) => new Promise((resolve, reject) => {
  con.query(`SELECT conversionId as conversionId FROM links WHERE short_code='${code}'`, (err, result) => {
    if (err) return reject(err)
    if (result.length < 1) return resolve(false)
    return resolve(result[0].conversionId)
  })
})