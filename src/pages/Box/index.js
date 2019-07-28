import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import en from 'date-fns/locale/en';

import './styles.css';
import logo2 from '../../assets/logo2.svg';

export default class Box extends Component {
	state = {
		box: {}
	};

	async componentDidMount() {
		const box = this.props.match.params.id;
		const response = await api.get(`box/${box}`);

		this.setState({ box: response.data });
	}

	render() {
		return (
			<div id="box-container">
				<header>
					<img src={logo2} alt="" />
					<h1>{this.state.box.title}</h1>
				</header>

				<ul>
					{this.state.box.files &&
						this.state.box.files.map(file => (
							<li>
								<a
									className="fileInfo"
									href={file.url}
									rel="noopener noreferrer"
									target="_blank">
									<MdInsertDriveFile size={24} color="#a5cfff" />
									<strong>{file.title}</strong>
								</a>

								<span>
									{distanceInWords(file.createdAt, new Date(), {
										locale: en
									})}{' '}
									ago
								</span>
							</li>
						))}
				</ul>
			</div>
		);
	}
}
