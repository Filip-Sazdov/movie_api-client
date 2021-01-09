import React, { Component } from 'react';

export default class movieView extends Component {
	render() {
		return (
			<div>
				<img src="{this.state.ImagePath}" alt="movie poster"></img>
				<h3>Title: {this.state.title}</h3>
				<h3>Description: {this.state.description}</h3>
			</div>
		);
	}
}
