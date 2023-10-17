import { useState, useEffect, useRef } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import avatar1 from '../../assets/avatar/583.jpg'
import avatar2 from '../../assets/avatar/518.jpg'
import avatar3 from '../../assets/avatar/867.jpg'
import avatar4 from '../../assets/avatar/66.jpg'
import avatar5 from '../../assets/avatar/859.jpg'
import Video1 from '../../assets/videos/1.mp4'
import Video2 from '../../assets/videos/2.mp4'
import Video3 from '../../assets/videos/3.mp4'
import Video4 from '../../assets/videos/4.mp4'
import Video5 from '../../assets/videos/5.mp4'
import { useSelector } from "react-redux"


// video 1
const getReactionStatus1 = (userId) => {
    const storedStatus1 = localStorage.getItem(`video-reaction1-${userId}`);
    return storedStatus1 === 'liked1';
}

const setReactionStatus1 = (userId, isLiked1) => {
    localStorage.setItem(`video-reaction1-${userId}`, isLiked1 ? 'liked1' : 'not-liked1')
}

const getFollowStatus1 = (userId) => {
    const storedStatus1 = localStorage.getItem(`video-follow1-${userId}`);
    return storedStatus1 === 'followed1';
}

const setFollowStatus1 = (userId, isFollowed1) => {
    localStorage.setItem(`video-follow1-${userId}`, isFollowed1 ? 'followed1' : 'not-followed1')
}

// video 2
const getReactionStatus2 = (userId) => {
    const storedStatus2 = localStorage.getItem(`video-reaction2-${userId}`);
    return storedStatus2 === 'liked2';
}

const setReactionStatus2 = (userId, isLiked2) => {
    localStorage.setItem(`video-reaction2-${userId}`, isLiked2 ? 'liked2' : 'not-liked2')
}

const getFollowStatus2 = (userId) => {
    const storedStatus2 = localStorage.getItem(`video-follow2-${userId}`);
    return storedStatus2 === 'followed2';
}

const setFollowStatus2 = (userId, isFollowed2) => {
    localStorage.setItem(`video-follow2-${userId}`, isFollowed2 ? 'followed2' : 'not-followed2')
}

// video 3
const getReactionStatus3 = (userId) => {
    const storedStatus3 = localStorage.getItem(`video-reaction3-${userId}`);
    return storedStatus3 === 'liked3';
}

const setReactionStatus3 = (userId, isLiked3) => {
    localStorage.setItem(`video-reaction3-${userId}`, isLiked3 ? 'liked3' : 'not-liked3')
}

const getFollowStatus3 = (userId) => {
    const storedStatus3 = localStorage.getItem(`video-follow3-${userId}`);
    return storedStatus3 === 'followed3';
}

const setFollowStatus3 = (userId, isFollowed3) => {
    localStorage.setItem(`video-follow3-${userId}`, isFollowed3 ? 'followed3' : 'not-followed3')
}

// video 4
const getReactionStatus4 = (userId) => {
    const storedStatus4 = localStorage.getItem(`video-reaction4-${userId}`);
    return storedStatus4 === 'liked4';
}

const setReactionStatus4 = (userId, isLiked4) => {
    localStorage.setItem(`video-reaction4-${userId}`, isLiked4 ? 'liked4' : 'not-liked4')
}

const getFollowStatus4 = (userId) => {
    const storedStatus4 = localStorage.getItem(`video-follow4-${userId}`);
    return storedStatus4 === 'followed4';
}

const setFollowStatus4 = (userId, isFollowed4) => {
    localStorage.setItem(`video-follow4-${userId}`, isFollowed4 ? 'followed4' : 'not-followed4')
}

// video 5
const getReactionStatus5 = (userId) => {
    const storedStatus5 = localStorage.getItem(`video-reaction5-${userId}`);
    return storedStatus5 === 'liked5';
}

const setReactionStatus5 = (userId, isLiked5) => {
    localStorage.setItem(`video-reaction5-${userId}`, isLiked5 ? 'liked5' : 'not-liked5')
}

const getFollowStatus5 = (userId) => {
    const storedStatus5 = localStorage.getItem(`video-follow5-${userId}`);
    return storedStatus5 === 'followed5';
}

const setFollowStatus5 = (userId, isFollowed5) => {
    localStorage.setItem(`video-follow5-${userId}`, isFollowed5 ? 'followed5' : 'not-followed5')
}

const AutoPlayVideo1 = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                    setIsPlaying(true);
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            })
        }, options)

        observer.observe(videoRef.current);

        return () => {
            observer.unobserve(videoRef.current);
        }
    }, []);

    return (
        <>
            <video ref={videoRef} autoPlay muted controls loop className='videos'>
                <source src={Video1} type="video/mp4" />
            </video>
        </>
    )
}

const AutoPlayVideo2 = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                    setIsPlaying(true);
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            })
        }, options)

        observer.observe(videoRef.current);

        return () => {
            observer.unobserve(videoRef.current);
        }
    }, []);

    return (
        <>
            <video ref={videoRef} autoPlay muted controls loop className='videos'>
                <source src={Video2} type="video/mp4" />
            </video>
        </>
    )
}

const AutoPlayVideo3 = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                    setIsPlaying(true);
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            })
        }, options)

        observer.observe(videoRef.current);

        return () => {
            observer.unobserve(videoRef.current);
        }
    }, []);


    return (
        <>
            <video ref={videoRef} autoPlay muted controls loop className='videos'>
                <source src={Video3} type="video/mp4" />
            </video>
        </>
    )
}

const AutoPlayVideo4 = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                    setIsPlaying(true);
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            })
        }, options);

        observer.observe(videoRef.current);

        return () => {
            observer.observe(videoRef.current);
        }
    })

    return (
        <>
            <video ref={videoRef} autoPlay muted controls loop className='videos'>
                <source src={Video4} type="video/mp4" />
            </video>
        </>
    )
}

const AutoPlayVideo5 = () => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                    setIsPlaying(true);
                } else {
                    videoRef.current.pause();
                    setIsPlaying(false);
                }
            })
        }, options);

        observer.observe(videoRef.current);

        return () => {
            observer.observe(videoRef.current);
        }
    })

    return (
        <>
            <video ref={videoRef} autoPlay muted controls loop className='videos'>
                <source src={Video5} type="video/mp4" />
            </video>
        </>
    )
}

const CollapseVideo1 = ({ text, maxLength }) => {
    const [collapseText1, setCollapseText1] = useState(true);

    const toggleCollapse1 = () => {
        setCollapseText1(!collapseText1);
    }

    return (
        <>
            {collapseText1 ? (
                <>
                    {text.slice(0, maxLength)}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{ cursor: 'pointer' }} onClick={toggleCollapse1}><b>more</b></span>
                </>
            ) : (
                <>
                    {text}
                    <p style={{ cursor: 'pointer' }} onClick={toggleCollapse1}><b>less</b></p>
                </>
            )}
        </>
    )
}
const CollapseVideo2 = ({ text, maxLength }) => {
    const [collapseText2, setCollapseText2] = useState(true);

    const toggleCollapse2 = () => {
        setCollapseText2(!collapseText2);
    }

    return (
        <>
            {collapseText2 ? (
                <>
                    {text.slice(0, maxLength)}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{ cursor: 'pointer' }} onClick={toggleCollapse2}><b>more</b></span>
                </>
            ) : (
                <>
                    {text}
                    <p style={{ cursor: 'pointer' }} onClick={toggleCollapse2}><b>less</b></p>
                </>
            )}
        </>
    )
}
const CollapseVideo3 = ({ text, maxLength }) => {
    const [collapseText3, setCollapseText3] = useState(true);

    const toggleCollapse3 = () => {
        setCollapseText3(!collapseText3);
    }

    return (
        <>
            {collapseText3 ? (
                <>
                    {text.slice(0, maxLength)}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{ cursor: 'pointer' }} onClick={toggleCollapse3}><b>more</b></span>
                </>
            ) : (
                <>
                    {text}
                    <p style={{ cursor: 'pointer' }} onClick={toggleCollapse3}><b>less</b></p>
                </>
            )}
        </>
    )
}
const CollapseVideo4 = ({ text, maxLength }) => {
    const [collapseText4, setCollapseText4] = useState(true);

    const toggleCollapse4 = () => {
        setCollapseText4(!collapseText4);
    }

    return (
        <>
            {collapseText4 ? (
                <>
                    {text.slice(0, maxLength)}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{ cursor: 'pointer' }} onClick={toggleCollapse4}><b>more</b></span>
                </>
            ) : (
                <>
                    {text}
                    <p style={{ cursor: 'pointer' }} onClick={toggleCollapse4}><b>less</b></p>
                </>
            )}
        </>
    )
}
const CollapseVideo5 = ({ text, maxLength }) => {
    const [collapseText5, setCollapseText5] = useState(true);

    const toggleCollapse5 = () => {
        setCollapseText5(!collapseText5);
    }

    return (
        <>
            {collapseText5 ? (
                <>
                    {text.slice(0, maxLength)}
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span><span style={{ cursor: 'pointer' }} onClick={toggleCollapse5}><b>more</b></span>
                </>
            ) : (
                <>
                    {text}
                    <p style={{ cursor: 'pointer' }} onClick={toggleCollapse5}><b>less</b></p>
                </>
            )}
        </>
    )
}

const VideoList = ({ userId }) => {

    const navigate = useNavigate();
    //video 1
    const [isLiked1, setIsLiked1] = useState(getReactionStatus1(userId));
    const [isFollowed1, setIsFollowed1] = useState(getFollowStatus1(userId));

    const handleLikeClick1 = () => {
        if (isLiked1) {
            setIsLiked1(false);
            setReactionStatus1(userId, false);
        } else {
            setIsLiked1(true);
            setReactionStatus1(userId, true);
        }
    };

    const handleFollowClick1 = () => {
        if (isFollowed1) {
            setIsFollowed1(false);
            setFollowStatus1(userId, false);
        } else {
            setIsFollowed1(true);
            setFollowStatus1(userId, true);
        }
    }

    useEffect(() => {
        setIsLiked1(getReactionStatus1(userId));
        setIsFollowed1(getFollowStatus1(userId));
    }, [userId])

    //video 2
    const [isLiked2, setIsLiked2] = useState(getReactionStatus2(userId));
    const [isFollowed2, setIsFollowed2] = useState(getFollowStatus2(userId));

    const handleLikeClick2 = () => {
        if (isLiked2) {
            setIsLiked2(false);
            setReactionStatus2(userId, false);
        } else {
            setIsLiked2(true);
            setReactionStatus2(userId, true);
        }
    };

    const handleFollowClick2 = () => {
        if (isFollowed2) {
            setIsFollowed2(false);
            setFollowStatus2(userId, false);
        } else {
            setIsFollowed2(true);
            setFollowStatus2(userId, true);
        }
    }

    useEffect(() => {
        setIsLiked2(getReactionStatus2(userId));
        setIsFollowed2(getFollowStatus2(userId));
    }, [userId])

    //video 3
    const [isLiked3, setIsLiked3] = useState(getReactionStatus3(userId));
    const [isFollowed3, setIsFollowed3] = useState(getFollowStatus3(userId));

    const handleLikeClick3 = () => {
        if (isLiked3) {
            setIsLiked3(false);
            setReactionStatus3(userId, false);
        } else {
            setIsLiked3(true);
            setReactionStatus3(userId, true);
        }
    };

    const handleFollowClick3 = () => {
        if (isFollowed3) {
            setIsFollowed3(false);
            setFollowStatus3(userId, false);
        } else {
            setIsFollowed3(true);
            setFollowStatus3(userId, true);
        }
    }

    useEffect(() => {
        setIsLiked3(getReactionStatus3(userId));
        setIsFollowed3(getFollowStatus3(userId));
    }, [userId])

    //video 4
    const [isLiked4, setIsLiked4] = useState(getReactionStatus4(userId));
    const [isFollowed4, setIsFollowed4] = useState(getFollowStatus4(userId));

    const handleLikeClick4 = () => {
        if (isLiked4) {
            setIsLiked4(false);
            setReactionStatus4(userId, false);
        } else {
            setIsLiked4(true);
            setReactionStatus4(userId, true);
        }
    };

    const handleFollowClick4 = () => {
        if (isFollowed4) {
            setIsFollowed4(false);
            setFollowStatus4(userId, false);
        } else {
            setIsFollowed4(true);
            setFollowStatus4(userId, true);
        }
    }

    useEffect(() => {
        setIsLiked4(getReactionStatus4(userId));
        setIsFollowed4(getFollowStatus4(userId));
    }, [userId])

    //video 5
    const [isLiked5, setIsLiked5] = useState(getReactionStatus5(userId));
    const [isFollowed5, setIsFollowed5] = useState(getFollowStatus5(userId));

    const handleLikeClick5 = () => {
        if (isLiked5) {
            setIsLiked5(false);
            setReactionStatus5(userId, false);
        } else {
            setIsLiked5(true);
            setReactionStatus5(userId, true);
        }
    };

    const handleFollowClick5 = () => {
        if (isFollowed5) {
            setIsFollowed5(false);
            setFollowStatus5(userId, false);
        } else {
            setIsFollowed5(true);
            setFollowStatus5(userId, true);
        }
    }

    useEffect(() => {
        setIsLiked5(getReactionStatus5(userId));
        setIsFollowed5(getReactionStatus5(userId));
    }, [userId])

    const followBtnStyleActive = {
        border: '1px solid #ccc',
        backgroundColor: 'transparent',
        fontWeight: '900',
        color: '#ccc',
    }

    const followBtnStyleUnactive = {
        border: '1px solid #f22459',
        backgroundColor: 'transparent',
        fontWeight: '900',
        color: '#f22459',
    }

    const userLogin = useSelector(state => state.userLogin);
    const userLogged = !userLogin?.username;
    const actionBtnUnlogged = (
        <>
            <div className='videoAction'>
                <button className='action_btn'>
                    <span>
                        <i className="fa-solid fa-heart"></i>
                    </span>
                </button>
                <p className='actionAmount'>
                    <strong>72</strong>
                </p>
                <button className='action_btn' onClick={() => navigate(`videoDetails/1`)}>
                    <span>
                        <i className="fa-solid fa-comment-dots"></i>
                    </span>
                </button>
                <p className='actionAmount'><strong>25</strong></p>
                <button className='action_btn'>
                    <span>
                        <i className="fa-solid fa-bookmark"></i>
                    </span>
                </button>
                <p className='actionAmount'><strong>16</strong></p>
                <button className='action_btn'>
                    <span>
                        <i className="fa-solid fa-share"></i>
                    </span>
                </button>
                <p className='actionAmount'><strong>8</strong></p>
            </div>
        </>
    )
    let content1
    let content2
    let content3
    let content4
    let content5

    if (userLogged) {
        content1 = (
            <>
                {actionBtnUnlogged}
            </>
        )
        content2 = (
            <>
                {actionBtnUnlogged}
            </>
        )
        content3 = (
            <>
                {actionBtnUnlogged}
            </>
        )
        content4 = (
            <>
                {actionBtnUnlogged}
            </>
        )
        content5 = (
            <>
                {actionBtnUnlogged}
            </>
        )
    } else {
        content1 = (
            <>
                <div className='videoAction'>
                    <button className='action_btn' onClick={handleLikeClick1}>
                        <span>
                            {isLiked1 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                            {/* <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> */}
                        </span>
                    </button>
                    <p className='actionAmount'>
                        {isLiked1 ? <strong>73</strong> : <strong>72</strong>}
                    </p>
                    {/* <button className='action_btn' onClick={() => navigate(`/videos/${video?.id}`)}> */}
                    <button className='action_btn' onClick={() => navigate(`videoDetails/1`)}>
                        <span>
                            <i className="fa-solid fa-comment-dots"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>25</strong></p>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-bookmark"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>16</strong></p>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-share"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>8</strong></p>
                </div>
            </>
        )
        content2 = (
            <>
                <div className='videoAction'>
                    <button className='action_btn' onClick={handleLikeClick2}>
                        <span>
                            {isLiked2 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                            {/* <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> */}
                        </span>
                    </button>
                    <p className='actionAmount'>
                        {isLiked2 ? <strong>73</strong> : <strong>72</strong>}
                    </p>
                    {/* <button className='action_btn' onClick={() => navigate(`/videos/${video?.id}`)}> */}
                    <button className='action_btn' onClick={() => navigate(`videoDetails/2`)}>
                        <span>
                            <i className="fa-solid fa-comment-dots"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>25</strong></p>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-bookmark"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>16</strong></p>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-share"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>8</strong></p>
                </div>
            </>
        )
        content3 = (
            <>
                <div className='videoAction'>
                    <button className='action_btn' onClick={handleLikeClick3}>
                        <span>
                            {isLiked3 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                            {/* <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> */}
                        </span>
                    </button>
                    <p className='actionAmount'>
                        {isLiked3 ? <strong>73</strong> : <strong>72</strong>}
                    </p>
                    {/* <button className='action_btn' onClick={() => navigate(`/videos/${video?.id}`)}> */}
                    <button className='action_btn' onClick={() => navigate(`videoDetails/3`)}>
                        <span>
                            <i className="fa-solid fa-comment-dots"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>25</strong></p>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-bookmark"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>16</strong></p>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-share"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>8</strong></p>
                </div>
            </>
        )
        content4 = (
            <>
                <div className='videoAction'>
                    <button className='action_btn' onClick={handleLikeClick4}>
                        <span>
                            {isLiked4 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                            {/* <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> */}
                        </span>
                    </button>
                    <p className='actionAmount'>
                        {isLiked4 ? <strong>73</strong> : <strong>72</strong>}
                    </p>
                    {/* <button className='action_btn' onClick={() => navigate(`/videos/${video?.id}`)}> */}
                    <button className='action_btn' onClick={() => navigate(`videoDetails/4`)}>
                        <span>
                            <i className="fa-solid fa-comment-dots"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>25</strong></p>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-bookmark"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>16</strong></p>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-share"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>8</strong></p>
                </div>
            </>
        )
        content5 = (
            <>
                <div className='videoAction'>
                    <button className='action_btn' onClick={handleLikeClick5}>
                        <span>
                            {isLiked5 ? <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> : <i className="fa-solid fa-heart"></i>}
                            {/* <i className="fa-solid fa-heart" style={{ color: '#fe2c55' }}></i> */}
                        </span>
                    </button>
                    <p className='actionAmount'>
                        {isLiked5 ? <strong>73</strong> : <strong>72</strong>}
                    </p>
                    {/* <button className='action_btn' onClick={() => navigate(`/videos/${video?.id}`)}> */}
                    <button className='action_btn' onClick={() => navigate(`videoDetails/5`)}>
                        <span>
                            <i className="fa-solid fa-comment-dots"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>25</strong></p>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-bookmark"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>16</strong></p>
                    <button className='action_btn'>
                        <span>
                            <i className="fa-solid fa-share"></i>
                        </span>
                    </button>
                    <p className='actionAmount'><strong>8</strong></p>
                </div>
            </>
        )
    }

    const preventFailedScreen = () => {
        window.location.reload(false);
    }

    return (
        <>
            <div className='videos__container'>
                <div className='avatarContainer'>
                    <Link to={`/users/1`}>
                        <span className='avatarVideo'>
                            <img src={avatar1} className='avatar' />
                        </span>
                    </Link>
                </div>
                <div className='videoContainer'>
                    <div className='video-user'>
                        <Link to={`/users/1`} style={{ textDecoration: '0' }} className='user_details'>
                            <span><b>Andre57 </b></span>
                            <span>Manuel Rogahn</span>
                        </Link>
                        {userLogged ? <button className='follow_btn'
                            style={followBtnStyleUnactive}>Follow</button> :
                            <button className='follow_btn'
                                onClick={handleFollowClick1}
                                style={isFollowed1 ? followBtnStyleActive : followBtnStyleUnactive}>{isFollowed1 ? 'Following' : 'Follow'}</button>}
                        <p className='videoDesc'><CollapseVideo1 text='The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients' maxLength={40} /></p>
                    </div>
                    <div className='videoDetails'>
                        <div className="videoBox" onClick={preventFailedScreen}>
                            <Link to={`videoDetails/1`}>
                                <AutoPlayVideo1 />
                            </Link>
                            {content1}
                        </div>
                    </div>
                </div>
            </div>
            <div className="borderVideo">
                <p className="border_video"></p>
            </div>
            <div className='videos__container'>
                <div className='avatarContainer'>
                    <Link to={`/users/2`}>
                        <span className='avatarVideo'>
                            <img src={avatar2} className='avatar' />
                        </span>
                    </Link>
                </div>
                <div className='videoContainer'>
                    <div className='video-user'>
                        <Link to={`/users/2`} style={{ textDecoration: '0' }} className='user_details'>
                            <span><b>Chris.Franecki48 </b></span>
                            <span>Anthony Waters</span>
                        </Link>
                        {userLogged ? <button className='follow_btn'
                            style={followBtnStyleUnactive}>Follow</button> :
                            <button className='follow_btn'
                                onClick={handleFollowClick2}
                                style={isFollowed2 ? followBtnStyleActive : followBtnStyleUnactive}>{isFollowed2 ? 'Following' : 'Follow'}</button>}
                        <p className='videoDesc'><CollapseVideo2 text='The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients' maxLength={40} /></p>
                    </div>
                    <div className='videoDetails'>
                        <div className="videoBox" onClick={preventFailedScreen}>
                            <Link to={`/videoDetails/2`} >
                                <AutoPlayVideo2 />
                            </Link>
                            {content2}
                        </div>
                    </div>
                </div>
            </div>
            <div className="borderVideo">
                <p className="border_video"></p>
            </div>
            <div className='videos__container'>
                <div className='avatarContainer'>
                    <Link to={`/users/3`}>
                        <span className='avatarVideo'>
                            <img src={avatar3} className='avatar' />
                        </span>
                    </Link>
                </div>
                <div className='videoContainer'>
                    <div className='video-user'>
                        <Link to={`/users/3`} style={{ textDecoration: '0' }} className='user_details'>
                            <span><b>Grover32 </b></span>
                            <span>Nina Mills IV</span>
                        </Link>
                        {userLogged ? <button className='follow_btn'
                            style={followBtnStyleUnactive}>Follow</button> :
                            <button className='follow_btn'
                                onClick={handleFollowClick3}
                                style={isFollowed3 ? followBtnStyleActive : followBtnStyleUnactive}>{isFollowed3 ? 'Following' : 'Follow'}</button>}
                        <p className='videoDesc'><CollapseVideo3 text='The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients' maxLength={40} /></p>
                    </div>
                    <div className='videoDetails'>
                        <div className="videoBox" onClick={preventFailedScreen}>
                            <Link to={`/videoDetails/3`} >
                                <AutoPlayVideo3 />
                            </Link>
                            {content3}
                        </div>
                    </div>
                </div>
            </div>
            <div className="borderVideo">
                <p className="border_video"></p>
            </div>
            <div className='videos__container'>
                <div className='avatarContainer'>
                    <Link to={`/users/4`}>
                        <span className='avatarVideo'>
                            <img src={avatar4} className='avatar' />
                        </span>
                    </Link>
                </div>
                <div className='videoContainer'>
                    <div className='video-user'>
                        <Link to={`/users/4`} style={{ textDecoration: '0' }} className='user_details'>
                            <span><b>Jonathon_Kuvalis18 </b></span>
                            <span>Harold Daugherty</span>
                        </Link>
                        {userLogged ? <button className='follow_btn'
                            style={followBtnStyleUnactive}>Follow</button> :
                            <button className='follow_btn'
                                onClick={handleFollowClick4}
                                style={isFollowed4 ? followBtnStyleActive : followBtnStyleUnactive}>{isFollowed4 ? 'Following' : 'Follow'}</button>}
                        <p className='videoDesc'><CollapseVideo4 text='The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients' maxLength={40} /></p>
                    </div>
                    <div className='videoDetails'>
                        <div className="videoBox" onClick={preventFailedScreen}>
                            <Link to={`/videoDetails/4`} >
                                <AutoPlayVideo4 />
                            </Link>
                            {content4}
                        </div>
                    </div>
                </div>
            </div>
            <div className="borderVideo">
                <p className="border_video"></p>
            </div>
            <div className='videos__container'>
                <div className='avatarContainer'>
                    <Link to={`/users/5`}>
                        <span className='avatarVideo'>
                            <img src={avatar5} className='avatar' />
                        </span>
                    </Link>
                </div>
                <div className='videoContainer'>
                    <div className='video-user'>
                        <Link to={`/users/5`} style={{ textDecoration: '0' }} className='user_details'>
                            <span><b>Terrell_OKeefe3 </b></span>
                            <span>Krystal Heller V</span>
                        </Link>
                        {userLogged ? <button className='follow_btn'
                            style={followBtnStyleUnactive}>Follow</button> :
                            <button className='follow_btn'
                                onClick={handleFollowClick5}
                                style={isFollowed5 ? followBtnStyleActive : followBtnStyleUnactive}>{isFollowed5 ? 'Following' : 'Follow'}</button>}
                        <p className='videoDesc'><CollapseVideo5 text='The beautiful range of Apple Naturalé that has an exciting mix of natural ingredients. With the Goodness of 100% Natural Ingredients' maxLength={40} /></p>
                    </div>
                    <div className='videoDetails'>
                        <div className="videoBox" onClick={preventFailedScreen}>
                            <Link to={`/videoDetails/5`} >
                                <AutoPlayVideo5 />
                            </Link>
                            {content5}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default VideoList