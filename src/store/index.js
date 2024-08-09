import { createContext, useContext } from 'react'
import User from './User'

class Store {
  constructor(){
    this.user = new User()
  }
}

const store = new Store() 
const StoreContext=createContext({ store })
export const useStore = () =>{
  return useContext(StoreContext)
}
export default store

