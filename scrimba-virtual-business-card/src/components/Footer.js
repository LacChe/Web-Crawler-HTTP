import React from 'react'

export default function Footer() {
    return(
        <div className="footer">
            <a href="https://facebook.com/">
                <img src={require("../images/facebook.png")} alt="facebook" />
            </a>
            <a href="https://github.com/">
                <img src={require("../images/github.png")} alt="github" />
            </a>
            <a href="https://twitter.com/">
                <img src={require("../images/twitter.png")} alt="twitter" />
            </a>
            <a href="https://instagram.com/">
                <img src={require("../images/instagram.png")} alt="instagram" />
            </a>
        </div>
    )
}