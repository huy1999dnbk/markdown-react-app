import { useContext } from "react";
import { UserContext } from "../../context/auth.context";
import { SignInContainer, SignInTitle, WelcomeTitle } from "./sign-in.styles";
import Button from "../button/button.component";
import { signInWithGooglePopUp, createUser } from "../../utils/firebase";
import { useNavigate } from "react-router-dom";
import { User } from "../../context/auth.context";

const SignIn = () => {
  let navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleRedirect = async (user: User) => {
    const { uid, displayName, photoURL, email } = user;
    const userData = {
      uid,
      displayName,
      photoURL,
      email,
    };
    setUser(userData);

    //save user to firestore
    await createUser(userData);

    navigate("/home");
  };

  const handleSignInWithGoogle = (e: Event) => {
    e.preventDefault();
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
