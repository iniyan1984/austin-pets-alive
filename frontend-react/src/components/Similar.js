import React, { Component } from 'react'
import CardList from './CardList'

class Similar extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.id,
            dogs: []
        }
    }

    componentDidMount() {
        fetch(`http://localhost:8000/dogs/similar/${this.state.id}`)
        .then(response => response.json())
        .then(dogs => {
            this.setState({ dogs: dogs.data})
        })
    }
    render() {
        return (
            <div className="tc">
                <CardList dogs={this.state.dogs} />
            </div>
        );
    };
}

export default Similar;