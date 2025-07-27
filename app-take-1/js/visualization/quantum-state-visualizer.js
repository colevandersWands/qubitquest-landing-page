/**
 * Quantum State Visualization System
 * 
 * Real-time visualization of quantum states, probability distributions,
 * and quantum circuit execution for educational clarity
 */

class QuantumStateVisualizer {
    constructor(containerId, quantumSim) {
        this.container = document.getElementById(containerId);
        this.quantumSim = quantumSim;
        
        // Visualization settings
        this.settings = {
            animationSpeed: 1000, // ms
            colorScheme: {
                positive: '#4ecdc4',
                negative: '#ff6b6b',
                imaginary: '#98d8d8',
                probability: '#3a86ff',
                phase: '#8338ec'
            },
            displayMode: 'amplitude', // amplitude, probability, phase, bloch
            precision: 3
        };
        
        // Current visualization state
        this.currentState = null;
        this.animationId = null;
        this.isAnimating = false;
        
        this.initialize();
    }
    
    initialize() {
        console.log('<® Initializing Quantum State Visualizer');
        
        if (!this.container) {
            console.error('Container not found for quantum state visualizer');
            return;
        }
        
        this.createVisualizationUI();
        this.setupEventListeners();
        this.updateVisualization();
    }
    
    createVisualizationUI() {
        this.container.innerHTML = `
            <div class="quantum-state-visualizer">
                <div class="visualization-header">
                    <h3>Quantum State Visualization</h3>
                    <div class="visualization-controls">
                        <select class="display-mode-selector" onchange="quantumStateVisualizer.setDisplayMode(this.value)">
                            <option value="amplitude">Amplitude View</option>
                            <option value="probability">Probability Distribution</option>
                            <option value="phase">Phase Diagram</option>
                            <option value="bloch">Bloch Sphere</option>
                            <option value="density">Density Matrix</option>
                        </select>
                        <button class="reset-state-btn" onclick="quantumStateVisualizer.resetState()">
                            Reset |0È
                        </button>
                    </div>
                </div>
                
                <div class="visualization-content">
                    <div class="state-vector-display" id="state-vector-viz">
                        <!-- Dynamic state vector visualization -->
                    </div>
                    
                    <div class="measurement-probability" id="measurement-viz">
                        <!-- Measurement probability bars -->
                    </div>
                    
                    <div class="bloch-sphere-container" id="bloch-viz" style="display: none;">
                        <!-- 3D Bloch sphere visualization -->
                        <canvas id="bloch-canvas" width="400" height="400"></canvas>
                    </div>
                    
                    <div class="phase-diagram-container" id="phase-viz" style="display: none;">
                        <!-- Complex plane phase visualization -->
                        <canvas id="phase-canvas" width="400" height="400"></canvas>
                    </div>
                </div>
                
                <div class="state-information">
                    <div class="state-equation" id="state-equation">
                        <!-- Mathematical representation -->
                    </div>
                    <div class="state-metrics">
                        <div class="metric">
                            <label>Entropy:</label>
                            <span id="entropy-value">0.000</span>
                        </div>
                        <div class="metric">
                            <label>Purity:</label>
                            <span id="purity-value">1.000</span>
                        </div>
                        <div class="metric">
                            <label>Concurrence:</label>
                            <span id="concurrence-value">0.000</span>
                        </div>
                    </div>
                </div>
                
                <div class="gate-animation-controls">
                    <button onclick="quantumStateVisualizer.animateGate('H', 0)">HÄ</button>
                    <button onclick="quantumStateVisualizer.animateGate('X', 0)">XÄ</button>
                    <button onclick="quantumStateVisualizer.animateGate('Y', 0)">YÄ</button>
                    <button onclick="quantumStateVisualizer.animateGate('Z', 0)">ZÄ</button>
                    <button onclick="quantumStateVisualizer.animateGate('CNOT', 0, 1)">CNOTÄÅ</button>
                    <button onclick="quantumStateVisualizer.animateMeasurement()">=œ Measure</button>
                </div>
            </div>
        `;
    }
    
    /**
     * Update visualization based on current quantum state
     */
    updateVisualization() {
        if (!this.quantumSim || !this.quantumSim.state) {
            console.warn('No quantum state to visualize');
            return;
        }
        
        this.currentState = this.quantumSim.getStateVector();
        
        switch (this.settings.displayMode) {
            case 'amplitude':
                this.renderAmplitudeView();
                break;
            case 'probability':
                this.renderProbabilityView();
                break;
            case 'phase':
                this.renderPhaseView();
                break;
            case 'bloch':
                this.renderBlochSphere();
                break;
            case 'density':
                this.renderDensityMatrix();
                break;
        }
        
        this.updateStateEquation();
        this.updateMetrics();
    }
    
    /**
     * Render amplitude bar chart visualization
     */
    renderAmplitudeView() {
        const container = document.getElementById('state-vector-viz');
        if (!container) return;
        
        const numStates = this.currentState.length;
        const maxAmplitude = Math.max(...this.currentState.map(amp => 
            this.quantumSim.complexMagnitude(amp)
        ));
        
        let html = '<div class="amplitude-bars">';
        
        for (let i = 0; i < numStates; i++) {
            const amplitude = this.currentState[i];
            const magnitude = this.quantumSim.complexMagnitude(amplitude);
            const phase = this.getComplexPhase(amplitude);
            const height = (magnitude / (maxAmplitude || 1)) * 200;
            
            const binaryState = i.toString(2).padStart(this.quantumSim.numQubits, '0');
            
            html += `
                <div class="amplitude-bar-container">
                    <div class="amplitude-bar" style="height: ${height}px; background: ${this.getAmplitudeColor(amplitude)}">
                        <div class="amplitude-value">${magnitude.toFixed(3)}</div>
                        <div class="phase-indicator" style="transform: rotate(${phase}rad)">í</div>
                    </div>
                    <div class="state-label">|${binaryState}È</div>
                </div>
            `;
        }
        
        html += '</div>';
        container.innerHTML = html;
        
        // Show probability bars
        this.renderMeasurementProbabilities();
    }
    
    /**
     * Render measurement probability distribution
     */
    renderMeasurementProbabilities() {
        const container = document.getElementById('measurement-viz');
        if (!container) return;
        
        const probabilities = this.quantumSim.getProbabilities();
        const maxProb = Math.max(...probabilities);
        
        let html = '<div class="probability-distribution"><h4>Measurement Probabilities</h4><div class="prob-bars">';
        
        probabilities.forEach((prob, i) => {
            if (prob > 0.001) { // Only show significant probabilities
                const width = (prob / (maxProb || 1)) * 100;
                const binaryState = i.toString(2).padStart(this.quantumSim.numQubits, '0');
                
                html += `
                    <div class="prob-bar-row">
                        <div class="prob-state-label">|${binaryState}È</div>
                        <div class="prob-bar-container">
                            <div class="prob-bar" style="width: ${width}%">
                                <span class="prob-value">${(prob * 100).toFixed(1)}%</span>
                            </div>
                        </div>
                    </div>
                `;
            }
        });
        
        html += '</div></div>';
        container.innerHTML = html;
    }
    
    /**
     * Render phase diagram on complex plane
     */
    renderPhaseView() {
        this.hideAllViews();
        document.getElementById('phase-viz').style.display = 'block';
        
        const canvas = document.getElementById('phase-canvas');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 150;
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw coordinate axes
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvas.width, centerY);
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvas.height);
        ctx.stroke();
        
        // Draw unit circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#999';
        ctx.stroke();
        
        // Plot amplitudes
        this.currentState.forEach((amplitude, i) => {
            const magnitude = this.quantumSim.complexMagnitude(amplitude);
            if (magnitude > 0.01) { // Only plot significant amplitudes
                const real = this.getComplexReal(amplitude);
                const imag = this.getComplexImag(amplitude);
                
                const x = centerX + real * radius;
                const y = centerY - imag * radius; // Negative because canvas y-axis is inverted
                
                // Draw amplitude vector
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = this.settings.colorScheme.phase;
                ctx.lineWidth = 2;
                ctx.stroke();
                
                // Draw amplitude point
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = this.settings.colorScheme.phase;
                ctx.fill();
                
                // Label
                const binaryState = i.toString(2).padStart(this.quantumSim.numQubits, '0');
                ctx.fillStyle = '#fff';
                ctx.font = '12px monospace';
                ctx.fillText(`|${binaryState}È`, x + 10, y - 5);
            }
        });
        
        // Labels
        ctx.fillStyle = '#999';
        ctx.font = '14px sans-serif';
        ctx.fillText('Real', canvas.width - 40, centerY - 10);
        ctx.fillText('Imag', centerX + 10, 20);
    }
    
    /**
     * Render Bloch sphere for single qubit states
     */
    renderBlochSphere() {
        this.hideAllViews();
        document.getElementById('bloch-viz').style.display = 'block';
        
        // Only works for single qubit or reduced density matrix
        if (this.quantumSim.numQubits !== 1) {
            document.getElementById('bloch-viz').innerHTML = 
                '<p>Bloch sphere visualization available for single qubit states only.</p>';
            return;
        }
        
        const canvas = document.getElementById('bloch-canvas');
        const ctx = canvas.getContext('2d');
        
        // Calculate Bloch vector components
        const state = this.currentState;
        const blochVector = this.calculateBlochVector(state);
        
        // Draw sphere (simplified 2D projection)
        this.drawBlochSphere2D(ctx, canvas.width, canvas.height, blochVector);
    }
    
    /**
     * Calculate Bloch vector from quantum state
     */
    calculateBlochVector(state) {
        if (state.length !== 2) return { x: 0, y: 0, z: 0 };
        
        const alpha = state[0];
        const beta = state[1];
        
        // Pauli matrix expectations
        const x = 2 * this.getComplexReal(this.complexMultiply(
            this.complexConjugate(alpha), beta
        ));
        const y = 2 * this.getComplexImag(this.complexMultiply(
            this.complexConjugate(alpha), beta
        ));
        const z = this.quantumSim.complexMagnitudeSquared(alpha) - 
                  this.quantumSim.complexMagnitudeSquared(beta);
        
        return { x, y, z };
    }
    
    /**
     * Draw 2D projection of Bloch sphere
     */
    drawBlochSphere2D(ctx, width, height, blochVector) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(width, height) * 0.35;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Draw sphere outline
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = '#666';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw axes
        ctx.strokeStyle = '#999';
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(centerX - radius, centerY);
        ctx.lineTo(centerX + radius, centerY);
        ctx.stroke();
        
        // Y-axis (Z in 3D)
        ctx.beginPath();
        ctx.moveTo(centerX, centerY - radius);
        ctx.lineTo(centerX, centerY + radius);
        ctx.stroke();
        
        ctx.setLineDash([]);
        
        // Draw Bloch vector
        const x2D = centerX + blochVector.x * radius;
        const y2D = centerY - blochVector.z * radius; // Project Z to Y in 2D
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x2D, y2D);
        ctx.strokeStyle = this.settings.colorScheme.positive;
        ctx.lineWidth = 3;
        ctx.stroke();
        
        // Draw vector tip
        ctx.beginPath();
        ctx.arc(x2D, y2D, 6, 0, 2 * Math.PI);
        ctx.fillStyle = this.settings.colorScheme.positive;
        ctx.fill();
        
        // Labels
        ctx.fillStyle = '#fff';
        ctx.font = '14px sans-serif';
        ctx.fillText('|0È', centerX - 5, centerY - radius - 10);
        ctx.fillText('|1È', centerX - 5, centerY + radius + 20);
        ctx.fillText('|+È', centerX + radius + 10, centerY + 5);
        ctx.fillText('|È', centerX - radius - 25, centerY + 5);
    }
    
    /**
     * Update state equation display
     */
    updateStateEquation() {
        const container = document.getElementById('state-equation');
        if (!container) return;
        
        const stateStr = this.quantumSim.getStateDescription();
        container.innerHTML = `<h4>State Vector:</h4><div class="equation">|»È = ${stateStr}</div>`;
        
        // Re-render MathJax if available
        if (window.MathJax) {
            MathJax.typesetPromise([container]);
        }
    }
    
    /**
     * Update quantum state metrics
     */
    updateMetrics() {
        // Von Neumann entropy (for mixed states, simplified for pure states)
        const entropy = this.calculateEntropy();
        document.getElementById('entropy-value').textContent = entropy.toFixed(3);
        
        // Purity (always 1 for pure states)
        const purity = this.calculatePurity();
        document.getElementById('purity-value').textContent = purity.toFixed(3);
        
        // Concurrence (entanglement measure for 2 qubits)
        const concurrence = this.calculateConcurrence();
        document.getElementById('concurrence-value').textContent = concurrence.toFixed(3);
    }
    
    /**
     * Calculate von Neumann entropy
     */
    calculateEntropy() {
        // For pure states, entropy is 0
        // This is simplified - full implementation would use density matrix
        return 0;
    }
    
    /**
     * Calculate purity of quantum state
     */
    calculatePurity() {
        // For pure states, purity is 1
        // Tr(¡≤) where ¡ is density matrix
        return 1;
    }
    
    /**
     * Calculate concurrence (entanglement measure)
     */
    calculateConcurrence() {
        // Only meaningful for 2-qubit systems
        if (this.quantumSim.numQubits !== 2) return 0;
        
        // Simplified calculation for pure states
        const prob00 = this.quantumSim.complexMagnitudeSquared(this.currentState[0]);
        const prob11 = this.quantumSim.complexMagnitudeSquared(this.currentState[3]);
        const prob01 = this.quantumSim.complexMagnitudeSquared(this.currentState[1]);
        const prob10 = this.quantumSim.complexMagnitudeSquared(this.currentState[2]);
        
        return 2 * Math.sqrt(prob00 * prob11);
    }
    
    /**
     * Animate quantum gate application
     */
    animateGate(gateType, qubit, targetQubit = null) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        const startState = [...this.currentState];
        
        // Apply gate
        if (gateType === 'CNOT' && targetQubit !== null) {
            this.quantumSim.applyCNOT(qubit, targetQubit);
        } else {
            this.quantumSim.applyGate(gateType, qubit);
        }
        
        const endState = this.quantumSim.getStateVector();
        
        // Animate transition
        this.animateStateTransition(startState, endState);
    }
    
    /**
     * Animate state transition
     */
    animateStateTransition(startState, endState) {
        const duration = this.settings.animationSpeed;
        const startTime = Date.now();
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Interpolate states
            this.currentState = startState.map((start, i) => {
                const end = endState[i];
                return this.interpolateComplex(start, end, progress);
            });
            
            this.updateVisualization();
            
            if (progress < 1) {
                this.animationId = requestAnimationFrame(animate);
            } else {
                this.isAnimating = false;
                this.currentState = endState;
                this.updateVisualization();
            }
        };
        
        animate();
    }
    
    /**
     * Animate measurement process
     */
    animateMeasurement() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        
        // Show measurement animation
        const probabilities = this.quantumSim.getProbabilities();
        const outcome = this.quantumSim.measureAll();
        
        // Flash the measured outcome
        this.highlightMeasurementOutcome(outcome);
        
        setTimeout(() => {
            this.isAnimating = false;
            this.updateVisualization();
        }, 1000);
    }
    
    /**
     * Highlight measurement outcome
     */
    highlightMeasurementOutcome(outcome) {
        const outcomeIndex = parseInt(outcome.join(''), 2);
        const bars = document.querySelectorAll('.amplitude-bar-container');
        
        bars.forEach((bar, index) => {
            if (index === outcomeIndex) {
                bar.classList.add('measured-outcome');
                setTimeout(() => bar.classList.remove('measured-outcome'), 1000);
            } else {
                bar.style.opacity = '0.3';
                setTimeout(() => bar.style.opacity = '1', 1000);
            }
        });
    }
    
    /**
     * Reset quantum state to |0...0È
     */
    resetState() {
        this.quantumSim.initialize(this.quantumSim.numQubits);
        this.updateVisualization();
    }
    
    /**
     * Set display mode
     */
    setDisplayMode(mode) {
        this.settings.displayMode = mode;
        this.updateVisualization();
    }
    
    /**
     * Hide all visualization views
     */
    hideAllViews() {
        document.getElementById('state-vector-viz').style.display = 'none';
        document.getElementById('measurement-viz').style.display = 'none';
        document.getElementById('bloch-viz').style.display = 'none';
        document.getElementById('phase-viz').style.display = 'none';
    }
    
    /**
     * Complex number helper functions
     */
    getComplexReal(z) {
        return this.quantumSim.isComplex(z) ? z.real : z;
    }
    
    getComplexImag(z) {
        return this.quantumSim.isComplex(z) ? z.imag : 0;
    }
    
    getComplexPhase(z) {
        const real = this.getComplexReal(z);
        const imag = this.getComplexImag(z);
        return Math.atan2(imag, real);
    }
    
    complexConjugate(z) {
        if (this.quantumSim.isComplex(z)) {
            return { real: z.real, imag: -z.imag };
        }
        return z;
    }
    
    complexMultiply(a, b) {
        return this.quantumSim.complexMultiply(a, b);
    }
    
    interpolateComplex(start, end, progress) {
        const startReal = this.getComplexReal(start);
        const startImag = this.getComplexImag(start);
        const endReal = this.getComplexReal(end);
        const endImag = this.getComplexImag(end);
        
        const real = startReal + (endReal - startReal) * progress;
        const imag = startImag + (endImag - startImag) * progress;
        
        if (Math.abs(imag) < 1e-10) return real;
        return { real, imag };
    }
    
    getAmplitudeColor(amplitude) {
        const real = this.getComplexReal(amplitude);
        const imag = this.getComplexImag(amplitude);
        
        if (Math.abs(imag) > 0.01) {
            return this.settings.colorScheme.imaginary;
        } else if (real > 0) {
            return this.settings.colorScheme.positive;
        } else {
            return this.settings.colorScheme.negative;
        }
    }
    
    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Listen for quantum state changes
        if (this.quantumSim) {
            // Add custom event listener for state changes
            const originalApplyGate = this.quantumSim.applyGate.bind(this.quantumSim);
            this.quantumSim.applyGate = (...args) => {
                const result = originalApplyGate(...args);
                this.updateVisualization();
                return result;
            };
        }
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = QuantumStateVisualizer;
}

// Global instance
window.QuantumStateVisualizer = QuantumStateVisualizer;