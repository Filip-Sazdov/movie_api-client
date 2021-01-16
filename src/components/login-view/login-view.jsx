import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(username, password);
		/* Send a request to the server for authentication */
		/* then call props.onLoggedIn(username) */
		props.onLoggedIn(username);
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
			<Button variant="primary" type="button" onClick={handleSubmit}>
				Submit
			</Button>
		</Form>
	);
}
