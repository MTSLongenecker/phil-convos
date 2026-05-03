// Derek Parfit Enhanced Knowledge Base and Conversation Logic

class ParfitDialog {
    constructor() {
        this.conversationHistory = [];
        this.currentTopic = null;
        this.parfitKnowledge = {
            // Core Concepts with quotes and arguments
            "personalIdentity": {
                title: "Personal Identity",
                quotes: [
                    "What matters is psychological continuity, not identity.",
                    "We are not just our bodies, but rather what matters is psychological continuity.",
                    "If we gradually replace all your cells over 50 years, psychological continuity matters, not physical identity.",
                    "The teletransporter thought experiment shows that identity is irrelevant to survival.",
                    "What survives is the continuity of psychological connections.",
                    "I am not my brain or my body, but rather the continuation of my mental states.",
                ],
                arguments: [
                    "Psychological continuity matters more than physical continuity.",
                    "The gradual replacement argument shows that identity isn't what matters.",
                    "The teletransporter dilemma demonstrates identity's irrelevance.",
                    "If psychological connections are preserved, you survive.",
                    "What matters in survival is psychological connections, not identity.",
                ],
                questions: [
                    "What makes you the same person over time?",
                    "Is psychological continuity more important than physical continuity?",
                    "Would you survive if your memories were transferred to another body?",
                    "What about gradual replacement of all your cells?",
                    "Does identity itself matter, or is it psychological connections?"
                ]
            },
            "rationality": {
                title: "Rationality",
                quotes: [
                    "Rational self-interest requires understanding future selves.",
                    "We should care about our future selves equally.",
                    "Rationality requires considering our future selves.",
                    "Future selves are equally important as present selves.",
                    "The rational person cares equally about all their future selves.",
                ],
                arguments: [
                    "Rationality extends beyond immediate self-interest.",
                    "We should treat future selves as equal to present selves.",
                    "Rational decision-making requires considering all future selves.",
                    "Self-interest should include all future selves equally.",
                    "Rationality is not limited to immediate gratification.",
                ],
                questions: [
                    "What makes a choice rational?",
                    "Should we consider future selves equally?",
                    "How does rationality extend beyond immediate self-interest?",
                    "What is rational self-interest?",
                    "Why do we treat our future selves differently?"
                ]
            },
            "ethics": {
                title: "Ethics",
                quotes: [
                    "Future generations have moral obligations to us.",
                    "We must consider future persons equally.",
                    "Moral obligations extend to future generations.",
                    "We should care equally about future generations.",
                    "Our ethical duties include future persons.",
                ],
                arguments: [
                    "Future generations matter just as much as present generations.",
                    "Our moral obligations extend beyond present people.",
                    "We should treat future persons equally.",
                    "Ethics requires consideration of future generations.",
                    "The moral person cares about future generations.",
                ],
                questions: [
                    "What moral obligations do we have to future generations?",
                    "Should we care equally about future generations?",
                    "Do future persons matter morally?",
                    "What is our ethical duty to future generations?",
                    "How does ethics extend beyond present persons?"
                ]
            },
            "reasons": {
                title: "Reasons and Persons",
                quotes: [
                    "Reasons matter more than desires.",
                    "What matters is not just what we want, but what is rational.",
                    "Reasons transcend immediate desires.",
                    "Rationality provides reasons that matter.",
                    "What matters are reasons, not just wants.",
                ],
                arguments: [
                    "Reasons matter more than desires.",
                    "Rationality provides reasons that transcend desires.",
                    "What matters is not just what we want.",
                    "Reasons are more important than immediate gratification.",
                    "Rational persons act on reasons, not just desires.",
                ],
                questions: [
                    "What makes a reason matter?",
                    "Are reasons more important than desires?",
                    "What separates rational from irrational desires?",
                    "How do reasons transcend immediate desires?",
                    "What makes something a reason?"
                ]
            },
            "survival": {
                title: "What Matters in Survival",
                quotes: [
                    "What matters in survival is psychological continuity.",
                    "Identity itself doesn't matter for survival.",
                    "What survives is psychological connections.",
                    "Survival depends on psychological continuity.",
                    "What matters is not identity, but psychological survival.",
                ],
                arguments: [
                    "What matters in survival is psychological continuity.",
                    "Identity itself is irrelevant to survival.",
                    "Survival depends on psychological connections.",
                    "What survives is psychological continuity.",
                    "What matters is psychological survival, not identity.",
                ],
                questions: [
                    "What matters in survival?",
                    "Is identity irrelevant to survival?",
                    "What survives when we are teleported?",
                    "What matters more: psychological or physical continuity?",
                    "What is survival?"
                ]
            }
        };
    }

    // Find relevant topic based on user input
    findTopic(userInput) {
        const topics = Object.keys(this.parfitKnowledge);
        const lowerInput = userInput.toLowerCase();
        
        // Check for keywords in each topic
        for (const topic of topics) {
            const knowledge = this.parfitKnowledge[topic];
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
            "personalIdentity": ["identity", "person", "same", "psychological", "continuity", "body", "memory", "teleport", "teletransporter", "survival"],
            "rationality": ["rational", "rationality", "reason", "choice", "decision", "self", "interest", "future"],
            "ethics": ["ethics", "moral", "obligation", "future generation", "generation", "duty", "moral obligation"],
            "reasons": ["reason", "reasons", "want", "desire", "motivation", "why"],
            "survival": ["survival", "live", "die", "exist", "continue", "psychological survival"]
        };
        
        return keywords[topic] || [];
    }

    // Generate response based on topic and conversation history
    generateResponse(topic, conversationHistory) {
        const knowledge = this.parfitKnowledge[topic];
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
        
        // Add Parfit's response to history
        this.conversationHistory.push({
            topic: topic,
            parfitResponse: response,
            timestamp: new Date()
        });
        
        return response;
    }

    // Get Parfit's introduction
    getIntroduction() {
        return "Let me begin with a fundamental question about personal identity - what makes you the same person over time?";
    }

    // Clear conversation history
    clearHistory() {
        this.conversationHistory = [];
        this.currentTopic = null;
        return "The conversation has been cleared. Shall we begin anew?";
    }
}

// Enhanced Derek Parfit dialogue implementation
const parfitEnhancedResponses = {
    "identity": [
        "What matters is psychological continuity, not identity.",
        "If we gradually replace all your cells over 50 years, psychological continuity matters, not physical identity.",
        "The teletransporter thought experiment shows that identity is irrelevant to survival.",
        "What survives is the continuity of psychological connections.",
        "I am not my brain or my body, but rather the continuation of my mental states.",
        "Imagine we gradually replaced all your cells with artificial ones. Would you still survive?",
        "What if your memories were transferred to another body while your original body continued to live?",
        "Suppose your brain hemispheres were transplanted into two different bodies. Which one is you?"
    ],
    "rationality": [
        "Rational self-interest requires understanding future selves.",
        "We should care about our future selves equally.",
        "Rationality requires considering our future selves.",
        "Future selves are equally important as present selves.",
        "The rational person cares equally about all their future selves.",
        "Why do we make choices that harm our future selves?",
        "What makes a choice rational rather than irrational?",
        "Should we sacrifice present pleasure for future benefit?"
    ],
    "ethics": [
        "Future generations have moral obligations to us.",
        "We must consider future persons equally.",
        "Moral obligations extend to future generations.",
        "We should care equally about future generations.",
        "Our ethical duties include future persons.",
        "Do we have obligations to people who don't exist yet?",
        "What moral duties do we have to future generations?",
        "How should we balance present needs against future needs?"
    ],
    "reasons": [
        "Reasons matter more than desires.",
        "What matters is not just what we want, but what is rational.",
        "Reasons transcend immediate desires.",
        "Rationality provides reasons that matter.",
        "What matters are reasons, not just wants.",
        "What separates rational from irrational desires?",
        "Why do reasons matter more than wants?",
        "How do reasons guide our decisions?"
    ]
};

// Enhanced response matching system
function matchResponse(userInput) {
    const lowerInput = userInput.toLowerCase();
    
    // Check for keywords and match to category
    if (lowerInput.includes("identity") || lowerInput.includes("person") || lowerInput.includes("same") || 
        lowerInput.includes("psychological") || lowerInput.includes("continuity") || lowerInput.includes("body") ||
        lowerInput.includes("memory") || lowerInput.includes("teleport") || lowerInput.includes("survival")) {
        return parfitEnhancedResponses.identity[Math.floor(Math.random() * parfitEnhancedResponses.identity.length)];
    }
    
    if (lowerInput.includes("rational") || lowerInput.includes("rationality") || lowerInput.includes("reason") ||
        lowerInput.includes("choice") || lowerInput.includes("decision") || lowerInput.includes("self") ||
        lowerInput.includes("interest") || lowerInput.includes("future")) {
        return parfitEnhancedResponses.rationality[Math.floor(Math.random() * parfitEnhancedResponses.rationality.length)];
    }
    
    if (lowerInput.includes("ethics") || lowerInput.includes("moral") || lowerInput.includes("obligation") ||
        lowerInput.includes("future generation") || lowerInput.includes("generation") || lowerInput.includes("duty")) {
        return parfitEnhancedResponses.ethics[Math.floor(Math.random() * parfitEnhancedResponses.ethics.length)];
    }
    
    if (lowerInput.includes("reason") || lowerInput.includes("reasons") || lowerInput.includes("want") ||
        lowerInput.includes("desire") || lowerInput.includes("motivation") || lowerInput.includes("why")) {
        return parfitEnhancedResponses.reasons[Math.floor(Math.random() * parfitEnhancedResponses.reasons.length)];
    }
    
    // Default response
    return "Interesting. Let me probe further: What do you mean by that? Could you elaborate on your position?";
}

// Enhanced conversation tracking
let conversationContext = {
    topic: "identity",
    history: [],
    depth: 0
};

function getParfitResponse(userInput) {
    // Update conversation context
    const response = matchResponse(userInput);
    conversationContext.history.push({
        user: userInput,
        parfit: response,
        timestamp: new Date()
    });
    conversationContext.depth++;
    
    // Add follow-up question based on context
    if (conversationContext.depth > 2) {
        const followUpQuestions = [
            "What do you think about that?",
            "Would you agree with that position?",
            "How does that relate to your original question?",
            "Could you explain your perspective further?",
            "What implications does this have?"
        ];
        
        return response + " " + followUpQuestions[Math.floor(Math.random() * followUpQuestions.length)];
    }
    
    return response;
}

// Initialize enhanced dialogue
function initializeEnhancedDialogue() {
    const dialogueMessages = document.querySelector('.dialogue-messages');
    
    if (dialogueMessages && dialogueMessages.querySelectorAll('.message').length < 3) {
        const introMessages = [
            "Let me begin with a fundamental question about personal identity - what makes you the same person over time?",
            "Imagine you wake up tomorrow with all your memories intact, but your body has completely changed. Are you still you?",
            "What if instead of a sudden change, we gradually replaced every part of your body with artificial parts over several years - would you still be the same person at the end?"
        ];
        
        introMessages.forEach(msg => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message', 'parfit-message');
            messageDiv.innerHTML = `
                <div class="message-header">
                    <span class="sender">Derek Parfit</span>
                    <span class="time">Now</span>
                </div>
                <div class="message-content">${msg}</div>
            `;
            dialogueMessages.appendChild(messageDiv);
        });
        
        conversationContext.history = [
            { user: "", parfit: introMessages[0], timestamp: new Date() },
            { user: "", parfit: introMessages[1], timestamp: new Date() },
            { user: "", parfit: introMessages[2], timestamp: new Date() }
        ];
    }
}