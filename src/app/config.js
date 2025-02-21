/*import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "Studbud",
  initialMessages: [
    createChatBotMessage(`Hello I can help you in preparing study plan and the course that fits you the best`)
  ]
}

export default config


// bot Avatar//
*/

/*import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "StudBud",
  initialMessages: [
    createChatBotMessage("Hi! I can help you create a study plan and find relevant courses. What do you need help with?")
  ],
  widgets: [
    {
      widgetName: "videoLink",
      widgetFunc: (props) => (
        <a href={props.payload} target="_blank" rel="noopener noreferrer">
          📺 Watch Video
        </a>
      )
    }
  ]
}; 

export default config;
*/
/*import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "StudBud",
  initialMessages: [
    createChatBotMessage("Hi! I can help you create a study plan and find relevant courses. What do you need help with?")
  ],
  widgets: [
    {
      widgetName: "videoLink",
      widgetFunc: (props) => (
        <a 
          href={props.payload} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: "black" }}
        >
          📺 Watch Video
        </a>
      )
    }
  ]
};

export default config;
*/

import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  botName: "StudBud",
  initialMessages: [
    createChatBotMessage("Hi! I can help you create a study plan and find relevant courses. What do you need help with?")
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: "#F2CC0D"
    },
    chatButton: {
      backgroundColor: "#F2CC0D"
    }
  },
  widgets: [
    {
      widgetName: "videoLink",
      widgetFunc: (props) => (
        <a 
          href={props.payload} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ color: "black" }}
        >
          📺 Watch Video
        </a>
      )
    }
  ]
};

export default config;