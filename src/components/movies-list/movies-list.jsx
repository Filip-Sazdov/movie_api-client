import React from 'react';
import { connect } from 'react-redux';

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
			{filteredMovies.map((m) => (
				<MovieCard key={m._id} movie={m} />
			))}
		</div>
	);
}

const mapStateToProps = (state) => {
	const { visibilityFilter } = state;
	return { visibilityFilter };
};

export default connect(mapStateToProps)(MoviesList);
