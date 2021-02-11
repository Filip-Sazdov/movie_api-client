import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import './director-view.scss';

export class DirectorView extends React.Component {
	constructor() {
		super();

		this.state = {};
	}

	render() {
		const { movies, director } = this.props;

		if (!director) return null;

		return (
			<Container className="director-container wrapper container-fluid">
				<Row>
					<Col className="col-2" />
					<Col className="director-view container-fluid align-items-center col">
						<img className="director-poster" src="https://via.placeholder.com/250" />
						<div className="director-title info-section">
							<span className="label">Name: </span>
							<span className="value">{director.Director.Name}</span>
						</div>
						<div className="director-bio info-section">
							<span className="label">Bio: </span>
							<span className="value">{director.Director.Bio}</span>
						</div>
						<div className="director-birth info-section">
							<span className="label">Born: </span>
							<span className="value">{director.Director.Birth}</span>
						</div>
						<div className="director-death info-section">
							<span className="label">Died: </span>
							<span className="value">{director.Director.Death}</span>
						</div>
						<Link to={`/`}>
							<Button className="pl-0" variant="link">
								Return
							</Button>
						</Link>
					</Col>
					<Col className="col-2" />
				</Row>
				<Container>
					<h4 className="py-4 mb-0">Other {director.Director.Name} Movies</h4>
					<div className="d-flex row mt-3 mx-1">
						{movies.map((movie) => {
							if (movie.Director.Name === director.Director.Name) {
								return (
									<div key={movie._id}>
										<Card className="mb-3 mr-2 h-100" style={{ width: '16rem' }}>
											<Card.Img variant="top" src={movie.ImagePath} />
											<Card.Body>
												<Link className="text-muted" to={`/movies/${movie._id}`}>
													<Card.Title>{movie.Title}</Card.Title>
												</Link>
												<Card.Text>{movie.Description.substring(0, 90)}...</Card.Text>
											</Card.Body>
											<Card.Footer className="bg-white border-top-0">
												<Link to={`/movies/${movie._id}`}>
													<Button variant="link" className="read-more-link pl-0">
														Read more
													</Button>
												</Link>
											</Card.Footer>
										</Card>
									</div>
								);
							}
						})}
					</div>
				</Container>
			</Container>
		);
	}
}

DirectorView.propTypes = {
	Movie: PropTypes.shape({
		Director: {
			Name: PropTypes.string.isRequired,
			Bio: PropTypes.string.isRequired,
			Birth: PropTypes.string.isRequired,
		},
	}),
};
