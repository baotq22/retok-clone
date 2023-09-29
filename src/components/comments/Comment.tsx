import { useEffect, useState } from "react"
import images from '../../assets/309431756_799936498003792_6138006382387941828_n.jpg'
import { videoApis } from "../../axios-instance";
import { useParams } from "react-router-dom";

const Comment = ({ comment, replies, currentUserId }) => {
    const canReply = Boolean(currentUserId);
    const fiveMinutes = 300000;
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes
    const canDelete = currentUserId === comment.userId && timePassed;
    const [isReactedCmt, setIsReactedCmt] = useState(false);
    const cmtReactionAction = () => {
        setIsReactedCmt(current => !current);
    }
    const createdAt = new Date(comment.createdAt).toLocaleDateString()
    return (
        <div className='comment__s'>
            <div>
                <img src={images} className='avatarComment' />
            </div>
            <div className='infoComment'>
                <span style={{ fontSize: '20px' }}><b>{comment.username}</b></span>
                <div className='mainComment'>{comment.body}</div>
                <div className='reaction_comment'>
                    <button className='follow_btn' onClick={cmtReactionAction}>{isReactedCmt ? <i className="fa-solid fa-heart" style={{ fontSize: '17px', color: '#fe22459' }}></i> : <i className="fa-solid fa-heart" style={{ fontSize: '17px' }}></i>}</button>
                    <div className='actionAmount'>{comment.reactionAmount}</div>
                </div>
                <span>{createdAt}</span>
                {canReply && <span style={{cursor: 'pointer'}}> Reply</span>}
                {canDelete && <span style={{cursor: 'pointer'}}> Delete</span>}
                {replies.length > 0 && (
                    <div className='subComment'>
                        {replies.map(reply => (
                            <Comment comment={reply}
                                key={reply.id}
                                replies={[]} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Comment