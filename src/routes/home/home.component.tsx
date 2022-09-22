import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/auth.context";
import { NoteContext } from "../../context/note.context";
import { useNavigate } from "react-router-dom";
import { HomeContainer } from "./home.styles";
import EditorText from "../../components/rich-editor/editor-text.component";
import { addNote } from "../../utils/firebase";
import ListNotes from "../../components/list-note/list-note.component";

const WELCOME_TITLE = "Welcome to note app, please edit here to save your note";

const Home: React.FC = () => {
  let navigate = useNavigate();
  const { objNotes, getAllNotesFunc } = useContext(NoteContext);

  const { userInfo } = useContext(UserContext);

  const onSubmit = async (text: string) => {
    if (!text) {
      return alert("Please add something to editor!!!!!!!!");
    }
    await addNote(text, userInfo.email);
    getListNote();
  };

  const onCancel = () => {
    // console.log("cancel");
  };

  const getListNote = async () => {
    await getAllNotesFunc(userInfo.email);
  };

  useEffect(() => {
    if (!userInfo.uid) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    getListNote();
  }, []);

  return (
    <HomeContainer>
      <EditorText
        onSubmit={onSubmit}
        onCancel={onCancel}
        textContent={WELCOME_TITLE}
      />
      <ListNotes listNotes={objNotes.listNotes} />
    </HomeContainer>
  );
};

export default Home;
