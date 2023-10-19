import { useState } from "react"

const CommentForm = ({ handleSubmit, submitLabel }) => {
    const [text, setText] = useState("")
    const isInputDisabled = text.length === 0
    const onSubmit = (event: { preventDefault: () => void }) => {
        event.preventDefault()
        handleSubmit(text)
        setText("")
    }

    const userLogin = localStorage.getItem("username")
    const userLogged = !userLogin

    let content

    if (userLogged) {
        content = (
            <>
                <form onSubmit={onSubmit}>
                    <div className="comment_box">
                        <div className="cmtInputUnlogged">Log in to comment</div>
                    </div>
                </form>
            </>
        )
    } else {
        content = (
            <>
                <form onSubmit={onSubmit}>
                    <div className="comment_box">
                        <input
                            className="comment_input"
                            placeholder="Add comment..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></input>
                        <button className="mention_button">
                            <i className="fa-solid fa-at"></i>
                        </button>
                        <button className="emoji_button">
                            <i className="fa-regular fa-face-smile"></i>
                        </button>
                        <button className="postBtn" disabled={isInputDisabled}>
                            {submitLabel}
                        </button>
                    </div>
                </form>
            </>
        )
    }

    return <>{content}</>
}

export default CommentForm
