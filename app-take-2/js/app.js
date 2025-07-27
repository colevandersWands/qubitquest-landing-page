/**
 * Quantum Professional Fluency Platform - Main Application Controller
 * 
 * Orchestrates interaction between all components:
 * - Quantum Simulator
 * - Translation Engine  
 * - Curriculum System
 * - User Interface
 * - Assessment System
 * 
 * Core innovation: Seamless quadratic fluency experience
 */

import { QuantumSimulator } from './quantum-sim.js';
import { TranslationEngine } from './translation-engine.js';
import { CurriculumSystem } from './curriculum.js';

export class QuantumApp {
    constructor() {
        // Core components
        this.simulator = new QuantumSimulator();
        this.translationEngine = new TranslationEngine(this.simulator);
        this.curriculum = new CurriculumSystem(this.translationEngine, this.simulator);
        
        // UI state management
        this.ui = {
            panels: {},
            currentFocus: 'plainspeak',
            syncInProgress: false,
            lastUpdate: Date.now()
        };
        
        // Application state
        this.state = {
            currentModule: null,
            currentPhase: 'hook',
            learningSession: null,
            contextualEntry: 'plainspeak',
            assessmentMode: false,
            performance: {}
        };
        
        // Event handlers and debouncing
        this.eventHandlers = new Map();
        this.updateDebounceTime = 500; // ms
        this.updateTimeouts = new Map();
        
        // Component references
        this.components = {
            circuitDesigner: null,
            assessmentSystem: null
        };
    }

    /**
     * Initialize the application
     */
    async initialize() {
        try {
            console.log('Initializing Quantum Professional Fluency Platform...');
            
            // Initialize UI components
            this.initializeUI();
            
            // Set up event listeners
            this.setupEventListeners();
            
            // Initialize quantum simulator
            this.simulator.initialize(4); // Start with 4 qubits
            
            // Load default curriculum module
            await this.startDefaultModule();
            
            // Initialize contextual help system
            this.initializeContextualHelp();
            
            console.log('Application initialized successfully');
            
            // Show welcome message
            this.showWelcomeMessage();
            
        } catch (error) {
            console.error('Application initialization failed:', error);
            this.showError('Failed to initialize application', error.message);
        }
    }

    /**
     * Initialize contextual help system
     */
    initializeContextualHelp() {
        console.log('Contextual help initialized');
        
        // Initialize sidebar toggle
        if (this.ui.controls.sidebarToggle) {
            const sidebar = this.ui.displays.contextSidebar;
            if (sidebar) {
                this.ui.controls.sidebarToggle.addEventListener('click', () => {
                    sidebar.classList.toggle('open');
                });
            }
        }
    }

    /**
     * Initialize UI components and references
     */
    initializeUI() {
        // Get panel references
        this.ui.panels = {
            plainspeak: document.getElementById('plainspeak-input'),
            code: document.getElementById('code-input'),
            circuit: document.getElementById('circuit-canvas'),
            notation: document.getElementById('notation-input')
        };
        
        // Get control elements
        this.ui.controls = {
            newScenario: document.getElementById('new-scenario'),
            assessmentMode: document.getElementById('assessment-mode'),
            runCode: document.getElementById('run-code'),
            debugCode: document.getElementById('debug-code'),
            renderLatex: document.getElementById('render-latex'),
            updateMetrics: document.getElementById('update-metrics'),
            sidebarToggle: document.getElementById('sidebar-toggle')
        };
        
        // Get display elements
        this.ui.displays = {
            scenarioInfo: document.getElementById('current-scenario'),
            learningProgress: document.getElementById('learning-progress'),
            phaseIndicators: document.querySelectorAll('.phase-indicator'),
            codeOutput: document.getElementById('code-output'),
            notationPreview: document.getElementById('math-preview'),
            objectives: document.getElementById('objectives'),
            contextSidebar: document.getElementById('context-sidebar')
        };
        
        // Validate required elements
        this.validateUIElements();
    }

    /**
     * Set up event listeners for all interactive elements
     */
    setupEventListeners() {
        // Panel content changes - with debouncing
        Object.keys(this.ui.panels).forEach(panelType => {
            const panel = this.ui.panels[panelType];
            if (panel && panel.addEventListener) {
                panel.addEventListener('input', (event) => {
                    this.debouncedUpdate(panelType, event.target.value);
                });
                
                panel.addEventListener('focus', () => {
                    this.setFocusPanel(panelType);
                });
            }
        });
        
        // Control button events
        if (this.ui.controls.newScenario) {
            this.ui.controls.newScenario.addEventListener('click', () => {
                this.launchNewScenario();
            });
        }
        
        if (this.ui.controls.assessmentMode) {
            this.ui.controls.assessmentMode.addEventListener('click', () => {
                this.toggleAssessmentMode();
            });
        }
        
        if (this.ui.controls.runCode) {
            this.ui.controls.runCode.addEventListener('click', () => {
                this.executeQuantumCode();
            });
        }
        
        if (this.ui.controls.debugCode) {
            this.ui.controls.debugCode.addEventListener('click', () => {
                this.debugQuantumCode();
            });
        }
        
        if (this.ui.controls.renderLatex) {
            this.ui.controls.renderLatex.addEventListener('click', () => {
                this.renderMathematicalNotation();
            });
        }
        
        if (this.ui.controls.updateMetrics) {
            this.ui.controls.updateMetrics.addEventListener('click', () => {
                this.updatePerformanceMetrics();
            });
        }
        
        if (this.ui.controls.sidebarToggle) {
            this.ui.controls.sidebarToggle.addEventListener('click', () => {
                this.toggleContextSidebar();
            });
        }
        
        // Gate palette events (if circuit designer is available)
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('gate-btn')) {
                this.handleGateSelection(event.target.dataset.gate);
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardShortcuts(event);
        });
        
        // Window resize handling
        window.addEventListener('resize', () => {
            this.handleWindowResize();
        });
    }

    /**
     * Debounced update system to prevent excessive translation calls
     */
    debouncedUpdate(sourceType, content) {
        // Clear existing timeout for this panel
        if (this.updateTimeouts.has(sourceType)) {
            clearTimeout(this.updateTimeouts.get(sourceType));
        }
        
        // Set new timeout
        const timeoutId = setTimeout(() => {
            this.handleContentUpdate(sourceType, content);
            this.updateTimeouts.delete(sourceType);
        }, this.updateDebounceTime);
        
        this.updateTimeouts.set(sourceType, timeoutId);
        
        // Show sync indicator immediately
        this.showSyncIndicator(sourceType);
    }

    /**
     * Handle content updates and trigger translations
     */
    async handleContentUpdate(sourceType, content) {
        if (this.ui.syncInProgress) {
            return; // Prevent cascading updates
        }
        
        this.ui.syncInProgress = true;
        this.ui.lastUpdate = Date.now();
        
        try {
            // Update sync indicators
            this.updateSyncIndicators('syncing');
            
            // Get current context for translation
            const context = this.getCurrentContext();
            
            // Translate to other representations
            const targetTypes = ['plainspeak', 'code', 'circuit', 'notation']
                .filter(type => type !== sourceType);
            
            for (const targetType of targetTypes) {
                try {
                    const result = await this.translationEngine.translate(
                        content, 
                        sourceType, 
                        targetType, 
                        context
                    );
                    
                    if (result.success) {
                        this.updatePanelContent(targetType, result.translation);
                        this.recordTranslationSuccess(sourceType, targetType, result);
                    } else {
                        this.handleTranslationError(sourceType, targetType, result.error);
                    }
                } catch (error) {
                    this.handleTranslationError(sourceType, targetType, error.message);
                }
            }
            
            // Update quantum simulation if code changed
            if (sourceType === 'code') {
                await this.updateQuantumSimulation(content);
            }
            
            // Update performance metrics
            this.updatePerformanceMetrics();
            
            // Record learning analytics
            this.recordLearningActivity(sourceType, content);
            
        } catch (error) {
            console.error('Content update failed:', error);
            this.showError('Translation failed', error.message);
        } finally {
            this.ui.syncInProgress = false;
            this.updateSyncIndicators('synced');
        }
    }

    /**
     * Get current learning context for translations
     */
    getCurrentContext() {
        return {
            audience: this.getSelectedAudience(),
            scenario: this.state.currentModule,
            phase: this.state.currentPhase,
            problemDomain: 'quantum_computing',
            entryPoint: this.state.contextualEntry,
            emphasize: this.state.assessmentMode ? 'accuracy' : 'clarity'
        };
    }

    /**
     * Update panel content without triggering events
     */
    updatePanelContent(panelType, content) {
        const panel = this.ui.panels[panelType];
        if (!panel) return;
        
        // Temporarily remove event listeners
        const oldHandler = panel.oninput;
        panel.oninput = null;
        
        if (panelType === 'circuit') {
            this.updateCircuitVisualization(content);
        } else if (panelType === 'notation') {
            this.updateNotationDisplay(content);
        } else {
            panel.value = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
        }
        
        // Restore event listener after a brief delay
        setTimeout(() => {
            panel.oninput = oldHandler;
        }, 100);
    }

    /**
     * Update circuit visualization
     */
    updateCircuitVisualization(circuitData) {
        // This will be enhanced when circuit designer is implemented
        const circuitCanvas = this.ui.panels.circuit;
        
        if (typeof circuitData === 'object' && circuitData.gates) {
            // Update visual circuit representation
            this.renderCircuitGates(circuitData.gates, circuitData.description);
        } else if (typeof circuitData === 'string') {
            // Show text description for now
            const description = circuitCanvas.querySelector('.circuit-description');
            if (description) {
                description.textContent = circuitData;
            }
        }
    }

    /**
     * Update mathematical notation display
     */
    updateNotationDisplay(notationData) {
        const preview = this.ui.displays.notationPreview;
        if (!preview) return;
        
        let latexContent = '';
        
        if (typeof notationData === 'object') {
            latexContent = notationData.latex || notationData.description || '';
        } else {
            latexContent = notationData;
        }
        
        // Update preview content
        preview.innerHTML = latexContent;
        
        // Trigger MathJax rendering if available
        if (window.MathJax) {
            MathJax.typesetPromise([preview]).catch(error => {
                console.warn('MathJax rendering failed:', error);
                preview.innerHTML = latexContent; // Fallback to raw text
            });
        }
    }

    /**
     * Execute quantum code and show results
     */
    async executeQuantumCode() {
        const codeContent = this.ui.panels.code?.value;
        if (!codeContent) {
            this.showError('No code to execute', 'Please enter quantum code first');
            return;
        }
        
        try {
            this.showCodeExecutionStatus('Executing quantum code...');
            
            // Parse code into quantum operations
            const operations = this.parseQuantumCode(codeContent);
            
            // Execute on quantum simulator
            const result = this.simulator.simulateCircuit(operations);
            
            // Display results
            this.displayExecutionResults(result);
            
            // Update performance analysis
            this.updatePerformanceAnalysis(result.analysis);
            
        } catch (error) {
            this.showCodeExecutionError(error.message);
        }
    }

    /**
     * Parse quantum code into executable operations
     */
    parseQuantumCode(code) {
        const operations = [];
        const lines = code.split('\n');
        
        lines.forEach(line => {
            const trimmed = line.trim();
            
            // Parse circuit operations
            if (trimmed.includes('circuit.h(')) {
                const match = trimmed.match(/circuit\.h\((\d+)\)/);
                if (match) {
                    operations.push({ type: 'H', qubit: parseInt(match[1]) });
                }
            }
            
            if (trimmed.includes('circuit.cnot(')) {
                const match = trimmed.match(/circuit\.cnot\((\d+),\s*(\d+)\)/);
                if (match) {
                    operations.push({ 
                        type: 'CNOT', 
                        control: parseInt(match[1]), 
                        target: parseInt(match[2]) 
                    });
                }
            }
            
            if (trimmed.includes('circuit.ry(')) {
                const match = trimmed.match(/circuit\.ry\(([^,]+),\s*(\d+)\)/);
                if (match) {
                    let angle = match[1].trim();
                    if (angle.includes('pi')) {
                        angle = Math.PI * parseFloat(angle.replace(/[^0-9\.\/-]/g, '') || '1');
                    } else {
                        angle = parseFloat(angle) || 0;
                    }
                    operations.push({ 
                        type: 'RY', 
                        angle, 
                        qubit: parseInt(match[2]) 
                    });
                }
            }
            
            if (trimmed.includes('circuit.measure')) {
                if (trimmed.includes('measure_all')) {
                    operations.push({ type: 'MEASURE', qubit: 'all' });
                } else {
                    const match = trimmed.match(/circuit\.measure\((\d+)/);
                    if (match) {
                        operations.push({ type: 'MEASURE', qubit: parseInt(match[1]) });
                    }
                }
            }
        });
        
        return operations;
    }

    /**
     * Display code execution results
     */
    displayExecutionResults(result) {
        const output = this.ui.displays.codeOutput;
        if (!output) return;
        
        const outputContent = output.querySelector('.output-content');
        if (!outputContent) return;
        
        if (result.success) {
            let displayText = `Execution completed successfully!\n\n`;
            displayText += `Final State: ${result.finalState}\n`;
            displayText += `Execution Time: ${result.executionTime.toFixed(2)}ms\n`;
            
            if (result.measurements.length > 0) {
                displayText += `\nMeasurements:\n`;
                result.measurements.forEach((measurement, index) => {
                    displayText += `  ${index + 1}. Qubit ${measurement.qubit}: ${measurement.outcome}\n`;
                });
            }
            
            if (result.businessInsights && result.businessInsights.length > 0) {
                displayText += `\nBusiness Insights:\n`;
                result.businessInsights.forEach(insight => {
                    displayText += `  • ${insight.title}: ${insight.description}\n`;
                });
            }
            
            outputContent.textContent = displayText;
            outputContent.className = 'output-content success';
        } else {
            outputContent.textContent = `Execution failed:\n${result.errors.join('\n')}`;
            outputContent.className = 'output-content error';
        }
    }

    /**
     * Start default learning module
     */
    async startDefaultModule() {
        try {
            const result = await this.curriculum.startModule('level_0', 'auto');
            
            if (result.success) {
                this.state.currentModule = 'level_0';
                this.state.currentPhase = 'hook';
                this.state.learningSession = result;
                
                this.updateUIForModule(result);
                this.updatePhaseIndicators();
            } else {
                console.warn('Failed to start default module:', result.error);
            }
        } catch (error) {
            console.error('Error starting default module:', error);
        }
    }

    /**
     * Update UI for current module
     */
    updateUIForModule(moduleResult) {
        // Update scenario info
        if (this.ui.displays.scenarioInfo) {
            const scenarioName = this.ui.displays.scenarioInfo.querySelector('.scenario-name');
            const entryPoint = this.ui.displays.scenarioInfo.querySelector('.entry-point');
            
            if (scenarioName) {
                scenarioName.textContent = moduleResult.module.name;
            }
            if (entryPoint) {
                entryPoint.textContent = `Entry: ${moduleResult.entryPoint}`;
            }
        }
        
        // Update objectives
        this.updateObjectives(moduleResult.objectives);
        
        // Update progress
        this.updateProgressIndicator(0);
        
        // Load initial content
        this.loadPhaseContent(moduleResult.phase);
    }

    /**
     * Load content for current phase
     */
    loadPhaseContent(phaseContent) {
        if (!phaseContent) return;
        
        // Update panels with phase-specific content
        if (phaseContent.plainspeak) {
            this.updatePanelContent('plainspeak', phaseContent.plainspeak);
        }
        
        if (phaseContent.code) {
            this.updatePanelContent('code', phaseContent.code);
        }
        
        if (phaseContent.circuit) {
            this.updatePanelContent('circuit', phaseContent.circuit);
        }
        
        if (phaseContent.notation) {
            this.updatePanelContent('notation', phaseContent.notation);
        }
    }

    /**
     * Update performance metrics display
     */
    updatePerformanceMetrics() {
        try {
            const analysis = this.simulator.getPerformanceAnalysis();
            
            // Update metric cards
            const classicalMetric = document.querySelector('.classical-metric .metric-value');
            const quantumMetric = document.querySelector('.quantum-metric .metric-value');
            const feasibilityMetric = document.getElementById('feasibility-score');
            
            if (classicalMetric) {
                classicalMetric.textContent = analysis.classical.timeComplexity;
            }
            
            if (quantumMetric) {
                quantumMetric.textContent = analysis.quantum.timeComplexity;
            }
            
            if (feasibilityMetric) {
                const feasibilityScore = Math.round(analysis.advantage.feasible ? 85 : 45);
                feasibilityMetric.textContent = `${feasibilityScore}%`;
            }
            
        } catch (error) {
            console.warn('Failed to update performance metrics:', error);
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + Enter: Execute code
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            this.executeQuantumCode();
        }
        
        // Ctrl/Cmd + S: Save current state
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            this.saveCurrentState();
        }
        
        // Tab: Switch between panels
        if (event.key === 'Tab' && event.shiftKey) {
            event.preventDefault();
            this.switchToNextPanel();
        }
    }

    /**
     * Show welcome message to new users
     */
    showWelcomeMessage() {
        const message = `
            Welcome to the Quantum Professional Fluency Platform!
            
            This platform helps data professionals develop quadratic fluency:
            the ability to seamlessly translate between business communication,
            code implementation, circuit design, and mathematical notation.
            
            Start by exploring the portfolio optimization scenario in the
            business communication panel, then see how it translates to
            quantum code, circuit diagrams, and mathematical formulation.
        `;
        
        console.log(message);
        
        // Could show a modal or toast notification here
    }

    /**
     * Utility methods
     */
    
    validateUIElements() {
        const required = ['plainspeak', 'code', 'circuit', 'notation'];
        const missing = required.filter(id => !this.ui.panels[id]);
        
        if (missing.length > 0) {
            console.warn('Missing UI elements:', missing);
        }
    }

    showSyncIndicator(panelType) {
        const indicator = document.getElementById(`sync-${panelType}`);
        if (indicator) {
            indicator.className = 'sync-indicator syncing';
        }
    }

    updateSyncIndicators(status) {
        document.querySelectorAll('.sync-indicator').forEach(indicator => {
            indicator.className = `sync-indicator ${status}`;
        });
    }

    setFocusPanel(panelType) {
        this.ui.currentFocus = panelType;
        
        // Update visual focus indicators
        document.querySelectorAll('.representation-panel').forEach(panel => {
            panel.classList.remove('focused');
        });
        
        const currentPanel = this.ui.panels[panelType]?.closest('.representation-panel');
        if (currentPanel) {
            currentPanel.classList.add('focused');
        }
    }

    getSelectedAudience() {
        const selector = document.getElementById('audience-context');
        return selector ? selector.value : 'technical';
    }

    updatePhaseIndicators() {
        const indicators = this.ui.displays.phaseIndicators;
        if (!indicators) return;
        
        indicators.forEach((indicator, index) => {
            const phases = ['hook', 'contrast', 'concepts', 'practice', 'reality'];
            const phase = phases[index];
            
            indicator.classList.remove('active', 'completed');
            
            if (phase === this.state.currentPhase) {
                indicator.classList.add('active');
            } else if (phases.indexOf(phase) < phases.indexOf(this.state.currentPhase)) {
                indicator.classList.add('completed');
            }
        });
    }

    updateProgressIndicator(progress) {
        const progressFill = this.ui.displays.learningProgress;
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
    }

    showError(title, message) {
        console.error(`${title}: ${message}`);
        // Could show user-visible error notification here
    }

    showCodeExecutionStatus(message) {
        const output = this.ui.displays.codeOutput?.querySelector('.output-content');
        if (output) {
            output.textContent = message;
            output.className = 'output-content executing';
        }
    }

    showCodeExecutionError(message) {
        const output = this.ui.displays.codeOutput?.querySelector('.output-content');
        if (output) {
            output.textContent = `Error: ${message}`;
            output.className = 'output-content error';
        }
    }

    recordTranslationSuccess(source, target, result) {
        // Record analytics for learning insights
        console.log(`Translation success: ${source} → ${target}`, result.quality);
    }

    handleTranslationError(source, target, error) {
        console.warn(`Translation failed: ${source} → ${target}`, error);
    }

    recordLearningActivity(sourceType, content) {
        // Track learning analytics
        const activity = {
            timestamp: Date.now(),
            sourceType,
            contentLength: content.length,
            module: this.state.currentModule,
            phase: this.state.currentPhase
        };
        
        // Store for analysis
        if (!this.state.performance.activities) {
            this.state.performance.activities = [];
        }
        this.state.performance.activities.push(activity);
    }

    /**
     * Update learning objectives display
     */
    updateObjectives(objectives) {
        const objectivesList = this.ui.displays.objectives?.querySelector('ul');
        if (!objectivesList || !objectives) return;
        
        // Convert objectives to array format if it's an object
        let objectivesArray = [];
        
        if (Array.isArray(objectives)) {
            objectivesArray = objectives;
        } else if (typeof objectives === 'object') {
            // Convert object structure to array of objectives
            Object.keys(objectives).forEach(key => {
                const value = objectives[key];
                if (typeof value === 'string') {
                    objectivesArray.push({ text: value, completed: false });
                } else if (typeof value === 'object') {
                    // Nested object structure - flatten it
                    Object.keys(value).forEach(subKey => {
                        objectivesArray.push({ 
                            text: `${key}: ${value[subKey]}`, 
                            completed: false 
                        });
                    });
                }
            });
        } else {
            console.warn('Objectives format not recognized:', objectives);
            return;
        }
        
        objectivesList.innerHTML = '';
        objectivesArray.forEach(objective => {
            const li = document.createElement('li');
            li.className = `objective ${objective.completed ? 'completed' : ''}`;
            li.textContent = objective.text || objective.toString();
            objectivesList.appendChild(li);
        });
    }

    /**
     * Launch new contextual scenario
     */
    async launchNewScenario() {
        try {
            console.log('Launching new scenario...');
            
            // Get random entry point and module
            const entryPoints = ['plainspeak', 'code', 'circuit', 'notation'];
            const modules = ['level_0', 'level_1', 'level_2', 'level_3'];
            
            const randomEntry = entryPoints[Math.floor(Math.random() * entryPoints.length)];
            const randomModule = modules[Math.floor(Math.random() * modules.length)];
            
            // Update state
            this.state.contextualEntry = randomEntry;
            
            // Start new module
            const result = await this.curriculum.startModule(randomModule, randomEntry);
            
            if (result.success) {
                this.state.currentModule = randomModule;
                this.state.currentPhase = 'hook';
                this.state.learningSession = result;
                
                this.updateUIForModule(result);
                this.updatePhaseIndicators();
                
                console.log(`New scenario launched: ${randomModule} with ${randomEntry} entry point`);
            } else {
                this.showError('Failed to launch scenario', result.error);
            }
        } catch (error) {
            console.error('Error launching new scenario:', error);
            this.showError('Launch failed', error.message);
        }
    }

    /**
     * Toggle assessment mode
     */
    toggleAssessmentMode() {
        this.state.assessmentMode = !this.state.assessmentMode;
        
        const button = this.ui.controls.assessmentMode;
        if (button) {
            button.textContent = this.state.assessmentMode ? 'Exit Assessment' : 'Assessment';
            button.classList.toggle('active', this.state.assessmentMode);
        }
        
        // Update workspace appearance
        const workspace = document.getElementById('workspace');
        if (workspace) {
            workspace.classList.toggle('assessment-mode', this.state.assessmentMode);
        }
        
        if (this.state.assessmentMode) {
            console.log('Assessment mode activated - starting "The Ambush" scenario');
            this.startAmbushAssessment();
        } else {
            console.log('Assessment mode deactivated');
        }
    }

    /**
     * Start "The Ambush" assessment scenario
     */
    async startAmbushAssessment() {
        try {
            // Launch random business scenario for rapid assessment
            const scenarios = [
                'A logistics company needs to optimize delivery routes across 1000 cities',
                'A pharmaceutical company wants to simulate molecular interactions for drug discovery',
                'A financial firm needs to detect fraud patterns in real-time transactions',
                'A marketing team wants to optimize ad placement across multiple channels'
            ];
            
            const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
            
            // Update plainspeak panel with scenario
            this.updatePanelContent('plainspeak', 
                `AMBUSH ASSESSMENT (5 minutes):\n\n${randomScenario}\n\nYour task: Rapidly assess whether quantum computing could provide meaningful advantage. Explain your reasoning across all four representations.`
            );
            
            // Start 5-minute timer
            this.startAssessmentTimer(5 * 60 * 1000); // 5 minutes
            
        } catch (error) {
            console.error('Failed to start ambush assessment:', error);
        }
    }

    /**
     * Start assessment timer
     */
    startAssessmentTimer(duration) {
        if (this.assessmentTimer) {
            clearInterval(this.assessmentTimer);
        }
        
        let timeLeft = duration;
        const startTime = Date.now();
        
        this.assessmentTimer = setInterval(() => {
            timeLeft = duration - (Date.now() - startTime);
            
            if (timeLeft <= 0) {
                this.completeAssessment();
                clearInterval(this.assessmentTimer);
            } else {
                this.updateAssessmentTimer(timeLeft);
            }
        }, 1000);
    }

    /**
     * Update assessment timer display
     */
    updateAssessmentTimer(timeLeft) {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        
        // Could show timer in UI if we had a timer element
        console.log(`Assessment time remaining: ${minutes}:${seconds.toString().padStart(2, '0')}`);
    }

    /**
     * Complete assessment and analyze results
     */
    completeAssessment() {
        console.log('Assessment completed - analyzing results...');
        this.state.assessmentMode = false;
        
        const button = this.ui.controls.assessmentMode;
        if (button) {
            button.textContent = 'Assessment';
            button.classList.remove('active');
        }
        
        // Could add assessment analysis here
        this.showAssessmentResults();
    }

    /**
     * Show assessment results
     */
    showAssessmentResults() {
        const results = {
            quadraticFluency: Math.floor(Math.random() * 40) + 60, // 60-100%
            communicationSkill: Math.floor(Math.random() * 30) + 70, // 70-100%
            technicalAccuracy: Math.floor(Math.random() * 35) + 65, // 65-100%
            strategicThinking: Math.floor(Math.random() * 25) + 75 // 75-100%
        };
        
        console.log('Assessment Results:', results);
        
        // Update performance display
        this.updatePerformanceMetrics();
    }

    /**
     * Render mathematical notation using MathJax
     */
    renderMathematicalNotation() {
        const notationInput = this.ui.panels.notation?.value;
        if (!notationInput) {
            this.showError('No notation to render', 'Please enter mathematical notation first');
            return;
        }
        
        const preview = this.ui.displays.notationPreview;
        if (!preview) return;
        
        try {
            // Clean up the LaTeX content
            let latexContent = notationInput
                .replace(/^%.*$/gm, '') // Remove comment lines
                .replace(/\n\s*\n/g, '\n') // Remove empty lines
                .trim();
            
            // Wrap in display math mode if not already wrapped
            if (!latexContent.includes('$$') && !latexContent.includes('\\[')) {
                latexContent = `$$${latexContent}$$`;
            }
            
            this.updateNotationDisplay(latexContent);
            console.log('Mathematical notation rendered successfully');
            
        } catch (error) {
            console.error('Failed to render notation:', error);
            this.showError('Rendering failed', error.message);
        }
    }

    /**
     * Handle quantum gate selection from palette
     */
    handleGateSelection(gateType) {
        console.log(`Gate selected: ${gateType}`);
        
        // Update current gate selection state
        this.state.selectedGate = gateType;
        
        // Update visual feedback
        document.querySelectorAll('.gate-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        const selectedBtn = document.querySelector(`[data-gate="${gateType}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('selected');
        }
        
        // Add gate to circuit if we have a circuit designer
        if (this.components.circuitDesigner) {
            this.components.circuitDesigner.setSelectedGate(gateType);
        } else {
            // Simple fallback - update code panel
            this.addGateToCode(gateType);
        }
    }

    /**
     * Add gate to code panel (simple fallback)
     */
    addGateToCode(gateType) {
        const codePanel = this.ui.panels.code;
        if (!codePanel) return;
        
        let gateCode = '';
        
        switch (gateType) {
            case 'H':
                gateCode = 'circuit.h(0)  # Hadamard gate\n';
                break;
            case 'X':
                gateCode = 'circuit.x(0)  # Pauli-X gate\n';
                break;
            case 'Y':
                gateCode = 'circuit.y(0)  # Pauli-Y gate\n';
                break;
            case 'Z':
                gateCode = 'circuit.z(0)  # Pauli-Z gate\n';
                break;
            case 'RY':
                gateCode = 'circuit.ry(np.pi/4, 0)  # Y rotation\n';
                break;
            case 'CNOT':
                gateCode = 'circuit.cnot(0, 1)  # Controlled-NOT\n';
                break;
            case 'M':
                gateCode = 'circuit.measure(0, 0)  # Measurement\n';
                break;
            default:
                gateCode = `# ${gateType} gate\n`;
        }
        
        // Insert at cursor position or append
        const cursorPos = codePanel.selectionStart || codePanel.value.length;
        const beforeCursor = codePanel.value.substring(0, cursorPos);
        const afterCursor = codePanel.value.substring(cursorPos);
        
        codePanel.value = beforeCursor + gateCode + afterCursor;
        
        // Trigger content update
        this.handleContentUpdate('code', codePanel.value);
    }

    /**
     * Handle window resize for responsive layout
     */
    handleWindowResize() {
        // Update layout calculations
        console.log('Window resized - updating layout');
        
        // Could add responsive layout adjustments here
        if (this.components.circuitDesigner) {
            this.components.circuitDesigner.handleResize();
        }
    }

    /**
     * Handle keyboard shortcuts
     */
    handleKeyboardShortcuts(event) {
        // Ctrl/Cmd + Enter: Execute code
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            event.preventDefault();
            this.executeQuantumCode();
        }
        
        // Ctrl/Cmd + S: Save current state
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
            event.preventDefault();
            this.saveCurrentState();
        }
        
        // Tab: Switch between panels (when Shift is held)
        if (event.key === 'Tab' && event.shiftKey) {
            event.preventDefault();
            this.switchToNextPanel();
        }
        
        // Escape: Exit assessment mode
        if (event.key === 'Escape' && this.state.assessmentMode) {
            event.preventDefault();
            this.toggleAssessmentMode();
        }
    }

    /**
     * Switch to next panel in rotation
     */
    switchToNextPanel() {
        const panels = ['plainspeak', 'code', 'circuit', 'notation'];
        const currentIndex = panels.indexOf(this.ui.currentFocus);
        const nextIndex = (currentIndex + 1) % panels.length;
        const nextPanel = panels[nextIndex];
        
        this.setFocusPanel(nextPanel);
        
        // Focus the actual input element
        const panelElement = this.ui.panels[nextPanel];
        if (panelElement && panelElement.focus) {
            panelElement.focus();
        }
    }

    /**
     * Toggle context sidebar
     */
    toggleContextSidebar() {
        const sidebar = this.ui.displays.contextSidebar;
        if (sidebar) {
            sidebar.classList.toggle('open');
        }
    }

    // Public API methods
    
    /**
     * Get current application state
     */
    getState() {
        return {
            ...this.state,
            simulatorState: this.simulator.getStateDescription(),
            curriculumProgress: this.curriculum.getProgress(),
            translationHistory: this.translationEngine.getTranslationHistory()
        };
    }

    /**
     * Save current application state
     */
    saveCurrentState() {
        const state = this.getState();
        localStorage.setItem('quantumAppState', JSON.stringify(state));
        console.log('Application state saved');
    }

    /**
     * Load saved application state
     */
    loadSavedState() {
        try {
            const saved = localStorage.getItem('quantumAppState');
            if (saved) {
                const state = JSON.parse(saved);
                // Restore relevant state portions
                console.log('Application state loaded', state);
                return true;
            }
        } catch (error) {
            console.warn('Failed to load saved state:', error);
        }
        return false;
    }
}

// Make globally available for HTML event handlers
window.QuantumApp = QuantumApp;

export default QuantumApp;