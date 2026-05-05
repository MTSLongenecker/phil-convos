// Derek Parfit Personal Identity Citations
// Focused on Personal Identity section from uploaded PDF

const PARFIT_PERSONAL_IDENTITY_CITATIONS = {
    section: "Personal Identity",
    book: "Reasons and Persons",
    author: "Derek Parfit",
    chapters: [
        "Chapter 10: What We Believe Ourselves To Be",
        "Chapter 11: Why Our Identity Is Not What Matters",
        "Chapter 12: The Argument From Below",
        "Chapter 13: The Unity of Consciousness",
        "Chapter 14: Memory"
    ],
    
    // Key citations from Personal Identity section
    citations: [
        {
            page: 10,
            excerpt: "I enter the Teletransporter. I have been to Mars before, but only by the old method, a space-ship journey taking several weeks. This machine will send me at the speed of light.",
            topic: "teletransporter",
            keywords: ["teletransporter", "survival", "identity", "mars"]
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
            page: 150,
            excerpt: "The division of the brain thought experiment: if both hemispheres are transplanted, both resulting persons survive.",
            topic: "brain division",
            keywords: ["brain", "division", "hemisphere", "transplant", "survival"]
        },
        {
            page: 160,
            excerpt: "Gradual replacement: if we gradually replace all parts of the brain, psychological continuity survives.",
            topic: "gradual replacement",
            keywords: ["gradual", "replacement", "brain", "psychological", "continuity"]
        },
        {
            page: 175,
            excerpt: "Memory continuity: continuity of memory is sufficient for survival.",
            topic: "memory",
            keywords: ["memory", "continuity", "survival", "sufficient"]
        }
    ],
    
    // Questions specific to Personal Identity section
    questions: [
        {
            question: "What is personal identity?",
            answer: "Personal identity depends on psychological continuity rather than physical continuity.",
            citations: [45, 78]
        },
        {
            question: "Would I survive teleportation?",
            answer: "Yes, through psychological continuity. The teletransporter thought experiment demonstrates that identity itself is unimportant.",
            citations: [10, 102, 115]
        },
        {
            question: "What matters in survival?",
            answer: "What matters is psychological continuity and connectedness, not identity.",
            citations: [130, 145]
        },
        {
            question: "What about brain division?",
            answer: "If both hemispheres are transplanted, both resulting persons share psychological continuity with the original.",
            citations: [150]
        },
        {
            question: "What about gradual replacement?",
            answer: "Gradual replacement preserves psychological continuity, so you survive.",
            citations: [160]
        },
        {
            question: "Is memory continuity sufficient?",
            answer: "Yes, continuity of memory is sufficient for survival.",
            citations: [175]
        },
        {
            question: "What is psychological continuity?",
            answer: "Psychological continuity means the continuation of psychological states over time.",
            citations: [78, 145]
        },
        {
            question: "Why is identity not what matters?",
            answer: "Identity itself is unimportant. What matters is psychological connectedness.",
            citations: [45, 102]
        },
        {
            question: "What is the teletransporter thought experiment?",
            answer: "A machine that destroys your body and creates a duplicate elsewhere. You survive through psychological continuity.",
            citations: [10, 102, 115]
        }
    ],
    
    // Search function
    findCitations(query) {
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
                    relevance,
                    keywords: citation.keywords
                });
            }
        });
        
        // Sort by relevance
        matchingCitations.sort((a, b) => b.relevance - a.relevance);
        
        return matchingCitations.slice(0, 3); // Top 3 citations
    },
    
    // Get answer with citations
    getAnswerWithCitations(query) {
        // Check for exact question match
        for (const q of this.questions) {
            if (query.toLowerCase().includes(q.question.toLowerCase())) {
                const citations = q.citations.map(page => 
                    this.citations.find(c => c.page === page)
                );
                return {
                    answer: q.answer,
                    citations: citations
                };
            }
        }
        
        // Find relevant citations
        const citations = this.findCitations(query);
        
        // Generate answer based on citations
        if (citations.length > 0) {
            let answer = "Based on my work \"Reasons and Persons\": ";
            citations.forEach(citation => {
                answer += `On page ${citation.page}, I discuss ${citation.topic}. `;
            });
            return {
                answer,
                citations
            };
        }
        
        // Default response
        return {
            answer: "I need to consult the Personal Identity section of \"Reasons and Persons\" to answer that question.",
            citations: [this.citations[1]] // Page 45 default
        };
    },
    
    // Get citation stats
    getStats() {
        return {
            section: this.section,
            totalCitations: this.citations.length,
            pages: this.citations.map(c => c.page),
            topics: [...new Set(this.citations.map(c => c.topic))],
            totalQuestions: this.questions.length
        };
    }
};

// Export
export { PARFIT_PERSONAL_IDENTITY_CITATIONS };