import { useContext, useState, useRef } from "react";
import { NoteContext } from "../../context/note.context";
import { UserContext } from "../../context/auth.context";
import parse from "html-react-parser";
import { Note } from "../../type/types";
import {
  NoteContainer,
  HeaderNote,
  MenuIcon,
  CreatedAtTitle,
  NoteContent,
  TitleEditNote,
  EditorContainer,
} from "./note.styles";
import ModalApp from "../modal/modal.component";
import EditorText from "../rich-editor/editor-text.component";
import useClickOutside from "../../hooks/useClickOutSide";
import PopupItem from "../popup/popup.component";
const NoteItem = ({
  id,
  createdAt,
  content,
  openPopup,
  setOpenPopup,
}: Note) => {
  const popupRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const { userInfo } = useContext(UserContext);
  const { deleteNoteFunc, updateNoteFunc } = useContext(NoteContext);

  useClickOutside(popupRef, () => {
    if (setOpenPopup) {
      setOpenPopup(null);
    }
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleShowPopup = (event: MouseEvent | TouchEvent) => {
    event.stopPropagation();
    if (setOpenPopup) {
      setOpenPopup((prev) => (prev === id ? null : id));
    }
  };

  const onSubmit = async (text: string) => {
    await updateNoteFunc(userInfo.email, id, text);
    closeModal();
  };

  const onCancel = () => {
    closeModal();
  };

  const renderModal = () => {
    return (
      <ModalApp modalIsOpen={showModal} closeModal={closeModal}>
        <EditorContainer>
          <TitleEditNote>Edit Note</TitleEditNote>
          <EditorText
            textContent={content}
            onSubmit={onSubmit}
            onCancel={onCancel}
          />
        </EditorContainer>
      </ModalApp>
    );
  };

  return (
    <NoteContainer>
      <HeaderNote>
        <CreatedAtTitle>Created At {createdAt}</CreatedAtTitle>
        <MenuIcon onClick={handleShowPopup}>&#8230;</MenuIcon>
        {openPopup === id && (
          <PopupItem
            handleDeleteNote={deleteNoteFunc}
            id={id}
            setOpenPopup={setOpenPopup}
            email={userInfo.email}
          />
        )}
      </HeaderNote>

      <NoteContent onClick={openModal}>{parse(content)}</NoteContent>
      {renderModal()}
    </NoteContainer>
  );
};

export default NoteItem;
