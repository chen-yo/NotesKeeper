// 🐨 get the queryCache from 'react-query'
import * as auth from '../auth-provider'
const apiURL = ''
let token = ''

async function client(
  endpoint,
  {data, headers: customHeaders, ...customConfig} = {},
) {
  const config = {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      Email: token ? token : undefined,
      'Content-Type': data ? 'application/json' : undefined,
      ...customHeaders,
    },
    ...customConfig,
  }

  return window.fetch(`${apiURL}/${endpoint}`, config).then(async response => {
    if (response.status === 401) {
      // 🐨 call queryCache.clear() to clear all user data from react-query
      await auth.logout()
      // refresh the page for them
      window.location.assign(window.location)
      return Promise.reject({message: 'Please re-authenticate.'})
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

function setUserToken(userToken) {
  token = userToken
}

export {client, setUserToken}
