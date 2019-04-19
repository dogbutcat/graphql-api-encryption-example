import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
// import { Link } from "react-router-dom";

const LAUNCH_QUERY = gql`
	query LaunchQuery($flight_number: Int!) {
		launch(flight_number: $flight_number) {
			flight_number
			mission_name
			launch_year
			launch_success
			launch_date_local
			rocket {
				rocket_id
				rocket_name
				rocket_type
			}
		}
	}
	`;
	
class Launch extends Component {
	render() {
		let { flight_number } = this.props.match.params;
		flight_number = parseInt(flight_number);
		return (
			<div>
				<h1>Launch Detail</h1>
				<Query query={LAUNCH_QUERY} variables={{ flight_number }}>
					{({ loading, error, data }) => {
						if (loading) return <h3>Loading</h3>;
						if (error) return <code>{error.message}</code>;
						let {
							mission_name,
							flight_number,
							launch_success,
							launch_year,
							rocket: { rocket_id, rocket_name, rocket_type }
						} = data.launch;

						return (
							<div>
								<h3>
									<span>Mission:</span> {mission_name}
								</h3>
								<h4>Launch Detail</h4>
								<ul>
									<li>Flight Number: {flight_number}</li>
									<li>Launch Year: {launch_year}</li>
									<li>
										Launch Success: <span>{launch_success ? "Yes" : "No"}</span>
									</li>
								</ul>
								<h4>Rocket Detail:</h4>
								<ul>
									<li>Rocket ID: {rocket_id}</li>
									<li>Rocket Name: {rocket_name}</li>
									<li>Rocket Type: {rocket_type}</li>
								</ul>
							</div>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default Launch;
