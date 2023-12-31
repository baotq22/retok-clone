import { useEffect, useState } from "react"
import {
    getComments as getCmtsApi,
    createComment as createCommentApi,
    deleteComment as deleteCommentApi
} from "../../api/apiCmt"
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import CommentLS from "./CommentLS"
import React from "react"

const Comments = ({ currentUserId, videoId }) => {
    const [BEcomments, setBEcomments] = useState([])
    const [activeCmt, setActiveCmt] = useState(null)
    const rootComments = BEcomments.filter((BEcomment) => BEcomment.parentId === null);
    const getReplies = (commentId) => {
        return BEcomments
            .filter((BEcomment) => BEcomment.parentId === commentId)
            .sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
    }

    useEffect(() => {
        getCmtsApi().then((data) => {
            setBEcomments(data)
        })
    }, [])

    const userCmts = JSON.parse(localStorage.getItem(`userCmt_${videoId}`)) || [];

    const otherUserComments = [];
    for (let userId = 1; userId <= 1; userId++) {
        if (userId !== currentUserId) {
            const otherUserCmts = JSON.parse(localStorage.getItem(`userCmt_${videoId}`)) || [];
            otherUserComments.push(...otherUserCmts);
        }
    }

    const getUser = localStorage.getItem("username")

    const addComment = (text, parentId) => {
        createCommentApi(text, parentId).then((comment) => {
            const updatedComments = [{ body: text, parentId, username: getUser, userId: currentUserId, video_id: videoId }, ...userCmts];
            saveCmtToLS(updatedComments);
            setBEcomments([...BEcomments]);
            setActiveCmt(null);
        });
    };

    useEffect(() => {
        const currentVideoComments = userCmts.filter((comment) => comment.video_id === videoId);
        setBEcomments(currentVideoComments);
    }, [videoId]);

    const deleteComment = (commentId) => {
        deleteCommentApi(commentId).then(() => {
            const updatedBEcomments = BEcomments.filter((BEComment) => BEComment.id !== commentId);
            setBEcomments(updatedBEcomments);
        });
    };

    const saveCmtToLS = (comments) => {
        localStorage.setItem(`userCmt_${videoId}`, JSON.stringify(comments));
    };

    return (
        <>
            <div className="comment__container">
                {otherUserComments.map((otherUserCmt, index) => (
                    <CommentLS
                        key={index}
                        comment={otherUserCmt}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        activeCmt={activeCmt}
                        setActiveCmt={setActiveCmt}
                        addComment={addComment}
                        videoId={videoId}
                    />
                ))}
                {rootComments.map((rootComment) => (
                    <Comment
                        key={rootComment.id}
                        comment={rootComment}
                        replies={getReplies(rootComment.id)}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        activeCmt={activeCmt}
                        setActiveCmt={setActiveCmt}
                        addComment={addComment}
                    />
                ))}
            </div>
            <div className="comment_input_container">
                <CommentForm submitLabel="Post" handleSubmit={addComment} />
            </div>
        </>
    )
}

export default React.memo(Comments)
