import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

import './login-view.scss';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		/* Send a request to the server for authentication */
		axios
			.post('https://movie-api-on-heroku.herokuapp.com/login', {
				Username: username,
				Password: password,
			})
			.then((response) => {
				const data = response.data;
				props.onLoggedIn(data);
			})
			.catch((e) => {
				console.log('no such user');
			});
	};

	return (
		<Form>
			<h3>Please Login</h3>
			<Form.Group>
				<Form.Label>Username</Form.Label>
				<Form.Control
					type="text"
					placeholder="Enter username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>
			<Form.Group>
				<Button size="lg" block variant="primary" type="button" onClick={handleSubmit}>
					Submit
				</Button>
				<Button size="lg" block variant="primary" type="button" onClick={props.onRegistrationClick}>
					Register
				</Button>
			</Form.Group>
		</Form>
	);
}
