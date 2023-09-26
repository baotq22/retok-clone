import { useEffect, useState } from "react";
import Video1 from '../assets/videos/1.mp4'
import { Link, useParams } from "react-router-dom";
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
                <div className='info-container'>
                    <div>
                        <img src={video?.avatar} className='avatarDetails' />
                    </div>
                    <div className='infoContainer'>
                        <button className='followBttn'>Follow</button>
                        <Link to={`/users/${userId}`} style={{textDecoration: '0', color: '#fff'}}>
                            <span><b>{video?.username}</b></span>
                            <div>{video?.fullname}<span style={{ margin: '0px 4px' }}> · </span>  <span>1h ago</span></div>
                        </Link>
                        <div className='descVid'>{video?.description}</div>
                    </div>
                </div>
                <div className='actionContainer'>
                    <div className='videoActions'>
                        <button className='action_btn'>
                            <span>
                                <i className="fa-solid fa-heart" style={{ fontSize: '20px' }}></i>
                            </span>
                        </button>
                        <div className='actionAmount'><strong>{video?.reactAmount}</strong></div>

                        <button className='action_btn'>
                            <span>
                                <i className="fa-solid fa-comment-dots" style={{ fontSize: '20px' }}></i>
                            </span>
                        </button>
                        <div className='actionAmount'><strong>{video?.commentAmount}</strong></div>

                        <button className='action_btn'>
                            <span>
                                <i className="fa-solid fa-bookmark" style={{ fontSize: '20px' }}></i>
                            </span>
                        </button>
                        <div className='actionAmount'><strong>{video?.savedAmount}</strong></div>
                    </div>
                    <div className='shareBtnContainer'>
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
                </div>
                <h2>Comments ({video?.commentAmount})</h2>
                <div className='comment__container'>
                    <div className='comment__s'>
                        <div>
                            <img src={images} className='avatarComment' />
                        </div>
                        <div className='infoComment'>
                            <span style={{ fontSize: '20px' }}><b>Ajakaui</b></span>
                            <div>Carbonite web goalkeeper gloves are ergonomically designed to give easy fit</div>
                            <div className='reaction_comment'>
                                <button className='follow_btn'><i className="fa-solid fa-heart" style={{ fontSize: '17px' }}></i></button>
                                <div className='actionAmount'>{video?.reactAmount}</div>
                            </div>
                            <span>1h ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoDetails