import React from 'react'

const IMAGE_BASE_URL="https://image.tmdb.org/t/p/w500/";

const VideoListItem = (props) => {
    const {movie} = props;
    return <li className="list-group-item" onClick={HandleOnClick}>

        <div className="media"> 
            <div className="media-left">
                  <img className="media-object img-rounded" height='100px' width='100px' src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt=""/>
            </div>
 
                <div className="media-body">
                    <h5 className="title_list_item">{movie.title} </h5>
                </div>
        </div>
    
        </li>

        function HandleOnClick() {
            console.log('click')
            props.callback(movie)
        }
}

export default VideoListItem