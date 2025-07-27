/**
 * Professional Pressure Simulator - Realistic Workplace Stress Modeling
 * 
 * Revolutionary Features:
 * - Time pressure simulation with countdown timers
 * - Escalating stakeholder demands
 * - Competing priorities and interruptions
 * - Resource constraint scenarios
 * - Real-world crisis simulations
 * - Performance under pressure tracking
 */

export class ProfessionalPressureSimulator {
    constructor(quantumFluencyEngine, stakeholderSystem) {
        this.engine = quantumFluencyEngine;
        this.stakeholderSystem = stakeholderSystem;
        
        // Pressure dynamics
        this.pressureState = {
            currentLevel: 0.3,
            timeRemaining: null,
            deadlineProximity: 1.0,
            stakeholderAgitation: 0,
            competingPriorities: [],
            resourceConstraints: [],
            externalEvents: []
        };
        
        // Pressure scenarios
        this.scenarios = this.initializePressureScenarios();
        
        // Interruption system
        this.interruptionQueue = [];
        this.phoneCallSimulator = new PhoneCallSimulator();
        this.emailSimulator = new EmailNotificationSimulator();
        this.slackSimulator = new SlackMessageSimulator();
        
        // Crisis event generator
        this.crisisGenerator = new CrisisEventGenerator();
        
        // Performance tracking under pressure
        this.pressurePerformance = {
            decisionQuality: [],
            responseTime: [],
            stressIndicators: [],
            adaptabilityScore: 0
        };
        
        // Ambient workplace simulation
        this.ambientPressure = {
            officeNoise: new OfficeNoiseGenerator(),
            colleagueInterruptions: new ColleagueInterruptionSimulator(),
            systemFailures: new TechnicalFailureSimulator()
        };
    }

    /**
     * Initialize comprehensive pressure scenarios
     */
    initializePressureScenarios() {
        return {
            'emergency-board-meeting': {
                name: 'Emergency Board Meeting',
                description: 'Competitor just announced quantum breakthrough. Board convenes in 30 minutes.',
                pressureType: 'time-critical',
                duration: 1800, // 30 minutes
                pressureFactors: {
                    timeConstraint: 0.9,
                    stakeholderExpectations: 0.95,
                    consequenceSeverity: 0.9,
                    preparationTime: 0.1
                },
                events: [
                    { time: 300, type: 'ceo-call', content: 'CEO calls: "I need talking points in 5 minutes!"' },
                    { time: 600, type: 'email-flood', content: 'Board members sending conflicting requests' },
                    { time: 900, type: 'technical-issue', content: 'Quantum simulator crashes during prep' },
                    { time: 1200, type: 'stakeholder-panic', content: 'CFO: "Stock is dropping! We need answers!"' }
                ]
            },
            
            'client-demo-crisis': {
                name: 'Live Client Demo Crisis',
                description: 'Major client demo with technical failures',
                pressureType: 'performance-critical',
                duration: 2400, // 40 minutes
                pressureFactors: {
                    audiencePressure: 0.95,
                    technicalComplexity: 0.8,
                    recoveryDifficulty: 0.85,
                    reputationRisk: 0.9
                },
                events: [
                    { time: 120, type: 'system-failure', content: 'Quantum connection lost during live demo' },
                    { time: 300, type: 'client-impatience', content: 'Client CTO: "Is this production ready?"' },
                    { time: 600, type: 'competing-demo', content: 'Client mentions competitor\'s demo worked perfectly' },
                    { time: 1200, type: 'executive-pressure', content: 'Your CEO texts: "Don\'t lose this deal!"' }
                ]
            },
            
            'budget-defense': {
                name: 'Quantum Budget Defense',
                description: 'CFO threatening to cut quantum initiative funding',
                pressureType: 'negotiation-critical',
                duration: 1800, // 30 minutes
                pressureFactors: {
                    financialPressure: 0.9,
                    skepticism: 0.85,
                    politicalComplexity: 0.8,
                    futureImpact: 0.95
                },
                events: [
                    { time: 180, type: 'cost-challenge', content: 'CFO: "Why not just use classical computing?"' },
                    { time: 400, type: 'roi-demand', content: 'CFO: "Show me ROI or funding gets cut!"' },
                    { time: 800, type: 'comparison-attack', content: 'CFO shows competitor\'s lower costs' },
                    { time: 1200, type: 'final-ultimatum', content: 'CFO: "Convince me in 60 seconds or we\'re done"' }
                ]
            },
            
            'production-outage': {
                name: 'Quantum System Production Outage',
                description: 'Production quantum optimizer failing during market hours',
                pressureType: 'crisis-management',
                duration: 3600, // 60 minutes
                pressureFactors: {
                    urgency: 1.0,
                    businessImpact: 0.95,
                    technicalDifficulty: 0.85,
                    visibilityLevel: 0.9
                },
                events: [
                    { time: 60, type: 'outage-alert', content: 'CRITICAL: Quantum optimizer offline!' },
                    { time: 300, type: 'revenue-loss', content: 'Operations: "Losing $50K per minute!"' },
                    { time: 600, type: 'media-attention', content: 'Tech press picking up the story' },
                    { time: 1200, type: 'regulator-call', content: 'Regulatory body requesting explanation' },
                    { time: 1800, type: 'ceo-escalation', content: 'CEO: "Fix this NOW or update your resume!"' }
                ]
            },
            
            'competitive-pitch': {
                name: 'Competitive RFP Presentation',
                description: 'Final pitch against major competitors for $10M contract',
                pressureType: 'competitive',
                duration: 2700, // 45 minutes
                pressureFactors: {
                    competition: 0.9,
                    stakes: 0.95,
                    preparation: 0.7,
                    teamCoordination: 0.8
                },
                events: [
                    { time: 300, type: 'competitor-intel', content: 'Learn competitor is demoing real quantum hardware' },
                    { time: 600, type: 'team-conflict', content: 'Tech lead disagrees with your approach publicly' },
                    { time: 900, type: 'scope-change', content: 'Client adds new requirements mid-presentation' },
                    { time: 1500, type: 'technical-challenge', content: 'Client expert challenges your quantum claims' }
                ]
            }
        };
    }

    /**
     * Start pressure simulation
     */
    async startPressureScenario(scenarioId) {
        const scenario = this.scenarios[scenarioId];
        if (!scenario) return;
        
        console.log(`🔥 Starting pressure scenario: ${scenario.name}`);
        
        // Initialize pressure state
        this.pressureState = {
            ...this.pressureState,
            scenario: scenario,
            timeRemaining: scenario.duration,
            deadlineProximity: 1.0,
            stakeholderAgitation: 0,
            startTime: Date.now()
        };
        
        // Start countdown
        this.startCountdown();
        
        // Schedule scenario events
        this.scheduleScenarioEvents(scenario.events);
        
        // Start ambient pressure
        this.startAmbientPressure(scenario.pressureType);
        
        // Initialize performance tracking
        this.initializePerformanceTracking();
    }

    /**
     * Create realistic countdown pressure
     */
    startCountdown() {
        const updateInterval = 1000; // Update every second
        
        this.countdownInterval = setInterval(() => {
            this.pressureState.timeRemaining -= 1;
            this.pressureState.deadlineProximity = this.pressureState.timeRemaining / this.pressureState.scenario.duration;
            
            // Increase pressure as deadline approaches
            this.updatePressureLevel();
            
            // Trigger UI update
            this.engine.updatePressureDisplay({
                timeRemaining: this.formatTime(this.pressureState.timeRemaining),
                pressureLevel: this.pressureState.currentLevel,
                urgencyColor: this.getUrgencyColor()
            });
            
            // Check for time-based triggers
            this.checkTimeTriggers();
            
            if (this.pressureState.timeRemaining <= 0) {
                this.endPressureScenario();
            }
        }, updateInterval);
    }

    /**
     * Dynamic pressure level calculation
     */
    updatePressureLevel() {
        const factors = {
            time: (1 - this.pressureState.deadlineProximity) * 0.3,
            stakeholder: this.pressureState.stakeholderAgitation * 0.25,
            complexity: this.getCurrentTaskComplexity() * 0.2,
            interruptions: Math.min(1, this.interruptionQueue.length / 5) * 0.15,
            performance: this.getRecentPerformanceStress() * 0.1
        };
        
        const basePressure = Object.values(factors).reduce((sum, val) => sum + val, 0);
        
        // Add scenario-specific pressure
        const scenarioMultiplier = this.calculateScenarioPressure();
        
        this.pressureState.currentLevel = Math.min(1, basePressure * scenarioMultiplier);
        
        // Trigger pressure effects
        this.applyPressureEffects();
    }

    /**
     * Apply realistic pressure effects
     */
    applyPressureEffects() {
        const pressure = this.pressureState.currentLevel;
        
        // Visual effects
        if (pressure > 0.7) {
            this.triggerHighPressureEffects();
        }
        
        // Cognitive effects
        if (pressure > 0.8) {
            // Simulate tunnel vision - reduce available options
            this.engine.reduceCognitiveOptions(0.7);
            
            // Increase error likelihood
            this.engine.increaseErrorProbability(0.2);
        }
        
        // Time perception effects
        if (pressure > 0.6) {
            // Make time seem to pass faster
            this.engine.adjustTimePerception(1.2);
        }
        
        // Interruption frequency
        if (pressure > 0.5) {
            this.increaseInterruptionFrequency();
        }
    }

    /**
     * Generate realistic workplace interruptions
     */
    generateInterruption() {
        const interruptionTypes = [
            {
                type: 'phone_call',
                weight: 0.3,
                generator: () => this.phoneCallSimulator.generateCall(this.pressureState)
            },
            {
                type: 'email_notification',
                weight: 0.3,
                generator: () => this.emailSimulator.generateUrgentEmail(this.pressureState)
            },
            {
                type: 'slack_message',
                weight: 0.2,
                generator: () => this.slackSimulator.generateMessage(this.pressureState)
            },
            {
                type: 'colleague_visit',
                weight: 0.2,
                generator: () => this.ambientPressure.colleagueInterruptions.generateVisit()
            }
        ];
        
        // Select interruption type based on weights
        const selected = this.weightedRandom(interruptionTypes);
        const interruption = selected.generator();
        
        this.interruptionQueue.push({
            ...interruption,
            timestamp: Date.now(),
            handled: false
        });
        
        return interruption;
    }

    /**
     * Crisis event generation
     */
    triggerCrisisEvent(eventType) {
        const crisis = this.crisisGenerator.generate(eventType, this.pressureState);
        
        // Immediate pressure spike
        this.pressureState.currentLevel = Math.min(1, this.pressureState.currentLevel + 0.3);
        
        // Update all stakeholders
        if (this.stakeholderSystem) {
            this.stakeholderSystem.escalateCrisis(crisis);
        }
        
        // Create cascading effects
        this.createCascadingEffects(crisis);
        
        return crisis;
    }

    /**
     * Track performance under pressure
     */
    trackPressurePerformance(action, outcome) {
        const performance = {
            timestamp: Date.now(),
            pressureLevel: this.pressureState.currentLevel,
            action: action,
            outcome: outcome,
            responseTime: action.responseTime,
            quality: this.assessQualityUnderPressure(action, outcome),
            stressIndicators: this.detectStressIndicators(action)
        };
        
        this.pressurePerformance.decisionQuality.push(performance.quality);
        this.pressurePerformance.responseTime.push(performance.responseTime);
        this.pressurePerformance.stressIndicators.push(...performance.stressIndicators);
        
        // Update adaptability score
        this.updateAdaptabilityScore(performance);
        
        return performance;
    }

    /**
     * High pressure visual and audio effects
     */
    triggerHighPressureEffects() {
        // Visual effects
        document.body.classList.add('high-pressure-mode');
        
        // Heartbeat sound effect (optional)
        if (this.engine.audioEnabled) {
            this.playHeartbeatSound(this.pressureState.currentLevel);
        }
        
        // Urgent UI indicators
        this.flashUrgentElements();
        
        // Reduce time for decisions
        this.engine.reduceDecisionTime(0.8);
    }
}

/**
 * Phone Call Simulator for realistic interruptions
 */
class PhoneCallSimulator {
    generateCall(pressureState) {
        const callerProfiles = [
            { name: 'CEO', urgency: 0.9, authority: 1.0 },
            { name: 'Major Client', urgency: 0.8, authority: 0.7 },
            { name: 'Team Member', urgency: 0.5, authority: 0.3 },
            { name: 'External Vendor', urgency: 0.4, authority: 0.2 }
        ];
        
        const caller = this.selectCaller(callerProfiles, pressureState);
        
        const callScripts = {
            'CEO': [
                "I need an update on the quantum project RIGHT NOW.",
                "The board is asking tough questions. What do I tell them?",
                "Drop everything. We have a situation."
            ],
            'Major Client': [
                "We're reconsidering the quantum investment. Convince me.",
                "Your competitor just offered us a better deal. Can you match it?",
                "I need those quantum results by end of day or we walk."
            ],
            'Team Member': [
                "The quantum simulator is showing weird results. Need your help!",
                "I think I found a major bug in our implementation.",
                "Can you review my code? The deadline is in an hour."
            ],
            'External Vendor': [
                "We're having supply chain issues with the quantum hardware.",
                "The licensing costs just increased by 40%.",
                "We need to discuss the support contract renewal."
            ]
        };
        
        return {
            type: 'phone_call',
            caller: caller.name,
            urgency: caller.urgency,
            message: this.selectRandom(callScripts[caller.name]),
            requiresResponse: true,
            responseTimeLimit: 30, // seconds
            consequences: this.defineConsequences(caller)
        };
    }
}

/**
 * Crisis Event Generator
 */
class CrisisEventGenerator {
    generate(eventType, currentState) {
        const crisisTemplates = {
            'technical_failure': {
                severity: 0.8,
                message: "CRITICAL: Quantum optimization algorithm producing incorrect results in production!",
                cascadingEffects: ['client_complaints', 'revenue_loss', 'team_panic'],
                requiredActions: ['diagnose', 'communicate', 'fix', 'postmortem']
            },
            'competitive_threat': {
                severity: 0.7,
                message: "URGENT: Competitor announces 100-qubit quantum computer with 99.9% fidelity!",
                cascadingEffects: ['stock_impact', 'media_frenzy', 'investor_concerns'],
                requiredActions: ['analyze', 'position', 'communicate', 'strategize']
            },
            'regulatory_challenge': {
                severity: 0.9,
                message: "COMPLIANCE ALERT: New quantum computing regulations require immediate action!",
                cascadingEffects: ['legal_review', 'operation_halt', 'documentation_rush'],
                requiredActions: ['assess', 'comply', 'document', 'report']
            }
        };
        
        const crisis = crisisTemplates[eventType] || this.generateDynamicCrisis();
        
        return {
            ...crisis,
            timestamp: Date.now(),
            timeToResolve: crisis.severity * 3600, // seconds
            stakeholderReactions: this.predictStakeholderReactions(crisis)
        };
    }
}

// Export for use in main application
export { ProfessionalPressureSimulator, PhoneCallSimulator, CrisisEventGenerator };