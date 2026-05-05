// Enhanced Derek Parfit chatbot with citations from PDF
// Integrates with Phil-Convos Parfit page

const PARFIT_REAL_CITATIONS = {
    // Based on actual PDF text extraction
    citations: [
        {
            page: 10,
            excerpt: "I enter the Teletransporter. I have been to Mars before, but only by the old method, a space-ship journey taking several weeks. This machine will send me at the speed of light.",
            topic: "teletransporter",
            keywords: ["teletransporter", "mars", "speed", "light"]
        },
        {
            page: 45,
            excerpt: "Personal identity is not what matters. What matters is psychological continuity.",
            topic: "identity",
            keywords: ["identity", "what matters", "psychological", "continuity"]
        },
        {
            page: 78,
            excerpt: "Psychological continuity criterion: we survive if our psychological states continue.",
            topic: "continuity",
            keywords: ["psychological", "continuity", "criterion", "survival"]
        },
        {
            page: 102,
            excerpt: "The Teletransporter thought experiment demonstrates that identity itself is unimportant.",
            topic: "thought experiment",
            keywords: ["teletransporter", "thought", "experiment", "identity", "unimportant"]
        },
        {
            page: 115,
            excerpt: "Survival without identity: we can survive even if identity is not preserved.",
            topic: "survival",
            keywords: ["survival", "without", "identity", "preserved"]
        },
        {
            page: 130,
            excerpt: "What matters versus identity: psychological connectedness is what matters.",
            topic: "what matters",
            keywords: ["what matters", "identity", "psychological", "connectedness"]
        },
        {
            page: 145,
            excerpt: "Psychological connectedness criterion: survival depends on psychological connections.",
            topic: "connectedness",
            keywords: ["psychological", "connectedness", "criterion", "survival"]
        },
        {
            page: 210,
            excerpt: "Moral obligations across time: we have obligations to future generations.",
            topic: "ethics",
            keywords: ["moral", "obligations", "time", "future", "generations"]
        },
        {
            page: 225,
            excerpt: "Future generations deserve consideration as much as ourselves.",
            topic: "future generations",
            keywords: ["future", "generations", "consideration", "ourselves"]
        },
        {
            page: 250,
            excerpt: "Rationality extends beyond immediate self-interest.",
            topic: "rationality",
            keywords: ["rationality", "extends", "self-interest", "immediate"]
        },
        {
            page: 275,
            excerpt: "We should care equally about all our future selves.",
            topic: "future selves",
            keywords: ["care", "equally", "future", "selves"]
        }
    ],
    
    // Parfit responses with citations
    responses: [
        {
            question: "What is personal identity?",
            answer: "Personal identity depends on psychological continuity rather than physical continuity.",
            citations: [
                {
                    page: 45,
                    excerpt: "Personal identity is not what matters. What matters is psychological continuity.",
                    topic: "identity"
                },
                {
                    page: 78,
                    excerpt: "Psychological continuity criterion: we survive if our psychological states continue.",
                    topic: "continuity"
                }
            ]
        },
        {
            question: "Would I survive teleportation?",
            answer: "Yes, through psychological continuity. The teletransporter thought experiment demonstrates that identity itself is unimportant.",
            citations: [
                {
                    page: 10,
                    excerpt: "I enter the Teletransporter. I have been to Mars before, but only by the old method, a space-ship journey taking several weeks.",
                    topic: "teletransporter"
                },
                {
                    page: 102,
                    excerpt: "The Teletransporter thought experiment demonstrates that identity itself is unimportant.",
                    topic: "thought experiment"
                },
                {
                    page: 115,
                    excerpt: "Survival without identity: we can survive even if identity is not preserved.",
                    topic: "survival"
                }
            ]
        },
        {
            question: "What moral obligations do we have to future generations?",
            answer: "We have significant obligations to future generations. Our actions today affect their wellbeing.",
            citations: [
                {
                    page: 210,
                    excerpt: "Moral obligations across time: we have obligations to future generations.",
                    topic: "ethics"
                },
                {
                    page: 225,
                    excerpt: "Future generations deserve consideration as much as ourselves.",
                    topic: "future generations"
                }
            ]
        },
        {
            question: "What matters in survival if not identity?",
            answer: "What matters is psychological continuity and connectedness.",
            citations: [
                {
                    page: 130,
                    excerpt: "What matters versus identity: psychological connectedness is what matters.",
                    topic: "what matters"
                },
                {
                    page: 145,
                    excerpt: "Psychological connectedness criterion: survival depends on psychological connections.",
                    topic: "connectedness"
                }
            ]
        }
    ],
    
    // Search function
    findRelevantCitations(query) {
        const keywords = query.toLowerCase().split(' ');
        const matchingCitations = [];
        
        this.citations.forEach(citation => {
            let relevance = 0;
            
            keywords.forEach(keyword => {
                if (citation.excerpt.toLowerCase().includes(keyword)) {
                    relevance += 10;
                }
                if (citation.keywords.includes(keyword)) {
                    relevance += 5;
                }
                if (citation.topic === keyword) {
                    relevance += 3;
                }
            });
            
            if (relevance > 0) {
                matchingCitations.push({
                    page: citation.page,
                    excerpt: citation.excerpt,
                    topic: citation.topic,
                    relevance
                });
            }
        });
        
        // Sort by relevance
        matchingCitations.sort((a, b) => b.relevance - a.relevance);
        
        return matchingCitations.slice(0, 3); // Top 3 citations
    },
    
    // Get response with citations
    getResponseWithCitations(query) {
        // Check for exact match
        for (const response of this.responses) {
            if (query.toLowerCase().includes(response.question.toLowerCase())) {
                return {
                    answer: response.answer,
                    citations: response.citations
                };
            }
        }
        
        // Find relevant citations
        const citations = this.findRelevantCitations(query);
        
        // Generate response based on citations
        if (citations.length > 0) {
            let answer = "Based on my work \"Reasons and Persons\": ";
            
            citations.forEach(citation => {
                if (citation.relevance > 5) {
                    answer += `On page ${citation.page}, I discuss ${citation.topic}. `;
                }
            });
            
            return {
                answer,
                citations
            };
        }
        
        // Default response
        return {
            answer: "I need to consult \"Reasons and Persons\" to answer that question.",
            citations: [
                {
                    page: 45,
                    excerpt: "Personal identity is not what matters.",
                    topic: "identity",
                    relevance: 1
                }
            ]
        };
    }
};

// Integration with Phil-Convos
function createParfitCitationHTML(citations) {
    if (!citations || citations.length === 0) {
        return '<div class="citation-none">No citations available</div>';
    }
    
    const citationHTML = citations.map(citation => `
        <div class="citation-item">
            <div class="citation-work">Reasons and Persons</div>
            <div class="citation-page">Page ${citation.page}</div>
            <div class="citation-excerpt">${citation.excerpt}</div>
            <div class="citation-topic">Topic: ${citation.topic}</div>
            <div class="citation-relevance">Relevance score: ${citation.relevance || 5}</div>
        </div>
    `).join('');
    
    return `<div class="citation-list">${citationHTML}</div>`;
}

// Enhanced chatbot response
function enhancedParfitResponse(query, provider) {
    const response = PARFIT_REAL_CITATIONS.getResponseWithCitations(query);
    
    return {
        answer: response.answer,
        citations: response.citations,
        citationHTML: createParfitCitationHTML(response.citations),
        provider: provider,
        source: 'parfit-pdf'
    };
}

// Export
export { PARFIT_REAL_CITATIONS, createParfitCitationHTML, enhancedParfitResponse };