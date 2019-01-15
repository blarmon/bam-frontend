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
			return(<div className="emptyAccount"></div>)
		} else {
			return (
				<div className="account">
					Account Type: {account.account_type} | 
					Balance: {account.balance} | 
					Interest Rate: {account.interest_rate} | 
					Opened On: {account.account_opened.split("T")[0]}
				</div>
			);
		}
	}
}


class User extends Component {
	
	render() {
		return (
			<div className="user">
				username: {this.props.data.username} | email: {this.props.data.email} <br />
				accounts: {this.props.data.accounts.map(account => (
					<ul key={account.id}>
						<Account data={account}/>
					</ul>
				))}
			</div>
		);
	}
}


class App extends Component {
	
	constructor(props) {
        super(props);
        this.state = {
            users: [],
            isLoaded: false,
       }
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
			return <div>Loading...</div>
		}
	
		return (
		<div className="App">
			<ul>
				{users.map(user => (
					<li key={user.username}>
						<User data={user}/>
					</li>
				))}
			</ul>
		</div>
	);
	}
}

export default App;
