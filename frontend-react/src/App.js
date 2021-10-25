import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import 'tachyons'
import SearchBox from './components/SearchBox'
import CardList from './components/CardList'
import DogInfo from './components/DogInfo'
import ImageSearch from './components/ImageSearch'
import ChatBot from './components/ChatBot'
import { Link } from 'react-router-dom'


// import { dogs } from './dogs'

class App extends Component {
  constructor() {
    super();
    this.state = {
      dogs: [],
      searchField: '',
      total_dogs: 10
    }
  }

  componentDidMount() {
    fetch(`http://localhost:8000/dogs/${this.state.total_dogs}`)
    .then(response => response.json())
    .then(results => {
      this.setState({ dogs: results })
    })
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value })
  }

  onClick = () => {
    this.setState({ total_dogs: this.state.total_dogs + 10})
    this.componentDidMount()
  }

  render() {
    const filterDogs = this.state.dogs.filter(dog => {
      return dog.tags.toLowerCase().includes(this.state.searchField.toLowerCase())
    })

    return (
      <Router>
        <Switch>
          <div className="tc ma5">
            <h1 className="f1">Homeless Pet Network</h1>

            <Route exact path="/">
              <SearchBox searchChange={this.onSearchChange} />
              <Link to="/image-search">
                <button class="image-search-btn">Image Search</button>
              </Link>
              <CardList dogs={filterDogs} />
              <button onClick={this.onClick}>Load More</button>
            </Route>
            <Route path="/dog-info/:id" component={DogInfo} />
            <Route path="/image-search" component={ImageSearch} />
            <Route exact path="/chat">
              <ChatBot />
            </Route>
          </div>
        </Switch>
      </Router>
    )
  }
}

export default App;
