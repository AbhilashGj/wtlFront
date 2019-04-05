import React from 'react';
import './Navigation.css';
import queryString from 'query-string';
import { Link, Route, Switch } from 'react-router-dom';


class Navigation extends React.Component{
  constructor({props,route,})
  {
    super(props);
    this.state={
      route:'',
      res:0
    }
  }


  render()
  {
    return(
      <div>
    {
          <nav className="navbar navbar-expand-lg navbar-dark" >
            <a className="navbar-brand" href="#0">Meeting Room</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav">
              </div>
            </div>
          </nav>
    }
      </div>
      )
  }
}


export default Navigation;