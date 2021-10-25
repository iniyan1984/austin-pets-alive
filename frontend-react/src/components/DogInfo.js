import React, { Component } from 'react';
// import CardList from './CardList';
import { useState } from 'react';
import Gallery from 'react-grid-gallery';
import "./DogInfo.css";
import DogProfile from './DogProfile'
import Similar from './Similar'
import { Link } from 'react-router-dom'

import ChatBot from './ChatBot'
import Fade from "react-reveal/Fade";
import Flip from "react-reveal/Flip";
import { useLocation } from 'react-router';
import "./styles.css";

// class DogInfo extends Component {
//     constructor(props) {
//         super();
//         this.state = {
//             id: props.location.state.id,
//             name: props.location.state.name,
//             sex: props.location.state.sex,
//             photo_url: props.location.state.photo_url,
//             breed: props.location.state.breed,
//             color: props.location.state.color,
//             weight: props.location.state.weight,
//             dob: props.location.state.dob,
//             memo: props.location.state.memo,
//             dogs: [],
//         }
//     }
//     // componentDidMount() {
//     //     fetch(`http://localhost:8000/dogs/${this.state.id}`)
//     //         .then(response => response.json())
//     //         .then(dogs => {
//     //             this.setState({ dogs: dogs.data })
//     //         })
//     // }

//     render() {
//         // const [showBot, toggleBot] = useState(false);

//         console.log("Testing")
//         // console.log(toggleBot) 
//         const { id, photo_url, name } = this.state;
//         const images = [{ thumbnail: photo_url, src: photo_url }, { thumbnail: photo_url, src: photo_url }, { thumbnail: photo_url }]
//         return (
//             <div className='tc pa10'>
//                 <DogProfile info={this.state} />
//                 <div className='tc'>
//                     {/* <Gallery images={images} /> */}
//                 </div>
//                 <div className="tc">
//                     <h1>Similar Dogs</h1>
//                     <Similar id={id} />
//                 </div>
//                 <Link to={{
//                     pathname: "/chat",
//                     state: {
//                         id: id,
//                         name: name
//                     }
//                     }}>
//                 <button>Chat with {name}</button>
//                 </Link>
//             </div>
//         );
//     }

// }

{/* <DogProfile info={this.state} />
<div className='tc'>
    {/* <Gallery images={images} /> */}
// </div>
// <div className="tc">
//     <h1>Similar Dogs</h1>
//     <Similar id={id} />
// </div> */}

export default function DogInfo(props) {
    const [showBot, toggleBot] = useState(false);
    const { id, name, sex, photo_url, weight, color, dob, breed, memo } = useLocation().state;
    const state = {
    id: id,
    name: name,
    sex: props.location.state.sex,
    photo_url: photo_url,
    breed: breed,
    color: color,
    weight: weight,
    dob: dob,
    memo: memo,
        }
    return (
      <div className="App">
          <DogProfile info={state} />
            <div className='tc'>
                {/* <Gallery images={images} /> */}
            </div>
            <div className="tc">
                <h1>Similar Dogs</h1>
                <Similar id={id} />
            </div>

        {showBot && (
          <Fade big>
            <div className="app-chatbot-container">
              <ChatBot
              />
            </div>
          </Fade>
        )}
        <Flip left cascade>
          <button
            className="app-chatbot-button"
            onClick={() => toggleBot((prev) => !prev)}
          >
            <div>Bot</div>
            <svg viewBox="0 0 640 512" className="app-chatbot-button-icon">
              <path d="M192,408h64V360H192ZM576,192H544a95.99975,95.99975,0,0,0-96-96H344V24a24,24,0,0,0-48,0V96H192a95.99975,95.99975,0,0,0-96,96H64a47.99987,47.99987,0,0,0-48,48V368a47.99987,47.99987,0,0,0,48,48H96a95.99975,95.99975,0,0,0,96,96H448a95.99975,95.99975,0,0,0,96-96h32a47.99987,47.99987,0,0,0,48-48V240A47.99987,47.99987,0,0,0,576,192ZM96,368H64V240H96Zm400,48a48.14061,48.14061,0,0,1-48,48H192a48.14061,48.14061,0,0,1-48-48V192a47.99987,47.99987,0,0,1,48-48H448a47.99987,47.99987,0,0,1,48,48Zm80-48H544V240h32ZM240,208a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,240,208Zm160,0a48,48,0,1,0,48,48A47.99612,47.99612,0,0,0,400,208ZM384,408h64V360H384Zm-96,0h64V360H288Z"></path>
            </svg>
          </button>
        </Flip>
      </div>
    );
  }
  

// export default DogInfo;