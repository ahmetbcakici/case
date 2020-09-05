import { con } from '../index'

export const findSectionIdByName = ({ sectionName }) => new Promise((resolve, reject) => {
  con.query(`SELECT id as id FROM sections WHERE slug='${sectionName}'`, (err, result) => {
    if (err) return reject(err)
    if (result.length < 1) return resolve(false)
    return resolve(result[0].id)
  })
})

export const findSectionNameById = ({ sectionId }) => new Promise((resolve, reject) => {
  con.query(`SELECT slug as slug FROM sections WHERE id='${sectionId}'`, (err, result) => {
    if (err) return reject(err)
    if (result.length < 1) return resolve(false)
    return resolve(result[0].slug)
  })
})