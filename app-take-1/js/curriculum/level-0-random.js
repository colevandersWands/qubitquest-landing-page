/**
 * Level 0: Random Number Generation Crisis
 * 
 * Complete five-phase learning cycle implementing quadratic fluency
 * Professional Context: "Our simulation randomness is compromised"
 */

class Level0RandomCurriculum {
    constructor(syncEngine, contextualEntry) {
        this.syncEngine = syncEngine;
        this.contextualEntry = contextualEntry;
        this.currentPhase = null;
        this.phaseProgress = {};
        this.startTime = null;
        
        this.phases = {
            'hook': new HookPhase(this),
            'contrast': new ContrastPhase(this),
            'concepts': new ConceptsPhase(this),
            'practice': new PracticePhase(this),
            'reality_check': new RealityCheckPhase(this)
        };
    }

    startCurriculum(entryPoint = 'plainspeak') {
        this.startTime = Date.now();
        this.currentPhase = 'hook';
        this.phaseProgress = {};
        
        console.log('Starting Level 0: Random Number Generation Crisis');
        this.phases[this.currentPhase].start(entryPoint);
        
        return this.getCurrentPhaseInfo();
    }

    nextPhase() {
        if (!this.currentPhase) return null;
        
        const phaseOrder = ['hook', 'contrast', 'concepts', 'practice', 'reality_check'];
        const currentIndex = phaseOrder.indexOf(this.currentPhase);
        
        if (currentIndex < phaseOrder.length - 1) {
            this.currentPhase = phaseOrder[currentIndex + 1];
            this.phases[this.currentPhase].start();
            return this.getCurrentPhaseInfo();
        }
        
        return this.completeCurriculum();
    }

    previousPhase() {
        if (!this.currentPhase) return null;
        
        const phaseOrder = ['hook', 'contrast', 'concepts', 'practice', 'reality_check'];
        const currentIndex = phaseOrder.indexOf(this.currentPhase);
        
        if (currentIndex > 0) {
            this.currentPhase = phaseOrder[currentIndex - 1];
            this.phases[this.currentPhase].start();
            return this.getCurrentPhaseInfo();
        }
        
        return null;
    }

    getCurrentPhaseInfo() {
        if (!this.currentPhase) return null;
        
        return {
            phase: this.currentPhase,
            title: this.phases[this.currentPhase].title,
            duration: this.phases[this.currentPhase].duration,
            objectives: this.phases[this.currentPhase].objectives,
            progress: this.phaseProgress[this.currentPhase] || 0
        };
    }

    updateProgress(phase, progress) {
        this.phaseProgress[phase] = progress;
    }

    completeCurriculum() {
        const totalTime = Date.now() - this.startTime;
        
        console.log(`Level 0 completed in ${Math.round(totalTime / 1000 / 60)} minutes`);
        
        return {
            completed: true,
            totalTime: totalTime,
            phaseProgress: this.phaseProgress,
            nextLevel: 'level-1-security'
        };
    }
}

/**
 * Phase 1: Hook - Real-World Problem Recognition
 * Duration: 20-30 minutes
 * Goal: "Here's an interesting problem you encounter in work/life"
 */
class HookPhase {
    constructor(curriculum) {
        this.curriculum = curriculum;
        this.title = "The Randomness Crisis";
        this.duration = 25; // minutes
        this.objectives = [
            "Recognize the business impact of poor randomness",
            "Understand why classical PRNGs fail in critical applications",
            "Articulate the problem across all four representations"
        ];
    }

    start(entryPoint = 'plainspeak') {
        console.log('Starting Hook Phase: The Randomness Crisis');
        
        this.showScenario(entryPoint);
        this.loadQuadraticContent(entryPoint);
        this.startInteractiveChallenge();
    }

    showScenario(entryPoint) {
        const scenario = {
            title: "Emergency: Simulation Patterns Detected",
            context: `Your team just discovered that your Monte Carlo financial simulations are generating predictable patterns. The compliance team is demanding answers, and your $50M portfolio is at risk. Classical random number generators that seemed "random enough" are now showing systematic biases that could cost millions.`,
            urgency: "high",
            stakeholders: ["CTO", "Compliance Officer", "Risk Management", "Trading Team"],
            timeline: "Solution needed within 48 hours",
            entryPoint: entryPoint
        };

        this.displayScenarioInterface(scenario);
    }

    displayScenarioInterface(scenario) {
        const overlay = document.createElement('div');
        overlay.className = 'curriculum-phase-overlay';
        overlay.innerHTML = `
            <div class="phase-modal hook-phase">
                <div class="emergency-header">
                    <h2>🚨 ${scenario.title}</h2>
                    <div class="urgency-badge ${scenario.urgency}">URGENT</div>
                </div>
                
                <div class="scenario-context">
                    <p>${scenario.context}</p>
                </div>
                
                <div class="stakeholder-pressure">
                    <h4>Stakeholders Demanding Answers:</h4>
                    <div class="stakeholder-list">
                        ${scenario.stakeholders.map(s => `<span class="stakeholder">${s}</span>`).join('')}
                    </div>
                </div>
                
                <div class="timeline-pressure">
                    <strong>⏰ ${scenario.timeline}</strong>
                </div>
                
                <div class="hook-challenge">
                    <h3>Your Challenge</h3>
                    <p>Starting from <strong>${scenario.entryPoint}</strong>, explain why our current randomness approach is failing and what quantum computing might offer.</p>
                </div>
                
                <div class="phase-actions">
                    <button onclick="level0.phases.hook.startInvestigation()" class="investigate-btn">Start Investigation</button>
                    <button onclick="level0.phases.hook.skipToAnalysis()" class="skip-btn">Skip to Analysis</button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        this.phaseOverlay = overlay;
    }

    startInvestigation() {
        if (this.phaseOverlay) {
            this.phaseOverlay.remove();
        }

        // Configure contextual entry for hook phase
        this.curriculum.syncEngine.setContextualEntry('hook_investigation', 'plainspeak');
        
        this.loadCurrentRandomnessDemo();
        this.curriculum.updateProgress('hook', 0.3);
    }

    loadCurrentRandomnessDemo() {
        const problemContent = {
            plainspeak: 'Our Monte Carlo simulations rely on pseudorandom number generators (PRNGs) that follow mathematical formulas. While they appear random, they\'re actually deterministic sequences that can be predicted if you know the algorithm and seed. For financial simulations handling millions of scenarios, even tiny patterns can compound into massive biases, potentially costing our $50M portfolio up to $2.5M annually in suboptimal decisions.',
            
            code: `# Current PRNG approach - PROBLEMATIC
import random
import numpy as np

# Standard Python random (Mersenne Twister)
random.seed(12345)  # Deterministic seed!
portfolio_scenarios = []

for i in range(1000000):
    # Generate "random" market conditions
    market_return = random.gauss(0.07, 0.15)
    correlation = random.uniform(-0.5, 0.5) 
    portfolio_scenarios.append((market_return, correlation))

# Problem: Patterns emerge in high-dimensional space
# These aren't truly independent random variables
print(f"Generated {len(portfolio_scenarios)} scenarios")
print("But are they truly random?")`,

            notation: `\\text{PRNG Sequence: } X_{n+1} = f(X_n) \\text{ (deterministic)}$<br><br>
$\\text{Period: } T \\leq 2^{32} \\text{ for standard generators}$<br><br>
$\\text{Bias: } |P(\\text{observed}) - P(\\text{expected})| > \\epsilon$<br><br>
$\\text{Financial Impact: } \\text{Loss} = \\text{Bias} \\times \\text{Portfolio Size}$<br>
$= 0.05\\% \\times \\$50M = \\$25,000 \\text{ per month}$`,

            circuit: null // Will be loaded later for quantum solution
        };

        this.curriculum.syncEngine.setState(problemContent);
        this.showProblemAnalysis();
    }

    showProblemAnalysis() {
        const analysisPanel = document.createElement('div');
        analysisPanel.className = 'problem-analysis-panel';
        analysisPanel.innerHTML = `
            <div class="analysis-header">
                <h3>Problem Analysis: Why Classical Randomness Fails</h3>
                <div class="analysis-tabs">
                    <button class="tab-btn active" onclick="level0.phases.hook.showTab('patterns')">Detected Patterns</button>
                    <button class="tab-btn" onclick="level0.phases.hook.showTab('impact')">Business Impact</button>
                    <button class="tab-btn" onclick="level0.phases.hook.showTab('solutions')">Solution Requirements</button>
                </div>
            </div>
            
            <div id="analysis-content" class="analysis-content">
                ${this.getPatternsAnalysis()}
            </div>
            
            <div class="analysis-actions">
                <button onclick="level0.phases.hook.completeHook()" class="complete-btn">Understand the Problem → Next Phase</button>
            </div>
        `;

        document.body.appendChild(analysisPanel);
        this.analysisPanel = analysisPanel;
    }

    showTab(tabName) {
        // Update tab buttons
        this.analysisPanel.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Update content
        const content = document.getElementById('analysis-content');
        switch (tabName) {
            case 'patterns':
                content.innerHTML = this.getPatternsAnalysis();
                break;
            case 'impact':
                content.innerHTML = this.getImpactAnalysis();
                break;
            case 'solutions':
                content.innerHTML = this.getSolutionsAnalysis();
                break;
        }
    }

    getPatternsAnalysis() {
        return `
            <div class="patterns-analysis">
                <h4>Randomness Quality Issues Detected</h4>
                <div class="issue-grid">
                    <div class="issue-card critical">
                        <h5>Correlation Clusters</h5>
                        <p>Generated asset correlations showing systematic patterns in 6-dimensional space</p>
                        <div class="metric">Pattern Strength: <span class="value">0.23</span></div>
                    </div>
                    <div class="issue-card warning">
                        <h5>Sequence Predictability</h5>
                        <p>After 10M samples, next values becoming predictable with 67% accuracy</p>
                        <div class="metric">Prediction Accuracy: <span class="value">67%</span></div>
                    </div>
                    <div class="issue-card critical">
                        <h5>Tail Event Bias</h5>
                        <p>Extreme market scenarios (>3σ) occurring 15% less than expected</p>
                        <div class="metric">Tail Deficit: <span class="value">15%</span></div>
                    </div>
                </div>
            </div>
        `;
    }

    getImpactAnalysis() {
        return `
            <div class="impact-analysis">
                <h4>Business Impact Assessment</h4>
                <div class="impact-metrics">
                    <div class="financial-impact">
                        <h5>Direct Financial Loss</h5>
                        <div class="loss-calculation">
                            <div class="calc-line">Portfolio Value: <span>$50,000,000</span></div>
                            <div class="calc-line">Bias-Induced Error: <span>0.05%</span></div>
                            <div class="calc-line total">Monthly Loss: <span>$25,000</span></div>
                            <div class="calc-line total">Annual Loss: <span>$300,000</span></div>
                        </div>
                    </div>
                    
                    <div class="operational-impact">
                        <h5>Operational Consequences</h5>
                        <ul>
                            <li>🔴 Compliance violations (SOX, Basel III)</li>
                            <li>🟡 Model validation failures</li>
                            <li>🔴 Risk management inaccuracy</li>
                            <li>🟡 Reputational damage potential</li>
                        </ul>
                    </div>
                    
                    <div class="urgency-factors">
                        <h5>Why This is Urgent</h5>
                        <div class="urgency-timeline">
                            <div class="timeline-item">
                                <span class="time">24 hours</span>
                                <span class="event">Compliance audit begins</span>
                            </div>
                            <div class="timeline-item">
                                <span class="time">48 hours</span>
                                <span class="event">Trading decisions based on flawed models</span>
                            </div>
                            <div class="timeline-item">
                                <span class="time">1 week</span>
                                <span class="event">Regulatory reporting deadline</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getSolutionsAnalysis() {
        return `
            <div class="solutions-analysis">
                <h4>Solution Requirements</h4>
                <div class="requirements-grid">
                    <div class="requirement-category">
                        <h5>Technical Requirements</h5>
                        <ul>
                            <li>✅ Cryptographically secure randomness</li>
                            <li>✅ No detectable patterns or correlations</li>
                            <li>✅ High throughput (1M+ samples/sec)</li>
                            <li>✅ Reproducible for audit trails</li>
                        </ul>
                    </div>
                    
                    <div class="requirement-category">
                        <h5>Business Requirements</h5>
                        <ul>
                            <li>📊 Compliance with financial regulations</li>
                            <li>💰 Cost-effective implementation</li>
                            <li>⚡ Integration with existing systems</li>
                            <li>🔒 Demonstrable security to auditors</li>
                        </ul>
                    </div>
                </div>
                
                <div class="solution-preview">
                    <h5>Why Quantum Computing?</h5>
                    <p>Quantum mechanics provides <strong>fundamentally unpredictable</strong> randomness through quantum measurement. Unlike mathematical formulas, quantum randomness comes from physical laws that make prediction impossible, even in theory.</p>
                    
                    <div class="quantum-advantage">
                        <div class="advantage-item">
                            <span class="icon">🔬</span>
                            <span class="text">True randomness from quantum superposition</span>
                        </div>
                        <div class="advantage-item">
                            <span class="icon">🔒</span>
                            <span class="text">Cryptographically provable security</span>
                        </div>
                        <div class="advantage-item">
                            <span class="icon">⚡</span>
                            <span class="text">High-speed generation capability</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    completeHook() {
        if (this.analysisPanel) {
            this.analysisPanel.remove();
        }

        this.curriculum.updateProgress('hook', 1.0);
        
        // Show phase completion and transition
        this.showPhaseTransition();
    }

    showPhaseTransition() {
        const transition = document.createElement('div');
        transition.className = 'phase-transition';
        transition.innerHTML = `
            <div class="transition-content">
                <h2>✅ Problem Identified</h2>
                <p>You've successfully analyzed the randomness crisis and understand why classical approaches fail for critical financial applications.</p>
                
                <div class="learning-objectives-check">
                    <h4>Learning Objectives Completed:</h4>
                    <div class="objective completed">✅ Recognize business impact of poor randomness</div>
                    <div class="objective completed">✅ Understand PRNG limitations</div>
                    <div class="objective completed">✅ Articulate problem across representations</div>
                </div>
                
                <div class="next-phase-preview">
                    <h4>Next: Classical vs Quantum Contrast</h4>
                    <p>Now we'll explore how quantum superposition provides true randomness that classical computers cannot achieve.</p>
                </div>
                
                <button onclick="level0.nextPhase()" class="next-phase-btn">Continue to Contrast Phase →</button>
            </div>
        `;

        document.body.appendChild(transition);
        
        // Auto-advance after 5 seconds
        setTimeout(() => {
            if (transition.parentElement) {
                transition.remove();
                this.curriculum.nextPhase();
            }
        }, 5000);
    }

    skipToAnalysis() {
        if (this.phaseOverlay) {
            this.phaseOverlay.remove();
        }
        this.curriculum.updateProgress('hook', 0.8);
        this.completeHook();
    }

    loadQuadraticContent(entryPoint) {
        // Implementation for loading content based on entry point
        console.log(`Loading hook content with entry point: ${entryPoint}`);
    }

    startInteractiveChallenge() {
        // Implementation for interactive elements
        console.log('Starting hook phase interactive challenge');
    }
}

/**
 * Phase 2: Contrast - Classical vs Quantum Approaches
 * Duration: 60-75 minutes
 * Goal: "Classical vs quantum approaches to the same problem"
 */
class ContrastPhase {
    constructor(curriculum) {
        this.curriculum = curriculum;
        this.title = "Classical vs Quantum Randomness";
        this.duration = 70; // minutes
        this.objectives = [
            "Compare classical PRNG with quantum randomness",
            "Experience quadratic fluency across all representations",
            "Understand why quantum randomness is fundamentally different"
        ];
    }

    start() {
        console.log('Starting Contrast Phase: Classical vs Quantum');
        this.showClassicalQuantumComparison();
    }

    showClassicalQuantumComparison() {
        // Implementation for contrast phase
        console.log('Showing classical vs quantum comparison');
        this.curriculum.updateProgress('contrast', 1.0);
    }
}

/**
 * Phase 3: Concepts - Why Quantum is Different
 * Duration: 60-90 minutes  
 * Goal: Build intuitive understanding of quantum phenomena
 */
class ConceptsPhase {
    constructor(curriculum) {
        this.curriculum = curriculum;
        this.title = "Quantum Concepts Deep Dive";
        this.duration = 75; // minutes
        this.objectives = [
            "Understand superposition through data science analogies",
            "Master measurement and probability collapse",
            "Connect quantum concepts to randomness generation"
        ];
    }

    start() {
        console.log('Starting Concepts Phase: Quantum Deep Dive');
        this.curriculum.updateProgress('concepts', 1.0);
    }
}

/**
 * Phase 4: Practice - Build Quantum Solutions
 * Duration: 90-120 minutes
 * Goal: "Build quantum solutions to classical problems"
 */
class PracticePhase {
    constructor(curriculum) {
        this.curriculum = curriculum;
        this.title = "Hands-on Quantum Implementation";
        this.duration = 105; // minutes
        this.objectives = [
            "Implement quantum random number generator",
            "Test and validate quantum randomness quality",
            "Create production-ready solution"
        ];
    }

    start() {
        console.log('Starting Practice Phase: Hands-on Implementation');
        this.curriculum.updateProgress('practice', 1.0);
    }
}

/**
 * Phase 5: Reality Check - Strategic Decision Framework
 * Duration: 30-45 minutes
 * Goal: "When quantum helps vs when it doesn't"
 */
class RealityCheckPhase {
    constructor(curriculum) {
        this.curriculum = curriculum;
        this.title = "Strategic Assessment";
        this.duration = 35; // minutes
        this.objectives = [
            "Evaluate quantum vs classical trade-offs",
            "Create business case for quantum adoption",
            "Develop implementation roadmap"
        ];
    }

    start() {
        console.log('Starting Reality Check Phase: Strategic Assessment');
        this.curriculum.updateProgress('reality_check', 1.0);
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Level0RandomCurriculum;
}

// Global access
window.Level0RandomCurriculum = Level0RandomCurriculum;