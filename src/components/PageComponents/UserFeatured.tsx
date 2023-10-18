import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { videoApis } from "~/api/axios-instance"
import Video1 from "../../assets/videos/1.mp4"
import Video2 from "../../assets/videos/2.mp4"
import Video3 from "../../assets/videos/3.mp4"
import Video4 from "../../assets/videos/4.mp4"
import Video5 from "../../assets/videos/5.mp4"
import imageStill from "../../assets/videos/4-0.png"
import gif from "../../assets/videos/4.gif"

const UserFeatured = () => {
    const [videoList, setVideoList] = useState([])
    const maxLength = 15;
    const fetchVideos = async () => {
        try {
            const res = await videoApis.get("videos")
            setVideoList(res.data)
        } catch (e) {
            if (e.response && e.response.status == 429) {
                const retryDelay = 500
                setTimeout(() => fetchVideos(), retryDelay)
            } else {
                console.log("fail")
            }
        }
    }
    useEffect(() => {
        fetchVideos()
    }, [])

    return (
        <div className="userVideo">
            {videoList.map((user, index) => (
                <div className="userInfo" key={index}>
                    <Link to={`/userFollow/${user?.id}`}>
                        <div className="vidCont">
                            <img src={gif} className="imgUser" />
                            <img src={imageStill} className="imgUserStill" />
                            {/* <video src={Video3} autoPlay={isHovered} muted={true} loop={true} className="imgUser" /> */}
                        </div>
                    </Link>
                    <div className="userFollow">
                        <Link to={`/userFollow/${user.id}`} style={{ textDecoration: "0", color: "#fff" }}>
                            <img src={user?.avatar} className="avatarUser" />
                            <h3 className="user">
                                <b>{user?.username.slice(0, maxLength)}</b>
                            </h3>
                            <h4 className="user">{user?.fullname}</h4>
                        </Link>
                        <button className="followBtn">Follow</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default UserFeatured
