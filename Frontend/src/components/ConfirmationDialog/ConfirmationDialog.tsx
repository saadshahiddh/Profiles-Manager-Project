import React, { ReactNode } from "react";
import "./ConfirmationDialog.css";

interface ConfirmationDialogProps {
    title: string;
    children: ReactNode;
    onConfirm: () => void;
    onClose: () => void;
}



const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
    title,
    children,
    onConfirm,
    onClose,
}) => {

    /**************************************************
     * Template
     */
    return (
        <div className="confirmation-dialog-overlay">
            <div className="confirmation-dialog">
                <div className="text-lg font-semibold mb-3">{title}</div>
                <div className="mb-8">{children}</div>
                <div className="flex items-center justify-between">
                    <button className="btn-close px-3 py-2 bg-gray-500 text-white rounded" onClick={onClose}>Close</button>
                    <button className="btn-confirm px-3 py-2 bg-red-500 text-white rounded" onClick={onConfirm}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationDialog;
