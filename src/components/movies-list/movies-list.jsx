import React from 'react';
import { connect } from 'react-redux';

import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import './movies-list.scss';

import { MovieCard } from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

// movies comes from MainView render as attribute
function MoviesList(props) {
	const { movies, visibilityFilter } = props;
	let filteredMovies = movies;

	if (visibilityFilter !== '') {
		filteredMovies = movies.filter((m) => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
	}

	if (!movies) return <div className="main-view" />;

	return (
		<div className="movies-list">
			<VisibilityFilterInput visibilityFilter={visibilityFilter} />
			<br />
			<Row className="justify-content-center mt-2">
				{filteredMovies.map((m) => (
					<Col>
						<MovieCard className="movie-card" key={m._id} movie={m} />
					</Col>
				))}
			</Row>
		</div>
	);
}

const mapStateToProps = (state) => {
	const { visibilityFilter } = state;
	return { visibilityFilter };
};

export default connect(mapStateToProps)(MoviesList);
