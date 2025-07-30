const apiKey = "AIzaSyAt-eRToQcVM6ekZvMGhpvMTVwGlEg_Pbs";
const apiUrl = "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent";

let isProcessing = false;
const sendButton = document.getElementById("send-button");
const typingIndicator = document.getElementById("typing-indicator");

// Initialize conversation history
let conversationHistory = [];

// Load conversation history from localStorage when page loads
function loadConversationHistory() {
    const savedHistory = localStorage.getItem('chatHistory');
    if (savedHistory) {
        conversationHistory = JSON.parse(savedHistory);
        conversationHistory.forEach(msg => {
            displayMessage(msg.text, msg.sender);
        });
    } else {
        // Display welcome message if no history exists
        const welcomeMessage = "Hi there! 💫 I'm your Care Companion, here to listen and chat with you. How are you feeling today? Remember, there's no right or wrong way to feel - I'm here to support you! 🌟";
        displayMessage(welcomeMessage, 'bot');
        conversationHistory.push({ text: welcomeMessage, sender: 'bot' });
        saveConversationHistory();
    }
}

// Save conversation history to localStorage
function saveConversationHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
}

async function sendMessage() {
    if (isProcessing) return;

    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    isProcessing = true;
    sendButton.disabled = true;
    document.getElementById("user-input").disabled = true;

    displayMessage(userInput, 'user');
    conversationHistory.push({ text: userInput, sender: 'user' });
    document.getElementById("user-input").value = "";

    typingIndicator.style.display = "block";

    try {
        const response = await fetch(`${apiUrl}?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{
                        text: `You are an empathetic and supportive mental health companion. Use a warm, caring tone and natural conversational style. Include relevant emojis and keep responses concise but meaningful. Show genuine understanding and validate feelings. Add gentle encouragement when appropriate. Previous conversation: ${JSON.stringify(conversationHistory)}. Current message: ${userInput}`
                    }]
                }]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0].content && data.candidates[0].content.parts) {
            const botResponse = data.candidates[0].content.parts[0].text;
            typingIndicator.style.display = "none";
            displayMessage(botResponse, 'bot');
            conversationHistory.push({ text: botResponse, sender: 'bot' });
            saveConversationHistory();
        } else {
            throw new Error('Unexpected response structure');
        }
    } catch (error) {
        console.error('Error:', error);
        typingIndicator.style.display = "none";
        const errorMessage = "I'm here and listening, but having a bit of trouble responding right now. Could you please share that with me again? 💝";
        displayMessage(errorMessage, 'bot');
        conversationHistory.push({ text: errorMessage, sender: 'bot' });
        saveConversationHistory();
    } finally {
        isProcessing = false;
        sendButton.disabled = false;
        document.getElementById("user-input").disabled = false;
        document.getElementById("user-input").focus();
    }
}

function displayMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");
    const messageDiv = document.createElement("div");
    messageDiv.classList.add('message', `${sender}-message`);
    messageDiv.textContent = message;
    chatBox.insertBefore(messageDiv, typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter" && !event.shiftKey && !isProcessing) {
        event.preventDefault();
        sendMessage();
    }
});

// Load conversation history when page loads
loadConversationHistory();
document.getElementById("user-input").focus();
