import React, { Component } from 'react';
import "../css/Login.css";
import VideoPlayer from 'react-simple-video-player';

class Follow extends Component{

    render(){
        return(
            <div>
                <VideoPlayer
                    url="https://www.youtube.com/watch?v=KUf5RSRPxS8"
                    poster="/myPoster.png"
                    width='100'
                    height='100'
                    autoplay
                />
            </div>
        );
    }

}

export default Follow;