import React, { Component } from 'react';
import axios from 'axios';
import CardList from './CardList'
import "./ImageSearch.css"

class ImageSearch extends Component {
    constructor() {
        super();
        this.state = {
            image: null,
            dogs: []
          };
    }


  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  };

  handleImageChange = (e) => {
    this.setState({
      image: e.target.files[0]
    })
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    let form_data = new FormData();
    form_data.append('file', this.state.image);
    let url = 'http://localhost:8000/file';
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
        .then(res => {
          this.setState({ dogs: res.data.data});
        })
        .catch(err => console.log(err))
  };

  render() {
    return (
      <div className="App">
          <h2 className="f2">Image Search</h2>
        <form onSubmit={this.handleSubmit}>
          {/* <p>
            <input type="text" placeholder='Title' id='title' value={this.state.title} onChange={this.handleChange} required/>
          </p>
          <p>
            <input type="text" placeholder='Content' id='content' value={this.state.content} onChange={this.handleChange} required/>

          </p> */}
          <p>
          <div class="upload-btn-wrapper">
            <button class="btn">Upload an image</button>
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>

          </div>
          </p>
          <button type="submit" class="btn">Search</button>
        </form>
        {console.log("length", this.state.dogs.length)}
        <CardList dogs={this.state.dogs} />
      </div>
    );
  }
}

export default ImageSearch;
