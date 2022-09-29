import React, { Component } from 'react'
import SerachBar from '../components/serach-bar'
import VideoList from '../containers/video-list'
import VideoDetail from '../components/video-detail'
import Video from '../components/video'

import 'bootstrap/dist/css/bootstrap.min.css';

import axios from 'axios'

const API_END_POINT = "https://api.themoviedb.org/3/"

const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"

const API_KEY = "api_key=e4cbee7d094cbd660db9af86cbd1354f"

const SEARCH_URL = "search/movie?language=fr&include_adult=false"


class App extends Component {

  constructor(props){
    super(props)
    this.state = {movieList:{},currentMovie:{}}
  }

  componentWillMount(){

    this.initMovies();

  }


  initMovies(){
      axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function(response){
      this.setState({movieList:response.data.results.slice(1,6) , currentMovie:response.data.results[0]}, function () {
        this.applyVideoToCurrentMovie()
      } );

    }.bind(this));
  }

  applyVideoToCurrentMovie() {

    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`).then(function(response){
     console.log(response)


     
    const youtubeKey = response.data.videos.results[0].key;
    // const youtubeKey = response.data.videos.results[5].key;
  
    let newCurrentMovieState = this.state.currentMovie;
    newCurrentMovieState.videoId = youtubeKey;
    this.setState({currentMovie : newCurrentMovieState}) 
    console.log('(---------)')
    console.log(newCurrentMovieState)


    }.bind(this));
  }


  onClickListeItem (movie){
    this.setState({currentMovie:movie}, function () {
      this.applyVideoToCurrentMovie();
      this.setRecommendations();
      
    })
  }

  onClickSearch(searchText){

     if(searchText){

        axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`).then(function(response){

          console.log('*****')
          console.log(response.data.results[0].id)
          console.log('*****')

          if(response.data && response.data.results[0]){

            if(response.data.results[0].id !== this.state.currentMovie.id){
               this.setState({currentMovie: response.data.results[0]}, () =>{
                    this.applyVideoToCurrentMovie();
                    this.setRecommendations();
               } )

            }
          }
    
      }.bind(this));

      }
    }


    setRecommendations(){

      axios.get(`${API_END_POINT}/movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`).then(function(response){
        this.setState({movieList:response.data.results.slice(0,5)}, );
  
      }.bind(this));
  
    }

  render () {

    const renderVideoList = ()=>  {

      if(this.state.movieList.length>=5){
        return <VideoList movieList={this.state.movieList} callback={this.onClickListeItem.bind(this)} />
      }
   }

    return (

      <div>
            <div className="Serach-Bar"> 
                 <SerachBar callback={this.onClickSearch.bind(this)}/>
            </div>
     
          <div className="row">
              <div className="col-md-8">
                <Video videoId={this.state.currentMovie.videoId}/>
                <VideoDetail title={this.state.currentMovie.original_title} description={this.state.currentMovie.overview}/>

               </div>
    
            <div className="col-md-4">
                 {renderVideoList()}
            </div>
          </div>
     
        
      </div>
    );
    
  }
  
}

export default App;
