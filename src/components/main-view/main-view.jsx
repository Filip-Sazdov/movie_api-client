import React from 'react';
import axios from 'axios';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Col, Row } from 'react-bootstrap';

import './main-view.scss';

export class MainView extends React.Component {
	constructor() {
		super();

		this.state = {
			movies: null,
			selectedMovie: null,
			user: null,
			register: null,
		};
	}
	componentDidMount() {
		axios
			.get('https://movie-api-on-heroku.herokuapp.com/movies')
			.then((response) => {
				// Assign the result to the state
				this.setState({
					movies: response.data,
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie,
		});
	}
	onLoggedIn(user) {
		this.setState({
			user,
		});
	}
	onRegistration() {
		this.setState({ register: true });
	}

	onRegistrationCancel() {
		this.setState({ register: false });
	}

	render() {
		const { movies, selectedMovie, user, register } = this.state;

		if (register) return <RegistrationView onRegistrationCancel={() => this.onRegistrationCancel()} />;
		if (!user)
			return (
				<LoginView onLoggedIn={(user) => this.onLoggedIn(user)} onRegistrationClick={() => this.onRegistration()} />
			);

		// Before the movies have been loaded
		if (!movies) return <div className="main-view" />;

		return (
			<Row className="main-view justify-content-md-center">
				{selectedMovie ? (
					<Col md={8} style={{ border: '1px solid black' }}>
						<MovieView movie={selectedMovie} onBackClick={(movie) => this.onMovieClick(null)} />
					</Col>
				) : (
					movies.map((movie) => (
						<Col md={3}>
							<MovieCard key={movie._id} movie={movie} onClick={(movie) => this.onMovieClick(movie)} />
						</Col>
					))
				)}
			</Row>
		);
	}
}
