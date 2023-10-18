import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { videoApis } from "~/api/axios-instance"

const UserFeatured = () => {
    const [videoList, setVideoList] = useState([])
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
                        <img src={user?.imgVideo} className="imgUser" />
                    </Link>
                    <div className="userFollow">
                        <Link
                            to={`/userFollow/${user.id}`}
                            style={{ textDecoration: "0", color: "#fff" }}
                        >
                            <img src={user?.avatar} className="avatarUser" />
                            <h3 className="user">
                                <b>{user?.username}</b>
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