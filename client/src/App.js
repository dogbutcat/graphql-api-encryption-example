import React, { Component } from "react";
// import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.css";
import Lauches from "./components/Lauches";
import Launch from "./components/Launch";
import { client } from "./utils/client";

// const client = new ApolloClient({
// 	uri: "http://localhost:9000/graphql"
// });

class App extends Component {
	render() {
		return (
			<ApolloProvider client={client}>
				<Router>
					<div className="App">
						<div>This for title.</div>
						<Route exact path="/" component={Lauches} />
						<Route exact path="/launch/:flight_number" component={Launch} />
					</div>
				</Router>
			</ApolloProvider>
		);
	}
}

export default App;
