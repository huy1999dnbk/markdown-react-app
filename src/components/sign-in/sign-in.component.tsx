import { useContext } from "react";
import { UserContext } from "../../context/auth.context";
import { SignInContainer, SignInTitle, WelcomeTitle } from "./sign-in.styles";
import Button from "../button/button.component";
import { signInWithGooglePopUp, createUser } from "../../utils/firebase";
import { User } from "../../context/auth.context";

const SignIn = () => {
  const { setUser } = useContext(UserContext);

  const handleRedirect = async (user: User) => {
    const { uid, displayName, photoURL, email } = user;
    const userData = {
      uid,
      displayName,
      photoURL,
      email,
    };
    await createUser(userData);
    setUser(userData);
  };

  const handleSignInWithGoogle = () => {
    signInWithGooglePopUp(handleRedirect);
  };

  return (
    <SignInContainer>
      <WelcomeTitle>Welcome to markdown app</WelcomeTitle>
      <SignInTitle>SIGN IN</SignInTitle>
      <Button
        label="Sign In With Google"
        onClickHandler={handleSignInWithGoogle}
      />
    </SignInContainer>
  );
};

export default SignIn;
