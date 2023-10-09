import './styles/ShortcutModal.css'

const ShortcutModal = ({isShortcutOpen, onShortcutClose}) => {
    if (!isShortcutOpen) return null;
    return (
        <>
            <div className="modal-overlay">
                <div className="modal-content">
                    <button className='close-button' onClick={onShortcutClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                    <h1 className="modal_title">Keyboard shortcuts</h1>
                    <div className='keyContainer'>
                        <div className='keyDetails'>
                            <span>Go to previous video</span>
                            <i className="fa-regular fa-square-caret-up"></i>
                        </div>
                        <div className='keyDetails'>
                            <span>Go to next video</span>
                            <i className="fa-regular fa-square-caret-down"></i>
                        </div>
                        <div className='keyDetails'>
                            <span>Like video</span>
                            <i className="fa-solid fa-l"></i>
                        </div>
                        <div className='keyDetails'>
                            <span>Mute / unmute video</span>
                            <i className="fa-solid fa-m"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShortcutModal