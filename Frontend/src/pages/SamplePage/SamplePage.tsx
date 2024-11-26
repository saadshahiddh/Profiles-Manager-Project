import React, { useState } from 'react'
import Modal from '../../components/Modal/Modal';

const SamplePage = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Custom Modal Title</h2>
        <p>This is the content inside the modal!</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
  );
}

export default SamplePage