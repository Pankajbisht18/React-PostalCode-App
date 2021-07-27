import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  state = ({pincode:'', msg:"", code:[]});
  
  handleChange = (evt) => {
    this.setState({pincode:evt.target.value})
  }
  handleClick = () => {
      axios.get(`https://api.postalpincode.in/pincode/${this.state.pincode}`)
      .then((response)=>{
          console.log(response.data)
          this.setState({msg:response.data[0].Message,code:response.data[0].PostOffice})
      })
      .catch((error)=> {
          console.log("Not okay : ",error);
      })    
  }
  handlePress = (evt) => {
    if(evt.charCode === 13){
      this.handleClick();
    }
  }
  render() {
    let output = null;
    if(this.state.msg==="The requested resource is not found")
    {
      output = (
        <>
          <h1 className="text-center">Not Found</h1>
        </>
      )
    }
    else{
      output = (
        <div className="container res">
          <h3 className="text-center">{this.state.msg}</h3>
          <div className="d-flex flex-wrap">
            {this.state.code.map((pin,i)=> {
              return(
                <div key={i} className="postOff text-center">
                  <p className="fw-bold">Name: {pin.Name}</p>   
                  <p className="fw-bold">Distric: {pin.District}</p>  
                  <p className="fw-bold">Delivery Status: {pin.DeliveryStatus}</p>
                </div> 
              )
            })}
          </div>
        </div>
      )
    }
    return (
      <>
        <div>
          <div className="container mt-5">
            <h1 className="text-center">Search Post Office...</h1>
              <input
                type="text" 
                value={this.state.pincode} 
                placeholder="Enter Your Pincode"
                className="mx-auto d-block txt ps-3 mt-4 shadow-lg bg-body"
                onChange={this.handleChange} 
                onKeyPress={this.handlePress}
              />
              <input 
                type="button" 
                value="Search" 
                className="mx-auto d-block my-3 btn btn-primary shadow search"
                onClick={this.handleClick} 
              />
          </div>         
            {output}
        </div>
      </>
    );
  }
}
export default App;