import { useEffect, useState } from "react"
import {
    getComments as getCmtsApi,
    createComment as createCommentApi
} from "../../apiCmt"
import Comment from './Comment'
import CommentForm from "./CommentForm";

const Comments = ({ currentUserId }) => {

    const [BEcomments, setBEcomments] = useState([]);
    const rootComments = BEcomments.filter(
        (BEcomments) => BEcomments.parentId === null
    );
    const getReplies = commentId => {
        return BEcomments.filter(BEcomments => BEcomments.parentId === commentId)
            .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
    };
    useEffect(() => {
        getCmtsApi().then(data => {
            setBEcomments(data);
        })
    }, [])

    const addComment = (text, parentId) => {
        console.log('addComment', text, parentId)
        createCommentApi(text, parentId).then(comment => {
            setBEcomments([comment, ...BEcomments])
        })
    }

    
    return (
        <>
            <div className='comment__container'>
                {
                    rootComments.map((rootComment) => (
                        <Comment key={rootComment.id} 
                                comment={rootComment} 
                                replies={getReplies(rootComment.id)}
                                currentUserId={currentUserId} />
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