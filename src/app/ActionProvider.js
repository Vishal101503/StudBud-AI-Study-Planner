/*import OpenAI from "openai"
const openAI = new OpenAI({
    apiKey: 'e698f48a632d43ed8a28825a9b9f4b29',
    baseURL: "https://api.aimlapi.com",
    dangerouslyAllowBrowser: true
})
/*class ActionProvider {
    createChatBotMessage
    setState
    createClientMessage
    stateRef
    createCustomMessage
    
    constructor(
      createChatBotMessage,
      setStateFunc,
      createClientMessage,
      stateRef,
      createCustomMessage,
      ...rest
    ) {
        
      this.createChatBotMessage = createChatBotMessage
      this.setState = setStateFunc
      this.createClientMessage = createClientMessage
      this.stateRef = stateRef
      this.createCustomMessage = createCustomMessage
    }

    callGenAI = async (prompt) => {
        const chatCompletion = await openAI.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {role:"system", content: "Studbud-You are an AI study planner which offers links and courses for the prompt"},
                {role: "user", content: prompt}
            ],
            temperature: 0.5,
            max_tokens: 50
        });
        return chatCompletion.choices[0].message.content
    }

    timer = ms => new Promise(res => setTimeout(res, ms));
    
    generateResponseMessages = async (userMessage)  => {
        const responseFromGPT = await this.callGenAI(userMessage);
        let message;
        let numberOfLines = responseFromGPT.split("\n").length;
        for(let i=0; i<numberOfLines; i++){
            const msg = responseFromGPT.split("\n")[i];
            if(msg.length){
                console.log('KW101',msg)
                message = this.createChatBotMessage(msg);
                this.updateChatbotState(message);
            }
            await this.timer(1000);
        }
    }

    respond = (message) => {
        this.generateResponseMessages(message)
    }

    updateChatbotState = (message) => {
        this.setState(prevState => ({
            ...prevState, messages: [...prevState.messages, message]
        }))
    }

  }


  
  export default ActionProvider;


class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    respond = (message) => {
      let response = "";
      let videoLink = "";
  
      if (message.toLowerCase().includes("python")) {
        response = "Here's a great Python course:";
        videoLink = "https://www.udemy.com/course/python-for-beginners/";
      } else if (message.toLowerCase().includes("machine learning")) {
        response = "Check out this Machine Learning course:";
        videoLink = "https://www.coursera.org/specializations/machine-learning";
      } else {
        response = "I can help with study planning! What do you need help with?";
      }
  
      const botMessage = this.createChatBotMessage(response);
      const videoMessage = videoLink
        ? this.createChatBotMessage("Click below:", { widget: "videoLink", payload: videoLink })
        : null;
  
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage, ...(videoMessage ? [videoMessage] : [])]
      }));
    };
  }
  
  export default ActionProvider; 
  
  
import OpenAI from "openai";

const openAI = new OpenAI({
    apiKey: "e698f48a632d43ed8a28825a9b9f4b29",
    baseURL: "https://api.aimlapi.com",
    dangerouslyAllowBrowser: true
});

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    respond = async (message) => {
        let response = "";
        let videoLink = "";

        // 📚 Expanded Course List
        const courses = {
            "python": { 
                text: "Here's a great Python course:", 
                link: "https://www.udemy.com/course/python-for-beginners/"
            },
            "machine learning": { 
                text: "Check out this Machine Learning course:", 
                link: "https://www.coursera.org/specializations/machine-learning"
            },
            "data science": { 
                text: "This Data Science course might help you:", 
                link: "https://www.udacity.com/course/data-scientist-nanodegree--nd025"
            },
            "web development": { 
                text: "Here’s a Web Development course for you:", 
                link: "https://www.udemy.com/course/the-complete-web-development-bootcamp/"
            },
            "cyber security": { 
                text: "Learn Cyber Security with this course:", 
                link: "https://www.coursera.org/specializations/intro-cyber-security"
            },
            "ui ux": { 
                text: "Check out this UI/UX Design course:", 
                link: "https://www.udemy.com/course/ux-design-fundamentals/"
            }
        };

        // 📌 Check for course recommendations
        for (let key in courses) {
            if (message.toLowerCase().includes(key)) {
                response = courses[key].text;
                videoLink = courses[key].link;
                break;
            }
        }

        // 🎯 If no matching course, fetch response from OpenAI API
        if (!response) {
            try {
                const aiResponse = await openAI.completions.create({
                    model: "text-davinci-003",
                    prompt: `Respond to this message in an informative and engaging way: "${message}"`,
                    max_tokens: 100
                });

                response = aiResponse.choices[0].text.trim();
            } catch (error) {
                console.error("Error fetching AI response:", error);
                response = "Sorry, I couldn't process your request at the moment.";
            }
        }

        // 📩 Send messages to chatbot UI
        const botMessage = this.createChatBotMessage(response);
        const videoMessage = videoLink
            ? this.createChatBotMessage("Click below to access the course:", { widget: "videoLink", payload: videoLink })
            : null;

        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage, ...(videoMessage ? [videoMessage] : [])]
        }));
    };
}

export default ActionProvider;
*/

import axios from "axios";

const GEMINI_API_KEY = "AIzaSyDOtD-0q_yrxGaV6H23DtBQ7DZVN7jrkUA"; // Move to .env later

class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
    }

    respond = async (message) => {
        let response = "Sorry, I couldn't find an answer. Please try again.";
        let videoLink = "";

        try {
            // Call Gemini API to generate a response
            const apiResponse = await axios.post(
                `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
                {
                    contents: [{ role: "user", parts: [{ text: message }] }]
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (apiResponse.data?.candidates?.length > 0) {
                response = apiResponse.data.candidates[0].content.parts[0].text || "I couldn't generate a response.";
            }

            // If user asks for a video, fetch only video links
            if (message.toLowerCase().includes("video") || message.toLowerCase().includes("course")) {
                const videoApiResponse = await axios.post(
                    `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
                    {
                        contents: [{ role: "user", parts: [{ text: `Find a high-quality educational video link for: ${message}. Return only the video URL without additional text.` }] }]
                    },
                    {
                        headers: { "Content-Type": "application/json" }
                    }
                );

                if (videoApiResponse.data?.candidates?.length > 0) {
                    let videoText = videoApiResponse.data.candidates[0].content.parts[0].text || "";

                    // Extract video link from text response (Basic Regex)
                    const urlRegex = /(https?:\/\/[^\s]+)/g;
                    const links = videoText.match(urlRegex);

                    if (links && links.length > 0) {
                        videoLink = links[0]; // Take the first valid link
                    } else {
                        videoLink = "No valid video link found.";
                    }
                }
            }

        } catch (error) {
            console.error("Error fetching response from Gemini:", error);
            response = "I'm facing issues retrieving data. Please try again later.";
        }

        // Create chatbot messages
        const botMessage = this.createChatBotMessage(response);
        const videoMessage = videoLink.startsWith("http")
            ? this.createChatBotMessage("Here's a useful video:", { widget: "videoLink", payload: videoLink })
            : null;

        // Update chatbot state
        this.setState((prev) => ({
            ...prev,
            messages: [...prev.messages, botMessage, ...(videoMessage ? [videoMessage] : [])]
        }));
    };
}

export default ActionProvider;
