/**
 * Real-time Analytics Dashboard Component
 * 
 * Superior analytics implementation that provides:
 * - Live competency tracking with visual indicators
 * - Cognitive load optimization metrics
 * - Professional readiness assessment
 * - Learning trajectory visualization
 * - Peer comparison benchmarks
 */

class AnalyticsDashboard {
    constructor(containerId, syncEngine, contextualIntelligence) {
        this.container = document.getElementById(containerId);
        this.syncEngine = syncEngine;
        this.contextualIntelligence = contextualIntelligence;
        
        // Analytics state
        this.metrics = {
            competencies: {
                translationSpeed: { current: 0, target: 5, history: [] },
                professionalCommunication: { current: 0, target: 85, history: [] },
                cognitiveAgility: { current: 0, target: 90, history: [] },
                technicalImplementation: { current: 0, target: 80, history: [] },
                businessAcumen: { current: 0, target: 75, history: [] }
            },
            learningVelocity: 0,
            professionalReadiness: 'In Progress',
            careerPathRecommendation: null,
            peerComparison: null
        };
        
        // Real-time tracking
        this.trackingInterval = null;
        this.updateFrequency = 2000; // 2 seconds
        
        // Visualization components
        this.charts = {};
        
        this.initialize();
    }
    
    initialize() {
        console.log('📊 Initializing Analytics Dashboard');
        
        // Create dashboard UI
        this.createDashboardUI();
        
        // Start real-time tracking
        this.startRealTimeTracking();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Initial update
        this.updateAllMetrics();
    }
    
    createDashboardUI() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="analytics-dashboard">
                <div class="dashboard-header">
                    <h2>Professional Quantum Competency Analytics</h2>
                    <div class="dashboard-controls">
                        <button class="btn btn-small" onclick="app.analyticsDashboard.exportReport()">
                            📊 Export Report
                        </button>
                        <button class="btn btn-small" onclick="app.analyticsDashboard.toggleLiveMode()">
                            🔴 Live Mode
                        </button>
                    </div>
                </div>
                
                <!-- Competency Rings Section -->
                <div class="competency-rings-section">
                    <h3>Core Competencies</h3>
                    <div class="competency-rings-grid">
                        ${this.createCompetencyRings()}
                    </div>
                </div>
                
                <!-- Learning Trajectory Chart -->
                <div class="trajectory-section">
                    <h3>Learning Trajectory</h3>
                    <div class="trajectory-chart" id="trajectory-chart">
                        <canvas id="trajectory-canvas"></canvas>
                    </div>
                    <div class="trajectory-insights">
                        <div class="insight-item">
                            <span class="insight-label">Learning Velocity</span>
                            <span class="insight-value" id="learning-velocity">--</span>
                        </div>
                        <div class="insight-item">
                            <span class="insight-label">Projected Mastery</span>
                            <span class="insight-value" id="projected-mastery">--</span>
                        </div>
                    </div>
                </div>
                
                <!-- Professional Readiness Assessment -->
                <div class="readiness-section">
                    <h3>Professional Readiness</h3>
                    <div class="readiness-meter">
                        <div class="readiness-scale">
                            <div class="readiness-marker" id="readiness-marker"></div>
                        </div>
                        <div class="readiness-labels">
                            <span>Beginner</span>
                            <span>Intermediate</span>
                            <span>Advanced</span>
                            <span>Expert</span>
                        </div>
                    </div>
                    <div class="readiness-details" id="readiness-details">
                        <!-- Dynamic content -->
                    </div>
                </div>
                
                <!-- Career Path Recommendations -->
                <div class="career-section">
                    <h3>Career Path Recommendations</h3>
                    <div class="career-paths" id="career-paths">
                        <!-- Dynamic career paths -->
                    </div>
                </div>
                
                <!-- Peer Comparison -->
                <div class="peer-section">
                    <h3>Peer Benchmarking</h3>
                    <div class="peer-comparison" id="peer-comparison">
                        <div class="peer-chart">
                            <canvas id="peer-canvas"></canvas>
                        </div>
                        <div class="peer-insights" id="peer-insights">
                            <!-- Dynamic insights -->
                        </div>
                    </div>
                </div>
                
                <!-- Activity Heatmap -->
                <div class="activity-section">
                    <h3>Learning Activity Heatmap</h3>
                    <div class="activity-heatmap" id="activity-heatmap">
                        <!-- Dynamic heatmap -->
                    </div>
                </div>
            </div>
        `;
        
        // Initialize charts
        this.initializeCharts();
    }
    
    createCompetencyRings() {
        return Object.entries(this.metrics.competencies).map(([competency, data]) => `
            <div class="competency-ring-container">
                <div class="competency-ring" data-competency="${competency}">
                    <svg viewBox="0 0 120 120">
                        <defs>
                            <linearGradient id="gradient-${competency}" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stop-color="#4ecdc4" />
                                <stop offset="100%" stop-color="#98d8d8" />
                            </linearGradient>
                        </defs>
                        <circle cx="60" cy="60" r="50" class="competency-ring-bg" />
                        <circle cx="60" cy="60" r="50" class="competency-ring-progress" 
                                stroke="url(#gradient-${competency})"
                                stroke-dasharray="314.16"
                                stroke-dashoffset="314.16" />
                    </svg>
                    <div class="competency-ring-text">
                        <span class="competency-value">0%</span>
                    </div>
                </div>
                <div class="competency-label">${this.formatCompetencyName(competency)}</div>
                <div class="competency-target">Target: ${data.target}${competency === 'translationSpeed' ? 's' : '%'}</div>
            </div>
        `).join('');
    }
    
    formatCompetencyName(competency) {
        const names = {
            translationSpeed: 'Translation Speed',
            professionalCommunication: 'Professional Communication',
            cognitiveAgility: 'Cognitive Agility',
            technicalImplementation: 'Technical Implementation',
            businessAcumen: 'Business Acumen'
        };
        return names[competency] || competency;
    }
    
    initializeCharts() {
        // Initialize trajectory chart
        this.initializeTrajectoryChart();
        
        // Initialize peer comparison chart
        this.initializePeerChart();
        
        // Initialize activity heatmap
        this.initializeActivityHeatmap();
    }
    
    initializeTrajectoryChart() {
        const canvas = document.getElementById('trajectory-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 200;
        
        this.charts.trajectory = {
            ctx: ctx,
            data: [],
            maxPoints: 50
        };
    }
    
    initializePeerChart() {
        const canvas = document.getElementById('peer-canvas');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = 300;
        
        this.charts.peer = {
            ctx: ctx,
            data: {}
        };
    }
    
    initializeActivityHeatmap() {
        const container = document.getElementById('activity-heatmap');
        if (!container) return;
        
        // Create 7x24 grid for week activity
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const hours = 24;
        
        let heatmapHTML = '<div class="heatmap-grid">';
        
        // Add day labels
        heatmapHTML += '<div class="heatmap-labels">';
        heatmapHTML += '<div class="heatmap-label"></div>'; // Empty corner
        for (let h = 0; h < hours; h++) {
            heatmapHTML += `<div class="heatmap-label">${h}</div>`;
        }
        heatmapHTML += '</div>';
        
        // Add grid
        for (let d = 0; d < days.length; d++) {
            heatmapHTML += '<div class="heatmap-row">';
            heatmapHTML += `<div class="heatmap-label">${days[d]}</div>`;
            
            for (let h = 0; h < hours; h++) {
                heatmapHTML += `<div class="heatmap-cell" data-day="${d}" data-hour="${h}"></div>`;
            }
            heatmapHTML += '</div>';
        }
        
        heatmapHTML += '</div>';
        container.innerHTML = heatmapHTML;
    }
    
    startRealTimeTracking() {
        this.trackingInterval = setInterval(() => {
            this.updateAllMetrics();
        }, this.updateFrequency);
    }
    
    updateAllMetrics() {
        // Update competency scores
        this.updateCompetencyScores();
        
        // Update learning trajectory
        this.updateLearningTrajectory();
        
        // Update professional readiness
        this.updateProfessionalReadiness();
        
        // Update career recommendations
        this.updateCareerRecommendations();
        
        // Update peer comparison
        this.updatePeerComparison();
        
        // Update activity heatmap
        this.updateActivityHeatmap();
    }
    
    updateCompetencyScores() {
        // Get real-time data from contextual intelligence
        const contextData = this.contextualIntelligence?.getPerformanceReport() || {};
        
        // Update translation speed
        const translationSpeed = this.calculateTranslationSpeed();
        this.updateCompetencyRing('translationSpeed', translationSpeed, 's');
        
        // Update other competencies
        const competencyMap = {
            professionalCommunication: contextData.audienceDetectionAccuracy * 100 || 75,
            cognitiveAgility: contextData.cognitiveLoadOptimization * 100 || 80,
            technicalImplementation: contextData.overallEffectiveness * 100 || 70,
            businessAcumen: this.calculateBusinessAcumen()
        };
        
        for (const [competency, score] of Object.entries(competencyMap)) {
            this.updateCompetencyRing(competency, score, '%');
            
            // Update history
            this.metrics.competencies[competency].current = score;
            this.metrics.competencies[competency].history.push({
                value: score,
                timestamp: Date.now()
            });
            
            // Keep history limited
            if (this.metrics.competencies[competency].history.length > 100) {
                this.metrics.competencies[competency].history.shift();
            }
        }
    }
    
    updateCompetencyRing(competency, value, unit = '%') {
        const ring = document.querySelector(`[data-competency="${competency}"]`);
        if (!ring) return;
        
        const progress = ring.querySelector('.competency-ring-progress');
        const text = ring.querySelector('.competency-value');
        
        if (progress && text) {
            // Calculate progress percentage
            const target = this.metrics.competencies[competency].target;
            const percentage = Math.min((value / target) * 100, 100);
            
            // Update ring
            const circumference = 314.16; // 2 * PI * 50
            const offset = circumference - (percentage / 100) * circumference;
            progress.style.strokeDashoffset = offset;
            
            // Update text
            text.textContent = unit === '%' ? `${Math.round(value)}%` : `${value.toFixed(1)}${unit}`;
            
            // Add color coding
            if (percentage >= 90) {
                progress.style.stroke = '#4ecdc4';
            } else if (percentage >= 70) {
                progress.style.stroke = '#98d8d8';
            } else if (percentage >= 50) {
                progress.style.stroke = '#ffd93d';
            } else {
                progress.style.stroke = '#ff6b6b';
            }
        }
    }
    
    calculateTranslationSpeed() {
        // Calculate average translation speed from recent interactions
        const recentTranslations = this.syncEngine?.translationHistory?.slice(-10) || [];
        
        if (recentTranslations.length === 0) return 7.5;
        
        const avgTime = recentTranslations.reduce((sum, t) => sum + (t.duration || 0), 0) / recentTranslations.length;
        return avgTime / 1000; // Convert to seconds
    }
    
    calculateBusinessAcumen() {
        // Calculate based on business value predictions accuracy
        const businessMetrics = this.contextualIntelligence?.state?.businessValue || {};
        
        if (businessMetrics.roi) {
            return Math.min(85, 60 + (businessMetrics.roi / 10));
        }
        
        return 65; // Default
    }
    
    updateLearningTrajectory() {
        const canvas = this.charts.trajectory?.ctx?.canvas;
        if (!canvas) return;
        
        const ctx = this.charts.trajectory.ctx;
        
        // Calculate overall score
        const scores = Object.values(this.metrics.competencies).map(c => c.current);
        const overallScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        
        // Add to trajectory data
        this.charts.trajectory.data.push({
            score: overallScore,
            timestamp: Date.now()
        });
        
        // Limit data points
        if (this.charts.trajectory.data.length > this.charts.trajectory.maxPoints) {
            this.charts.trajectory.data.shift();
        }
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw trajectory
        this.drawTrajectoryChart(ctx, canvas.width, canvas.height);
        
        // Update velocity
        this.updateLearningVelocity();
    }
    
    drawTrajectoryChart(ctx, width, height) {
        const data = this.charts.trajectory.data;
        if (data.length < 2) return;
        
        // Draw grid
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        
        // Horizontal lines
        for (let i = 0; i <= 4; i++) {
            const y = (height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Draw trajectory line
        ctx.strokeStyle = '#4ecdc4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        data.forEach((point, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - (point.score / 100) * height;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw gradient fill
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(78, 205, 196, 0.3)');
        gradient.addColorStop(1, 'rgba(78, 205, 196, 0)');
        
        ctx.fillStyle = gradient;
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
        
        // Draw points
        ctx.fillStyle = '#4ecdc4';
        data.forEach((point, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - (point.score / 100) * height;
            
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
        });
    }
    
    updateLearningVelocity() {
        const data = this.charts.trajectory.data;
        if (data.length < 5) return;
        
        // Calculate velocity (rate of improvement)
        const recentData = data.slice(-5);
        const firstScore = recentData[0].score;
        const lastScore = recentData[recentData.length - 1].score;
        const timeDiff = (recentData[recentData.length - 1].timestamp - recentData[0].timestamp) / 1000 / 60; // minutes
        
        const velocity = (lastScore - firstScore) / timeDiff; // points per minute
        this.metrics.learningVelocity = velocity;
        
        // Update display
        const velocityElement = document.getElementById('learning-velocity');
        if (velocityElement) {
            const arrow = velocity > 0 ? '↑' : velocity < 0 ? '↓' : '→';
            velocityElement.textContent = `${arrow} ${Math.abs(velocity).toFixed(2)} pts/min`;
            velocityElement.style.color = velocity > 0 ? '#4ecdc4' : velocity < 0 ? '#ff6b6b' : '#ffd93d';
        }
        
        // Project mastery time
        const currentAvg = data[data.length - 1].score;
        const targetScore = 90;
        const remainingPoints = targetScore - currentAvg;
        
        if (velocity > 0) {
            const minutesToMastery = remainingPoints / velocity;
            const daysToMastery = minutesToMastery / 60 / 24;
            
            const masteryElement = document.getElementById('projected-mastery');
            if (masteryElement) {
                if (daysToMastery < 1) {
                    masteryElement.textContent = `${Math.round(minutesToMastery / 60)} hours`;
                } else if (daysToMastery < 30) {
                    masteryElement.textContent = `${Math.round(daysToMastery)} days`;
                } else {
                    masteryElement.textContent = `${Math.round(daysToMastery / 30)} months`;
                }
            }
        }
    }
    
    updateProfessionalReadiness() {
        // Calculate readiness based on all competencies
        const scores = Object.values(this.metrics.competencies).map(c => c.current);
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        
        let readiness = 'Beginner';
        let position = 0;
        
        if (avgScore >= 85) {
            readiness = 'Expert';
            position = 75 + (avgScore - 85) * 2.5;
        } else if (avgScore >= 70) {
            readiness = 'Advanced';
            position = 50 + ((avgScore - 70) / 15) * 25;
        } else if (avgScore >= 50) {
            readiness = 'Intermediate';
            position = 25 + ((avgScore - 50) / 20) * 25;
        } else {
            readiness = 'Beginner';
            position = (avgScore / 50) * 25;
        }
        
        this.metrics.professionalReadiness = readiness;
        
        // Update UI
        const marker = document.getElementById('readiness-marker');
        if (marker) {
            marker.style.left = `${position}%`;
        }
        
        const details = document.getElementById('readiness-details');
        if (details) {
            details.innerHTML = `
                <div class="readiness-status">
                    <h4>Status: ${readiness}</h4>
                    <p>Overall Competency: ${avgScore.toFixed(1)}%</p>
                </div>
                <div class="readiness-recommendations">
                    <h5>Next Steps:</h5>
                    ${this.getReadinessRecommendations(readiness, scores)}
                </div>
            `;
        }
    }
    
    getReadinessRecommendations(readiness, scores) {
        const weakest = Object.entries(this.metrics.competencies)
            .sort((a, b) => a[1].current - b[1].current)[0];
        
        const recommendations = {
            'Beginner': [
                'Focus on basic quantum concepts',
                `Improve ${this.formatCompetencyName(weakest[0])}`,
                'Complete introductory scenarios'
            ],
            'Intermediate': [
                'Practice cross-representation translations',
                'Try business-focused scenarios',
                'Work on speed and accuracy'
            ],
            'Advanced': [
                'Master complex professional scenarios',
                'Mentor others in quantum concepts',
                'Explore cutting-edge applications'
            ],
            'Expert': [
                'Lead quantum initiatives',
                'Contribute to advanced research',
                'Design new quantum algorithms'
            ]
        };
        
        return `<ul>${recommendations[readiness].map(r => `<li>${r}</li>`).join('')}</ul>`;
    }
    
    updateCareerRecommendations() {
        const careerPaths = document.getElementById('career-paths');
        if (!careerPaths) return;
        
        // Determine best career paths based on competencies
        const careers = this.analyzeCareerFit();
        
        careerPaths.innerHTML = careers.map(career => `
            <div class="career-path ${career.fit > 80 ? 'high-fit' : career.fit > 60 ? 'medium-fit' : 'low-fit'}">
                <div class="career-header">
                    <h4>${career.title}</h4>
                    <span class="career-fit">${career.fit}% Match</span>
                </div>
                <div class="career-details">
                    <p>${career.description}</p>
                    <div class="career-requirements">
                        ${career.requirements.map(req => 
                            `<span class="requirement ${req.met ? 'met' : 'unmet'}">${req.name}</span>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    analyzeCareerFit() {
        const competencies = this.metrics.competencies;
        
        const careers = [
            {
                title: 'Quantum Software Engineer',
                description: 'Design and implement quantum algorithms and applications',
                requirements: [
                    { name: 'Technical Implementation', weight: 0.4, threshold: 80 },
                    { name: 'Cognitive Agility', weight: 0.3, threshold: 75 },
                    { name: 'Translation Speed', weight: 0.3, threshold: 5 }
                ]
            },
            {
                title: 'Quantum Solutions Architect',
                description: 'Design quantum solutions for business problems',
                requirements: [
                    { name: 'Professional Communication', weight: 0.3, threshold: 85 },
                    { name: 'Business Acumen', weight: 0.4, threshold: 80 },
                    { name: 'Technical Implementation', weight: 0.3, threshold: 70 }
                ]
            },
            {
                title: 'Quantum Product Manager',
                description: 'Lead quantum product development and strategy',
                requirements: [
                    { name: 'Business Acumen', weight: 0.4, threshold: 85 },
                    { name: 'Professional Communication', weight: 0.4, threshold: 90 },
                    { name: 'Cognitive Agility', weight: 0.2, threshold: 70 }
                ]
            },
            {
                title: 'Quantum Research Scientist',
                description: 'Advance quantum computing theory and applications',
                requirements: [
                    { name: 'Technical Implementation', weight: 0.5, threshold: 90 },
                    { name: 'Cognitive Agility', weight: 0.3, threshold: 85 },
                    { name: 'Translation Speed', weight: 0.2, threshold: 3 }
                ]
            }
        ];
        
        // Calculate fit for each career
        return careers.map(career => {
            let totalFit = 0;
            
            career.requirements = career.requirements.map(req => {
                const competencyKey = req.name.toLowerCase().replace(/ /g, '');
                const score = competencies[competencyKey]?.current || 0;
                const met = score >= req.threshold;
                
                totalFit += met ? req.weight * 100 : req.weight * (score / req.threshold) * 100;
                
                return { ...req, met };
            });
            
            return { ...career, fit: Math.round(totalFit) };
        }).sort((a, b) => b.fit - a.fit);
    }
    
    updatePeerComparison() {
        const canvas = this.charts.peer?.ctx?.canvas;
        if (!canvas) return;
        
        const ctx = this.charts.peer.ctx;
        
        // Simulated peer data (in production, this would come from a backend)
        const peerData = {
            you: Object.values(this.metrics.competencies).map(c => c.current),
            average: [65, 70, 68, 72, 60],
            top10: [85, 88, 90, 85, 82],
            top1: [95, 96, 98, 94, 92]
        };
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw radar chart
        this.drawRadarChart(ctx, canvas.width, canvas.height, peerData);
        
        // Update insights
        this.updatePeerInsights(peerData);
    }
    
    drawRadarChart(ctx, width, height, data) {
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(centerX, centerY) - 40;
        const numAxes = 5;
        
        const competencyNames = [
            'Translation\nSpeed',
            'Professional\nCommunication',
            'Cognitive\nAgility',
            'Technical\nImplementation',
            'Business\nAcumen'
        ];
        
        // Draw axes and labels
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        
        for (let i = 0; i < numAxes; i++) {
            const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Draw axis
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            // Draw label
            ctx.fillStyle = '#999';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const labelX = centerX + Math.cos(angle) * (radius + 20);
            const labelY = centerY + Math.sin(angle) * (radius + 20);
            
            const lines = competencyNames[i].split('\n');
            lines.forEach((line, idx) => {
                ctx.fillText(line, labelX, labelY + (idx - 0.5) * 14);
            });
        }
        
        // Draw concentric circles
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        // Draw data
        const datasets = [
            { name: 'top1', color: 'rgba(155, 89, 182, 0.3)', borderColor: '#9b59b6' },
            { name: 'top10', color: 'rgba(255, 215, 61, 0.3)', borderColor: '#ffd93d' },
            { name: 'average', color: 'rgba(255, 107, 107, 0.3)', borderColor: '#ff6b6b' },
            { name: 'you', color: 'rgba(78, 205, 196, 0.3)', borderColor: '#4ecdc4' }
        ];
        
        datasets.forEach(dataset => {
            const values = data[dataset.name];
            
            ctx.fillStyle = dataset.color;
            ctx.strokeStyle = dataset.borderColor;
            ctx.lineWidth = 2;
            
            ctx.beginPath();
            values.forEach((value, i) => {
                const angle = (Math.PI * 2 / numAxes) * i - Math.PI / 2;
                const distance = (value / 100) * radius;
                const x = centerX + Math.cos(angle) * distance;
                const y = centerY + Math.sin(angle) * distance;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
        });
        
        // Draw legend
        ctx.fillStyle = '#999';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'left';
        
        const legendY = height - 20;
        datasets.reverse().forEach((dataset, i) => {
            const legendX = 20 + i * 100;
            
            ctx.fillStyle = dataset.borderColor;
            ctx.fillRect(legendX, legendY - 8, 12, 12);
            
            ctx.fillStyle = '#999';
            ctx.fillText(dataset.name === 'you' ? 'You' : 
                        dataset.name === 'average' ? 'Average' :
                        dataset.name === 'top10' ? 'Top 10%' : 'Top 1%', 
                        legendX + 18, legendY);
        });
    }
    
    updatePeerInsights(peerData) {
        const insights = document.getElementById('peer-insights');
        if (!insights) return;
        
        // Calculate percentile
        const yourAvg = peerData.you.reduce((a, b) => a + b, 0) / peerData.you.length;
        const avgScore = peerData.average.reduce((a, b) => a + b, 0) / peerData.average.length;
        
        let percentile = 50;
        if (yourAvg > avgScore) {
            const top10Avg = peerData.top10.reduce((a, b) => a + b, 0) / peerData.top10.length;
            if (yourAvg > top10Avg) {
                percentile = 90 + (yourAvg - top10Avg) / (100 - top10Avg) * 10;
            } else {
                percentile = 50 + (yourAvg - avgScore) / (top10Avg - avgScore) * 40;
            }
        } else {
            percentile = (yourAvg / avgScore) * 50;
        }
        
        insights.innerHTML = `
            <div class="peer-stat">
                <span class="stat-label">Your Percentile</span>
                <span class="stat-value">${Math.round(percentile)}th</span>
            </div>
            <div class="peer-stat">
                <span class="stat-label">Overall Score</span>
                <span class="stat-value">${yourAvg.toFixed(1)}%</span>
            </div>
            <div class="peer-stat">
                <span class="stat-label">vs Average</span>
                <span class="stat-value ${yourAvg > avgScore ? 'positive' : 'negative'}">
                    ${yourAvg > avgScore ? '+' : ''}${(yourAvg - avgScore).toFixed(1)}%
                </span>
            </div>
        `;
    }
    
    updateActivityHeatmap() {
        // Simulate activity data (in production, this would be tracked)
        const now = new Date();
        const currentDay = now.getDay();
        const currentHour = now.getHours();
        
        // Update current cell
        const cell = document.querySelector(`[data-day="${currentDay}"][data-hour="${currentHour}"]`);
        if (cell) {
            const currentIntensity = parseInt(cell.dataset.intensity || '0');
            const newIntensity = Math.min(currentIntensity + 1, 5);
            cell.dataset.intensity = newIntensity;
            cell.style.background = this.getHeatmapColor(newIntensity);
        }
    }
    
    getHeatmapColor(intensity) {
        const colors = [
            'rgba(78, 205, 196, 0.1)',
            'rgba(78, 205, 196, 0.3)',
            'rgba(78, 205, 196, 0.5)',
            'rgba(78, 205, 196, 0.7)',
            'rgba(78, 205, 196, 0.9)',
            'rgba(78, 205, 196, 1)'
        ];
        return colors[intensity] || colors[0];
    }
    
    setupEventListeners() {
        // Listen for competency updates
        document.addEventListener('competency-update', (e) => {
            this.updateCompetencyScores();
        });
        
        // Listen for scenario completions
        document.addEventListener('scenario-complete', (e) => {
            this.onScenarioComplete(e.detail);
        });
    }
    
    onScenarioComplete(scenario) {
        // Boost relevant competencies
        if (scenario.audience === 'executives') {
            this.metrics.competencies.professionalCommunication.current += 2;
            this.metrics.competencies.businessAcumen.current += 3;
        } else if (scenario.audience === 'technical') {
            this.metrics.competencies.technicalImplementation.current += 3;
            this.metrics.competencies.cognitiveAgility.current += 2;
        }
        
        // Update all metrics
        this.updateAllMetrics();
    }
    
    toggleLiveMode() {
        if (this.trackingInterval) {
            clearInterval(this.trackingInterval);
            this.trackingInterval = null;
            console.log('⏸️ Live tracking paused');
        } else {
            this.startRealTimeTracking();
            console.log('▶️ Live tracking resumed');
        }
    }
    
    exportReport() {
        const report = {
            timestamp: new Date().toISOString(),
            competencies: this.metrics.competencies,
            learningVelocity: this.metrics.learningVelocity,
            professionalReadiness: this.metrics.professionalReadiness,
            careerRecommendations: this.analyzeCareerFit(),
            trajectoryData: this.charts.trajectory?.data || [],
            sessionDuration: Date.now() - (window.app?.performanceTracking?.sessionStart || Date.now())
        };
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quantum-competency-report-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        console.log('📊 Exported competency report');
    }
    
    destroy() {
        if (this.trackingInterval) {
            clearInterval(this.trackingInterval);
        }
        
        this.charts = {};
        this.container.innerHTML = '';
    }
}

// Add CSS for the dashboard
const style = document.createElement('style');
style.textContent = `
.analytics-dashboard {
    padding: 20px;
    background: #1a1a1a;
    border-radius: 8px;
    color: #e0e0e0;
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #333;
}

.dashboard-header h2 {
    margin: 0;
    color: #4ecdc4;
    font-size: 24px;
}

.competency-rings-section,
.trajectory-section,
.readiness-section,
.career-section,
.peer-section,
.activity-section {
    margin-bottom: 40px;
}

.competency-rings-section h3,
.trajectory-section h3,
.readiness-section h3,
.career-section h3,
.peer-section h3,
.activity-section h3 {
    color: #4ecdc4;
    margin-bottom: 20px;
    font-size: 18px;
    border-left: 3px solid #4ecdc4;
    padding-left: 10px;
}

.competency-rings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 30px;
    margin-bottom: 30px;
}

.competency-ring-container {
    text-align: center;
}

.competency-ring {
    width: 120px;
    height: 120px;
    position: relative;
    margin: 0 auto 10px;
}

.competency-ring svg {
    transform: rotate(-90deg);
}

.competency-ring-bg {
    fill: none;
    stroke: #333;
    stroke-width: 8;
}

.competency-ring-progress {
    fill: none;
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 1s ease;
}

.competency-ring-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
    font-weight: bold;
    color: #4ecdc4;
}

.competency-label {
    font-size: 12px;
    color: #999;
    margin-bottom: 5px;
}

.competency-target {
    font-size: 11px;
    color: #666;
}

.trajectory-chart {
    background: #0a0a0a;
    border: 1px solid #333;
    border-radius: 4px;
    padding: 20px;
    margin-bottom: 20px;
}

.trajectory-chart canvas {
    width: 100%;
    height: 200px;
}

.trajectory-insights {
    display: flex;
    gap: 30px;
}

.insight-item {
    flex: 1;
    background: #2a2a2a;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
}

.insight-label {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 8px;
    text-transform: uppercase;
}

.insight-value {
    display: block;
    color: #4ecdc4;
    font-size: 20px;
    font-weight: bold;
}

.readiness-meter {
    margin-bottom: 30px;
}

.readiness-scale {
    height: 40px;
    background: linear-gradient(to right, #ff6b6b 0%, #ffd93d 33%, #98d8d8 66%, #4ecdc4 100%);
    border-radius: 20px;
    position: relative;
    margin-bottom: 10px;
}

.readiness-marker {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background: #fff;
    border: 3px solid #333;
    border-radius: 50%;
    transition: left 1s ease;
}

.readiness-labels {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999;
}

.readiness-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

.readiness-status,
.readiness-recommendations {
    background: #2a2a2a;
    padding: 20px;
    border-radius: 4px;
}

.readiness-status h4,
.readiness-recommendations h5 {
    margin: 0 0 10px 0;
    color: #4ecdc4;
}

.readiness-recommendations ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.readiness-recommendations li {
    padding: 8px 0;
    border-bottom: 1px solid #333;
}

.readiness-recommendations li:last-child {
    border-bottom: none;
}

.career-paths {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}

.career-path {
    background: #2a2a2a;
    border: 1px solid #333;
    border-radius: 6px;
    padding: 20px;
    transition: all 0.3s ease;
}

.career-path.high-fit {
    border-color: #4ecdc4;
    box-shadow: 0 0 10px rgba(78, 205, 196, 0.3);
}

.career-path.medium-fit {
    border-color: #ffd93d;
}

.career-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.career-header h4 {
    margin: 0;
    color: #fff;
    font-size: 16px;
}

.career-fit {
    background: #4ecdc4;
    color: #0a0a0a;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
}

.career-details p {
    color: #999;
    font-size: 14px;
    margin-bottom: 15px;
}

.career-requirements {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.requirement {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    border: 1px solid;
}

.requirement.met {
    background: rgba(78, 205, 196, 0.1);
    border-color: #4ecdc4;
    color: #4ecdc4;
}

.requirement.unmet {
    background: rgba(255, 107, 107, 0.1);
    border-color: #ff6b6b;
    color: #ff6b6b;
}

.peer-comparison {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 30px;
}

.peer-chart canvas {
    width: 100%;
    height: 300px;
    background: #0a0a0a;
    border: 1px solid #333;
    border-radius: 4px;
}

.peer-insights {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.peer-stat {
    background: #2a2a2a;
    padding: 15px;
    border-radius: 4px;
    text-align: center;
}

.stat-label {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 8px;
    text-transform: uppercase;
}

.stat-value {
    display: block;
    font-size: 24px;
    font-weight: bold;
    color: #4ecdc4;
}

.stat-value.positive {
    color: #4ecdc4;
}

.stat-value.negative {
    color: #ff6b6b;
}

.activity-heatmap {
    background: #0a0a0a;
    border: 1px solid #333;
    border-radius: 4px;
    padding: 20px;
    overflow-x: auto;
}

.heatmap-grid {
    display: inline-block;
    min-width: 100%;
}

.heatmap-labels {
    display: flex;
    margin-bottom: 5px;
}

.heatmap-label {
    width: 20px;
    text-align: center;
    font-size: 10px;
    color: #666;
}

.heatmap-label:first-child {
    width: 40px;
}

.heatmap-row {
    display: flex;
}

.heatmap-cell {
    width: 20px;
    height: 20px;
    border: 1px solid #333;
    margin: 1px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.heatmap-cell:hover {
    border-color: #4ecdc4;
}

@media (max-width: 768px) {
    .competency-rings-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .career-paths {
        grid-template-columns: 1fr;
    }
    
    .peer-comparison {
        grid-template-columns: 1fr;
    }
    
    .readiness-details {
        grid-template-columns: 1fr;
    }
}
`;

document.head.appendChild(style);

// Make available globally
window.AnalyticsDashboard = AnalyticsDashboard;