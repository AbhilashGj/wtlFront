import React from 'react';
import './BookRoom.css';
import { Link, Route, Switch } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';


class BookRoom extends React.Component{

	
	constructor({props})
	{
		super(props);
		this.bookings=[];
		this.curDate="0-0-0";
		this.roomNum=0;
		this.eventName="No Name";
		this.numPeople=0;
		this.eventDate="0-0-0";
		this.startTime="0:0";
		this.endTime="0:0";
		this.data;
		this.flag3=0;
		this.test=0;
		this.flagDate=0;
		this.flagSTime=0;
		this.flagETime=0;
		this.state={
			'bookings':[],
			'availabilityD':'',
			'availabilityT':'temp'
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
		this.curDate=new Date();
		this.getBookings();
	}

	onEventChange=(event)=>
	{
		this.eventName=event.target.value;
		console.log(this.eventName);
	}

	onNumberChange=(event)=>
	{
		this.numPeople=event.target.value;
		console.log(this.numPeople);
	}

	onDateChange=(event)=>
	{
		this.eventDate=event.target.value;
		var flag1=0;
		var date=this.curDate.getFullYear()+"-"+(this.curDate.getMonth()+1)+"-"+this.curDate.getDay();
		var temp=this.eventDate.split("-");
		var temp1=(parseInt(temp[0])*365)+(parseInt(temp[1])*30)+(parseInt(temp[2]));
		var temp2=(parseInt(this.curDate.getFullYear())*365)+(parseInt((this.curDate.getMonth())+parseInt(1))*30)+(parseInt(this.curDate.getDay()));
		console.log("yes out");
		if(temp1>=temp2 && temp1<=temp2+parseInt(5))
		{
			console.log("yes");
			this.setState({'availabilityD':"Room availiable for the selected date"})
			this.flagDate=1;
		}
		else
		{
			this.setState({'availabilityD':"Room not available for the date"})
		}
	}

	onStartTimeChange=(event)=>
	{
		this.startTime=event.target.value;
		console.log(this.startTime);
	}

	onEndTimeChange=(event)=>
	{
		var tempDate=this.eventDate.split("-");
		var tempSTime=this.startTime.split(":");
		var tempETime=this.endTime.split(":");
		var flag1=0;
		this.endTime=event.target.value;
		console.log(this.endTime);
		let start=tempSTime[0]*60+parseInt(tempSTime[1]);
		let end=tempETime[0]*60+parseInt(tempETime[1]);
		if(start<end)
		{
			flag1=1;
		}


		if(flag1==1)
		{
			var flag2=0;
			var cnt=0;
			for(let i=0;i<this.bookings.length;i++)
			{
				var tempBDate=this.bookings[i].eventdate.split("-");
				if(tempDate[0]==tempBDate[0] && tempDate[1]==tempBDate[1] && tempDate[2]==tempBDate[2])
				{
					cnt++;
					var sTime=this.bookings[i].eventtime.split(":");
					var eTime=this.bookings[i].endtime.split(":");
					let startB=sTime[0]*60+parseInt(sTime[1]);
					let endB=eTime[0]*60+parseInt(eTime[1]);

					if(start<startB && end<startB)
					{
						flag2++;
					}

					else if(start>=endB)
					{
						flag2++;
					}
					console.log("Date matched");
				}
			}
			if(cnt==flag2)
			{
				this.flag3=1;
				console.log("yesTime");
				this.setState({'availabilityT':"Booking slot available"});
			}
			else
			{
				this.setState({'availabilityT':"Slot not availiable"});
			}

		}
		else
			{
				this.setState({'availabilityT':"Slot not availiable"});
			}
	}

	getBookings()
	{

		fetch('http://localhost:3000/getBookings',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				roomnum:this.props.match.params.roomNum
			})
		})
		.then(response=>response.json())
		.then(result=>{
			this.bookings=result;
			for(let i=0;i<this.bookings.length;i++)
			{
				var temp=this.bookings[i].eventdate.split("-");
				var temp1=(parseInt(temp[0])*365)+(parseInt(temp[1])*30)+(parseInt(temp[2]));
				var temp2=(parseInt(this.curDate.getFullYear())*365)+(parseInt((this.curDate.getMonth())+parseInt(1))*30)+(parseInt(this.curDate.getDay()));
				if(parseInt(temp1)<parseInt(temp2))
				{
					console.log(temp1, temp2);
					this.bookings.splice(i,2);
					console.log("test",this.bookings[i].eventdate);
					console.log(temp1, temp2);
				}	
			}

			this.setState({bookings:this.bookings});
			console.log(this.state.bookings);
			console.log(this.bookings);
		})
	}

	checkAvailability=()=>
	{
		var tempDate=this.eventDate.split("-");
		var tempSTime=this.startTime.split(":");
		var tempETime=this.endTime.split(":");
		var flag1=0;
		

		let start=tempSTime[0]*60+parseInt(tempSTime[1]);
		let end=tempETime[0]*60+parseInt(tempETime[1]);
		if(start<end)
		{
			flag1=1;
		}


		if(flag1==1)
		{
			var flag2=0;
			var cnt=0;
			for(let i=0;i<this.bookings.length;i++)
			{
				var tempBDate=this.bookings[i].eventdate.split("-");
				if(tempDate[0]==tempBDate[0] && tempDate[1]==tempBDate[1] && tempDate[2]==tempBDate[2])
				{
					cnt++;
					console.log("In checkAvailability date verified");
					var sTime=this.bookings[i].eventtime.split(":");
					var eTime=this.bookings[i].endtime.split(":");
					let startB=sTime[0]*60+parseInt(sTime[1]);
					let endB=eTime[0]*60+parseInt(eTime[1]);

					if(start<startB && end<startB)
					{
						flag2++;
					}

					else if(start>=endB)
					{
						flag2++;
					}
					console.log("Date matched");
				}
			}
			if(cnt==flag2)
			{
				this.flag3=1;
				return 1;
			}

		}
	}

	availability=()=>
	{
		console.log('availability');
		var flag1=0;
		var date=this.curDate.getFullYear()+"-"+(this.curDate.getMonth()+1)+"-"+this.curDate.getDay();
		var temp=this.eventDate.split("-");
		var temp1=(parseInt(temp[0])*365)+(parseInt(temp[1])*30)+(parseInt(temp[2]));
		var temp2=(parseInt(this.curDate.getFullYear())*365)+(parseInt((this.curDate.getMonth())+parseInt(1))*30)+(parseInt(this.curDate.getDay()));
		if(temp1>=temp2 && temp1<=temp2+parseInt(5))
		{
			this.setState({'availabilityD':"Room availiable for the selected date"})
			flag1++;
		}
	}


	makeBooking=()=>
	{
		var date=this.curDate.getFullYear()+"-"+(this.curDate.getMonth()+1)+"-"+this.curDate.getDay();
		var temp=this.eventDate.split("-");
		var temp1=(parseInt(temp[0])*365)+(parseInt(temp[1])*30)+(parseInt(temp[2]));
		var temp2=(parseInt(this.curDate.getFullYear())*365)+(parseInt((this.curDate.getMonth())+parseInt(1))*30)+(parseInt(this.curDate.getDay()));
		console.log("Making Booking",temp1,temp2);
		this.availability();
		if(temp1>=temp2 && temp1<=temp2+parseInt(5))
		{
			this.checkAvailability();
			if(this.flag3==1)
			{
				fetch('http://localhost:3000/makeBooking',{
				method:'post',
				headers:{'Content-Type':'application/json'},
				body:JSON.stringify({
					email:this.props.match.params.email,
					eventname:this.eventName,
					people:this.numPeople,
					eventdate:this.eventDate,
					eventtime:this.startTime,
					endtime:this.endTime,
					roomnum:this.props.match.params.roomNum
					})
				})
				.then(response=>response.json())
				.then(result=>{
					this.setState({bookings:result});
					console.log(this.state.bookings);
				})
			}
		}
		else
		{
			console.log("Unable to book");
		}
	}



	render(){
		return(
			<div>
			<Navigation/>
			<h1>Bookings for this room</h1>
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

			<form className="bookRoomF">
				<div className="form">
				    <label>Event Name</label>
				    <input type="text" onChange={this.onEventChange} className="form-control" placeholder="Enter event name" required/>
				  </div>
				  <div class="form-group">
				  <label>Number of people</label>
				    <input type="number" onChange={this.onNumberChange} className="form-control" placeholder="Enter number of attendees" required/>
				  </div>
				  <div class="form-group">
				  <label>Event date</label>
				    <input type="date" onChange={this.onDateChange} className="form-control" placeholder="Enter date of event" required/>
				  	{this.state.availabilityD}
				  </div>
				  <div class="form-group">
				  <label>Enter start time</label>
				    <input type="time" onChange={this.onStartTimeChange} className="form-control" placeholder="Enter the start time" required/>
				  </div>
				  <div class="form-group">
					<label>Enter end time</label>
				    <input type="time" onChange={this.onEndTimeChange} className="form-control" placeholder="Enter the end time" required/>
				  	{this.state.availabilityT}
				  </div>
				  <Link to={"/home/"+this.props.match.params.email+"/bookings"}><button type="submit" onClick={this.makeBooking} class="btn btn-primary">Book Room</button></Link>
			</form>
			</div>
			)
		}
}



export default BookRoom;