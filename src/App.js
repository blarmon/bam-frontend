import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "./App.css"

class Account extends Component {
	
	constructor(props) {
        super(props);
        this.state = {
            account: [],
            isLoaded: false,
        }
    }
	componentDidMount() {
		fetch('https://cors-anywhere.herokuapp.com/' + this.props.data)
				.then(res => res.json())
				.then(json => {
					this.setState({
						isLoaded: true,
						account: json
					})
				});
	}
			
	render() {
		const { isLoaded, account } = this.state;
		if (account.length === 0) {
			return (
				<div className="account">
					No accounts :( :p
				</div>
			);
		} else {
			return (
				<div className="account">
					<u>{account.account_type} account </u> <br /> 
					Balance: ${account.balance} <br />
					Interest Rate: {account.interest_rate}% <br /> 
					Opened On: {account.account_opened.split("T")[0]} <br /> <br />
				</div>
			);
		}
	}
}


class User extends Component {
	
	render() {
		return (
			<span className="user">
				<img src={require("./no-img.png")} alt="just imagine :)" height="75" width = "75" /> <br />
				{this.props.data.username} <br />
				{this.props.data.email} <br /> <br />
				{this.props.data.accounts.map(account => (
					<span key={account}>
						<Account data={account}/>
					</span>
				))}
			</span>
		);
	}
}


class App extends Component {
	
	constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoaded: false,
			username: null,
			email: null,
        }
	   	this.postUser= this.postUser.bind(this);
		this.handleChange = this.handleChange.bind(this);
    }
	
	postUser() {
		console.log('reached')
		fetch("https://cors-anywhere.herokuapp.com/https://bank-account-microservice.herokuapp.com/api/users/", {  
			method: 'POST',  
			headers: {  
			  'Content-Type': 'application/json'  
			},  
			body: JSON.stringify({
			"username": this.state.username,
			"email": this.state.email,
			"accounts": [],
		  })
		})
		.then(function (data) {  
		  console.log('Request success: ', data);  
		})  
		.catch(function (error) {  
		  console.log('Request failure: ', error);  
		});
		var newUsersArray = this.state.users.concat({url: "", username: this.state.username, email: this.state.email, accounts: []})
		this.setState({users: newUsersArray});
	}
	
	handleChange({ target }) {
		this.setState({
			[target.name]: target.value
		});
    }

	
	componentDidMount() {
        fetch('https://cors-anywhere.herokuapp.com/https://bank-account-microservice.herokuapp.com/api/users/')
			.then(res => res.json())
			.then(json => {
				this.setState({
					isLoaded: true,
					users: json
				})
			});
    }
	
	render() {
		const { isLoaded, users } = this.state; 
	
		if (!isLoaded) {
			return <div>Starting up the bank-account-microservice heroku app (this can take a little while sometimes!)</div>
		}
	
		return (
		<div className="App">
		<h1 className="pageHeader">bank-account-microservice React Frontend</h1>
			<ul>
				{users.map(user => (
					<ul key={user.username}>
						<User data={user}/>
					</ul>
				))}
				<span className="user">
					<img src={require("./no-img.png")} alt="just imagine :)" height="75" width = "75" /> <br />
					Create a User
					<br />
					<br />
					<input 
						type="text" 
						name="username" 
						placeholder="Username" 
						value={ this.state.topicBox }
						onChange={ this.handleChange } 
					/>
					<br />
					<br />
					<input 
						type="text" 
						name="email" 
						placeholder="Email"
						value={ this.state.payloadBox } 
						onChange={ this.handleChange } 
					/> 
					<br />
					<br />
					<button onClick={() => { this.postUser() }}>Create a new user!</button>
				</span>
			</ul>
		</div>
	);
	}
}




export default App;
