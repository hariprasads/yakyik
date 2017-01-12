import React, { Component } from 'react'
import { Zone, CreateZone } from '../presentation'
import { APIManager } from '../../utils/'
import Styles from './styles'

class Zones extends Component {

    constructor(){
      super()
      this.state = {
        selected:0,
        list:[]
      }
    }

    componentDidMount(){
        //console.log('Component did mount')
        APIManager.get('/api/zone', null, (err, results)=>{
          if (err){
            alert('Error:' + err.message)
            return
          }

          this.setState({
            list: results.message
          })
        })
    }

    selectZone(select){
      console.log("Select Zone: "+ select)
      this.setState({
        selected: select
      })
    }

    submitZone(zone){
      console.log('POST BODY: ' + JSON.stringify(zone))

      APIManager.post('/api/zone', zone, (err, response)=>{
        if(err){
          alert('Error: ' + err.message)
          return
        }
        console.log('Zone created' + JSON.stringify(response))
        let updatedList = Object.assign([], this.state.list)
        updatedList.push(response.message)
        this.setState({
          list: updatedList
        })
      })

    }

    render(){

      const listItems = this.state.list.map((zone, i) => {
        let selected = (i==this.state.selected)
        return (
          <li key={i}>
          <Zone index={i} select ={this.selectZone.bind(this)} isSelected={selected} currentZone ={zone} /></li>
        )
      })

      return(
        <div>
          <ul style={Styles.liststyle}>
            {listItems}
          </ul>
          <CreateZone onCreate={this.submitZone.bind(this)}/>
        </div>
      )
  }
}

export default Zones
