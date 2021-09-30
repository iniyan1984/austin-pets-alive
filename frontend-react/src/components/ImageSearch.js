// import React, { Component } from 'react';
// import axios from 'axios';

// class ImageSearch extends Component {
//     state = {
//         image: null,
//         dogs: []
//     };

//     handleImageChange = (event) => {
//         this.setState({
//             image: event.target.files[0]
//         })
//     };

//     handleSubmit = (event) => {
//         event.preventDefault();
//         let form_data = new FormData();
//         form_data.append('file', this.state.image);
//         let url = "https://localhost:8000/file";
//         axios.post(url, form_data, {
//             headers: {
//                 'content-type': 'multipart/form-data'
//             }
//         })
//         .then(res => {
//             this.setState({ dogs: res.data });
//             console.log(this.state.dogs)
//         })
//         .catch(err => console.log(err))
//     };

//     render() {
//         return (
//             <div className="App">
//                 <form onSubmit={this.handleSubmit}>
//                 <p>
//                 <input type="file"
//                     id="image"
//                     accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
//                 </p>
//                 <input type="submit"/>
//                 </form>
//             </div>
//         );
//     }

// }

// export default ImageSearch;

import React, { Component } from 'react';
import axios from 'axios';
import CardList from './CardList'

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
          console.log(this.state.dogs.data);
        })
        .catch(err => console.log(err))
  };

  render() {
      console.log(this.state.dogs);
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
            <input type="file"
                   id="image"
                   accept="image/png, image/jpeg"  onChange={this.handleImageChange} required/>
          </p>
          <input type="submit"/>
        </form>
        {console.log("length", this.state.dogs.length)}
        <CardList dogs={this.state.dogs} />
      </div>
    );
  }
}

export default ImageSearch;
