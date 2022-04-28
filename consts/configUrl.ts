/* URL */
const API_URL: string = 'https://api.pokemontcg.io'
const API_VERSION: string = '2'

export const apiUrl: string = `${API_URL}/v${API_VERSION}`

/* card parameters in home */
const pageSize = 6
const page = 1 + Math.floor(Math.random() * 50)
export const paramsHome = `?page=${page}&pageSize=${pageSize}`

/* Default Search */
export const defaultSearch = {
  pathname: '/search/page/1',
}
