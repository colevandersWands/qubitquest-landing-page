/**
 * 5-Phase Learning Progression System
 * 
 * Implements the Hook � Contrast � Concepts � Practice � Reality Check progression
 * with professional scenario integration and quadratic fluency training
 */

class PhaseProgressionSystem {
    constructor(syncEngine, contextualEntry, assessmentScenarios) {
        this.syncEngine = syncEngine;
        this.contextualEntry = contextualEntry;
        this.assessmentScenarios = assessmentScenarios;
        
        // Current phase tracking
        this.currentPhase = 'hook';
        this.phaseProgress = {
            hook: { completed: false, score: 0, timeSpent: 0 },
            contrast: { completed: false, score: 0, timeSpent: 0 },
            concepts: { completed: false, score: 0, timeSpent: 0 },
            practice: { completed: false, score: 0, timeSpent: 0 },
            reality: { completed: false, score: 0, timeSpent: 0 }
        };
        
        // Learning scenarios
        this.scenarios = this.initializeScenarios();
        this.currentScenario = null;
        
        // Performance tracking
        this.learnerProfile = {
            startTime: Date.now(),
            totalTimeSpent: 0,
            representationStrengths: {
                plainspeak: 0.5,
                code: 0.5,
                circuit: 0.5,
                notation: 0.5
            },
            cognitiveAgility: 0.5,
            businessAcumen: 0.5,
            technicalProficiency: 0.5
        };
        
        this.initialize();
    }
    
    initialize() {
        console.log('<� Initializing 5-Phase Learning Progression System');
        this.updatePhaseUI();
        this.setupEventListeners();
    }
    
    initializeScenarios() {
        return {
            portfolio_optimization: {
                title: 'Portfolio Optimization Crisis',
                level: 1,
                phases: {
                    hook: {
                        duration: 1200, // 20 minutes
                        content: {
                            problem: 'Your hedge fund\'s portfolio optimizer hit scaling limits at 10,000 assets. Current Monte Carlo simulations take 18 hours on 1000 cores, missing daily trading windows. Competitors claim quantum advantage - is this real or hype?',
                            businessImpact: '$5M daily opportunity cost from delayed optimization',
                            currentApproach: 'Parallel Monte Carlo with 10M scenarios across 1000 cores',
                            painPoint: 'Exponential scaling with correlation complexity'
                        },
                        activities: [
                            'Analyze current classical performance bottlenecks',
                            'Calculate business impact of optimization delays',
                            'Identify quantum computing relevance to portfolio problems'
                        ]
                    },
                    contrast: {
                        duration: 3600, // 60 minutes
                        content: {
                            classicalImplementation: this.getClassicalPortfolioCode(),
                            quantumImplementation: this.getQuantumPortfolioCode(),
                            performanceComparison: {
                                classical: 'O(n�) correlation matrix, O(2^n) optimization space',
                                quantum: 'O(n) amplitude amplification, quantum parallelism'
                            }
                        },
                        activities: [
                            'Implement PRIMM Predict phase: predict quantum vs classical outcomes',
                            'Run both implementations side-by-side',
                            'Analyze performance scaling differences',
                            'Practice quadratic translation between representations'
                        ]
                    },
                    concepts: {
                        duration: 3600, // 60 minutes
                        content: {
                            superposition: 'Portfolio states exist in quantum superposition - all allocation combinations simultaneously',
                            entanglement: 'Asset correlations encoded through quantum entanglement',
                            interference: 'Quantum interference amplifies optimal portfolios, cancels suboptimal ones',
                            measurement: 'Collapse to classical portfolio allocation with optimized probability distribution'
                        },
                        activities: [
                            'Build intuition through interactive quantum state visualization',
                            'Map financial concepts to quantum phenomena',
                            'Practice explaining quantum advantage to different audiences',
                            'Complete concept validation exercises'
                        ]
                    },
                    practice: {
                        duration: 5400, // 90 minutes
                        content: {
                            investigate: 'Analyze existing quantum portfolio optimization algorithms',
                            modify: 'Adapt algorithms for specific constraint requirements',
                            make: 'Build production-ready quantum portfolio optimizer'
                        },
                        activities: [
                            'PRIMM Investigate: Study QAOA implementation patterns',
                            'PRIMM Modify: Add risk constraints and regulatory requirements',
                            'PRIMM Make: Create hybrid quantum-classical solution',
                            'Validate quadratic fluency through implementation'
                        ]
                    },
                    reality: {
                        duration: 1800, // 30 minutes
                        content: {
                            decisionFramework: 'Quantum vs Classical decision matrix',
                            currentLimitations: 'NISQ device constraints, error rates, connectivity',
                            implementationTimeline: '6-18 months for production deployment',
                            costBenefit: 'Development cost vs performance advantage analysis'
                        },
                        activities: [
                            'Complete strategic assessment for quantum adoption',
                            'Present findings to simulated stakeholders',
                            'Develop implementation roadmap with milestones',
                            'Create fallback strategies for classical optimization'
                        ]
                    }
                }
            },
            quantum_security: {
                title: 'Quantum Communication Security',
                level: 2,
                phases: {
                    hook: {
                        duration: 1200,
                        content: {
                            problem: 'Major client data breach traced to compromised encryption keys. Board demands "quantum-proof" security. Current RSA-2048 vulnerable to future quantum attacks.',
                            businessImpact: 'Potential $100M regulatory fines, loss of client trust',
                            currentApproach: 'RSA-2048 encryption with traditional key distribution',
                            painPoint: 'No detection of eavesdropping, vulnerable to quantum attacks'
                        }
                    }
                    // Additional phases would be defined similarly
                }
            }
        };
    }
    
    /**
     * Start a specific learning scenario
     */
    startScenario(scenarioId) {
        const scenario = this.scenarios[scenarioId];
        if (!scenario) {
            console.error(`Scenario ${scenarioId} not found`);
            return;
        }
        
        this.currentScenario = {
            id: scenarioId,
            ...scenario,
            startTime: Date.now()
        };
        
        // Reset phase progress
        this.resetPhaseProgress();
        
        // Start with hook phase
        this.startPhase('hook');
        
        // Update UI
        this.updateScenarioUI();
    }
    
    /**
     * Reset phase progress for new scenario
     */
    resetPhaseProgress() {
        this.phaseProgress = {
            hook: { completed: false, score: 0, timeSpent: 0 },
            contrast: { completed: false, score: 0, timeSpent: 0 },
            concepts: { completed: false, score: 0, timeSpent: 0 },
            practice: { completed: false, score: 0, timeSpent: 0 },
            reality: { completed: false, score: 0, timeSpent: 0 }
        };
        
        // Reset current phase
        this.currentPhase = 'hook';
    }
    
    /**
     * Update scenario UI
     */
    updateScenarioUI() {
        // Update any scenario-specific UI elements
        console.log(`Starting scenario: ${this.currentScenario.title}`);
        
        // Update phase indicators if they exist
        this.updatePhaseUI();
    }
    
    /**
     * Start a specific learning phase
     */
    startPhase(phaseName) {
        if (!this.currentScenario) {
            console.error('No active scenario');
            return;
        }
        
        const phaseData = this.currentScenario.phases[phaseName];
        if (!phaseData) {
            console.error(`Phase ${phaseName} not found in current scenario`);
            return;
        }
        
        this.currentPhase = phaseName;
        const phaseStartTime = Date.now();
        
        // Configure environment for phase
        this.configurePhaseEnvironment(phaseName, phaseData);
        
        // Show phase content
        this.showPhaseContent(phaseName, phaseData);
        
        // Start phase timer
        this.startPhaseTimer(phaseName, phaseData.duration);
        
        // Track phase start
        this.phaseProgress[phaseName].startTime = phaseStartTime;
        
        // Update UI
        this.updatePhaseUI();
    }
    
    /**
     * Configure the learning environment for specific phase
     */
    configurePhaseEnvironment(phaseName, phaseData) {
        switch (phaseName) {
            case 'hook':
                // Focus on problem understanding
                this.syncEngine.setAudience('executives');
                // Set a random entry point for the hook phase
                const entryPoints = ['plainspeak', 'code', 'circuit', 'notation'];
                const randomEntry = entryPoints[Math.floor(Math.random() * entryPoints.length)];
                this.syncEngine.setContextualEntry('hook_phase', randomEntry);
                break;
                
            case 'contrast':
                // Enable side-by-side comparison
                this.enableSplitScreenMode();
                this.syncEngine.setAudience('technical');
                break;
                
            case 'concepts':
                // Enable interactive visualizations
                this.enableConceptVisualization();
                this.syncEngine.setAudience('mixed');
                break;
                
            case 'practice':
                // Enable full development environment
                this.enablePracticeMode();
                // Enable all representations for practice
                console.log('All representations enabled for practice phase');
                break;
                
            case 'reality':
                // Enable decision framework tools
                this.enableDecisionTools();
                this.syncEngine.setAudience('stakeholders');
                break;
        }
    }
    
    /**
     * Show phase-specific content
     */
    showPhaseContent(phaseName, phaseData) {
        const contentPanel = document.createElement('div');
        contentPanel.className = `phase-content-panel ${phaseName}-phase`;
        contentPanel.innerHTML = this.generatePhaseHTML(phaseName, phaseData);
        
        // Insert into main workspace
        const workspace = document.querySelector('.quadratic-workspace');
        const existingPanel = workspace.querySelector('.phase-content-panel');
        if (existingPanel) {
            existingPanel.remove();
        }
        workspace.insertBefore(contentPanel, workspace.firstChild);
        
        // Initialize phase-specific interactions
        this.initializePhaseInteractions(phaseName);
    }
    
    /**
     * Generate HTML content for each phase
     */
    generatePhaseHTML(phaseName, phaseData) {
        switch (phaseName) {
            case 'hook':
                return this.generateHookPhaseHTML(phaseData);
            case 'contrast':
                return this.generateContrastPhaseHTML(phaseData);
            case 'concepts':
                return this.generateConceptsPhaseHTML(phaseData);
            case 'practice':
                return this.generatePracticePhaseHTML(phaseData);
            case 'reality':
                return this.generateRealityPhaseHTML(phaseData);
            default:
                return '';
        }
    }
    
    generateHookPhaseHTML(phaseData) {
        return `
            <div class="hook-phase-content">
                <h2>>� Hook: Real-World Problem Recognition</h2>
                
                <div class="problem-statement">
                    <h3>The Challenge</h3>
                    <p class="problem-description">${phaseData.content.problem}</p>
                    
                    <div class="impact-metrics">
                        <div class="metric-card">
                            <span class="metric-label">Business Impact</span>
                            <span class="metric-value">${phaseData.content.businessImpact}</span>
                        </div>
                        <div class="metric-card">
                            <span class="metric-label">Current Approach</span>
                            <span class="metric-value">${phaseData.content.currentApproach}</span>
                        </div>
                        <div class="metric-card">
                            <span class="metric-label">Pain Point</span>
                            <span class="metric-value">${phaseData.content.painPoint}</span>
                        </div>
                    </div>
                </div>
                
                <div class="phase-activities">
                    <h3>Your Tasks</h3>
                    <ul class="activity-checklist">
                        ${phaseData.activities.map((activity, index) => `
                            <li>
                                <input type="checkbox" id="hook-activity-${index}" 
                                       onchange="phaseProgression.checkActivity('hook', ${index})">
                                <label for="hook-activity-${index}">${activity}</label>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="phase-workspace-prompt">
                    <p>Use the quadratic workspace below to explore this problem. Start with any representation 
                    that feels natural - you might analyze the business impact in plainspeak, examine current 
                    code implementations, or sketch out system architecture in circuits.</p>
                </div>
                
                <div class="phase-navigation">
                    <button onclick="phaseProgression.completePhase('hook')" 
                            class="complete-phase-btn" disabled>
                        Complete Hook Phase
                    </button>
                </div>
            </div>
        `;
    }
    
    generateContrastPhaseHTML(phaseData) {
        return `
            <div class="contrast-phase-content">
                <h2>� Contrast: Classical vs Quantum Approaches</h2>
                
                <div class="contrast-container">
                    <div class="approach-panel classical-approach">
                        <h3>Classical Approach</h3>
                        <div class="implementation-preview">
                            <pre><code>${phaseData.content.classicalImplementation}</code></pre>
                        </div>
                        <div class="performance-metrics">
                            <span class="complexity-label">Complexity:</span>
                            <span class="complexity-value">${phaseData.content.performanceComparison.classical}</span>
                        </div>
                    </div>
                    
                    <div class="approach-panel quantum-approach">
                        <h3>Quantum Approach</h3>
                        <div class="implementation-preview">
                            <pre><code>${phaseData.content.quantumImplementation}</code></pre>
                        </div>
                        <div class="performance-metrics">
                            <span class="complexity-label">Complexity:</span>
                            <span class="complexity-value">${phaseData.content.performanceComparison.quantum}</span>
                        </div>
                    </div>
                </div>
                
                <div class="primm-activities">
                    <h3>PRIMM Activities</h3>
                    <div class="primm-section predict">
                        <h4>Predict</h4>
                        <p>Before running the code, predict the outcomes:</p>
                        <textarea id="prediction-input" placeholder="What do you expect to happen with quantum vs classical approaches?"></textarea>
                    </div>
                    
                    <div class="primm-section run">
                        <h4>Run</h4>
                        <button onclick="phaseProgression.runComparison()" class="run-comparison-btn">
                            Run Both Implementations
                        </button>
                        <div id="comparison-results"></div>
                    </div>
                </div>
                
                <div class="phase-activities">
                    <ul class="activity-checklist">
                        ${phaseData.activities.map((activity, index) => `
                            <li>
                                <input type="checkbox" id="contrast-activity-${index}" 
                                       onchange="phaseProgression.checkActivity('contrast', ${index})">
                                <label for="contrast-activity-${index}">${activity}</label>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="phase-navigation">
                    <button onclick="phaseProgression.previousPhase()" class="nav-btn">� Back to Hook</button>
                    <button onclick="phaseProgression.completePhase('contrast')" 
                            class="complete-phase-btn" disabled>
                        Complete Contrast Phase
                    </button>
                </div>
            </div>
        `;
    }
    
    /**
     * Complete current phase and move to next
     */
    completePhase(phaseName) {
        if (phaseName !== this.currentPhase) {
            console.error('Attempting to complete wrong phase');
            return;
        }
        
        // Calculate phase score
        const score = this.calculatePhaseScore(phaseName);
        
        // Update progress
        this.phaseProgress[phaseName].completed = true;
        this.phaseProgress[phaseName].score = score;
        this.phaseProgress[phaseName].timeSpent = Date.now() - this.phaseProgress[phaseName].startTime;
        
        // Show phase completion summary
        this.showPhaseCompletionSummary(phaseName, score);
        
        // Move to next phase
        const nextPhase = this.getNextPhase(phaseName);
        if (nextPhase) {
            setTimeout(() => {
                this.startPhase(nextPhase);
            }, 3000); // 3 second delay to show summary
        } else {
            // Scenario complete
            this.completeScenario();
        }
    }
    
    /**
     * Calculate score for completed phase
     */
    calculatePhaseScore(phaseName) {
        let score = 0;
        const maxScore = 100;
        
        // Base score on activity completion
        const checkboxes = document.querySelectorAll(`#${phaseName}-activity-:checked`);
        const totalActivities = document.querySelectorAll(`[id^="${phaseName}-activity-"]`).length;
        
        if (totalActivities > 0) {
            score += (checkboxes.length / totalActivities) * 40;
        }
        
        // Additional scoring based on phase-specific metrics
        switch (phaseName) {
            case 'hook':
                // Score based on problem analysis quality
                if (this.syncEngine.state.plainspeak.length > 200) score += 20;
                if (this.syncEngine.state.code.length > 100) score += 20;
                if (this.hasUsedMultipleRepresentations()) score += 20;
                break;
                
            case 'contrast':
                // Score based on prediction accuracy and comparison understanding
                const prediction = document.getElementById('prediction-input')?.value || '';
                if (prediction.length > 100) score += 20;
                if (this.hasRunComparison) score += 20;
                if (this.hasAnalyzedResults) score += 20;
                break;
                
            case 'concepts':
                // Score based on concept understanding demonstrations
                if (this.conceptInteractions > 5) score += 30;
                if (this.hasExplainedToMultipleAudiences()) score += 30;
                break;
                
            case 'practice':
                // Score based on implementation quality
                if (this.hasCompletedInvestigate) score += 20;
                if (this.hasCompletedModify) score += 20;
                if (this.hasCompletedMake) score += 20;
                break;
                
            case 'reality':
                // Score based on decision quality
                if (this.hasCompletedAssessment) score += 30;
                if (this.hasCreatedRoadmap) score += 30;
                break;
        }
        
        return Math.min(score, maxScore);
    }
    
    /**
     * Check if learner has used multiple representations
     */
    hasUsedMultipleRepresentations() {
        const representations = ['plainspeak', 'code', 'circuit', 'notation'];
        let usedCount = 0;
        
        representations.forEach(rep => {
            if (this.syncEngine.state[rep] && this.syncEngine.state[rep].length > 20) {
                usedCount++;
            }
        });
        
        return usedCount >= 3;
    }
    
    /**
     * Get next phase in progression
     */
    getNextPhase(currentPhase) {
        const phases = ['hook', 'contrast', 'concepts', 'practice', 'reality'];
        const currentIndex = phases.indexOf(currentPhase);
        
        if (currentIndex >= 0 && currentIndex < phases.length - 1) {
            return phases[currentIndex + 1];
        }
        
        return null;
    }
    
    /**
     * Show phase completion summary
     */
    showPhaseCompletionSummary(phaseName, score) {
        const summaryModal = document.createElement('div');
        summaryModal.className = 'phase-completion-modal';
        summaryModal.innerHTML = `
            <div class="completion-content">
                <h2>Phase Complete: ${phaseName.charAt(0).toUpperCase() + phaseName.slice(1)}</h2>
                <div class="phase-score">
                    <span class="score-value">${score}</span>
                    <span class="score-label">/100</span>
                </div>
                <div class="completion-feedback">
                    ${this.getPhaseCompletionFeedback(phaseName, score)}
                </div>
                <div class="next-phase-preview">
                    <p>Next up: ${this.getNextPhasePreview(phaseName)}</p>
                </div>
            </div>
        `;
        
        document.body.appendChild(summaryModal);
        
        setTimeout(() => {
            summaryModal.remove();
        }, 3000);
    }
    
    /**
     * Generate completion feedback based on performance
     */
    getPhaseCompletionFeedback(phaseName, score) {
        if (score >= 90) {
            return 'Excellent work! You\'ve demonstrated strong understanding and engagement.';
        } else if (score >= 70) {
            return 'Good progress! You\'ve grasped the key concepts effectively.';
        } else if (score >= 50) {
            return 'Solid foundation built. Consider reviewing the materials for deeper understanding.';
        } else {
            return 'Keep practicing! Each phase builds on the previous one.';
        }
    }
    
    /**
     * Get preview text for next phase
     */
    getNextPhasePreview(currentPhase) {
        const previews = {
            hook: 'Contrast Phase - Compare classical and quantum approaches side-by-side',
            contrast: 'Concepts Phase - Build deep understanding of quantum phenomena',
            concepts: 'Practice Phase - Hands-on implementation with PRIMM methodology',
            practice: 'Reality Check - Strategic decision-making and practical constraints',
            reality: 'Scenario Complete - Review your learning journey and achievements'
        };
        
        return previews[currentPhase] || 'Continue your quantum learning journey';
    }
    
    /**
     * Update phase progress UI
     */
    updatePhaseUI() {
        const indicators = document.querySelectorAll('.phase-indicator');
        const progressBar = document.querySelector('.phase-progress-fill');
        
        indicators.forEach(indicator => {
            const phase = indicator.dataset.phase;
            
            if (phase === this.currentPhase) {
                indicator.classList.add('active');
                indicator.classList.remove('completed');
                indicator.querySelector('.phase-status').textContent = 'Active';
            } else if (this.phaseProgress[phase].completed) {
                indicator.classList.remove('active');
                indicator.classList.add('completed');
                indicator.querySelector('.phase-status').textContent = 'Complete';
            } else {
                indicator.classList.remove('active', 'completed');
                indicator.querySelector('.phase-status').textContent = 'Pending';
            }
        });
        
        // Update progress bar
        const completedPhases = Object.values(this.phaseProgress).filter(p => p.completed).length;
        const progressPercentage = (completedPhases / 5) * 100;
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
    }
    
    /**
     * Complete entire scenario
     */
    completeScenario() {
        const totalScore = this.calculateTotalScore();
        const learnerInsights = this.generateLearnerInsights();
        
        // Show comprehensive completion screen
        this.showScenarioCompletion(totalScore, learnerInsights);
        
        // Update learner profile
        this.updateLearnerProfile();
        
        // Unlock next scenario if available
        this.unlockNextScenario();
    }
    
    /**
     * Calculate total scenario score
     */
    calculateTotalScore() {
        let totalScore = 0;
        let phaseCount = 0;
        
        Object.values(this.phaseProgress).forEach(phase => {
            if (phase.completed) {
                totalScore += phase.score;
                phaseCount++;
            }
        });
        
        return phaseCount > 0 ? Math.round(totalScore / phaseCount) : 0;
    }
    
    /**
     * Generate insights about learner's progress
     */
    generateLearnerInsights() {
        const insights = {
            strengths: [],
            improvements: [],
            recommendations: []
        };
        
        // Analyze representation usage
        const repUsage = this.analyzeRepresentationUsage();
        if (repUsage.strongest) {
            insights.strengths.push(`Strong ${repUsage.strongest} fluency`);
        }
        if (repUsage.weakest) {
            insights.improvements.push(`Practice ${repUsage.weakest} representation more`);
        }
        
        // Analyze phase performance
        const phaseAnalysis = this.analyzePhasePerformance();
        insights.strengths.push(...phaseAnalysis.strengths);
        insights.improvements.push(...phaseAnalysis.improvements);
        
        // Generate recommendations
        insights.recommendations = this.generatePersonalizedRecommendations();
        
        return insights;
    }
    
    /**
     * Helper methods for classical and quantum code examples
     */
    getClassicalPortfolioCode() {
        return `# Classical Portfolio Optimization
import numpy as np
from scipy.optimize import minimize

def classical_portfolio_optimization(returns, cov_matrix, n_scenarios=1000000):
    """Monte Carlo portfolio optimization"""
    n_assets = len(returns)
    
    # Generate random portfolio weights
    weights = np.random.dirichlet(np.ones(n_assets), n_scenarios)
    
    # Calculate portfolio returns and risks
    portfolio_returns = np.dot(weights, returns)
    portfolio_risks = np.sqrt(np.einsum('ij,jk,ik->i', weights, cov_matrix, weights))
    
    # Find optimal portfolio (max Sharpe ratio)
    sharpe_ratios = portfolio_returns / portfolio_risks
    optimal_idx = np.argmax(sharpe_ratios)
    
    return weights[optimal_idx]

# Performance: O(n�) for covariance, O(n*scenarios) for optimization`;
    }
    
    getQuantumPortfolioCode() {
        return `# Quantum Portfolio Optimization (QAOA)
from qiskit import QuantumCircuit
from qiskit.algorithms import QAOA
from qiskit.optimization import QuadraticProgram

def quantum_portfolio_optimization(returns, cov_matrix):
    """Quantum approximate optimization for portfolio"""
    n_assets = len(returns)
    
    # Create quantum optimization problem
    qp = QuadraticProgram()
    for i in range(n_assets):
        qp.binary_var(f'x{i}')
    
    # Objective: maximize returns - risk
    linear = dict(zip([f'x{i}' for i in range(n_assets)], returns))
    quadratic = {(f'x{i}', f'x{j}'): cov_matrix[i,j] 
                 for i in range(n_assets) for j in range(n_assets)}
    
    qp.maximize(linear=linear, quadratic=quadratic)
    
    # Quantum circuit with superposition
    qc = QuantumCircuit(n_assets)
    for i in range(n_assets):
        qc.h(i)  # Superposition of all portfolio states
    
    # QAOA solver exploits quantum parallelism
    qaoa = QAOA(reps=3)
    result = qaoa.compute_minimum_eigenvalue(qp.to_ising()[0])
    
    return result.optimal_point

# Performance: O(n) amplitude amplification advantage`;
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Phase navigation
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'ArrowRight') {
                this.skipToNextPhase();
            } else if (e.ctrlKey && e.key === 'ArrowLeft') {
                this.previousPhase();
            }
        });
    }
    
    /**
     * Activity tracking
     */
    checkActivity(phase, activityIndex) {
        const checkbox = document.getElementById(`${phase}-activity-${activityIndex}`);
        if (checkbox && checkbox.checked) {
            // Track activity completion
            this.trackActivityCompletion(phase, activityIndex);
            
            // Check if all activities are complete
            this.checkPhaseReadiness(phase);
        }
    }
    
    checkPhaseReadiness(phase) {
        const checkboxes = document.querySelectorAll(`[id^="${phase}-activity-"]`);
        const checkedBoxes = document.querySelectorAll(`[id^="${phase}-activity-"]:checked`);
        
        if (checkboxes.length > 0 && checkboxes.length === checkedBoxes.length) {
            // Enable phase completion button
            const completeBtn = document.querySelector('.complete-phase-btn');
            if (completeBtn) {
                completeBtn.disabled = false;
                completeBtn.classList.add('ready');
            }
        }
    }
    
    /**
     * Helper methods for phase environment configuration
     */
    enableSplitScreenMode() {
        console.log('Enabling split screen mode for comparison');
        // Implementation for split screen comparison view
    }
    
    enableConceptVisualization() {
        console.log('Enabling concept visualization tools');
        // Implementation for interactive concept visualization
    }
    
    enablePracticeMode() {
        console.log('Enabling practice mode environment');
        // Implementation for full development environment
    }
    
    enableDecisionTools() {
        console.log('Enabling decision framework tools');
        // Implementation for decision support tools
    }
    
    /**
     * Initialize phase-specific interactions
     */
    initializePhaseInteractions(phaseName) {
        console.log(`Initializing interactions for ${phaseName} phase`);
        // Implementation for phase-specific interactions
    }
    
    /**
     * Start phase timer
     */
    startPhaseTimer(phaseName, duration) {
        console.log(`Starting ${Math.floor(duration/60)} minute timer for ${phaseName} phase`);
        // Implementation for phase timer
    }
    
    /**
     * Track activity completion
     */
    trackActivityCompletion(phase, activityIndex) {
        console.log(`Activity ${activityIndex} completed in ${phase} phase`);
        // Track completion
    }
    
    /**
     * Additional helper methods
     */
    
    // Placeholder methods referenced in HTML generation
    runComparison() {
        this.hasRunComparison = true;
        const resultsDiv = document.getElementById('comparison-results');
        if (resultsDiv) {
            resultsDiv.innerHTML = `
                <div class="comparison-visualization">
                    <div class="result-item">
                        <h5>Classical Result</h5>
                        <p>Time: 18.3 hours | Accuracy: 87% | Resources: 1000 CPU cores</p>
                    </div>
                    <div class="result-item">
                        <h5>Quantum Result</h5>
                        <p>Time: 23 minutes | Accuracy: 94% | Resources: 53 qubits</p>
                    </div>
                </div>
            `;
        }
        this.hasAnalyzedResults = true;
    }
    
    previousPhase() {
        // Implementation for going back to previous phase
        console.log('Previous phase navigation');
    }
    
    skipToNextPhase() {
        // Implementation for skipping to next phase (dev mode)
        if (this.devMode) {
            this.completePhase(this.currentPhase);
        }
    }
    
    /**
     * Helper method to check if learner has explained to multiple audiences
     */
    hasExplainedToMultipleAudiences() {
        // Placeholder implementation
        return false;
    }
    
    /**
     * Analyze representation usage
     */
    analyzeRepresentationUsage() {
        return {
            strongest: 'code',
            weakest: 'notation'
        };
    }
    
    /**
     * Analyze phase performance
     */
    analyzePhasePerformance() {
        return {
            strengths: ['Good problem analysis'],
            improvements: ['Practice more with notation']
        };
    }
    
    /**
     * Generate personalized recommendations
     */
    generatePersonalizedRecommendations() {
        return [
            'Focus on notation representation practice',
            'Try more complex quantum circuits',
            'Practice explaining to different audiences'
        ];
    }
    
    /**
     * Update learner profile
     */
    updateLearnerProfile() {
        console.log('Updating learner profile with scenario results');
    }
    
    /**
     * Unlock next scenario
     */
    unlockNextScenario() {
        console.log('Checking for next scenario to unlock');
    }
    
    /**
     * Show scenario completion
     */
    showScenarioCompletion(totalScore, learnerInsights) {
        console.log(`Scenario completed with score: ${totalScore}`);
        console.log('Learner insights:', learnerInsights);
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhaseProgressionSystem;
}

// Global instance
window.PhaseProgressionSystem = PhaseProgressionSystem;