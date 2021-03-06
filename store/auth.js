import { action, observable, computed } from 'mobx'

import { tokenHelper } from '../helpers'
// import { client } from '../api'

export default class {
  constructor(root) {
    this.root = root
    this.client = root.client
    this.init()
  }

  @observable
  afterAuth = false

  @observable
  user = undefined

  async init() {
    if (typeof window === 'undefined') return
    const { accessToken, refreshSecret, refreshToken } = this.localStorageData()
    if (accessToken && tokenHelper.isValid(accessToken)) {
      this.onTokenReceived({ accessToken })
      await this.getUserData()
    } else if (refreshToken && refreshSecret) {
      await this.getToken({ refreshToken, refreshSecret })
      await this.getUserData()
    }
    this.afterAuth = true
  }

  localStorageData = () => {
    const accessToken = sessionStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const refreshSecret = localStorage.getItem('refreshSecret')
    return { accessToken, refreshSecret, refreshToken }
  }

  async getUserData() {
    try {
      const data = await this.client.post('users/data')
      if (!this.user) {
        this.onLoginSuccess(data)
      }
      this.onDataReceived(data)
    } catch (error) {
      if (error.message !== 'Failed to fetch') {
        this.resetCookies()
      } else {
        // TODO: inform user backend is currently down
        // maybe directly from client callback?
      }
    }
  }

  @action
  onDataReceived({ projects, months }) {
    this.root.setProjects(projects)
    this.root.setMonths(months)
  }

  handleLogin = async ({ email, password }) => {
    const data = await this.client.post('users/login', { email, password })
    this.onTokenReceived(data)
    this.onLoginSuccess(data)
    this.getUserData(data)
  }

  handleRegister = ({ email, name, password }) => {
    this.client.post('users/register', { email, name, password })
  }

  @action
  async onLoginSuccess({ user }) {
    if (user) this.user = user
  }

  async getToken({ refreshToken, refreshSecret }) {
    try {
      const data = await this.client.post('users/token', { refreshToken, refreshSecret })
      this.onTokenReceived(data)
    } catch (error) {
      console.error(error)
    }
  }

  @action
  onTokenReceived({ accessToken, refreshToken, refreshSecret }) {
    if (accessToken) {
      sessionStorage.setItem('accessToken', accessToken)
      this.client.setHeader('Authorization', `Bearer ${accessToken}`)
      // this.client.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }
    if (refreshSecret) {
      localStorage.setItem('refreshSecret', refreshSecret)
    }
  }

  @action
  resetCookies = () => {
    sessionStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('refreshSecret')
    this.user = undefined
    this.root.resetLocalData()
  }

  @computed
  get isLoggedIn() {
    if (!this.afterAuth) return undefined
    return this.user !== undefined
  }
}
