import React from 'react';

export default function ImageCloud(){
    return (
        <div className="image-cloud">
            <div className="image-cloud--column-1">
                <img src={require("../images/1.png")} alt="1.png"/>
            </div>
            <div className="image-cloud--column-2">
                <img src={require("../images/2.png")} alt="2.png"/>
                <img src={require("../images/3.png")} alt="3.png"/>
                </div>
            <div className="image-cloud--column-3">
                <img src={require("../images/4.png")} alt="4.png"/>
                <img src={require("../images/5.png")} alt="5.png"/>
            </div>
            <div className="image-cloud--column-4">
                <img src={require("../images/6.png")} alt="6.png"/>
                <img src={require("../images/7.png")} alt="7.png"/>
            </div>
            <div className="image-cloud--column-5">
                <img src={require("../images/8.png")} alt="8.png"/>
                <img src={require("../images/9.png")} alt="9.png"/>
            </div>
        </div>
    )
}