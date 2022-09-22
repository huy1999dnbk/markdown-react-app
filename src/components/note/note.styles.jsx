import styled from "styled-components";

export const NoteContainer = styled.div`
  padding: 10px;
  margin-bottom: 30px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;

export const HeaderNote = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  border-bottom: 1px solid black;
`;

export const MenuIcon = styled.span`
  font-size: 30px;
  cursor: pointer;
`;

export const CreatedAtTitle = styled.span`
  font-size: 16px;
  color: #212121;
  margin-right: 20px;
  transform: translateY(10px);
`;

export const NoteContent = styled.div`
  cursor: pointer;
`;

export const EditorContainer = styled.div`
  width: 100%;
`;

export const TitleEditNote = styled.h2`
  color: #212121;
  text-align: center;
`;
