import React, { Component } from 'react';
import logo from './logo.svg';
import 'tachyons';
import './App.css';
import { Link, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Rooms from './components/Rooms/Rooms';
import BookRoom from './components/BookRoom/BookRoom';
import Bookings from './components/Bookings/Bookings';


class App extends Component {


  constructor()
  {
    super();
    this.Days=0;
    this.state=
    {
      route:'signIn',
      isSignedIn:false
    }
  }

  onRouteChange=(route)=>{
    this.setState({route:route});
    console.log(this.state.route);

  }

componentDidMount()
{
  console.log("Ap.jswkmd",this.state.route);
}




  render() {
    return (
      <div className="App">
        <Route exact path="/" render={(props)=><Login onRouteChange={this.onRouteChange}{...props}/>}/>
        <Route exact path={"/home/:email"} render={(props)=><Rooms  {...props}/>}/>
        <Route exact path={"/home/:email/room/:roomNum"} render={(props)=><BookRoom  {...props}/>}/>
        <Route exact path={"/home/:email/bookings"} render={(props)=><Bookings  {...props}/>}/>
      </div>

    );
  }
}

export default App;
