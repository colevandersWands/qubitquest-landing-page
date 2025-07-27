/**
 * Live Code Executor
 * 
 * Executes Python/Qiskit code in the browser using Pyodide
 * Provides real-time feedback and quantum circuit simulation
 */

class CodeExecutor {
    constructor(syncEngine) {
        this.syncEngine = syncEngine;
        this.pyodide = null;
        this.isLoading = false;
        this.isReady = false;
        this.executionHistory = [];
        this.currentExecution = null;
        
        this.initializePyodide();
    }

    async initializePyodide() {
        if (this.isLoading || this.isReady) return;
        
        this.isLoading = true;
        this.showLoadingStatus('Initializing Python environment...');
        
        try {
            // Load Pyodide
            this.pyodide = await loadPyodide({
                indexURL: "https://cdn.jsdelivr.net/pyodide/v0.24.1/full/"
            });
            
            this.showLoadingStatus('Installing quantum computing packages...');
            
            // Install required packages
            await this.pyodide.loadPackage(['numpy', 'matplotlib']);
            
            // Install mock Qiskit (simplified for browser)
            await this.installMockQiskit();
            
            this.showLoadingStatus('Setting up quantum environment...');
            
            // Initialize quantum simulation environment
            await this.setupQuantumEnvironment();
            
            this.isReady = true;
            this.isLoading = false;
            this.hideLoadingStatus();
            
            console.log('Code executor ready');
            this.notifyReady();
            
        } catch (error) {
            console.error('Failed to initialize code executor:', error);
            this.showError('Failed to initialize Python environment: ' + error.message);
            this.isLoading = false;
        }
    }

    async installMockQiskit() {
        // Create a simplified Qiskit-like interface for browser execution
        const mockQiskitCode = `
import numpy as np
import json
from typing import List, Dict, Any

class QuantumCircuit:
    def __init__(self, qubits, classical_bits=None):
        self.qubits = qubits
        self.classical_bits = classical_bits or qubits
        self.operations = []
        self.measurements = []
        
    def h(self, qubit):
        """Hadamard gate"""
        self.operations.append({'type': 'H', 'qubit': qubit})
        return self
        
    def x(self, qubit):
        """Pauli-X gate"""
        self.operations.append({'type': 'X', 'qubit': qubit})
        return self
        
    def y(self, qubit):
        """Pauli-Y gate"""
        self.operations.append({'type': 'Y', 'qubit': qubit})
        return self
        
    def z(self, qubit):
        """Pauli-Z gate"""
        self.operations.append({'type': 'Z', 'qubit': qubit})
        return self
        
    def cnot(self, control, target):
        """CNOT gate"""
        self.operations.append({'type': 'CNOT', 'control': control, 'target': target})
        return self
        
    def cz(self, control, target):
        """Controlled-Z gate"""
        self.operations.append({'type': 'CZ', 'control': control, 'target': target})
        return self
        
    def rx(self, theta, qubit):
        """X rotation gate"""
        self.operations.append({'type': 'RX', 'angle': theta, 'qubit': qubit})
        return self
        
    def ry(self, theta, qubit):
        """Y rotation gate"""
        self.operations.append({'type': 'RY', 'angle': theta, 'qubit': qubit})
        return self
        
    def rz(self, theta, qubit):
        """Z rotation gate"""
        self.operations.append({'type': 'RZ', 'angle': theta, 'qubit': qubit})
        return self
        
    def measure(self, qubit, classical_bit):
        """Measure specific qubit"""
        self.measurements.append({'qubit': qubit, 'classical_bit': classical_bit})
        return self
        
    def measure_all(self):
        """Measure all qubits"""
        for i in range(self.qubits):
            self.measurements.append({'qubit': i, 'classical_bit': i})
        return self
        
    def barrier(self, *qubits):
        """Barrier (no-op for simulation)"""
        return self
        
    def draw(self, output='text'):
        """Draw circuit (simplified)"""
        circuit_str = f"Circuit with {self.qubits} qubits:\\n"
        for op in self.operations:
            if op['type'] in ['H', 'X', 'Y', 'Z']:
                circuit_str += f"{op['type']}(q{op['qubit']}) "
            elif op['type'] in ['CNOT', 'CZ']:
                circuit_str += f"{op['type']}(q{op['control']}, q{op['target']}) "
            elif 'angle' in op:
                circuit_str += f"{op['type']}({op['angle']:.3f}, q{op['qubit']}) "
        return circuit_str
        
    def to_dict(self):
        """Export circuit as dictionary"""
        return {
            'qubits': self.qubits,
            'operations': self.operations,
            'measurements': self.measurements
        }

class QuantumSimulator:
    def __init__(self):
        self.max_qubits = 8
        
    def run(self, circuit, shots=1024):
        """Simulate quantum circuit execution"""
        if circuit.qubits > self.max_qubits:
            raise ValueError(f"Maximum {self.max_qubits} qubits supported")
            
        # Simple simulation using classical probability
        results = {}
        
        # Calculate rough probabilities based on operations
        if any(op['type'] == 'H' for op in circuit.operations):
            # If we have Hadamard gates, create superposition-like results
            num_states = 2 ** circuit.qubits
            for i in range(min(shots, num_states)):
                state = format(np.random.randint(0, num_states), f'0{circuit.qubits}b')
                results[state] = results.get(state, 0) + 1
        else:
            # Mostly |0...0⟩ state without superposition
            zero_state = '0' * circuit.qubits
            results[zero_state] = shots
            
        return QuantumResult(results, shots)

class QuantumResult:
    def __init__(self, counts, shots):
        self.counts = counts
        self.shots = shots
        
    def get_counts(self):
        return self.counts
        
    def get_probabilities(self):
        return {state: count/self.shots for state, count in self.counts.items()}

# Create simulator instance
simulator = QuantumSimulator()

def execute(circuit, backend=None, shots=1024):
    """Execute quantum circuit"""
    if backend is None:
        backend = simulator
    return backend.run(circuit, shots)

# Mock some additional Qiskit functionality
class Aer:
    @staticmethod
    def get_backend(name):
        return simulator

# Export main classes and functions
__all__ = ['QuantumCircuit', 'execute', 'Aer', 'QuantumSimulator']
`;

        await this.pyodide.runPython(mockQiskitCode);
        
        // Make it available as 'qiskit' module
        this.pyodide.runPython(`
import sys
import types
qiskit = types.ModuleType('qiskit')
qiskit.QuantumCircuit = QuantumCircuit
qiskit.execute = execute
qiskit.Aer = Aer
sys.modules['qiskit'] = qiskit
`);
    }

    async setupQuantumEnvironment() {
        // Setup global environment for quantum computing
        await this.pyodide.runPython(`
import numpy as np
import json
from qiskit import QuantumCircuit, execute

# Helper functions for common quantum operations
def create_bell_state():
    """Create a Bell state"""
    circuit = QuantumCircuit(2, 2)
    circuit.h(0)
    circuit.cnot(0, 1)
    circuit.measure_all()
    return circuit

def grover_oracle(qubits, target):
    """Simple Grover oracle"""
    circuit = QuantumCircuit(qubits, qubits)
    # Simplified oracle - just flip phase of target state
    if target < qubits:
        circuit.z(target)
    return circuit

def random_circuit(qubits, depth):
    """Generate random quantum circuit"""
    circuit = QuantumCircuit(qubits, qubits)
    gates = ['h', 'x', 'y', 'z']
    
    for layer in range(depth):
        # Random single-qubit gates
        for qubit in range(qubits):
            if np.random.random() < 0.3:  # 30% chance
                gate = np.random.choice(gates)
                if gate == 'h':
                    circuit.h(qubit)
                elif gate == 'x':
                    circuit.x(qubit)
                elif gate == 'y':
                    circuit.y(qubit)
                elif gate == 'z':
                    circuit.z(qubit)
        
        # Random CNOT gates
        if qubits > 1 and np.random.random() < 0.5:  # 50% chance
            control = np.random.randint(0, qubits)
            target = np.random.randint(0, qubits)
            while target == control:
                target = np.random.randint(0, qubits)
            circuit.cnot(control, target)
    
    circuit.measure_all()
    return circuit

# Global variables for interactive use
print("Quantum environment ready!")
print("Available: QuantumCircuit, execute, create_bell_state, grover_oracle, random_circuit")
`);
    }

    showLoadingStatus(message) {
        let status = document.getElementById('code-executor-status');
        if (!status) {
            status = document.createElement('div');
            status.id = 'code-executor-status';
            status.className = 'code-executor-loading';
            document.body.appendChild(status);
        }
        
        status.innerHTML = `
            <div class="loading-content">
                <div class="loading-spinner"></div>
                <div class="loading-message">${message}</div>
            </div>
        `;
    }

    hideLoadingStatus() {
        const status = document.getElementById('code-executor-status');
        if (status) {
            status.remove();
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'code-executor-error';
        errorDiv.innerHTML = `
            <div class="error-content">
                <h4>Code Execution Error</h4>
                <p>${message}</p>
                <button onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        document.body.appendChild(errorDiv);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (errorDiv.parentElement) {
                errorDiv.remove();
            }
        }, 10000);
    }

    notifyReady() {
        // Notify other components that code executor is ready
        document.dispatchEvent(new CustomEvent('codeExecutorReady', {
            detail: { executor: this }
        }));
    }

    async executeCode(code, options = {}) {
        if (!this.isReady) {
            if (!this.isLoading) {
                this.initializePyodide();
            }
            throw new Error('Code executor not ready. Please wait for initialization.');
        }

        const execution = {
            id: Date.now() + Math.random(),
            code: code,
            startTime: Date.now(),
            output: '',
            error: null,
            result: null,
            options: options
        };

        this.currentExecution = execution;

        try {
            // Capture stdout
            this.pyodide.runPython(`
import sys
import io
sys.stdout = io.StringIO()
sys.stderr = io.StringIO()
`);

            // Execute the user code
            const result = await this.pyodide.runPython(code);

            // Get captured output
            const stdout = this.pyodide.runPython("sys.stdout.getvalue()");
            const stderr = this.pyodide.runPython("sys.stderr.getvalue()");

            execution.output = stdout;
            execution.result = result;
            execution.endTime = Date.now();

            if (stderr) {
                execution.error = stderr;
            }

            // Reset stdout/stderr
            this.pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

            // Check if circuit was created and sync with other panels
            await this.checkAndSyncCircuit();

            this.executionHistory.push(execution);
            this.currentExecution = null;

            return execution;

        } catch (error) {
            execution.error = error.message;
            execution.endTime = Date.now();
            
            // Reset stdout/stderr
            this.pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

            this.executionHistory.push(execution);
            this.currentExecution = null;

            throw execution;
        }
    }

    async checkAndSyncCircuit() {
        try {
            // Check if a circuit variable exists in Python environment
            const hasCircuit = this.pyodide.runPython(`
'circuit' in globals() and hasattr(circuit, 'to_dict')
`);

            if (hasCircuit) {
                const circuitData = this.pyodide.runPython(`
import json
json.dumps(circuit.to_dict())
`);

                const circuit = JSON.parse(circuitData);
                
                // Update circuit designer if available
                if (window.circuitDesigner) {
                    window.circuitDesigner.loadCircuit(circuit);
                }

                // Generate notation and plainspeak
                const notation = this.generateNotationFromCircuit(circuit);
                const plainspeak = this.generatePlainspeakFromCircuit(circuit);

                // Update sync engine
                if (this.syncEngine) {
                    this.syncEngine.setState({
                        circuit: circuit,
                        notation: notation,
                        plainspeak: plainspeak
                    });
                }
            }
        } catch (error) {
            console.warn('Could not sync circuit:', error);
        }
    }

    generateNotationFromCircuit(circuit) {
        let notation = `$|\\psi_0\\rangle = |0\\rangle^{\\otimes ${circuit.qubits}}$<br><br>`;
        
        const operations = circuit.operations || [];
        
        if (operations.some(op => op.type === 'H')) {
            notation += 'After Hadamard: $\\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)$ superposition<br>';
        }
        
        if (operations.some(op => op.type === 'CNOT')) {
            notation += 'After CNOT: Entangled state $\\frac{1}{\\sqrt{2}}(|00\\rangle + |11\\rangle)$<br>';
        }
        
        if (operations.some(op => ['RX', 'RY', 'RZ'].includes(op.type))) {
            notation += 'Rotation gates: $R_y(\\theta)|\\psi\\rangle = \\cos(\\frac{\\theta}{2})|0\\rangle + \\sin(\\frac{\\theta}{2})|1\\rangle$<br>';
        }

        return notation;
    }

    generatePlainspeakFromCircuit(circuit) {
        const operations = circuit.operations || [];
        
        if (operations.length === 0) {
            return 'Empty quantum circuit created - ready for quantum gate operations.';
        }

        let description = `This quantum circuit operates on ${circuit.qubits} qubits and `;
        const descriptions = [];

        if (operations.some(op => op.type === 'H')) {
            descriptions.push('creates quantum superposition using Hadamard gates');
        }
        
        if (operations.some(op => ['CNOT', 'CZ'].includes(op.type))) {
            descriptions.push('establishes quantum entanglement between qubits');
        }
        
        if (operations.some(op => ['RX', 'RY', 'RZ'].includes(op.type))) {
            descriptions.push('applies parameterized rotations for precise state control');
        }

        if (descriptions.length > 0) {
            description += descriptions.join(', ') + '. ';
        }

        description += 'This enables quantum algorithms that can outperform classical computation for specific problems.';

        return description;
    }

    executeCodeWithFeedback(code, outputElement) {
        if (!outputElement) {
            throw new Error('Output element required for feedback');
        }

        // Show execution indicator
        outputElement.innerHTML = `
            <div class="execution-indicator">
                <div class="spinner"></div>
                <span>Executing quantum code...</span>
            </div>
        `;

        return this.executeCode(code)
            .then(execution => {
                this.displayExecutionResult(execution, outputElement);
                return execution;
            })
            .catch(execution => {
                this.displayExecutionError(execution, outputElement);
                throw execution;
            });
    }

    displayExecutionResult(execution, outputElement) {
        const executionTime = execution.endTime - execution.startTime;
        
        outputElement.innerHTML = `
            <div class="execution-result success">
                <div class="result-header">
                    <span class="status">✅ Execution Successful</span>
                    <span class="timing">${executionTime}ms</span>
                </div>
                
                ${execution.output ? `
                    <div class="output-section">
                        <h4>Output:</h4>
                        <pre class="code-output">${this.escapeHtml(execution.output)}</pre>
                    </div>
                ` : ''}
                
                ${execution.result !== null && execution.result !== undefined ? `
                    <div class="result-section">
                        <h4>Result:</h4>
                        <pre class="code-result">${this.escapeHtml(String(execution.result))}</pre>
                    </div>
                ` : ''}
                
                <div class="execution-actions">
                    <button onclick="codeExecutor.runAgain('${execution.id}')" class="btn-secondary">Run Again</button>
                    <button onclick="codeExecutor.showExecutionDetails('${execution.id}')" class="btn-secondary">Details</button>
                </div>
            </div>
        `;
    }

    displayExecutionError(execution, outputElement) {
        const executionTime = execution.endTime - execution.startTime;
        
        outputElement.innerHTML = `
            <div class="execution-result error">
                <div class="result-header">
                    <span class="status">❌ Execution Failed</span>
                    <span class="timing">${executionTime}ms</span>
                </div>
                
                <div class="error-section">
                    <h4>Error:</h4>
                    <pre class="code-error">${this.escapeHtml(execution.error)}</pre>
                </div>
                
                ${execution.output ? `
                    <div class="output-section">
                        <h4>Output (before error):</h4>
                        <pre class="code-output">${this.escapeHtml(execution.output)}</pre>
                    </div>
                ` : ''}
                
                <div class="execution-actions">
                    <button onclick="codeExecutor.debugExecution('${execution.id}')" class="btn-warning">Debug</button>
                    <button onclick="codeExecutor.showExecutionDetails('${execution.id}')" class="btn-secondary">Details</button>
                </div>
            </div>
        `;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    runAgain(executionId) {
        const execution = this.executionHistory.find(e => e.id == executionId);
        if (execution) {
            // Find the code panel and trigger execution
            const codePanel = document.querySelector('.code-editor');
            if (codePanel) {
                codePanel.value = execution.code;
                codePanel.dispatchEvent(new Event('input'));
            }
        }
    }

    showExecutionDetails(executionId) {
        const execution = this.executionHistory.find(e => e.id == executionId);
        if (!execution) return;

        const modal = document.createElement('div');
        modal.className = 'execution-details-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Execution Details</h3>
                    <button onclick="this.closest('.execution-details-modal').remove()">&times;</button>
                </div>
                
                <div class="modal-body">
                    <div class="detail-section">
                        <h4>Execution Info</h4>
                        <table>
                            <tr><td>Execution ID:</td><td>${execution.id}</td></tr>
                            <tr><td>Start Time:</td><td>${new Date(execution.startTime).toLocaleString()}</td></tr>
                            <tr><td>Duration:</td><td>${execution.endTime - execution.startTime}ms</td></tr>
                            <tr><td>Status:</td><td>${execution.error ? 'Failed' : 'Success'}</td></tr>
                        </table>
                    </div>
                    
                    <div class="detail-section">
                        <h4>Code</h4>
                        <pre class="code-display">${this.escapeHtml(execution.code)}</pre>
                    </div>
                    
                    ${execution.output ? `
                        <div class="detail-section">
                            <h4>Output</h4>
                            <pre class="output-display">${this.escapeHtml(execution.output)}</pre>
                        </div>
                    ` : ''}
                    
                    ${execution.error ? `
                        <div class="detail-section">
                            <h4>Error</h4>
                            <pre class="error-display">${this.escapeHtml(execution.error)}</pre>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    debugExecution(executionId) {
        const execution = this.executionHistory.find(e => e.id == executionId);
        if (!execution) return;

        // Provide debugging suggestions
        const suggestions = this.generateDebuggingSuggestions(execution);
        
        const modal = document.createElement('div');
        modal.className = 'debug-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Debug Assistant</h3>
                    <button onclick="this.closest('.debug-modal').remove()">&times;</button>
                </div>
                
                <div class="modal-body">
                    <div class="debug-section">
                        <h4>Error Analysis</h4>
                        <p class="error-summary">${execution.error}</p>
                    </div>
                    
                    <div class="debug-section">
                        <h4>Suggested Fixes</h4>
                        <ul class="suggestions-list">
                            ${suggestions.map(s => `<li>${s}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="debug-section">
                        <h4>Quick Fixes</h4>
                        <div class="quick-fixes">
                            <button onclick="codeExecutor.applyQuickFix('${executionId}', 'add_imports')" class="fix-btn">Add Missing Imports</button>
                            <button onclick="codeExecutor.applyQuickFix('${executionId}', 'fix_syntax')" class="fix-btn">Fix Syntax</button>
                            <button onclick="codeExecutor.applyQuickFix('${executionId}', 'add_measures')" class="fix-btn">Add Measurements</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
    }

    generateDebuggingSuggestions(execution) {
        const error = execution.error.toLowerCase();
        const code = execution.code.toLowerCase();
        const suggestions = [];

        if (error.includes('name') && error.includes('not defined')) {
            suggestions.push('Check if all variables and functions are properly defined');
            if (!code.includes('import')) {
                suggestions.push('Add necessary imports (e.g., from qiskit import QuantumCircuit)');
            }
        }

        if (error.includes('syntax')) {
            suggestions.push('Check for typos, missing parentheses, or incorrect indentation');
            suggestions.push('Verify that all brackets and quotes are properly closed');
        }

        if (error.includes('index') || error.includes('range')) {
            suggestions.push('Check that qubit indices are within the circuit range');
            suggestions.push('Verify that array/list indices are valid');
        }

        if (code.includes('circuit') && !code.includes('measure')) {
            suggestions.push('Consider adding measurements to extract results from the quantum circuit');
        }

        if (suggestions.length === 0) {
            suggestions.push('Check the Python syntax and quantum circuit structure');
            suggestions.push('Verify that all required libraries are imported');
            suggestions.push('Ensure qubit indices are valid for your circuit size');
        }

        return suggestions;
    }

    applyQuickFix(executionId, fixType) {
        const execution = this.executionHistory.find(e => e.id == executionId);
        if (!execution) return;

        let fixedCode = execution.code;

        switch (fixType) {
            case 'add_imports':
                if (!fixedCode.includes('from qiskit import')) {
                    fixedCode = 'from qiskit import QuantumCircuit, execute\nimport numpy as np\n\n' + fixedCode;
                }
                break;

            case 'add_measures':
                if (fixedCode.includes('QuantumCircuit') && !fixedCode.includes('measure')) {
                    fixedCode += '\ncircuit.measure_all()';
                }
                break;

            case 'fix_syntax':
                // Basic syntax fixes
                fixedCode = fixedCode
                    .replace(/\bprint\s+([^(])/g, 'print($1')  // Add parentheses to print
                    .replace(/\brange\s+(\d+)/g, 'range($1)'); // Add parentheses to range
                break;
        }

        // Update the code panel
        const codePanel = document.querySelector('.code-editor');
        if (codePanel) {
            codePanel.value = fixedCode;
            codePanel.dispatchEvent(new Event('input'));
        }

        // Close debug modal
        document.querySelector('.debug-modal')?.remove();
    }

    getExecutionHistory() {
        return this.executionHistory;
    }

    clearHistory() {
        this.executionHistory = [];
    }

    isExecutorReady() {
        return this.isReady;
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CodeExecutor;
}

// Global access
window.CodeExecutor = CodeExecutor;