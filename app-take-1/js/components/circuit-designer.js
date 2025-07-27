/**
 * Interactive Quantum Circuit Designer
 * 
 * Drag-and-drop quantum circuit builder with real-time synchronization
 * Core feature: Visual circuit design that updates code/notation/plainspeak
 */

class CircuitDesigner {
    constructor(container, syncEngine) {
        this.container = container;
        this.syncEngine = syncEngine;
        this.circuit = { operations: [], qubits: 4 };
        this.selectedGate = null;
        this.draggedGate = null;
        this.qubitLines = [];
        this.gatePositions = new Map();
        
        this.gates = {
            'H': { name: 'Hadamard', color: '#4ecdc4', symbol: 'H', description: 'Creates superposition' },
            'X': { name: 'Pauli-X', color: '#ff6b6b', symbol: 'X', description: 'Bit flip gate' },
            'Y': { name: 'Pauli-Y', color: '#ffd93d', symbol: 'Y', description: 'Y rotation gate' },
            'Z': { name: 'Pauli-Z', color: '#9b59b6', symbol: 'Z', description: 'Phase flip gate' },
            'CNOT': { name: 'Controlled-NOT', color: '#98d8d8', symbol: '⊕', description: 'Creates entanglement' },
            'CZ': { name: 'Controlled-Z', color: '#95a5a6', symbol: 'CZ', description: 'Controlled phase gate' },
            'RX': { name: 'X Rotation', color: '#e74c3c', symbol: 'RX', description: 'Parameterized X rotation', hasParam: true },
            'RY': { name: 'Y Rotation', color: '#f39c12', symbol: 'RY', description: 'Parameterized Y rotation', hasParam: true },
            'RZ': { name: 'Z Rotation', color: '#8e44ad', symbol: 'RZ', description: 'Parameterized Z rotation', hasParam: true },
            'M': { name: 'Measurement', color: '#34495e', symbol: '📊', description: 'Quantum measurement' }
        };
        
        this.initializeDesigner();
    }

    initializeDesigner() {
        this.createCircuitInterface();
        this.attachEventListeners();
        this.renderCircuit();
    }

    createCircuitInterface() {
        this.container.innerHTML = `
            <div class="circuit-designer">
                <div class="gate-palette">
                    <h4>Quantum Gates</h4>
                    <div class="gate-categories">
                        <div class="gate-category">
                            <h5>Single Qubit</h5>
                            <div class="gate-buttons">
                                ${['H', 'X', 'Y', 'Z'].map(gate => this.createGateButton(gate)).join('')}
                            </div>
                        </div>
                        <div class="gate-category">
                            <h5>Rotations</h5>
                            <div class="gate-buttons">
                                ${['RX', 'RY', 'RZ'].map(gate => this.createGateButton(gate)).join('')}
                            </div>
                        </div>
                        <div class="gate-category">
                            <h5>Two Qubit</h5>
                            <div class="gate-buttons">
                                ${['CNOT', 'CZ'].map(gate => this.createGateButton(gate)).join('')}
                            </div>
                        </div>
                        <div class="gate-category">
                            <h5>Measurement</h5>
                            <div class="gate-buttons">
                                ${this.createGateButton('M')}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="circuit-canvas-container">
                    <div class="circuit-controls">
                        <button class="btn-clear" onclick="circuitDesigner.clearCircuit()">Clear Circuit</button>
                        <button class="btn-undo" onclick="circuitDesigner.undoLastGate()">Undo</button>
                        <span class="qubit-count">Qubits: 
                            <select onchange="circuitDesigner.setQubitCount(this.value)">
                                ${[2,3,4,5,6].map(n => `<option value="${n}" ${n === 4 ? 'selected' : ''}>${n}</option>`).join('')}
                            </select>
                        </span>
                    </div>
                    
                    <div class="circuit-workspace" style="position: relative; width: 100%; min-height: 300px; background: #0a0a0a; border: 1px solid #333; border-radius: 4px;">
                        <!-- Interactive circuit will be rendered here -->
                    </div>
                    
                    <div class="circuit-info">
                        <div class="gate-info">
                            <strong>Gate Info:</strong> <span id="gate-info-text">Click a gate to see details</span>
                        </div>
                        <div class="circuit-stats">
                            <span>Gates: <span id="gate-count">0</span></span>
                            <span>Depth: <span id="circuit-depth">0</span></span>
                            <span>Entangling Gates: <span id="entangling-count">0</span></span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createGateButton(gateType) {
        const gate = this.gates[gateType];
        return `
            <button class="gate-btn" data-gate="${gateType}" 
                    draggable="true" 
                    style="background-color: ${gate.color}; color: ${this.getContrastColor(gate.color)}; border: 2px solid #fff; border-radius: 4px; padding: 8px 12px; margin: 2px; font-weight: bold; cursor: grab;"
                    title="${gate.name}: ${gate.description}">
                ${gate.symbol}
            </button>
        `;
    }

    attachEventListeners() {
        // Gate palette drag and drop
        const gateButtons = this.container.querySelectorAll('.gate-btn');
        gateButtons.forEach(btn => {
            btn.addEventListener('dragstart', this.handleGateDragStart.bind(this));
            btn.addEventListener('dragend', this.handleGateDragEnd.bind(this));
            btn.addEventListener('click', this.selectGate.bind(this));
        });

        // Circuit workspace interactions (handled in setupCanvas and createDropZones)
        const workspace = this.container.querySelector('.circuit-workspace');
        if (workspace) {
            workspace.addEventListener('click', this.handleCanvasClick.bind(this));
        }

        // Parameter input handling
        this.container.addEventListener('input', this.handleParameterChange.bind(this));
    }

    handleGateDragStart(event) {
        this.draggedGate = event.target.getAttribute('data-gate');
        event.dataTransfer.setData('text/plain', this.draggedGate);
        event.dataTransfer.effectAllowed = 'copy';
        event.target.style.opacity = '0.5';
        event.target.style.cursor = 'grabbing';
    }

    handleGateDragEnd(event) {
        event.target.style.opacity = '1';
        event.target.style.cursor = 'grab';
        this.draggedGate = null;
    }


    selectGate(event) {
        // Remove previous selection
        this.container.querySelectorAll('.gate-btn').forEach(btn => 
            btn.classList.remove('selected'));
        
        // Select current gate
        event.target.classList.add('selected');
        this.selectedGate = event.target.getAttribute('data-gate');
        
        // Update gate info
        const gate = this.gates[this.selectedGate];
        document.getElementById('gate-info-text').textContent = 
            `${gate.name}: ${gate.description}`;
    }

    handleDragOver(event) {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'copy';
    }

    handleDrop(event) {
        event.preventDefault();
        if (!this.draggedGate) return;

        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.addGateAtPosition(this.draggedGate, x, y);
        this.draggedGate = null;
    }

    handleCanvasClick(event) {
        if (!this.selectedGate) return;

        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        this.addGateAtPosition(this.selectedGate, x, y);
    }

    addGateAtPosition(gateType, x, y) {
        const position = this.screenToCircuitPosition(x, y);
        
        if (position.qubit < 0 || position.qubit >= this.circuit.qubits) {
            return; // Invalid qubit position
        }

        const gate = {
            type: gateType,
            qubit: position.qubit,
            time: position.time,
            id: this.generateGateId(),
            x: x,
            y: y
        };

        // Handle two-qubit gates
        if (gateType === 'CNOT' || gateType === 'CZ') {
            gate.target = this.selectTargetQubit(position.qubit);
            if (gate.target === null) return; // User cancelled
        }

        // Handle parameterized gates
        if (this.gates[gateType].hasParam) {
            gate.angle = this.promptForAngle(gateType);
            if (gate.angle === null) return; // User cancelled
        }

        this.circuit.operations.push(gate);
        this.sortOperationsByTime();
        this.renderCircuit();
        this.updateCircuitStats();
        this.syncWithOtherPanels();
    }

    selectTargetQubit(controlQubit) {
        const options = [];
        for (let i = 0; i < this.circuit.qubits; i++) {
            if (i !== controlQubit) {
                options.push(`Qubit ${i}`);
            }
        }
        
        const choice = prompt(`Select target qubit for ${this.selectedGate}:\\n${options.map((opt, i) => `${i}: ${opt}`).join('\\n')}`);
        
        if (choice === null) return null;
        
        const index = parseInt(choice);
        if (isNaN(index) || index < 0 || index >= options.length) {
            alert('Invalid selection');
            return null;
        }
        
        // Convert back to actual qubit number
        let targetQubit = 0;
        let optionIndex = 0;
        for (let i = 0; i < this.circuit.qubits; i++) {
            if (i !== controlQubit) {
                if (optionIndex === index) {
                    targetQubit = i;
                    break;
                }
                optionIndex++;
            }
        }
        
        return targetQubit;
    }

    promptForAngle(gateType) {
        const defaultValues = { 'RX': 'π/2', 'RY': 'π/2', 'RZ': 'π/4' };
        const input = prompt(`Enter angle for ${gateType} gate (examples: π/2, π/4, 1.57):`, defaultValues[gateType]);
        
        if (input === null) return null;
        
        // Parse common angle expressions safely
        let angle = input.toLowerCase()
            .replace(/π/g, Math.PI.toString())
            .replace(/pi/g, Math.PI.toString());
        
        try {
            // Safe evaluation using Function constructor instead of eval
            angle = this.safeEvaluateExpression(angle);
            return angle;
        } catch (e) {
            alert('Invalid angle expression');
            return null;
        }
    }

    /**
     * Safe expression evaluation for angle parsing
     */
    safeEvaluateExpression(expression) {
        // Remove any potentially dangerous characters
        const sanitized = expression.replace(/[^0-9+\-*/.() ]/g, '');
        
        // Check for common mathematical patterns
        const commonPatterns = {
            [`${Math.PI}/2`]: Math.PI / 2,
            [`${Math.PI}/4`]: Math.PI / 4,
            [`${Math.PI}/3`]: Math.PI / 3,
            [`${Math.PI}/6`]: Math.PI / 6,
            [`2*${Math.PI}/3`]: 2 * Math.PI / 3,
            [`3*${Math.PI}/4`]: 3 * Math.PI / 4,
            [`${Math.PI}`]: Math.PI,
            [`2*${Math.PI}`]: 2 * Math.PI
        };
        
        // Check if it matches a common pattern
        if (commonPatterns[sanitized]) {
            return commonPatterns[sanitized];
        }
        
        // Try to parse as a simple number
        const numericValue = parseFloat(sanitized);
        if (!isNaN(numericValue)) {
            return numericValue;
        }
        
        // Use Function constructor for safe evaluation of mathematical expressions
        try {
            const func = new Function('Math', `"use strict"; return (${sanitized})`);
            const result = func(Math);
            
            if (typeof result === 'number' && !isNaN(result)) {
                return result;
            }
        } catch (e) {
            // Fall back to direct parsing
        }
        
        throw new Error('Invalid mathematical expression');
    }

    screenToCircuitPosition(x, y) {
        const qubitSpacing = 40;
        const qubitOffset = 60;
        const timeStep = 80;
        const timeOffset = 100;

        const qubit = Math.round((y - qubitOffset) / qubitSpacing);
        const time = Math.round((x - timeOffset) / timeStep);

        return { qubit: Math.max(0, qubit), time: Math.max(0, time) };
    }

    generateGateId() {
        return 'gate_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    sortOperationsByTime() {
        this.circuit.operations.sort((a, b) => a.time - b.time);
    }

    renderCircuit() {
        const workspace = this.container.querySelector('.circuit-workspace');
        if (!workspace) return;

        // Clear existing content
        workspace.innerHTML = '';
        
        // Create canvas using modern HTML5 canvas with drag-and-drop zones
        this.setupCanvas(workspace);
        this.createQubitLines(workspace);
        this.createDropZones(workspace);
        
        // Draw gates
        this.circuit.operations.forEach(operation => {
            this.renderGateElement(workspace, operation);
        });
    }

    setupCanvas(workspace) {
        // Set up workspace for interactive circuit design
        workspace.style.position = 'relative';
        workspace.style.overflow = 'hidden';
        workspace.addEventListener('dragover', this.handleDragOver.bind(this));
        workspace.addEventListener('drop', this.handleWorkspaceDrop.bind(this));
    }

    createQubitLines(workspace) {
        const qubitHeight = 40;
        const qubitOffset = 60;
        
        for (let i = 0; i < this.circuit.qubits; i++) {
            const y = qubitOffset + i * qubitHeight;
            
            // Create qubit line
            const line = document.createElement('div');
            line.className = 'qubit-line-visual';
            line.style.position = 'absolute';
            line.style.left = '60px';
            line.style.right = '60px';
            line.style.top = `${y}px`;
            line.style.height = '2px';
            line.style.background = '#666';
            line.style.zIndex = '1';
            
            // Add qubit label
            const label = document.createElement('div');
            label.className = 'qubit-label-visual';
            label.textContent = `|${i}⟩`;
            label.style.position = 'absolute';
            label.style.left = '20px';
            label.style.top = `${y - 10}px`;
            label.style.color = '#999';
            label.style.fontSize = '14px';
            label.style.fontFamily = 'monospace';
            
            workspace.appendChild(line);
            workspace.appendChild(label);
        }
    }

    createDropZones(workspace) {
        const columns = 10; // Number of time steps
        const gridSize = 60;
        const qubitHeight = 40;
        const qubitOffset = 60;
        
        for (let col = 0; col < columns; col++) {
            for (let row = 0; row < this.circuit.qubits; row++) {
                const dropZone = document.createElement('div');
                dropZone.className = 'gate-drop-zone';
                dropZone.dataset.column = col;
                dropZone.dataset.qubit = row;
                dropZone.style.position = 'absolute';
                dropZone.style.left = `${100 + col * gridSize}px`;
                dropZone.style.top = `${qubitOffset - 15 + row * qubitHeight}px`;
                dropZone.style.width = `${gridSize - 10}px`;
                dropZone.style.height = `${qubitHeight - 10}px`;
                dropZone.style.border = '1px dashed transparent';
                dropZone.style.borderRadius = '4px';
                dropZone.style.zIndex = '2';
                dropZone.style.cursor = 'pointer';
                
                // Enhanced hover effects
                dropZone.addEventListener('dragover', (e) => {
                    e.preventDefault();
                    dropZone.style.border = '1px dashed #4ecdc4';
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
                
                workspace.appendChild(dropZone);
            }
        }
    }

    handleWorkspaceDrop(event) {
        // Handle drops outside specific zones
        event.preventDefault();
    }

    handleGateDrop(event, column, qubit) {
        const gateType = event.dataTransfer.getData('text/plain');
        if (!gateType || !this.gates[gateType]) return;

        const gate = this.gates[gateType];
        
        // Handle multi-qubit gates
        if (gate.name === 'Controlled-NOT' || gate.name === 'Controlled-Z') {
            this.handleTwoQubitGate(gateType, column, qubit);
        } else {
            this.addGateToCircuit(gateType, column, qubit);
        }
    }

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

    renderGateElement(workspace, operation) {
        const gate = this.gates[operation.type];
        const gridSize = 60;
        const qubitHeight = 40;
        const qubitOffset = 60;
        
        const x = 100 + operation.time * gridSize;
        const y = qubitOffset + operation.qubit * qubitHeight;

        const gateElement = document.createElement('div');
        gateElement.className = 'circuit-gate';
        gateElement.dataset.gateId = operation.id;
        gateElement.style.position = 'absolute';
        gateElement.style.left = `${x}px`;
        gateElement.style.top = `${y - 15}px`;
        gateElement.style.width = '50px';
        gateElement.style.height = '30px';
        gateElement.style.background = gate.color;
        gateElement.style.color = this.getContrastColor(gate.color);
        gateElement.style.border = '2px solid #fff';
        gateElement.style.borderRadius = '4px';
        gateElement.style.display = 'flex';
        gateElement.style.alignItems = 'center';
        gateElement.style.justifyContent = 'center';
        gateElement.style.fontSize = '12px';
        gateElement.style.fontWeight = 'bold';
        gateElement.style.cursor = 'pointer';
        gateElement.style.zIndex = '10';
        
        // Gate symbol
        let symbol = gate.symbol;
        if (operation.angle !== undefined && operation.type.startsWith('R')) {
            symbol = `${operation.type}(${this.formatAngle(operation.angle)})`;
            gateElement.style.fontSize = '8px';
        }
        gateElement.textContent = symbol;
        
        // Right-click to remove
        gateElement.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            this.removeGate(operation.id);
        });
        
        // Double-click to edit parameters
        if (gate.hasParam) {
            gateElement.addEventListener('dblclick', () => {
                this.editGateParameter(operation);
            });
        }
        
        workspace.appendChild(gateElement);
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

    renderGate(canvas, operation, timeOffset, qubitOffset, timeStep, qubitSpacing) {
        const gate = this.gates[operation.type];
        const x = timeOffset + operation.time * timeStep;
        const y = qubitOffset + operation.qubit * qubitSpacing;

        const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        g.setAttribute('class', 'circuit-gate');
        g.setAttribute('data-gate-id', operation.id);
        g.style.cursor = 'pointer';

        // Add click handler for gate removal
        g.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeGate(operation.id);
        });

        if (operation.type === 'CNOT' || operation.type === 'CZ') {
            this.renderTwoQubitGate(g, operation, x, y, qubitSpacing, gate);
        } else if (operation.type === 'M') {
            this.renderMeasurementGate(g, x, y, gate);
        } else {
            this.renderSingleQubitGate(g, operation, x, y, gate);
        }

        canvas.appendChild(g);
    }

    renderSingleQubitGate(g, operation, x, y, gate) {
        // Gate box
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x - 20);
        rect.setAttribute('y', y - 15);
        rect.setAttribute('width', '40');
        rect.setAttribute('height', '30');
        rect.setAttribute('fill', gate.color);
        rect.setAttribute('stroke', '#fff');
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('rx', '3');

        // Gate symbol
        const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        text.setAttribute('x', x);
        text.setAttribute('y', y + 5);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', 'white');
        text.setAttribute('font-size', '14');
        text.setAttribute('font-weight', 'bold');
        text.textContent = gate.symbol;

        g.appendChild(rect);
        g.appendChild(text);

        // Parameter display for rotation gates
        if (operation.angle !== undefined) {
            const paramText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            paramText.setAttribute('x', x);
            paramText.setAttribute('y', y - 20);
            paramText.setAttribute('text-anchor', 'middle');
            paramText.setAttribute('fill', gate.color);
            paramText.setAttribute('font-size', '10');
            paramText.textContent = this.formatAngle(operation.angle);
            g.appendChild(paramText);
        }
    }

    renderTwoQubitGate(g, operation, x, y, qubitSpacing, gate) {
        const targetY = y + (operation.target - operation.qubit) * qubitSpacing;

        // Connection line
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', y);
        line.setAttribute('x2', x);
        line.setAttribute('y2', targetY);
        line.setAttribute('stroke', gate.color);
        line.setAttribute('stroke-width', '3');

        // Control dot
        const controlDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        controlDot.setAttribute('cx', x);
        controlDot.setAttribute('cy', y);
        controlDot.setAttribute('r', '6');
        controlDot.setAttribute('fill', gate.color);

        // Target gate
        if (operation.type === 'CNOT') {
            // X target (circle with cross)
            const targetCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            targetCircle.setAttribute('cx', x);
            targetCircle.setAttribute('cy', targetY);
            targetCircle.setAttribute('r', '15');
            targetCircle.setAttribute('fill', 'none');
            targetCircle.setAttribute('stroke', gate.color);
            targetCircle.setAttribute('stroke-width', '3');

            const cross1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            cross1.setAttribute('x1', x - 10);
            cross1.setAttribute('y1', targetY);
            cross1.setAttribute('x2', x + 10);
            cross1.setAttribute('y2', targetY);
            cross1.setAttribute('stroke', gate.color);
            cross1.setAttribute('stroke-width', '3');

            const cross2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            cross2.setAttribute('x1', x);
            cross2.setAttribute('y1', targetY - 10);
            cross2.setAttribute('x2', x);
            cross2.setAttribute('y2', targetY + 10);
            cross2.setAttribute('stroke', gate.color);
            cross2.setAttribute('stroke-width', '3');

            g.appendChild(targetCircle);
            g.appendChild(cross1);
            g.appendChild(cross2);
        } else if (operation.type === 'CZ') {
            // Z target (filled circle)
            const targetDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            targetDot.setAttribute('cx', x);
            targetDot.setAttribute('cy', targetY);
            targetDot.setAttribute('r', '6');
            targetDot.setAttribute('fill', gate.color);
            g.appendChild(targetDot);
        }

        g.appendChild(line);
        g.appendChild(controlDot);
    }

    renderMeasurementGate(g, x, y, gate) {
        // Measurement box
        const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        rect.setAttribute('x', x - 20);
        rect.setAttribute('y', y - 15);
        rect.setAttribute('width', '40');
        rect.setAttribute('height', '30');
        rect.setAttribute('fill', gate.color);
        rect.setAttribute('stroke', '#fff');
        rect.setAttribute('stroke-width', '2');
        rect.setAttribute('rx', '3');

        // Measurement symbol (gauge)
        const arc = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        arc.setAttribute('d', 'M -10 5 Q 0 -5 10 5');
        arc.setAttribute('fill', 'none');
        arc.setAttribute('stroke', 'white');
        arc.setAttribute('stroke-width', '2');
        arc.setAttribute('transform', `translate(${x}, ${y})`);

        const needle = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        needle.setAttribute('x1', x);
        needle.setAttribute('y1', y);
        needle.setAttribute('x2', x + 8);
        needle.setAttribute('y2', y - 8);
        needle.setAttribute('stroke', 'white');
        needle.setAttribute('stroke-width', '2');

        g.appendChild(rect);
        g.appendChild(arc);
        g.appendChild(needle);
    }

    formatAngle(angle) {
        if (Math.abs(angle - Math.PI) < 0.01) return 'π';
        if (Math.abs(angle - Math.PI/2) < 0.01) return 'π/2';
        if (Math.abs(angle - Math.PI/4) < 0.01) return 'π/4';
        if (Math.abs(angle - Math.PI/3) < 0.01) return 'π/3';
        if (Math.abs(angle - 2*Math.PI/3) < 0.01) return '2π/3';
        return angle.toFixed(2);
    }

    removeGate(gateId) {
        this.circuit.operations = this.circuit.operations.filter(op => op.id !== gateId);
        this.renderCircuit();
        this.updateCircuitStats();
        this.syncWithOtherPanels();
    }

    clearCircuit() {
        this.circuit.operations = [];
        this.renderCircuit();
        this.updateCircuitStats();
        this.syncWithOtherPanels();
    }

    undoLastGate() {
        if (this.circuit.operations.length > 0) {
            this.circuit.operations.pop();
            this.renderCircuit();
            this.updateCircuitStats();
            this.syncWithOtherPanels();
        }
    }

    setQubitCount(count) {
        this.circuit.qubits = parseInt(count);
        this.circuit.operations = this.circuit.operations.filter(op => 
            op.qubit < this.circuit.qubits && (op.target === undefined || op.target < this.circuit.qubits)
        );
        this.renderCircuit();
        this.updateCircuitStats();
        this.syncWithOtherPanels();
    }

    updateCircuitStats() {
        document.getElementById('gate-count').textContent = this.circuit.operations.length;
        
        const depth = this.calculateCircuitDepth();
        document.getElementById('circuit-depth').textContent = depth;
        
        const entanglingGates = this.circuit.operations.filter(op => 
            op.type === 'CNOT' || op.type === 'CZ').length;
        document.getElementById('entangling-count').textContent = entanglingGates;
    }

    calculateCircuitDepth() {
        if (this.circuit.operations.length === 0) return 0;
        return Math.max(...this.circuit.operations.map(op => op.time)) + 1;
    }

    syncWithOtherPanels() {
        if (this.syncEngine) {
            // Generate code representation
            const code = this.generateQiskitCode();
            
            // Generate notation representation
            const notation = this.generateNotation();
            
            // Generate plainspeak representation
            const plainspeak = this.generatePlainspeak();

            // Update sync engine without triggering circuit update
            this.syncEngine.setState({
                code: code,
                notation: notation,
                plainspeak: plainspeak,
                circuit: this.circuit
            });
        }
    }

    generateQiskitCode() {
        if (this.circuit.operations.length === 0) {
            return `# Empty quantum circuit\nfrom qiskit import QuantumCircuit\ncircuit = QuantumCircuit(${this.circuit.qubits}, ${this.circuit.qubits})`;
        }

        let code = `# Generated quantum circuit\nfrom qiskit import QuantumCircuit\nimport numpy as np\n\n`;
        code += `circuit = QuantumCircuit(${this.circuit.qubits}, ${this.circuit.qubits})\n\n`;

        this.circuit.operations.forEach(op => {
            switch (op.type) {
                case 'H':
                    code += `circuit.h(${op.qubit})\n`;
                    break;
                case 'X':
                    code += `circuit.x(${op.qubit})\n`;
                    break;
                case 'Y':
                    code += `circuit.y(${op.qubit})\n`;
                    break;
                case 'Z':
                    code += `circuit.z(${op.qubit})\n`;
                    break;
                case 'CNOT':
                    code += `circuit.cnot(${op.qubit}, ${op.target})\n`;
                    break;
                case 'CZ':
                    code += `circuit.cz(${op.qubit}, ${op.target})\n`;
                    break;
                case 'RX':
                    code += `circuit.rx(${this.formatAngleForCode(op.angle)}, ${op.qubit})\n`;
                    break;
                case 'RY':
                    code += `circuit.ry(${this.formatAngleForCode(op.angle)}, ${op.qubit})\n`;
                    break;
                case 'RZ':
                    code += `circuit.rz(${this.formatAngleForCode(op.angle)}, ${op.qubit})\n`;
                    break;
                case 'M':
                    code += `circuit.measure(${op.qubit}, ${op.qubit})\n`;
                    break;
            }
        });

        return code;
    }

    formatAngleForCode(angle) {
        if (Math.abs(angle - Math.PI) < 0.01) return 'np.pi';
        if (Math.abs(angle - Math.PI/2) < 0.01) return 'np.pi/2';
        if (Math.abs(angle - Math.PI/4) < 0.01) return 'np.pi/4';
        return angle.toFixed(4);
    }

    generateNotation() {
        if (this.circuit.operations.length === 0) {
            return `Initial state: $|0\\rangle^{\\otimes ${this.circuit.qubits}}$`;
        }

        let notation = `Initial: $|0\\rangle^{\\otimes ${this.circuit.qubits}}$<br><br>`;
        
        const hasH = this.circuit.operations.some(op => op.type === 'H');
        const hasCNOT = this.circuit.operations.some(op => op.type === 'CNOT');
        const hasRotation = this.circuit.operations.some(op => ['RX', 'RY', 'RZ'].includes(op.type));

        if (hasH) {
            notation += 'After Hadamard: $\\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)$ superposition<br>';
        }
        
        if (hasCNOT) {
            notation += 'After CNOT: Entangled state $\\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$<br>';
        }
        
        if (hasRotation) {
            notation += 'Rotations: $R_y(\\theta)|\\psi\\rangle = \\cos(\\frac{\\theta}{2})|0\\rangle + \\sin(\\frac{\\theta}{2})|1\\rangle$<br>';
        }

        return notation;
    }

    generatePlainspeak() {
        if (this.circuit.operations.length === 0) {
            return 'Empty quantum circuit - ready for gate placement. Use drag-and-drop or click to add quantum gates.';
        }

        let description = 'This quantum circuit ';
        
        const gateTypes = new Set(this.circuit.operations.map(op => op.type));
        const descriptions = [];

        if (gateTypes.has('H')) {
            descriptions.push('creates quantum superposition using Hadamard gates');
        }
        
        if (gateTypes.has('CNOT') || gateTypes.has('CZ')) {
            descriptions.push('establishes quantum entanglement between qubits');
        }
        
        if (['RX', 'RY', 'RZ'].some(gate => gateTypes.has(gate))) {
            descriptions.push('applies parameterized rotations for precise quantum state control');
        }
        
        if (gateTypes.has('M')) {
            descriptions.push('performs quantum measurements to extract classical information');
        }

        if (descriptions.length > 0) {
            description += descriptions.join(', ') + '. ';
        }

        description += `The circuit operates on ${this.circuit.qubits} qubits with ${this.circuit.operations.length} quantum operations, creating complex quantum states that can outperform classical computation for specific algorithms.`;

        return description;
    }

    // Public API for external control
    loadCircuit(circuitData) {
        this.circuit = circuitData;
        this.renderCircuit();
        this.updateCircuitStats();
    }

    getCircuit() {
        return this.circuit;
    }

    handleParameterChange(event) {
        // Handle real-time parameter updates for rotation gates
        if (event.target.classList.contains('angle-input')) {
            const gateId = event.target.getAttribute('data-gate-id');
            const newAngle = parseFloat(event.target.value);
            
            const operation = this.circuit.operations.find(op => op.id === gateId);
            if (operation) {
                operation.angle = newAngle;
                this.renderCircuit();
                this.syncWithOtherPanels();
            }
        }
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CircuitDesigner;
}

// Global access
window.CircuitDesigner = CircuitDesigner;