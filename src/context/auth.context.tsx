import { createContext, useState, useEffect } from "react";
import { checkUserAlreadySignedIn } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
export type User = {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
};

const defaultUser: User = {
  uid: "",
  displayName: "",
  email: "",
  photoURL: "",
};

interface IUserContextInterface {
  userInfo: User;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const UserContext = createContext<IUserContextInterface>({
  userInfo: defaultUser,
  setUser: (user: User) => {},
  clearUser: () => {},
});

export const UserProvider = (props: any) => {
  let navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<User>(defaultUser);
  const setUser = (user: User) => {
    setUserInfo(user);
  };

  const clearUser = () => {
    setUserInfo(defaultUser);
  };

  useEffect(() => {
    const getUser = async () => {
      const user: any = await checkUserAlreadySignedIn();
      if (user) {
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user.photoURL,
          email: user.email,
        });
      } else {
        navigate("/");
        clearUser();
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUser,
        clearUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
