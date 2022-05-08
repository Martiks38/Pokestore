import * as axios from 'axios'
import { useEffect, useState } from 'react'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import { apiUrl } from 'consts/configUrl'

interface error {
  data: string
  status: number
}

function useFetchingCard(resource: string, params?: string) {
  const [cards, setCards] = useState(
    [] as PokemonTCG.Card[] | PokemonTCG.Card | error
  )

  const POKEMONTCG_API_KEY = process.env.POKEMON_API_KEY // Your private api key
  const url: string = `${apiUrl}/${resource}/${params}`

  useEffect(() => {
    const config: axios.AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (POKEMONTCG_API_KEY) config.headers['X-Api-Key'] = POKEMONTCG_API_KEY

    axios.default
      .get<any>(url, config)
      .then((response) => {
        const data = response.data.data
        setCards(data)
      })
      .catch((error) => {
        const { data, status } = error
        setCards({
          data: data?.error.messsage || 'An error has occurred.',
          status,
        })
      })
  }, [url, POKEMONTCG_API_KEY])

  return cards
}

export default useFetchingCard
