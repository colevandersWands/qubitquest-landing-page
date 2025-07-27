/**
 * Business Scenarios for Professional Quantum Fluency Training
 * 
 * Authentic workplace contexts requiring quadratic representation switching
 * Focus: Executive communications, stakeholder meetings, business justification
 */

class BusinessScenarios {
    constructor(contextualEntry, syncEngine) {
        this.contextualEntry = contextualEntry;
        this.syncEngine = syncEngine;
        this.scenarios = new Map();
        this.initializeScenarios();
    }

    initializeScenarios() {
        // Executive briefing scenarios
        this.addScenario('ceo_quantum_investment', {
            title: 'CEO Investment Decision: $5M Quantum Initiative',
            context: 'Board Meeting',
            urgency: 'high',
            timeLimit: 300, // 5 minutes
            stakeholders: ['CEO', 'CFO', 'CTO', 'Board Members'],
            businessContext: {
                company: 'GlobalTech Financial Services',
                revenue: '$2.8B annually',
                challenge: 'Portfolio optimization lagging competition',
                opportunity: 'Quantum advantage in risk modeling'
            },
            entryPoint: 'plainspeak',
            challenge: 'Convince the CEO to approve a $5M quantum computing investment for portfolio optimization',
            objectives: [
                'Explain quantum advantage in business terms',
                'Present realistic ROI timeline and metrics',
                'Address implementation risks and mitigation',
                'Compare quantum vs classical approaches clearly'
            ],
            content: this.getCEOInvestmentContent(),
            assessment: this.getCEOAssessmentCriteria()
        });

        this.addScenario('cfo_budget_justification', {
            title: 'CFO Budget Review: Quantum vs Traditional IT',
            context: 'Quarterly Budget Planning',
            urgency: 'medium',
            timeLimit: 480, // 8 minutes
            stakeholders: ['CFO', 'IT Director', 'Risk Management Head'],
            businessContext: {
                company: 'Meridian Asset Management',
                budget: '$45M IT budget under review',
                challenge: 'Quantum initiative competing with traditional IT projects',
                pressure: 'Shareholder demands for efficiency gains'
            },
            entryPoint: 'plainspeak',
            challenge: 'Justify quantum computing budget allocation vs traditional IT improvements',
            objectives: [
                'Present quantified business case with metrics',
                'Compare quantum ROI to alternative investments',
                'Address financial risks and timeline concerns',
                'Demonstrate cost-benefit analysis expertise'
            ],
            content: this.getCFOBudgetContent(),
            assessment: this.getCFOAssessmentCriteria()
        });

        this.addScenario('board_strategic_presentation', {
            title: 'Board Presentation: Quantum Strategy Roadmap',
            context: 'Quarterly Board Meeting',
            urgency: 'high',
            timeLimit: 900, // 15 minutes
            stakeholders: ['Board of Directors', 'Executive Team', 'External Advisors'],
            businessContext: {
                company: 'Apex Financial Group',
                situation: 'Competitive pressure from quantum-enabled firms',
                mandate: 'Develop 3-year quantum strategy',
                scrutiny: 'Fiduciary responsibility to shareholders'
            },
            entryPoint: 'plainspeak',
            challenge: 'Present comprehensive quantum strategy to board of directors',
            objectives: [
                'Articulate strategic quantum vision and roadmap',
                'Present competitive analysis and market positioning',
                'Address governance and risk management concerns',
                'Secure board approval for quantum initiative'
            ],
            content: this.getBoardPresentationContent(),
            assessment: this.getBoardAssessmentCriteria()
        });

        this.addScenario('client_consultation', {
            title: 'Client Advisory: Quantum Computing ROI Assessment',
            context: 'Strategic Consulting Engagement',
            urgency: 'medium',
            timeLimit: 1800, // 30 minutes
            stakeholders: ['Client CEO', 'Client CTO', 'Investment Committee'],
            businessContext: {
                client: 'TechForward Ventures',
                industry: 'Venture Capital',
                challenge: 'Evaluating quantum computing investment opportunities',
                expertise: 'Need independent quantum assessment'
            },
            entryPoint: 'random',
            challenge: 'Provide expert consultation on quantum computing investment potential',
            objectives: [
                'Assess quantum technology readiness and timeline',
                'Evaluate investment opportunities and risks',
                'Provide actionable recommendations',
                'Demonstrate deep quantum business expertise'
            ],
            content: this.getClientConsultationContent(),
            assessment: this.getConsultantAssessmentCriteria()
        });

        // Crisis management scenarios
        this.addScenario('quantum_winter_response', {
            title: 'Crisis Response: "Quantum Winter" Media Coverage',
            context: 'Emergency PR Management',
            urgency: 'critical',
            timeLimit: 180, // 3 minutes
            stakeholders: ['PR Team', 'Investors', 'Media', 'Employees'],
            businessContext: {
                situation: 'Negative quantum computing coverage trending',
                pressure: 'Stock price down 12% on quantum pessimism',
                challenge: 'Protect quantum initiative investment',
                timeline: 'Press conference in 2 hours'
            },
            entryPoint: 'plainspeak',
            challenge: 'Address media concerns about quantum computing viability while protecting company quantum investments',
            objectives: [
                'Counter negative quantum narratives with facts',
                'Reassure investors about quantum strategy',
                'Demonstrate understanding of quantum realities',
                'Maintain credibility while being optimistic'
            ],
            content: this.getQuantumWinterContent(),
            assessment: this.getCrisisAssessmentCriteria()
        });

        // Acquisition and partnership scenarios
        this.addScenario('quantum_startup_acquisition', {
            title: 'M&A Evaluation: Quantum Computing Startup Acquisition',
            context: 'Strategic Acquisition Committee',
            urgency: 'high',
            timeLimit: 1200, // 20 minutes
            stakeholders: ['M&A Team', 'Technical Due Diligence', 'Legal', 'Finance'],
            businessContext: {
                target: 'QuantumEdge Analytics (Series B startup)',
                valuation: '$85M acquisition price',
                rationale: 'Quantum algorithms for portfolio optimization',
                competition: 'Two other bidders in process'
            },
            entryPoint: 'code',
            challenge: 'Evaluate quantum startup acquisition from technical and business perspectives',
            objectives: [
                'Assess quantum technology technical merit',
                'Evaluate business model and market potential',
                'Identify integration risks and opportunities',
                'Recommend acquisition terms and structure'
            ],
            content: this.getAcquisitionContent(),
            assessment: this.getAcquisitionAssessmentCriteria()
        });
    }

    addScenario(id, scenarioData) {
        this.scenarios.set(id, scenarioData);
    }

    getScenario(id) {
        return this.scenarios.get(id);
    }

    getAllScenarios() {
        return Array.from(this.scenarios.values());
    }

    launchScenario(scenarioId, options = {}) {
        const scenario = this.getScenario(scenarioId);
        if (!scenario) {
            throw new Error(`Business scenario ${scenarioId} not found`);
        }

        return this.contextualEntry.launchScenario(scenarioId, {
            ...options,
            customScenario: scenario
        });
    }

    // Content generators for different scenarios

    getCEOInvestmentContent() {
        return {
            plainspeak: `Our quantum computing initiative represents a strategic investment in next-generation portfolio optimization technology. While classical computers analyze investment scenarios sequentially, quantum computers can explore multiple portfolio configurations simultaneously through quantum superposition. For our $2.8B portfolio management business, this quantum advantage could improve risk-adjusted returns by 15-25 basis points annually, generating $4.2-7M in additional revenue while reducing computational costs by 60%. The $5M investment includes quantum software development, cloud access, and team training, with ROI expected within 18 months as we capture quantum advantage in high-frequency portfolio rebalancing.`,
            
            code: `# Quantum Portfolio Optimization Business Case
import numpy as np

# Current classical approach performance
classical_compute_time = 4.5  # hours for full portfolio optimization
classical_annual_cost = 2.8e6  # $2.8M in compute infrastructure
classical_accuracy = 0.847  # 84.7% optimal allocation accuracy

# Projected quantum approach
quantum_compute_time = 0.3  # hours (15x speedup)
quantum_annual_cost = 1.1e6  # $1.1M (60% cost reduction)
quantum_accuracy = 0.925  # 92.5% accuracy (quantum advantage)

# Business impact calculation
portfolio_value = 2.8e9  # $2.8B under management
accuracy_improvement = quantum_accuracy - classical_accuracy
annual_value_gain = portfolio_value * accuracy_improvement * 0.0025  # 25bps
cost_savings = classical_annual_cost - quantum_annual_cost

total_annual_benefit = annual_value_gain + cost_savings
quantum_investment = 5e6  # $5M initial investment
roi_months = (quantum_investment / total_annual_benefit) * 12

print(f"Annual Value Gain: ${annual_value_gain:,.0f}")
print(f"Annual Cost Savings: ${cost_savings:,.0f}")
print(f"Total Annual Benefit: ${total_annual_benefit:,.0f}")
print(f"ROI Timeline: {roi_months:.1f} months")`,

            notation: `\\text{Quantum Business Value} = \\Delta\\text{Accuracy} \\times \\text{Portfolio} \\times \\text{Margin}$<br><br>
$\\text{ROI} = \\frac{\\text{Annual Benefit}}{\\text{Investment}} = \\frac{\\$7.0M}{\\$5M} = 140\\%$<br><br>
$\\text{Payback Period} = \\frac{\\text{Investment}}{\\text{Monthly Benefit}} = \\frac{\\$5M}{\\$583K} = 8.6 \\text{ months}$<br><br>
$\\text{NPV}_{3yr} = \\sum_{t=1}^{3} \\frac{\\$7M}{(1.08)^t} - \\$5M = \\$13.1M$`,

            circuit: {
                qubits: 4,
                operations: [
                    { type: 'H', qubit: 0, time: 0 },
                    { type: 'H', qubit: 1, time: 0 },
                    { type: 'CNOT', control: 0, target: 1, time: 1 },
                    { type: 'RY', angle: Math.PI/4, qubit: 2, time: 2 },
                    { type: 'CNOT', control: 1, target: 2, time: 3 }
                ]
            }
        };
    }

    getCEOAssessmentCriteria() {
        return {
            businessAcumen: {
                weight: 40,
                criteria: [
                    'Clear articulation of business value proposition',
                    'Realistic ROI projections with supporting data',
                    'Understanding of competitive implications',
                    'Recognition of implementation challenges'
                ]
            },
            technicalCredibility: {
                weight: 30,
                criteria: [
                    'Accurate explanation of quantum advantage',
                    'Proper use of technical terminology',
                    'Understanding of quantum limitations',
                    'Realistic timeline expectations'
                ]
            },
            communicationSkill: {
                weight: 20,
                criteria: [
                    'Executive-appropriate language and depth',
                    'Clear structure and logical flow',
                    'Confidence and authority in presentation',
                    'Effective use of analogies and examples'
                ]
            },
            stakeholderManagement: {
                weight: 10,
                criteria: [
                    'Addresses CEO concerns proactively',
                    'Anticipates board questions',
                    'Manages risk perception effectively',
                    'Builds consensus and buy-in'
                ]
            }
        };
    }

    getCFOBudgetContent() {
        return {
            plainspeak: `The quantum computing budget request of $5M represents a strategic technology investment with measurable financial returns. Our analysis shows quantum portfolio optimization will reduce computational infrastructure costs from $2.8M to $1.1M annually (60% reduction) while improving portfolio performance by 15-25 basis points. This translates to $4.2-7M in additional annual revenue. The 18-month payback period and 140% annual ROI significantly outperform our traditional IT investments, which average 36-month payback and 65% ROI. Quantum computing addresses our core business challenge - optimizing large-scale portfolios faster and more accurately than classical methods allow.`,
            
            code: `# CFO Budget Analysis: Quantum vs Traditional IT ROI
import pandas as pd

# Investment comparison data
investments = pd.DataFrame({
    'Project': ['Quantum Computing', 'Server Upgrade', 'Cloud Migration', 'ML Platform'],
    'Investment': [5.0, 3.2, 4.1, 2.8],  # $M
    'Annual_Benefit': [7.0, 1.8, 2.1, 1.5],  # $M
    'Payback_Months': [8.6, 21.3, 23.4, 22.4],
    'Annual_ROI': [140, 56, 51, 54],  # %
    'Risk_Level': ['Medium', 'Low', 'Low', 'Medium']
})

# Calculate portfolio impact
portfolio_performance = pd.DataFrame({
    'Scenario': ['Current', 'With_Quantum'],
    'Compute_Cost': [2.8, 1.1],  # $M annually
    'Accuracy': [84.7, 92.5],  # % optimal
    'Portfolio_Value': [2800, 2800],  # $M
    'Value_Generation': [0, 7.0]  # $M additional annually
})

print("Investment Comparison:")
print(investments.sort_values('Annual_ROI', ascending=False))
print("\\nPortfolio Impact Analysis:")
print(portfolio_performance)

# Risk-adjusted returns
quantum_risk_adjusted_roi = 140 * 0.8  # 80% confidence factor
traditional_average_roi = investments[investments['Project'] != 'Quantum Computing']['Annual_ROI'].mean()

print(f"\\nQuantum Risk-Adjusted ROI: {quantum_risk_adjusted_roi}%")
print(f"Traditional IT Average ROI: {traditional_average_roi:.1f}%")`,

            notation: `\\text{Budget Allocation Optimization:}$<br><br>
$\\max \\sum_{i} ROI_i \\times Budget_i \\text{ subject to } \\sum_{i} Budget_i \\leq B_{total}$<br><br>
$ROI_{quantum} = 140\\% > ROI_{traditional} = 56\\%$<br><br>
$\\text{Efficiency Ratio} = \\frac{\\text{Quantum Benefit}}{\\text{Quantum Cost}} = \\frac{\\$7M}{\\$5M} = 1.4$<br><br>
$\\text{NPV Comparison: } NPV_{quantum} - NPV_{traditional} = \\$8.2M$`,

            circuit: null // Circuit not relevant for CFO budget scenario
        };
    }

    getCFOAssessmentCriteria() {
        return {
            financialAnalysis: {
                weight: 50,
                criteria: [
                    'Accurate ROI calculations and methodology',
                    'Realistic cost projections and assumptions',
                    'Proper risk assessment and mitigation',
                    'Comparison with alternative investments'
                ]
            },
            businessJustification: {
                weight: 25,
                criteria: [
                    'Clear link between quantum and business value',
                    'Understanding of operational impact',
                    'Competitive advantage considerations',
                    'Timeline and milestone realism'
                ]
            },
            riskManagement: {
                weight: 15,
                criteria: [
                    'Identification of key risks',
                    'Mitigation strategies proposed',
                    'Sensitivity analysis awareness',
                    'Contingency planning'
                ]
            },
            stakeholderCommunication: {
                weight: 10,
                criteria: [
                    'CFO-appropriate financial language',
                    'Data-driven argumentation',
                    'Professional presentation quality',
                    'Confidence in financial projections'
                ]
            }
        };
    }

    getBoardPresentationContent() {
        return {
            plainspeak: `Our quantum computing strategic initiative positions Apex Financial Group at the forefront of next-generation financial technology. As quantum computers become commercially viable, early adopters will capture significant competitive advantages in portfolio optimization, risk modeling, and algorithmic trading. Our three-year roadmap includes: Year 1 - quantum proof-of-concept and team development ($5M investment), Year 2 - production deployment for high-value portfolios ($3M additional), Year 3 - full-scale quantum advantage across all trading operations ($2M optimization). This $10M total investment protects our $15B assets under management from quantum-enabled competitors while generating an estimated $25-40M in additional annual revenue by Year 3 through superior portfolio performance and reduced computational costs.`,
            
            code: `# Board Strategic Analysis: 3-Year Quantum Roadmap
import matplotlib.pyplot as plt
import numpy as np

# Strategic timeline and investment
years = np.array([2024, 2025, 2026, 2027])
investment = np.array([0, 5, 3, 2])  # $M cumulative
revenue_impact = np.array([0, 2, 12, 28])  # $M additional annually
competitive_advantage = np.array([0, 0.15, 0.35, 0.55])  # market edge factor

# Competitive landscape analysis
competitors_quantum_adoption = {
    'Goldman Sachs': 'Production pilot - 2024',
    'JPMorgan': 'Research phase - 2025', 
    'BlackRock': 'Partnership strategy - 2024',
    'Citadel': 'Stealth development - 2024',
    'Apex Financial': 'Strategic initiative - 2024'
}

# Market positioning analysis
total_market = 450e9  # $450B quantitative finance market
quantum_addressable = total_market * 0.25  # 25% quantum-addressable
our_potential_share = quantum_addressable * 0.08  # 8% potential market share

print("Strategic Quantum Timeline:")
for i, year in enumerate(years[1:], 1):
    print(f"{year}: Investment ${investment[i]}M, Revenue Impact ${revenue_impact[i]}M")

print(f"\\nQuantum Addressable Market: ${quantum_addressable/1e9:.0f}B")
print(f"Potential Revenue Opportunity: ${our_potential_share/1e9:.1f}B")
print(f"ROI by Year 3: {(revenue_impact[3]/investment.sum())*100:.0f}%")`,

            notation: `\\text{Strategic Value Model:}$<br><br>
$V_{total} = \\sum_{t=1}^{3} \\frac{R_t - C_t}{(1+r)^t} + \\frac{V_{terminal}}{(1+r)^3}$<br><br>
$\\text{Where: } R_t = \\text{Revenue impact year t}$<br>
$C_t = \\text{Investment year t}$<br>
$r = 0.12 \\text{ (cost of capital)}$<br><br>
$V_{terminal} = \\frac{R_3 \\times (1+g)}{r-g} = \\frac{\\$28M \\times 1.15}{0.12-0.15} = \\$460M$<br><br>
$\\text{Strategic NPV} = \\$387M$`,

            circuit: {
                qubits: 6,
                operations: [
                    { type: 'H', qubit: 0, time: 0 },
                    { type: 'H', qubit: 1, time: 0 },
                    { type: 'H', qubit: 2, time: 0 },
                    { type: 'CNOT', control: 0, target: 3, time: 1 },
                    { type: 'CNOT', control: 1, target: 4, time: 1 },
                    { type: 'CNOT', control: 2, target: 5, time: 1 },
                    { type: 'RY', angle: Math.PI/3, qubit: 3, time: 2 },
                    { type: 'RY', angle: Math.PI/6, qubit: 4, time: 2 }
                ]
            }
        };
    }

    getBoardAssessmentCriteria() {
        return {
            strategicVision: {
                weight: 35,
                criteria: [
                    'Compelling long-term strategic narrative',
                    'Clear competitive positioning and advantage',
                    'Understanding of market transformation',
                    'Integration with overall business strategy'
                ]
            },
            executionPlan: {
                weight: 25,
                criteria: [
                    'Realistic timeline and milestones',
                    'Resource requirements and allocation',
                    'Risk mitigation and contingency plans',
                    'Success metrics and governance'
                ]
            },
            financialCase: {
                weight: 25,
                criteria: [
                    'Robust financial projections and assumptions',
                    'Clear value creation mechanisms',
                    'Appropriate risk-adjusted returns',
                    'Capital allocation efficiency'
                ]
            },
            boardCommunication: {
                weight: 15,
                criteria: [
                    'Board-appropriate strategic language',
                    'Confident executive presence',
                    'Effective visual and data presentation',
                    'Anticipates and addresses board concerns'
                ]
            }
        };
    }

    getClientConsultationContent() {
        return {
            plainspeak: `Based on our quantum computing market analysis, I recommend a cautious but strategic approach to quantum technology investments. Current quantum computers are in the "early commercial" phase - comparable to where classical computers were in the early 1980s. For venture capital, the most promising near-term opportunities are quantum software companies developing algorithms for finance, logistics, and drug discovery, rather than quantum hardware manufacturers facing significant technical and scaling challenges. We project quantum advantage in financial applications within 3-5 years for specific optimization problems, making this an optimal time for strategic positioning. I recommend allocating 5-8% of your technology portfolio to quantum computing investments, focusing on companies with hybrid quantum-classical approaches and proven classical performance as a foundation.`,
            
            code: `# Quantum Investment Analysis for VC Portfolio
import pandas as pd
import numpy as np

# Quantum technology readiness assessment
quantum_sectors = pd.DataFrame({
    'Sector': ['Quantum Software', 'Quantum Hardware', 'Quantum Cloud', 'Quantum Security'],
    'TRL_Level': [6, 4, 7, 5],  # Technology Readiness Level (1-9)
    'Market_Size_2027': [2.4, 8.1, 1.8, 0.9],  # $B
    'Competition_Level': ['Medium', 'High', 'Low', 'Medium'],
    'Investment_Risk': ['Medium', 'High', 'Low', 'Medium'],
    'Recommended_Allocation': [40, 25, 20, 15]  # % of quantum portfolio
})

# Timeline analysis
investment_timeline = {
    '2024-2025': 'Proof of concept and pilot programs',
    '2026-2027': 'Early commercial advantage in specific use cases', 
    '2028-2030': 'Broad quantum advantage across multiple industries',
    '2030+': 'Quantum-classical hybrid becomes standard'
}

# Risk-return analysis
quantum_investments = pd.DataFrame({
    'Stage': ['Seed', 'Series A', 'Series B', 'Growth'],
    'Avg_Investment': [2.5, 8.1, 15.3, 35.2],  # $M
    'Success_Rate': [15, 25, 40, 65],  # %
    'Expected_Multiple': [25, 12, 6, 3.5],
    'Risk_Adjusted_Return': [3.75, 3.0, 2.4, 2.3]
})

print("Quantum Sector Analysis:")
print(quantum_sectors[['Sector', 'TRL_Level', 'Market_Size_2027', 'Recommended_Allocation']])
print("\\nInvestment Stage Analysis:")
print(quantum_investments)

# Portfolio recommendation
portfolio_size = 250e6  # $250M fund
quantum_allocation = portfolio_size * 0.065  # 6.5% recommended
print(f"\\nRecommended Quantum Allocation: ${quantum_allocation/1e6:.1f}M")`,

            notation: `\\text{Portfolio Optimization with Quantum Allocation:}$<br><br>
$\\max E[R_p] = \\sum_{i} w_i \\mu_i \\text{ subject to } \\sum_{i} w_i = 1$<br><br>
$\\text{Quantum allocation: } w_{quantum} = 0.065$<br><br>
$\\text{Expected return: } \\mu_{quantum} = 0.28 \\text{ (280\\% IRR)}$<br><br>
$\\text{Risk adjustment: } \\sigma_{quantum} = 0.45$<br><br>
$\\text{Sharpe ratio: } \\frac{\\mu_{quantum} - r_f}{\\sigma_{quantum}} = \\frac{0.28 - 0.05}{0.45} = 0.51$`,

            circuit: {
                qubits: 3,
                operations: [
                    { type: 'H', qubit: 0, time: 0 },
                    { type: 'RY', angle: Math.PI/4, qubit: 1, time: 1 },
                    { type: 'CNOT', control: 0, target: 2, time: 2 }
                ]
            }
        };
    }

    getConsultantAssessmentCriteria() {
        return {
            expertiseCredibility: {
                weight: 40,
                criteria: [
                    'Deep understanding of quantum technology landscape',
                    'Accurate market timing and readiness assessment',
                    'Realistic risk-return projections',
                    'Industry-specific insights and examples'
                ]
            },
            strategicInsight: {
                weight: 30,
                criteria: [
                    'Thoughtful investment thesis and rationale',
                    'Clear differentiation between opportunities',
                    'Understanding of competitive dynamics',
                    'Long-term value creation perspective'
                ]
            },
            clientValue: {
                weight: 20,
                criteria: [
                    'Actionable recommendations with clear next steps',
                    'Client-specific portfolio considerations',
                    'Risk mitigation strategies',
                    'Implementation guidance and support'
                ]
            },
            consultantPresence: {
                weight: 10,
                criteria: [
                    'Professional confidence and authority',
                    'Clear and persuasive communication',
                    'Responsive to client questions and concerns',
                    'Balanced optimism with realistic caution'
                ]
            }
        };
    }

    getQuantumWinterContent() {
        return {
            plainspeak: `While recent media coverage has questioned quantum computing timelines, our strategic analysis confirms that quantum technology development remains on track for commercial advantage in specialized applications within 3-5 years. The current "quantum winter" narrative misunderstands the technology adoption curve - quantum computing is following the same pattern as artificial intelligence, which experienced similar skepticism cycles before achieving breakthrough commercial success. Our quantum portfolio optimization initiative focuses on proven near-term applications where quantum advantage is mathematically demonstrable, not speculative future capabilities. We maintain confidence in our $5M quantum investment because it targets specific financial algorithms where quantum computers already show measurable improvements over classical methods in controlled tests.`,
            
            code: `# Quantum Progress Analysis: Reality vs Hype Cycle
import numpy as np
import matplotlib.pyplot as plt

# Technology adoption curve analysis
years = np.array([2020, 2021, 2022, 2023, 2024, 2025, 2026])
hype_level = np.array([3, 8, 9, 10, 6, 4, 5])  # Media hype (1-10)
actual_progress = np.array([2, 3, 4, 5, 6, 7, 8])  # Technical progress (1-10)
commercial_value = np.array([0, 0, 1, 2, 4, 7, 12])  # Commercial applications

# Quantum winter vs reality
current_sentiment = "Quantum Winter"
actual_technical_progress = "Steady advancement"
commercial_readiness = "Early applications demonstrating value"

# Market fundamentals
quantum_patents_filed = 2847  # 2023 data
quantum_startups_funded = 89  # $2.1B total 2023
enterprise_pilots = 156  # Active quantum pilots

print(f"Current Market Sentiment: {current_sentiment}")
print(f"Technical Reality: {actual_technical_progress}")
print(f"Commercial Status: {commercial_readiness}")
print(f"\\nMarket Fundamentals:")
print(f"Patents Filed (2023): {quantum_patents_filed}")
print(f"Startups Funded: {quantum_startups_funded}")
print(f"Enterprise Pilots: {enterprise_pilots}")

# Validate our quantum investment thesis
our_quantum_focus = "Portfolio optimization algorithms"
demonstrable_advantage = "15-25% improvement in tested scenarios"
timeline_confidence = "Medium-high (3-5 years to full commercial deployment)"

print(f"\\nOur Investment Focus: {our_quantum_focus}")
print(f"Measured Advantage: {demonstrable_advantage}")
print(f"Timeline Assessment: {timeline_confidence}")`,

            notation: `\\text{Quantum Advantage Validation:}$<br><br>
$A_{quantum} = \\frac{T_{classical}}{T_{quantum}} \\times \\frac{Q_{quantum}}{Q_{classical}}$<br><br>
$\\text{Where: } T = \\text{execution time}, Q = \\text{solution quality}$<br><br>
$A_{portfolio} = \\frac{4.5 \\text{ hrs}}{0.3 \\text{ hrs}} \\times \\frac{92.5\\%}{84.7\\%} = 15 \\times 1.09 = 16.4$<br><br>
$\\text{Statistical significance: } p < 0.01 \\text{ across 100+ test scenarios}$`,

            circuit: {
                qubits: 2,
                operations: [
                    { type: 'H', qubit: 0, time: 0 },
                    { type: 'CNOT', control: 0, target: 1, time: 1 }
                ]
            }
        };
    }

    getCrisisAssessmentCriteria() {
        return {
            crisisManagement: {
                weight: 40,
                criteria: [
                    'Calm and confident response under pressure',
                    'Factual correction of misinformation',
                    'Protection of company interests',
                    'Stakeholder confidence preservation'
                ]
            },
            technicalAccuracy: {
                weight: 30,
                criteria: [
                    'Accurate representation of quantum progress',
                    'Balanced assessment of limitations and potential',
                    'Evidence-based argumentation',
                    'Avoidance of over-promising or hype'
                ]
            },
            businessCommunication: {
                weight: 20,
                criteria: [
                    'Clear linkage to business value and strategy',
                    'Reassurance about investment decisions',
                    'Demonstration of due diligence and analysis',
                    'Forward-looking confidence with realism'
                ]
            },
            mediaEffectiveness: {
                weight: 10,
                criteria: [
                    'Media-appropriate soundbites and messaging',
                    'Professional composure and authority',
                    'Memorable and quotable explanations',
                    'Effective damage control and narrative management'
                ]
            }
        };
    }

    getAcquisitionContent() {
        return {
            plainspeak: `QuantumEdge Analytics represents a strategic acquisition opportunity to accelerate our quantum portfolio optimization capabilities by 18-24 months. Their proprietary QAOA (Quantum Approximate Optimization Algorithm) implementation shows 23% improvement over classical methods in portfolio correlation analysis, with proven results across $2.3B in managed assets during their pilot programs. The $85M acquisition price reflects a 4.2x revenue multiple, which is reasonable for quantum IP with demonstrable commercial value. Key risks include quantum talent retention (73% of value is in their 12-person research team) and technology integration complexity. However, their quantum algorithms directly address our portfolio optimization challenges, and their team's expertise would immediately enhance our quantum initiative rather than requiring years of internal development.`,
            
            code: `# M&A Analysis: QuantumEdge Analytics Acquisition
import pandas as pd
import numpy as np

# Target company analysis
quantumedge_metrics = {
    'Revenue_2023': 20.1,  # $M
    'Revenue_Growth': 185,  # % YoY
    'Quantum_Algorithm_Performance': 23,  # % improvement over classical
    'Proven_AUM': 2300,  # $M assets under management in pilots
    'Team_Size': 12,  # quantum researchers
    'Patents': 8,  # quantum algorithm patents
    'Client_Pilots': 6  # active enterprise pilots
}

# Acquisition financial analysis
acquisition_price = 85  # $M
revenue_multiple = acquisition_price / quantumedge_metrics['Revenue_2023']
estimated_synergies = 12.5  # $M annually (cost savings + revenue enhancement)
integration_costs = 8.2  # $M one-time
payback_period = (acquisition_price - integration_costs) / estimated_synergies

# Strategic value assessment
time_to_market_acceleration = 20  # months saved vs internal development
competitive_advantage_duration = 36  # months before competitors catch up
talent_acquisition_value = 15.2  # $M (cost to hire equivalent team)

print("QuantumEdge Analytics Key Metrics:")
for metric, value in quantumedge_metrics.items():
    print(f"{metric}: {value}")

print(f"\\nAcquisition Analysis:")
print(f"Purchase Price: ${acquisition_price}M")
print(f"Revenue Multiple: {revenue_multiple:.1f}x")
print(f"Payback Period: {payback_period:.1f} years")
print(f"Time-to-Market Acceleration: {time_to_market_acceleration} months")

# Risk assessment
risks = {
    'Talent_Retention': 'High - 73% of value in 12-person team',
    'Technology_Integration': 'Medium - quantum algorithms require specialized infrastructure',
    'Market_Competition': 'Medium - 2 other bidders, price pressure',
    'Quantum_Progress': 'Low - proven algorithms with demonstrated results'
}

print("\\nKey Risks:")
for risk, assessment in risks.items():
    print(f"{risk}: {assessment}")`,

            notation: `\\text{Acquisition Valuation Model:}$<br><br>
$V_{acquisition} = V_{standalone} + V_{synergies} - C_{integration}$<br><br>
$V_{standalone} = \\frac{FCF_1}{(1+r)^1} + \\frac{FCF_2}{(1+r)^2} + ... + \\frac{TV}{(1+r)^n}$<br><br>
$V_{synergies} = \\frac{\\$12.5M}{0.12} = \\$104M \\text{ (perpetual value)}$<br><br>
$\\text{Total Value} = \\$65M + \\$104M - \\$8.2M = \\$161M$<br><br>
$\\text{Acquisition Premium} = \\frac{\\$85M - \\$65M}{\\$65M} = 31\\%$`,

            circuit: {
                qubits: 4,
                operations: [
                    { type: 'H', qubit: 0, time: 0 },
                    { type: 'H', qubit: 1, time: 0 },
                    { type: 'RY', angle: Math.PI/3, qubit: 2, time: 1 },
                    { type: 'CNOT', control: 0, target: 2, time: 2 },
                    { type: 'CNOT', control: 1, target: 3, time: 2 },
                    { type: 'RZ', angle: Math.PI/4, qubit: 2, time: 3 }
                ]
            }
        };
    }

    getAcquisitionAssessmentCriteria() {
        return {
            technicalDueDiligence: {
                weight: 35,
                criteria: [
                    'Accurate assessment of quantum algorithm performance',
                    'Understanding of technology risks and limitations',
                    'Evaluation of IP portfolio and defensibility',
                    'Technical team quality and retention risk'
                ]
            },
            financialAnalysis: {
                weight: 30,
                criteria: [
                    'Comprehensive valuation methodology',
                    'Realistic synergy identification and quantification',
                    'Proper risk adjustment and scenario analysis',
                    'Integration cost estimation and planning'
                ]
            },
            strategicFit: {
                weight: 25,
                criteria: [
                    'Alignment with quantum strategy and timeline',
                    'Competitive advantage assessment',
                    'Market positioning and differentiation',
                    'Long-term value creation potential'
                ]
            },
            executionRisk: {
                weight: 10,
                criteria: [
                    'Integration complexity and timeline',
                    'Cultural fit and talent retention strategies',
                    'Operational risk management',
                    'Contingency planning and risk mitigation'
                ]
            }
        };
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BusinessScenarios;
}

// Global access
window.BusinessScenarios = BusinessScenarios;