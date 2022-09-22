import React from "react";

import Modal from "react-modal";

interface ModalType {
  modalIsOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
}

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    zIndex: "2000",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80vw",
    height: "80vh",
    zIndex: "2000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const ModalApp = ({ modalIsOpen, closeModal, children }: ModalType) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      {children}
    </Modal>
  );
};

export default ModalApp;
