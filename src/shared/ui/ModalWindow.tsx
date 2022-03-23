import { CSSProperties, FC } from 'react';
import Modal from 'react-modal';
import type { OnAfterOpenCallback } from 'react-modal';
import { Button } from '@shared/ui';
import { ReactComponent as Close } from '@shared/assets/close.svg';

const ModalWindow: FC<{
  openModal: () => void;
  afterOpenModal?: OnAfterOpenCallback;
  closeModal: () => void;
  modalIsOpen: boolean;
  question: string;
  approveDisabled?: boolean;
  approveText: string;
  approveAction: () => void;
}> = props => {
  const {
    openModal,
    afterOpenModal,
    modalIsOpen,
    question,
    approveDisabled,
    approveText,
    approveAction,
  } = props;

  const customStyles = {
    content: {
      inset: 'auto',
      display: 'block',
      position: 'relative',
      padding: '12px',
      border: 'none',
      borderRadius: '0%',
    } as CSSProperties,
    overlay: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backdropFilter: 'blur(5px)',
      background: 'rgba(2, 22, 28, 0.3)',
    } as CSSProperties,
  };

  Modal.setAppElement('#root');

  function closeModal() {
    props.closeModal();
  }

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Are you sure modal"
        bodyOpenClassName={`overflow-hidden`}
        overlayClassName={'fixed inset-0 z-50'}
      >
        <div className="flex justify-end mb-4">
          <Close
            className="cursor-pointer"
            onClick={() => {
              closeModal();
            }}
          />
        </div>
        <div className="font-semibold text-2xl w-[282px] mx-10 text-center mb-6">
          {question}
        </div>
        {props.children}
        <div className="flex gap-4 px-9 pb-9">
          <Button
            variant="outline"
            onClick={() => {
              closeModal();
            }}
          >
            Отменить
          </Button>
          <Button
            disabled={
              typeof approveDisabled != undefined ? approveDisabled : false
            }
            onClick={() => {
              approveAction();
              closeModal();
            }}
          >
            {approveText}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ModalWindow;
