import { createContext, useState } from "react";


type User = {
  uid:string,
  name:string,
  email:string,
}

const defaultUser:User = {
  uid:'',
  name:'',
  email:'',
}

interface IUserContextInterface {
  userInfo:User,
  setUser:(user:User) => void,
  clearUser:() => void
}


export const UserContext = createContext<IUserContextInterface>({
  userInfo:defaultUser,
  setUser:(user:User) => {},
  clearUser:() => {}
});

export const UserProvider = (props:any) => {
  const [userInfo, setUserInfo] = useState<User>(defaultUser);

  const setUser = (user:User) => {
    setUserInfo(user)
  }

  const clearUser = () => {
    setUserInfo(defaultUser)
  }

  
  return <UserContext.Provider value={{
    userInfo,
    setUser,
    clearUser
  }}>
      {props.children}
  </UserContext.Provider>;
};
