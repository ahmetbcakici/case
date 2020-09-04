import randomstring from 'randomstring'

//export const urlCheck = (url) => url.includes('trendyol.com')
export const urlCheck = (url) => {
  const regex = /((http(s)?):\/\/)?(www.)?trendyol.com/;
  return regex.test(url)
}
export const getURLPath = (url) => url.split('.com')[1]

export const generateCode = () => {
  const length = Math.floor(Math.random() * 10 + 1);
  const randomString = randomstring.generate({ length, charset: 'alphanumeric' }).toLowerCase()
  return randomString // @TODO: unique check
}