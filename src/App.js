import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      names: []
    };

  }

  writeToState(e) {
    let name = e.target.value;
    this.setState({
      name: name
    })
  }

  writeToDB(e) {
    // ID 484
    const token = 'Basic ' + btoa('JR' + ':' + '[PASSWORD]');
    console.log(token);
    let headers = {'Authorization': token , 'Accept': '*/*', 'Content-Type': 'application/json'};
    let body = {
      "conn":  '484',
      "qry": 'writeBackTest1',
      "columnNames": 'true',
      "params": {
        "UserName": this.state.name
      }
    }
    
    axios.post('http://vm1.infosol.com:8551/infoburst/rest/db/query', body, {headers: headers, responseType: 'text'}).then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  getNames(e) {
        // ID 484
        const token = 'Basic ' + btoa('JR' + ':' + '[PASSWORD]');
        console.log(token);
        let headers = {'Authorization': token , 'Accept': '*/*', 'Content-Type': 'application/json'};
        let body = {
          "conn":  '484',
          "qry": 'writeBackRead',
          "columnNames": 'true',
          "params": {}
        }
        
        axios.post('http://vm1.infosol.com:8551/infoburst/rest/db/query', body, {headers: headers, responseType: 'text'}).then((res) => {
          console.log(res.data);
          this.setState({
            names: res.data
          })
        })
        .catch((err) => {
          console.log(err);
        })
  }

  render() {
    const names = this.state.names !== null ? 
    <ul>{this.state.names.map(ele => {
      return <li>{ele['NAME']}</li>
    })}</ul> : null;
    return (
      <div className="App">
        <label>Enter Name:</label>
        <input onChange={e => this.writeToState(e)}></input>
        <button onClick={e => this.writeToDB(e)}>Submit</button>
        <br></br>
        <button onClick={e => this.getNames(e)}>GET NAMES</button>
        {names}

      </div>
    );
  }
}

export default App;
