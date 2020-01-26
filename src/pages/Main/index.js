import React from 'react'
import { Formik, Field, Form } from 'formik'

import api from '../../services/api'

import './styles.scss'
import logo from '../../assets/logo.svg'

const Main = ({ history }) => {
	return (
		<div id='main-container'>
			<Formik
				initialValues={{ title: '' }}
				onSubmit={async ({ title }, action) => {
					const response = await api.post('/boxes', { title })
					const { _id } = response.data

					history.push(`Box/${_id}`)

					action.resetForm()
				}}
			>
				{props => (
					<Form>
						<img src={logo} alt='Logo' />
						<Field
							type='text'
							name='title'
							placeholder='Create a box...'
						/>
						<button type='submit'>Create</button>
					</Form>
				)}
			</Formik>
		</div>
	)
}

export default Main
