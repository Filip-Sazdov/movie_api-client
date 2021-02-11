import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
	render() {
		const { movie } = this.props;

		return (
			<Card style={{ width: '16em', margin: '1em auto' }}>
				<Card.Img variant="top" src={movie.ImagePath} />
				<Card.Body>
					<Card.Title style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
						{movie.Title}
					</Card.Title>
					<Card.Text style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
						{movie.Description}
					</Card.Text>
					<Link to={`/movies/${movie._id}`}>
						<Button className="pl-0" variant="link">
							Open
						</Button>
					</Link>
				</Card.Body>
			</Card>
		);
	}
}

MovieCard.propTypes = {
	movie: PropTypes.shape({
		Title: PropTypes.string,
	}).isRequired,
	// onClick: PropTypes.func.isRequired,
};
