import React from 'react'
import { Formik, Field, Form } from 'formik'

import './styles.scss'
import logo from '../../assets/logo.svg'

const Main = () => {
	return (
		<div id='main-container'>
			<Formik initialValues={{ title: '' }} onSubmit={() => {}}>
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
