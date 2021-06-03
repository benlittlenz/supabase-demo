import { useState } from 'react';

export const useModalProps = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return {
    isModalOpen,
    openModal: () => {
      setIsModalOpen(true);
    },
    closeModal: () => {
      setIsModalOpen(false);
    },
  };
};