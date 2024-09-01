const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const chatboxInput = document.querySelector('.chatbox-input');
const conversationContainer = document.querySelector('.conversation-container');
const sendBtn = document.querySelector('.send-btn');


const API_KEY = "AIzaSyBmukY8-NOfBELkYXQ4ZXXNotBBwPItLIo";  // Replace with your actual API key
const apiEndpoint = `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${API_KEY}`;



let conversation = [];

// Function to handle speech synthesis
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    utterance.volume = 1;
    utterance.pitch = 1; // corrected pitch value (range: 0 to 2)
    window.speechSynthesis.speak(utterance);
}

// Function to greet based on the time of day
function wishMe() {
    const hour = new Date().getHours();
    if (hour < 12) {
        speak("Good Morning!");
    } else if (hour < 17) {
        speak("Good Afternoon!");
    } else {
        speak("Good Evening!");
    }
}

// Initialize the assistant
window.addEventListener('load', () => {
    speak("Initializing ROXX...");
    wishMe();
});

// Speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    content.textContent = transcript;
    takeCommand(transcript);
};

// Start listening when button is clicked
btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

// Handle input from chatbox
function handleUserInput() {
    const userInput = chatboxInput.value.trim();
    if (userInput !== '') {
        conversation.push({ user: userInput });
        const aiResponse = getaiResponse(userInput);
        conversation.push({ roxx: aiResponse });
        updateConversationContainer();
        chatboxInput.value = '';
    }
}
const generateAPIResponse = async () => {
    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: "Hello" }]

                }]
            })

        });
        const data = await response.json();
        console.log("Response", data)
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log("Message :", text);


    } catch (error) {
        console.log(error);
    }
}

// Update the conversation container
function updateConversationContainer() {
    conversationContainer.innerHTML = '';
    conversation.forEach(message => {
        const messageElement = document.createElement('p');
        if (message.user) {
            messageElement.innerHTML = `<strong>USER:</strong> ${message.user}`;
        } else if (message.roxx) {
            messageElement.innerHTML = `<strong>ROXX:</strong> ${message.roxx}`;
        }
        conversationContainer.appendChild(messageElement);
    });
    generateAPIResponse();
}

// Get AI response ai
function getaiResponse(userInput) {
    const userInputLowercase = userInput.toLowerCase();

    if (userInputLowercase.includes("hello") || userInputLowercase.includes("hi")) {
        return "Hello! It's nice to meet you.";
    } else if (userInputLowercase.includes("how are you")) {
        return "I'm doing well, thanks! How can I assist you today?";
    }
    else if (userInputLowercase.includes("whatapp")) {
        window.open("https://web.whatsapp.com/", "_blank");
        return "Opening whatapp...";
    }
    else if (userInputLowercase.includes("github")) {
        window.open("https://github.com/login", "_blank");
        return "Opening github...";
    }
    else if (userInputLowercase.includes("instagram")) {
        window.open("https://www.instagram.com/", "_blank");
        return "Opening instagram...";
    }
    else if (userInputLowercase.includes("linkedin")) {
        window.open("https://www.linkedin.com/", "_blank");
        return "Opening linkedin...";
    }
    else if (userInputLowercase.includes("portfolio")) {
        window.open("https://itzenoughabhi.me/", "_blank");
        return "Opening portfolio...";
    }
    else if (userInputLowercase.includes("facebook,")) {
        window.open("https://www.facebook.com/", "_blank");
        return "Opening facebook...";
    }
    else if (userInputLowercase.includes("flipkart")) {
        window.open("https://flipkart.com", "_blank");
        return "Opening flipkart...";
    }
    else if (userInputLowercase.includes("amazon")) {
        window.open("https://amazon.com", "_blank");
        return "Opening amazon...";
    }
    else if (userInputLowercase.includes("google")) {
        window.open("https://google.com", "_blank");
        return "Opening google...";
    }
    else if (userInputLowercase.includes("youtube")) {
        window.open("https://youtube.com", "_blank");
        return "Opening YouTube...";
    }

    else {
        return "I'm not sure how to respond to that. Could you please clarify?";
    }

}

// Take command
function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello! How can I assist you today?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening YouTube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(message)}`, "_blank");
        speak("Searching the web for " + message);
    } else if (message.includes('wikipedia')) {
        const query = message.replace("wikipedia", "").trim();
        window.open(`https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`, "_blank");
        speak("Searching Wikipedia for " + query);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleTimeString();
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('https://www.google.com/search?q=calculator', "_blank");
        speak("Opening Calculator...");
    } else {
        speak("I'm not sure how to help with that. Can you please provide more details?");
    }
}

// Send button functionality
sendBtn.addEventListener('click', handleUserInput);

// Enter key functionality for chatbox input
chatboxInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        handleUserInput();
    }
});
