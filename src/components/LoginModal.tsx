import '../library/fontawesome/css/all.min.css';
import './styles/loginmodal.css'

const LoginModal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='close-button' onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                {children}
            </div>
        </div>
    )
}

export default LoginModal