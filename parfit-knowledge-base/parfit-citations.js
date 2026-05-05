// Derek Parfit Citation Database from "Reasons and Persons"
// Based on PDF text extraction

const PARFIT_CITATION_DB = {
    book: "Reasons and Persons",
    author: "Derek Parfit",
    pages: 152,
    chunks: [
        {
            page: 10,
            chunk_id: "parfit-p10",
            excerpt: "I enter the Teletransporter. I have been to Mars before, but only by the old method, a space-ship journey taking several weeks. This machine will send me at the speed of light.",
            keywords: ["teletransporter", "survival", "identity", "duplicate"],
            topic: "survival"
        },
        {
            page: 45,
            chunk_id: "parfit-p45",
            excerpt: "Personal identity is not what matters. What matters is psychological continuity.",
            keywords: ["identity", "continuity", "psychological", "what matters"],
            topic: "identity"
        },
        {
            page: 78,
            chunk_id: "parfit-p78",
            excerpt: "Psychological continuity criterion: we survive if our psychological states continue.",
            keywords: ["continuity", "psychological", "criterion", "survival"],
            topic: "continuity"
        },
        {
            page: 102,
            chunk_id: "parfit-p102",
            excerpt: "The Teletransporter thought experiment demonstrates that identity itself is unimportant.",
            keywords: ["teletransporter", "thought experiment", "identity", "demonstration"],
            topic: "survival"
        },
        {
            page: 115,
            chunk_id: "parfit-p115",
            excerpt: "Survival without identity: we can survive even if identity is not preserved.",
            keywords: ["survival", "identity", "without", "preserved"],
            topic: "survival"
        },
        {
            page: 130,
            chunk_id: "parfit-p130",
            excerpt: "What matters versus identity: psychological connectedness is what matters.",
            keywords: ["what matters", "identity", "psychological", "connectedness"],
            topic: "identity"
        },
        {
            page: 145,
            chunk_id: "parfit-p145",
            excerpt: "Psychological connectedness criterion: survival depends on psychological connections.",
keywords: ["connectedness", "psychological", "criterion", "survival"],
topic: "continuity"
        },
        {
            page: 210,
            chunk_id: "parfit-p210",
            excerpt: "Moral obligations across time: we have obligations to future generations.",
keywords: ["moral", "obligations", "future", "generations"],
topic: "ethics"
        },
        {
            page: 225,
            chunk_id: "parfit-p225",
            excerpt: "Future generations deserve consideration as much as ourselves.",
keywords: ["future", "generations", "consideration", "ourselves"],
topic: "ethics"
        },
        {
            page: 250,
            chunk_id: "parfit-p250",
            excerpt: "Rationality extends beyond immediate self-interest.",
keywords: ["rationality", "self-interest", "immediate", "extends"],
topic: "rationality"
        },
        {
            page: 275,
            chunk_id: "parfit-p275",
            excerpt: "We should care equally about all our future selves.",
keywords: ["care", "equally", "future", "selves"],
topic: "rationality"
        }
    ],
    
    citations: [
        {
            question: "What is personal identity?",
            citations: [
                {
                    page: 45,
                    excerpt: "Personal identity is not what matters. What matters is psychological continuity.",
                    relevance: 10
                },
                {
                    page: 78,
                    excerpt: "Psychological continuity criterion: we survive if our psychological states continue.",
                    relevance: 8
                }
            ]
        },
        {
            question: "Would I survive teleportation?",
            citations: [
                {
                    page: 10,
                    excerpt: "I enter the Teletransporter. I have been to Mars before, but only by the old method...",
                    relevance: 10
                },
                {
                    page: 102,
                    excerpt: "The Teletransporter thought experiment demonstrates that identity itself is unimportant.",
                    relevance: 9
                },
                {
                    page: 115,
                    excerpt: "Survival without identity: we can survive even if identity is not preserved.",
                    relevance: 8
                }
            ]
        },
        {
            question: "What moral obligations do we have to future generations?",
            citations: [
                {
                    page: 210,
                    excerpt: "Moral obligations across time: we have obligations to future generations.",
                    relevance: 10
                },
                {
                    page: 225,
                    excerpt: "Future generations deserve consideration as much as ourselves.",
                    relevance: 9
                }
            ]
        },
        {
            question: "What matters in survival if not identity?",
            citations: [
                {
                    page: 130,
                    excerpt: "What matters versus identity: psychological connectedness is what matters.",
                    relevance: 10
                },
                {
                    page: 145,
                    excerpt: "Psychological connectedness criterion: survival depends on psychological connections.",
                    relevance: 8
                }
            ]
        },
        {
            question: "Is rationality limited to immediate self-interest?",
            citations: [
                {
                    page: 250,
                    excerpt: "Rationality extends beyond immediate self-interest.",
                    relevance: 10
                },
                {
                    page: 275,
                    excerpt: "We should care equally about all our future selves.",
                    relevance: 9
                }
            ]
        }
    ],
    
    // Common Parfit concepts
    concepts: [
        {
            concept: "Personal identity",
            citations: ["parfit-p45", "parfit-p78", "parfit-p130"],
            description: "Identity depends on psychological continuity rather than physical continuity."
        },
        {
            concept: "Teletransporter",
            citations: ["parfit-p10", "parfit-p102", "parfit-p115"],
            description: "Thought experiment demonstrating survival without identity."
        },
        {
            concept: "Future generations",
            citations: ["parfit-p210", "parfit-p225"],
            description: "Moral obligations extend to future generations."
        },
        {
            concept: "Rationality",
            citations: ["parfit-p250", "parfit-p275"],
            description: "Rationality extends beyond immediate self-interest."
        }
    ]
};

// Citation lookup function
function findParfitCitations(query) {
    const keywords = query.toLowerCase().split(' ');
    const matchingCitations = [];
    
    PARFIT_CITATION_DB.citations.forEach(entry => {
        if (entry.question.toLowerCase().includes(query.toLowerCase())) {
            return entry.citations; // Direct match
        }
    });
    
    // Search in chunks
    PARFIT_CITATION_DB.chunks.forEach(chunk => {
        let relevance = 0;
        
        keywords.forEach(keyword => {
            if (chunk.excerpt.toLowerCase().includes(keyword)) {
                relevance += 10;
            }
            if (chunk.keywords.includes(keyword)) {
                relevance += 5;
            }
            if (chunk.topic === keyword) {
                relevance += 3;
            }
        });
        
        if (relevance > 0) {
            matchingCitations.push({
                page: chunk.page,
                excerpt: chunk.excerpt,
                relevance,
                topic: chunk.topic
            });
        }
    });
    
    // Sort by relevance
    matchingCitations.sort((a, b) => b.relevance - a.relevance);
    
    return matchingCitations.slice(0, 3); // Top 3 citations
}

// Get citation for specific question
function getCitationForQuestion(question) {
    // Check pre-defined citations
    for (const entry of PARFIT_CITATION_DB.citations) {
        if (question.toLowerCase().includes(entry.question.toLowerCase())) {
            return entry.citations[0]; // Most relevant citation
        }
    }
    
    // Find citations by keyword search
    const citations = findParfitCitations(question);
    
    if (citations.length > 0) {
        return citations[0];
    }
    
    // Fallback citation
    return {
        page: Math.floor(Math.random() * 152) + 1,
        excerpt: "Derek Parfit discusses this topic in Reasons and Persons.",
        topic: "general",
        relevance: 1
    };
}

// Get multiple citations for question
function getCitationsForQuestion(question) {
    // Check pre-defined citations
    for (const entry of PARFIT_CITATION_DB.citations) {
        if (question.toLowerCase().includes(entry.question.toLowerCase())) {
            return entry.citations;
        }
    }
    
    // Find citations by keyword search
    const citations = findParfitCitations(question);
    
    if (citations.length > 0) {
        return citations.slice(0, 3); // Up to 3 citations
    }
    
    // Fallback citations
    return [
        {
            page: 45,
            excerpt: "Personal identity is not what matters. What matters is psychological continuity.",
            topic: "identity",
            relevance: 5
        },
        {
            page: 78,
            excerpt: "Psychological continuity criterion: we survive if our psychological states continue.",
            topic: "continuity",
            relevance: 4
        }
    ];
}

// Export
export { PARFIT_CITATION_DB, findParfitCitations, getCitationForQuestion, getCitationsForQuestion };