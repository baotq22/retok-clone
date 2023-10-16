import { useState } from "react";
import effectBtn from '../../assets/d8db931296c3e5645b1e.png'

const AboutSidebar = () => {
    const [viewMore, setViewMore] = useState(false);
    const toggleContent = () => { setViewMore(!viewMore) };
    return (
        <>
            <div className='effectContainer'>
                <a href='#'>
                    <img src={effectBtn} className='effectBtn' />
                </a>
            </div>
            <div className='bottom' style={{ marginBottom: '100px' }}>
                <div className='info'>
                    <a href="#" className='link'><span>About</span></a>
                    <a href="#" className='link'><span>Newsroom</span></a>
                    <a href="#" className='link'><span>Contact</span></a>
                    <div className='info'>
                        <a href="#" className='link'><span>Careers</span></a>
                    </div>
                </div>
                <div className='info'>
                    <a href="#" className='link'><span>Retok for Good</span></a>
                    <a href="#" className='link'><span>Advertise</span></a>
                    <a href="#" className='link'><span>Developers</span></a>
                    <a href="#" className='link'><span>Transparency</span></a>
                </div>
                <div className='info'>
                    <a href="#" className='link'><span>Retok Rewards</span></a>
                    <div className='info'>
                        <a href="#" className='link'><span>Retok Embeds</span></a>
                    </div>
                </div>
                <div className='info'>
                    <a href="#" className='link'><span>Helps</span></a>
                    <a href="#" className='link'><span>Safety</span></a>
                    <a href="#" className='link'><span>Term</span></a>
                    <a href="#" className='link'><span>Privacy</span></a>
                    <a href="#" className='link'><span>Creator Portal</span></a>
                </div>
                <div className='info'>
                    <a href="#" className='link'><span>Community Guidelines</span></a>
                </div>

                {viewMore && (
                    <p>
                        <div className='infoMore'>
                            <a href="#" className='link'><span>Dance</span></a>
                            <a href="#" className='link'><span>Arts</span></a>
                            <a href="#" className='link'><span>Food and Drink</span></a>
                            <a href="#" className='link'><span>Tourism</span></a>
                        </div>
                        <div className='infoMore'>
                            <a href="#" className='link'><span>Production and Manufacturing</span></a>
                            <a href="#" className='link'><span>Vehicles and Transportation</span></a>
                            <a href="#" className='link'><span>Relationship</span></a>
                            <a href="#" className='link'><span>Retok Style</span></a>
                            <a href="#" className='link'><span>Athletics</span></a>
                            <a href="#" className='link'><span>Hobbies</span></a>
                        </div>
                    </p>
                )}
                <button className="more" onClick={toggleContent}>
                    {viewMore ? 'See Less' : 'See More'}
                </button>
                <p className='info' style={{ paddingBottom: '30px' }}>
                    © 2023 ReTok
                </p>
            </div>
        </>
    )
}

export default AboutSidebar