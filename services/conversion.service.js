import { con } from '../index'

export const saveConversion = ({ deeplink, webURL }) => new Promise((resolve, reject) => {
  con.query(`INSERT INTO conversions (deeplink,weburl) VALUES ('${deeplink}','${webURL}')`, (err, result) => {
    if (err) return reject(err)
    return resolve()
  })
})

export const getConversionIfExisting = ({ deeplink, webURL }) => new Promise((resolve, reject) => {
  con.query(`SELECT deeplink as deeplink, weburl as weburl FROM conversions WHERE deeplink='${deeplink}' OR weburl='${webURL}'`, (err, result) => {
    if (err) return reject(err)
    if (result.length < 1) return resolve(false)

    if (deeplink) return resolve(result[0].weburl)
    return resolve(result[0].deeplink)
  })
})