import { type } from "@testing-library/user-event/dist/type"
import { makeAutoObservable } from "mobx"


class User {
  
  token=''
  name=''
  shopID=''
  shopName=''
  shopLogo=''
  roleName=''

  constructor(){
    makeAutoObservable(this,{},{autoBind:true})
  }

  // action
  //设置用户基础信息 
  setSates(key,data){
    if(typeof key === 'string'){
      this[key]=data
    }else{
      for( let key in data ){
        this[key]=data[key]
      }
    }
  }
}

export default User

