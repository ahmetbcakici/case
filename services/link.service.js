import { con } from '../index'

export const getCodeByLink = ({ link }) => new Promise((resolve, reject) => {
  con.query(`SELECT short_code as shortCode FROM links WHERE url='${link}'`, (err, result) => {
    if (err) return reject(err)
    if (result.length < 1) return resolve(false)
    return resolve(result[0].shortCode)
  })
})

export const saveShortenedLink = ({ link, code }) => new Promise((resolve, reject) => {
  con.query(`INSERT INTO links (url,short_code) VALUES ('${link}','${code}')`, (err, result) => {
    if (err) return reject(err)
    return resolve()
  })
})

export const getOriginalLink = ({ code }) => new Promise((resolve, reject) => {
  con.query(`SELECT url as url FROM links WHERE short_code='${code}'`, (err, result) => {
    if (err) return reject(err)
    if (result.length < 1) return resolve(false)
    return resolve(result[0].url)
  })
})