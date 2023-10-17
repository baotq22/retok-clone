import { Link, useLocation } from "react-router-dom"
import FollowingSideBar from "./FollowingSideBar"
import effectBtn from "../../assets/d8db931296c3e5645b1e.png"
import { useState } from "react"

const MainSidebar = () => {
    const location = useLocation()
    const url = location.pathname

    const preventFailedScreen = () => {
        window.location.reload(false)
    }

    let content

    if (url == "/") {
        content = (
            <>
                <li className="itemLink" onClick={preventFailedScreen}>
                    <Link to={`/`} className="mainLink">
                        <div className="nav selected">
                            <i className="icon fa-solid fa-home"></i>
                            <span>For you</span>
                        </div>
                    </Link>
                </li>
                <li className="itemLink" onClick={preventFailedScreen}>
                    <Link to={`/following`} className="mainLink">
                        <div className="nav">
                            <i className="icon fa-solid fa-user-group"></i>
                            <span>Following</span>
                        </div>
                    </Link>
                </li>
            </>
        )
    } else if (url == "/following") {
        content = (
            <>
                <li className="itemLink" onClick={preventFailedScreen}>
                    <Link to={`/`} className="mainLink">
                        <div className="nav">
                            <i className="icon fa-solid fa-home"></i>
                            <span>For you</span>
                        </div>
                    </Link>
                </li>
                <li className="itemLink" onClick={preventFailedScreen}>
                    <Link to={`/following`} className="mainLink">
                        <div className="nav selected">
                            <i className="icon fa-solid fa-user-group"></i>
                            <span>Following</span>
                        </div>
                    </Link>
                </li>
            </>
        )
    } else {
        content = (
            <>
                <li className="itemLink" onClick={preventFailedScreen}>
                    <Link to={`/`} className="mainLink">
                        <div className="nav">
                            <i className="icon fa-solid fa-home"></i>
                            <span>For you</span>
                        </div>
                    </Link>
                </li>
                <li className="itemLink" onClick={preventFailedScreen}>
                    <Link to={`/following`} className="mainLink">
                        <div className="nav">
                            <i className="icon fa-solid fa-user-group"></i>
                            <span>Following</span>
                        </div>
                    </Link>
                </li>
            </>
        )
    }

    const [viewMore, setViewMore] = useState(false)
    const toggleContent = () => {
        setViewMore(!viewMore)
    }

    return (
        <>
            <ul className="itemLinkAll">
                {content}
                <li className="itemLink">
                    <Link to={`/#`} className="mainLink">
                        <div className="nav">
                            <i className="icon fa-solid fa-compass"></i>
                            <span>Explore</span>
                            <span id="badge">New</span>
                        </div>
                    </Link>
                </li>
                <li className="itemLink">
                    <Link to={`/#`} className="mainLink">
                        <div className="nav">
                            <i className="icon fa-solid fa-video"></i>
                            <span>LIVE</span>
                        </div>
                    </Link>
                </li>
            </ul>
            <FollowingSideBar />
            <div className="effectContainer">
                <a href="#">
                    <img src={effectBtn} className="effectBtn" />
                </a>
            </div>
            <div className="bottom" style={{ marginBottom: "100px" }}>
                <div className="info">
                    <a href="#" className="link">
                        <span>About</span>
                    </a>
                    <a href="#" className="link">
                        <span>Newsroom</span>
                    </a>
                    <a href="#" className="link">
                        <span>Contact</span>
                    </a>
                    <div className="info">
                        <a href="#" className="link">
                            <span>Careers</span>
                        </a>
                    </div>
                </div>
                <div className="info">
                    <a href="#" className="link">
                        <span>Retok for Good</span>
                    </a>
                    <a href="#" className="link">
                        <span>Advertise</span>
                    </a>
                    <a href="#" className="link">
                        <span>Developers</span>
                    </a>
                    <a href="#" className="link">
                        <span>Transparency</span>
                    </a>
                </div>
                <div className="info">
                    <a href="#" className="link">
                        <span>Retok Rewards</span>
                    </a>
                    <div className="info">
                        <a href="#" className="link">
                            <span>Retok Embeds</span>
                        </a>
                    </div>
                </div>
                <div className="info">
                    <a href="#" className="link">
                        <span>Helps</span>
                    </a>
                    <a href="#" className="link">
                        <span>Safety</span>
                    </a>
                    <a href="#" className="link">
                        <span>Term</span>
                    </a>
                    <a href="#" className="link">
                        <span>Privacy</span>
                    </a>
                    <a href="#" className="link">
                        <span>Creator Portal</span>
                    </a>
                </div>
                <div className="info">
                    <a href="#" className="link">
                        <span>Community Guidelines</span>
                    </a>
                </div>

                {viewMore && (
                    <p>
                        <div className="infoMore">
                            <a href="#" className="link">
                                <span>Dance</span>
                            </a>
                            <a href="#" className="link">
                                <span>Arts</span>
                            </a>
                            <a href="#" className="link">
                                <span>Food and Drink</span>
                            </a>
                            <a href="#" className="link">
                                <span>Tourism</span>
                            </a>
                        </div>
                        <div className="infoMore">
                            <a href="#" className="link">
                                <span>Production and Manufacturing</span>
                            </a>
                            <a href="#" className="link">
                                <span>Vehicles and Transportation</span>
                            </a>
                            <a href="#" className="link">
                                <span>Relationship</span>
                            </a>
                            <a href="#" className="link">
                                <span>Retok Style</span>
                            </a>
                            <a href="#" className="link">
                                <span>Athletics</span>
                            </a>
                            <a href="#" className="link">
                                <span>Hobbies</span>
                            </a>
                        </div>
                    </p>
                )}
                <button className="more" onClick={toggleContent}>
                    {viewMore ? "See Less" : "See More"}
                </button>
                <p className="info" style={{ paddingBottom: "30px" }}>
                    © 2023 ReTok
                </p>
            </div>
        </>
    )
}

export default MainSidebar
