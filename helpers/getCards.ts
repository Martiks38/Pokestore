import * as axios from 'axios'
import { apiUrl } from 'consts/version'
import { PokemonTCG } from 'pokemon-tcg-sdk-typescript'
import React from 'react'

export const getCards = (
  setCards: React.Dispatch<React.SetStateAction<PokemonTCG.Card[]>>
) => {
  const pageSize = 6
  const page = 1 + Math.floor(Math.random() * 10)
  const params = `?page=${page}&pageSize=${pageSize}`

  const POKEMONTCG_API_KEY = process.env.POKEMON_API_KEY // Your private api key

  const url: string = `${apiUrl}/cards/${params}`

  const config: axios.AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  if (POKEMONTCG_API_KEY) {
    config.headers['X-Api-Key'] = POKEMONTCG_API_KEY
  }

  axios.default
    .get<any>(url, config)
    .then((response) => {
      setCards(response.data.data)
    })
    .catch((error) => setCards(error.response.data))
}
