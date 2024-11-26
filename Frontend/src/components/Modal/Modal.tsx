import React from 'react';
import './Modal.css';  // You can style it using CSS
import { FaXmark } from 'react-icons/fa6';
import MyButton from '../MyButton/MyButton';

interface ModalProps {
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal bg-white p-5 rounded" onClick={(e) => e.stopPropagation()}>
                <div className="w-full flex justify-end">
                    <FaXmark className="cursor-pointer" onClick={onClose} />
                </div>
                <hr className='my-3' />
                <div className="mt-5">
                    {children}
                </div>
                <hr className='my-3' />
                <div className="w-full flex justify-end">
                    <MyButton label='Close' color='gray' onBtnClick={onClose} />
                </div>
            </div>
        </div>
    );
};

export default Modal;
