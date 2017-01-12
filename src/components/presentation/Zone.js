import React, { Component } from 'react'
import styles from './styles'

class Zone extends Component {

  onSelectTitle(event){
    event.preventDefault()
    console.log("Selected");
    this.props.select(this.props.index)
  }

  render(){
    const style = styles.zone
    const zips = this.props.currentZone.zipCodes
    const title = (this.props.isSelected) ? <a style = {style.link} href="#">{this.props.currentZone.name} </a>: <a href="#">{this.props.currentZone.name}</a>

    return(
      <div style = {style.container}>
      <h2 onClick ={this.onSelectTitle.bind(this)} style = {style.header}>
        { title }
      </h2>
        <span className="details">{zips.map((zip, i)=>{
          if (i == 0){
              return (" " + zip)
          }
          return (", " + zip)
        })}</span> <br />
        <span className="details">{this.props.currentZone.comments} comments</span>
      </div>
    )
  }
}


export default Zone
