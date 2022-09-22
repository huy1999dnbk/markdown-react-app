import { createContext, useState } from "react";
import { ListNote, Note } from "../type/types";
import { getAllNotes, deleteNote, updateNote } from "../utils/firebase";

type ObjectNote = {
  listNotes: Note[] | null;
  isLoading: boolean;
};

const defaultListNote: ObjectNote = {
  listNotes: null,
  isLoading: false,
};

interface INoteContext {
  objNotes: ObjectNote;
  getAllNotesFunc: (email: string) => void;
  deleteNoteFunc: (email: string, id: string) => void;
  updateNoteFunc: (email: string, id: string, content: string) => void;
}

export const NoteContext = createContext<INoteContext>({
  objNotes: defaultListNote,
  getAllNotesFunc: (email: string) => {},
  deleteNoteFunc: (email: string, id: string) => {},
  updateNoteFunc: (email: string, id: string, content: string) => {},
});

export const NoteProvider = ({ children }: any) => {
  const [objNotes, setObjNotes] = useState<ObjectNote>(defaultListNote);

  const getAllNotesFunc = async (email: string) => {
    setObjNotes({ ...objNotes, isLoading: true });
    const notes: any = await getAllNotes(email);
    setObjNotes({ ...objNotes, isLoading: false, listNotes: notes });
  };

  const deleteNoteFunc = async (email: string, id: string) => {
    await deleteNote(email, id);
    await getAllNotesFunc(email);
  };

  const updateNoteFunc = async (email: string, id: string, content: string) => {
    await updateNote(email, id, content);
    await getAllNotesFunc(email);
  };
  return (
    <NoteContext.Provider
      value={{ objNotes, getAllNotesFunc, deleteNoteFunc, updateNoteFunc }}
    >
      {children}
    </NoteContext.Provider>
  );
};
