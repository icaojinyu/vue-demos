function obj2str(obj) {
  let arr = []
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]))
    }
  }
  return arr.join('&')
}

function jsonp(option = {}) {
  return new Promise((resolve, reject) => {
    let {url, params = {}, fnKey = 'callback', timeout = 60 * 10} = option
    let callbackName = params[fnKey] = `jsonp${Date.now()}`
    let script = document.createElement('script')
    document.body.appendChild(script)
    url += url.indexOf('?') === -1 ? '?' + obj2str(params) : '&' + obj2str(params)
    script.src = url

    let timer = setTimeout(() => {
      reject()
    }, timeout)

    window[callbackName] = function (data) {
      resolve(data)
      document.body.removeChild(script)
      clearTimeout(timer)
      delete window[callbackName]
    }
  })
}

module.exports = {
  jsonp
}