import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import api from '../../services/api';
import { distanceInWords } from 'date-fns';
import en from 'date-fns/locale/en';

import Dropzone from 'react-dropzone';
import socket from 'socket.io-client';

import './styles.css';
import logo2 from '../../assets/logo2.svg';

export default class Box extends Component {
	state = {
		box: {}
	};

	async componentDidMount() {
		this.subscribeToNewFiles();

		const box = this.props.match.params.id;
		const response = await api.get(`box/${box}`);

		this.setState({ box: response.data });
	}

	subscribeToNewFiles = () => {
		const box = this.props.match.params.id;
		const io = socket('https://dropboxclonethenletter.herokuapp.com');

		io.emit('connectRoom', box);

		io.on('file', data => {
			this.setState({
				box: { ...this.state.box, files: [data, ...this.state.box.files] }
			});
		});
	};

	handleUpload = files => {
		files.forEach(file => {
			const data = new FormData();
			const box = this.props.match.params.id;

			data.append('file', file);

			api.post(`box/${box}/files`, data);
		});
	};

	handleReturn = () => {
		this.props.history.push('/');
	};

	render() {
		return (
			<div id="box-container">
				<header>
					<img onClick={this.handleReturn} src={logo2} alt="" />
					<h1>{this.state.box.title}</h1>
				</header>

				<Dropzone onDropAccepted={this.handleUpload}>
					{({ getRootProps, getInputProps }) => (
						<div className="upload" {...getRootProps()}>
							<input {...getInputProps()} />

							<p>Drag files or click here</p>
						</div>
					)}
				</Dropzone>

				<ul>
					{this.state.box.files &&
						this.state.box.files.map(file => (
							<li key={file._id}>
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
