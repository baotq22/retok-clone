import "../../styles/css/GetAppModal.css"
import qrCode from "../../assets/47624c235266dedd8e4d.png"
import msstore from "../../assets/msstore.png"
import appstore from "../../assets/appstore.png"
import amazon from "../../assets/amazon.png"
import ggplay from "../../assets/ggplay.png"

const GetAppModal = ({ isGetAppOpen, onGetAppClose }) => {
    if (!isGetAppOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onGetAppClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
                <h1 className="modal_title">Get the TikTok App</h1>
                <h3 className="modal_description">Scan QR Code to download TikTok</h3>
                <div className="qrContainer">
                    <img src={qrCode} className="qrCode" />
                </div>
                <h3 className="modal_description_download">Download from app stores</h3>
                <div className="downloadSource">
                    <a href="https://www.microsoft.com/store/apps/9NH2GPH4JZS4">
                        <img className="download_item" src={msstore} />
                    </a>
                    <a href="https://www.tiktok.com/download-link/af/id1235601864">
                        <img className="download_item" src={appstore} />
                    </a>
                    <a href="https://www.amazon.com/dp/B07KR1RJL2/">
                        <img className="download_item" src={amazon} />
                    </a>
                    <a href="https://www.tiktok.com/download-link/af/com.ss.android.ugc.trill">
                        <img className="download_item" src={ggplay} />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default GetAppModal