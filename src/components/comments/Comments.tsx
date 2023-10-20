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
import { api } from "~/api/axios-instance"

const Comments = ({ currentUserId }) => {
    const [BEcomments, setBEcomments] = useState([])
    const [activeCmt, setActiveCmt] = useState(null)
    const rootComments = BEcomments.filter((BEcomment) => BEcomment.parentId === null);
    const getReplies = (commentId) => {
        return BEcomments.filter((BEcomment) => BEcomment.parentId === commentId).sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
    }
    useEffect(() => {
        getCmtsApi().then((data) => {
            setBEcomments(data)
        })
    }, [])

    const [userList, setUserList] = useState([])
    const fetchVideos = async () => {
        const res = await api.get("users")
        setUserList(res.data)
    }
    useEffect(() => {
        fetchVideos();
    }, [])

    console.log(userList.length)

    // const userCmts = JSON.parse(localStorage.getItem(`userCmt_${currentUserId}`)) || []
    // const userCmtsArray = userCmts || []
    const userCmts = JSON.parse(localStorage.getItem(`userCmt_${currentUserId}`)) || [];

    const otherUserComments = [];
    for (let userId = 1; userId <= userList.length; userId++) {
        if (userId !== currentUserId) {
            const otherUserCmts = JSON.parse(localStorage.getItem(`userCmt_${userId}`)) || [];
            otherUserComments.push(...otherUserCmts);
        }
    }

    const getUser = localStorage.getItem("username")

    const addComment = (text, parentId) => {
        createCommentApi(text, parentId).then((comment) => {
            const updatedComments = [{ body: text, parentId, username: getUser, userId: currentUserId }, ...userCmts];
            saveCmtToLS(updatedComments);
            setBEcomments([...BEcomments]);
            setActiveCmt(null);
        });
    };

    // useEffect(() => {
    //     getCmtsApi().then((data) => {
    //         setBEcomments(data)
    //     })
    //     if (currentUserId) {
    //         const userCmts = localStorage.getItem(`userCmt_${currentUserId}`)
    //         if (userCmts) {
    //             const parsedCmt = JSON.parse(userCmts)
    //             setUserCmtsArray(parsedCmt)
    //         }
    //     }
    // }, [currentUserId])

    const deleteComment = (commentId) => {
        deleteCommentApi(commentId).then(() => {
            const updatedBEcomments = BEcomments.filter((BEComment) => BEComment.id !== commentId);
            setBEcomments(updatedBEcomments);
        });
    };

    const saveCmtToLS = (comments) => {
        localStorage.setItem(`userCmt_${currentUserId}`, JSON.stringify(comments));
    };

    return (
        <>
            <div className="comment__container">
                {/* {userCmts.map((userCmt, index) => (
                    <CommentLS
                        key={index}
                        comment={userCmt}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        activeCmt={activeCmt}
                        setActiveCmt={setActiveCmt}
                        addComment={addComment}
                    />
                ))} */}
                {otherUserComments.map((otherUserCmt, index) => (
                    <CommentLS
                        key={index}
                        comment={otherUserCmt}
                        currentUserId={currentUserId}
                        deleteComment={deleteComment}
                        activeCmt={activeCmt}
                        setActiveCmt={setActiveCmt}
                        addComment={addComment}
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
