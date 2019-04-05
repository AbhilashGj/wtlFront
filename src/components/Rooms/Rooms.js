import React from 'react';
import './Rooms.css';
import { Link, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';


class Rooms extends React.Component{

	
	constructor({props})
	{
		super(props);
		this.roomNum=0;
		this.data;
		this.state={
		}
	}



	onEmailChange=(event)=>{
		this.email=event.target.value;
	}

	onPasswordChange=(event)=>{
		this.password=event.target.value;
	}


	chooseRoom=(room)=>
	{
		
		this.roomNum=room;
	}

	componentDidMount()
	{
		console.log("Mount",this.props.match.params.email);
	}

	render(){
		return(
			<div>
				<Navigation/>
				<Link to={"/home/"+this.props.match.params.email+"/room/1"}><button type="submit" onClick={this.chooseRoom.bind(this,1)} className="btn btn-primary">Room 1</button></Link>
				<Link to={"/home/"+this.props.match.params.email+"/room/2"}><button type="submit" onClick={this.chooseRoom.bind(this,2)} className="btn btn-primary">Room 2</button></Link>
				<Link to={"/home/"+this.props.match.params.email+"/room/3"}><button type="submit" onClick={this.chooseRoom.bind(this,3)} className="btn btn-primary">Room 3</button></Link>
				<Link to={"/home/"+this.props.match.params.email+"/room/4"}><button type="submit" onClick={this.chooseRoom.bind(this,4)} className="btn btn-primary">Room 4</button></Link>
			</div>
			)
		}
}



export default Rooms;