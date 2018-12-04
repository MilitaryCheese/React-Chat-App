import { ChatManager, TokenProvider } from "@pusher/chatkit-client";
import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
const instanceLocator = "v1:us1:9e8a5612-9bd8-42fd-bdd6-4373248a8bd6";
const testToken =
  "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/9e8a5612-9bd8-42fd-bdd6-4373248a8bd6/token";
const username = "user1";
const roomId = "19478060";

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.sendMessage = this.sendMessage.bind(this);
    const messageHolder = [
      {
        messageId: "Person",
        messageContent: "Hello, whats up?"
      },
      {
        messageId: "Doggo",
        messageContent: "food"
      }
    ];
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: instanceLocator,
      userId: "jdoe",
      tokenProvider: new TokenProvider({
        url: testToken
      })
    });
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }

  sendMessage(messageValue) {
    this.currentUser.sendMessage({
      messageValue,
      roomId: roomId
    });
  }

  render() {
    return (
      <div>
        <Title />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <div>
        <h1>Asdf Sgdf Agcb</h1>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render(props) {
    return (
      <div>
        {this.props.messages.map(message => {
          return (
            <div>
              <p>
                {message.messageId} : {message.messageContent}
              </p>
            </div>
          );
        })}
      </div>
    );
  }
}

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.handleChanges = this.handleChanges.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChanges(e) {
    e.preventDefault();
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  }

  render() {
    return (
      <form>
        <input
          onSubmit={this.handleSubmit}
          onChange={this.handleChanges}
          value={this.state.message}
          placeholder="Type your message and hit Enter"
          type="text"
        />
        <button type="submit">Enter</button>
      </form>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ChatApp />, rootElement);
