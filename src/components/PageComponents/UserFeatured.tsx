import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { videoApis } from "~/api/axios-instance"
import imageStill from "../../assets/videos/4-0.png"
import gif from "../../assets/videos/4.gif"
import Skeleton from '@mui/material/Skeleton';

type UserDetailObject = {
    id: string
    avatar: string
    username: string
    fullname: string
}

const UserFeatured = () => {
    const [videoList, setVideoList] = useState<Array<UserDetailObject>>([])
    const maxLength = 15
    const fetchVideos = async () => {
        setLoading(true)
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
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchVideos()
    }, [])

    const [loading, setLoading] = useState(false);

    return (
        <div className="userVideo">
            {loading ? (
                <>
                    {videoList.map(() => (
                        <div className="userInfo">
                            <div className="vidCont">
                                <Skeleton sx={{ bgcolor: 'grey.800' }} variant="rounded" width={230} height={302} />
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <>
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
                </>
            )}
        </div>
    )
}

export default UserFeatured
