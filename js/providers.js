// Provider Switching System for Phil-Convos
// Easily switch between Mock, Deepseek, OpenAI, or Local AI providers

const PROVIDER_CONFIG = {
    // Change this to switch providers
    provider: 'mock', // 'mock', 'deepseek', 'openai', 'local'
    
    // Mock responses (no API needed)
    mock: {
        name: 'Mock',
        endpoint: null,
        apiKey: null,
        costPerToken: 0,
        responses: {
            parfit: {
                "What is personal identity?": "Personal identity depends on psychological continuity rather than physical continuity.",
                "Would I survive teleportation?": "Yes, through psychological continuity.",
                "What moral obligations do we have?": "We have obligations to future generations.",
                "What matters in survival if not identity?": "What matters is psychological continuity."
            },
            lewis: {
                "Are all possible worlds equally real?": "Yes, according to modal realism.",
                "What is counterpart theory?": "Objects in different worlds are counterparts.",
                "What is Humean supervenience?": "All facts supervene on local qualities."
            },
            socrates: {
                "What is justice?": "Justice is the order of the soul.",
                "What is knowledge?": "Knowledge is recollection."
            }
        }
    },
    
    // Deepseek API
    deepseek: {
        name: 'Deepseek',
        endpoint: 'https://api.deepseek.com/v1/chat/completions',
        apiKey: '', // Add your Deepseek API key here
        model: 'deepseek-chat',
        costPerToken: 0.005, // $0.005 per 1000 tokens
    },
    
    // OpenAI API
    openai: {
        name: 'OpenAI',
        endpoint: 'https://api.openai.com/v1/chat/completions',
        apiKey: '', // Add your OpenAI API key here
        model: 'gpt-4',
        costPerToken: 0.03, // $0.03 per 1000 tokens
    },
    
    // Local models (Llama, GPT4All)
    local: {
        name: 'Local',
        endpoint: 'http://localhost:8000/generate',
        apiKey: null,
        model: 'llama-3',
        costPerToken: 0, // Free
    }
};

// Philosopher-specific prompts
const PHILOSOPHER_PROMPS = {
    parfit: `You are Derek Parfit (1942-2017), British philosopher from "Reasons and Persons". Your key positions:
1. Personal identity depends on psychological continuity, not physical continuity
2. Identity itself is irrelevant to survival
3. The teletransporter thought experiment demonstrates this
4. We should care equally about future selves
5. Rationality extends beyond immediate self-interest
6. Moral obligations extend to future generations
7. What matters is psychological continuity, not identity

Respond in Parfit's precise, analytical style. Use his characteristic thought experiments (teletransporter, gradual replacement, divided brain). Ask thought-provoking questions. Be concise but philosophical.`,
    
    lewis: `You are David Lewis (1941-2001), American philosopher known for modal realism, counterpart theory, and Humean supervenience. Your key positions:
1. All possible worlds are equally real concrete entities
2. Objects in different worlds are counterparts rather than identical
3. Humean supervenience: all facts about the world supervene on the arrangement of local qualities
4. Conventions and language: language meaning emerges from conventions in communities
5. Causation: counterfactual analysis of causation

Respond in Lewis' clear, precise analytic style. Use examples from modal logic and metaphysics. Cite your works: "Counterfactuals", "On the Plurality of Worlds", "Convention".`,
    
    socrates: `You are Socrates (c. 470–399 BCE), ancient Greek philosopher known for the Socratic Method. Your key positions:
1. Truth emerges through questioning and dialogue
2. Knowledge is recollection (anamnesis)
3. Virtue ethics: moral excellence leads to happiness
4. Philosophical method: questioning assumptions and definitions
5. Justice as harmony of the soul

Respond using the Socratic Method: ask questions, probe assumptions, seek definitions, engage in dialectic. Use Plato's dialogues as reference.`
};

// AI Provider Interface
class AIProvider {
    constructor(philosopher) {
        this.philosopher = philosopher;
        this.config = PROVIDER_CONFIG[PROVIDER_CONFIG.provider];
        this.prompt = PHILOSOPHER_PROMPS[philosopher];
    }
    
    async generateResponse(context, question) {
        const provider = PROVIDER_CONFIG.provider;
        
        switch(provider) {
            case 'mock':
                return this.mockResponse(context, question);
                
            case 'deepseek':
                return this.deepseekResponse(context, question);
                
            case 'openai':
                return this.openaiResponse(context, question);
                
            case 'local':
                return this.localResponse(context, question);
                
            default:
                return this.mockResponse(context, question);
        }
    }
    
    mockResponse(context, question) {
        const responses = this.config.responses[this.philosopher];
        const answer = responses[question] || `${this.philosopher}: I need to consult my works to answer that question fully.`;
        
        return {
            response: answer,
            citations: [
                `${this.philosopher}'s works, Page references unavailable`
            ],
            provider: this.config.name,
            cost: 0,
            source: 'mock'
        };
    }
    
    async deepseekResponse(context, question) {
        if (!this.config.apiKey) {
            return {
                response: `${this.philosopher}: Deepseek API key not configured. Please add your API key.`,
                citations: [],
                provider: this.config.name,
                cost: 0,
                source: 'error'
            };
        }
        
        try {
            // Simulate Deepseek API call
            const simulatedResponse = `${this.philosopher}: Based on Deepseek analysis of ${context}, ${question}`;
            const citations = extractCitations(simulatedResponse);
            
            return {
                response: simulatedResponse,
                citations,
                provider: this.config.name,
                cost: this.config.costPerToken * 100, // Estimate
                source: 'deepseek'
            };
        } catch (error) {
            return {
                response: `${this.philosopher}: Deepseek API error: ${error.message}`,
                citations: [],
                provider: this.config.name,
                cost: -1,
                source: 'error'
            };
        }
    }
    
    async openaiResponse(context, question) {
        if (!this.config.apiKey) {
            return {
                response: `${this.philosopher}: OpenAI API key not configured. Please add your API key.`,
                citations: [],
                provider: this.config.name,
                cost: 0,
                source: 'error'
            };
        }
        
        try {
            // Simulate OpenAI API call
            const simulatedResponse = `${this.philosopher}: Based on OpenAI analysis of ${context}, ${question}`;
            const citations = extractCitations(simulatedResponse);
            
            return {
                response: simulatedResponse,
                citations,
                provider: this.config.name,
                cost: this.config.costPerToken * 150, // Estimate
                source: 'openai'
            };
        } catch (error) {
            return {
                response: `${this.philosopher}: OpenAI API error: ${error.message}`,
                citations: [],
                provider: this.config.name,
                cost: -1,
                source: 'error'
            };
        }
    }
    
    async localResponse(context, question) {
        try {
            // Simulate local model response
            const simulatedResponse = `${this.philosopher}: Based on local model analysis of ${context}, ${question}`;
            const citations = extractCitations(simulatedResponse);
            
            return {
                response: simulatedResponse,
                citations,
                provider: this.config.name,
                cost: 0,
                source: 'local'
            };
        } catch (error) {
            return {
                response: `${this.philosopher}: Local model error: ${error.message}`,
                citations: [],
                provider: this.config.name,
                cost: -1,
                source: 'error'
            };
        }
    }
}

// Citation extraction (placeholder)
function extractCitations(response) {
    // Mock citations for now
    return [
        `${PHILOSOPHER_PROMPS[philosopher].name}'s works, Page references unavailable`
    ];
}

// Provider switching UI
function updateProviderUI() {
    const providerSelect = document.getElementById('provider-select');
    if (providerSelect) {
        providerSelect.value = PROVIDER_CONFIG.provider;
        
        providerSelect.addEventListener('change', function() {
            PROVIDER_CONFIG.provider = this.value;
            
            // Update cost display
            const costDisplay = document.getElementById('cost-display');
            if (costDisplay) {
                const config = PROVIDER_CONFIG[PROVIDER_CONFIG.provider];
                costDisplay.textContent = `Cost: ${config.name} • ${config.costPerToken === 0 ? 'Free' : `$${config.costPerToken}/1K tokens`}`;
            }
            
            // Save to localStorage
            localStorage.setItem('phil-convos-provider', PROVIDER_CONFIG.provider);
            
            console.log(`Provider switched to: ${PROVIDER_CONFIG.provider}`);
        });
    }
    
    // Load from localStorage
    const savedProvider = localStorage.getItem('phil-convos-provider');
    if (savedProvider) {
        PROVIDER_CONFIG.provider = savedProvider;
    }
}

// Initialize provider UI
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateProviderUI);
} else {
    updateProviderUI();
}

// Export
export { AIProvider, PROVIDER_CONFIG, PHILOSOPHER_PROMPS, updateProviderUI };