import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import LaunchItem from "./LaunchItem";

const LAUNCHES_QUERY = gql`
	{
		launches {
			flight_number
			mission_name
			launch_date_local
			launch_success
		}
	}
`;

class Lauches extends Component {
	render() {
		return (
			<div>
				<h1 className="display-4 my-3">Lauches</h1>
				<Query query={LAUNCHES_QUERY}>
					{({ loading, error, data }) => {
						if (loading) return <h4>Loading...</h4>;
						if (error) console.log(error);
						return (
							<Fragment>
								{data.launches.map(launch => (
									<LaunchItem key={launch.flight_number} launch={launch} />
								))}
							</Fragment>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default Lauches;
