import { useContext, useEffect } from "react";
import { UserContext } from "../../context/auth.context";
import { getAllUsers } from "../../utils/firebase";
const Home: React.FC = () => {
  const { userInfo } = useContext(UserContext);

  return (
    <div>
      <p>{userInfo.photoURL && userInfo.photoURL}</p>
    </div>
  );
};

export default Home;
