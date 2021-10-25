import React, { Component } from 'react';
// import CardList from './CardList';
import Gallery from 'react-grid-gallery';
import "./DogInfo.css";
import DogProfile from './DogProfile'
import Similar from './Similar'
import { Link } from 'react-router-dom'

class DogInfo extends Component {
    constructor(props) {
        super();
        this.state = {
            id: props.location.state.id,
            name: props.location.state.name,
            sex: props.location.state.sex,
            photo_url: props.location.state.photo_url,
            breed: props.location.state.breed,
            color: props.location.state.color,
            weight: props.location.state.weight,
            dob: props.location.state.dob,
            memo: props.location.state.memo,
            dogs: [],
        }
    }
    componentDidMount() {
        fetch(`http://localhost:8000/dogs/${this.state.id}`)
            .then(response => response.json())
            .then(dogs => {
                this.setState({ dogs: dogs.data })
            })
    }

    render() {
        const { id, photo_url, name } = this.state;
        const images = [{ thumbnail: photo_url, src: photo_url }, { thumbnail: photo_url, src: photo_url }, { thumbnail: photo_url }]
        return (
            <div className='tc pa10'>
                <DogProfile info={this.state} />
                <div className='tc'>
                    {/* <Gallery images={images} /> */}
                </div>
                <div className="tc">
                    <h1>Similar Dogs</h1>
                    <Similar id={id} />
                </div>
                <Link to={{
                    pathname: "/chat",
                    state: {
                        id: id,
                        name: name
                    }
                    }}>
                <button onClick={() => window.open("localhost:3000/chat")}>Chat with {name}</button>
                </Link>
            </div>
        );
    }

}

export default DogInfo;