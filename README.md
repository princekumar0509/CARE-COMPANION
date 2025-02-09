# Care Companion - Mental Health Chat Interface

## Project Overview
A web-based mental health companion chatbot that leverages Google's Gemini AI to provide empathetic and supportive conversations in real-time. The application offers a comfortable space for users to share their thoughts and receive compassionate responses.

## [Website Link](https://princekumar0509.github.io/CARE-COMPANION/)

## Project Objectives
1. Create an accessible mental health support platform using web technologies
2. Integrate Google's Gemini API for natural language processing and empathetic responses
3. Implement a persistent chat system with local storage
4. Design an intuitive and calming user interface

## Technologies Used
- **Frontend**: 
  - HTML
  - CSS
  - JavaScript
- **API Integration**: Google Gemini API
- **Storage**: Local Storage API
- **Additional**: 
  - Font Awesome for social icons
  - Custom CSS animations and responsive design

## Key Features
1. **Chat Interface**
   - Real-time conversation flow
   - Persistent chat history
   - Typing indicators
   - Error handling and recovery
   - Smooth animations

2. **AI Integration**
   - Empathetic response generation
   - Context-aware conversations
   - Natural language processing
   - Conversation history management

3. **User Interface**
   - Responsive design
   - Gradient-based color scheme
   - Animated message bubbles

## Implementation Details
### API Integration
```javascript
async function sendMessage() {
    const response = await fetch(`${apiUrl}?key=${apiKey}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            contents: [{
                role: "user",
                parts: [{
                    text: `You are an empathetic and supportive mental health companion...`
                }]
            }]
        })
    });
    // Response handling...
}
```

### Local Storage Implementation
```javascript
function saveConversationHistory() {
    localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
}

function loadConversationHistory() {
    const savedHistory = localStorage.getItem('chatHistory');
    // History loading and display...
}
```

## Learning Outcomes
1. **API Integration**: Learned to work with AI APIs and handle asynchronous operations
2. **Frontend Development**: Implemented advanced CSS features and responsive design
3. **User Experience**: Created an empathetic and user-friendly interface
4. **Local Storage**: Managed client-side data persistence
5. **Error Handling**: Implemented robust error recovery mechanisms
6. **Project Management**: Balanced technical requirements with user needs

## Future Enhancements
1. User authentication system
2. Cloud storage for conversation history
3. Mood tracking and analysis

## Challenges Faced
1. **API Response Handling**: Managing asynchronous API calls and potential failures
2. **Conversation Context**: Maintaining coherent conversation flow
3. **UI/UX Design**: Creating a calming and intuitive interface
4. **Performance**: Optimizing local storage and message rendering
5. **Error Recovery**: Implementing graceful error handling

## Screenshots
![image](https://github.com/user-attachments/assets/080214b1-cd5f-4137-accb-eb793b64e8a0)
![image](https://github.com/user-attachments/assets/0700ed30-5dc0-436d-a5e4-d854776c0c8a)
Made with 💖 by GuptGyan | College Project 2025
