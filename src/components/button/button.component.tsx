import { ButtonContainer } from "./button.styles";

interface IButton {
  onClickHandler: (text: string) => void;
  label: string;
}

const Button = ({ label, onClickHandler, ...otherProps }: IButton) => {
  return (
    <ButtonContainer {...otherProps} onClick={onClickHandler}>
      {label}
    </ButtonContainer>
  );
};

export default Button;
