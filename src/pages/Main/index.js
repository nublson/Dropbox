import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';
/* import logo from '../../assets/logo.svg'; */
import logo2 from '../../assets/logo2.svg';

export default class Main extends Component {
	state = {
		newBox: ''
	};

	handleSubmit = async e => {
		e.preventDefault();
		const response = await api.post('box', {
			title: this.state.newBox
		});

		this.props.history.push(`/box/${response.data._id}`);
	};

	handleInputChange = e => {
		this.setState({ newBox: e.target.value });
	};

	render() {
		return (
			<div id="main-container">
				<form onSubmit={this.handleSubmit}>
					<img src={logo2} alt="" />
					<input
						placeholder="Create a box"
						value={this.state.newBox}
						onChange={this.handleInputChange}
					/>
					<button type="submit">Create</button>
				</form>
			</div>
		);
	}
}
