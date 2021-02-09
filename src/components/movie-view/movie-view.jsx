import React from 'react';
import './movie-view.scss';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export class MovieView extends React.Component {
	addFavorite(movie) {
		let token = localStorage.getItem('token');
		let user = localStorage.getItem('user');
		let url = 'https://movie-api-on-heroku.herokuapp.com/users/' + user + '/Movies/' + movie._id;

		axios
			.post(url, '', {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((response) => {
				window.open('/users/' + user, '_self');
				alert('Added to favorites!');
			});
	}

	render() {
		const { movie } = this.props;

		if (!movie) return null;

		return (
			<div className="movie-view">
				<img className="movie-poster" src={movie.ImagePath} />
				<div className="movie-title">
					<span className="label">Title: </span>
					<span className="value">{movie.Title}</span>
				</div>
				<div className="movie-description">
					<span className="label">Description: </span>
					<span className="value">{movie.Description}</span>
				</div>

				<div className="movie-genre">
					<span className="label">Genre: </span>
					<span className="value">{movie.Genre.Name}</span>
				</div>
				<div className="movie-director">
					<span className="label">Director: </span>
					<span className="value">{movie.Director.Name}</span>
				</div>

				<Link to={`/directors/${movie.Director.Name}`}>
					<Button variant="link">Director</Button>
				</Link>

				<Link to={`/genres/${movie.Genre.Name}`}>
					<Button variant="link">Genre</Button>
				</Link>
				<Link to={`/`}>
					<Button variant="link">Return</Button>
				</Link>
				<Button variant="primary" size="sm" onClick={() => this.addFavorite(movie)}>
					Add to Favorites
				</Button>
			</div>
		);
	}
}
