import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutSide";
import { Popup, Label, Option } from "./popup.styles";

interface Popup {
  id: string;
  email: string;
  setOpenPopup: React.Dispatch<React.SetStateAction<string | null>> | undefined;
  handleDeleteNote: (email: string, id: string) => void;
}

const PopupItem = ({ setOpenPopup, handleDeleteNote, id, email }: Popup) => {
  const popupRef = useRef(null);
  const handleDelete = async () => {
    await handleDeleteNote(email, id);
  };

  useClickOutside(popupRef, () => {
    if (setOpenPopup) {
      setOpenPopup(null);
    }
  });
  return (
    <Popup ref={popupRef}>
      <Option onClick={handleDelete}>
        <Label>Delete</Label>
      </Option>
    </Popup>
  );
};

export default PopupItem;
