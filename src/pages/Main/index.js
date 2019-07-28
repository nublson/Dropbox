import React, { Component } from 'react';

import './styles.css';
import logo from '../../assets/logo.svg';
import logo2 from '../../assets/logo2.svg';

export default class Main extends Component {
	render() {
		return (
			<div id="main-container">
				<form>
					<img src={logo2} alt="" />
					<input placeholder="Create a box" />
					<button type="submit">Create</button>
				</form>
			</div>
		);
	}
}
