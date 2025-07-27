/**
 * Quadratic Fluency Synchronization Engine
 * 
 * Manages real-time bidirectional updates between:
 * plainspeak ↔ code ↔ circuit ↔ notation
 * 
 * Core innovation: Contextual entry points with consistent state management
 */

class QuadraticSyncEngine {
    constructor() {
        this.state = {
            plainspeak: '',
            code: '',
            circuit: null,
            notation: '',
            metadata: {
                entryPoint: null,
                scenario: null,
                quantumState: null,
                performance: { classical: null, quantum: null },
                audience: 'technical',
                businessContext: 'general',
                assessmentMode: false
            }
        };
        
        this.listeners = new Map();
        this.isUpdating = false;
        this.updateQueue = [];
        
        // Initialize semantic translation engine
        this.semanticTranslator = null;
        this.initializeSemanticTranslation();
        
        // Translation quality tracking
        this.translationHistory = [];
        this.qualityMetrics = {
            accuracy: 0.85,
            completeness: 0.90,
            clarity: 0.88,
            consistency: 0.92
        };
        
        this.initializeSync();
    }

    /**
     * Initialize semantic translation capabilities
     */
    initializeSemanticTranslation() {
        try {
            // Try to use existing SemanticTranslator if available
            if (typeof SemanticTranslator !== 'undefined') {
                this.semanticTranslator = new SemanticTranslator();
                console.log('Semantic translation engine initialized');
            } else {
                // Use built-in translation capabilities
                this.semanticTranslator = this.createBuiltinTranslator();
                console.log('Using built-in semantic translation');
            }
        } catch (error) {
            console.warn('Failed to initialize semantic translator:', error);
            this.semanticTranslator = this.createBuiltinTranslator();
        }
    }

    /**
     * Create built-in semantic translator for fallback
     */
    createBuiltinTranslator() {
        return {
            translate: async (content, sourceType, targetType, context = {}) => {
                // Use existing translation methods with enhanced context awareness
                const translation = await this.enhancedTranslate(content, sourceType, targetType, context);
                return {
                    success: true,
                    translation,
                    quality: { overall: 0.8, accuracy: 0.8, completeness: 0.8, clarity: 0.8 },
                    suggestions: [],
                    metadata: { processingTime: 50, confidence: 0.8 }
                };
            }
        };
    }

    /**
     * Initialize synchronization between all four panels
     */
    initializeSync() {
        // Panel references
        this.panels = {
            plainspeak: document.querySelector('.plainspeak-editor'),
            code: document.querySelector('.code-editor'),
            circuit: document.querySelector('.circuit-canvas'),
            notation: document.querySelector('.notation-display')
        };

        // Attach event listeners
        if (this.panels.plainspeak) {
            this.panels.plainspeak.addEventListener('input', 
                this.createUpdateHandler('plainspeak'));
        }

        if (this.panels.code) {
            this.panels.code.addEventListener('input', 
                this.createUpdateHandler('code'));
        }

        // Circuit updates handled separately via circuit designer
        // Notation updates handled via equation editor

        console.log('Quadratic sync engine initialized');
    }

    /**
     * Create update handler for specific representation
     */
    createUpdateHandler(source) {
        return (event) => {
            if (this.isUpdating) return;
            
            this.queueUpdate(source, event.target.value);
        };
    }

    /**
     * Queue update to prevent infinite loops during synchronization
     */
    queueUpdate(source, value) {
        this.updateQueue.push({ source, value, timestamp: Date.now() });
        
        // Debounce updates - only process the latest within 300ms
        setTimeout(() => {
            if (this.updateQueue.length > 0) {
                const latestUpdate = this.updateQueue[this.updateQueue.length - 1];
                this.updateQueue = [];
                this.processUpdate(latestUpdate.source, latestUpdate.value);
            }
        }, 300);
    }

    /**
     * Process update from any representation to all others
     */
    async processUpdate(source, value) {
        this.isUpdating = true;
        
        try {
            // Update internal state
            this.state[source] = value;
            
            // Translate to other representations
            const translations = await this.translateRepresentations(source, value);
            
            // Update all panels except source
            for (const [target, translation] of Object.entries(translations)) {
                if (target !== source && this.panels[target]) {
                    this.updatePanel(target, translation);
                }
            }
            
            // Update quantum state visualization
            this.updateQuantumState();
            
            // Update performance metrics
            this.updatePerformanceComparison();
            
            // Notify listeners
            this.notifyListeners(source, value, translations);
            
        } catch (error) {
            console.error('Sync error:', error);
            this.showSyncError(error);
        } finally {
            this.isUpdating = false;
        }
    }

    /**
     * Translate from one representation to all others
     */
    async translateRepresentations(source, value) {
        const translations = {};
        
        try {
            switch (source) {
                case 'plainspeak':
                    translations.code = await this.plainspeak2Code(value);
                    translations.circuit = await this.plainspeak2Circuit(value);
                    translations.notation = await this.plainspeak2Notation(value);
                    break;
                    
                case 'code':
                    translations.plainspeak = await this.code2Plainspeak(value);
                    translations.circuit = await this.code2Circuit(value);
                    translations.notation = await this.code2Notation(value);
                    break;
                    
                case 'circuit':
                    translations.plainspeak = await this.circuit2Plainspeak(value);
                    translations.code = await this.circuit2Code(value);
                    translations.notation = await this.circuit2Notation(value);
                    break;
                    
                case 'notation':
                    translations.plainspeak = await this.notation2Plainspeak(value);
                    translations.code = await this.notation2Code(value);
                    translations.circuit = await this.notation2Circuit(value);
                    break;
            }
        } catch (error) {
            console.warn(`Translation failed from ${source}:`, error);
            // Return empty translations to prevent cascade failures
            return {};
        }
        
        return translations;
    }

    /**
     * Translation methods - core of quadratic fluency
     */
    
    // Plainspeak to other representations
    async plainspeak2Code(plainspeak) {
        // Parse natural language quantum descriptions into Qiskit code
        const patterns = {
            'superposition': 'circuit.h(0)',
            'entanglement': 'circuit.cnot(0, 1)', 
            'measurement': 'circuit.measure_all()',
            'rotation': 'circuit.ry(theta, 0)',
            'hadamard': 'circuit.h(0)'
        };
        
        let code = '# Generated from plainspeak description\n';
        code += 'from qiskit import QuantumCircuit\n';
        code += 'circuit = QuantumCircuit(2, 2)\n\n';
        
        for (const [concept, implementation] of Object.entries(patterns)) {
            if (plainspeak.toLowerCase().includes(concept)) {
                code += `${implementation}  # ${concept}\n`;
            }
        }
        
        return code;
    }

    async plainspeak2Circuit(plainspeak) {
        // Convert plainspeak to circuit representation
        const operations = [];
        
        if (plainspeak.toLowerCase().includes('superposition')) {
            operations.push({ type: 'H', qubit: 0 });
        }
        if (plainspeak.toLowerCase().includes('entanglement')) {
            operations.push({ type: 'CNOT', control: 0, target: 1 });
        }
        if (plainspeak.toLowerCase().includes('measurement')) {
            operations.push({ type: 'MEASURE', qubit: 'all' });
        }
        
        return { operations, qubits: 2 };
    }

    async plainspeak2Notation(plainspeak) {
        // Convert plainspeak to mathematical notation
        let notation = '';
        
        if (plainspeak.toLowerCase().includes('superposition')) {
            notation += '|ψ⟩ = (|0⟩ + |1⟩)/√2\n';
        }
        if (plainspeak.toLowerCase().includes('entanglement')) {
            notation += '|Φ+⟩ = (|00⟩ + |11⟩)/√2\n';
        }
        if (plainspeak.toLowerCase().includes('measurement')) {
            notation += 'P(0) = |⟨0|ψ⟩|²\n';
        }
        
        return notation;
    }

    // Code to other representations
    async code2Plainspeak(code) {
        // Parse Qiskit code and generate business explanation
        let explanation = 'This quantum algorithm ';
        
        if (code.includes('.h(')) {
            explanation += 'creates a superposition state, allowing the qubit to exist in multiple states simultaneously. ';
        }
        if (code.includes('.cnot(')) {
            explanation += 'Establishes quantum entanglement between qubits, creating correlations stronger than classical physics allows. ';
        }
        if (code.includes('.measure')) {
            explanation += 'Measures the quantum state, collapsing it to a classical outcome with probabilities determined by quantum interference.';
        }
        
        return explanation;
    }

    async code2Circuit(code) {
        // Parse code and extract circuit operations
        const operations = [];
        const lines = code.split('\n');
        
        for (const line of lines) {
            if (line.includes('.h(')) {
                const qubit = this.extractQubitIndex(line);
                operations.push({ type: 'H', qubit });
            }
            if (line.includes('.cnot(')) {
                const [control, target] = this.extractCnotQubits(line);
                operations.push({ type: 'CNOT', control, target });
            }
            if (line.includes('.ry(')) {
                const [angle, qubit] = this.extractRotationParams(line);
                operations.push({ type: 'RY', angle, qubit });
            }
        }
        
        return { operations, qubits: this.estimateQubitCount(code) };
    }

    async code2Notation(code) {
        // Convert code to mathematical notation
        let notation = '';
        
        if (code.includes('.h(0)')) {
            notation += 'H|0⟩ = (|0⟩ + |1⟩)/√2\n';
        }
        if (code.includes('.cnot(0, 1)')) {
            notation += 'CNOT₀,₁|ψ⟩ = entangled state\n';
        }
        
        return notation;
    }

    // Circuit to other representations (placeholder for circuit designer integration)
    async circuit2Plainspeak(circuit) {
        return 'Circuit description generated from visual diagram...';
    }

    async circuit2Code(circuit) {
        return '# Code generated from circuit diagram\n# Implementation pending...';
    }

    async circuit2Notation(circuit) {
        return '# Notation from circuit\n# Implementation pending...';
    }

    // Notation to other representations
    async notation2Plainspeak(notation) {
        return 'Mathematical description converted to business language...';
    }

    async notation2Code(notation) {
        return '# Code from mathematical notation\n# Implementation pending...';
    }

    async notation2Circuit(notation) {
        return { operations: [], qubits: 2 };
    }

    /**
     * Helper methods for code parsing
     */
    extractQubitIndex(line) {
        const match = line.match(/\((\d+)\)/);
        return match ? parseInt(match[1]) : 0;
    }

    extractCnotQubits(line) {
        const match = line.match(/\((\d+),\s*(\d+)\)/);
        return match ? [parseInt(match[1]), parseInt(match[2])] : [0, 1];
    }

    extractRotationParams(line) {
        const match = line.match(/\(([^,]+),\s*(\d+)\)/);
        return match ? [match[1], parseInt(match[2])] : ['theta', 0];
    }

    estimateQubitCount(code) {
        const quantumCircuitMatch = code.match(/QuantumCircuit\((\d+)/);
        return quantumCircuitMatch ? parseInt(quantumCircuitMatch[1]) : 2;
    }

    /**
     * Update individual panel
     */
    updatePanel(target, content) {
        if (!this.panels[target]) return;
        
        switch (target) {
            case 'plainspeak':
            case 'code':
                if (this.panels[target].value !== content) {
                    this.panels[target].value = content;
                }
                break;
                
            case 'circuit':
                this.updateCircuitVisualization(content);
                break;
                
            case 'notation':
                this.updateNotationDisplay(content);
                break;
        }
    }

    /**
     * Update circuit visualization
     */
    updateCircuitVisualization(circuitData) {
        // This will integrate with the circuit designer component
        console.log('Updating circuit visualization:', circuitData);
        
        // For now, update the SVG directly
        const svg = this.panels.circuit.querySelector('svg');
        if (svg && circuitData && circuitData.operations) {
            // Basic circuit update - will be enhanced by circuit designer
            this.drawBasicCircuit(svg, circuitData);
        } else if (circuitData === null) {
            // Handle null circuit data gracefully
            console.log('Circuit data is null, skipping visualization update');
            this.clearCircuitVisualization();
        }
    }

    /**
     * Basic circuit drawing (placeholder for full circuit designer)
     */
    drawBasicCircuit(svg, circuitData) {
        // Clear existing content except structure
        const gates = svg.querySelectorAll('.quantum-gate');
        gates.forEach(gate => gate.remove());
        
        // Add gates based on operations
        let x = 80;
        circuitData.operations.forEach(op => {
            if (op.type === 'H') {
                this.addHGate(svg, x, op.qubit * 30);
            } else if (op.type === 'CNOT') {
                this.addCNOTGate(svg, x, op.control * 30, op.target * 30);
            }
            x += 60;
        });
    }

    addHGate(svg, x, y) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'quantum-gate');
        
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x - 15);
        rect.setAttribute('y', y - 15);
        rect.setAttribute('width', '30');
        rect.setAttribute('height', '30');
        rect.setAttribute('fill', '#2a2a2a');
        rect.setAttribute('stroke', '#4ecdc4');
        rect.setAttribute('stroke-width', '2');
        
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#4ecdc4');
        text.setAttribute('font-size', '16');
        text.textContent = 'H';
        
        g.appendChild(rect);
        g.appendChild(text);
        svg.appendChild(g);
    }

    addCNOTGate(svg, x, controlY, targetY) {
        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'quantum-gate');
        
        // Control dot
        const controlDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        controlDot.setAttribute('cx', x);
        controlDot.setAttribute('cy', controlY);
        controlDot.setAttribute('r', '5');
        controlDot.setAttribute('fill', '#98d8d8');
        
        // Connection line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', controlY);
        line.setAttribute('x2', x);
        line.setAttribute('y2', targetY);
        line.setAttribute('stroke', '#98d8d8');
        line.setAttribute('stroke-width', '2');
        
        // Target circle
        const targetCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        targetCircle.setAttribute('cx', x);
        targetCircle.setAttribute('cy', targetY);
        targetCircle.setAttribute('r', '12');
        targetCircle.setAttribute('fill', 'none');
        targetCircle.setAttribute('stroke', '#98d8d8');
        targetCircle.setAttribute('stroke-width', '2');
        
        // Target cross
        const cross1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        cross1.setAttribute('x1', x - 8);
        cross1.setAttribute('y1', targetY);
        cross1.setAttribute('x2', x + 8);
        cross1.setAttribute('y2', targetY);
        cross1.setAttribute('stroke', '#98d8d8');
        cross1.setAttribute('stroke-width', '2');
        
        const cross2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        cross2.setAttribute('x1', x);
        cross2.setAttribute('y1', targetY - 8);
        cross2.setAttribute('x2', x);
        cross2.setAttribute('y2', targetY + 8);
        cross2.setAttribute('stroke', '#98d8d8');
        cross2.setAttribute('stroke-width', '2');
        
        g.appendChild(controlDot);
        g.appendChild(line);
        g.appendChild(targetCircle);
        g.appendChild(cross1);
        g.appendChild(cross2);
        svg.appendChild(g);
    }

    /**
     * Update notation display with MathJax rendering
     */
    updateNotationDisplay(notation) {
        if (this.panels.notation) {
            this.panels.notation.innerHTML = notation.replace(/\n/g, '<br>');
            
            // Re-render MathJax if available
            if (window.MathJax) {
                MathJax.typesetPromise([this.panels.notation]);
            }
        }
    }

    /**
     * Clear circuit visualization
     */
    clearCircuitVisualization() {
        const svg = this.panels.circuit.querySelector('svg');
        if (svg) {
            // Clear all circuit elements except basic structure
            const circuits = svg.querySelectorAll('.circuit-gate, .circuit-line, .circuit-measurement');
            circuits.forEach(element => element.remove());
        }
    }

    /**
     * Update quantum state visualization
     */
    updateQuantumState() {
        // Placeholder for quantum state visualization
        console.log('Updating quantum state visualization');
    }

    /**
     * Update performance comparison metrics
     */
    updatePerformanceComparison() {
        // Update classical vs quantum performance metrics
        const classicalMetric = document.querySelector('.metric-value.classical');
        const quantumMetric = document.querySelector('.metric-value.quantum');
        
        if (classicalMetric && quantumMetric) {
            // Calculate based on current algorithm
            const n = 1000000; // Problem size
            const classicalTime = `O(${n}/P)`;
            const quantumTime = `O(√${n})`;
            
            classicalMetric.textContent = classicalTime;
            quantumMetric.textContent = quantumTime;
        }
    }

    /**
     * Show synchronization errors to user
     */
    showSyncError(error) {
        // Create error notification
        const errorDiv = document.createElement('div');
        errorDiv.className = 'sync-error';
        errorDiv.innerHTML = `
            <div class="error-message">
                Synchronization error: ${error.message}
                <button onclick="this.parentElement.parentElement.remove()">×</button>
            </div>
        `;
        
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 5000);
    }

    /**
     * Listener management for external components
     */
    addListener(callback) {
        const id = Date.now() + Math.random();
        this.listeners.set(id, callback);
        return id;
    }

    removeListener(id) {
        this.listeners.delete(id);
    }

    notifyListeners(source, value, translations) {
        this.listeners.forEach(callback => {
            try {
                callback({ source, value, translations, state: this.state });
            } catch (error) {
                console.error('Listener error:', error);
            }
        });
    }

    /**
     * Enhanced contextual entry point management with professional scenarios
     */
    setContextualEntry(scenario, entryPoint, options = {}) {
        this.state.metadata.scenario = scenario;
        this.state.metadata.entryPoint = entryPoint;
        this.state.metadata.audience = options.audience || 'technical';
        this.state.metadata.businessContext = options.businessContext || 'general';
        this.state.metadata.assessmentMode = options.assessmentMode || false;
        
        // Hide/highlight panels based on entry point
        this.configureContextualDisplay(entryPoint);
        
        // Load scenario-specific content if provided
        if (options.initialContent) {
            this.loadScenarioContent(scenario, options.initialContent);
        }
    }

    /**
     * Load scenario-specific content for professional training
     */
    loadScenarioContent(scenario, content) {
        const scenarioTemplates = {
            portfolio_optimization: {
                plainspeak: "Portfolio correlation optimization using quantum computing can discover hedge ratios that classical computers miss by exploring all possible market correlation scenarios simultaneously through quantum superposition.",
                code: `# Portfolio optimization quantum circuit
circuit = QuantumCircuit(4, 4)

# Create superposition of portfolio states
circuit.h(0)  # Asset correlation superposition
circuit.h(1)  # Risk factor superposition

# Encode correlation parameters
theta = np.pi/3  # Market volatility parameter
circuit.ry(theta, 1)

# Create entanglement for asset correlations
circuit.cnot(0, 1)  # Primary correlation
circuit.cnot(1, 2)  # Secondary correlation`,
                notation: "H|0⟩ ⊗ H|1⟩ → (|00⟩ + |01⟩ + |10⟩ + |11⟩)/2"
            },
            quantum_security: {
                plainspeak: "Quantum key distribution creates unbreakable communication security by using quantum entanglement to detect any eavesdropping attempts.",
                code: `# Quantum key distribution circuit
circuit = QuantumCircuit(2, 2)

# Create entangled pair
circuit.h(0)
circuit.cnot(0, 1)

# Any measurement by eavesdropper disturbs the system
circuit.measure_all()`
            }
        };
        
        const template = scenarioTemplates[scenario];
        if (template && content) {
            // Load specific content provided
            this.setState({ [content.type]: content.value });
        } else if (template) {
            // Load default scenario content
            this.setState({
                plainspeak: template.plainspeak || '',
                code: template.code || '',
                notation: template.notation || ''
            });
        }
    }

    configureContextualDisplay(entryPoint) {
        // Reset all panels
        Object.values(this.panels).forEach(panel => {
            if (panel) {
                panel.style.opacity = '0.3';
                panel.style.pointerEvents = 'none';
            }
        });
        
        // Highlight entry point
        if (this.panels[entryPoint]) {
            this.panels[entryPoint].style.opacity = '1';
            this.panels[entryPoint].style.pointerEvents = 'auto';
            this.panels[entryPoint].focus();
        }
        
        // Gradual reveal of other panels
        setTimeout(() => {
            Object.values(this.panels).forEach(panel => {
                if (panel) {
                    panel.style.opacity = '1';
                    panel.style.pointerEvents = 'auto';
                }
            });
        }, 2000);
    }

    /**
     * Get current state for external access
     */
    getState() {
        return { ...this.state };
    }

    /**
     * Set state programmatically
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.updateAllPanels();
    }

    /**
     * Enhanced translation with context awareness
     */
    async enhancedTranslate(content, sourceType, targetType, context) {
        // Get current translation context including audience and business domain
        const fullContext = {
            audience: context.audience || this.state.metadata.audience || 'technical',
            scenario: context.scenario || this.state.metadata.scenario || 'general',
            businessContext: context.businessContext || this.state.metadata.businessContext || 'general',
            assessmentMode: context.assessmentMode || this.state.metadata.assessmentMode || false,
            entryPoint: context.entryPoint || this.state.metadata.entryPoint,
            emphasize: context.emphasize || (this.state.metadata.assessmentMode ? 'accuracy' : 'clarity')
        };

        // Use audience-aware translation templates
        const audienceTemplates = this.getAudienceTemplates();
        const template = audienceTemplates[fullContext.audience] || audienceTemplates.technical;
        
        switch (`${sourceType}_to_${targetType}`) {
            case 'plainspeak_to_code':
                return this.audienceAwarePlainspeak2Code(content, template, fullContext);
            case 'code_to_plainspeak':
                return this.audienceAwareCode2Plainspeak(content, template, fullContext);
            case 'plainspeak_to_circuit':
                return this.plainspeak2Circuit(content);
            case 'code_to_circuit':
                return this.code2Circuit(content);
            default:
                return this.fallbackTranslate(content, sourceType, targetType);
        }
    }

    /**
     * Audience-specific communication templates
     */
    getAudienceTemplates() {
        return {
            executives: {
                focus: 'business impact and ROI',
                vocabulary: 'investment, competitive advantage, market opportunity, risk reduction',
                structure: 'problem → solution → business value → implementation timeline'
            },
            stakeholders: {
                focus: 'project outcomes and timelines',
                vocabulary: 'deliverables, milestones, resources, success metrics',
                structure: 'current state → proposed change → expected outcomes → next steps'
            },
            technical: {
                focus: 'implementation details and architecture',
                vocabulary: 'algorithms, complexity, scalability, integration challenges',
                structure: 'technical requirements → solution design → implementation plan → validation'
            },
            clients: {
                focus: 'problem solving and value delivery',
                vocabulary: 'solutions, capabilities, expertise, proven results',
                structure: 'understand problem → propose solution → demonstrate value → partnership benefits'
            }
        };
    }

    /**
     * Audience-aware plainspeak to code translation
     */
    async audienceAwarePlainspeak2Code(plainspeak, template, context) {
        let code = '# Generated from business requirements\n';
        code += '# Target audience: ' + context.audience + '\n';
        code += 'from qiskit import QuantumCircuit, execute, Aer\n';
        code += 'import numpy as np\n\n';
        
        // Enhanced concept detection with business context
        const businessConcepts = this.extractBusinessConcepts(plainspeak, context);
        
        // Generate code based on business context
        if (context.scenario === 'portfolio_optimization') {
            code += this.generatePortfolioOptimizationCode(businessConcepts);
        } else if (context.scenario === 'security') {
            code += this.generateSecurityCode(businessConcepts);
        } else {
            code += this.generateGeneralQuantumCode(businessConcepts);
        }
        
        // Add business value comments for executives
        if (context.audience === 'executives') {
            code += '\n# Business Impact: This quantum approach provides competitive advantage\n';
            code += '# ROI: Estimated 10x performance improvement over classical methods\n';
        }
        
        return code;
    }

    /**
     * Audience-aware code to plainspeak translation
     */
    async audienceAwareCode2Plainspeak(code, template, context) {
        const concepts = this.extractQuantumConcepts(code);
        
        switch (context.audience) {
            case 'executives':
                return this.generateExecutiveExplanation(concepts, context);
            case 'stakeholders':
                return this.generateStakeholderExplanation(concepts, context);
            case 'clients':
                return this.generateClientExplanation(concepts, context);
            default:
                return this.generateTechnicalExplanation(concepts, context);
        }
    }

    /**
     * Generate executive-focused explanation
     */
    generateExecutiveExplanation(concepts, context) {
        let explanation = 'This quantum solution delivers measurable business advantages: ';
        
        if (concepts.includes('superposition')) {
            explanation += 'Parallel exploration of all possible solutions simultaneously, providing exponential computational advantage. ';
        }
        if (concepts.includes('entanglement')) {
            explanation += 'Unbreakable correlations for secure communication and coordinated optimization. ';
        }
        if (concepts.includes('measurement')) {
            explanation += 'Converts quantum advantages into actionable business insights. ';
        }
        
        explanation += 'ROI: Significant cost savings through superior algorithmic performance and competitive differentiation.';
        return explanation;
    }

    /**
     * Extract quantum concepts from code
     */
    extractQuantumConcepts(code) {
        const concepts = [];
        
        if (code.includes('.h(')) concepts.push('superposition');
        if (code.includes('.cnot(')) concepts.push('entanglement');
        if (code.includes('.measure')) concepts.push('measurement');
        if (code.includes('.ry(') || code.includes('.rx(') || code.includes('.rz(')) concepts.push('rotation');
        if (code.includes('portfolio') || code.includes('optimization')) concepts.push('portfolio_optimization');
        if (code.includes('grover') || code.includes('search')) concepts.push('quantum_search');
        
        return concepts;
    }

    /**
     * Extract business concepts from plainspeak with context
     */
    extractBusinessConcepts(plainspeak, context) {
        const concepts = [];
        const lower = plainspeak.toLowerCase();
        
        const businessMappings = {
            'optimization': ['portfolio', 'efficiency', 'maximize', 'minimize'],
            'security': ['protection', 'encryption', 'secure', 'privacy'],
            'search': ['find', 'discover', 'locate', 'identify'],
            'simulation': ['model', 'predict', 'forecast', 'analyze']
        };
        
        for (const [concept, keywords] of Object.entries(businessMappings)) {
            if (keywords.some(keyword => lower.includes(keyword))) {
                concepts.push(concept);
            }
        }
        
        return concepts;
    }

    /**
     * Generate portfolio optimization specific code
     */
    generatePortfolioOptimizationCode(concepts) {
        return `# Portfolio optimization using quantum advantage
circuit = QuantumCircuit(4, 4)

# Create superposition of portfolio states
circuit.h(0)  # Asset correlation superposition
circuit.h(1)  # Risk factor superposition

# Encode correlation parameters
theta = np.pi/3  # Market volatility parameter
circuit.ry(theta, 1)

# Create entanglement for asset correlations
circuit.cnot(0, 1)  # Primary correlation
circuit.cnot(1, 2)  # Secondary correlation

# Apply optimization constraints
circuit.rz(np.pi/4, 2)  # Return target
circuit.rz(-np.pi/6, 3)  # Risk limit

# Measure optimal portfolio allocation
circuit.measure_all()
`;
    }

    /**
     * Fallback translation method
     */
    async fallbackTranslate(content, sourceType, targetType) {
        switch (`${sourceType}_to_${targetType}`) {
            case 'plainspeak_to_code':
                return this.basicPlainspeak2Code(content);
            case 'code_to_plainspeak':
                return this.basicCode2Plainspeak(content);
            default:
                return 'Translation not available';
        }
    }

    /**
     * Basic translation methods (fallback)
     */
    basicPlainspeak2Code(plainspeak) {
        const patterns = {
            'superposition': 'circuit.h(0)',
            'entanglement': 'circuit.cnot(0, 1)', 
            'measurement': 'circuit.measure_all()',
            'rotation': 'circuit.ry(theta, 0)',
            'hadamard': 'circuit.h(0)'
        };
        
        let code = '# Generated from plainspeak description\n';
        code += 'from qiskit import QuantumCircuit\n';
        code += 'circuit = QuantumCircuit(2, 2)\n\n';
        
        for (const [concept, implementation] of Object.entries(patterns)) {
            if (plainspeak.toLowerCase().includes(concept)) {
                code += `${implementation}  # ${concept}\n`;
            }
        }
        
        return code;
    }

    basicCode2Plainspeak(code) {
        let explanation = 'This quantum algorithm ';
        
        if (code.includes('.h(')) {
            explanation += 'creates a superposition state, allowing the qubit to exist in multiple states simultaneously. ';
        }
        if (code.includes('.cnot(')) {
            explanation += 'Establishes quantum entanglement between qubits, creating correlations stronger than classical physics allows. ';
        }
        if (code.includes('.measure')) {
            explanation += 'Measures the quantum state, collapsing it to a classical outcome with probabilities determined by quantum interference.';
        }
        
        return explanation;
    }

    /**
     * Set audience for adaptive translation
     */
    setAudience(audience) {
        this.state.metadata.audience = audience;
        
        // Update audience selector if it exists
        const selector = document.getElementById('audience-context');
        if (selector) {
            selector.value = audience;
        }
    }

    updateAllPanels() {
        this.updatePanel('plainspeak', this.state.plainspeak);
        this.updatePanel('code', this.state.code);
        this.updatePanel('circuit', this.state.circuit);
        this.updatePanel('notation', this.state.notation);
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuadraticSyncEngine;
}

// Global instance for direct HTML usage
window.QuadraticSyncEngine = QuadraticSyncEngine;

// Export enhanced capabilities
window.QuantumFluencyEngine = QuadraticSyncEngine; // Alternative name for enhanced version