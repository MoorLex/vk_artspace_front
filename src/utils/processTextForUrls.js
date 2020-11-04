function parseUrl(data) {
  const url = new URL(data)
  const host = url.host.replace(/^(www\.)/, '')

  if (url.pathname === '/') {
    return host
  }

  return url.pathname
}

function makeLink(link, url) {
  return `<a class="underline" href="${link}" target="_blank">${url}</a>`
}

function processTextForUrls(text) {
  if (!text) {
    return text
  }

  let urlPattern = /(\b(https?):\/\/|\b(www\.))([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])+(\b|$)/gim
  let emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim

  return text
    .replace(urlPattern, (match, p1) => {
      if (p1 === 'www.') {
        match = 'http://' + match
      }

      return makeLink(match, parseUrl(match))
    })
    .replace(emailAddressPattern, '<a class="underline" href="mailto:$&" target="_blank">$&</a>')
}


export const checkUrlsInText = (text = '') => {
  let correct = true

  if (!text) {
    return correct
  }

  const urlPattern = /(\b(https?):\/\/|\b(www\.))([-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])+(\b|$)/gim
  const result = text.match(urlPattern)

  if (result) {
    result.forEach((link) => {
      const url = new URL(link)
      if (url.host.replace(/^(www\.)/, '') !== 'vk.com') {
        correct = false
      }
    })
  }

  return correct
}

export default processTextForUrls
