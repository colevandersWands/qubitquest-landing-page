/**
 * Advanced 3D Quantum State Visualization Engine
 * 
 * Superior features:
 * - Real-time 3D Bloch sphere visualization
 * - Animated quantum gate operations
 * - Probability cloud rendering
 * - Multi-qubit entanglement visualization
 * - Classical vs quantum comparison animations
 * - WebGL accelerated rendering
 */

import * as THREE from 'https://cdn.skypack.dev/three@0.136.0';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js';

export class QuantumVisualization3D {
    constructor(container) {
        this.container = container;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        
        // Quantum state tracking
        this.qubits = [];
        this.entanglements = [];
        this.animationQueue = [];
        
        // Visualization elements
        this.blochSpheres = [];
        this.probabilityClouds = [];
        this.gateAnimations = new Map();
        
        // Performance optimization
        this.frameRate = 60;
        this.lastFrame = 0;
        
        this.initialize();
    }
    
    /**
     * Initialize 3D visualization environment
     */
    initialize() {
        // Setup Three.js scene
        this.setupScene();
        this.setupLighting();
        this.setupControls();
        
        // Start render loop
        this.animate();
        
        // Setup resize handler
        window.addEventListener('resize', () => this.handleResize());
    }
    
    /**
     * Setup 3D scene
     */
    setupScene() {
        // Create scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0a0a0a);
        this.scene.fog = new THREE.Fog(0x0a0a0a, 10, 50);
        
        // Setup camera
        const aspect = this.container.clientWidth / this.container.clientHeight;
        this.camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
        this.camera.position.set(5, 5, 5);
        this.camera.lookAt(0, 0, 0);
        
        // Setup renderer with antialiasing
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
        });
        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        this.container.appendChild(this.renderer.domElement);
        
        // Add coordinate system helper
        this.addCoordinateSystem();
    }
    
    /**
     * Setup lighting for realistic quantum visualization
     */
    setupLighting() {
        // Ambient light for base illumination
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);
        
        // Directional light for shadows
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.near = 0.1;
        directionalLight.shadow.camera.far = 50;
        directionalLight.shadow.camera.left = -10;
        directionalLight.shadow.camera.right = 10;
        directionalLight.shadow.camera.top = 10;
        directionalLight.shadow.camera.bottom = -10;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);
        
        // Point lights for quantum glow effects
        const quantumGlow1 = new THREE.PointLight(0x4A90E2, 0.5, 10);
        quantumGlow1.position.set(2, 2, 2);
        this.scene.add(quantumGlow1);
        
        const quantumGlow2 = new THREE.PointLight(0xE74C3C, 0.5, 10);
        quantumGlow2.position.set(-2, 2, -2);
        this.scene.add(quantumGlow2);
    }
    
    /**
     * Setup camera controls
     */
    setupControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.rotateSpeed = 0.5;
        this.controls.zoomSpeed = 1.2;
        this.controls.minDistance = 2;
        this.controls.maxDistance = 20;
    }
    
    /**
     * Add coordinate system visualization
     */
    addCoordinateSystem() {
        // Create axes helper
        const axesHelper = new THREE.AxesHelper(3);
        this.scene.add(axesHelper);
        
        // Add labels
        this.addAxisLabel('X', new THREE.Vector3(3.5, 0, 0), 0xff0000);
        this.addAxisLabel('Y', new THREE.Vector3(0, 3.5, 0), 0x00ff00);
        this.addAxisLabel('Z', new THREE.Vector3(0, 0, 3.5), 0x0000ff);
    }
    
    /**
     * Add axis label
     */
    addAxisLabel(text, position, color) {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        context.font = 'Bold 48px Arial';
        context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 32, 32);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.position.copy(position);
        sprite.scale.set(0.5, 0.5, 0.5);
        this.scene.add(sprite);
    }
    
    /**
     * Create Bloch sphere for qubit visualization
     */
    createBlochSphere(qubitIndex) {
        const blochGroup = new THREE.Group();
        blochGroup.name = `bloch_${qubitIndex}`;
        
        // Sphere wireframe
        const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
        const wireframeMaterial = new THREE.MeshBasicMaterial({
            color: 0x4A90E2,
            wireframe: true,
            opacity: 0.3,
            transparent: true
        });
        const sphereWireframe = new THREE.Mesh(sphereGeometry, wireframeMaterial);
        blochGroup.add(sphereWireframe);
        
        // Transparent sphere surface
        const sphereMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x4A90E2,
            metalness: 0.2,
            roughness: 0.1,
            opacity: 0.1,
            transparent: true,
            side: THREE.DoubleSide
        });
        const sphereSurface = new THREE.Mesh(sphereGeometry, sphereMaterial);
        blochGroup.add(sphereSurface);
        
        // Equator circle
        const equatorGeometry = new THREE.RingGeometry(0.98, 1.02, 64);
        const equatorMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            opacity: 0.5,
            transparent: true,
            side: THREE.DoubleSide
        });
        const equator = new THREE.Mesh(equatorGeometry, equatorMaterial);
        equator.rotation.x = Math.PI / 2;
        blochGroup.add(equator);
        
        // State vector arrow
        const stateVector = this.createStateVector();
        blochGroup.add(stateVector);
        
        // Basis state labels
        this.addBlochLabels(blochGroup);
        
        // Position based on qubit index
        const spacing = 3;
        blochGroup.position.x = qubitIndex * spacing - (this.qubits.length - 1) * spacing / 2;
        
        this.scene.add(blochGroup);
        this.blochSpheres[qubitIndex] = blochGroup;
        
        return blochGroup;
    }
    
    /**
     * Create state vector arrow
     */
    createStateVector() {
        const group = new THREE.Group();
        group.name = 'stateVector';
        
        // Arrow shaft
        const shaftGeometry = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);
        const shaftMaterial = new THREE.MeshPhongMaterial({
            color: 0xffff00,
            emissive: 0xffff00,
            emissiveIntensity: 0.5
        });
        const shaft = new THREE.Mesh(shaftGeometry, shaftMaterial);
        shaft.position.y = 0.5;
        group.add(shaft);
        
        // Arrow head
        const headGeometry = new THREE.ConeGeometry(0.08, 0.2, 8);
        const head = new THREE.Mesh(headGeometry, shaftMaterial);
        head.position.y = 1;
        group.add(head);
        
        return group;
    }
    
    /**
     * Add Bloch sphere labels
     */
    addBlochLabels(blochGroup) {
        // |0⟩ state (north pole)
        this.addStateLabel('|0⟩', new THREE.Vector3(0, 1.2, 0), blochGroup);
        
        // |1⟩ state (south pole)
        this.addStateLabel('|1⟩', new THREE.Vector3(0, -1.2, 0), blochGroup);
        
        // |+⟩ state (positive X)
        this.addStateLabel('|+⟩', new THREE.Vector3(1.2, 0, 0), blochGroup);
        
        // |−⟩ state (negative X)
        this.addStateLabel('|−⟩', new THREE.Vector3(-1.2, 0, 0), blochGroup);
        
        // |+i⟩ state (positive Y)
        this.addStateLabel('|+i⟩', new THREE.Vector3(0, 0, 1.2), blochGroup);
        
        // |−i⟩ state (negative Y)
        this.addStateLabel('|−i⟩', new THREE.Vector3(0, 0, -1.2), blochGroup);
    }
    
    /**
     * Add state label to Bloch sphere
     */
    addStateLabel(text, position, parent) {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        context.font = '32px Arial';
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 64, 32);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ 
            map: texture,
            opacity: 0.8,
            transparent: true
        });
        const sprite = new THREE.Sprite(material);
        sprite.position.copy(position);
        sprite.scale.set(0.5, 0.25, 1);
        parent.add(sprite);
    }
    
    /**
     * Update qubit state visualization
     */
    updateQubitState(qubitIndex, theta, phi, showTransition = true) {
        const blochSphere = this.blochSpheres[qubitIndex];
        if (!blochSphere) return;
        
        const stateVector = blochSphere.getObjectByName('stateVector');
        if (!stateVector) return;
        
        // Calculate Bloch vector components
        const x = Math.sin(theta) * Math.cos(phi);
        const y = Math.sin(theta) * Math.sin(phi);
        const z = Math.cos(theta);
        
        if (showTransition) {
            // Animate state transition
            this.animateStateTransition(stateVector, { x, y, z }, qubitIndex);
        } else {
            // Direct update
            stateVector.lookAt(new THREE.Vector3(x, y, z));
        }
        
        // Update probability cloud
        this.updateProbabilityCloud(qubitIndex, theta, phi);
    }
    
    /**
     * Animate state vector transition
     */
    animateStateTransition(stateVector, targetState, qubitIndex) {
        const animation = {
            object: stateVector,
            startTime: Date.now(),
            duration: 1000,
            startRotation: stateVector.rotation.clone(),
            targetDirection: new THREE.Vector3(targetState.x, targetState.y, targetState.z),
            qubitIndex: qubitIndex,
            type: 'stateTransition'
        };
        
        this.animationQueue.push(animation);
    }
    
    /**
     * Create probability cloud visualization
     */
    updateProbabilityCloud(qubitIndex, theta, phi) {
        // Remove existing cloud if any
        const existingCloud = this.probabilityClouds[qubitIndex];
        if (existingCloud) {
            this.scene.remove(existingCloud);
        }
        
        // Create new probability cloud
        const cloud = new THREE.Group();
        
        // Calculate probabilities
        const prob0 = Math.cos(theta / 2) ** 2;
        const prob1 = Math.sin(theta / 2) ** 2;
        
        // Create probability distributions
        const numParticles = 1000;
        const particlesGeometry = new THREE.BufferGeometry();
        const positions = new Float32Array(numParticles * 3);
        const colors = new Float32Array(numParticles * 3);
        
        for (let i = 0; i < numParticles; i++) {
            // Distribute particles based on probabilities
            const isState0 = Math.random() < prob0;
            
            if (isState0) {
                // Particles near |0⟩ (north pole)
                const r = Math.random() * 0.3;
                const theta = Math.random() * Math.PI * 0.3;
                const phi = Math.random() * Math.PI * 2;
                
                positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
                positions[i * 3 + 1] = 0.8 + r * Math.cos(theta);
                positions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
                
                // Blue color for |0⟩
                colors[i * 3] = 0.2;
                colors[i * 3 + 1] = 0.5;
                colors[i * 3 + 2] = 1.0;
            } else {
                // Particles near |1⟩ (south pole)
                const r = Math.random() * 0.3;
                const theta = Math.PI - Math.random() * Math.PI * 0.3;
                const phi = Math.random() * Math.PI * 2;
                
                positions[i * 3] = r * Math.sin(theta) * Math.cos(phi);
                positions[i * 3 + 1] = r * Math.cos(theta) - 0.8;
                positions[i * 3 + 2] = r * Math.sin(theta) * Math.sin(phi);
                
                // Red color for |1⟩
                colors[i * 3] = 1.0;
                colors[i * 3 + 1] = 0.2;
                colors[i * 3 + 2] = 0.2;
            }
        }
        
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.02,
            vertexColors: true,
            opacity: 0.6,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        const particles = new THREE.Points(particlesGeometry, particlesMaterial);
        cloud.add(particles);
        
        // Position cloud at qubit location
        const blochSphere = this.blochSpheres[qubitIndex];
        cloud.position.copy(blochSphere.position);
        
        this.scene.add(cloud);
        this.probabilityClouds[qubitIndex] = cloud;
    }
    
    /**
     * Visualize quantum gate operation
     */
    animateGateOperation(gateType, targetQubits, duration = 1500) {
        const gateVisual = this.createGateVisualization(gateType, targetQubits);
        this.scene.add(gateVisual);
        
        const animation = {
            object: gateVisual,
            startTime: Date.now(),
            duration: duration,
            type: 'gateOperation',
            gateType: gateType,
            targetQubits: targetQubits,
            onComplete: () => {
                this.scene.remove(gateVisual);
                this.applyGateEffect(gateType, targetQubits);
            }
        };
        
        this.animationQueue.push(animation);
    }
    
    /**
     * Create gate visualization
     */
    createGateVisualization(gateType, targetQubits) {
        const group = new THREE.Group();
        
        const gateColors = {
            'H': 0x4A90E2,
            'X': 0xE74C3C,
            'Y': 0x27AE60,
            'Z': 0xF39C12,
            'CNOT': 0x8E44AD,
            'CZ': 0x16A085
        };
        
        const color = gateColors[gateType] || 0xffffff;
        
        if (gateType === 'CNOT' || gateType === 'CZ') {
            // Two-qubit gate visualization
            const control = this.blochSpheres[targetQubits[0]];
            const target = this.blochSpheres[targetQubits[1]];
            
            // Create connection line
            const points = [
                control.position.clone(),
                target.position.clone()
            ];
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: color,
                linewidth: 3,
                opacity: 0.8,
                transparent: true
            });
            const line = new THREE.Line(geometry, material);
            group.add(line);
            
            // Add pulse effect
            const pulseGeometry = new THREE.SphereGeometry(0.2, 16, 16);
            const pulseMaterial = new THREE.MeshBasicMaterial({
                color: color,
                opacity: 0.8,
                transparent: true
            });
            const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
            pulse.position.copy(control.position);
            group.add(pulse);
            
            // Animate pulse along line
            pulse.userData.animation = {
                start: control.position.clone(),
                end: target.position.clone(),
                progress: 0
            };
        } else {
            // Single-qubit gate visualization
            const target = this.blochSpheres[targetQubits[0]];
            
            // Create rotating gate symbol
            const size = 0.5;
            const shape = new THREE.Shape();
            shape.moveTo(-size, -size);
            shape.lineTo(size, -size);
            shape.lineTo(size, size);
            shape.lineTo(-size, size);
            shape.lineTo(-size, -size);
            
            const geometry = new THREE.ShapeGeometry(shape);
            const material = new THREE.MeshBasicMaterial({
                color: color,
                opacity: 0.8,
                transparent: true,
                side: THREE.DoubleSide
            });
            const gateMesh = new THREE.Mesh(geometry, material);
            gateMesh.position.copy(target.position);
            gateMesh.position.y += 2;
            group.add(gateMesh);
            
            // Add gate label
            this.addGateLabel(gateType, gateMesh);
        }
        
        return group;
    }
    
    /**
     * Add gate label
     */
    addGateLabel(gateType, parent) {
        const canvas = document.createElement('canvas');
        canvas.width = 128;
        canvas.height = 128;
        const context = canvas.getContext('2d');
        context.font = 'Bold 64px Arial';
        context.fillStyle = '#ffffff';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(gateType, 64, 64);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.scale.set(0.5, 0.5, 0.5);
        parent.add(sprite);
    }
    
    /**
     * Apply gate effect to qubit states
     */
    applyGateEffect(gateType, targetQubits) {
        switch (gateType) {
            case 'H':
                // Hadamard gate - create superposition
                this.updateQubitState(targetQubits[0], Math.PI / 2, 0);
                break;
            case 'X':
                // Pauli-X gate - bit flip
                const currentState = this.getQubitState(targetQubits[0]);
                this.updateQubitState(targetQubits[0], Math.PI - currentState.theta, currentState.phi);
                break;
            case 'Y':
                // Pauli-Y gate
                const stateY = this.getQubitState(targetQubits[0]);
                this.updateQubitState(targetQubits[0], Math.PI - stateY.theta, stateY.phi + Math.PI);
                break;
            case 'Z':
                // Pauli-Z gate - phase flip
                const stateZ = this.getQubitState(targetQubits[0]);
                this.updateQubitState(targetQubits[0], stateZ.theta, stateZ.phi + Math.PI);
                break;
            case 'CNOT':
                // Controlled-NOT gate
                this.visualizeEntanglement(targetQubits[0], targetQubits[1]);
                break;
            case 'CZ':
                // Controlled-Z gate
                this.visualizeEntanglement(targetQubits[0], targetQubits[1], 'phase');
                break;
        }
    }
    
    /**
     * Get current qubit state
     */
    getQubitState(qubitIndex) {
        // This would be connected to the actual quantum simulator
        // For now, return a default state
        return { theta: 0, phi: 0 };
    }
    
    /**
     * Visualize entanglement between qubits
     */
    visualizeEntanglement(qubit1, qubit2, type = 'amplitude') {
        const pos1 = this.blochSpheres[qubit1].position;
        const pos2 = this.blochSpheres[qubit2].position;
        
        // Create entanglement visualization
        const particleCount = 100;
        const particles = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        
        for (let i = 0; i < particleCount; i++) {
            const t = i / particleCount;
            const wave = Math.sin(t * Math.PI * 4) * 0.2;
            
            positions[i * 3] = pos1.x + (pos2.x - pos1.x) * t;
            positions[i * 3 + 1] = pos1.y + (pos2.y - pos1.y) * t + wave;
            positions[i * 3 + 2] = pos1.z + (pos2.z - pos1.z) * t;
        }
        
        particles.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: type === 'phase' ? 0xF39C12 : 0x8E44AD,
            size: 0.05,
            opacity: 0.8,
            transparent: true,
            blending: THREE.AdditiveBlending
        });
        
        const entanglementVisual = new THREE.Points(particles, material);
        entanglementVisual.name = `entanglement_${qubit1}_${qubit2}`;
        
        this.scene.add(entanglementVisual);
        this.entanglements.push(entanglementVisual);
        
        // Animate entanglement
        const animation = {
            object: entanglementVisual,
            startTime: Date.now(),
            duration: 3000,
            type: 'entanglement',
            update: (progress) => {
                entanglementVisual.material.opacity = 0.8 * (1 - progress * 0.5);
                entanglementVisual.rotation.y = progress * Math.PI * 2;
            }
        };
        
        this.animationQueue.push(animation);
    }
    
    /**
     * Create classical vs quantum comparison
     */
    createComparisonVisualization(classicalComplexity, quantumComplexity) {
        const group = new THREE.Group();
        
        // Classical visualization (exponential growth)
        const classicalPoints = [];
        for (let i = 0; i < 50; i++) {
            const x = i * 0.1 - 5;
            const y = Math.exp(Math.abs(x) * 0.3) - 1;
            classicalPoints.push(new THREE.Vector3(x, Math.min(y, 5), -2));
        }
        
        const classicalGeometry = new THREE.BufferGeometry().setFromPoints(classicalPoints);
        const classicalMaterial = new THREE.LineBasicMaterial({
            color: 0xE74C3C,
            linewidth: 3
        });
        const classicalLine = new THREE.Line(classicalGeometry, classicalMaterial);
        group.add(classicalLine);
        
        // Quantum visualization (polynomial growth)
        const quantumPoints = [];
        for (let i = 0; i < 50; i++) {
            const x = i * 0.1 - 5;
            const y = Math.sqrt(Math.abs(x)) * 0.5;
            quantumPoints.push(new THREE.Vector3(x, y, -2));
        }
        
        const quantumGeometry = new THREE.BufferGeometry().setFromPoints(quantumPoints);
        const quantumMaterial = new THREE.LineBasicMaterial({
            color: 0x4A90E2,
            linewidth: 3
        });
        const quantumLine = new THREE.Line(quantumGeometry, quantumMaterial);
        group.add(quantumLine);
        
        // Add labels
        this.addComparisonLabel('Classical: O(2ⁿ)', new THREE.Vector3(3, 4, -2), 0xE74C3C, group);
        this.addComparisonLabel('Quantum: O(√n)', new THREE.Vector3(3, 1, -2), 0x4A90E2, group);
        
        group.position.set(0, -3, 0);
        this.scene.add(group);
        
        return group;
    }
    
    /**
     * Add comparison label
     */
    addComparisonLabel(text, position, color, parent) {
        const canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 64;
        const context = canvas.getContext('2d');
        context.font = '32px Arial';
        context.fillStyle = `#${color.toString(16).padStart(6, '0')}`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillText(text, 128, 32);
        
        const texture = new THREE.CanvasTexture(canvas);
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        sprite.position.copy(position);
        sprite.scale.set(2, 0.5, 1);
        parent.add(sprite);
    }
    
    /**
     * Animation loop
     */
    animate() {
        requestAnimationFrame(() => this.animate());
        
        const now = Date.now();
        const deltaTime = now - this.lastFrame;
        
        if (deltaTime > 1000 / this.frameRate) {
            // Update controls
            this.controls.update();
            
            // Process animation queue
            this.processAnimations(now);
            
            // Update particle effects
            this.updateParticleEffects(now);
            
            // Render scene
            this.renderer.render(this.scene, this.camera);
            
            this.lastFrame = now;
        }
    }
    
    /**
     * Process animation queue
     */
    processAnimations(currentTime) {
        for (let i = this.animationQueue.length - 1; i >= 0; i--) {
            const animation = this.animationQueue[i];
            const elapsed = currentTime - animation.startTime;
            const progress = Math.min(elapsed / animation.duration, 1);
            
            switch (animation.type) {
                case 'stateTransition':
                    this.updateStateTransition(animation, progress);
                    break;
                case 'gateOperation':
                    this.updateGateAnimation(animation, progress);
                    break;
                case 'entanglement':
                    if (animation.update) {
                        animation.update(progress);
                    }
                    break;
            }
            
            if (progress >= 1) {
                if (animation.onComplete) {
                    animation.onComplete();
                }
                this.animationQueue.splice(i, 1);
            }
        }
    }
    
    /**
     * Update state transition animation
     */
    updateStateTransition(animation, progress) {
        const easeProgress = this.easeInOutCubic(progress);
        
        // Spherical interpolation for smooth rotation
        const currentDirection = new THREE.Vector3(0, 1, 0);
        currentDirection.applyQuaternion(animation.object.quaternion);
        
        const targetDirection = animation.targetDirection.clone().normalize();
        currentDirection.lerp(targetDirection, easeProgress);
        
        animation.object.lookAt(currentDirection);
    }
    
    /**
     * Update gate animation
     */
    updateGateAnimation(animation, progress) {
        if (animation.gateType === 'CNOT' || animation.gateType === 'CZ') {
            // Update pulse position for two-qubit gates
            const pulse = animation.object.children.find(child => child.userData.animation);
            if (pulse && pulse.userData.animation) {
                const start = pulse.userData.animation.start;
                const end = pulse.userData.animation.end;
                pulse.position.lerpVectors(start, end, this.easeInOutCubic(progress));
            }
        } else {
            // Rotate single-qubit gate symbols
            animation.object.rotation.z = progress * Math.PI * 2;
            animation.object.children.forEach(child => {
                if (child.isMesh) {
                    child.material.opacity = 0.8 * (1 - progress);
                }
            });
        }
    }
    
    /**
     * Update particle effects
     */
    updateParticleEffects(currentTime) {
        // Rotate probability clouds
        this.probabilityClouds.forEach((cloud, index) => {
            if (cloud) {
                cloud.rotation.y += 0.001;
                cloud.children.forEach(child => {
                    if (child.isPoints) {
                        child.material.opacity = 0.6 + 0.1 * Math.sin(currentTime * 0.001 + index);
                    }
                });
            }
        });
        
        // Update entanglement visualizations
        this.entanglements.forEach(entanglement => {
            entanglement.rotation.y += 0.002;
        });
    }
    
    /**
     * Easing function for smooth animations
     */
    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    /**
     * Handle window resize
     */
    handleResize() {
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }
    
    /**
     * Add new qubit to visualization
     */
    addQubit(initialState = { theta: 0, phi: 0 }) {
        const qubitIndex = this.qubits.length;
        this.qubits.push(initialState);
        
        const blochSphere = this.createBlochSphere(qubitIndex);
        this.updateQubitState(qubitIndex, initialState.theta, initialState.phi, false);
        
        // Adjust camera to fit all qubits
        this.adjustCameraView();
        
        return qubitIndex;
    }
    
    /**
     * Adjust camera view to fit all qubits
     */
    adjustCameraView() {
        const numQubits = this.qubits.length;
        const spacing = 3;
        const totalWidth = (numQubits - 1) * spacing;
        
        const distance = Math.max(5, totalWidth * 0.8);
        this.camera.position.set(distance, distance, distance);
        this.camera.lookAt(0, 0, 0);
        
        this.controls.target.set(0, 0, 0);
        this.controls.update();
    }
    
    /**
     * Clear visualization
     */
    clear() {
        // Remove all Bloch spheres
        this.blochSpheres.forEach(sphere => {
            this.scene.remove(sphere);
        });
        this.blochSpheres = [];
        
        // Remove probability clouds
        this.probabilityClouds.forEach(cloud => {
            this.scene.remove(cloud);
        });
        this.probabilityClouds = [];
        
        // Remove entanglements
        this.entanglements.forEach(entanglement => {
            this.scene.remove(entanglement);
        });
        this.entanglements = [];
        
        // Clear animation queue
        this.animationQueue = [];
        
        // Reset qubits
        this.qubits = [];
    }
    
    /**
     * Export visualization as image
     */
    exportImage() {
        this.renderer.render(this.scene, this.camera);
        return this.renderer.domElement.toDataURL('image/png');
    }
    
    /**
     * Set visualization quality
     */
    setQuality(quality) {
        switch (quality) {
            case 'low':
                this.renderer.setPixelRatio(1);
                this.frameRate = 30;
                break;
            case 'medium':
                this.renderer.setPixelRatio(window.devicePixelRatio * 0.75);
                this.frameRate = 45;
                break;
            case 'high':
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.frameRate = 60;
                break;
        }
    }
}

// Export the visualization engine
export { QuantumVisualization3D };