import React from 'react'

import VideoListItem from '../components/video-list-item'

const VideoList = (props) => {

    const {movieList} = props;

    // console.log(movieList)

    // const movies = ['film1','film2','film3','film4','film5',];

    return (
        <div>
            <ul>

                {
                     movieList.map((movie) => {
                       return  <VideoListItem key={movie.id} movie={movie} callback={receiveCallBack}/>
                     })
                }
            </ul>
        </div>

    );

    function receiveCallBack(movie) {
        props.callback(movie)
        
    } 
       
}




export default VideoList