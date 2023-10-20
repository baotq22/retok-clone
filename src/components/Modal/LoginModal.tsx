import { useEffect } from "react";
import "../../library/fontawesome/css/all.min.css"
import "../../styles/css/loginmodal.css"

const LoginModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null

    useEffect(() => {
        const keyDownHandler = (event) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        document.addEventListener("keydown", keyDownHandler)

        return () => {
            document.removeEventListener("keydown", keyDownHandler)
        }
    }, []);

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                {children}
            </div>
        </div>
    )
}

export default LoginModal
