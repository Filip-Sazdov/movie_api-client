import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

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
				alert('no such user');
				console.log('no such user');
			});
	};

	return (
		<Form>
			<h3>Please Login</h3>
			<Form.Group>
				<Form.Label style={{ color: 'white' }}>Username</Form.Label>
				<Form.Control
					autoComplete="true"
					type="text"
					placeholder="Enter username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</Form.Group>

			<Form.Group>
				<Form.Label style={{ color: 'white' }}>Password</Form.Label>
				<Form.Control
					autoComplete="true"
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

				<Link to={`/register`}>
					<Button size="lg" block variant="primary" type="button">
						Register
					</Button>
				</Link>
			</Form.Group>
		</Form>
	);
}
