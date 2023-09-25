import { useEffect, useState } from "react";
import Video1 from '../assets/videos/1.mp4'
import { useParams } from "react-router-dom";
import { videoApis } from "../axios-instance";
import { useDispatch } from "react-redux";
import '../library/fontawesome/css/all.min.css'
import './styles/videodetails.css'
import images from '../assets/309431756_799936498003792_6138006382387941828_n.jpg'

const VideoDetails = () => {
    const [video, setVideo] = useState();

    const params = useParams();
    const userId = params.userId;

    useEffect(() => {
        videoApis.get(`/videos/${userId}`).then(res => {
            setVideo(res.data)
        }).catch(e => console.log(e));
    }, [])

    // const dispatch = useDispatch();

    return (
        <div id="videoDetailsContainer">
            <div className='videoInfo'>
                <video loop controls className='videoDetailsPage'>
                    <source src={Video1} type='video/webm' />
                </video>
            </div>
            <div className='videoInfo'>
                <span>
                    <img src={video?.avatar} className='avatarDetails' />
                </span>
                <div>
                    <span><b>{video?.username}</b></span>
                    <span>{video?.fullname}</span>
                    <span>{video?.timeAgo}</span>
                    <button className='followBttn'>Follow</button>
                    <p>{video?.description}</p>
                </div>
                <div className='videoActions'>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-heart"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>{video?.reactAmount}</strong></p>

                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-comment-dots"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>{video?.commentAmount}</strong></p>

                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-bookmark"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>{video?.savedAmount}</strong></p>

                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-code"></i>
                        </span>
                    </button>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-paper-plane"></i>
                        </span>
                    </button>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-brands fa-facebook" style={{ color: '#0075fa' }}></i>
                        </span>
                    </button>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-brands fa-whatsapp" style={{ color: '#25d366' }}></i>
                        </span>
                    </button>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-brands fa-twitter" style={{ color: '#1da1f2' }}></i>
                        </span>
                    </button>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-share"></i>
                        </span>
                    </button>
                </div>
                <h2>Comments ({video?.commentAmount})</h2>
                <div>
                    <div>
                        <span>
                            <img src={images} className='avatarComment' />
                        </span>
                        <span>fullname</span>
                        <p>description</p>
                        <button className='follow_btn'><i className="fa-solid fa-heart"></i></button>
                        <p className='actionAmount'>{video?.reactAmount}</p>
                        <span>1h ago</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoDetails