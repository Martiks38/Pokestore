import * as axios from 'axios'

async function getCards(url: string) {
  const POKEMONTCG_API_KEY = process.env.POKEMON_API_KEY // Your private api key

  const config: axios.AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (POKEMONTCG_API_KEY) {
    config.headers['X-Api-Key'] = POKEMONTCG_API_KEY
  }

  const res = await axios.default.get<any>(url, config)

  return await res.data.data
}

export default getCards
