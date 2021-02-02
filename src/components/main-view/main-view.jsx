import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { About } from '../shared-components/about/about';

import { setMovies, setUser, setToken, setFavoriteMovies } from '../../actions/actions';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { UpdateProfile } from '../update-profile/update-profile';
import MoviesList from '../movies-list/movies-list';

import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';

import './main-view.scss';

export class MainView extends React.Component {
	constructor() {
		super();

		this.state = {
			movies: [],
			// selectedMovie: null,
			user: null,
			// register: null,
		};
	}

	getMovies(token) {
		axios
			.get('https://movie-api-on-heroku.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				// Assign the result to the state
				// this.setState({
				// 	movies: response.data,
				// });
				this.props.setMovies(response.data);
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.props.setUser(localStorage.getItem('user'));
			// this.setState({
			// 	user: localStorage.getItem('user'),
			// });
			this.getMovies(accessToken);
		}
	}

	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie,
		});
	}
	onLoggedIn(authData) {
		// this.setState({
		// 	user: authData.user.Username,
		// });
		this.props.setUser(authData.user.Username);

		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
	}

	logOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.setState({ user: null });
	}
	onRegistration() {
		this.setState({ register: true });
	}

	onRegistrationCancel() {
		this.setState({ register: false });
	}

	render() {
		// const { movies, selectedMovie, user, register } = this.state;
		const { register } = this.state;
		let { movies } = this.props;
		let { user } = this.state;

		if (register) return <RegistrationView onRegistrationCancel={() => this.onRegistrationCancel()} />;

		// Before the movies have been loaded
		if (!movies) return <div className="main-view" />;

		return (
			<Router>
				<Navbar sticky="top" expand="lg" className="mb-2 navbar-styles">
					<Navbar.Brand className="navbar-brand">
						<Link to={`/`}>Movies API</Link>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
					<Navbar.Collapse className="justify-content-end navbar-light" id="basic-navbar-nav">
						{!user ? (
							<ul>
								<Link to={`/`}>
									<Button variant="link">login</Button>
								</Link>
								<Link to={`/register`}>
									<Button variant="link">Register</Button>
								</Link>
							</ul>
						) : (
							<ul>
								<Link to={`/`}>
									<Button variant="link" onClick={() => this.logOut()}>
										Log out
									</Button>
								</Link>
								<Link to={`/users/${user}`}>
									<Button variant="link">Account</Button>
								</Link>
								<Link to={`/`}>
									<Button variant="link">Movies</Button>
								</Link>
								<Link to={`/about`}>
									<Button variant="link">About</Button>
								</Link>
							</ul>
						)}
					</Navbar.Collapse>
				</Navbar>

				<div className="main-view">
					<Route
						exact
						path="/"
						render={() => {
							if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
							return <MoviesList movies={movies} />;
						}}
					/>
					<Route path="/register" render={() => <RegistrationView />} />
					<Route
						path="/movies/:movieId"
						render={({ match }) => <MovieView movie={movies.find((m) => m._id === match.params.movieId)} />}
					/>
					<Route
						path="/directors/:name"
						render={({ match }) => {
							return (
								<DirectorView director={movies.find((m) => m.Director.Name === match.params.name)} movies={movies} />
							);
						}}
					/>
					<Route
						path="/genres/:name"
						render={({ match }) => {
							if (!movies) return <div className="main-view" />;
							return <GenreView genre={movies.find((m) => m.Genre.Name === match.params.name)} movies={movies} />;
						}}
					/>
				</div>
				<Route path="/about" render={() => <About />} />
				<Route
					path="/users/:userId"
					render={() => <ProfileView movies={movies} user={user} favoriteMovies={this.props.favoriteMovies} />}
				/>

				<Route
					path="/update/:userId"
					render={() => {
						return <UpdateProfile user={user} token={this.props.token} />;
					}}
				/>
			</Router>
		);
	}
}

let mapStateToProps = (state) => {
	return {
		movies: state.movies,
		user: state.user,
		token: state.token,
		favoriteMovies: state.favoriteMovies,
	};
};

export default connect(mapStateToProps, { setMovies, setUser, setToken, setFavoriteMovies })(MainView);
