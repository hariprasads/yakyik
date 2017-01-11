import React, {Component} from 'react'
import Comment from '../presentation/comment'
import superagent from 'superagent'
import Styles from './styles'

class Comments extends Component {
  constructor(){
    super()
    this.state = {
      comment:{
        username: '',
        body: '',
        timeStamp:''
      },
      list: []
    }
  }
  componentDidMount(){
    superagent
    .get('/api/comment')
    .query(null)
    .set('Accept','application/json')
    .end((err, response)=>{
      if(err){
        alert("ERROR: " + err)
        return
      }
      let results = response.body.message
      this.setState({
        list: results
      })
    })
  }

  submitComment(){
    console.log("Comment Received: " + JSON.stringify(this.state.comment));

    let newList = Object.assign([], this.state.lists)
    newList.push(this.state.comment)
    this.setState({
      list: newList
    })

  }
  updateUsername(event){
    //console.log("Update Username :" + event.target.value);
    //this.state.comment['username'] = event.target.value // Wrong way
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['username'] = event.target.value
    this.setState({
      comment: updatedComment
    })
  }
  updateBody(event){
    //console.log("comment : "+event.target.value);
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['body'] = event.target.value
    this.setState({
      comment: updatedComment
    })
  }
  updateTime(event){
    //console.log("comment : "+event.target.value);
    let updatedComment = Object.assign({}, this.state.comment)
    updatedComment['timeStamp'] = event.target.value
    this.setState({
      comment: updatedComment
    })
  }

  render(){
    const style = Styles.comment
    const commentList = this.state.list.map((comment, i)=>{
      return(
        <li key={i}><Comment currentComment = {comment}/> </li>
      )
    })

    return(
      <div>
      <h2> Zone 1 Comments</h2>
      <div style={style.commentbox}>
      <ul style = {Styles.liststyle} >
        {commentList}
      </ul>
      <input onChange = {this.updateUsername.bind(this)} className="form-control" type="text" placeholder ="Username" /> <br />
      <input onChange = {this.updateBody.bind(this)} className="form-control" type="text" placeholder ="Comment" /> <br />
      <input onChange = {this.updateTime.bind(this)} className="form-control" type="text" placeholder ="TimeStamp" /> <br />
      <button onClick={this.submitComment.bind(this)} className="btn btn-info">Submit</button>
      </div>
      </div>
    )
  }
}

export default Comments
