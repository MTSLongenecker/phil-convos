// Philosopher dialogue functionality

// Derek Parfit specific responses
const parfitResponses = [
    "Interesting. Let me push further: if psychological continuity matters more than identity, then even if your physical body changes completely but your memories and personality remain, you would still survive.",
    "Conversely, if your body remains but your memories are erased, you might not survive as the same person.",
    "What do you think about this distinction? What is more essential to being you - your physical body or your psychological characteristics?",
    "Consider this: if we gradually replace all your cells over 50 years, would you still be the same person at the end?",
    "And what about future generations? Do we have moral obligations to people who will exist in the future?",
    "Let's explore rationality: why do we make certain choices, and what makes a choice rational?",
    "Now think about this: if your brain hemispheres were transplanted into two different bodies, which one would be you?",
    "The key question is not 'What makes me the same person?' but 'What matters in survival?'",
    "Let me propose another thought experiment: suppose we could create a perfect clone of you with all your memories and personality traits. Which one is the real you?",
    "Think about the split brain cases. If your brain is divided and transplanted into two bodies, which one carries your identity?",
    "What makes rational self-interest rational? Why should we care about our future selves?",
    "Consider this: if you suffer pain tomorrow, that pain is bad whether it's you or someone else who experiences it.",
    "Why do we treat our own future differently from other people's futures?",
    "Let's think about moral obligations to future generations. What duties do we have to people who don't yet exist?",
    "What if you could choose between two futures: one where you experience mild happiness for 100 years, or another where you experience intense joy for 10 years?",
    "Should we sacrifice our present interests for future generations who don't exist yet?"
];

// Sample conversation starters for Derek Parfit
const parfitQuestions = [
    "If tomorrow you wake up with all your memories intact but your body has completely changed, are you still you?",
    "What if instead of a sudden change, we gradually replaced every part of your body with artificial parts over several years - would you still be the same person at the end?",
    "Is identity itself what matters, or is it rather psychological continuity - your memories, beliefs, desires, and character?",
    "What makes you the same person over time?",
    "Do we have moral obligations to people who will exist in the future?",
    "Why do we make certain choices, and what makes a choice rational?",
    "If your brain was divided and transplanted into two bodies, which one would be you?",
    "What makes rational self-interest rational?"
];

// Get references to DOM elements
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');
const randomBtn = document.getElementById('randomBtn');
const userInput = document.getElementById('userInput');
const dialogueMessages = document.querySelector('.dialogue-messages');

// Function to add a message to the dialogue
function addMessage(sender, content) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    
    if (sender === 'Derek Parfit') {
        messageDiv.classList.add('parfit-message');
    } else {
        messageDiv.classList.add('user-message');
    }
    
    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="sender">${sender}</span>
            <span class="time">Now</span>
        </div>
        <div class="message-content">${content}</div>
    `;
    
    dialogueMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    dialogueMessages.scrollTop = dialogueMessages.scrollHeight;
    
    // Add fade-in animation
    messageDiv.style.opacity = '0';
    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.3s ease';
        messageDiv.style.opacity = '1';
    }, 0);
}

// Send message functionality
if (sendBtn) {
    sendBtn.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            // Add user message
            addMessage('You', message);
            
            // Add Derek Parfit response after delay
            setTimeout(() => {
                const randomResponse = parfitResponses[Math.floor(Math.random() * parfitResponses.length)];
                addMessage('Derek Parfit', randomResponse);
            }, 1000);
            
            // Clear input
            userInput.value = '';
        }
    });
}

// Clear conversation
if (clearBtn) {
    clearBtn.addEventListener('click', function() {
        const messages = dialogueMessages.querySelectorAll('.message');
        messages.forEach(msg => {
            // Keep the first three introductory messages
            if (!msg.classList.contains('parfit-message') || 
                msg.textContent.indexOf('Let me begin') === -1 &&
                msg.textContent.indexOf('Imagine you wake up') === -1 &&
                msg.textContent.indexOf('This question touches') === -1) {
                msg.remove();
            }
        });
        
        // Show confirmation message
        setTimeout(() => {
            addMessage('Derek Parfit', "The conversation has been cleared. Shall we begin anew?");
        }, 500);
    });
}

// Random question button
if (randomBtn) {
    randomBtn.addEventListener('click', function() {
        const randomQuestion = parfitQuestions[Math.floor(Math.random() * parfitQuestions.length)];
        userInput.value = randomQuestion;
    });
}

// Allow Enter key to send message (Shift+Enter for new line)
if (userInput) {
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });
}

// Add some initial messages if the conversation is empty
function initializeDialogue() {
    const existingMessages = dialogueMessages.querySelectorAll('.message');
    if (existingMessages.length < 3) {
        addMessage('Derek Parfit', 'Let me begin with a fundamental question about personal identity - what makes you the same person over time?');
        addMessage('Derek Parfit', 'Imagine you wake up tomorrow with all your memories intact, but your body has completely changed. Are you still you? What if instead of a sudden change, we gradually replaced every part of your body with artificial parts over several years - would you still be the same person at the end?');
        addMessage('Derek Parfit', 'This question touches on the core of personal identity. Most people think identity depends on physical continuity - the same body over time. But if we accept gradual replacement, where do we draw the line between "still you" and "not you"? And more importantly: is identity itself what matters, or is it rather psychological continuity - your memories, beliefs, desires, and character?');
    }
}

// Initialize dialogue on page load
window.addEventListener('load', initializeDialogue);