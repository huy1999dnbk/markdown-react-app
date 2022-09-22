import styled from "styled-components";
export const Popup = styled.div`
  position: absolute;
  width: 100px;
  height: 50px;
  right: 0;
  top: 100%;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  background: white;
  z-index: 1000;
`;

export const Label = styled.label`
  color: #212121;
  cursor: pointer;
`;

export const Option = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background: black;
  }
  &:hover ${Label} {
    color: white;
  }
`;
