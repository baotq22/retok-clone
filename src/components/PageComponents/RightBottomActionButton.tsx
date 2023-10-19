import { useState } from "react"
import "../../library/fontawesome/css/all.min.css"
import GetAppModal from "../Modal/GetAppModal"
import "../../styles/css/RightBottomActionButton.css"

const RightBottomActionButton = () => {
    const [isModalGetAppOpen, setIsModalGetAppOpen] = useState(false)

    const openModal = () => {
        setIsModalGetAppOpen(true)
    }

    const closeModal = () => {
        setIsModalGetAppOpen(false)
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <>
            <div className="RBABContainer">
                <button onClick={openModal} className="getApp">
                    Get App
                </button>
                <button onClick={scrollToTop} className="RightBottomActionButton">
                    <i className="fa-solid fa-forward-step fa-rotate-270"></i>
                </button>
                <GetAppModal isGetAppOpen={isModalGetAppOpen} onGetAppClose={closeModal} />
            </div>
        </>
    )
}

export default RightBottomActionButton
