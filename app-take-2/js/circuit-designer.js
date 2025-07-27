/**
 * Interactive Quantum Circuit Designer
 * 
 * Enables visual quantum circuit construction with drag-and-drop gates
 * Integrates with translation engine for quadratic fluency
 */

export class CircuitDesigner {
    constructor(container, translationEngine) {
        this.container = container;
        this.translationEngine = translationEngine;
        
        // Circuit state
        this.circuit = {
            qubits: 4,
            gates: [],
            measurements: []
        };
        
        // UI state
        this.selectedGate = null;
        this.draggedGate = null;
        this.gridSize = 60;
        this.qubitHeight = 40;
        
        // Gate definitions
        this.gateTypes = this.initializeGateTypes();
        
        // Event handlers
        this.eventHandlers = {
            mousedown: this.handleMouseDown.bind(this),
            mousemove: this.handleMouseMove.bind(this),
            mouseup: this.handleMouseUp.bind(this),
            click: this.handleClick.bind(this)
        };
        
        this.initialize();
    }

    /**
     * Initialize the circuit designer
     */
    initialize() {
        this.setupCanvas();
        this.setupGatePalette();
        this.setupEventListeners();
        this.render();
    }

    /**
     * Initialize gate type definitions
     */
    initializeGateTypes() {
        return {
            H: {
                name: 'Hadamard',
                symbol: 'H',
                qubits: 1,
                color: '#4ecdc4',
                description: 'Creates superposition: |0⟩ → (|0⟩ + |1⟩)/√2'
            },
            X: {
                name: 'Pauli-X',
                symbol: 'X',
                qubits: 1,
                color: '#e17055',
                description: 'Bit flip: |0⟩ ↔ |1⟩'
            },
            Y: {
                name: 'Pauli-Y',
                symbol: 'Y',
                qubits: 1,
                color: '#fdcb6e',
                description: 'Bit and phase flip'
            },
            Z: {
                name: 'Pauli-Z',
                symbol: 'Z',
                qubits: 1,
                color: '#6c5ce7',
                description: 'Phase flip: |1⟩ → -|1⟩'
            },
            RY: {
                name: 'Y Rotation',
                symbol: 'RY',
                qubits: 1,
                color: '#fd79a8',
                description: 'Rotation around Y-axis',
                parameterized: true,
                defaultParam: 'π/2'
            },
            RZ: {
                name: 'Z Rotation',
                symbol: 'RZ',
                qubits: 1,
                color: '#00b894',
                description: 'Rotation around Z-axis',
                parameterized: true,
                defaultParam: 'π/4'
            },
            CNOT: {
                name: 'Controlled-NOT',
                symbol: '⊕',
                qubits: 2,
                color: '#0984e3',
                description: 'Controlled bit flip, creates entanglement'
            },
            CZ: {
                name: 'Controlled-Z',
                symbol: 'CZ',
                qubits: 2,
                color: '#a29bfe',
                description: 'Controlled phase flip'
            },
            M: {
                name: 'Measurement',
                symbol: 'M',
                qubits: 1,
                color: '#2d3436',
                description: 'Collapse quantum state to classical bit'
            }
        };
    }

    /**
     * Set up the circuit canvas
     */
    setupCanvas() {
        const workspace = this.container.querySelector('.circuit-workspace');
        if (!workspace) return;
        
        // Clear existing content
        workspace.innerHTML = '';
        
        // Create circuit grid
        this.canvas = document.createElement('div');
        this.canvas.className = 'circuit-canvas-container';
        this.canvas.style.position = 'relative';
        this.canvas.style.width = '100%';
        this.canvas.style.minHeight = '300px';
        this.canvas.style.background = 'var(--bg-primary)';
        this.canvas.style.border = '1px solid var(--border-color)';
        this.canvas.style.borderRadius = 'var(--border-radius)';
        
        workspace.appendChild(this.canvas);
        
        // Create qubit lines
        this.createQubitLines();
        
        // Create gate drop zones
        this.createDropZones();
    }

    /**
     * Create visual qubit lines
     */
    createQubitLines() {
        for (let i = 0; i < this.circuit.qubits; i++) {
            const line = document.createElement('div');
            line.className = 'qubit-line-visual';
            line.style.position = 'absolute';
            line.style.left = '60px';
            line.style.right = '60px';
            line.style.top = `${60 + i * this.qubitHeight}px`;
            line.style.height = '2px';
            line.style.background = 'var(--border-accent)';
            line.style.zIndex = '1';
            
            // Add qubit label
            const label = document.createElement('div');
            label.className = 'qubit-label-visual';
            label.textContent = `|${i}⟩`;
            label.style.position = 'absolute';
            label.style.left = '20px';
            label.style.top = `${50 + i * this.qubitHeight}px`;
            label.style.color = 'var(--text-secondary)';
            label.style.fontSize = '14px';
            label.style.fontFamily = 'var(--font-math)';
            
            this.canvas.appendChild(line);
            this.canvas.appendChild(label);
        }
    }

    /**
     * Create drop zones for gates
     */
    createDropZones() {
        const columns = 10; // Number of time steps
        
        for (let col = 0; col < columns; col++) {
            for (let row = 0; row < this.circuit.qubits; row++) {
                const dropZone = document.createElement('div');
                dropZone.className = 'gate-drop-zone';
                dropZone.dataset.column = col;
                dropZone.dataset.qubit = row;
                dropZone.style.position = 'absolute';
                dropZone.style.left = `${100 + col * this.gridSize}px`;
                dropZone.style.top = `${45 + row * this.qubitHeight}px`;
                dropZone.style.width = `${this.gridSize - 10}px`;
                dropZone.style.height = `${this.qubitHeight - 10}px`;
                dropZone.style.border = '1px dashed transparent';
                dropZone.style.borderRadius = 'var(--border-radius)';
                dropZone.style.zIndex = '2';
                dropZone.style.cursor = 'pointer';
                
                // Hover effects
                dropZone.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    dropZone.style.border = '1px dashed var(--quantum-blue)';
                    dropZone.style.background = 'rgba(78, 205, 196, 0.1)';
                });
                
                dropZone.addEventListener('dragleave', () => {
                    dropZone.style.border = '1px dashed transparent';
                    dropZone.style.background = 'transparent';
                });
                
                dropZone.addEventListener('drop', (e) => {
                    e.preventDefault();
                    this.handleGateDrop(e, col, row);
                    dropZone.style.border = '1px dashed transparent';
                    dropZone.style.background = 'transparent';
                });
                
                this.canvas.appendChild(dropZone);
            }
        }
    }

    /**
     * Set up gate palette
     */
    setupGatePalette() {
        const palette = this.container.querySelector('#gate-palette');
        if (!palette) return;
        
        // Clear existing gates
        palette.innerHTML = '';
        
        // Add gates to palette
        Object.entries(this.gateTypes).forEach(([gateType, gate]) => {
            const gateBtn = document.createElement('button');
            gateBtn.className = 'gate-btn';
            gateBtn.dataset.gate = gateType;
            gateBtn.textContent = gate.symbol;
            gateBtn.style.backgroundColor = gate.color;
            gateBtn.style.color = this.getContrastColor(gate.color);
            gateBtn.title = `${gate.name}: ${gate.description}`;
            gateBtn.draggable = true;
            
            // Drag start event
            gateBtn.addEventListener('dragstart', (e) => {
                this.selectedGate = gateType;
                e.dataTransfer.setData('text/plain', gateType);
                gateBtn.style.opacity = '0.5';
            });
            
            gateBtn.addEventListener('dragend', () => {
                gateBtn.style.opacity = '1';
                this.selectedGate = null;
            });
            
            palette.appendChild(gateBtn);
        });
    }

    /**
     * Set up event listeners
     */
    setupEventListeners() {
        // Canvas interactions
        this.canvas.addEventListener('click', this.eventHandlers.click);
        this.canvas.addEventListener('mousedown', this.eventHandlers.mousedown);
        this.canvas.addEventListener('mousemove', this.eventHandlers.mousemove);
        this.canvas.addEventListener('mouseup', this.eventHandlers.mouseup);
        
        // Prevent default drag behavior
        this.canvas.addEventListener('dragover', (e) => e.preventDefault());
    }

    /**
     * Handle gate drop onto circuit
     */
    handleGateDrop(event, column, qubit) {
        const gateType = event.dataTransfer.getData('text/plain');
        if (!gateType || !this.gateTypes[gateType]) return;
        
        const gate = this.gateTypes[gateType];
        
        // Handle multi-qubit gates
        if (gate.qubits === 2) {
            this.handleTwoQubitGate(gateType, column, qubit);
        } else {
            this.addGateToCircuit(gateType, column, qubit);
        }
    }

    /**
     * Handle two-qubit gate placement
     */
    handleTwoQubitGate(gateType, column, qubit) {
        // For simplicity, place control on current qubit and target on next
        const control = qubit;
        const target = qubit + 1;
        
        if (target >= this.circuit.qubits) {
            this.showError('Cannot place two-qubit gate: insufficient qubits');
            return;
        }
        
        this.addTwoQubitGate(gateType, column, control, target);
    }

    /**
     * Add single-qubit gate to circuit
     */
    addGateToCircuit(gateType, column, qubit, parameter = null) {
        // Check if position is occupied
        const existing = this.circuit.gates.find(g => 
            g.column === column && g.qubits.includes(qubit)
        );
        
        if (existing) {
            this.removeGate(existing);
        }
        
        // Add new gate
        const gate = {
            id: this.generateGateId(),
            type: gateType,
            column,
            qubits: [qubit],
            parameter: parameter || this.gateTypes[gateType].defaultParam
        };
        
        this.circuit.gates.push(gate);
        this.renderGate(gate);
        this.notifyCircuitChange();
    }

    /**
     * Add two-qubit gate to circuit
     */
    addTwoQubitGate(gateType, column, control, target) {
        // Check if positions are occupied
        const conflicts = this.circuit.gates.filter(g => 
            g.column === column && (
                g.qubits.includes(control) || g.qubits.includes(target)
            )
        );
        
        conflicts.forEach(gate => this.removeGate(gate));
        
        // Add new gate
        const gate = {
            id: this.generateGateId(),
            type: gateType,
            column,
            qubits: [control, target],
            control,
            target
        };
        
        this.circuit.gates.push(gate);
        this.renderTwoQubitGate(gate);
        this.notifyCircuitChange();
    }

    /**
     * Render single-qubit gate
     */
    renderGate(gate) {
        const gateElement = document.createElement('div');
        gateElement.className = 'circuit-gate';
        gateElement.dataset.gateId = gate.id;
        gateElement.style.position = 'absolute';
        gateElement.style.left = `${100 + gate.column * this.gridSize}px`;
        gateElement.style.top = `${40 + gate.qubits[0] * this.qubitHeight}px`;
        gateElement.style.width = '50px';
        gateElement.style.height = '30px';
        gateElement.style.background = this.gateTypes[gate.type].color;
        gateElement.style.color = this.getContrastColor(this.gateTypes[gate.type].color);
        gateElement.style.border = '2px solid var(--bg-primary)';
        gateElement.style.borderRadius = 'var(--border-radius)';
        gateElement.style.display = 'flex';
        gateElement.style.alignItems = 'center';
        gateElement.style.justifyContent = 'center';
        gateElement.style.fontSize = '12px';
        gateElement.style.fontWeight = 'bold';
        gateElement.style.cursor = 'pointer';
        gateElement.style.zIndex = '10';
        
        // Gate symbol
        let symbol = this.gateTypes[gate.type].symbol;
        if (gate.parameter && gate.type.startsWith('R')) {
            symbol = `${gate.type}(${gate.parameter})`;
            gateElement.style.fontSize = '8px';
        }
        gateElement.textContent = symbol;
        
        // Right-click to remove
        gateElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.removeGate(gate);
        });
        
        // Double-click to edit parameters
        if (this.gateTypes[gate.type].parameterized) {
            gateElement.addEventListener('dblclick', () => {
                this.editGateParameter(gate);
            });
        }
        
        this.canvas.appendChild(gateElement);
    }

    /**
     * Render two-qubit gate
     */
    renderTwoQubitGate(gate) {
        const control = gate.control;
        const target = gate.target;
        
        // Create connection line
        const line = document.createElement('div');
        line.className = 'control-line';
        line.dataset.gateId = gate.id;
        line.style.position = 'absolute';
        line.style.left = `${125 + gate.column * this.gridSize}px`;
        line.style.top = `${55 + Math.min(control, target) * this.qubitHeight}px`;
        line.style.width = '2px';
        line.style.height = `${Math.abs(target - control) * this.qubitHeight}px`;
        line.style.background = this.gateTypes[gate.type].color;
        line.style.zIndex = '8';
        
        // Create control dot
        const controlDot = document.createElement('div');
        controlDot.className = 'control-dot';
        controlDot.dataset.gateId = gate.id;
        controlDot.style.position = 'absolute';
        controlDot.style.left = `${120 + gate.column * this.gridSize}px`;
        controlDot.style.top = `${50 + control * this.qubitHeight}px`;
        controlDot.style.width = '12px';
        controlDot.style.height = '12px';
        controlDot.style.background = this.gateTypes[gate.type].color;
        controlDot.style.borderRadius = '50%';
        controlDot.style.zIndex = '10';
        
        // Create target gate
        const targetGate = document.createElement('div');
        targetGate.className = 'target-gate';
        targetGate.dataset.gateId = gate.id;
        targetGate.style.position = 'absolute';
        targetGate.style.left = `${100 + gate.column * this.gridSize}px`;
        targetGate.style.top = `${40 + target * this.qubitHeight}px`;
        targetGate.style.width = '50px';
        targetGate.style.height = '30px';
        
        if (gate.type === 'CNOT') {
            targetGate.style.border = `3px solid ${this.gateTypes[gate.type].color}`;
            targetGate.style.borderRadius = '50%';
            targetGate.style.background = 'transparent';
            targetGate.innerHTML = '<span style="font-size: 16px; font-weight: bold;">⊕</span>';
        } else {
            targetGate.style.background = this.gateTypes[gate.type].color;
            targetGate.style.borderRadius = 'var(--border-radius)';
            targetGate.textContent = this.gateTypes[gate.type].symbol;
        }
        
        targetGate.style.display = 'flex';
        targetGate.style.alignItems = 'center';
        targetGate.style.justifyContent = 'center';
        targetGate.style.color = this.getContrastColor(this.gateTypes[gate.type].color);
        targetGate.style.cursor = 'pointer';
        targetGate.style.zIndex = '10';
        
        // Right-click to remove
        [line, controlDot, targetGate].forEach(element => {
            element.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.removeGate(gate);
            });
        });
        
        this.canvas.appendChild(line);
        this.canvas.appendChild(controlDot);
        this.canvas.appendChild(targetGate);
    }

    /**
     * Remove gate from circuit
     */
    removeGate(gate) {
        // Remove from circuit data
        this.circuit.gates = this.circuit.gates.filter(g => g.id !== gate.id);
        
        // Remove visual elements
        const elements = this.canvas.querySelectorAll(`[data-gate-id="${gate.id}"]`);
        elements.forEach(element => element.remove());
        
        this.notifyCircuitChange();
    }

    /**
     * Edit gate parameter
     */
    editGateParameter(gate) {
        const newParam = prompt(`Enter parameter for ${gate.type}:`, gate.parameter);
        if (newParam !== null) {
            gate.parameter = newParam;
            this.rerenderGate(gate);
            this.notifyCircuitChange();
        }
    }

    /**
     * Re-render a gate after parameter change
     */
    rerenderGate(gate) {
        // Remove existing visual elements
        const elements = this.canvas.querySelectorAll(`[data-gate-id="${gate.id}"]`);
        elements.forEach(element => element.remove());
        
        // Re-render
        if (gate.qubits.length === 1) {
            this.renderGate(gate);
        } else {
            this.renderTwoQubitGate(gate);
        }
    }

    /**
     * Notify of circuit changes for translation
     */
    notifyCircuitChange() {
        const circuitDescription = this.generateCircuitDescription();
        const circuitCode = this.generateCircuitCode();
        
        // Trigger translation update
        if (this.translationEngine) {
            this.translationEngine.translate(
                circuitDescription,
                'circuit',
                'code',
                { problemDomain: 'quantum_circuit' }
            ).then(result => {
                if (result.success) {
                    this.updateCodePanel(result.translation);
                }
            });
        }
        
        // Dispatch custom event
        const event = new CustomEvent('circuitChanged', {
            detail: {
                gates: this.circuit.gates,
                description: circuitDescription,
                code: circuitCode
            }
        });
        
        this.container.dispatchEvent(event);
    }

    /**
     * Generate human-readable circuit description
     */
    generateCircuitDescription() {
        if (this.circuit.gates.length === 0) {
            return 'Empty quantum circuit with identity operations only.';
        }
        
        const descriptions = this.circuit.gates
            .sort((a, b) => a.column - b.column)
            .map(gate => {
                const gateInfo = this.gateTypes[gate.type];
                if (gate.qubits.length === 1) {
                    return `${gateInfo.name} gate on qubit ${gate.qubits[0]}`;
                } else {
                    return `${gateInfo.name} gate with control qubit ${gate.control} and target qubit ${gate.target}`;
                }
            });
        
        return `Quantum circuit with ${descriptions.length} gates: ${descriptions.join(', ')}.`;
    }

    /**
     * Generate quantum code representation
     */
    generateCircuitCode() {
        const lines = [
            'from qiskit import QuantumCircuit',
            `circuit = QuantumCircuit(${this.circuit.qubits}, ${this.circuit.qubits})`,
            ''
        ];
        
        // Sort gates by column (time order)
        const sortedGates = this.circuit.gates.sort((a, b) => a.column - b.column);
        
        sortedGates.forEach(gate => {
            switch (gate.type) {
                case 'H':
                    lines.push(`circuit.h(${gate.qubits[0]})`);
                    break;
                case 'X':
                    lines.push(`circuit.x(${gate.qubits[0]})`);
                    break;
                case 'Y':
                    lines.push(`circuit.y(${gate.qubits[0]})`);
                    break;
                case 'Z':
                    lines.push(`circuit.z(${gate.qubits[0]})`);
                    break;
                case 'RY':
                    lines.push(`circuit.ry(${gate.parameter}, ${gate.qubits[0]})`);
                    break;
                case 'RZ':
                    lines.push(`circuit.rz(${gate.parameter}, ${gate.qubits[0]})`);
                    break;
                case 'CNOT':
                    lines.push(`circuit.cnot(${gate.control}, ${gate.target})`);
                    break;
                case 'CZ':
                    lines.push(`circuit.cz(${gate.control}, ${gate.target})`);
                    break;
                case 'M':
                    lines.push(`circuit.measure(${gate.qubits[0]}, ${gate.qubits[0]})`);
                    break;
            }
        });
        
        return lines.join('\n');
    }

    /**
     * Render the entire circuit
     */
    render() {
        // Clear existing gates
        this.canvas.querySelectorAll('.circuit-gate, .control-line, .control-dot, .target-gate')
            .forEach(element => element.remove());
        
        // Render all gates
        this.circuit.gates.forEach(gate => {
            if (gate.qubits.length === 1) {
                this.renderGate(gate);
            } else {
                this.renderTwoQubitGate(gate);
            }
        });
    }

    /**
     * Utility methods
     */
    
    generateGateId() {
        return 'gate_' + Math.random().toString(36).substr(2, 9);
    }

    getContrastColor(hexColor) {
        // Convert hex to RGB
        const r = parseInt(hexColor.slice(1, 3), 16);
        const g = parseInt(hexColor.slice(3, 5), 16);
        const b = parseInt(hexColor.slice(5, 7), 16);
        
        // Calculate luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }

    showError(message) {
        console.error('Circuit Designer Error:', message);
        // Could show toast notification
    }

    updateCodePanel(code) {
        const codePanel = document.getElementById('code-input');
        if (codePanel) {
            codePanel.value = code;
        }
    }

    // Event handlers
    handleMouseDown(event) {
        // Handle gate selection and dragging
    }

    handleMouseMove(event) {
        // Handle gate dragging
    }

    handleMouseUp(event) {
        // Complete gate dragging
    }

    handleClick(event) {
        // Handle gate selection
    }

    // Public API methods
    
    /**
     * Clear the circuit
     */
    clear() {
        this.circuit.gates = [];
        this.render();
        this.notifyCircuitChange();
    }

    /**
     * Load circuit from code
     */
    loadFromCode(code) {
        // Parse code and recreate circuit
        // This is a simplified implementation
        this.clear();
        this.notifyCircuitChange();
    }

    /**
     * Get circuit data
     */
    getCircuit() {
        return {
            ...this.circuit,
            description: this.generateCircuitDescription(),
            code: this.generateCircuitCode()
        };
    }

    /**
     * Set number of qubits
     */
    setQubitCount(count) {
        if (count < 1 || count > 8) return;
        
        this.circuit.qubits = count;
        this.setupCanvas(); // Recreate canvas with new qubit count
        this.render();
    }
}

export default CircuitDesigner;