const btn = document.querySelector('.talk');
const content = document.querySelector('.content');
const chatboxInput = document.querySelector('.chatbox-input');
const conversationContainer = document.querySelector('.conversation-container');
const sendBtn = document.querySelector('.send-btn');

let conversation = [];

// Function to handle speech synthesis
function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;
    window.speechSynthesis.speak(text_speak);
}

// Function to greet based on the time of day
function wishMe() {
    const hour = new Date().getHours();
    if (hour < 12) {
        speak("Good Morning sir...");
    } else if (hour < 17) {
        speak("Good Afternoon sir...");
    } else {
        speak("Good Evening sir...");
    }
}

// Initialize the assistant
window.addEventListener('load', () => {
    speak("Initializing AI...");
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
        conversation.push(`User: ${userInput}`);
        const aiResponse = getaiResponse(userInput);
        conversation.push(`ai: ${jarvisResponse}`);
        updateConversationContainer();
        chatboxInput.value = '';
    }
}

// Generate a response for ai
function getaiResponse(userInput) {
    
    // Add logic to generate a response based on userInput
    return `You said: ${userInput}`;
}

// Update the conversation container
function updateConversationContainer() {
    conversationContainer.innerHTML = '';
    conversation.forEach(message => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        conversationContainer.appendChild(messageElement);
    });
}


function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Hello Sir, How May I Help You?");
    } else if (message.includes("open google")) {
        window.open("https://google.com", "_blank");
        speak("Opening Google...");
    } else if (message.includes("open youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Opening Youtube...");
    } else if (message.includes("open facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Opening Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("This is what I found on the internet regarding " + message);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        speak("This is what I found on Wikipedia regarding " + message);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        speak("Today's date is " + date);
    } else if (message.includes('calculator')) {
        window.open('https://www.google.com/search?q=calculator', "_blank");
        speak("Opening Calculator");
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        speak("I found some information for " + message + " on Google");
    }
}
function handleUserInput() {
    const userInput = chatboxInput.value.trim();
    if (userInput !== '') {
        conversation.push(`User: ${userInput}`);
        const aiResponse = getaiResponse(userInput);
        conversation.push(`ai: ${aiResponse}`);
        updateConversationContainer();
        chatboxInput.value = '';
    }
}

function updateConversationContainer() {
    conversationContainer.innerHTML = '';
    conversation.forEach(message => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        conversationContainer.appendChild(messageElement);
    });
}
function getaiResponse(userInput) {
    if (userInput.toLowerCase() === "open") {
      takeCommand("open youtube");
      return "Opening YouTube...";
    } else {
      // Add logic to generate a response based on userInput
      return `You said: ${userInput}`;
    }
  }
 

sendBtn.addEventListener('click', handleUserInput);
chatboxInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 
        handleUserInput();
    }
});
