import React, { Component } from "react";
import { Link } from "react-router-dom";


class LaunchItem extends Component {
	render() {
		const {
			launch: { flight_number, mission_name, launch_date_local, launch_success }
		} = this.props;
		let titleStyle = launch_success
			? { color: "lightgreen" }
			: { color: "palevioletred" };
		return (
			<div style={{ margin: "auto", maxWidth: "900px", textAlign: "left" }}>
				<div
					style={{
						width: "80%",
						display: "inline-block",
						verticalAlign: "middle"
					}}
				>
					<h3>
						Mission: <span style={titleStyle}>{mission_name}</span>
					</h3>
					<p>
						Date:{" "}
						{new Intl.DateTimeFormat("zh-CN", {
							year: "numeric",
							month: "numeric",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
							second: "numeric",
							hour12: false
						}).format(new Date(launch_date_local))}
					</p>
				</div>
				<div style={{ width: "20%", display: "inline-block" }}>
					<Link
						title="Launch Date"
						to={`/launch/${flight_number}`}
						style={{
							width: "100px",
							height: "30px",
							background: "darkgray",
							outline: "none",
							border: "none",
							padding: "8px 16px",
							textDecoration:'none'
						}}
					>
						Launch Date
					</Link>
				</div>
			</div>
		);
	}
}

export default LaunchItem;
