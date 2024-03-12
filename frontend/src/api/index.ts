import axios from 'axios'
import { store } from '..'
import { SignUpFormData } from '../actions/auth'
import { WagerFormData } from '../components/Game'

const API = axios.create({ baseURL: 'http://localhost:5000' })
const version = 'v1'

API.interceptors.request.use(req => {
  const state = store.getState()
  const token = state?.auth?.token

  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  } else {
    console.error('no token in headers')
  }

  return req
})
export const login = (formData: SignUpFormData) => API.post(`/api/${version}/auth/login`, formData)
export const signUp = (formData: SignUpFormData) => API.post(`/api/${version}/auth/signup`, formData)

export const submitWager = (formData: WagerFormData) => API.post(`/api/${version}/game/wager`, formData)
export const refillTokens = () => API.patch(`/api/${version}/game/refill`)
export const getGame = () => API.get(`/api/${version}/game`)
