import randomstring from 'randomstring'

//export const urlCheck = (url) => url.includes('trendyol.com')
export const urlCheck = (url) => {
  const rule = /((http(s)?):\/\/)?(www.)?trendyol.com/;
  return rule.test(url)
}
export const deeplinkCheck = (link) => {
  const rule = /ty:\/\/\?Page=.+/;
  return rule.test(link)
}
export const getURLPath = (url) => url.split('.com')[1]
export const getPage = (url) => url.split('Page=').pop().split('&')[0];

export const generateCode = () => {
  const length = Math.floor(Math.random() * 10 + 1);
  const randomString = randomstring.generate({ length, charset: 'alphanumeric' }).toLowerCase()
  return randomString // @TODO: unique check
}

/* @TODO: write a func return that is deeplink or weburl? */