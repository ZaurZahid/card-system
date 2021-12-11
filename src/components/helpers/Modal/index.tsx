import React from "react";
import style from "./index.module.scss";
import Close from '../Icons/Close';

interface Props {
    children: React.ReactNode,
    onClose: () => void
}

const Modal = ({ children, onClose }: Props) => {
    return (
        <div>
            <div className={style.Popup}>
                <div className={style.ContentContainer}>
                    <div className={style.Content} >
                        <div className={style.Header}>
                            <div className={style.ModalCloseBtn} onClick={onClose}>
                                <Close />
                            </div>
                        </div>
                        <div className={style.ChildContainer}>
                            {children}
                        </div>
                    </div>
                </div>

                <div onClick={onClose} className={style.moduleBackground}> </div>
            </div>
        </div>
    )
}

export default Modal;

