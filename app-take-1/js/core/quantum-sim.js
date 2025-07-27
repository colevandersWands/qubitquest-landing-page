/**
 * Client-Side Quantum Simulation Engine
 * 
 * Lightweight quantum circuit simulation for educational purposes
 * Supports basic quantum operations for quadratic fluency training
 * 
 * Note: This is an educational simulator, not production quantum computing
 */

class QuantumSimulator {
    constructor() {
        this.precision = 1e-10;
        this.maxQubits = 8; // Limit for browser performance
        
        // Pre-computed matrices for common gates
        this.gates = {
            I: [[1, 0], [0, 1]], // Identity
            X: [[0, 1], [1, 0]], // Pauli-X (NOT)
            Y: [[0, this.complex(0, -1)], [this.complex(0, 1), 0]], // Pauli-Y
            Z: [[1, 0], [0, -1]], // Pauli-Z
            H: [[1/Math.sqrt(2), 1/Math.sqrt(2)], [1/Math.sqrt(2), -1/Math.sqrt(2)]], // Hadamard
            S: [[1, 0], [0, this.complex(0, 1)]], // S gate
            T: [[1, 0], [0, this.complexExp(Math.PI / 4)]], // T gate
        };
        
        this.state = null;
        this.numQubits = 0;
    }

    /**
     * Initialize quantum register with n qubits in |0...0⟩ state
     */
    initialize(numQubits) {
        if (numQubits > this.maxQubits) {
            throw new Error(`Maximum ${this.maxQubits} qubits supported for browser simulation`);
        }
        
        this.numQubits = numQubits;
        const stateSize = Math.pow(2, numQubits);
        
        // Initialize to |0...0⟩ state
        this.state = new Array(stateSize).fill(0);
        this.state[0] = 1; // |0...0⟩ has amplitude 1
        
        return this;
    }

    /**
     * Apply single-qubit gate to specified qubit
     */
    applyGate(gate, qubit) {
        if (qubit >= this.numQubits) {
            throw new Error(`Qubit ${qubit} out of range (0-${this.numQubits - 1})`);
        }
        
        const gateMatrix = this.getGateMatrix(gate);
        this.applySingleQubitGate(gateMatrix, qubit);
        
        return this;
    }

    /**
     * Apply parameterized rotation gates
     */
    applyRotation(axis, angle, qubit) {
        let gateMatrix;
        const cos = Math.cos(angle / 2);
        const sin = Math.sin(angle / 2);
        
        switch (axis.toUpperCase()) {
            case 'X':
            case 'RX':
                gateMatrix = [[cos, this.complex(0, -sin)], [this.complex(0, -sin), cos]];
                break;
            case 'Y':
            case 'RY':
                gateMatrix = [[cos, -sin], [sin, cos]];
                break;
            case 'Z':
            case 'RZ':
                gateMatrix = [[this.complexExp(-angle / 2), 0], [0, this.complexExp(angle / 2)]];
                break;
            default:
                throw new Error(`Unknown rotation axis: ${axis}`);
        }
        
        this.applySingleQubitGate(gateMatrix, qubit);
        return this;
    }

    /**
     * Apply controlled NOT (CNOT) gate
     */
    applyCNOT(control, target) {
        if (control >= this.numQubits || target >= this.numQubits) {
            throw new Error('CNOT qubits out of range');
        }
        if (control === target) {
            throw new Error('Control and target must be different qubits');
        }
        
        this.applyControlledGate(this.gates.X, control, target);
        return this;
    }

    /**
     * Apply controlled-Z gate
     */
    applyCZ(control, target) {
        if (control >= this.numQubits || target >= this.numQubits) {
            throw new Error('CZ qubits out of range');
        }
        if (control === target) {
            throw new Error('Control and target must be different qubits');
        }
        
        this.applyControlledGate(this.gates.Z, control, target);
        return this;
    }

    /**
     * Measure qubit and collapse state
     */
    measure(qubit) {
        if (qubit >= this.numQubits) {
            throw new Error(`Qubit ${qubit} out of range`);
        }
        
        // Calculate probabilities
        const prob0 = this.getMeasurementProbability(qubit, 0);
        const prob1 = this.getMeasurementProbability(qubit, 1);
        
        // Random measurement outcome
        const outcome = Math.random() < prob0 ? 0 : 1;
        
        // Collapse state
        this.collapseState(qubit, outcome);
        
        return outcome;
    }

    /**
     * Measure all qubits and return classical bit string
     */
    measureAll() {
        const results = [];
        
        // Measure from highest to lowest qubit to maintain state consistency
        for (let qubit = this.numQubits - 1; qubit >= 0; qubit--) {
            results.unshift(this.measure(qubit));
        }
        
        return results;
    }

    /**
     * Get measurement probabilities without collapsing state
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
     * Get probability distribution for measurement outcomes
     */
    getMeasurementDistribution() {
        const probs = this.getProbabilities();
        const distribution = {};
        
        for (let i = 0; i < probs.length; i++) {
            const binaryState = i.toString(2).padStart(this.numQubits, '0');
            distribution[binaryState] = probs[i];
        }
        
        return distribution;
    }

    /**
     * Get expectation value of Pauli-Z operator on specified qubit
     */
    getExpectationZ(qubit) {
        let expectation = 0;
        
        for (let i = 0; i < this.state.length; i++) {
            const amplitude = this.state[i];
            const probability = this.complexMagnitudeSquared(amplitude);
            
            // Check if qubit is in |1⟩ state for this basis state
            const qubitValue = (i >> (this.numQubits - 1 - qubit)) & 1;
            const eigenvalue = qubitValue === 0 ? 1 : -1;
            
            expectation += probability * eigenvalue;
        }
        
        return expectation;
    }

    /**
     * Get quantum state vector (for visualization)
     */
    getStateVector() {
        return [...this.state];
    }

    /**
     * Get state in human-readable form
     */
    getStateDescription() {
        const descriptions = [];
        const tolerance = this.precision;
        
        for (let i = 0; i < this.state.length; i++) {
            const amplitude = this.state[i];
            const magnitude = this.complexMagnitude(amplitude);
            
            if (magnitude > tolerance) {
                const binaryState = i.toString(2).padStart(this.numQubits, '0');
                const amplitudeStr = this.formatComplex(amplitude);
                descriptions.push(`${amplitudeStr}|${binaryState}⟩`);
            }
        }
        
        return descriptions.length > 0 ? descriptions.join(' + ') : '0';
    }

    /**
     * Apply single-qubit gate to specific qubit
     */
    applySingleQubitGate(gateMatrix, qubit) {
        const newState = new Array(this.state.length).fill(0);
        
        for (let i = 0; i < this.state.length; i++) {
            // Extract qubit value at position 'qubit'
            const qubitValue = (i >> (this.numQubits - 1 - qubit)) & 1;
            
            // Calculate new amplitudes
            for (let newQubitValue = 0; newQubitValue < 2; newQubitValue++) {
                const newIndex = this.flipBit(i, qubit, newQubitValue);
                const gateElement = gateMatrix[newQubitValue][qubitValue];
                
                newState[newIndex] = this.complexAdd(
                    newState[newIndex],
                    this.complexMultiply(this.state[i], gateElement)
                );
            }
        }
        
        this.state = newState;
    }

    /**
     * Apply controlled gate
     */
    applyControlledGate(gateMatrix, control, target) {
        const newState = [...this.state];
        
        for (let i = 0; i < this.state.length; i++) {
            const controlValue = (i >> (this.numQubits - 1 - control)) & 1;
            
            // Only apply gate if control is |1⟩
            if (controlValue === 1) {
                const targetValue = (i >> (this.numQubits - 1 - target)) & 1;
                
                // Apply gate to target qubit
                for (let newTargetValue = 0; newTargetValue < 2; newTargetValue++) {
                    const newIndex = this.flipBit(i, target, newTargetValue);
                    const gateElement = gateMatrix[newTargetValue][targetValue];
                    
                    if (newIndex !== i) { // Avoid double-counting diagonal elements
                        newState[newIndex] = this.complexAdd(
                            newState[newIndex],
                            this.complexMultiply(this.state[i], gateElement)
                        );
                        newState[i] = this.complexSubtract(
                            newState[i],
                            this.complexMultiply(this.state[i], gateElement)
                        );
                    } else {
                        newState[i] = this.complexMultiply(this.state[i], gateElement);
                    }
                }
            }
        }
        
        this.state = newState;
    }

    /**
     * Get measurement probability for specific qubit outcome
     */
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

    /**
     * Collapse quantum state after measurement
     */
    collapseState(qubit, outcome) {
        const probability = this.getMeasurementProbability(qubit, outcome);
        const normalization = 1 / Math.sqrt(probability);
        
        for (let i = 0; i < this.state.length; i++) {
            const qubitValue = (i >> (this.numQubits - 1 - qubit)) & 1;
            
            if (qubitValue === outcome) {
                this.state[i] = this.complexMultiply(this.state[i], normalization);
            } else {
                this.state[i] = 0;
            }
        }
    }

    /**
     * Utility functions for complex numbers and bit manipulation
     */
    
    getGateMatrix(gate) {
        if (typeof gate === 'string') {
            const gateMatrix = this.gates[gate.toUpperCase()];
            if (!gateMatrix) {
                throw new Error(`Unknown gate: ${gate}`);
            }
            return gateMatrix;
        }
        return gate; // Assume it's already a matrix
    }

    flipBit(index, qubit, newValue) {
        const mask = 1 << (this.numQubits - 1 - qubit);
        return (index & ~mask) | (newValue << (this.numQubits - 1 - qubit));
    }

    /**
     * Complex number operations
     */
    
    // Create complex number {real, imag}
    complex(real, imag = 0) {
        return { real, imag };
    }
    
    // Create complex exponential e^(i*theta)
    complexExp(theta) {
        return {
            real: Math.cos(theta),
            imag: Math.sin(theta)
        };
    }
    
    // Check if number is complex
    isComplex(z) {
        return typeof z === 'object' && z !== null && 'real' in z && 'imag' in z;
    }
    
    // Convert number to complex if needed
    toComplex(z) {
        if (this.isComplex(z)) return z;
        return { real: z, imag: 0 };
    }

    complexAdd(a, b) {
        const aComplex = this.toComplex(a);
        const bComplex = this.toComplex(b);
        
        const result = {
            real: aComplex.real + bComplex.real,
            imag: aComplex.imag + bComplex.imag
        };
        
        // Return real number if imaginary part is negligible
        if (Math.abs(result.imag) < this.precision) {
            return result.real;
        }
        return result;
    }

    complexSubtract(a, b) {
        const aComplex = this.toComplex(a);
        const bComplex = this.toComplex(b);
        
        const result = {
            real: aComplex.real - bComplex.real,
            imag: aComplex.imag - bComplex.imag
        };
        
        // Return real number if imaginary part is negligible
        if (Math.abs(result.imag) < this.precision) {
            return result.real;
        }
        return result;
    }

    complexMultiply(a, b) {
        const aComplex = this.toComplex(a);
        const bComplex = this.toComplex(b);
        
        const result = {
            real: aComplex.real * bComplex.real - aComplex.imag * bComplex.imag,
            imag: aComplex.real * bComplex.imag + aComplex.imag * bComplex.real
        };
        
        // Return real number if imaginary part is negligible
        if (Math.abs(result.imag) < this.precision) {
            return result.real;
        }
        return result;
    }

    complexMagnitude(z) {
        if (this.isComplex(z)) {
            return Math.sqrt(z.real * z.real + z.imag * z.imag);
        }
        return Math.abs(z);
    }

    complexMagnitudeSquared(z) {
        if (this.isComplex(z)) {
            return z.real * z.real + z.imag * z.imag;
        }
        return z * z;
    }

    formatComplex(z, precision = 3) {
        if (this.isComplex(z)) {
            const real = Math.abs(z.real) < this.precision ? 0 : z.real;
            const imag = Math.abs(z.imag) < this.precision ? 0 : z.imag;
            
            if (imag === 0) {
                if (Math.abs(real - 1) < this.precision) return '';
                if (Math.abs(real + 1) < this.precision) return '-';
                return real.toFixed(precision);
            }
            
            if (real === 0) {
                if (Math.abs(imag - 1) < this.precision) return 'i';
                if (Math.abs(imag + 1) < this.precision) return '-i';
                return `${imag.toFixed(precision)}i`;
            }
            
            const imagStr = imag > 0 ? `+${imag.toFixed(precision)}i` : `${imag.toFixed(precision)}i`;
            return `${real.toFixed(precision)}${imagStr}`;
        }
        
        if (Math.abs(z - 1) < this.precision) return '';
        if (Math.abs(z + 1) < this.precision) return '-';
        return z.toFixed(precision);
    }

    /**
     * Circuit simulation from operations list
     */
    simulateCircuit(operations) {
        // Reset to initial state
        this.initialize(this.numQubits);
        
        for (const op of operations) {
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
                    break;
                default:
                    console.warn(`Unknown operation: ${op.type}`);
            }
        }
        
        return this.getStateDescription();
    }

    /**
     * Generate random quantum circuit for testing
     */
    generateRandomCircuit(numQubits, depth) {
        this.initialize(numQubits);
        const operations = [];
        const gates = ['H', 'X', 'Y', 'Z', 'RX', 'RY', 'RZ'];
        
        for (let layer = 0; layer < depth; layer++) {
            // Random single-qubit gates
            for (let qubit = 0; qubit < numQubits; qubit++) {
                if (Math.random() < 0.3) { // 30% chance of gate on each qubit
                    const gate = gates[Math.floor(Math.random() * gates.length)];
                    const op = { type: gate, qubit };
                    
                    if (gate.startsWith('R')) {
                        op.angle = Math.random() * 2 * Math.PI;
                    }
                    
                    operations.push(op);
                }
            }
            
            // Random CNOT gates
            if (numQubits > 1 && Math.random() < 0.5) { // 50% chance of CNOT
                const control = Math.floor(Math.random() * numQubits);
                let target = Math.floor(Math.random() * numQubits);
                while (target === control) {
                    target = Math.floor(Math.random() * numQubits);
                }
                
                operations.push({ type: 'CNOT', control, target });
            }
        }
        
        return operations;
    }

    /**
     * Performance analysis for different algorithms
     */
    analyzePerformance(algorithm, problemSize) {
        const analyses = {
            'grover': {
                classical: `O(${problemSize})`,
                quantum: `O(√${problemSize})`,
                advantage: Math.sqrt(problemSize),
                optimal: problemSize > 1000
            },
            'random': {
                classical: 'O(1) - deterministic',
                quantum: 'O(1) - truly random',
                advantage: 'Cryptographic security',
                optimal: true
            },
            'factoring': {
                classical: `O(exp(${Math.log(problemSize)}^1/3))`,
                quantum: `O(log³(${problemSize}))`,
                advantage: 'Exponential',
                optimal: problemSize > 1000
            }
        };
        
        return analyses[algorithm] || {
            classical: 'Unknown',
            quantum: 'Unknown',
            advantage: 1,
            optimal: false
        };
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumSimulator;
}

// Global instance for direct HTML usage
window.QuantumSimulator = QuantumSimulator;