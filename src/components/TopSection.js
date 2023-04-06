import React from 'react'

export default function TopSection() {
    return(
        <div className="top-section">
            <img src={require("../images/portrait.png")} alt="portrait" />
            <h1>Laura Smith</h1>
            <p>Frontend Developer</p>
            <p>Lorem ipsum dolor sit amet</p>
            <div className="top-link-section">
                <a href="mailto:laurasmith@examplemail.com" className="email-link">
                    <img src={require("../images/email.png")} alt="email" />
                    <p>Email</p>
                </a>
                <a href="https://linkedin.com/" className="linkedin-link">
                    <img src={require("../images/linkedin.png")} alt="linkedin" />
                    <p>LinkedIn</p>
                </a>
            </div>
        </div>
    )
}