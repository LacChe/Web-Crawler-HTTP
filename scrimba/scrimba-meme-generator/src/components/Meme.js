import React, {useState, useEffect} from 'react';

export default function Meme(){

    const [meme, setMeme] = useState({
        firstText: "",
        secondText: "",
        url: "https://i.imgflip.com/1bij.jpg"
    });
    const [allMemes, setAllMemes] = useState([]);

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
    }, []);

    function handleChange(event){
        const {name, value} = event.target;
        setMeme( prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    function getMemeImage(){
        const randNum = Math.floor(Math.random() * allMemes.length);
        setMeme(prevMeme => ({
            ...prevMeme,
            url: allMemes[randNum].url
        }));
    }
    
    return(
        <div className="meme">
            <div className="inputs">
                <input onChange={handleChange} name="firstText" value={meme.firstText}></input>
                <input onChange={handleChange} name="secondText" value={meme.secondText}></input>
            </div>
            <button onClick={getMemeImage}>Get a new meme image &#128444;&#65039;</button> 
            <div className="meme-gen">
                <img className="meme-img" src={meme.url} alt="mem-img" />
                <h2 className="meme--text top">{meme.firstText}</h2>
                <h2 className="meme--text bottom">{meme.secondText}</h2>
            </div>
        </div>
    )
}