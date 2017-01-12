import React, { Component } from 'react'

class CreateZone extends Component{
  constructor(){
    super()
    this.state = {
      zone: {

      }
    }
  }

  updateZone(event){
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone[event.target.id] = event.target.value
    this.setState({
      zone: updatedZone
    })
  }

  submitZone(){
    console.log("Zone :" + JSON.stringify(this.state.zone))
    let updatedZone = Object.assign({}, this.state.zone)
    updatedZone['zipCodes']= updatedZone.zipCode.split(',')
    this.props.onCreate(updatedZone)
  }

  render(){
    return(
      <div>
      <input id ="name" onChange = {this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zone Name" /><br/>
      <input id="zipCode" onChange = {this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zipcode" /><br/>
      <button onClick = {this.submitZone.bind(this)} className="btn btn-danger">Submit</button>
      </div>
    )
  }
}

export default CreateZone
