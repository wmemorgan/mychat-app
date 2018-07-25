import React, { Component } from 'react';
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageFrom from './components/SendMessageForm'
// import RoomList from './components/RoomList'
// import NewRoomForm from './components/NewRoomForm'

import { tokenUrl, instanceLocator } from './config'

class App extends Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: 'sysadmin',
      tokenProvider: new Chatkit.TokenProvider({
        url: tokenUrl
      })
    })

    chatManager.connect()
    .then(currentUser => {
      this.currentUser = currentUser
      this.currentUser.subscribeToRoom({
        roomId: 12406667,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
    })
  }

  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: 12406667
    })
  }

  render() {
    return (
      <div className="App">
        <MessageList messages={this.state.messages}/>
        <SendMessageFrom sendMessage={this.sendMessage}/>
      </div>
    );
  }
}

export default App;
