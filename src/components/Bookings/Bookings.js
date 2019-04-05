import React from 'react';
import './Bookings.css';
import { Link, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';


class Bookings extends React.Component{

	
	constructor({props})
	{
		super(props);
		this.roomNum;
		this.eventName;
		this.numPeople;
		this.eventDate;
		this.startTime;
		this.endTime;
		this.data;
		this.state={
			'bookings':[]
		}
	}



	onEmailChange=(event)=>{
		this.email=event.target.value;
	}

	onPasswordChange=(event)=>{
		this.password=event.target.value;
	}


	chooseRoom=(roomNum)=>
	{
		console.log(roomNum);
		this.roomNum=roomNum;
	}

	componentDidMount()
	{
		console.log("Mount",this.props.match.params.email);
		this.getBookings();
	}

	getBookings()
	{
		fetch('http://localhost:3000/getBookingsEmail',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.props.match.params.email
			})
		})
		.then(response=>response.json())
		.then(result=>{
			this.setState({bookings:result});
			console.log(this.state.bookings);
		})
	}

	render(){
		return(
			<div>
			<Navigation/>
			<div className="bookingsParent">
			<h1>Your Bookings</h1>
				<table>
				<tr>
					<th>Event Name</th>
					<th>Event Date</th>
					<th>Start Time</th>
					<th>End Time</th>
				</tr>
				{
					this.state.bookings.map(booking=>(
						<tr>
						<td>{booking.eventname}</td>
						<td>{booking.eventdate}</td>
						<td>{booking.eventtime}</td>
						<td>{booking.endtime}</td>
						</tr>
						))
				}
				</table>
			</div>
			</div>
			)
		}
}



export default Bookings;