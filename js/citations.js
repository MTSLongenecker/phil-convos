// Citation System for Phil-Convos
// Shows which passages from philosopher's works influenced responses

class CitationSystem {
    constructor() {
        this.citations = [];
        this.philosopher = '';
        this.sourceWorks = {
            parfit: [
                { title: 'Reasons and Persons', pages: [45, 78, 102, 115, 210, 225] },
                { title: 'Other Essays', pages: [15, 30, 55] }
            ],
            lewis: [
                { title: 'On the Plurality of Worlds', pages: [2, 15, 50, 65, 80] },
                { title: 'Counterfactuals', pages: [25, 40, 75] },
                { title: 'Convention', pages: [10, 35, 60] }
            ],
            socrates: [
                { title: 'Plato\'s Dialogues', pages: [30, 45, 70, 95] }
            ]
        };
    }
    
    setPhilosopher(philosopher) {
        this.philosopher = philosopher;
        this.citations = [];
    }
    
    addCitation(work, page, excerpt) {
        const citation = {
            philosopher: this.philosopher,
            work: work,
            page: page,
            excerpt: excerpt,
            timestamp: new Date().toISOString()
        };
        this.citations.push(citation);
        return citation;
    }
    
    generateCitations(question) {
        // Mock citations for now
        const works = this.sourceWorks[this.philosopher] || [];
        
        if (works.length === 0) {
            return [];
        }
        
        const citations = [];
        const work = works[0];
        const page = work.pages[Math.floor(Math.random() * work.pages.length)];
        
        citations.push(this.addCitation(
            work.title,
            page,
            `${this.philosopher} discusses this concept extensively`
        ));
        
        // Add more citations based on question content
        if (question.toLowerCase().includes('personal identity') && this.philosopher === 'parfit') {
            citations.push(this.addCitation(
                'Reasons and Persons',
                45,
                'Personal identity depends on psychological continuity'
            ));
            citations.push(this.addCitation(
                'Reasons and Persons',
                78,
                'Psychological continuity rather than physical continuity'
            ));
        }
        
        if (question.toLowerCase().includes('possible worlds') && this.philosopher === 'lewis') {
            citations.push(this.addCitation(
                'On the Plurality of Worlds',
                2,
                'All possible worlds are equally real'
            ));
            citations.push(this.addCitation(
                'On the Plurality of Worlds',
                50,
                'Counterpart theory explains trans-world identity'
            ));
        }
        
        return citations;
    }
    
    displayCitations(elementId) {
        const container = document.getElementById(elementId);
        if (!container) return;
        
        container.innerHTML = '';
        
        if (this.citations.length === 0) {
            container.innerHTML = '<div class="citation-none">No citations available</div>';
            return;
        }
        
        const citationHTML = this.citations.map(citation => `
            <div class="citation-item">
                <div class="citation-work">${citation.work}</div>
                <div class="citation-page">Page ${citation.page}</div>
                <div class="citation-excerpt">${citation.excerpt}</div>
                <div class="citation-timestamp">${new Date(citation.timestamp).toLocaleTimeString()}</div>
            </div>
        `).join('');
        
        container.innerHTML = `<div class="citation-list">${citationHTML}</div>`;
    }
    
    clearCitations() {
        this.citations = [];
    }
    
    getCitationStats() {
        return {
            totalCitations: this.citations.length,
            philosopher: this.philosopher,
            worksCited: [...new Set(this.citations.map(c => c.work))]
        };
    }
}

// CSS for citation display
const citationCSS = `
.citation-section {
    margin-top: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #4a90e2;
}

.citation-header {
    font-weight: bold;
    color: #2c3e50;
    margin-bottom: 10px;
}

.citation-list {
    margin-top: 10px;
}

.citation-item {
    padding: 10px;
    margin-bottom: 8px;
    background-color: white;
    border-radius: 5px;
    border-left: 3px solid #3498db;
}

.citation-work {
    font-weight: bold;
    color: #2c3e50;
}

.citation-page {
    color: #7f8c8d;
    font-size: 0.9em;
}

.citation-excerpt {
    margin-top: 5px;
    color: #333;
}

.citation-timestamp {
    color: #7f8c8d;
    font-size: 0.8em;
    text-align: right;
}

.citation-none {
    padding: 10px;
    color: #7f8c8d;
}
`;

// Add citation CSS to page
function addCitationCSS() {
    const style = document.createElement('style');
    style.textContent = citationCSS;
    document.head.appendChild(style);
}

// Initialize citation system on philosopher pages
function initializeCitationSystem(philosopher) {
    const citationSystem = new CitationSystem();
    citationSystem.setPhilosopher(philosopher);
    
    // Create citation container
    const citationContainer = document.createElement('div');
    citationContainer.id = 'citation-container';
    citationContainer.classList.add('citation-section');
    
    const citationHeader = document.createElement('div');
    citationHeader.classList.add('citation-header');
    citationHeader.textContent = 'Citations from philosopher\'s works';
    
    citationContainer.appendChild(citationHeader);
    
    // Find dialogue container and add citations after it
    const dialogueContainer = document.querySelector('.dialogue-container');
    if (dialogueContainer) {
        dialogueContainer.appendChild(citationContainer);
    }
    
    return citationSystem;
}

// Add citation CSS to all philosopher pages
addCitationCSS();

// Export
export { CitationSystem, initializeCitationSystem, addCitationCSS };