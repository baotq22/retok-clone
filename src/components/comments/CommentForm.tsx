import { useState } from "react"

const CommentForm = ({handleSubmit, submitLabel}) => {
    const [text, setText] = useState('')
    const isInputDisabled = text.length === 0;
    const onSubmit = event => {
        event.preventDefault();
        handleSubmit(text);
        setText('')
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='comment_box'>
                <input className='comment_input' 
                        placeholder="Add comment..." 
                        value={text}
                        onChange={(e) => setText(e.target.value)}></input>
                <button className='mention_button'><i className="fa-solid fa-at" style={{ marginRight: '5px' }}></i></button>
                <button className='emoji_button'><i className="fa-regular fa-face-smile" style={{ marginRight: '5px' }}></i></button>
                <button className='postBtn' disabled={isInputDisabled}>{submitLabel}</button>
            </div>
        </form>
    )
}

export default CommentForm