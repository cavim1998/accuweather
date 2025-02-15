import { createStore } from 'vuex'
import accuweather from "./forecast/accuweather"

const store = createStore({
  modules: {
    accuweather
  }
})

export default store