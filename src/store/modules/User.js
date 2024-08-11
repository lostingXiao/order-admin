import { makeAutoObservable, values } from "mobx"
import { getStore, setStore, removeStore } from "../../utils/store"
const moduleName = 'user-'


class User {

  token = getStore(`${moduleName}token`) ||''
  username = getStore(`${moduleName}username`) || ''
  phone = getStore(`${moduleName}phone`) || ''
  shopId = getStore(`${moduleName}shopId`) || null
  shopName = getStore(`${moduleName}shopName`) || ''
  shopLogo = getStore(`${moduleName}shopLogo`) || ''
  roleName = getStore(`${moduleName}roleName`) || ''
  rolePermissions = getStore(`${moduleName}rolePermissions`) || []

  constructor(){
    makeAutoObservable(this,{},{autoBind:true})
  }

  // action
  //设置用户基础信息 
  setSates(data){
    for(let key in data ){
      this[key]=data[key]
      setStore({name:moduleName+key,content:data[key]})
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


