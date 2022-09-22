export type Note = {
  id: string;
  createdAt: string;
  content: string;
  openPopup?: string | null;
  setOpenPopup?: React.Dispatch<React.SetStateAction<string | null>>;
};
export type ListNote = {
  listNotes: Array<Note> | null;
};
