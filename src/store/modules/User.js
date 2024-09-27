import { makeAutoObservable } from "mobx"
import { getStore, setStore, removeStore } from "../../utils/store"
const moduleName = 'user-'

class User {

  token = getStore(`${moduleName}token`) ||''
  username = ''
  phone = ''
  shopId = undefined
  shopName = ''
  shopLogo = ''
  roleName = ''

  constructor(){
    makeAutoObservable(this,{},{autoBind:true})
  }

  // action
  //设置用户基础信息 
  setSates(data,persistent){
    for(let key in data ){
      this[key]=data[key]
      persistent && setStore({name:moduleName+key,content:data[key]})
    }
  }
  clearSates(){
    const statesArr=[
      { name:'token',value:'' },
      { name:'username',value:'' },
      { name:'phone',value:'' },
      { name:'shopId',value:'' },
      { name:'shopName',value:'' },
      { name:'shopLogo',value:'' },
      { name:'roleName',value:'' },
      { name:'rolePermissions',value:[] }
    ]
    statesArr.forEach(item=>{
      this[item.name]=item.value
      removeStore(moduleName+item.name)
    })
  }
}

const user = new User()

export default user


