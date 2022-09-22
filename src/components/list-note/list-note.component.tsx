import { useState, Dispatch, SetStateAction } from "react";
import { ListNotesContainer } from "./list-note.styles";
import Note from "../note/note.component";
import { ListNote } from "../../type/types";

const ListNotes = ({ listNotes }: ListNote) => {
  const [openPopup, setOpenPopup] = useState<string | null>(null);
  return (
    <ListNotesContainer>
      {listNotes?.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          createdAt={note.createdAt}
          content={note.content}
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
        />
      ))}
    </ListNotesContainer>
  );
};

export default ListNotes;
