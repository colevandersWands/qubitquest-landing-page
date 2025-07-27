/**
 * Enhanced Quantum Simulator for Professional Fluency Platform
 * 
 * Improvements over take-1:
 * - Better state visualization with amplitude and phase
 * - More accurate complex number handling
 * - Educational insights for business understanding
 * - Performance analysis for quantum vs classical comparison
 * - Error handling and validation
 * - Step-by-step execution tracking
 */

export class QuantumSimulator {
    constructor() {
        this.precision = 1e-12;
        this.maxQubits = 6; // Reduced for better browser performance
        this.state = null;
        this.numQubits = 0;
        this.executionHistory = [];
        this.measurementHistory = [];
        
        // Enhanced gate library with proper complex number support
        this.gates = this.initializeGates();
        
        // Educational insights for business context
        this.insights = {
            superpositionCount: 0,
            entanglementCount: 0,
            measurementCount: 0,
            gateComplexity: 0
        };
    }

    /**
     * Initialize quantum gate library with proper complex number matrices
     */
    initializeGates() {
        const sqrt2 = Math.sqrt(2);
        
        return {
            // Single-qubit gates
            I: [[{re: 1, im: 0}, {re: 0, im: 0}], 
                [{re: 0, im: 0}, {re: 1, im: 0}]],
            
            X: [[{re: 0, im: 0}, {re: 1, im: 0}], 
                [{re: 1, im: 0}, {re: 0, im: 0}]],
            
            Y: [[{re: 0, im: 0}, {re: 0, im: -1}], 
                [{re: 0, im: 1}, {re: 0, im: 0}]],
            
            Z: [[{re: 1, im: 0}, {re: 0, im: 0}], 
                [{re: 0, im: 0}, {re: -1, im: 0}]],
            
            H: [[{re: 1/sqrt2, im: 0}, {re: 1/sqrt2, im: 0}], 
                [{re: 1/sqrt2, im: 0}, {re: -1/sqrt2, im: 0}]],
            
            S: [[{re: 1, im: 0}, {re: 0, im: 0}], 
                [{re: 0, im: 0}, {re: 0, im: 1}]],
            
            T: [[{re: 1, im: 0}, {re: 0, im: 0}], 
                [{re: 0, im: 0}, {re: 1/sqrt2, im: 1/sqrt2}]],
            
            // Parameterized gates are generated dynamically
        };
    }

    /**
     * Initialize quantum register with n qubits in |0...0⟩ state
     */
    initialize(numQubits) {
        if (numQubits > this.maxQubits) {
            throw new Error(`Maximum ${this.maxQubits} qubits supported for optimal performance`);
        }
        
        this.numQubits = numQubits;
        const stateSize = Math.pow(2, numQubits);
        
        // Initialize to |0...0⟩ state with complex amplitudes
        this.state = new Array(stateSize).fill(null).map(() => ({re: 0, im: 0}));
        this.state[0] = {re: 1, im: 0}; // |0...0⟩ has amplitude 1
        
        // Reset tracking
        this.executionHistory = [];
        this.measurementHistory = [];
        this.insights = {
            superpositionCount: 0,
            entanglementCount: 0,
            measurementCount: 0,
            gateComplexity: 0
        };
        
        this.logExecution('INIT', {qubits: numQubits, state: 'initialized'});
        
        return this;
    }

    /**
     * Apply single-qubit gate with enhanced tracking
     */
    applyGate(gateName, qubit, params = {}) {
        this.validateQubit(qubit);
        
        const gateMatrix = this.getGateMatrix(gateName, params);
        const oldState = this.cloneState();
        
        this.applySingleQubitGate(gateMatrix, qubit);
        
        // Track insights for business understanding
        this.updateInsights(gateName, {qubit, params});
        
        this.logExecution('GATE', {
            gate: gateName,
            qubit,
            params,
            superposition: this.calculateSuperpositionDegree(),
            entanglement: this.calculateEntanglementDegree()
        });
        
        return this;
    }

    /**
     * Apply rotation gates with angle parameter
     */
    applyRotation(axis, angle, qubit) {
        this.validateQubit(qubit);
        
        const gateMatrix = this.createRotationGate(axis, angle);
        this.applySingleQubitGate(gateMatrix, qubit);
        
        this.updateInsights(`R${axis.toUpperCase()}`, {qubit, angle});
        
        this.logExecution('ROTATION', {
            axis,
            angle,
            qubit,
            degrees: angle * 180 / Math.PI
        });
        
        return this;
    }

    /**
     * Create rotation gate matrix
     */
    createRotationGate(axis, angle) {
        const cos = Math.cos(angle / 2);
        const sin = Math.sin(angle / 2);
        
        switch (axis.toUpperCase()) {
            case 'X':
                return [
                    [{re: cos, im: 0}, {re: 0, im: -sin}],
                    [{re: 0, im: -sin}, {re: cos, im: 0}]
                ];
            case 'Y':
                return [
                    [{re: cos, im: 0}, {re: -sin, im: 0}],
                    [{re: sin, im: 0}, {re: cos, im: 0}]
                ];
            case 'Z':
                return [
                    [{re: cos, im: -sin}, {re: 0, im: 0}],
                    [{re: 0, im: 0}, {re: cos, im: sin}]
                ];
            default:
                throw new Error(`Unknown rotation axis: ${axis}`);
        }
    }

    /**
     * Apply controlled NOT (CNOT) gate with enhanced tracking
     */
    applyCNOT(control, target) {
        this.validateQubit(control);
        this.validateQubit(target);
        
        if (control === target) {
            throw new Error('Control and target qubits must be different');
        }
        
        this.applyControlledGate(this.gates.X, control, target);
        
        this.insights.entanglementCount++;
        this.insights.gateComplexity += 2; // CNOT is a 2-qubit gate
        
        this.logExecution('CNOT', {
            control,
            target,
            entanglement: this.calculateEntanglementDegree()
        });
        
        return this;
    }

    /**
     * Apply controlled-Z gate
     */
    applyCZ(control, target) {
        this.validateQubit(control);
        this.validateQubit(target);
        
        if (control === target) {
            throw new Error('Control and target qubits must be different');
        }
        
        this.applyControlledGate(this.gates.Z, control, target);
        
        this.insights.entanglementCount++;
        this.insights.gateComplexity += 2;
        
        this.logExecution('CZ', {control, target});
        
        return this;
    }

    /**
     * Measure qubit and collapse state with detailed tracking
     */
    measure(qubit) {
        this.validateQubit(qubit);
        
        const prob0 = this.getMeasurementProbability(qubit, 0);
        const prob1 = this.getMeasurementProbability(qubit, 1);
        
        // Random measurement outcome
        const outcome = Math.random() < prob0 ? 0 : 1;
        
        // Store measurement details for analysis
        const measurementData = {
            qubit,
            outcome,
            probabilities: {0: prob0, 1: prob1},
            preState: this.getStateDescription(),
            timestamp: Date.now()
        };
        
        // Collapse state
        this.collapseState(qubit, outcome);
        
        this.insights.measurementCount++;
        this.measurementHistory.push(measurementData);
        
        this.logExecution('MEASURE', {
            qubit,
            outcome,
            probabilities: {0: prob0, 1: prob1},
            postState: this.getStateDescription()
        });
        
        return outcome;
    }

    /**
     * Measure all qubits and return classical bit string
     */
    measureAll() {
        const results = [];
        const preMeasurementProbs = this.getProbabilities();
        
        // Measure from highest to lowest qubit
        for (let qubit = this.numQubits - 1; qubit >= 0; qubit--) {
            results.unshift(this.measure(qubit));
        }
        
        this.logExecution('MEASURE_ALL', {
            results,
            preMeasurementProbs,
            finalState: results.join('')
        });
        
        return results;
    }

    /**
     * Get comprehensive probability distribution
     */
    getProbabilities() {
        const probs = [];
        
        for (let i = 0; i < this.state.length; i++) {
            const amplitude = this.state[i];
            const probability = this.complexMagnitudeSquared(amplitude);
            probs.push(probability);
        }
        
        return probs;
    }

    /**
     * Get probability distribution with binary state labels
     */
    getMeasurementDistribution() {
        const probs = this.getProbabilities();
        const distribution = {};
        
        for (let i = 0; i < probs.length; i++) {
            if (probs[i] > this.precision) {
                const binaryState = i.toString(2).padStart(this.numQubits, '0');
                distribution[binaryState] = probs[i];
            }
        }
        
        return distribution;
    }

    /**
     * Get human-readable state description with amplitudes and phases
     */
    getStateDescription(includePhases = false) {
        const descriptions = [];
        
        for (let i = 0; i < this.state.length; i++) {
            const amplitude = this.state[i];
            const magnitude = this.complexMagnitude(amplitude);
            
            if (magnitude > this.precision) {
                const binaryState = i.toString(2).padStart(this.numQubits, '0');
                const amplitudeStr = this.formatComplexNumber(amplitude, includePhases);
                descriptions.push(`${amplitudeStr}|${binaryState}⟩`);
            }
        }
        
        return descriptions.length > 0 ? descriptions.join(' + ') : '0';
    }

    /**
     * Calculate degree of superposition (0 = classical, 1 = maximum)
     */
    calculateSuperpositionDegree() {
        const probs = this.getProbabilities();
        const nonZeroProbs = probs.filter(p => p > this.precision);
        
        if (nonZeroProbs.length <= 1) return 0;
        
        // Use entropy as measure of superposition
        const entropy = -nonZeroProbs.reduce((sum, p) => sum + p * Math.log2(p), 0);
        const maxEntropy = Math.log2(nonZeroProbs.length);
        
        return entropy / maxEntropy;
    }

    /**
     * Calculate degree of entanglement (simplified measure)
     */
    calculateEntanglementDegree() {
        if (this.numQubits < 2) return 0;
        
        // Simplified entanglement measure based on tensor product decomposition
        // For educational purposes - not rigorous quantum information measure
        const probs = this.getProbabilities();
        const nonZeroProbs = probs.filter(p => p > this.precision);
        
        if (nonZeroProbs.length <= 1) return 0;
        
        // If state can be written as product state, entanglement is 0
        // Otherwise, measure deviation from product states
        const productStateProbability = this.calculateProductStateProbability();
        
        return 1 - productStateProbability;
    }

    /**
     * Calculate performance comparison with classical algorithms
     */
    getPerformanceAnalysis() {
        const gateCount = this.executionHistory.filter(entry => 
            ['GATE', 'ROTATION', 'CNOT', 'CZ'].includes(entry.type)
        ).length;
        
        const complexity = this.insights.gateComplexity;
        const superposition = this.calculateSuperpositionDegree();
        const entanglement = this.calculateEntanglementDegree();
        
        // Estimate quantum advantage based on circuit characteristics
        let quantumAdvantage = 1;
        
        if (superposition > 0.5) quantumAdvantage *= Math.pow(2, this.numQubits * superposition);
        if (entanglement > 0.5) quantumAdvantage *= Math.pow(2, entanglement);
        
        const classicalComplexity = Math.pow(2, this.numQubits);
        const quantumComplexity = gateCount;
        
        return {
            classical: {
                timeComplexity: `O(${classicalComplexity})`,
                spaceComplexity: `O(${classicalComplexity})`,
                description: 'Exhaustive classical search'
            },
            quantum: {
                timeComplexity: `O(${quantumComplexity})`,
                spaceComplexity: `O(${this.numQubits})`,
                description: 'Quantum parallel processing'
            },
            advantage: {
                speedup: Math.min(quantumAdvantage, classicalComplexity / quantumComplexity),
                spaceReduction: classicalComplexity / this.numQubits,
                feasible: quantumAdvantage > 1.5
            },
            insights: {
                superpositionLevel: superposition,
                entanglementLevel: entanglement,
                gateEfficiency: complexity / gateCount,
                measurementRatio: this.insights.measurementCount / gateCount
            }
        };
    }

    /**
     * Get business-friendly explanation of quantum advantage
     */
    getBusinessInsights() {
        const analysis = this.getPerformanceAnalysis();
        const insights = [];
        
        if (analysis.advantage.speedup > 10) {
            insights.push({
                type: 'advantage',
                title: 'Significant Quantum Speedup',
                description: `Quantum approach is ${Math.round(analysis.advantage.speedup)}x faster than classical methods`,
                impact: 'high'
            });
        }
        
        if (analysis.insights.superpositionLevel > 0.7) {
            insights.push({
                type: 'technical',
                title: 'Strong Superposition Usage',
                description: 'Algorithm efficiently explores multiple solutions simultaneously',
                impact: 'medium'
            });
        }
        
        if (analysis.insights.entanglementLevel > 0.5) {
            insights.push({
                type: 'technical',
                title: 'Quantum Entanglement Leveraged',
                description: 'Creates quantum correlations impossible with classical computing',
                impact: 'medium'
            });
        }
        
        if (analysis.advantage.feasible) {
            insights.push({
                type: 'business',
                title: 'Implementation Feasible',
                description: 'Problem structure well-suited for quantum computing',
                impact: 'high'
            });
        } else {
            insights.push({
                type: 'warning',
                title: 'Limited Quantum Advantage',
                description: 'Classical methods may be more practical for this problem size',
                impact: 'high'
            });
        }
        
        return insights;
    }

    /**
     * Simulate complete circuit from operation list
     */
    simulateCircuit(operations) {
        const startTime = performance.now();
        
        // Reset simulation state
        this.initialize(this.numQubits);
        
        const results = {
            success: true,
            errors: [],
            executionTime: 0,
            finalState: null,
            measurements: [],
            analysis: null
        };
        
        try {
            for (const op of operations) {
                this.executeOperation(op);
            }
            
            results.finalState = this.getStateDescription(true);
            results.measurements = this.measurementHistory;
            results.analysis = this.getPerformanceAnalysis();
            results.businessInsights = this.getBusinessInsights();
            
        } catch (error) {
            results.success = false;
            results.errors.push(error.message);
        }
        
        results.executionTime = performance.now() - startTime;
        
        return results;
    }

    /**
     * Execute individual operation with error handling
     */
    executeOperation(op) {
        switch (op.type.toUpperCase()) {
            case 'H':
                this.applyGate('H', op.qubit);
                break;
            case 'X':
                this.applyGate('X', op.qubit);
                break;
            case 'Y':
                this.applyGate('Y', op.qubit);
                break;
            case 'Z':
                this.applyGate('Z', op.qubit);
                break;
            case 'S':
                this.applyGate('S', op.qubit);
                break;
            case 'T':
                this.applyGate('T', op.qubit);
                break;
            case 'CNOT':
                this.applyCNOT(op.control, op.target);
                break;
            case 'CZ':
                this.applyCZ(op.control, op.target);
                break;
            case 'RX':
                this.applyRotation('X', op.angle, op.qubit);
                break;
            case 'RY':
                this.applyRotation('Y', op.angle, op.qubit);
                break;
            case 'RZ':
                this.applyRotation('Z', op.angle, op.qubit);
                break;
            case 'MEASURE':
                if (op.qubit === 'all') {
                    return this.measureAll();
                } else {
                    return this.measure(op.qubit);
                }
            default:
                throw new Error(`Unknown operation: ${op.type}`);
        }
    }

    // Internal helper methods

    validateQubit(qubit) {
        if (qubit < 0 || qubit >= this.numQubits) {
            throw new Error(`Qubit ${qubit} out of range (0-${this.numQubits - 1})`);
        }
    }

    getGateMatrix(gateName, params = {}) {
        const gate = this.gates[gateName.toUpperCase()];
        if (!gate) {
            throw new Error(`Unknown gate: ${gateName}`);
        }
        return gate;
    }

    applySingleQubitGate(gateMatrix, qubit) {
        const newState = new Array(this.state.length).fill(null).map(() => ({re: 0, im: 0}));
        
        for (let i = 0; i < this.state.length; i++) {
            const qubitValue = (i >> (this.numQubits - 1 - qubit)) & 1;
            
            for (let newQubitValue = 0; newQubitValue < 2; newQubitValue++) {
                const newIndex = this.flipBit(i, qubit, newQubitValue);
                const gateElement = gateMatrix[newQubitValue][qubitValue];
                
                const product = this.complexMultiply(this.state[i], gateElement);
                newState[newIndex] = this.complexAdd(newState[newIndex], product);
            }
        }
        
        this.state = newState;
    }

    applyControlledGate(gateMatrix, control, target) {
        const newState = [...this.state];
        
        for (let i = 0; i < this.state.length; i++) {
            const controlValue = (i >> (this.numQubits - 1 - control)) & 1;
            
            if (controlValue === 1) {
                const targetValue = (i >> (this.numQubits - 1 - target)) & 1;
                
                for (let newTargetValue = 0; newTargetValue < 2; newTargetValue++) {
                    const newIndex = this.flipBit(i, target, newTargetValue);
                    const gateElement = gateMatrix[newTargetValue][targetValue];
                    
                    if (newIndex !== i) {
                        const product = this.complexMultiply(this.state[i], gateElement);
                        newState[newIndex] = this.complexAdd(newState[newIndex], product);
                        newState[i] = this.complexSubtract(newState[i], product);
                    } else {
                        newState[i] = this.complexMultiply(this.state[i], gateElement);
                    }
                }
            }
        }
        
        this.state = newState;
    }

    getMeasurementProbability(qubit, outcome) {
        let probability = 0;
        
        for (let i = 0; i < this.state.length; i++) {
            const qubitValue = (i >> (this.numQubits - 1 - qubit)) & 1;
            
            if (qubitValue === outcome) {
                probability += this.complexMagnitudeSquared(this.state[i]);
            }
        }
        
        return probability;
    }

    collapseState(qubit, outcome) {
        const probability = this.getMeasurementProbability(qubit, outcome);
        const normalization = 1 / Math.sqrt(probability);
        
        for (let i = 0; i < this.state.length; i++) {
            const qubitValue = (i >> (this.numQubits - 1 - qubit)) & 1;
            
            if (qubitValue === outcome) {
                this.state[i] = this.complexMultiply(this.state[i], {re: normalization, im: 0});
            } else {
                this.state[i] = {re: 0, im: 0};
            }
        }
    }

    updateInsights(gateName, params) {
        if (gateName === 'H') {
            this.insights.superpositionCount++;
        }
        this.insights.gateComplexity++;
    }

    logExecution(type, data) {
        this.executionHistory.push({
            type,
            timestamp: Date.now(),
            data,
            stateSnapshot: this.cloneState()
        });
    }

    cloneState() {
        return this.state.map(amp => ({re: amp.re, im: amp.im}));
    }

    calculateProductStateProbability() {
        // Simplified calculation for educational purposes
        return 0.5; // Placeholder implementation
    }

    // Complex number operations

    complexAdd(a, b) {
        return {
            re: a.re + b.re,
            im: a.im + b.im
        };
    }

    complexSubtract(a, b) {
        return {
            re: a.re - b.re,
            im: a.im - b.im
        };
    }

    complexMultiply(a, b) {
        return {
            re: a.re * b.re - a.im * b.im,
            im: a.re * b.im + a.im * b.re
        };
    }

    complexMagnitude(z) {
        return Math.sqrt(z.re * z.re + z.im * z.im);
    }

    complexMagnitudeSquared(z) {
        return z.re * z.re + z.im * z.im;
    }

    formatComplexNumber(z, includePhases = false) {
        const magnitude = this.complexMagnitude(z);
        
        if (magnitude < this.precision) return '0';
        
        if (!includePhases) {
            if (Math.abs(magnitude - 1) < this.precision) return '';
            return magnitude.toFixed(3);
        }
        
        const re = Math.abs(z.re) < this.precision ? 0 : z.re;
        const im = Math.abs(z.im) < this.precision ? 0 : z.im;
        
        if (im === 0) return re.toFixed(3);
        if (re === 0) return `${im.toFixed(3)}i`;
        
        const imStr = im > 0 ? `+${im.toFixed(3)}i` : `${im.toFixed(3)}i`;
        return `(${re.toFixed(3)}${imStr})`;
    }

    flipBit(index, qubit, newValue) {
        const mask = 1 << (this.numQubits - 1 - qubit);
        return (index & ~mask) | (newValue << (this.numQubits - 1 - qubit));
    }
}

// Export as default for ES6 modules
export default QuantumSimulator;