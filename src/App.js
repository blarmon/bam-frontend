import React, { Component } from 'react';

function User(props) {
	return (
		<button className="user">
		    {props.SOMETHING TODO}
		</button>
    );
}

class App extends Component {
	
	constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
       }
    }
	
	componentDidMount() {
        fetch('https://bank-account-microservice.herokuapp.com/api/users/')
			.then(res => res.json())
			.then(json => {
				this.setState({
					isLoaded: true,
					items: json
				})
			});
    }
	
	render() {
		
		var { isLoaded, items } = this.state; 
	
		if (!isLoaded) {
			return <div>Loading...</div>
		}
	
		return (
		<div className="App">
			<ul>
				{items.map(item => (
					<li key={item.id}>
						Name: {item.name} | Email: {item.email}
					</li>
				))};
			</ul>
		</div>
	);
	}
}

export default App;
