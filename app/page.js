'use client';

import React, { useState, useEffect } from 'react';
import { Search, Github, Mail, Phone, ChevronLeft, ChevronRight, Menu, X, Home } from 'lucide-react';

// Data structure
const contentData = {
  categories: [
    {
      id: 'ibp-sop',
      title: 'Integrated Business Planning & S&OP',
      description: 'End-to-end orchestration of demand, supply, and financial planning',
      subcategories: [
        {
          id: 'sop-design',
          title: 'S&OP Process Design & Governance',
          teaser: 'Reduced decision latency by 45%',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
          tags: ['Governance', 'Process', 'Executive'],
          comingSoon: false,
          deliveryHighlights: [
            {
              headline: 'Enterprise S&OP Redesign',
              description: 'Redesigned the end-to-end S&OP operating model across demand, supply, and finance, introducing structured cadence, ownership, and decision rights across global business units.',
              impact: '45% reduction in decision latency',
              scope: 'Multi-region, multi-product portfolio'
            },
            {
              headline: 'Cross-Functional Alignment Engine',
              description: 'Built reconciliation workflows aligning demand plans, constrained supply, and financial targets, enabling synchronized executive decisions instead of siloed approvals.',
              impact: '$600M+ value unlocked',
              scope: 'Demand, Supply, Finance, Exec Leadership'
            },
            {
              headline: 'Scenario-Based Executive Reviews',
              description: 'Introduced scenario-driven S&OP reviews using upside/downside planning cases instead of static plans, improving decision quality during volatility.',
              impact: '21% reduction in planning volatility',
              scope: 'Demand spikes, shortages, disruptions'
            }
          ]
        },
        {
          id: 'siop',
          title: 'S&IOP (Sales, Inventory & Operations)',
          teaser: 'Synchronized planning across functions',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
          tags: ['Integration', 'Inventory', 'Sales'],
          comingSoon: false,
          deliveryHighlights: [
            {
              headline: 'Integrated Planning Framework',
              description: 'Built unified S&IOP framework connecting sales forecasts, inventory positions, and production schedules in real-time.',
              impact: '32% inventory reduction while maintaining 98% service levels',
              scope: '15 manufacturing sites, $2B inventory base'
            }
          ]
        },
        {
          id: 'consensus-demand',
          title: 'Consensus Demand Planning',
          teaser: 'Statistical + judgmental forecast integration',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
          tags: ['Demand', 'Forecasting', 'Collaboration'],
          comingSoon: false
        },
        {
          id: 'supply-demand-reconciliation',
          title: 'Supply–Demand Reconciliation',
          teaser: 'Balance constrained supply with demand signals',
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
          tags: ['Balancing', 'Constraints', 'Optimization'],
          comingSoon: true
        }
      ]
    },
    {
      id: 'demand-planning',
      title: 'Demand Planning & Forecast Intelligence (AI)',
      description: 'AI-powered forecasting with external signal integration',
      subcategories: [
        {
          id: 'ai-ml-forecasting',
          title: 'AI/ML Demand Forecasting',
          teaser: 'Improved forecast accuracy by 23%',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
          tags: ['AI', 'ML', 'Forecasting'],
          comingSoon: false,
          deliveryHighlights: [
            {
              headline: 'Neural Network Forecast Engine',
              description: 'Implemented deep learning models combining historical patterns, promotional impacts, and external signals for demand prediction.',
              impact: '23% improvement in forecast accuracy',
              scope: '50K+ SKUs across 12 markets'
            },
            {
              headline: 'Automated Model Selection',
              description: 'Built intelligent model selection framework that automatically chooses optimal forecasting algorithm per SKU based on demand patterns.',
              impact: '40% reduction in manual forecasting effort',
              scope: 'Statistical, ML, and hybrid models'
            }
          ]
        },
        {
          id: 'demand-sensing',
          title: 'Demand Sensing (Short-Term)',
          teaser: 'Real-time demand signal capture',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
          tags: ['Real-Time', 'Sensing', 'Short-Term'],
          comingSoon: false
        },
        {
          id: 'forecast-bias',
          title: 'Forecast Bias & Accuracy Optimization',
          teaser: 'Systematic bias detection and correction',
          image: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800',
          tags: ['Accuracy', 'Optimization', 'KPIs'],
          comingSoon: false
        }
      ]
    },
    {
      id: 'supply-response',
      title: 'Supply Response & Constraint Management',
      description: 'Constraint-based planning and capacity optimization',
      subcategories: [
        {
          id: 'constraint-planning',
          title: 'Constraint-Based Supply Planning',
          teaser: 'Bottleneck-aware allocation logic',
          image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800',
          tags: ['Constraints', 'Optimization', 'Capacity'],
          comingSoon: false,
          deliveryHighlights: [
            {
              headline: 'Multi-Constraint Allocation Engine',
              description: 'Designed allocation logic considering material, capacity, and logistics constraints simultaneously for optimal supply commitments.',
              impact: '34% reduction in supply shortages',
              scope: 'Global supply network, 8 constraint types'
            }
          ]
        },
        {
          id: 'atp-ctp',
          title: 'ATP/CTP & Allocation Logic',
          teaser: 'Available and Capable to Promise',
          image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800',
          tags: ['ATP', 'CTP', 'Allocation'],
          comingSoon: false
        }
      ]
    },
    {
      id: 'inventory-optimization',
      title: 'Inventory Optimization & Working Capital',
      description: 'Multi-echelon optimization and service level tradeoffs',
      subcategories: [
        {
          id: 'multi-echelon',
          title: 'Multi-Echelon Inventory Optimization',
          teaser: 'Network-wide inventory positioning',
          image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
          tags: ['Optimization', 'Network', 'Working Capital'],
          comingSoon: false,
          deliveryHighlights: [
            {
              headline: 'Network Inventory Optimization',
              description: 'Optimized inventory placement across distribution network using multi-echelon modeling, balancing service levels and working capital.',
              impact: '$125M inventory reduction, 99.2% service maintained',
              scope: '3-tier network, 40 DCs, 200K SKUs'
            }
          ]
        },
        {
          id: 'safety-stock',
          title: 'Safety Stock Optimization',
          teaser: 'Risk-adjusted buffer strategies',
          image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800',
          tags: ['Safety Stock', 'Risk', 'Service Level'],
          comingSoon: false
        }
      ]
    },
    {
      id: 'risk-resilience',
      title: 'Risk Intelligence & Resilience (AI)',
      description: 'Predictive risk modeling and disruption management',
      subcategories: [
        {
          id: 'geo-risk',
          title: 'Geo-Political & Macro Risk Modeling',
          teaser: 'Trade policy and geopolitical impact',
          image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
          tags: ['Risk', 'Geopolitics', 'Scenario'],
          comingSoon: false,
          deliveryHighlights: [
            {
              headline: 'Geopolitical Risk Dashboard',
              description: 'Built AI-powered early warning system tracking trade policies, tariffs, and regional conflicts impacting supply chains.',
              impact: '3-month disruption lead time vs 2-week industry average',
              scope: '25 countries, 400+ suppliers'
            }
          ]
        },
        {
          id: 'supplier-reliability',
          title: 'Supplier Reliability Scoring',
          teaser: 'Predictive supplier performance',
          image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
          tags: ['Suppliers', 'AI', 'Scoring'],
          comingSoon: false
        }
      ]
    },
    {
      id: 'digital-twins',
      title: 'Digital Twins & Scenario Simulation',
      description: 'Virtual supply chain modeling and what-if analysis',
      subcategories: [
        {
          id: 'end-to-end-twin',
          title: 'End-to-End Supply Chain Digital Twins',
          teaser: 'Virtual replica for scenario testing',
          image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800',
          tags: ['Digital Twin', 'Simulation', 'Modeling'],
          comingSoon: true
        },
        {
          id: 'what-if',
          title: 'What-If Scenario Modeling',
          teaser: 'Test decisions before execution',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
          tags: ['Scenarios', 'Analysis', 'Decision'],
          comingSoon: false
        }
      ]
    },
    {
      id: 'analytics',
      title: 'Analytics & Executive Decision Support',
      description: 'KPIs, dashboards, and decision cockpits',
      subcategories: [
        {
          id: 'executive-dashboards',
          title: 'Executive Dashboards & KPIs',
          teaser: 'Real-time decision support',
          image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
          tags: ['Dashboards', 'KPIs', 'Executive'],
          comingSoon: false
        },
        {
          id: 'variance-analytics',
          title: 'Variance & Root-Cause Analytics',
          teaser: 'Automated problem detection',
          image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
          tags: ['Analytics', 'Root Cause', 'AI'],
          comingSoon: false
        }
      ]
    },
    {
      id: 'network-design',
      title: 'Network Design & Cost-to-Serve',
      description: 'Supply network optimization and footprint analysis',
      subcategories: [
        {
          id: 'network-optimization',
          title: 'Supply Network Optimization',
          teaser: 'Optimal facility location and flows',
          image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800',
          tags: ['Network', 'Optimization', 'Design'],
          comingSoon: false
        }
      ]
    },
    {
      id: 'data-engineering',
      title: 'Data Engineering & Planning Automation',
      description: 'Pipelines, orchestration, and master data governance',
      subcategories: [
        {
          id: 'data-pipelines',
          title: 'Planning Data Pipelines',
          teaser: 'Automated data ingestion and transformation',
          image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800',
          tags: ['Data', 'Pipelines', 'Automation'],
          comingSoon: false
        }
      ]
    },
    {
      id: 'ai-intelligence',
      title: 'AI-Driven Supply Chain Intelligence',
      description: 'Autonomous planning and cognitive systems',
      subcategories: [
        {
          id: 'ai-assistants',
          title: 'AI-Augmented Planning Assistants',
          teaser: 'Natural language planning interface',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
          tags: ['AI', 'NLP', 'Automation'],
          comingSoon: true
        },
        {
          id: 'predictive-disruption',
          title: 'Predictive Disruption Intelligence',
          teaser: 'Early warning systems',
          image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=800',
          tags: ['AI', 'Prediction', 'Risk'],
          comingSoon: false
        }
      ]
    }
  ]
};

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (categoryId, direction) => {
    const container = document.getElementById(`row-${categoryId}`);
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const navigateToSubcategory = (category, subcategory) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setCurrentPage('subcategory');
    window.scrollTo(0, 0);
  };

  // Navbar Component with Larger Personal Branding
  const Navbar = () => (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <div 
              className="text-2xl font-bold cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              Supply<span className="text-red-600">Chain</span>Flix
            </div>
            
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => setCurrentPage('home')}
                className={`text-sm hover:text-white transition-colors relative pb-1 ${
                  currentPage === 'home' ? 'text-white' : 'text-gray-400'
                }`}
              >
                Home
                {currentPage === 'home' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
              <button
                onClick={() => setCurrentPage('about')}
                className={`text-sm hover:text-white transition-colors relative pb-1 ${
                  currentPage === 'about' ? 'text-white' : 'text-gray-400'
                }`}
              >
                About
                {currentPage === 'about' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
              <button
                onClick={() => setCurrentPage('contact')}
                className={`text-sm hover:text-white transition-colors relative pb-1 ${
                  currentPage === 'contact' ? 'text-white' : 'text-gray-400'
                }`}
              >
                Contact
                {currentPage === 'contact' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <Search className="w-5 h-5 text-gray-400 hidden lg:block" />
            <button
              onClick={() => setCurrentPage('about')}
              className="hidden md:flex items-center space-x-3 hover:opacity-90 transition-opacity cursor-pointer bg-gray-900/50 px-4 py-2 rounded-lg border border-gray-800 hover:border-red-600/30"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center font-bold text-lg">
                SP
              </div>
              <div className="text-left">
                <div className="font-bold text-white text-lg leading-tight">Shashwat Patel</div>
                <div className="text-xs text-gray-400">Supply Chain • AI • Optimization</div>
              </div>
            </button>
            
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            <button
              onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-white py-2"
            >
              Home
            </button>
            <button
              onClick={() => { setCurrentPage('about'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-white py-2"
            >
              About
            </button>
            <button
              onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}
              className="block w-full text-left text-white py-2"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </nav>
  );

  // Hero Section with Simple Floating Particles (No Lag)
  const Hero = () => (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax - using a high-quality cinematic supply chain image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80)',
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      />
      
      {/* Enhanced dark overlays for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/30 to-black/70" />
      
      {/* Bottom vignette for stronger text pop */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      
      {/* Simplified animated floating particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="particle-simple particle-1"></div>
        <div className="particle-simple particle-2"></div>
        <div className="particle-simple particle-3"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block px-4 py-1 bg-red-600/20 border border-red-600/50 rounded-full text-red-500 text-xs mb-6 font-semibold">
          AI-Enabled Enterprise Supply Chain Intelligence
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 tracking-tight">
          Supply<span className="text-red-600 relative inline-block">
            Chain
            {/* Animated underline on "Chain" */}
            <span className="absolute -bottom-2 left-0 h-1 bg-red-600 animate-expand-width"></span>
          </span>Flix
        </h1>
        
        <p className="text-2xl md:text-3xl text-gray-200 mb-6 font-light">
          Where Supply Chains Think, Simulate, and Decide
        </p>
        
        <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Enterprise planning capabilities spanning demand intelligence, supply optimization, 
          risk resilience, and AI-driven decision support — quantified across global operations.
        </p>
      </div>

      <style jsx>{`
        .particle-simple {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(229, 9, 20, 0.7);
          border-radius: 50%;
          box-shadow: 0 0 8px rgba(229, 9, 20, 0.6);
        }
        .particle-1 {
          top: 30%;
          left: 15%;
          animation: float-simple 6s ease-in-out infinite;
        }
        .particle-2 {
          top: 60%;
          left: 75%;
          animation: float-simple 8s ease-in-out infinite 1s;
        }
        .particle-3 {
          top: 45%;
          left: 50%;
          animation: float-simple 7s ease-in-out infinite 0.5s;
        }
        @keyframes float-simple {
          0%, 100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(20px, -30px);
          }
        }
        @keyframes expand-width {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-expand-width {
          width: 0%;
          animation: expand-width 1s ease-out 0.3s forwards;
        }
      `}</style>
    </div>
  );

  // Subcategory Card Component with Smooth Hover
  const SubcategoryCard = ({ subcategory, category }) => (
    <div
      className="relative flex-shrink-0 w-80 h-48 rounded-lg overflow-hidden cursor-pointer group transition-all duration-300 hover:scale-105 hover:z-10"
      onClick={() => !subcategory.comingSoon && navigateToSubcategory(category, subcategory)}
      style={{
        backgroundImage: `url(${subcategory.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent group-hover:from-black/90 group-hover:via-black/70 transition-all duration-300" />
      
      {subcategory.comingSoon && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm">
          <div className="absolute top-4 right-4 px-3 py-1 bg-gray-800 rounded-full text-xs">
            Coming Soon
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600/50 rounded-lg transition-colors duration-300" />
      
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-lg font-semibold mb-1">{subcategory.title}</h3>
        <p className="text-sm text-gray-400 mb-2 group-hover:text-gray-300 transition-colors duration-300">{subcategory.teaser}</p>
        
        <div className="flex flex-wrap gap-2 mb-2">
          {subcategory.tags.map((tag, i) => (
            <span key={i} className="px-2 py-0.5 bg-gray-800/80 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
        
        {!subcategory.comingSoon && (
          <div className="text-red-600 text-sm font-semibold flex items-center">
            Explore <span className="ml-1">→</span>
          </div>
        )}
      </div>
    </div>
  );

  // Category Row Component
  const CategoryRow = ({ category }) => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4 px-4 md:px-8">{category.title}</h2>
      
      <div className="relative group">
        <button
          onClick={() => scroll(category.id, 'left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        
        <div
          id={`row-${category.id}`}
          className="flex space-x-4 overflow-x-auto scrollbar-hide px-4 md:px-8 pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {category.subcategories.map((sub) => (
            <SubcategoryCard key={sub.id} subcategory={sub} category={category} />
          ))}
        </div>
        
        <button
          onClick={() => scroll(category.id, 'right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );

  // Homepage Component with Fast, Smooth Animations
  const HomePage = () => {
    return (
      <div className="min-h-screen bg-black text-white">
        <Hero />
        
        <div className="py-16 px-4 md:px-8 max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">What You'll Find Here</h2>
          <p className="text-lg text-gray-400 leading-relaxed mb-4">
            SupplyChainFlix is a capability catalog showcasing enterprise-scale supply chain intelligence 
            across planning, optimization, risk, and analytics. Each capability is backed by quantified 
            business outcomes and real-world implementation.
          </p>
          <p className="text-lg text-gray-400 leading-relaxed">
            Explore 10 capability categories spanning S&OP, demand forecasting, inventory optimization, 
            digital twins, and AI-driven decision support — all designed for executive-level decision making.
          </p>
        </div>

        <div className="py-12">
          {contentData.categories.map((category) => (
            <CategoryRow key={category.id} category={category} />
          ))}
        </div>

        <div className="py-20 px-4 md:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Impact Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { label: 'Forecast Accuracy', value: '+23%' },
                { label: 'Value Unlocked', value: '$600M+' },
                { label: 'Cost Reduction', value: '34%' },
                { label: 'Inventory Optimization', value: '$125M' },
                { label: 'Decision Speed', value: '45% Faster' }
              ].map((metric, i) => (
                <div 
                  key={i} 
                  className="bg-gray-900 p-6 rounded-lg text-center border border-gray-800 hover:border-red-600/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-600/10"
                >
                  <div className="text-3xl font-bold text-red-600 mb-2">{metric.value}</div>
                  <div className="text-sm text-gray-400">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Subcategory Detail Page with Persistent Back Button
  const SubcategoryPage = () => {
    if (!selectedSubcategory || !selectedCategory) return null;

    return (
      <div className="min-h-screen bg-black text-white pt-20">
        {/* Persistent Back/Home Button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="fixed top-20 left-4 z-40 bg-black/80 backdrop-blur-md border border-gray-800 hover:border-red-600/50 px-4 py-2 rounded-lg text-sm flex items-center space-x-2 transition-all hover:bg-gray-900"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div
          className="relative h-80 flex items-end"
          style={{
            backgroundImage: `url(${selectedSubcategory.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
          <div className="relative z-10 p-8 max-w-6xl mx-auto w-full">
            <div className="text-sm text-gray-400 mb-2">
              {selectedCategory.title}
            </div>
            <h1 className="text-5xl font-bold mb-4">{selectedSubcategory.title}</h1>
            <p className="text-xl text-gray-300">{selectedSubcategory.teaser}</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-8 py-16">
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6">What It Solves</h2>
            <p className="text-lg text-gray-400 leading-relaxed">
              {selectedCategory.description}
            </p>
          </section>

          {selectedSubcategory.deliveryHighlights && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <span className="mr-3">🔥</span>
                Delivery Highlights
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {selectedSubcategory.deliveryHighlights.map((highlight, i) => (
                  <div
                    key={i}
                    className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-red-600/50 transition-colors"
                  >
                    <h3 className="text-xl font-bold mb-3">{highlight.headline}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">
                      {highlight.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <span className="text-red-600 font-semibold mr-2">Impact:</span>
                        <span className="text-gray-300">{highlight.impact}</span>
                      </div>
                      <div className="flex items-start">
                        <span className="text-red-600 font-semibold mr-2">Scope:</span>
                        <span className="text-gray-300">{highlight.scope}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section>
            <h2 className="text-3xl font-bold mb-6">Related Capabilities</h2>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {selectedCategory.subcategories
                .filter(sub => sub.id !== selectedSubcategory.id)
                .slice(0, 4)
                .map((sub) => (
                  <SubcategoryCard
                    key={sub.id}
                    subcategory={sub}
                    category={selectedCategory}
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    );
  };

  // About Page
  const AboutPage = () => (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="text-5xl font-bold mb-4">Shashwat Patel</h1>
        <p className="text-xl text-gray-400 mb-12">Supply Chain • AI • Optimization</p>

        <div className="space-y-6 text-lg text-gray-300 leading-relaxed mb-12">
          <p>
            Enterprise supply chain planning leader with deep expertise in AI-driven optimization, 
            integrated business planning, and executive decision enablement across global operations.
          </p>
          <p>
            Specialized in building constraint-based planning systems, multi-echelon inventory optimization, 
            and risk intelligence frameworks that deliver quantified business value at scale.
          </p>
          <p>
            Proven track record across semiconductor, EV, and high-tech industries, designing S&OP processes, 
            demand forecasting engines, and digital twin simulations for Fortune 500 enterprises.
          </p>
          <p>
            Focus on cross-functional leadership, translating complex supply chain challenges into 
            executive-ready insights and autonomous planning capabilities.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Core Capabilities</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              'Integrated business planning & S&OP',
              'AI/ML demand forecasting',
              'Supply chain risk & resilience',
              'Digital twins & scenario modeling',
              'Network optimization & cost-to-serve',
              'Multi-echelon inventory optimization'
            ].map((capability, i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-600 rounded-full" />
                <span className="text-gray-300">{capability}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className="min-h-screen bg-black text-white pt-16 pb-16 flex items-center justify-center px-4">
      <div className="text-center space-y-8 max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-12">Get In Touch</h1>
        
        <div className="space-y-8">
          <div>
            <div className="text-gray-400 text-sm mb-2">Email</div>
            <a
              href="mailto:shashpatelofficial@gmail.com"
              className="text-xl md:text-2xl hover:text-red-600 transition-colors block"
            >
              shashpatelofficial@gmail.com
            </a>
          </div>

          <div>
            <div className="text-gray-400 text-sm mb-2">Phone</div>
            <a
              href="tel:+17162925922"
              className="text-xl md:text-2xl hover:text-red-600 transition-colors block"
            >
              +1-716-292-5922
            </a>
          </div>

          <div>
            <div className="text-gray-400 text-sm mb-2">GitHub</div>
            <a
              href="https://github.com/shashp007"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl hover:text-red-600 transition-colors inline-flex items-center justify-center"
            >
              <Github className="w-6 h-6 mr-2" />
              github.com/shashp007
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'contact' && <ContactPage />}
      {currentPage === 'subcategory' && <SubcategoryPage />}
    </div>
  );
};

export default App;