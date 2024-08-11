import { createContext, useContext } from 'react'
import user from './modules/User'
import { makeAutoObservable } from 'mobx'
class RootStore {
  constructor(){
    makeAutoObservable(this)
    this.user = user
  }
}

const store = new RootStore() 
const context=createContext(store)
export const useStore = () => useContext(context)

export default store

