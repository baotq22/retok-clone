import { useEffect, useMemo, useState } from "react"
import {
    getComments as getCmtsApi,
    createComment as createCommentApi,
    deleteComment as deleteCommentApi
} from "../../apiCmt"
import Comment from './Comment'
import CommentForm from "./CommentForm";
import CommentLS from "./CommentLS";

const Comments = ({ currentUserId }) => {
    const [BEcomments, setBEcomments] = useState([]);
    const [activeCmt, setActiveCmt] = useState(null);
    const rootComments = BEcomments.filter(
        (BEcomment) => BEcomment.parentId === null
    );
    const getReplies = commentId => {
        return BEcomments
            .filter(BEcomment => BEcomment.parentId === commentId)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
    };
    useEffect(() => {
        getCmtsApi().then(data => {
            setBEcomments(data);
        })
    }, [])

    const userCmts = useMemo(() => {
        return localStorage.getItem(`userCmt_${currentUserId}`)
    }, [currentUserId]);

    const userCmtsArray = JSON.parse(userCmts) || [];

    const saveCmtToLS = (comments) => {
        localStorage.setItem(`userCmt_${currentUserId}`, JSON.stringify(comments));
        console.log(JSON.stringify(comments))
    }

    const addComment = (text, parentId) => {
        const user_id = currentUserId;
        createCommentApi(parentId).then(comment => {
            setBEcomments([comment, ...BEcomments]);
            const updatedComments = [{ body: text, parentId }, ...userCmtsArray];
            saveCmtToLS(updatedComments);
            setActiveCmt(null)
        });
    }

    useEffect(() => {
        getCmtsApi().then(data => {
            setBEcomments(data);
        })
        if (currentUserId) {
            const userCmts = localStorage.getItem(`userCmt_${currentUserId}`);
            if (userCmts) {
                const parsedCmt = JSON.parse(userCmts);
            }
        }
    }, [currentUserId])

    const deleteComment = (commentId) => {
        deleteCommentApi(commentId).then(() => {
            const updatedBEcomments = BEcomments.filter(BEComment => BEComment.id !== commentId);
            setBEcomments(updatedBEcomments);
        })
    }



    return (
        <>
            <div className='comment__container'>
                {
                    userCmtsArray.map((userCmt, index) => (
                        <CommentLS key={index}
                            comment={userCmt}
                            replies={getReplies(userCmt.id)}
                            currentUserId={currentUserId}
                            deleteComment={deleteComment}
                            activeCmt={activeCmt}
                            setActiveCmt={setActiveCmt}
                            addComment={addComment} />
                    ))
                }
                {
                    rootComments.map((rootComment) => (
                        <Comment key={rootComment.id}
                            comment={rootComment}
                            replies={getReplies(rootComment.id)}
                            currentUserId={currentUserId}
                            deleteComment={deleteComment}
                            activeCmt={activeCmt}
                            setActiveCmt={setActiveCmt}
                            addComment={addComment} />
                    ))
                }
            </div>
            <div className='comment_input_container'>
                <CommentForm submitLabel='Post' handleSubmit={addComment} />
            </div>
        </>
    )
}

export default Comments