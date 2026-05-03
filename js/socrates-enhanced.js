// Socrates Enhanced Knowledge Base and Conversation Logic

class SocratesDialog {
    constructor() {
        this.conversationHistory = [];
        this.currentTopic = null;
        this.socratesKnowledge = {
            "justice": {
                title: "Justice",
                quotes: [
                    "Justice is the virtue of ordering the soul.",
                    "Justice is doing good to friends and harm to enemies.",
                    "Justice is a harmony of the soul.",
                    "Justice is each part of the soul performing its proper function.",
                    "The just man has a harmonious soul.",
                ],
                arguments: [
                    "Justice requires harmony between different parts of the soul.",
                    "Justice involves giving each person what is appropriate.",
                    "Justice maintains balance in the soul.",
                    "Justice is essential for happiness.",
                    "Justice leads to a well-ordered life.",
                ],
                questions: [
                    "What is justice?",
                    "Is justice doing good to friends and harm to enemies?",
                    "What makes someone just?",
                    "How does justice relate to harmony?",
                    "What is a just soul?"
                ]
            },
            "virtue": {
                title: "Virtue",
                quotes: [
                    "Virtue is knowledge.",
                    "No one knowingly does evil.",
                    "The unexamined life is not worth living.",
                    "Virtue is the harmony of the soul.",
                    "All men desire the good.",
                ],
                arguments: [
                    "Virtue is knowledge, not habit.",
                    "People do evil only out of ignorance.",
                    "Virtue is essential for happiness.",
                    "Knowing what is good leads to virtuous action.",
                    "Virtue cannot be taught like other skills.",
                ],
                questions: [
                    "What is virtue?",
                    "Can virtue be taught?",
                    "Is virtue knowledge?",
                    "Do all men desire the good?",
                    "What makes a virtuous person?"
                ]
            },
            "truth": {
                title: "Truth",
                quotes: [
                    "We must seek truth through dialogue.",
                    "Truth emerges through questioning.",
                    "The truth cannot be known directly.",
                    "Truth requires examination.",
                    "Knowledge comes from questioning assumptions.",
                ],
                arguments: [
                    "Truth emerges through questioning.",
                    "We cannot know truth directly.",
                    "Dialogue reveals truth.",
                    "Questioning assumptions leads to truth.",
                    "Truth requires continuous examination.",
                ],
                questions: [
                    "What is truth?",
                    "Can we know truth directly?",
                    "How do we seek truth?",
                    "How does dialogue reveal truth?",
                    "What prevents us from knowing truth?"
                ]
            },
            "knowledge": {
                title: "Knowledge",
                quotes: [
                    "Knowledge is different from belief.",
                    "True knowledge requires understanding.",
                    "Knowledge comes from questioning.",
                    "We must examine our beliefs.",
                    "True knowledge cannot be taught.",
                ],
                arguments: [
                    "Knowledge differs from mere belief.",
                    "Knowledge requires understanding.",
                    "Knowledge emerges through questioning.",
                    "We must examine our beliefs for truth.",
                    "Knowledge cannot be transmitted.",
                ],
                questions: [
                    "What is knowledge?",
                    "How does knowledge differ from belief?",
                    "Can knowledge be taught?",
                    "How do we acquire knowledge?",
                    "What separates knowledge from belief?"
                ]
            },
            "philosophy": {
                title: "Philosophy",
                quotes: [
                    "Philosophy is the love of wisdom.",
                    "The unexamined life is not worth living.",
                    "We must question everything.",
                    "Philosophy begins with wonder.",
                    "Dialogue is essential to philosophy.",
                ],
                arguments: [
                    "Philosophy requires examination.",
                    "Philosophy begins with wonder.",
                    "Dialogue is essential to philosophy.",
                    "Philosophy is the love of wisdom.",
                    "The unexamined life is not worth living.",
                ],
                questions: [
                    "What is philosophy?",
                    "Why examine life?",
                    "What makes life worth living?",
                    "How does philosophy differ from other pursuits?",
                    "What is wisdom?"
                ]
            }
        };
    }

    // Find relevant topic based on user input
    findTopic(userInput) {
        const topics = Object.keys(this.socratesKnowledge);
        const lowerInput = userInput.toLowerCase();
        
        // Check for keywords in each topic
        for (const topic of topics) {
            const knowledge = this.socratesKnowledge[topic];
            const keywords = this.getKeywordsForTopic(topic);
            
            for (const keyword of keywords) {
                if (lowerInput.includes(keyword)) {
                    return topic;
                }
            }
        }
        
        // If no topic found, use last topic or random
        return this.currentTopic || topics[Math.floor(Math.random() * topics.length)];
    }
    
    getKeywordsForTopic(topic) {
        const keywords = {
            "justice": ["justice", "just", "fair", "harmony", "balance", "equality", "fairness"],
            "virtue": ["virtue", "virtuous", "good", "evil", "moral", "ethics", "morality"],
0            "truth": ["truth", "true", "real", "authentic", "honest", "truthful"],
            "knowledge": ["knowledge", "know", "belief", "understand", "wisdom", "learn"],
            "philosophy": ["philosophy", "examine", "life", "wisdom", "philosophical", "examination"]
        };
        
        return keywords[topic] || [];
    }

    // Generate response based on topic and conversation history
    generateResponse(topic, conversationHistory) {
        const knowledge = this.socratesKnowledge[topic];
        const recentTopics = conversationHistory.slice(-5).map(msg => msg.topic);
        
        // Choose response type
        const responseTypes = ["quote", "argument", "question"];
        const responseType = responseTypes[Math.floor(Math.random() * responseTypes.length)];
        
        if (responseType === "quote") {
            const quotes = knowledge.quotes;
            return quotes[Math.floor(Math.random() * quotes.length)];
        } else if (responseType === "argument") {
            const arguments = knowledge.arguments;
            return arguments[Math.floor(Math.random() * arguments.length)];
        } else {
            const questions = knowledge.questions;
            return questions[Math.floor(Math.random() * questions.length)];
        }
    }

    // Main conversation handler
    respondToUser(userInput) {
        // Find topic based on user input
        const topic = this.findTopic(userInput);
        this.currentTopic = topic;
        
        // Add to conversation history
        this.conversationHistory.push({
            topic: topic,
            userInput: userInput,
            timestamp: new Date()
        });
        
        // Generate response
        const response = this.generateResponse(topic, this.conversationHistory);
        
        // Add Socrates's response to history
        this.conversationHistory.push({
            topic: topic,
            socratesResponse: response,
            timestamp: new Date()
        });
        
        return response;
    }

    // Get Socrates's introduction
    getIntroduction() {
        return "Let us begin by examining a fundamental question: What is justice?";
    }

    // Clear conversation history
    clearHistory() {
        this.conversationHistory = [];
        this.currentTopic = null;
        return "The conversation has been cleared. Shall we begin anew with a different question?";
    }
}

// Enhanced Socrates responses
const socratesEnhancedResponses = {
    "justice": [
        "Justice is the virtue of ordering the soul.",
        "Justice is doing good to friends and harm to enemies.",
        "Justice is a harmony of the soul.",
        "Justice is each part of the soul performing its proper function.",
        "The just man has a harmonious soul.",
        "What do you think justice is?",
        "Could justice be different for different people?",
        "How do we know what justice requires?"
    ],
    "virtue": [
        "Virtue is knowledge.",
        "No one knowingly does evil.",
        "The unexamined life is not worth living.",
        "Virtue is the harmony of the soul.",
        "All men desire the good.",
        "Can virtue be taught?",
        "Is virtue something we learn?",
        "What makes someone virtuous?"
    ],
    "truth": [
        "We must seek truth through dialogue.",
        "Truth emerges through questioning.",
        "The truth cannot be known directly.",
        "Truth requires examination.",
        "Knowledge comes from questioning assumptions.",
        "What is truth?",
        "Can we ever know what is true?",
        "How do we seek truth?"
    ],
    "knowledge": [
        "Knowledge is different from belief.",
        "True knowledge requires understanding.",
        "Knowledge comes from questioning.",
        "We must examine our beliefs.",
        "True knowledge cannot be taught.",
        "What do we mean when we say we 'know' something?",
        "Is there a difference between belief and knowledge?",
        "How do we acquire knowledge?"
    ],
    "philosophy": [
        "Philosophy is the love of wisdom.",
        "The unexamined life is not worth living.",
        "We must question everything.",
        "Philosophy begins with wonder.",
        "Dialogue is essential to philosophy.",
        "Why examine life?",
        "What makes life worth living?",
        "What is wisdom?"
    ]
};

// Enhanced response matching system for Socrates
function matchSocratesResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    
    // Check for keywords and match to category
    if (lowerInput.includes("justice") || lowerInput.includes("just") || lowerInput.includes("fair") || 
        lowerInput.includes("harmony") || lowerInput.includes("balance") || lowerInput.includes("equality")) {
        return socratesEnhancedResponses.justice[Math.floor(Math.random() * socratesEnhancedResponses.justice.length)];
    }
    
    if (lowerInput.includes("virtue") || lowerInput.includes("virtuous") || lowerInput.includes("good") ||
        lowerInput.includes("evil") || lowerInput.includes("moral") || lowerInput.includes("ethics")) {
        return socratesEnhancedResponses.virtue[Math.floor(Math.random() * socratesEnhancedResponses.virtue.length)];
    }
    
    if (lowerInput.includes("truth") || lowerInput.includes("true") || lowerInput.includes("real") ||
        lowerInput.includes("authentic") || lowerInput.includes("honest")) {
        return socratesEnhancedResponses.truth[Math.floor(Math.random() * socratesEnhancedResponses.truth.length)];
    }
    
    if (lowerInput.includes("knowledge") || lowerInput.includes("know") || lowerInput.includes("belief") ||
        lowerInput.includes("understand") || lowerInput.includes("wisdom") || lowerInput.includes("learn")) {
        return socratesEnhancedResponses.knowledge[Math.floor(Math.random() * socratesEnhancedResponses.knowledge.length)];
    }
    
    if (lowerInput.includes("philosophy") || lowerInput.includes("examine") || lowerInput.includes("life") ||
        lowerInput.includes("wisdom") || lowerInput.includes("philosophical")) {
        return socratesEnhancedResponses.philosophy[Math.floor(Math.random() * socratesEnhancedResponses.philosophy.length)];
    }
    
    // Default Socratic response
    return "Interesting response. Let me ask you: What do you mean by that? Could you clarify your position?";
}

// Enhanced conversation tracking for Socrates
let socratesConversationContext = {
    topic: "justice",
    history: [],
    depth: 0
};

function getSocratesResponse(userInput) {
    // Update conversation context
    const response = matchSocratesResponse(userInput);
    socratesConversationContext.history.push({
        user: userInput,
        socrates: response,
        timestamp: new Date()
    });
    socratesConversationContext.depth++;
    
    // Add follow-up question based on context
    if (socratesConversationContext.depth > 2) {
        const followUpQuestions = [
            "What do you think about that?",
            "Could you explain your perspective further?",
            "Is there any situation where your belief might not hold true?",
            "What evidence supports your belief?",
            "What would follow from your claim?"
        ];
        
        return response + " " + followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
    }
    
    return response;
}

// Initialize enhanced dialogue for Socrates
function initializeSocratesDialogue() {
    const dialogueMessages = document.querySelector('.dialogue-messages');
    
    if (dialogueMessages && dialogueMessages.querySelectorAll('.message').length < 3) {
        const introMessages = [
            "Let us begin by examining a fundamental question: What is justice?",
            "Many people claim to know what justice is, but let me ask: if justice is about fairness and equality, what does it mean to be truly fair?",
            "Consider this: if someone steals from you, justice might require punishment. But if someone steals because they are starving, is justice different? How can we know what justice requires in different situations?"
        ];
        
        introMessages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'socrates-message');
            messageDiv.innerHTML = `
                <div class="message-header">
                    <span class="sender">Socrates</span>
                    <span class="time">Now</span>
                </div>
                <div class="message-content">${msg}</div>
            `;
            dialogueMessages.appendChild(messageDiv);
        });
        
        socratesConversationContext.history = [
            { user: "", socrates: introMessages[0], timestamp: new Date() },
            { user: "", socrates: introMessages[1], timestamp: new Date() },
            { user: "", socrates: introMessages[2], timestamp: new Date() }
        ];
    }
}