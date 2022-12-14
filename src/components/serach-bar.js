import React, { Component } from 'react'


class SerachBar extends Component {
    constructor(props){
        super(props);
        this.state = {searchText:"", placeHolder:"Tapez Voter Film ....",
        intervalBeforRequest:1000,
        lockRequest: false,

        }     
    }

    render() {
        return (   
        
        <div className="row">
            <div className="col-md-8" input-group="true">
                     <input type="text" className="form-control input-lg" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder}/>
                     <span className="input-group-btn" >
                            <button className="btn btn-secondary" onClick={this.handleOnClick.bind(this)}> Go </button>
                     </span>
            </div>
          
      </div>)
     
      
    }


    handleChange(event){

       this.setState({searchText:event.target.value})
       if(!this.state.lockRequest){
           this.setState({lockRequest:true})
           setTimeout(function() {
               this.serach()}.bind(this),this.state.intervalBeforRequest)

       }

    }
    handleOnClick(){
        this.serach()
    }

    serach(){
        this.props.callback(this.state.searchText);
        this.setState({lockRequest:false})

    }
}

export default SerachBar