import React, {Component} from 'react'

class Comment extends Component{
  render(){
    return(
      <div style={{marginBottom:16}}>
      <p style={{fontSize:18, fontWeight: 600}}>{this.props.currentComment.body} </p>

      <span style={{fontWeight:100}}>By: {this.props.currentComment.username}</span>
      <span style={{marginLeft:12, marginRight:12, fontWeight:100}}>|</span>
      <span style={{fontWeight:100}}>Posted: {this.props.currentComment.timeStamp}</span>
      <hr />
      </div>
    )
  }
}

export default Comment
