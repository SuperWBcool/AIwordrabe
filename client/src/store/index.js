import { createStore } from 'vuex'
import user from './user'
import clothes from './clothes'
import match from './match'

export default createStore({
  modules: {
    user,
    clothes,
    match
  }
})