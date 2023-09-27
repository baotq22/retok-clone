import { useEffect, useState } from "react";
import Video1 from '../assets/videos/1.mp4'
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { videoApis } from "../axios-instance";
import { useDispatch } from "react-redux";
import '../library/fontawesome/css/all.min.css'
import './styles/videodetails.css'
import images from '../assets/309431756_799936498003792_6138006382387941828_n.jpg'

const VideoDetails = () => {
    const [video, setVideo] = useState();

    const params = useParams();
    const userId = params.userId;
    const navigate = useNavigate();

    useEffect(() => {
        videoApis.get(`/videos/${userId}`).then(res => {
            setVideo(res.data)
        }).catch(e => console.log(e));
    }, [])
    const [isReacted, setIsReacted] = useState(false);
    const reactionAction = () => {
        setIsReacted(current => !current);
    }
    const [isActived, setIsActived] = useState(false);
    const interactionAction = () => {
        setIsActived(current => !current);
    }
    const [isReactedCmt, setIsReactedCmt] = useState(false);
    const cmtReactionAction = () => {
        setIsReactedCmt(current => !current);
    }
    // const dispatch = useDispatch();

    return (
        <div id="videoDetailsContainer">
            <div className='videoInfo'>
                <div>
                    <button style={{
                        left: '0',
                        position: 'absolute',
                        margin: '15px 0 0 15px',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        border: '0',
                        fontSize: '30px',
                        cursor: 'pointer'
                    }}
                        onClick={() => navigate(`/`)}><i className="fa-solid fa-arrow-left"></i></button>
                </div>
                <video loop controls className='videoDetailsPage'>
                    <source src={Video1} type='video/webm' />
                </video>
            </div>
            <div className='videoInfo'>
                <div className='info-container'>
                    <div>
                        <Link to={`/users/${userId}`}>
                            <img src={video?.avatar} className='avatarDetails' />
                        </Link>
                    </div>
                    <div className='infoContainer'>
                        <button className='followBttn'
                            style={{
                                float: 'right',
                                width: '80px',
                                height: '40px',
                                backgroundColor: isActived ? '#252525' : '#f22459',
                                border: isActived ? '1px solid #2f2f2f' : '1px solid transparent',
                                borderRadius: '5px',
                                marginRight: '10px',
                                fontFamily: 'inherit',
                                cursor: 'pointer'
                            }} onClick={interactionAction}>{isActived ? 'Following' : 'Follow'}</button>
                        <Link to={`/users/${userId}`} style={{ textDecoration: '0', color: '#fff' }}>
                            <span><b>{video?.username}</b></span>
                            <div>{video?.fullname}<span style={{ margin: '0px 4px' }}> · </span>  <span>1h ago</span></div>
                        </Link>
                        <div className='descVid'>{video?.description}</div>
                    </div>
                </div>
                <div className='actionContainer'>
                    <div className='videoActions'>
                        <button className='action_btn' onClick={reactionAction}>
                            <span>
                                {isReacted ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                            </span>
                        </button>
                        <div className='actionAmount'>
                        {isReacted ? <strong>{video?.reactAmount + 1}</strong> : <strong>{video?.reactAmount}</strong>}
                        </div>

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
                                <button className='follow_btn' onClick={cmtReactionAction}>{isReactedCmt ? <i className="fa-solid fa-heart" style={{ fontSize: '17px', color: '#fe22459' }}></i> : <i className="fa-solid fa-heart" style={{ fontSize: '17px' }}></i>}</button>
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