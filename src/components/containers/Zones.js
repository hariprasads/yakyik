import React, { Component } from 'react'
import Zone from '../presentation/Zone'
import superagent from 'superagent'
import Styles from './styles'

class Zones extends Component {

    constructor(){
      super()
      this.state = {
        zone:{
          name:'',
          zipCodes:''
        },
        list:[]
      }
    }

    componentDidMount(){
        //console.log('Component did mount')

        superagent
        .get('/api/zone')
        .query(null)
        .set('Accept', 'application/json')
        .end((err, response) => {

            if(err){
              alert('Error': err)
              return
            }
          //  console.log(JSON.stringify(response.body))
            let results = response.body.message
            this.setState({
              list: results
            })


        })
    }

    updateZone(event){
      let tempZone = Object.assign({}, this.state.zone)
      tempZone[event.target.id] = event.target.value
      this.setState({
        zone: tempZone
      })
    }

    submitZone(){
      let tempZone = Object.assign([], this.state.list)
      tempZone.push(this.state.zone)
      this.setState({
        list: tempZone
      })
    }

    render(){

      const listItems = this.state.list.map((zone, i) => {
        return (
          <li key={i}><Zone currentZone ={zone} /></li>
        )
      })

      return(
        <div>
          <ul style={Styles.liststyle}>
            {listItems}
          </ul>

          <input id ="name" onChange = {this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zone Name" /><br/>
          <input id="zipCodes" onChange = {this.updateZone.bind(this)} className="form-control" type="text" placeholder="Zipcode" /><br/>
          <input className="form-control" type="text" placeholder="Number of Comments" /><br/>
          <button onClick = {this.submitZone.bind(this)} className="btn btn-danger">Submit</button>

        </div>
      )
  }
}

export default Zones
