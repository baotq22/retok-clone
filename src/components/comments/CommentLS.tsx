import { useState } from "react"
import images from "../../assets/309431756_799936498003792_6138006382387941828_n.jpg"
import CommentForm from "./CommentForm"
import React from "react"

const CommentLS = ({ comment, currentUserId, deleteComment, activeCmt, setActiveCmt, addComment, parentId = null }) => {
    const userName = localStorage.getItem("username")
    const canReply = Boolean(currentUserId)
    const fiveMinutes = 300000 // 300000 miliseconds = 300 seconds = 5 minutes
    const timePassed = new Date() - new Date(comment.createdAt) > fiveMinutes
    const canDelete = currentUserId === comment.userId && !timePassed
    const [isReactedCmt, setIsReactedCmt] = useState(false)
    const cmtReactionAction = () => {
        setIsReactedCmt((current) => !current)
    }
    const createdAt = new Date().toLocaleDateString()
    const isReplying = activeCmt && activeCmt.id === comment.id && activeCmt.type === "replying"
    const replyId = parentId ? parentId : comment.id
    return (
        <>
            <div className="comment__s">
                <div>
                    <img src={images} className="avatarComment" />
                </div>
                <div className="infoComment">
                    <span className="userCmt">
                        <b>{userName}</b>
                    </span>
                    <div className="mainComment">{comment.body}</div>
                    <div className="reaction_comment">
                        <button className="follow_btn" onClick={cmtReactionAction}>
                            {isReactedCmt ? (
                                <i className="fa-solid fa-heart" style={{ color: "#fe22459" }}></i>
                            ) : (
                                <i className="fa-solid fa-heart"></i>
                            )}
                        </button>
                        <div className="actionAmount">{comment.reactionAmount}</div>
                    </div>
                    <span>{createdAt}</span>
                    {canReply && (
                        <span className="actionBtn" onClick={() => setActiveCmt({ id: comment.id, type: "replying" })}>
                            {" "}
                            Reply
                        </span>
                    )}
                    {canDelete && (
                        <span className="actionBtn" onClick={() => deleteComment(comment.id)}>
                            {" "}
                            Delete
                        </span>
                    )}
                    {isReplying && (
                        <>
                            <CommentForm submitLabel="Reply" handleSubmit={(text: any) => addComment(text, replyId)} />
                            <button className="cancelCmt" onClick={() => setActiveCmt(null)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default React.memo(CommentLS)
