import React from 'react';
import './Login.css';
import { Link, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';


class Login extends React.Component{

	
	constructor({props})
	{
		super(props);
		this.email;
		this.password;
		this.data;
		this.state={
			login:0
		}
	}



	onEmailChange=(event)=>{
		this.email=event.target.value;
	}

	onPasswordChange=(event)=>{
		this.password=event.target.value;
	}

	onSubmitLogin=()=>
	{
		fetch('http://localhost:3000/login',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.email,
				password:this.password
			})
		})
		.then(response=>response.json())
		.then(response=>{
			console.log(response);
			if(response=="success")
			{
				this.setState({login:1});
			}
			this.routing();
		})
	}

	routing=()=>
	{
		console.log('LOGNONOGG===',this.state.login);
		let child=[];
		if(this.state.login==1)
		{
			child.push(<Link to={"/home/"+this.email}><button type="submit" onClick={this.onSubmitLogin} class="btn btn-primary">Submit</button></Link>);
		}
		else if(this.state.login==0)
		{
			child.push(<Link to={"/"}><button type="submit" onClick={this.onSubmitLogin} class="btn btn-primary">Submit</button></Link>)
		}
		return child;
	}

	render(){
		return(
			<div>
				<Navigation/>
				<form>
				<div class="form">
				    <label>Email address</label>
				    <input type="email" onChange={this.onEmailChange} className="form-control" placeholder="Enter email"/>
				  </div>
				  <div class="form-group">
				    <label>Password</label>
				    <input type="password" onChange={this.onPasswordChange} className="form-control" placeholder="Password"/>
				  </div>
				  {this.routing()}
				</form>
			</div>
			)
		}
}



export default Login;