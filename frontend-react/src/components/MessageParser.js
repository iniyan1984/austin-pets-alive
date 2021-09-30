// MessageParser starter code
class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message) {
      console.log(this.state)
      fetch(`http://localhost:8000/chat/${this.state.dog_id}/${message}`)
      .then(resp => resp.json())
      .then(response => {
        this.actionProvider.helloWorldHandler(response.data)
      })
      
    }
  }
  
export default MessageParser;