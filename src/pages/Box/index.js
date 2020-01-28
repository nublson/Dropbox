import React, { useEffect, useState } from 'react'
import { MdInsertDriveFile } from 'react-icons/md'
import { formatDistance } from 'date-fns'
import pt from 'date-fns/locale/pt'
import Dropzone from 'react-dropzone'

import api from '../../services/api'

import logo from '../../assets/logo.svg'
import './styles.scss'

const Box = ({ match }) => {
	const [box, SetBox] = useState([])

	useEffect(() => {
		const getBox = async () => {
			const box = match.params.id
			const response = await api.get(`/boxes/${box}`)

			SetBox(response.data)
		}

		getBox()
	}, [match.params.id, box.files])

	function handleUpload(files) {
		files.forEach(file => {
			const data = new FormData()
			data.append('file', file)

			const box = match.params.id
			api.post(`/boxes/${box}/files`, data)
		})
	}

	return (
		<div id='box-container'>
			<header>
				<img src={logo} alt='Logo' />
				<h1>{box.title}</h1>
			</header>

			<Dropzone onDropAccepted={handleUpload}>
				{({ getRootProps, getInputProps }) => (
					<div className='upload' {...getRootProps()}>
						<input {...getInputProps()} />

						<p>Arrastar arquivos ou clique aqui.</p>
					</div>
				)}
			</Dropzone>

			<ul>
				{box.files &&
					box.files.map(file => (
						<li key={file._id}>
							<a
								className='fileInfo'
								href={file.url}
								target='_blank'
								rel='noopener noreferrer'
							>
								<MdInsertDriveFile size={24} color='#a5cfff' />
								<strong>{file.title}</strong>
							</a>

							<span>
								{' '}
								{formatDistance(
									new Date(file.createdAt),
									new Date(),
									{
										locale: pt,
										addSuffix: true
									}
								)}{' '}
							</span>
						</li>
					))}
			</ul>
		</div>
	)
}

export default Box
