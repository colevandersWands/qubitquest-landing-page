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
        
        // Enhanced cognitive pattern tracking
        this.cognitivePatterns = {
            representationPreferences: new Map(),
            transitionPatterns: [],
            errorPatterns: [],
            learningVelocity: [],
            decisionMakingSpeed: [],
            conceptualLeaps: [],
            cognitiveLoad: []
        };
        this.metrics = {
            representationSwitches: 0,
            cognitiveAgility: 0,
            avgTypingSpeed: 0,
            fluencyScore: 0
        };
        
        // Professional competency scoring system
        this.professionalCompetency = {
            quadraticFluency: {
                current: 0,
                history: [],
                components: {
                    translationSpeed: 0,
                    translationAccuracy: 0,
                    representationBalance: 0,
                    contextualAdaptation: 0
                }
            },
            businessCommunication: {
                current: 0,
                history: [],
                components: {
                    stakeholderAdaptation: 0,
                    technicalTranslation: 0,
                    professionalLanguage: 0,
                    persuasiveClarity: 0
                }
            },
            technicalImplementation: {
                current: 0,
                history: [],
                components: {
                    codingProficiency: 0,
                    debuggingSkills: 0,
                    architecturalThinking: 0,
                    algorithmicUnderstanding: 0
                }
            },
            strategicThinking: {
                current: 0,
                history: [],
                components: {
                    problemIdentification: 0,
                    solutionEvaluation: 0,
                    riskAssessment: 0,
                    timelineRealism: 0
                }
            },
            cognitiveAgility: {
                current: 0,
                history: [],
                components: {
                    adaptationSpeed: 0,
                    pressureHandling: 0,
                    multiTasking: 0,
                    learningVelocity: 0
                }
            }
        };
        
        // Real-time feedback system
        this.realTimeFeedback = {
            active: false,
            feedbackQueue: [],
            lastFeedbackTime: 0,
            feedbackThrottleMs: 5000, // 5 seconds between feedback
            visualIndicators: new Map()
        };
        
        // 5-Phase Learning Cycle Management
        this.learningPhases = ['hook', 'contrast', 'concepts', 'practice', 'reality'];
        this.currentPhase = 'hook';
        this.phaseProgress = {
            hook: { status: 'pending', startTime: null, endTime: null, completed: false },
            contrast: { status: 'pending', startTime: null, endTime: null, completed: false },
            concepts: { status: 'pending', startTime: null, endTime: null, completed: false },
            practice: { status: 'pending', startTime: null, endTime: null, completed: false },
            reality: { status: 'pending', startTime: null, endTime: null, completed: false }
        };
        this.phaseObjectives = this.initializePhaseObjectives();
        this.phaseTemplates = this.initializePhaseTemplates();
        
        this.initializeScenarios();
        
        // Initialize "The Ambush" assessment capabilities
        this.ambushScenarios = new Map();
        this.initializeAmbushScenarios();
        this.ambushActive = false;
        this.ambushStartTime = null;
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
     * Initialize "The Ambush" assessment scenarios - rapid 5-minute quantum feasibility assessments
     */
    initializeAmbushScenarios() {
        const ambushDefinitions = [
            {
                id: 'trading_algorithm_ambush',
                name: 'Quantum Trading Algorithm Assessment',
                context: 'CTO drops by: "I read quantum computing could speed up our trading algorithms 1000x. True or false? We need to decide on $5M budget allocation by Friday."',
                timeLimit: 300, // 5 minutes exactly
                expectedDeliverables: [
                    'Feasibility assessment (realistic timeline)',
                    'Technical requirements analysis', 
                    'Business case with ROI projection',
                    'Risk assessment and mitigation plan'
                ],
                successCriteria: {
                    accuracy: 'Provides realistic assessment of quantum advantage',
                    completeness: 'Addresses all four deliverables',
                    professionalism: 'Maintains credibility and confidence',
                    timeliness: 'Completes within 5-minute deadline'
                },
                difficulty: 'expert',
                industry: 'finance'
            },
            {
                id: 'supply_chain_ambush',
                name: 'Quantum Supply Chain Optimization',
                context: 'Board meeting interrupted: "Competitor announced quantum supply chain optimization saving $50M annually. Should we panic? What\'s our response by lunch?"',
                timeLimit: 300,
                expectedDeliverables: [
                    'Competitive threat analysis',
                    'Quantum optimization feasibility for our use case',
                    'Implementation roadmap',
                    'Immediate tactical response plan'
                ],
                successCriteria: {
                    strategicThinking: 'Assesses competitive landscape accurately',
                    technicalDepth: 'Understands quantum optimization limitations',
                    businessAcumen: 'Provides actionable strategic recommendations',
                    composure: 'Handles pressure professionally'
                },
                difficulty: 'expert',
                industry: 'logistics'
            },
            {
                id: 'drug_discovery_ambush',
                name: 'Quantum Drug Discovery Consultation',
                context: 'Pharmaceutical client: "Google says quantum computers will revolutionize drug discovery. We have a $100M R&D budget. How much should go to quantum? Need answer before investor call."',
                timeLimit: 300,
                expectedDeliverables: [
                    'Technology readiness assessment',
                    'Budget allocation recommendation',
                    'Partnership vs in-house analysis',
                    'Timeline for quantum advantage'
                ],
                successCriteria: {
                    honesty: 'Provides realistic timeline expectations',
                    expertise: 'Demonstrates deep quantum chemistry knowledge',
                    communication: 'Translates complex concepts clearly',
                    advisorySkills: 'Provides confident strategic guidance'
                },
                difficulty: 'expert',
                industry: 'pharmaceutical'
            },
            {
                id: 'cybersecurity_ambush',
                name: 'Quantum Security Breach Response',
                context: 'CISO urgent call: "News says quantum computers will break all our encryption. Should we be worried? Board wants risk assessment in 10 minutes, but I need your take first."',
                timeLimit: 300,
                expectedDeliverables: [
                    'Current encryption vulnerability assessment',
                    'Quantum threat timeline evaluation',
                    'Post-quantum cryptography roadmap',
                    'Immediate security measures recommendation'
                ],
                successCriteria: {
                    urgency: 'Responds appropriately to security concerns',
                    precision: 'Provides accurate technical timeline',
                    practicality: 'Offers implementable solutions',
                    authority: 'Demonstrates security expertise'
                },
                difficulty: 'expert',
                industry: 'cybersecurity'
            }
        ];

        ambushDefinitions.forEach(scenario => {
            this.ambushScenarios.set(scenario.id, scenario);
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
     * Launch "The Ambush" - rapid 5-minute quantum feasibility assessment
     */
    launchAmbush(ambushId = null, options = {}) {
        // Select random ambush scenario if none specified
        if (!ambushId) {
            const ambushIds = Array.from(this.ambushScenarios.keys());
            ambushId = ambushIds[Math.floor(Math.random() * ambushIds.length)];
        }

        const ambush = this.ambushScenarios.get(ambushId);
        if (!ambush) {
            throw new Error(`Ambush scenario ${ambushId} not found`);
        }

        // Configure ambush context
        this.ambushActive = true;
        this.ambushStartTime = Date.now();
        this.currentContext = {
            ...ambush,
            type: 'ambush',
            actualEntryPoint: 'ambush_mode',
            startTime: Date.now(),
            interactions: [],
            currentPhase: 'ambush_active',
            deliverables: [],
            professionalCompetencyTracking: {
                quadraticFluency: 0,
                businessCommunication: 0,
                technicalImplementation: 0,
                strategicThinking: 0,
                cognitiveAgility: 0
            }
        };

        // Record ambush in entry history
        this.entryHistory.push({
            scenarioId: ambushId,
            entryPoint: 'ambush_mode',
            timestamp: Date.now(),
            type: 'ambush',
            timeLimit: ambush.timeLimit
        });

        // Display ambush interface
        this.displayAmbushInterface();

        // Start intensive performance monitoring
        this.startAmbushMonitoring();

        console.log('The Ambush launched:', ambush.name);
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
     * Display "The Ambush" interface with high-pressure professional context
     */
    displayAmbushInterface() {
        const ambush = this.currentContext;
        
        // Create high-intensity ambush overlay
        const overlay = document.createElement('div');
        overlay.className = 'ambush-overlay critical-assessment';
        overlay.innerHTML = `
            <div class="ambush-modal">
                <div class="ambush-header critical">
                    <div class="crisis-indicator">⚡ THE AMBUSH ⚡</div>
                    <h2>${ambush.name}</h2>
                    <div class="ambush-meta">
                        <span class="industry-badge">${ambush.industry.toUpperCase()}</span>
                        <span class="difficulty-badge expert">EXPERT LEVEL</span>
                        <span class="time-pressure">5 MINUTES ONLY</span>
                    </div>
                </div>
                
                <div class="crisis-context">
                    <h3>🚨 URGENT PROFESSIONAL SCENARIO</h3>
                    <div class="scenario-backdrop">
                        <p>${ambush.context}</p>
                    </div>
                </div>
                
                <div class="deliverables-checklist">
                    <h3>Required Deliverables (5 minutes)</h3>
                    <ul class="deliverable-list">
                        ${ambush.expectedDeliverables.map((deliverable, index) => 
                            `<li class="deliverable-item" data-deliverable="${index}">
                                <span class="deliverable-checkbox">☐</span>
                                ${deliverable}
                            </li>`
                        ).join('')}
                    </ul>
                </div>
                
                <div class="success-criteria">
                    <h3>Professional Success Criteria</h3>
                    <div class="criteria-grid">
                        ${Object.entries(ambush.successCriteria).map(([key, description]) => 
                            `<div class="criteria-item">
                                <strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong>
                                <span>${description}</span>
                            </div>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="ambush-countdown">
                    <div class="countdown-display">
                        <span id="ambush-countdown">5:00</span>
                        <div class="countdown-progress">
                            <div class="countdown-bar" id="countdown-bar"></div>
                        </div>
                    </div>
                    <div class="ambush-actions">
                        <button onclick="contextualEntry.startAmbush()" class="start-button critical">
                            BEGIN ASSESSMENT
                        </button>
                        <button onclick="contextualEntry.skipAmbush()" class="skip-button">
                            Not Ready
                        </button>
                    </div>
                </div>
                
                <div class="professional-warning">
                    <strong>⚠️ Assessment Notice:</strong> Your response will be evaluated on professional competency, 
                    technical accuracy, and ability to perform under pressure. This simulates real workplace quantum consulting scenarios.
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.ambushOverlay = overlay;
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
     * Start "The Ambush" assessment with intensive monitoring
     */
    startAmbush() {
        if (!this.ambushActive || !this.currentContext) return;

        // Remove ambush overlay
        if (this.ambushOverlay) {
            this.ambushOverlay.remove();
        }

        // Start countdown timer
        this.startAmbushCountdown();

        // Configure all panels for ambush mode
        this.configureAmbushMode();

        // Begin intensive performance tracking
        this.currentContext.challengeStartTime = Date.now();
        this.currentContext.currentPhase = 'ambush_active';

        // Initialize professional competency tracking
        this.startProfessionalCompetencyTracking();

        console.log('The Ambush started:', this.currentContext.name);
    }

    /**
     * Start intensive professional competency monitoring for ambush mode
     */
    startAmbushMonitoring() {
        // Enhanced monitoring for professional scenarios
        this.ambushMetrics = {
            keystrokes: 0,
            representationSwitches: 0,
            decisionPoints: [],
            professionalLanguageUsage: 0,
            technicalAccuracy: 0,
            businessContextAwareness: 0,
            urgencyHandling: 0
        };

        // Monitor all interactions with higher sensitivity
        this.syncEngine.addListener((update) => {
            this.trackAmbushInteraction(update);
        });

        // Monitor professional communication patterns
        Object.keys(this.syncEngine.panels).forEach(panelKey => {
            const panel = this.syncEngine.panels[panelKey];
            if (panel && panel.tagName === 'TEXTAREA') {
                panel.addEventListener('input', (e) => {
                    this.trackAmbushTyping(panelKey, e);
                });
                panel.addEventListener('focus', (e) => {
                    this.trackAmbushFocus(panelKey);
                });
            }
        });
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

        // Enhanced cognitive pattern tracking
        this.trackCognitivePatterns(interaction);

        // Update professional competency scores
        this.updateProfessionalCompetencyScores(interaction);

        // Provide real-time feedback
        this.processRealTimeFeedback(interaction);

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

    /**
     * Track ambush-specific interactions for professional competency assessment
     */
    trackAmbushInteraction(update) {
        if (!this.ambushActive) return;

        const interaction = {
            timestamp: Date.now(),
            source: update.source,
            translations: Object.keys(update.translations),
            phase: 'ambush_active',
            timeFromStart: Date.now() - this.currentContext.challengeStartTime,
            professionalContext: true
        };

        this.currentContext.interactions.push(interaction);
        this.ambushMetrics.representationSwitches++;

        // Update professional competency tracking in real-time
        this.updateProfessionalCompetencyScores(interaction);
    }

    /**
     * Track typing patterns specific to professional pressure scenarios
     */
    trackAmbushTyping(panel, event) {
        if (!this.ambushActive) return;

        this.ambushMetrics.keystrokes++;
        
        const content = event.target.value;
        const activity = {
            timestamp: Date.now(),
            panel,
            contentLength: content.length,
            timeFromStart: Date.now() - this.currentContext.challengeStartTime,
            professionalLanguageDetected: this.detectProfessionalLanguage(content),
            businessTermsUsed: this.detectBusinessTerms(content),
            technicalAccuracy: this.assessTechnicalAccuracy(content, panel)
        };

        // Update ambush-specific metrics
        this.updateAmbushMetrics(activity);
    }

    /**
     * Track panel focus patterns during ambush (strategic thinking assessment)
     */
    trackAmbushFocus(panelKey) {
        if (!this.ambushActive) return;

        this.ambushMetrics.decisionPoints.push({
            timestamp: Date.now(),
            panel: panelKey,
            timeFromStart: Date.now() - this.currentContext.challengeStartTime,
            sequenceNumber: this.ambushMetrics.decisionPoints.length + 1
        });

        // Analyze strategic thinking patterns
        this.analyzeStrategicThinkingPattern();
    }

    /**
     * Update professional competency scores in real-time
     */
    updateProfessionalCompetencyScores(interaction) {
        const competency = this.currentContext.professionalCompetencyTracking;
        const timeElapsed = interaction.timeFromStart / 1000; // seconds

        // Quadratic Fluency: representation switching speed and accuracy
        if (interaction.translations.length > 1) {
            const fluencyScore = Math.max(0, 100 - (timeElapsed / 10)); // Penalty for slow switching
            competency.quadraticFluency = Math.max(competency.quadraticFluency, fluencyScore);
        }

        // Cognitive Agility: adaptation to pressure and complexity
        const agilityScore = Math.min(100, (interaction.translations.length * 20) + (100 - timeElapsed));
        competency.cognitiveAgility = Math.max(competency.cognitiveAgility, agilityScore);

        // Update visual indicators
        this.updateCompetencyVisuals();
    }

    /**
     * Detect professional language usage for business communication scoring
     */
    detectProfessionalLanguage(content) {
        const professionalTerms = [
            'ROI', 'feasibility', 'implementation', 'roadmap', 'strategy', 'competitive advantage',
            'business case', 'cost-benefit', 'timeline', 'deliverables', 'stakeholders', 'risk assessment',
            'budget allocation', 'revenue impact', 'operational efficiency', 'scalability', 'integration'
        ];

        const contentLower = content.toLowerCase();
        const termsUsed = professionalTerms.filter(term => 
            contentLower.includes(term.toLowerCase())
        );

        return termsUsed.length / professionalTerms.length;
    }

    /**
     * Detect business terms specific to industry context
     */
    detectBusinessTerms(content) {
        const industry = this.currentContext.industry;
        const industryTerms = {
            'finance': ['portfolio', 'trading', 'risk', 'return', 'correlation', 'volatility', 'arbitrage'],
            'logistics': ['supply chain', 'optimization', 'distribution', 'inventory', 'route', 'logistics'],
            'pharmaceutical': ['drug discovery', 'clinical trials', 'FDA', 'molecular', 'compound', 'efficacy'],
            'cybersecurity': ['encryption', 'security', 'threat', 'vulnerability', 'compliance', 'breach']
        };

        const terms = industryTerms[industry] || [];
        const contentLower = content.toLowerCase();
        const termsUsed = terms.filter(term => contentLower.includes(term));

        return termsUsed.length / terms.length;
    }

    /**
     * Start ambush countdown with visual pressure indicators
     */
    startAmbushCountdown() {
        if (!this.currentContext || this.currentContext.type !== 'ambush') return;

        let timeLeft = this.currentContext.timeLimit;
        const countdownDisplay = document.getElementById('ambush-countdown');
        const countdownBar = document.getElementById('countdown-bar');

        const timer = setInterval(() => {
            timeLeft--;
            
            if (countdownDisplay) {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                countdownDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                // Add visual urgency as time runs out
                if (timeLeft < 60) {
                    countdownDisplay.classList.add('critical-time');
                }
                if (timeLeft < 30) {
                    countdownDisplay.classList.add('final-countdown');
                }
            }
            
            if (countdownBar) {
                const progress = ((this.currentContext.timeLimit - timeLeft) / this.currentContext.timeLimit) * 100;
                countdownBar.style.width = `${progress}%`;
                
                // Color progression from green to red
                if (progress > 80) {
                    countdownBar.style.backgroundColor = '#ff4444';
                } else if (progress > 60) {
                    countdownBar.style.backgroundColor = '#ff8844';
                } else {
                    countdownBar.style.backgroundColor = '#44ff44';
                }
            }

            if (timeLeft <= 0) {
                clearInterval(timer);
                this.completeAmbush('timeout');
            }
        }, 1000);

        this.ambushTimer = timer;
    }

    /**
     * Complete ambush assessment with professional competency evaluation
     */
    completeAmbush(reason = 'completed') {
        if (!this.ambushActive) return;

        // Stop timer
        if (this.ambushTimer) {
            clearInterval(this.ambushTimer);
        }

        // Calculate comprehensive professional assessment
        const assessment = this.generateAmbushAssessment(reason);

        // Display professional competency results
        this.displayAmbushResults(assessment);

        // Update global performance metrics
        this.updateProfessionalMetrics(assessment);

        // Reset ambush state
        this.ambushActive = false;
        this.ambushStartTime = null;
        this.currentContext = null;

        return assessment;
    }

    /**
     * Generate comprehensive ambush assessment
     */
    generateAmbushAssessment(completionReason) {
        const context = this.currentContext;
        const timeSpent = Date.now() - context.challengeStartTime;
        const deliverables = this.assessDeliverables();
        
        const assessment = {
            scenario: context.name,
            industry: context.industry,
            completionReason,
            timeSpent,
            timeEfficiency: context.timeLimit / (timeSpent / 1000),
            deliverables: deliverables,
            professionalCompetency: this.calculateProfessionalCompetency(),
            successCriteriaEvaluation: this.evaluateSuccessCriteria(),
            overallScore: 0,
            professionalReadiness: 'Unknown',
            recommendations: [],
            nextSteps: []
        };

        // Calculate overall score
        assessment.overallScore = this.calculateAmbushScore(assessment);
        
        // Determine professional readiness level
        assessment.professionalReadiness = this.determineProfessionalReadiness(assessment.overallScore);
        
        // Generate personalized recommendations
        assessment.recommendations = this.generateAmbushRecommendations(assessment);

        return assessment;
    }

    skipAmbush() {
        if (this.ambushOverlay) {
            this.ambushOverlay.remove();
        }
        this.ambushActive = false;
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
            currentContext: this.currentContext,
            ambushCapabilities: this.getAmbushCapabilities()
        };
    }

    /**
     * Get available ambush scenarios and professional competency status
     */
    getAmbushCapabilities() {
        return {
            availableScenarios: Array.from(this.ambushScenarios.keys()),
            scenarios: Array.from(this.ambushScenarios.values()),
            isAmbushActive: this.ambushActive,
            professionalReadiness: this.calculateCurrentProfessionalReadiness()
        };
    }

    /**
     * Calculate current professional readiness level
     */
    calculateCurrentProfessionalReadiness() {
        const completedAmbushes = this.entryHistory.filter(entry => entry.type === 'ambush').length;
        const averagePerformance = this.getAverageAmbushPerformance();
        
        if (completedAmbushes === 0) {
            return 'Untested';
        } else if (averagePerformance > 85) {
            return 'Expert Consultant';
        } else if (averagePerformance > 70) {
            return 'Senior Professional';
        } else if (averagePerformance > 55) {
            return 'Professional';
        } else {
            return 'Developing';
        }
    }

    /**
     * Helper methods for ambush assessment (simplified implementations)
     */
    
    assessDeliverables() {
        // Simplified assessment - in production would use NLP and content analysis
        return {
            completed: Math.floor(Math.random() * 4) + 1, // 1-4 deliverables completed
            total: 4,
            quality: Math.random() * 0.4 + 0.6 // 0.6-1.0 quality score
        };
    }

    calculateProfessionalCompetency() {
        const competency = this.currentContext?.professionalCompetencyTracking || {};
        return {
            quadraticFluency: competency.quadraticFluency || Math.random() * 40 + 60,
            businessCommunication: competency.businessCommunication || Math.random() * 40 + 60,
            technicalImplementation: competency.technicalImplementation || Math.random() * 40 + 60,
            strategicThinking: competency.strategicThinking || Math.random() * 40 + 60,
            cognitiveAgility: competency.cognitiveAgility || Math.random() * 40 + 60
        };
    }

    evaluateSuccessCriteria() {
        // Simplified evaluation - production would analyze actual performance
        const criteria = this.currentContext?.successCriteria || {};
        const evaluation = {};
        
        Object.keys(criteria).forEach(criterion => {
            evaluation[criterion] = {
                score: Math.random() * 0.4 + 0.6, // 0.6-1.0
                feedback: `Performance in ${criterion} shows professional competency`,
                passingGrade: Math.random() > 0.3
            };
        });
        
        return evaluation;
    }

    calculateAmbushScore(assessment) {
        const deliverableScore = (assessment.deliverables.completed / assessment.deliverables.total) * 25;
        const competencyScore = Object.values(assessment.professionalCompetency).reduce((sum, score) => sum + score, 0) / 5 * 0.6;
        const timeScore = Math.min(25, assessment.timeEfficiency * 25);
        const criteriaScore = Object.values(assessment.successCriteriaEvaluation).reduce((sum, evaluation) => sum + evaluation.score, 0) / Object.keys(assessment.successCriteriaEvaluation).length * 25;
        
        return Math.round(deliverableScore + competencyScore + timeScore + criteriaScore);
    }

    determineProfessionalReadiness(score) {
        if (score >= 90) return 'Expert Consultant';
        if (score >= 80) return 'Senior Professional';
        if (score >= 70) return 'Professional';
        if (score >= 60) return 'Developing Professional';
        return 'Needs Development';
    }

    generateAmbushRecommendations(assessment) {
        const recommendations = [];
        
        if (assessment.overallScore < 70) {
            recommendations.push('Focus on developing professional communication under pressure');
        }
        
        if (assessment.deliverables.completed < 3) {
            recommendations.push('Practice structuring comprehensive responses within time constraints');
        }
        
        if (assessment.timeEfficiency < 0.8) {
            recommendations.push('Work on decision-making speed and prioritization');
        }
        
        recommendations.push('Continue practicing with industry-specific ambush scenarios');
        
        return recommendations;
    }

    getAverageAmbushPerformance() {
        // Simplified - would track actual performance history
        return Math.random() * 30 + 60; // 60-90 range
    }

    // Placeholder methods for referenced functions
    assessTechnicalAccuracy(content, panel) {
        return Math.random() * 0.4 + 0.6; // 0.6-1.0
    }

    updateAmbushMetrics(activity) {
        if (activity.professionalLanguageDetected > 0.5) {
            this.ambushMetrics.professionalLanguageUsage++;
        }
        if (activity.businessTermsUsed > 0.3) {
            this.ambushMetrics.businessContextAwareness++;
        }
    }

    analyzeStrategicThinkingPattern() {
        // Analyze the sequence and timing of panel focuses for strategic thinking assessment
        const recentDecisions = this.ambushMetrics.decisionPoints.slice(-5);
        // Implementation would analyze patterns for strategic thinking evaluation
    }

    updateCompetencyVisuals() {
        // Update real-time visual indicators of professional competency
        // Implementation would update dashboard metrics in real-time
    }

    startProfessionalCompetencyTracking() {
        // Initialize enhanced tracking for professional scenarios
        this.professionalTrackingActive = true;
    }

    configureAmbushMode() {
        // Configure all panels for high-pressure ambush assessment mode
        Object.values(this.syncEngine.panels).forEach(panel => {
            if (panel) {
                panel.style.borderColor = '#ff4444'; // Red border for urgency
                panel.classList.add('ambush-mode');
            }
        });
    }

    displayAmbushResults(assessment) {
        // Display comprehensive ambush assessment results
        console.log('Ambush Assessment Complete:', assessment);
        // Implementation would show detailed professional competency results
    }

    updateProfessionalMetrics(assessment) {
        // Update global professional competency metrics
        this.performanceMetrics.professionalAssessments = this.performanceMetrics.professionalAssessments || [];
        this.performanceMetrics.professionalAssessments.push(assessment);
    }

    /**
     * Track advanced cognitive patterns for professional development assessment
     */
    trackCognitivePatterns(interaction) {
        const timestamp = Date.now();
        const source = interaction.source;
        const timeFromStart = interaction.timeFromStart;

        // 1. Track representation preferences and evolution
        this.updateRepresentationPreferences(source, timestamp);

        // 2. Analyze transition patterns between representations
        this.analyzeTransitionPatterns(interaction);

        // 3. Track learning velocity and conceptual leaps
        this.trackLearningVelocity(interaction);

        // 4. Monitor decision-making speed
        this.trackDecisionMakingSpeed(interaction);

        // 5. Assess cognitive load based on timing and complexity
        this.assessCognitiveLoad(interaction);

        // 6. Detect error patterns and recovery strategies
        this.detectErrorPatterns(interaction);
    }

    /**
     * Update representation preferences over time
     */
    updateRepresentationPreferences(representation, timestamp) {
        if (!this.cognitivePatterns.representationPreferences.has(representation)) {
            this.cognitivePatterns.representationPreferences.set(representation, {
                count: 0,
                totalTime: 0,
                firstUse: timestamp,
                lastUse: timestamp,
                proficiencyGrowth: []
            });
        }

        const pref = this.cognitivePatterns.representationPreferences.get(representation);
        pref.count++;
        pref.lastUse = timestamp;
        
        // Calculate proficiency growth rate
        const timeSinceFirst = timestamp - pref.firstUse;
        const proficiencyRate = pref.count / (timeSinceFirst / 60000); // uses per minute
        pref.proficiencyGrowth.push({
            timestamp,
            rate: proficiencyRate,
            cumulativeUse: pref.count
        });

        // Keep only recent proficiency data
        if (pref.proficiencyGrowth.length > 20) {
            pref.proficiencyGrowth = pref.proficiencyGrowth.slice(-10);
        }
    }

    /**
     * Analyze cognitive transition patterns between representations
     */
    analyzeTransitionPatterns(interaction) {
        const recentInteractions = this.currentContext.interactions.slice(-3);
        
        if (recentInteractions.length >= 2) {
            const previousSource = recentInteractions[recentInteractions.length - 2].source;
            const currentSource = interaction.source;
            const transitionTime = interaction.timeFromStart - recentInteractions[recentInteractions.length - 2].timeFromStart;

            const transition = {
                from: previousSource,
                to: currentSource,
                time: transitionTime,
                timestamp: Date.now(),
                efficiency: this.calculateTransitionEfficiency(previousSource, currentSource, transitionTime),
                cognitiveDistance: this.calculateCognitiveDistance(previousSource, currentSource)
            };

            this.cognitivePatterns.transitionPatterns.push(transition);

            // Analyze transition efficiency trends
            this.analyzeTransitionTrends();

            // Keep patterns manageable
            if (this.cognitivePatterns.transitionPatterns.length > 50) {
                this.cognitivePatterns.transitionPatterns = this.cognitivePatterns.transitionPatterns.slice(-25);
            }
        }
    }

    /**
     * Track learning velocity - how quickly concepts are grasped
     */
    trackLearningVelocity(interaction) {
        const translationCount = interaction.translations.length;
        const complexity = this.assessInteractionComplexity(interaction);
        
        const velocityPoint = {
            timestamp: Date.now(),
            timeFromStart: interaction.timeFromStart,
            complexity: complexity,
            translationCount: translationCount,
            velocity: translationCount / (interaction.timeFromStart / 1000), // translations per second
            qualitativeLeap: this.detectConceptualLeap(interaction)
        };

        this.cognitivePatterns.learningVelocity.push(velocityPoint);

        // Track conceptual leaps separately
        if (velocityPoint.qualitativeLeap) {
            this.cognitivePatterns.conceptualLeaps.push({
                timestamp: Date.now(),
                interaction: interaction,
                leapType: velocityPoint.qualitativeLeap,
                significance: this.assessLeapSignificance(interaction)
            });
        }

        // Maintain reasonable data size
        if (this.cognitivePatterns.learningVelocity.length > 100) {
            this.cognitivePatterns.learningVelocity = this.cognitivePatterns.learningVelocity.slice(-50);
        }
    }

    /**
     * Track decision-making speed for different types of cognitive tasks
     */
    trackDecisionMakingSpeed(interaction) {
        const decisionType = this.classifyDecisionType(interaction);
        const decisionSpeed = this.calculateDecisionSpeed(interaction);

        const decisionPoint = {
            timestamp: Date.now(),
            type: decisionType,
            speed: decisionSpeed,
            context: interaction.source,
            complexity: this.assessInteractionComplexity(interaction),
            confidence: this.assessDecisionConfidence(interaction)
        };

        this.cognitivePatterns.decisionMakingSpeed.push(decisionPoint);

        // Analyze decision patterns by type
        this.analyzeLearnerDecisionPatterns();

        // Maintain manageable size
        if (this.cognitivePatterns.decisionMakingSpeed.length > 75) {
            this.cognitivePatterns.decisionMakingSpeed = this.cognitivePatterns.decisionMakingSpeed.slice(-40);
        }
    }

    /**
     * Assess cognitive load based on timing, errors, and complexity
     */
    assessCognitiveLoad(interaction) {
        const recentInteractions = this.currentContext.interactions.slice(-5);
        const avgTransitionTime = recentInteractions.length > 1 ? 
            recentInteractions.reduce((sum, int, idx) => {
                if (idx === 0) return sum;
                return sum + (int.timeFromStart - recentInteractions[idx-1].timeFromStart);
            }, 0) / (recentInteractions.length - 1) : 0;

        const cognitiveLoad = {
            timestamp: Date.now(),
            overallLoad: this.calculateOverallCognitiveLoad(interaction, avgTransitionTime),
            representationSpecificLoad: this.calculateRepresentationLoad(interaction.source),
            complexityLoad: this.assessInteractionComplexity(interaction),
            temporalLoad: avgTransitionTime > 10000 ? 'high' : avgTransitionTime > 5000 ? 'medium' : 'low',
            errorIndicators: this.detectCognitiveStress(interaction)
        };

        this.cognitivePatterns.cognitiveLoad.push(cognitiveLoad);

        // Detect cognitive overload patterns
        this.detectCognitiveOverload();

        // Maintain recent history
        if (this.cognitivePatterns.cognitiveLoad.length > 60) {
            this.cognitivePatterns.cognitiveLoad = this.cognitivePatterns.cognitiveLoad.slice(-30);
        }
    }

    /**
     * Detect error patterns and learning from mistakes
     */
    detectErrorPatterns(interaction) {
        const hasErrors = this.detectInteractionErrors(interaction);
        
        if (hasErrors) {
            const errorPattern = {
                timestamp: Date.now(),
                interaction: interaction,
                errorType: this.classifyErrorType(interaction),
                representation: interaction.source,
                context: this.currentContext.currentPhase,
                recovery: this.assessErrorRecovery(interaction)
            };

            this.cognitivePatterns.errorPatterns.push(errorPattern);

            // Analyze error learning patterns
            this.analyzeErrorLearning();

            // Maintain error history
            if (this.cognitivePatterns.errorPatterns.length > 30) {
                this.cognitivePatterns.errorPatterns = this.cognitivePatterns.errorPatterns.slice(-15);
            }
        }
    }

    /**
     * Helper methods for cognitive pattern analysis
     */
    
    calculateTransitionEfficiency(fromRep, toRep, time) {
        const baselineTime = 3000; // 3 seconds baseline
        const cognitiveDistance = this.calculateCognitiveDistance(fromRep, toRep);
        const expectedTime = baselineTime * cognitiveDistance;
        return Math.max(0, (expectedTime - time) / expectedTime);
    }

    calculateCognitiveDistance(rep1, rep2) {
        const distances = {
            'plainspeak-code': 0.7,
            'plainspeak-circuit': 0.9,
            'plainspeak-notation': 1.0,
            'code-circuit': 0.6,
            'code-notation': 0.8,
            'circuit-notation': 0.5
        };
        
        const key = [rep1, rep2].sort().join('-');
        return distances[key] || 0.5;
    }

    assessInteractionComplexity(interaction) {
        const translationCount = interaction.translations.length;
        const sourceComplexity = this.getRepresentationComplexity(interaction.source);
        const timeComplexity = interaction.timeFromStart > 30000 ? 1.2 : 1.0;
        
        return (translationCount * 0.3 + sourceComplexity * 0.5 + timeComplexity * 0.2);
    }

    getRepresentationComplexity(representation) {
        const complexity = {
            'plainspeak': 0.3,
            'code': 0.7,
            'circuit': 0.8,
            'notation': 1.0
        };
        return complexity[representation] || 0.5;
    }

    detectConceptualLeap(interaction) {
        const recentTranslations = this.currentContext.interactions.slice(-3)
            .reduce((sum, int) => sum + int.translations.length, 0);
        
        if (recentTranslations >= 6) return 'multi_representation_fluency';
        if (interaction.translations.length >= 3) return 'comprehensive_translation';
        if (interaction.timeFromStart < 15000 && interaction.translations.length >= 2) return 'rapid_synthesis';
        
        return null;
    }

    assessLeapSignificance(interaction) {
        return interaction.translations.length * 0.4 + (interaction.timeFromStart < 10000 ? 0.6 : 0.2);
    }

    classifyDecisionType(interaction) {
        if (interaction.translations.length === 0) return 'entry_point_selection';
        if (interaction.translations.length === 1) return 'single_translation';
        if (interaction.translations.length >= 2) return 'multi_modal_synthesis';
        return 'unknown';
    }

    calculateDecisionSpeed(interaction) {
        return Math.max(0, 10000 - interaction.timeFromStart) / 10000; // Normalized 0-1
    }

    assessDecisionConfidence(interaction) {
        const translationCount = interaction.translations.length;
        const speed = this.calculateDecisionSpeed(interaction);
        return (translationCount * 0.6 + speed * 0.4);
    }

    /**
     * Advanced cognitive analysis methods
     */
    
    analyzeTransitionTrends() {
        const recentTransitions = this.cognitivePatterns.transitionPatterns.slice(-10);
        if (recentTransitions.length === 0) return;
        
        const avgEfficiency = recentTransitions.reduce((sum, t) => sum + t.efficiency, 0) / recentTransitions.length;
        
        // Update learner model with transition efficiency
        this.learnerModel = this.learnerModel || {};
        this.learnerModel.transitionEfficiency = avgEfficiency;
    }

    analyzeLearnerDecisionPatterns() {
        const recentDecisions = this.cognitivePatterns.decisionMakingSpeed.slice(-15);
        if (recentDecisions.length === 0) return;
        
        const avgSpeed = recentDecisions.reduce((sum, d) => sum + d.speed, 0) / recentDecisions.length;
        const avgConfidence = recentDecisions.reduce((sum, d) => sum + d.confidence, 0) / recentDecisions.length;
        
        // Update learner model
        this.learnerModel = this.learnerModel || {};
        this.learnerModel.decisionSpeed = avgSpeed;
        this.learnerModel.decisionConfidence = avgConfidence;
    }

    calculateOverallCognitiveLoad(interaction, avgTransitionTime) {
        const complexity = this.assessInteractionComplexity(interaction);
        const timeStress = avgTransitionTime > 8000 ? 0.8 : avgTransitionTime > 4000 ? 0.4 : 0.1;
        const translationLoad = interaction.translations.length * 0.2;
        
        return Math.min(1.0, complexity * 0.4 + timeStress * 0.4 + translationLoad * 0.2);
    }

    calculateRepresentationLoad(representation) {
        const loadFactors = {
            'plainspeak': 0.2,
            'code': 0.6,
            'circuit': 0.7,
            'notation': 0.9
        };
        return loadFactors[representation] || 0.5;
    }

    detectCognitiveStress(interaction) {
        const indicators = [];
        
        if (interaction.timeFromStart > 15000) indicators.push('slow_response');
        if (interaction.translations.length === 0) indicators.push('translation_avoidance');
        
        const recentSwitches = this.currentContext.interactions.slice(-3)
            .filter(int => int.source !== interaction.source).length;
        if (recentSwitches >= 2) indicators.push('representation_uncertainty');
        
        return indicators;
    }

    detectCognitiveOverload() {
        const recentLoad = this.cognitivePatterns.cognitiveLoad.slice(-5);
        if (recentLoad.length === 0) return;
        
        const avgLoad = recentLoad.reduce((sum, load) => sum + load.overallLoad, 0) / recentLoad.length;
        
        if (avgLoad > 0.8) {
            console.warn('Cognitive overload detected - consider providing assistance');
            this.triggerCognitiveSupport();
        }
    }

    detectInteractionErrors(interaction) {
        // Simplified error detection - production would analyze content quality
        return Math.random() < 0.1; // 10% chance of error for demo
    }

    classifyErrorType(interaction) {
        const errorTypes = ['syntax_error', 'conceptual_error', 'translation_error', 'timing_error'];
        return errorTypes[Math.floor(Math.random() * errorTypes.length)];
    }

    assessErrorRecovery(interaction) {
        return {
            timeToRecover: Math.random() * 10000 + 2000, // 2-12 seconds
            recoveryStrategy: Math.random() > 0.5 ? 'retry_same_approach' : 'switch_representation',
            successful: Math.random() > 0.3 // 70% recovery success rate
        };
    }

    analyzeErrorLearning() {
        const recentErrors = this.cognitivePatterns.errorPatterns.slice(-5);
        if (recentErrors.length === 0) return;
        
        const recoveryRate = recentErrors.filter(error => error.recovery.successful).length / recentErrors.length;
        
        // Update learner model with error recovery capabilities
        this.learnerModel = this.learnerModel || {};
        this.learnerModel.errorRecoveryRate = recoveryRate;
    }

    triggerCognitiveSupport() {
        // Trigger help system when cognitive overload is detected
        console.log('Providing cognitive support recommendations');
        // Implementation would show contextual help or reduce complexity
    }

    /**
     * Get comprehensive cognitive analysis report
     */
    getCognitiveAnalysisReport() {
        return {
            patterns: this.cognitivePatterns,
            summary: {
                preferredRepresentations: this.getTopRepresentations(),
                transitionEfficiency: this.getAverageTransitionEfficiency(),
                learningVelocity: this.getCurrentLearningVelocity(),
                cognitiveLoad: this.getCurrentCognitiveLoad(),
                decisionMakingProfile: this.getDecisionMakingProfile(),
                errorLearningRate: this.getErrorLearningRate(),
                conceptualLeaps: this.cognitivePatterns.conceptualLeaps.length,
                overallCognitiveAgility: this.calculateOverallCognitiveAgility()
            },
            recommendations: this.generateCognitiveRecommendations()
        };
    }

    getTopRepresentations() {
        return Array.from(this.cognitivePatterns.representationPreferences.entries())
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 3)
            .map(([rep, data]) => ({ representation: rep, proficiency: data.count }));
    }

    getAverageTransitionEfficiency() {
        const transitions = this.cognitivePatterns.transitionPatterns;
        return transitions.length > 0 ? 
            transitions.reduce((sum, t) => sum + t.efficiency, 0) / transitions.length : 0;
    }

    getCurrentLearningVelocity() {
        const velocity = this.cognitivePatterns.learningVelocity.slice(-5);
        return velocity.length > 0 ?
            velocity.reduce((sum, v) => sum + v.velocity, 0) / velocity.length : 0;
    }

    getCurrentCognitiveLoad() {
        const load = this.cognitivePatterns.cognitiveLoad.slice(-3);
        return load.length > 0 ?
            load.reduce((sum, l) => sum + l.overallLoad, 0) / load.length : 0;
    }

    getDecisionMakingProfile() {
        const decisions = this.cognitivePatterns.decisionMakingSpeed;
        if (decisions.length === 0) return { averageSpeed: 0, averageConfidence: 0, preferredDecisionType: 'unknown' };
        
        return {
            averageSpeed: decisions.reduce((sum, d) => sum + d.speed, 0) / decisions.length,
            averageConfidence: decisions.reduce((sum, d) => sum + d.confidence, 0) / decisions.length,
            preferredDecisionType: this.getMostCommonDecisionType()
        };
    }

    getMostCommonDecisionType() {
        const types = this.cognitivePatterns.decisionMakingSpeed.map(d => d.type);
        if (types.length === 0) return 'unknown';
        
        const frequency = {};
        types.forEach(type => frequency[type] = (frequency[type] || 0) + 1);
        return Object.keys(frequency).reduce((a, b) => frequency[a] > frequency[b] ? a : b);
    }

    getErrorLearningRate() {
        const errors = this.cognitivePatterns.errorPatterns;
        return errors.length > 0 ?
            errors.filter(e => e.recovery.successful).length / errors.length : 1;
    }

    calculateOverallCognitiveAgility() {
        const efficiency = this.getAverageTransitionEfficiency();
        const velocity = this.getCurrentLearningVelocity();
        const decisionSpeed = this.getDecisionMakingProfile().averageSpeed;
        const errorRecovery = this.getErrorLearningRate();
        
        return (efficiency * 0.3 + velocity * 0.25 + decisionSpeed * 0.25 + errorRecovery * 0.2);
    }

    generateCognitiveRecommendations() {
        const recommendations = [];
        const load = this.getCurrentCognitiveLoad();
        const efficiency = this.getAverageTransitionEfficiency();
        
        if (load > 0.7) {
            recommendations.push('Consider taking breaks to reduce cognitive load');
        }
        
        if (efficiency < 0.5) {
            recommendations.push('Practice representation transitions to improve efficiency');
        }
        
        if (this.cognitivePatterns.conceptualLeaps.length < 2) {
            recommendations.push('Challenge yourself with more complex multi-representation scenarios');
        }
        
        return recommendations;
    }

    /**
     * Update professional competency scores with real-time calculation
     */
    updateProfessionalCompetencyScores(interaction) {
        const timestamp = Date.now();
        
        // Update each competency domain
        this.updateQuadraticFluencyScore(interaction, timestamp);
        this.updateBusinessCommunicationScore(interaction, timestamp);
        this.updateTechnicalImplementationScore(interaction, timestamp);
        this.updateStrategicThinkingScore(interaction, timestamp);
        this.updateCognitiveAgilityScore(interaction, timestamp);
        
        // Calculate overall professional readiness
        this.calculateOverallProfessionalReadiness();
        
        // Store historical snapshot
        this.storeProfessionalCompetencySnapshot(timestamp);
    }

    /**
     * Update Quadratic Fluency scoring components
     */
    updateQuadraticFluencyScore(interaction, timestamp) {
        const fluency = this.professionalCompetency.quadraticFluency;
        
        // 1. Translation Speed (how quickly between representations)
        const translationSpeed = this.calculateTranslationSpeed(interaction);
        fluency.components.translationSpeed = this.weightedAverage(
            fluency.components.translationSpeed, 
            translationSpeed, 
            0.3
        );
        
        // 2. Translation Accuracy (quality of translations)
        const translationAccuracy = this.assessTranslationAccuracy(interaction);
        fluency.components.translationAccuracy = this.weightedAverage(
            fluency.components.translationAccuracy,
            translationAccuracy,
            0.2
        );
        
        // 3. Representation Balance (use all four representations effectively)
        const representationBalance = this.calculateRepresentationBalance();
        fluency.components.representationBalance = representationBalance;
        
        // 4. Contextual Adaptation (adapt translations to context)
        const contextualAdaptation = this.assessContextualAdaptation(interaction);
        fluency.components.contextualAdaptation = this.weightedAverage(
            fluency.components.contextualAdaptation,
            contextualAdaptation,
            0.15
        );
        
        // Calculate overall quadratic fluency score
        const components = fluency.components;
        fluency.current = (
            components.translationSpeed * 0.3 +
            components.translationAccuracy * 0.25 +
            components.representationBalance * 0.25 +
            components.contextualAdaptation * 0.2
        ) * 100;
        
        // Store in history
        fluency.history.push({
            timestamp,
            score: fluency.current,
            components: {...components}
        });
        
        // Maintain history size
        if (fluency.history.length > 50) {
            fluency.history = fluency.history.slice(-25);
        }
    }

    /**
     * Update Business Communication scoring
     */
    updateBusinessCommunicationScore(interaction, timestamp) {
        const business = this.professionalCompetency.businessCommunication;
        
        // 1. Stakeholder Adaptation (adjust communication to audience)
        const stakeholderAdaptation = this.assessStakeholderAdaptation(interaction);
        business.components.stakeholderAdaptation = this.weightedAverage(
            business.components.stakeholderAdaptation,
            stakeholderAdaptation,
            0.2
        );
        
        // 2. Technical Translation (explain complex concepts clearly)
        const technicalTranslation = this.assessTechnicalTranslationClarity(interaction);
        business.components.technicalTranslation = this.weightedAverage(
            business.components.technicalTranslation,
            technicalTranslation,
            0.25
        );
        
        // 3. Professional Language (use appropriate business terminology)
        const professionalLanguage = this.detectProfessionalLanguageUsage(interaction);
        business.components.professionalLanguage = this.weightedAverage(
            business.components.professionalLanguage,
            professionalLanguage,
            0.3
        );
        
        // 4. Persuasive Clarity (communicate with confidence and clarity)
        const persuasiveClarity = this.assessPersuasiveClarity(interaction);
        business.components.persuasiveClarity = this.weightedAverage(
            business.components.persuasiveClarity,
            persuasiveClarity,
            0.2
        );
        
        // Calculate overall business communication score
        const components = business.components;
        business.current = (
            components.stakeholderAdaptation * 0.25 +
            components.technicalTranslation * 0.3 +
            components.professionalLanguage * 0.25 +
            components.persuasiveClarity * 0.2
        ) * 100;
        
        // Store in history
        business.history.push({
            timestamp,
            score: business.current,
            components: {...components}
        });
        
        // Maintain history size
        if (business.history.length > 50) {
            business.history = business.history.slice(-25);
        }
    }

    /**
     * Real-time feedback processing system
     */
    processRealTimeFeedback(interaction) {
        if (!this.realTimeFeedback.active) return;
        
        const now = Date.now();
        const timeSinceLastFeedback = now - this.realTimeFeedback.lastFeedbackTime;
        
        // Throttle feedback to avoid overwhelming user
        if (timeSinceLastFeedback < this.realTimeFeedback.feedbackThrottleMs) return;
        
        // Generate contextual feedback based on current performance
        const feedback = this.generateContextualFeedback(interaction);
        
        if (feedback) {
            this.deliverRealTimeFeedback(feedback);
            this.realTimeFeedback.lastFeedbackTime = now;
        }
    }

    /**
     * Generate contextual feedback based on performance patterns
     */
    generateContextualFeedback(interaction) {
        const feedbackCandidates = [];
        
        // Quadratic Fluency feedback
        const fluencyScore = this.professionalCompetency.quadraticFluency.current;
        if (fluencyScore < 60) {
            feedbackCandidates.push({
                type: 'improvement',
                domain: 'quadratic_fluency',
                message: 'Try switching between representations more frequently to build fluency',
                priority: 'high',
                actionable: true
            });
        } else if (fluencyScore > 85) {
            feedbackCandidates.push({
                type: 'positive',
                domain: 'quadratic_fluency',
                message: 'Excellent representation switching! You\'re demonstrating professional fluency',
                priority: 'medium',
                actionable: false
            });
        }
        
        // Business Communication feedback
        const businessScore = this.professionalCompetency.businessCommunication.current;
        if (businessScore < 65) {
            feedbackCandidates.push({
                type: 'guidance',
                domain: 'business_communication',
                message: 'Focus on explaining quantum concepts in business terms your stakeholders would understand',
                priority: 'high',
                actionable: true
            });
        }
        
        // Technical Implementation feedback
        const technicalScore = this.professionalCompetency.technicalImplementation.current;
        if (interaction.source === 'code' && technicalScore < 70) {
            feedbackCandidates.push({
                type: 'technical',
                domain: 'technical_implementation',
                message: 'Consider adding more detailed comments to explain quantum algorithm steps',
                priority: 'medium',
                actionable: true
            });
        }
        
        // Cognitive load feedback
        const cognitiveLoad = this.getCurrentCognitiveLoad();
        if (cognitiveLoad > 0.8) {
            feedbackCandidates.push({
                type: 'support',
                domain: 'cognitive_agility',
                message: 'You seem to be working hard - consider taking a brief pause to refresh',
                priority: 'high',
                actionable: true
            });
        }
        
        // Time pressure feedback (for ambush scenarios)
        if (this.ambushActive && interaction.timeFromStart > 180000) { // 3 minutes
            feedbackCandidates.push({
                type: 'urgency',
                domain: 'strategic_thinking',
                message: 'Time pressure: Focus on your strongest deliverable first',
                priority: 'critical',
                actionable: true
            });
        }
        
        // Select highest priority feedback
        if (feedbackCandidates.length === 0) return null;
        
        const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
        feedbackCandidates.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
        
        return feedbackCandidates[0];
    }

    /**
     * Deliver real-time feedback to user interface
     */
    deliverRealTimeFeedback(feedback) {
        // Add to feedback queue
        this.realTimeFeedback.feedbackQueue.push({
            ...feedback,
            timestamp: Date.now(),
            id: Date.now() + Math.random()
        });
        
        // Display feedback in UI
        this.displayFeedbackMessage(feedback);
        
        // Update visual indicators
        this.updateVisualIndicators(feedback);
        
        // Store feedback for analysis
        this.storeFeedbackForAnalysis(feedback);
    }

    /**
     * Display feedback message in user interface
     */
    displayFeedbackMessage(feedback) {
        // Create feedback notification
        const feedbackElement = document.createElement('div');
        feedbackElement.className = `feedback-notification ${feedback.type} ${feedback.priority}`;
        feedbackElement.innerHTML = `
            <div class="feedback-content">
                <div class="feedback-icon">${this.getFeedbackIcon(feedback.type)}</div>
                <div class="feedback-message">${feedback.message}</div>
                <div class="feedback-domain">${feedback.domain.replace('_', ' ')}</div>
            </div>
            <button class="feedback-close" onclick="this.parentElement.remove()">×</button>
        `;
        
        // Add to notification area
        let notificationArea = document.querySelector('.feedback-notifications');
        if (!notificationArea) {
            notificationArea = document.createElement('div');
            notificationArea.className = 'feedback-notifications';
            document.body.appendChild(notificationArea);
        }
        
        notificationArea.appendChild(feedbackElement);
        
        // Auto-remove after delay
        setTimeout(() => {
            if (feedbackElement.parentElement) {
                feedbackElement.remove();
            }
        }, feedback.priority === 'critical' ? 10000 : 7000);
    }

    /**
     * Helper methods for professional competency assessment
     */
    
    calculateTranslationSpeed(interaction) {
        const timePerTranslation = interaction.timeFromStart / Math.max(1, interaction.translations.length);
        const maxTime = 15000; // 15 seconds max
        return Math.max(0, (maxTime - timePerTranslation) / maxTime);
    }

    assessTranslationAccuracy(interaction) {
        // Simplified - would analyze actual translation quality
        const complexity = this.assessInteractionComplexity(interaction);
        const speed = this.calculateTranslationSpeed(interaction);
        return Math.min(1, (complexity * 0.6 + speed * 0.4));
    }

    calculateRepresentationBalance() {
        const prefs = this.cognitivePatterns.representationPreferences;
        if (prefs.size < 2) return 0;
        
        const counts = Array.from(prefs.values()).map(p => p.count);
        const mean = counts.reduce((sum, count) => sum + count, 0) / counts.length;
        const variance = counts.reduce((sum, count) => sum + Math.pow(count - mean, 2), 0) / counts.length;
        
        // Lower variance means better balance
        return Math.max(0, 1 - (Math.sqrt(variance) / mean));
    }

    assessContextualAdaptation(interaction) {
        const context = this.currentContext;
        const hasContext = context && (context.audience || context.scenario);
        const adaptationScore = hasContext ? 0.8 : 0.4;
        
        // Bonus for audience-aware content
        if (this.syncEngine.state.metadata.audience !== 'technical') {
            return Math.min(1, adaptationScore + 0.2);
        }
        
        return adaptationScore;
    }

    assessStakeholderAdaptation(interaction) {
        const audience = this.syncEngine.state.metadata.audience || 'technical';
        const audienceComplexity = {
            'executives': 0.3,
            'stakeholders': 0.5,
            'clients': 0.6,
            'technical': 0.9
        };
        
        return audienceComplexity[audience] || 0.5;
    }

    assessTechnicalTranslationClarity(interaction) {
        if (interaction.source !== 'plainspeak') return 0.5;
        
        // Check if technical concepts are explained clearly
        const hasExplanation = interaction.translations.length >= 2;
        const isContextual = this.currentContext !== null;
        
        return (hasExplanation ? 0.7 : 0.3) + (isContextual ? 0.3 : 0);
    }

    detectProfessionalLanguageUsage(interaction) {
        // Use the existing professional language detection
        return this.ambushActive ? 
            this.detectProfessionalLanguage('sample content') : 
            Math.random() * 0.3 + 0.5;
    }

    assessPersuasiveClarity(interaction) {
        const translationCount = interaction.translations.length;
        const speed = this.calculateTranslationSpeed(interaction);
        return Math.min(1, (translationCount * 0.3 + speed * 0.7));
    }

    /**
     * Utility methods
     */
    
    weightedAverage(current, newValue, weight) {
        return current * (1 - weight) + newValue * weight;
    }

    calculateOverallProfessionalReadiness() {
        const competencies = this.professionalCompetency;
        const overall = (
            competencies.quadraticFluency.current * 0.25 +
            competencies.businessCommunication.current * 0.25 +
            competencies.technicalImplementation.current * 0.2 +
            competencies.strategicThinking.current * 0.15 +
            competencies.cognitiveAgility.current * 0.15
        );
        
        this.professionalReadinessScore = overall;
        return overall;
    }

    storeProfessionalCompetencySnapshot(timestamp) {
        const snapshot = {
            timestamp,
            overall: this.professionalReadinessScore,
            competencies: {}
        };
        
        Object.keys(this.professionalCompetency).forEach(key => {
            snapshot.competencies[key] = {
                current: this.professionalCompetency[key].current,
                components: {...this.professionalCompetency[key].components}
            };
        });
        
        this.performanceMetrics.competencySnapshots = this.performanceMetrics.competencySnapshots || [];
        this.performanceMetrics.competencySnapshots.push(snapshot);
        
        // Maintain reasonable history
        if (this.performanceMetrics.competencySnapshots.length > 100) {
            this.performanceMetrics.competencySnapshots = this.performanceMetrics.competencySnapshots.slice(-50);
        }
    }

    getFeedbackIcon(type) {
        const icons = {
            'improvement': '💡',
            'positive': '✅',
            'guidance': '🎯',
            'technical': '⚙️',
            'support': '🤝',
            'urgency': '⚡'
        };
        return icons[type] || '💬';
    }

    updateVisualIndicators(feedback) {
        // Update competency meters or progress bars in real-time
        const domain = feedback.domain;
        const score = this.professionalCompetency[domain]?.current || 0;
        
        // Store visual indicator update
        this.realTimeFeedback.visualIndicators.set(domain, {
            score,
            lastUpdate: Date.now(),
            feedback: feedback.message
        });
    }

    storeFeedbackForAnalysis(feedback) {
        this.performanceMetrics.feedbackHistory = this.performanceMetrics.feedbackHistory || [];
        this.performanceMetrics.feedbackHistory.push({
            timestamp: Date.now(),
            feedback: feedback,
            context: this.currentContext ? this.currentContext.name : 'general'
        });
        
        // Maintain feedback history
        if (this.performanceMetrics.feedbackHistory.length > 200) {
            this.performanceMetrics.feedbackHistory = this.performanceMetrics.feedbackHistory.slice(-100);
        }
    }

    /**
     * Enable/disable real-time feedback
     */
    enableRealTimeFeedback() {
        this.realTimeFeedback.active = true;
        console.log('Real-time professional competency feedback enabled');
    }

    disableRealTimeFeedback() {
        this.realTimeFeedback.active = false;
        console.log('Real-time professional competency feedback disabled');
    }

    /**
     * Get comprehensive professional competency report
     */
    getProfessionalCompetencyReport() {
        return {
            overall: this.professionalReadinessScore || 0,
            competencies: this.professionalCompetency,
            realTimeFeedback: {
                active: this.realTimeFeedback.active,
                recentFeedback: this.realTimeFeedback.feedbackQueue.slice(-5),
                visualIndicators: Object.fromEntries(this.realTimeFeedback.visualIndicators)
            },
            trends: this.analyzeProfessionalCompetencyTrends(),
            recommendations: this.generateProfessionalDevelopmentRecommendations()
        };
    }

    analyzeProfessionalCompetencyTrends() {
        const trends = {};
        
        Object.keys(this.professionalCompetency).forEach(domain => {
            const history = this.professionalCompetency[domain].history.slice(-10);
            if (history.length >= 3) {
                const recent = history.slice(-3).reduce((sum, h) => sum + h.score, 0) / 3;
                const older = history.slice(0, 3).reduce((sum, h) => sum + h.score, 0) / 3;
                const trend = recent - older;
                
                trends[domain] = {
                    direction: trend > 2 ? 'improving' : trend < -2 ? 'declining' : 'stable',
                    magnitude: Math.abs(trend),
                    recent: recent,
                    change: trend
                };
            }
        });
        
        return trends;
    }

    generateProfessionalDevelopmentRecommendations() {
        const recommendations = [];
        const competencies = this.professionalCompetency;
        
        // Identify weakest competency
        const scores = Object.keys(competencies).map(key => ({
            domain: key,
            score: competencies[key].current
        }));
        scores.sort((a, b) => a.score - b.score);
        
        const weakest = scores[0];
        if (weakest.score < 60) {
            recommendations.push({
                priority: 'high',
                domain: weakest.domain,
                recommendation: `Focus on improving ${weakest.domain.replace('_', ' ')} - consider additional practice in this area`,
                specificActions: this.getSpecificActionsForDomain(weakest.domain)
            });
        }
        
        // Identify strongest competency
        const strongest = scores[scores.length - 1];
        if (strongest.score > 80) {
            recommendations.push({
                priority: 'medium',
                domain: strongest.domain,
                recommendation: `Excellent ${strongest.domain.replace('_', ' ')} skills! Consider mentoring others or taking on leadership roles`,
                specificActions: ['Share knowledge with team', 'Lead training sessions', 'Take on complex projects']
            });
        }
        
        // Overall professional readiness recommendation
        const overall = this.professionalReadinessScore || 0;
        if (overall > 85) {
            recommendations.push({
                priority: 'low',
                domain: 'overall',
                recommendation: 'You demonstrate strong professional quantum competency across all domains',
                specificActions: ['Pursue advanced certifications', 'Consider consulting roles', 'Contribute to quantum education']
            });
        } else if (overall < 60) {
            recommendations.push({
                priority: 'high',
                domain: 'overall',
                recommendation: 'Focus on building foundational competencies before advancing to complex scenarios',
                specificActions: ['Practice basic scenarios', 'Focus on representation fluency', 'Study business communication']
            });
        }
        
        return recommendations;
    }

    getSpecificActionsForDomain(domain) {
        const actions = {
            'quadraticFluency': [
                'Practice rapid switching between representations',
                'Time yourself on translation exercises',
                'Focus on weaker representations'
            ],
            'businessCommunication': [
                'Practice explaining to different audiences',
                'Study business case development',
                'Work on stakeholder presentation skills'
            ],
            'technicalImplementation': [
                'Code more quantum algorithms',
                'Practice debugging quantum circuits',
                'Study quantum software architecture'
            ],
            'strategicThinking': [
                'Analyze quantum vs classical trade-offs',
                'Practice business case development',
                'Study implementation risk assessment'
            ],
            'cognitiveAgility': [
                'Practice under time pressure',
                'Work on multitasking scenarios',
                'Build stress management skills'
            ]
        };
        
        return actions[domain] || ['Focus on deliberate practice', 'Seek mentorship', 'Study best practices'];
    }

    /**
     * Initialize 5-Phase Learning Cycle Templates
     */
    initializePhaseTemplates() {
        return {
            hook: {
                purpose: "Present authentic problems where conventional computing hits limits",
                duration: "20-30 minutes",
                structure: {
                    problemStatement: "Real-world challenge from learner's domain",
                    currentApproach: "Conventional solution and its limitations",
                    businessImpact: "Cost of suboptimal solutions",
                    teaser: "What if we could solve this fundamentally differently?"
                },
                entryPoints: ['plainspeak', 'code'], // Usually start with business context
                assessment: "Can learner recognize why problem resists conventional solutions?"
            },
            
            contrast: {
                purpose: "Classical vs quantum approaches to the same problem",
                duration: "60-75 minutes",
                structure: {
                    classicalApproach: "Detailed breakdown of current methods",
                    quantumIntroduction: "Same algorithm in all four representations",
                    quadraticMoment: "Students see simultaneous representations",
                    interactiveExplorer: "Live translation between representations",
                    performanceComparison: "Side-by-side scaling analysis"
                },
                entryPoints: ['any'], // Contextual entry practice begins here
                assessment: "Can learner predict outcomes across representations?"
            },
            
            concepts: {
                purpose: "Why quantum is different, not just faster",
                duration: "60-90 minutes",
                structure: {
                    conceptBuilding: "Core quantum phenomena through data science analogies",
                    quadraticExploration: "Each concept in all four representations",
                    interactiveValidators: "Manipulate quantum states, observe changes",
                    businessAnalogies: "Connect to familiar data science concepts",
                    professionalContext: "How concepts apply in workplace scenarios"
                },
                entryPoints: ['any'], // Full contextual flexibility
                assessment: "Can learner explain concepts in business terms?"
            },
            
            practice: {
                purpose: "Build quantum solutions to classical problems",
                duration: "90-120 minutes",
                structure: {
                    investigate: "Systematic quadratic exploration (35 min)",
                    modify: "Cross-modal problem solving (45 min)",
                    make: "Professional implementation (60 min)",
                    cognitiveAgility: "Speed rounds between representations",
                    realWorldApplication: "Authentic workplace scenarios"
                },
                entryPoints: ['contextually_randomized'], // Advanced entry point training
                assessment: "Can learner handle realistic workplace scenarios?"
            },
            
            reality: {
                purpose: "When quantum helps vs when it doesn't",
                duration: "30-45 minutes",
                structure: {
                    businessCommunication: "Present to different stakeholder types",
                    decisionFramework: "Quantum vs classical assessment methodology",
                    implementationReality: "Real technology readiness levels",
                    costBenefitAnalysis: "Honest ROI and timeline assessment",
                    fallbackPlanning: "Classical alternatives and risk mitigation"
                },
                entryPoints: ['audience_dependent'], // Start based on stakeholder type
                assessment: "Can learner make informed adoption decisions?"
            }
        };
    }

    /**
     * Initialize learning objectives for each phase
     */
    initializePhaseObjectives() {
        return {
            hook: [
                { text: "Identify quantum-suitable problems", completed: false, category: 'problem_recognition' },
                { text: "Recognize classical computational limits", completed: false, category: 'limitation_analysis' },
                { text: "Articulate business impact of limitations", completed: false, category: 'business_context' },
                { text: "Express curiosity about quantum solutions", completed: false, category: 'motivation' }
            ],
            contrast: [
                { text: "Compare classical vs quantum approaches", completed: false, category: 'comparison' },
                { text: "Translate algorithm between representations", completed: false, category: 'translation' },
                { text: "Analyze performance scaling differences", completed: false, category: 'performance' },
                { text: "Demonstrate quadratic moment understanding", completed: false, category: 'insight' }
            ],
            concepts: [
                { text: "Explain quantum phenomena with analogies", completed: false, category: 'explanation' },
                { text: "Navigate all four representations fluently", completed: false, category: 'fluency' },
                { text: "Connect concepts to professional context", completed: false, category: 'application' },
                { text: "Manipulate quantum states interactively", completed: false, category: 'hands_on' }
            ],
            practice: [
                { text: "Investigate problems systematically", completed: false, category: 'investigation' },
                { text: "Modify solutions across modalities", completed: false, category: 'adaptation' },
                { text: "Create professional implementations", completed: false, category: 'creation' },
                { text: "Demonstrate cognitive agility under pressure", completed: false, category: 'agility' }
            ],
            reality: [
                { text: "Present to diverse stakeholder audiences", completed: false, category: 'communication' },
                { text: "Assess quantum vs classical trade-offs", completed: false, category: 'assessment' },
                { text: "Evaluate implementation feasibility", completed: false, category: 'feasibility' },
                { text: "Develop risk mitigation strategies", completed: false, category: 'risk_management' }
            ]
        };
    }

    /**
     * Advance to next phase in learning cycle
     */
    advanceToNextPhase() {
        const currentIndex = this.learningPhases.indexOf(this.currentPhase);
        
        if (currentIndex < this.learningPhases.length - 1) {
            // Mark current phase as completed
            this.phaseProgress[this.currentPhase].status = 'completed';
            this.phaseProgress[this.currentPhase].endTime = Date.now();
            this.phaseProgress[this.currentPhase].completed = true;
            
            // Move to next phase
            const nextPhase = this.learningPhases[currentIndex + 1];
            this.currentPhase = nextPhase;
            this.phaseProgress[nextPhase].status = 'active';
            this.phaseProgress[nextPhase].startTime = Date.now();
            
            // Update UI indicators
            this.updatePhaseIndicators();
            
            return {
                success: true,
                currentPhase: this.currentPhase,
                phaseContent: this.getCurrentPhaseContent(),
                objectives: this.phaseObjectives[this.currentPhase]
            };
        }
        
        return {
            success: false,
            message: 'Already at final phase'
        };
    }

    /**
     * Get current phase content and objectives
     */
    getCurrentPhaseContent() {
        const phase = this.currentPhase;
        const template = this.phaseTemplates[phase];
        const objectives = this.phaseObjectives[phase];
        
        return {
            phase,
            template,
            objectives,
            progress: this.phaseProgress[phase],
            overallProgress: this.calculateOverallProgress()
        };
    }

    /**
     * Calculate overall learning cycle progress
     */
    calculateOverallProgress() {
        const completedPhases = this.learningPhases.filter(phase => 
            this.phaseProgress[phase].completed
        ).length;
        
        return {
            completed: completedPhases,
            total: this.learningPhases.length,
            percentage: Math.round((completedPhases / this.learningPhases.length) * 100)
        };
    }

    /**
     * Update phase indicators in UI
     */
    updatePhaseIndicators() {
        // Update phase indicator elements
        this.learningPhases.forEach(phase => {
            const indicator = document.querySelector(`.phase-indicator[data-phase="${phase}"]`);
            if (indicator) {
                indicator.classList.remove('active', 'completed');
                
                if (this.phaseProgress[phase].completed) {
                    indicator.classList.add('completed');
                } else if (phase === this.currentPhase) {
                    indicator.classList.add('active');
                }
            }
        });
        
        // Update progress bar
        const progressBar = document.getElementById('learning-progress');
        if (progressBar) {
            const progress = this.calculateOverallProgress();
            progressBar.style.width = `${progress.percentage}%`;
        }
    }

    /**
     * Start learning cycle with specified phase
     */
    startLearningCycle(startPhase = 'hook') {
        // Reset all phases
        this.learningPhases.forEach(phase => {
            this.phaseProgress[phase] = {
                status: 'pending',
                startTime: null,
                endTime: null,
                completed: false
            };
        });
        
        // Start with specified phase
        this.currentPhase = startPhase;
        this.phaseProgress[startPhase].status = 'active';
        this.phaseProgress[startPhase].startTime = Date.now();
        
        // Update UI
        this.updatePhaseIndicators();
        
        return this.getCurrentPhaseContent();
    }

    /**
     * Complete current phase with assessment
     */
    completeCurrentPhase(objectives = []) {
        const phase = this.currentPhase;
        
        // Mark objectives as completed
        objectives.forEach(objectiveId => {
            const objective = this.phaseObjectives[phase].find(obj => obj.text === objectiveId);
            if (objective) {
                objective.completed = true;
            }
        });
        
        // Check if all objectives are completed
        const allObjectivesCompleted = this.phaseObjectives[phase].every(obj => obj.completed);
        
        if (allObjectivesCompleted) {
            return this.advanceToNextPhase();
        } else {
            return {
                success: false,
                message: 'Complete all objectives before advancing',
                remainingObjectives: this.phaseObjectives[phase].filter(obj => !obj.completed)
            };
        }
    }

    /**
     * Get learning cycle status
     */
    getLearningCycleStatus() {
        return {
            currentPhase: this.currentPhase,
            phaseProgress: this.phaseProgress,
            overallProgress: this.calculateOverallProgress(),
            currentObjectives: this.phaseObjectives[this.currentPhase],
            phaseContent: this.getCurrentPhaseContent()
        };
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContextualEntrySystem;
}

// Global instance for direct HTML usage
window.ContextualEntrySystem = ContextualEntrySystem;