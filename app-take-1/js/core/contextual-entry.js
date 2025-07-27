/**
 * Contextual Entry Point System
 * 
 * Manages professional scenario-based entry points for quadratic fluency training
 * Core innovation: Professionals enter quantum conversations wherever they start
 */

class ContextualEntrySystem {
    constructor(syncEngine) {
        this.syncEngine = syncEngine;
        this.scenarios = new Map();
        this.currentContext = null;
        this.entryHistory = [];
        this.performanceMetrics = {
            entryPointPreferences: {},
            translationSpeeds: {},
            weakRepresentations: [],
            strongRepresentations: []
        };
        
        // Initialize cognitive agility tracking
        this.typingHistory = [];
        this.metrics = {
            representationSwitches: 0,
            cognitiveAgility: 0,
            avgTypingSpeed: 0,
            fluencyScore: 0
        };
        
        this.initializeScenarios();
    }

    /**
     * Initialize professional scenarios with authentic contexts
     */
    initializeScenarios() {
        const scenarioDefinitions = [
            {
                id: 'executive_briefing',
                name: 'C-Suite Quantum Investment Decision',
                context: 'The CEO asks: "Should we invest $2M in quantum computing for our trading algorithms?"',
                entryPoint: 'plainspeak',
                timeLimit: 300, // 5 minutes
                audience: 'executives',
                challenge: 'Explain quantum advantage in business terms, support with technical evidence',
                difficulty: 'beginner',
                objectives: [
                    'Articulate business value of quantum computing',
                    'Present realistic ROI timeline',
                    'Address implementation risks',
                    'Translate technical concepts to business language'
                ]
            },
            {
                id: 'research_collaboration',
                name: 'Implementing arXiv Paper QAOA',
                context: 'Quantum researcher shares paper: "Implement this QAOA variant for portfolio optimization"',
                entryPoint: 'notation',
                timeLimit: 1800, // 30 minutes
                audience: 'quantum_researchers',
                challenge: 'Translate mathematical formulation to working implementation',
                difficulty: 'advanced',
                objectives: [
                    'Parse mathematical notation correctly',
                    'Implement quantum algorithm in code',
                    'Verify circuit implementation matches theory',
                    'Explain algorithm intuition to collaborators'
                ]
            },
            {
                id: 'production_debugging',
                name: 'Quantum Circuit Failing in Production',
                context: 'Trading system alert: "Quantum optimization returning suboptimal results - 30% performance drop"',
                entryPoint: 'code',
                timeLimit: 900, // 15 minutes
                audience: 'engineering_team',
                challenge: 'Debug quantum implementation using circuit analysis',
                difficulty: 'intermediate',
                objectives: [
                    'Identify quantum circuit errors',
                    'Use visual debugging to find issues',
                    'Implement fixes in production code',
                    'Explain root cause to technical team'
                ]
            },
            {
                id: 'architecture_review',
                name: 'Quantum Solution Architecture Design',
                context: 'Technical lead: "Design quantum circuit architecture for new high-frequency trading algorithm"',
                entryPoint: 'circuit',
                timeLimit: 1200, // 20 minutes
                audience: 'quantum_engineers',
                challenge: 'Design optimal quantum circuit from performance requirements',
                difficulty: 'advanced',
                objectives: [
                    'Design efficient quantum circuit topology',
                    'Optimize for hardware constraints',
                    'Code implementation from circuit design',
                    'Present architectural decisions to team'
                ]
            },
            {
                id: 'stakeholder_meeting',
                name: 'Multi-Audience Technical Presentation',
                context: 'Room contains: CTO (technical), CFO (business), quantum researcher (academic)',
                entryPoint: 'random',
                timeLimit: 600, // 10 minutes
                audience: 'mixed_stakeholders',
                challenge: 'Fluidly switch representations based on audience questions',
                difficulty: 'expert',
                objectives: [
                    'Adapt explanation to audience expertise',
                    'Switch seamlessly between representations',
                    'Maintain technical accuracy across all levels',
                    'Build consensus among diverse stakeholders'
                ]
            },
            {
                id: 'client_consultation',
                name: 'Quantum Consulting Engagement',
                context: 'Client: "We heard quantum computing could help our supply chain optimization"',
                entryPoint: 'random',
                timeLimit: 1800, // 30 minutes
                audience: 'potential_clients',
                challenge: 'Assess feasibility and provide professional recommendation',
                difficulty: 'expert',
                objectives: [
                    'Evaluate quantum advantage potential',
                    'Provide honest feasibility assessment',
                    'Present classical alternatives if appropriate',
                    'Build client confidence in your expertise'
                ]
            }
        ];

        scenarioDefinitions.forEach(scenario => {
            this.scenarios.set(scenario.id, scenario);
        });
    }

    /**
     * Launch contextual entry challenge
     */
    launchScenario(scenarioId, options = {}) {
        const scenario = this.scenarios.get(scenarioId);
        if (!scenario) {
            throw new Error(`Scenario ${scenarioId} not found`);
        }

        // Determine entry point
        let entryPoint = scenario.entryPoint;
        if (entryPoint === 'random') {
            entryPoint = this.selectRandomEntryPoint(options.biasWeakest);
        }

        // Configure challenge context
        this.currentContext = {
            ...scenario,
            actualEntryPoint: entryPoint,
            startTime: Date.now(),
            interactions: [],
            currentPhase: 'entry',
            completedObjectives: []
        };

        // Record entry history for adaptation
        this.entryHistory.push({
            scenarioId,
            entryPoint,
            timestamp: Date.now(),
            userChoice: options.userSelected || false
        });

        // Configure sync engine for contextual entry
        this.syncEngine.setContextualEntry(scenarioId, entryPoint);

        // Display scenario interface
        this.displayScenarioInterface();

        // Start performance monitoring
        this.startPerformanceMonitoring();

        return this.currentContext;
    }

    /**
     * Select random entry point with bias toward weak representations
     */
    selectRandomEntryPoint(biasWeakest = true) {
        const representations = ['plainspeak', 'code', 'circuit', 'notation'];
        
        if (!biasWeakest || this.performanceMetrics.weakRepresentations.length === 0) {
            return representations[Math.floor(Math.random() * representations.length)];
        }

        // Weight selection toward weakest representations
        const weights = representations.map(rep => {
            if (this.performanceMetrics.weakRepresentations.includes(rep)) {
                return 3; // 3x weight for weak representations
            } else if (this.performanceMetrics.strongRepresentations.includes(rep)) {
                return 0.5; // Reduce weight for strong representations
            }
            return 1; // Normal weight
        });

        const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
        let random = Math.random() * totalWeight;

        for (let i = 0; i < representations.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return representations[i];
            }
        }

        return representations[0]; // Fallback
    }

    /**
     * Display scenario interface
     */
    displayScenarioInterface() {
        const scenario = this.currentContext;
        
        // Create scenario overlay
        const overlay = document.createElement('div');
        overlay.className = 'scenario-challenge-overlay';
        overlay.innerHTML = `
            <div class="scenario-challenge-modal">
                <div class="scenario-header">
                    <h2>${scenario.name}</h2>
                    <div class="scenario-meta">
                        <span class="difficulty-${scenario.difficulty}">${scenario.difficulty.toUpperCase()}</span>
                        <span class="audience">${scenario.audience.replace('_', ' ')}</span>
                        <span class="entry-point">Start: ${scenario.actualEntryPoint}</span>
                    </div>
                </div>
                
                <div class="scenario-context">
                    <h3>Professional Context</h3>
                    <p>${scenario.context}</p>
                </div>
                
                <div class="scenario-challenge">
                    <h3>Your Challenge</h3>
                    <p>${scenario.challenge}</p>
                </div>
                
                <div class="scenario-objectives">
                    <h3>Success Objectives</h3>
                    <ul>
                        ${scenario.objectives.map(obj => `<li class="objective" data-objective="${obj}">${obj}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="scenario-timer">
                    <div class="timer-display">
                        <span id="scenario-timer">${this.formatTime(scenario.timeLimit)}</span>
                        <div class="timer-progress">
                            <div class="timer-bar" id="timer-bar"></div>
                        </div>
                    </div>
                    <div class="scenario-actions">
                        <button onclick="contextualEntry.startChallenge()" class="start-button">Begin Challenge</button>
                        <button onclick="contextualEntry.skipScenario()" class="skip-button">Skip</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.scenarioOverlay = overlay;
    }

    /**
     * Start the actual challenge
     */
    startChallenge() {
        if (!this.currentContext) return;

        // Remove scenario overlay
        if (this.scenarioOverlay) {
            this.scenarioOverlay.remove();
        }

        // Start timer
        this.startChallengeTimer();

        // Configure entry point focus
        this.configureEntryPointFocus();

        // Begin performance tracking
        this.currentContext.challengeStartTime = Date.now();
        this.currentContext.currentPhase = 'active';

        console.log('Challenge started:', this.currentContext.name);
    }

    /**
     * Configure visual focus on entry point
     */
    configureEntryPointFocus() {
        const entryPoint = this.currentContext.actualEntryPoint;
        const panels = this.syncEngine.panels;

        // Reset all panels
        Object.keys(panels).forEach(key => {
            const panel = panels[key];
            if (panel) {
                panel.classList.remove('entry-focused', 'entry-locked');
            }
        });

        // Focus entry point
        if (panels[entryPoint]) {
            panels[entryPoint].classList.add('entry-focused');
            panels[entryPoint].focus();

            // Lock other panels initially
            Object.keys(panels).forEach(key => {
                if (key !== entryPoint && panels[key]) {
                    panels[key].classList.add('entry-locked');
                }
            });

            // Gradual unlock after entry activity
            setTimeout(() => {
                this.graduallyUnlockPanels(entryPoint);
            }, 3000);
        }
    }

    /**
     * Gradually unlock other panels as user engages
     */
    graduallyUnlockPanels(entryPoint) {
        const panels = this.syncEngine.panels;
        const unlockOrder = this.getUnlockOrder(entryPoint);

        unlockOrder.forEach((panelKey, index) => {
            setTimeout(() => {
                if (panels[panelKey]) {
                    panels[panelKey].classList.remove('entry-locked');
                    panels[panelKey].classList.add('entry-unlocking');
                    
                    setTimeout(() => {
                        panels[panelKey].classList.remove('entry-unlocking');
                    }, 1000);
                }
            }, index * 2000); // 2 second intervals
        });
    }

    /**
     * Determine optimal unlock order based on entry point
     */
    getUnlockOrder(entryPoint) {
        const unlockSequences = {
            'plainspeak': ['code', 'circuit', 'notation'],
            'code': ['circuit', 'plainspeak', 'notation'],
            'circuit': ['code', 'notation', 'plainspeak'],
            'notation': ['circuit', 'code', 'plainspeak']
        };

        return unlockSequences[entryPoint] || ['plainspeak', 'code', 'circuit'];
    }

    /**
     * Start challenge timer
     */
    startChallengeTimer() {
        if (!this.currentContext.timeLimit) return;

        let timeLeft = this.currentContext.timeLimit;
        const timerDisplay = document.getElementById('scenario-timer');
        const timerBar = document.getElementById('timer-bar');

        const timer = setInterval(() => {
            timeLeft--;
            
            if (timerDisplay) {
                timerDisplay.textContent = this.formatTime(timeLeft);
            }
            
            if (timerBar) {
                const progress = ((this.currentContext.timeLimit - timeLeft) / this.currentContext.timeLimit) * 100;
                timerBar.style.width = `${progress}%`;
            }

            if (timeLeft <= 0) {
                clearInterval(timer);
                this.completeChallenge('timeout');
            }
        }, 1000);

        this.challengeTimer = timer;
    }

    /**
     * Track user interactions and performance
     */
    startPerformanceMonitoring() {
        // Monitor representation switches
        this.syncEngine.addListener((update) => {
            this.trackInteraction(update);
        });

        // Monitor typing patterns and errors
        Object.keys(this.syncEngine.panels).forEach(panelKey => {
            const panel = this.syncEngine.panels[panelKey];
            if (panel && panel.tagName === 'TEXTAREA') {
                panel.addEventListener('input', (e) => {
                    this.trackTypingActivity(panelKey, e);
                });
            }
        });
    }

    /**
     * Track interaction patterns for assessment
     */
    trackInteraction(update) {
        if (!this.currentContext) return;

        const interaction = {
            timestamp: Date.now(),
            source: update.source,
            translations: Object.keys(update.translations),
            phase: this.currentContext.currentPhase,
            timeFromStart: Date.now() - this.currentContext.challengeStartTime
        };

        this.currentContext.interactions.push(interaction);

        // Update performance metrics
        this.updatePerformanceMetrics(interaction);

        // Check objective completion
        this.checkObjectiveCompletion(interaction);
    }

    /**
     * Track typing activity for cognitive load assessment
     */
    trackTypingActivity(panel, event) {
        if (!this.currentContext) return;

        const activity = {
            timestamp: Date.now(),
            panel,
            contentLength: event.target.value.length,
            timeFromStart: Date.now() - this.currentContext.challengeStartTime
        };

        // Track typing speed and accuracy patterns
        this.analyzeTypingPatterns(activity);
    }

    /**
     * Analyze typing patterns for cognitive agility assessment
     */
    analyzeTypingPatterns(activity) {
        // Calculate typing speed (words per minute)
        const wordsTyped = activity.contentLength / 5; // Average 5 characters per word
        const minutesElapsed = activity.timeFromStart / 60000;
        const wpm = minutesElapsed > 0 ? wordsTyped / minutesElapsed : 0;

        // Track representation switching frequency
        const currentPanel = activity.panel;
        const lastPanel = this.typingHistory.length > 0 ? 
            this.typingHistory[this.typingHistory.length - 1].panel : null;
        
        const isRepresentationSwitch = lastPanel && lastPanel !== currentPanel;

        // Store typing metrics
        this.typingHistory.push({
            ...activity,
            wpm: wpm,
            isRepresentationSwitch: isRepresentationSwitch
        });

        // Update cognitive agility metrics
        if (isRepresentationSwitch) {
            this.metrics.representationSwitches++;
            this.metrics.cognitiveAgility = this.calculateCognitiveAgility();
        }

        // Limit history size for performance
        if (this.typingHistory.length > 100) {
            this.typingHistory = this.typingHistory.slice(-50);
        }
    }

    /**
     * Calculate cognitive agility score based on typing patterns
     */
    calculateCognitiveAgility() {
        if (this.typingHistory.length < 10) return 0;

        const recentHistory = this.typingHistory.slice(-20);
        const switches = recentHistory.filter(h => h.isRepresentationSwitch).length;
        const avgWpm = recentHistory.reduce((sum, h) => sum + h.wpm, 0) / recentHistory.length;
        
        // Score based on representation switching frequency and maintained typing speed
        const switchScore = Math.min(switches / 5, 1) * 50; // Max 50 points for switching
        const speedScore = Math.min(avgWpm / 30, 1) * 50; // Max 50 points for speed (30 WPM baseline)
        
        return Math.round(switchScore + speedScore);
    }

    /**
     * Update performance metrics based on interactions
     */
    updatePerformanceMetrics(interaction) {
        // Track representation usage
        if (!this.performanceMetrics.entryPointPreferences[interaction.source]) {
            this.performanceMetrics.entryPointPreferences[interaction.source] = 0;
        }
        this.performanceMetrics.entryPointPreferences[interaction.source]++;

        // Track translation speeds
        interaction.translations.forEach(target => {
            const key = `${interaction.source}_to_${target}`;
            if (!this.performanceMetrics.translationSpeeds[key]) {
                this.performanceMetrics.translationSpeeds[key] = [];
            }
            this.performanceMetrics.translationSpeeds[key].push(interaction.timeFromStart);
        });

        // Identify weak and strong representations
        this.updateRepresentationStrengths();
    }

    /**
     * Update representation strength assessment
     */
    updateRepresentationStrengths() {
        const preferences = this.performanceMetrics.entryPointPreferences;
        const representations = Object.keys(preferences);
        
        if (representations.length < 2) return;

        const total = Object.values(preferences).reduce((sum, count) => sum + count, 0);
        const avgUsage = total / representations.length;

        this.performanceMetrics.weakRepresentations = representations.filter(rep => 
            preferences[rep] < avgUsage * 0.7
        );

        this.performanceMetrics.strongRepresentations = representations.filter(rep => 
            preferences[rep] > avgUsage * 1.3
        );
    }

    /**
     * Check if objectives are being completed
     */
    checkObjectiveCompletion(interaction) {
        // Implement objective tracking logic based on interaction patterns
        // This would analyze the content and interactions to determine progress
        
        const completedObjectives = this.analyzeObjectiveProgress();
        this.currentContext.completedObjectives = completedObjectives;
        
        // Update visual progress
        this.updateObjectiveProgress();
    }

    /**
     * Analyze objective completion based on interactions
     */
    analyzeObjectiveProgress() {
        if (!this.currentContext) return [];

        const interactions = this.currentContext.interactions;
        const objectives = this.currentContext.objectives;
        const completed = [];

        // Basic heuristics for objective completion
        const representationsUsed = new Set(interactions.map(i => i.source));
        const translationsMade = interactions.filter(i => i.translations.length > 0).length;

        objectives.forEach(objective => {
            if (objective.includes('business') && representationsUsed.has('plainspeak')) {
                completed.push(objective);
            }
            if (objective.includes('technical') && representationsUsed.has('code')) {
                completed.push(objective);
            }
            if (objective.includes('circuit') && representationsUsed.has('circuit')) {
                completed.push(objective);
            }
            if (objective.includes('mathematical') && representationsUsed.has('notation')) {
                completed.push(objective);
            }
            if (objective.includes('switch') && translationsMade > 3) {
                completed.push(objective);
            }
        });

        return completed;
    }

    /**
     * Update visual objective progress
     */
    updateObjectiveProgress() {
        const objectiveElements = document.querySelectorAll('.objective');
        objectiveElements.forEach(element => {
            const objective = element.getAttribute('data-objective');
            if (this.currentContext.completedObjectives.includes(objective)) {
                element.classList.add('completed');
            }
        });
    }

    /**
     * Complete challenge and provide assessment
     */
    completeChallenge(reason = 'manual') {
        if (!this.currentContext) return;

        // Stop timer
        if (this.challengeTimer) {
            clearInterval(this.challengeTimer);
        }

        // Calculate final metrics
        const assessment = this.generateAssessment(reason);

        // Display results
        this.displayAssessmentResults(assessment);

        // Update global performance metrics
        this.updateGlobalMetrics(assessment);

        // Reset context
        this.currentContext = null;

        return assessment;
    }

    /**
     * Generate performance assessment
     */
    generateAssessment(completionReason) {
        const context = this.currentContext;
        const timeSpent = Date.now() - context.challengeStartTime;
        const representationsUsed = new Set(context.interactions.map(i => i.source));
        const translationsMade = context.interactions.filter(i => i.translations.length > 0).length;

        const assessment = {
            scenario: context.name,
            completionReason,
            timeSpent,
            objectivesCompleted: context.completedObjectives.length,
            totalObjectives: context.objectives.length,
            representationsUsed: Array.from(representationsUsed),
            translationCount: translationsMade,
            quadraticFluency: this.calculateQuadraticFluency(),
            recommendations: this.generateRecommendations(),
            score: this.calculateOverallScore()
        };

        return assessment;
    }

    /**
     * Calculate quadratic fluency score
     */
    calculateQuadraticFluency() {
        const interactions = this.currentContext.interactions;
        const representations = ['plainspeak', 'code', 'circuit', 'notation'];
        
        const usageBalance = this.calculateUsageBalance(interactions, representations);
        const translationSpeed = this.calculateAverageTranslationSpeed(interactions);
        const errorRate = this.calculateErrorRate(interactions);

        return {
            balance: usageBalance,
            speed: translationSpeed,
            accuracy: 1 - errorRate,
            overall: (usageBalance + translationSpeed + (1 - errorRate)) / 3
        };
    }

    /**
     * Calculate usage balance across representations
     */
    calculateUsageBalance(interactions, representations) {
        const usage = {};
        representations.forEach(rep => usage[rep] = 0);
        
        interactions.forEach(interaction => {
            usage[interaction.source]++;
        });

        const total = Object.values(usage).reduce((sum, count) => sum + count, 0);
        if (total === 0) return 0;

        const idealUsage = total / representations.length;
        const variance = Object.values(usage).reduce((sum, count) => {
            return sum + Math.pow(count - idealUsage, 2);
        }, 0) / representations.length;

        return Math.max(0, 1 - (Math.sqrt(variance) / idealUsage));
    }

    /**
     * Calculate average translation speed
     */
    calculateAverageTranslationSpeed(interactions) {
        const translationTimes = interactions
            .filter(i => i.translations.length > 0)
            .map(i => i.timeFromStart);

        if (translationTimes.length === 0) return 0;

        const avgTime = translationTimes.reduce((sum, time) => sum + time, 0) / translationTimes.length;
        const maxTime = 30000; // 30 seconds

        return Math.max(0, 1 - (avgTime / maxTime));
    }

    /**
     * Calculate error rate (placeholder)
     */
    calculateErrorRate(interactions) {
        // Simplified error rate calculation
        // In practice, this would analyze synchronization errors, invalid translations, etc.
        return Math.random() * 0.1; // 0-10% error rate for demo
    }

    /**
     * Generate personalized recommendations
     */
    generateRecommendations() {
        const weakReps = this.performanceMetrics.weakRepresentations;
        const strongReps = this.performanceMetrics.strongRepresentations;
        const recommendations = [];

        if (weakReps.length > 0) {
            recommendations.push(`Practice contextual entry from: ${weakReps.join(', ')}`);
        }

        if (strongReps.length > 2) {
            recommendations.push('Try challenges starting from your weakest representations');
        }

        recommendations.push('Focus on faster translation between circuit diagrams and code');
        recommendations.push('Practice business communication of quantum concepts');

        return recommendations;
    }

    /**
     * Calculate overall performance score
     */
    calculateOverallScore() {
        const fluency = this.calculateQuadraticFluency();
        const objectiveRatio = this.currentContext.completedObjectives.length / this.currentContext.objectives.length;
        const timeEfficiency = Math.min(1, this.currentContext.timeLimit / (Date.now() - this.currentContext.challengeStartTime));

        return Math.round(((fluency.overall * 0.4) + (objectiveRatio * 0.4) + (timeEfficiency * 0.2)) * 100);
    }

    /**
     * Display assessment results
     */
    displayAssessmentResults(assessment) {
        const resultsOverlay = document.createElement('div');
        resultsOverlay.className = 'assessment-results-overlay';
        resultsOverlay.innerHTML = `
            <div class="assessment-results-modal">
                <h2>Challenge Assessment</h2>
                <div class="score-display">
                    <div class="overall-score">${assessment.score}/100</div>
                    <div class="score-label">Quadratic Fluency Score</div>
                </div>
                
                <div class="assessment-metrics">
                    <div class="metric">
                        <label>Objectives Completed</label>
                        <div class="metric-bar">
                            <div class="metric-fill" style="width: ${(assessment.objectivesCompleted/assessment.totalObjectives)*100}%"></div>
                        </div>
                        <span>${assessment.objectivesCompleted}/${assessment.totalObjectives}</span>
                    </div>
                    
                    <div class="metric">
                        <label>Representations Used</label>
                        <div class="representation-badges">
                            ${['plainspeak', 'code', 'circuit', 'notation'].map(rep => 
                                `<span class="rep-badge ${assessment.representationsUsed.includes(rep) ? 'used' : 'unused'}">${rep}</span>`
                            ).join('')}
                        </div>
                    </div>
                    
                    <div class="metric">
                        <label>Translation Fluency</label>
                        <div class="fluency-score">${Math.round(assessment.quadraticFluency.overall * 100)}%</div>
                    </div>
                </div>
                
                <div class="recommendations">
                    <h3>Personalized Recommendations</h3>
                    <ul>
                        ${assessment.recommendations.map(rec => `<li>${rec}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="assessment-actions">
                    <button onclick="contextualEntry.nextChallenge()" class="next-button">Next Challenge</button>
                    <button onclick="contextualEntry.closeAssessment()" class="close-button">Continue Practice</button>
                </div>
            </div>
        `;

        document.body.appendChild(resultsOverlay);
        this.resultsOverlay = resultsOverlay;
    }

    /**
     * Utility methods
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    skipScenario() {
        if (this.scenarioOverlay) {
            this.scenarioOverlay.remove();
        }
        this.currentContext = null;
    }

    nextChallenge() {
        if (this.resultsOverlay) {
            this.resultsOverlay.remove();
        }
        
        // Launch random scenario biased toward weak representations
        this.launchRandomScenario({ biasWeakest: true });
    }

    closeAssessment() {
        if (this.resultsOverlay) {
            this.resultsOverlay.remove();
        }
    }

    launchRandomScenario(options = {}) {
        const scenarioIds = Array.from(this.scenarios.keys());
        const randomId = scenarioIds[Math.floor(Math.random() * scenarioIds.length)];
        return this.launchScenario(randomId, options);
    }

    getPerformanceReport() {
        return {
            entryHistory: this.entryHistory,
            metrics: this.performanceMetrics,
            currentContext: this.currentContext
        };
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContextualEntrySystem;
}

// Global instance for direct HTML usage
window.ContextualEntrySystem = ContextualEntrySystem;