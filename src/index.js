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
      messages: messageHolder
    };
  }

  render() {
    return (
      <div>
        <Title />
        <MessageList messages={this.state.messages} />
        <SendMessageForm />
      </div>
    );
  }
}

class Title extends React.Component {
  render() {
    return (
      <div>
        <h1>Chat app</h1>
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
  }
  handleChanges(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit() {}
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
      </form>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<ChatApp />, rootElement);
