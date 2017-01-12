import React, {Component} from 'react'
import {Comment, CreateComment} from '../presentation'
import { APIManager } from '../../utils'
import Styles from './styles'

class Comments extends Component {
  constructor(){
    super()
    this.state = {
      // comment:{
      //   username: '',
      //   body: ''
      // },
      list: []
    }
  }
  componentDidMount(){
    APIManager.get('/api/comment', null, (err, response)=>{
      if (err){
        alert("Error: "+ err.message)
        return
      }
      this.setState({
        list: response.message
      })
    })

  }

  submitComment(comment){
    console.log("Comment Received: " + JSON.stringify(comment));

    APIManager.post('/api/comment', comment, (err, response)=>{
      if(err){
        alert("Error: " + err.message)
        return
      }
      console.log(response.message);
      let newList = Object.assign([], this.state.list)
      newList.push(response.message)
      this.setState({
        list: newList
      })
    })


  }
  // updateUsername(event){
  //   //console.log("Update Username :" + event.target.value);
  //   //this.state.comment['username'] = event.target.value // Wrong way
  //   let updatedComment = Object.assign({}, this.state.comment)
  //   updatedComment['username'] = event.target.value
  //   this.setState({
  //     comment: updatedComment
  //   })
  // }
  // updateBody(event){
  //   //console.log("comment : "+event.target.value);
  //   let updatedComment = Object.assign({}, this.state.comment)
  //   updatedComment['body'] = event.target.value
  //   this.setState({
  //     comment: updatedComment
  //   })
  // }

  render(){
    const style = Styles.comment
    const commentList = this.state.list.map((comment, i)=>{
      return(
        <li key={i}><Comment currentComment = {comment}/> </li>
      )
    })

    return(
      <div>
        <div style={style.commentbox}>
          <ul style = {Styles.liststyle} >
            {commentList}
          </ul>
          <CreateComment onCreate = {this.submitComment.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default Comments
