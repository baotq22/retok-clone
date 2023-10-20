import { useEffect, useState } from "react"
import logoDark from "../../assets/dark_download.png"
import logoLight from "../../assets/light_download.png"

const DownloadApp = () => {
    const [mode, setMode] = useState()

    useEffect(() => {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
            const colorScheme = event.matches ? "dark" : "light"
            setMode(colorScheme)
        })
    }, [])

    return (
        <>
            <div className="downloadMenu" style={{ listStyleType: "none" }}>
                <div id="logo_download">
                    <img src={mode === "dark" ? logoDark : logoLight} alt="Logo" />
                </div>
                <p className="title_download">TikTok desktop app</p>
                <button className="button_download">Download</button>
            </div>
        </>
    )
}

export default DownloadApp
