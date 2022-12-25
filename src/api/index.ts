import axios from 'axios'

export const BASE_URL = 'https://rickandmortyapi.com/api'

export const api = axios.create({
  baseURL: BASE_URL,
})
