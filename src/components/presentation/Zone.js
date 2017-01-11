import React, { Component } from 'react'
import styles from './styles'

class Zone extends Component {
  render(){
    const style = styles.zone
    const zips = this.props.currentZone.zipCodes
    return(
      <div style = {style.container}>
      <h2 style = {style.header}><a style = {style.link} href="#">{this.props.currentZone.name}</a></h2>
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
