import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { setUser, setToken, setFavoriteMovies } from '../../actions/actions';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './profile-view.scss';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { Link } from 'react-router-dom';

import axios from 'axios';

export class ProfileView extends React.Component {
	formatDate(date) {
		if (date) date = date.substring(0, 10);
		return date;
	}

	removeFavorite(movie) {
		let token = localStorage.getItem('token');
		let url =
			'https://movie-api-on-heroku.herokuapp.com/users/' + localStorage.getItem('user') + '/Movies/' + movie._id;
		axios
			.delete(url, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				alert(movie.Title + ' has been removed');
				window.location.pathname = '/';
			});
	}

	handleDelete() {
		let token = localStorage.getItem('token');
		let user = localStorage.getItem('user');
		axios
			.delete(`https://movie-api-on-heroku.herokuapp.com/users/${user}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => {
				alert(user + ' has been deleted');
				localStorage.removeItem('user');
				localStorage.removeItem('token');
				window.location.pathname = '/';
			})
			.catch(function (error) {
				console.log(error);
			});
	}

	render() {
		const { movies, user, favoriteMovies } = this.props;
		const favoriteMovieList = movies.filter((movie) => {
			return favoriteMovies.includes(movie._id);
		});

		if (!movies) alert('Please sign in');
		return (
			<div className="userProfile" style={{ display: 'flex' }}>
				<Container>
					<Row>
						<Col>
							<Form style={{ width: '24rem', float: 'left' }}>
								<h1 className="pb-3" style={{ textAlign: 'center' }}>
									Profile Details
								</h1>
								<Form.Group controlId="formBasicUsername">
									<h3>Username: </h3>
									<Form.Label>{user.Username}</Form.Label>
								</Form.Group>
								<Form.Group controlId="formBasicEmail">
									<h3>Email:</h3>
									<Form.Label>{user.Email}</Form.Label>
								</Form.Group>
								<Form.Group controlId="formBasicDate">
									<h3>Date of Birth:</h3>
									<Form.Label>{this.formatDate(user.Birthday)}</Form.Label>
								</Form.Group>
								<Link to={`/update/${this.props.user}`}>
									<Button variant="outline-dark" type="link" size="sm" block>
										Edit Profile
									</Button>
								</Link>
								<Link to={`/`}>
									<Button variant="outline-dark" type="submit" size="sm" block>
										Back to Main
									</Button>
								</Link>
								<Button variant="outline-danger" size="sm" block onClick={() => this.handleDelete()}>
									Delete Account
								</Button>
							</Form>
						</Col>
						<Col>
							<div
								className="favoriteMovies"
								style={{
									margin: '0 auto',
									textAlign: 'center',
									width: '24rem',
								}}
							>
								<h1 className="pb-3">Favorite Movies</h1>
								{favoriteMovieList.map((movie) => {
									return (
										<div key={movie._id}>
											<Card style={{ width: '20em', margin: '1em auto' }}>
												<Card.Img variant="top" src={movie.ImagePath} />
												<Card.Body>
													<Link to={`/movies/${movie._id}`}>
														<Card.Title>{movie.Title}</Card.Title>
													</Link>
												</Card.Body>
											</Card>
											<Button onClick={() => this.removeFavorite(movie)}>Remove</Button>
										</div>
									);
								})}
							</div>
						</Col>
					</Row>
				</Container>
			</div>
		);
	}
}

// ProfileView.propTypes = {
// 	movies: PropTypes.array.isRequired,
// };

let mapStateToProps = (state) => {
	return {
		user: state.user,
		token: state.token,
		favoriteMovies: state.favoriteMovies,
	};
};
export default connect(mapStateToProps, { setUser, setToken, setFavoriteMovies })(ProfileView);
