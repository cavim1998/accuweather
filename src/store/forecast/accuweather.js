import axios from 'axios'
import { Actions, Getters, Mutations } from '@/core/enums/accuweather'

const state = () => ({
  key: 'EVD5HiPhw2jh5cQ7UUKEPwZD5jTDPm0T',
  locationKey: '',
  result: ''
})

const getters = {
  [Getters.DATA](state) {
    return state.result
  }
}

const mutations = {
  [Mutations.SET_DATA](state, data) {
    state.result = data
  }
}

const actions = {
  async [Actions.GET_LOCATION_KEY]() {
    const apiUrl = `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=EVD5HiPhw2jh5cQ7UUKEPwZD5jTDPm0T&q=Tangerang`
    return await new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: apiUrl
      }).then((response) => {
        state.locationKey = response.data[0].Key
        resolve(response.data[0].Key)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  async [Actions.CALL_TODAY_TEMPERATURE](context, locationKey) {
    const apiUrl = `http://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=EVD5HiPhw2jh5cQ7UUKEPwZD5jTDPm0T`
    return await new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: apiUrl
      }).then((response) => {
        context.commit(String(Mutations.SET_DATA), String(response.data[0].Temperature.Metric.Value))
        resolve()
      }).catch((error) => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}