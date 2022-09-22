import { useContext } from "react";
import { UserContext } from "../../context/auth.context";
import {
  NavbarContainer,
  SignoutButton,
  InfoUserContent,
} from "./navbar.styles";
import { signOutGoogle } from "../../utils/firebase";
const Navbar = () => {
  const { clearUser, userInfo } = useContext(UserContext);
  const redirectAfterSignout = () => {
    clearUser();
  };

  const handleSignout = () => {
    signOutGoogle(redirectAfterSignout);
  };

  return (
    <NavbarContainer>
      <InfoUserContent>
        {userInfo.displayName} - {userInfo.email}
      </InfoUserContent>
      <SignoutButton onClick={handleSignout}>Sign out</SignoutButton>
    </NavbarContainer>
  );
};

export default Navbar;
