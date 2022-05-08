import axios, { Axios, AxiosError, AxiosRequestConfig } from 'axios'

async function getCards(url: string) {
  const POKEMONTCG_API_KEY = process.env.POKEMON_API_KEY // Your private api key

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (POKEMONTCG_API_KEY) {
    config.headers['X-Api-Key'] = POKEMONTCG_API_KEY
  }

  try {
    const res = await axios.get<any>(url, config)

    return await res.data.data
  } catch (error) {
    return (error as AxiosError).response
  }
}

export default getCards
