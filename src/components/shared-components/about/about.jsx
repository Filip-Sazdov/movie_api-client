import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

export class About extends React.Component {
	render() {
		return (
			<div style={{ display: 'flex', justifyContent: 'center' }}>
				<Card style={{ width: '400px' }}>
					<Card.Img variant="top" src={'../../img/portrait_square.jpg'} />
					<Card.Body>
						<Card.Title></Card.Title>
						<Card.Text>
							Hi. I'm Filip, an aspiring web developer looking to expand my programming skills and knowledge. My goal is
							to build projects, make some money and have fun while doing it. This is my portfolio webpage. Please feel
							free to navigate the links and check out my work or contact me.
						</Card.Text>
					</Card.Body>
				</Card>
			</div>
		);
	}
}
