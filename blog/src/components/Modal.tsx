import { FC, ReactNode } from 'react';
import ReactModal from 'react-modal';

const ModalStyle: ReactModal.Styles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '0',
        padding: '0',
        backgroundColor: 'transparent',
    },
    overlay: {
        zIndex: 100,
        background: 'rgba(0,0,0,0.1)',
        backdropFilter: 'blur(16px)',
    },
};

export const TransparentModal: FC<{
    open: boolean;
    onClose: () => void;
    children: ReactNode;
}> = ({ open, onClose, children }) => {
    return (
        <>
            <ReactModal
                isOpen={open}
                shouldCloseOnEsc
                shouldCloseOnOverlayClick
                onRequestClose={onClose}
                style={ModalStyle}
            >
                {children}
            </ReactModal>
        </>
    );
};
