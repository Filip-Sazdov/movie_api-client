import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { About } from '../shared-components/about/about';

import { setMovies, setUser, setToken, setFavoriteMovies } from '../../actions/actions';

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
	getMovies(token) {
		axios
			.get('https://movie-api-on-heroku.herokuapp.com/movies', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.props.setMovies(response.data);
				// console.log(response.data); getting movies object, it works
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	getUser(token) {
		let url = 'https://movie-api-on-heroku.herokuapp.com/users/' + localStorage.getItem('user');
		axios
			.get(url, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				this.props.setUser(response.data);
				this.props.setFavoriteMovies(response.data.FavoriteMovies);
			});
	}

	componentDidMount() {
		let accessToken = localStorage.getItem('token');
		if (accessToken !== null) {
			this.props.setUser(localStorage.getItem('user'));

			this.getMovies(accessToken);
			this.getUser(accessToken);
		}
	}

	onMovieClick(movie) {
		this.setState({
			selectedMovie: movie,
		});
	}
	onLoggedIn(authData) {
		this.props.setUser(authData.user);
		localStorage.setItem('token', authData.token);
		localStorage.setItem('user', authData.user.Username);
		this.getMovies(authData.token);
		this.getUser(authData.token);
	}

	logOut() {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.props.setUser(null);
	}

	render() {
		const { user, movies, favoriteMovies } = this.props;

		// Before the movies have been loaded
		if (!movies) return <div className="main-view" />;

		return (
			<Router>
				<Navbar expand="lg" className="py-3 navbar-styles">
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
							<ul className="m-0 p-0">
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
					render={() => <ProfileView movies={movies} user={user} favoriteMovies={favoriteMovies} />}
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
