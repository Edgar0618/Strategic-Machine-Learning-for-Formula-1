// Tab functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            
            // Add smooth scroll to top of content
            document.querySelector('.main-content').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.stat-card, .model-card, .insight-card, .race-card, .weather-card');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(255, 107, 53, 0.2)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Animate feature importance bars on scroll
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bars = entry.target.querySelectorAll('.bar-fill');
                bars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 200);
                });
            }
        });
    }, observerOptions);

    // Observe all importance bars
    const importanceBars = document.querySelectorAll('.importance-list');
    importanceBars.forEach(bar => observer.observe(bar));

    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-section h2');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 1000);
    }

    // Add counter animation to stats
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    };

    // Observe stats section for counter animation
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumbers = entry.target.querySelectorAll('.stat-number');
                statNumbers.forEach((stat, index) => {
                    const targetValues = [3, 4, 100, 95];
                    setTimeout(() => {
                        animateCounter(stat, targetValues[index]);
                    }, index * 200);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-grid');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // Add parallax effect to header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add tooltip functionality
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Add keyboard navigation for tabs
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const activeTab = document.querySelector('.tab-btn.active');
            const tabs = Array.from(tabButtons);
            const currentIndex = tabs.indexOf(activeTab);
            
            let nextIndex;
            if (e.key === 'ArrowLeft') {
                nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
            } else {
                nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
            }
            
            tabs[nextIndex].click();
        }
    });

    // Add search functionality (if needed in future)
    const searchInput = document.querySelector('#search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const contentElements = document.querySelectorAll('.tab-content');
            
            contentElements.forEach(content => {
                const text = content.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    content.style.display = 'block';
                } else {
                    content.style.display = 'none';
                }
            });
        });
    }

    // Add print styles
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });

    // Add error handling for missing elements
    const handleMissingElements = () => {
        const requiredElements = ['.tab-btn', '.tab-content', '.stats-grid'];
        requiredElements.forEach(selector => {
            if (!document.querySelector(selector)) {
                console.warn(`Required element not found: ${selector}`);
            }
        });
    };

    handleMissingElements();

    // Add performance monitoring
    const performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'measure') {
                console.log(`${entry.name}: ${entry.duration}ms`);
            }
        }
    });
    
    performanceObserver.observe({ entryTypes: ['measure'] });
    
    // Mark performance milestones
    performance.mark('page-loaded');
    performance.measure('page-load-time', 'navigationStart', 'page-loaded');

    // -------- Linear Regression Charts (Dutch & Hungary) ---------
    const csvPath = 'Dutch vs Hungarian.csv';
    const lrDutchCanvas = document.getElementById('lrDutchChart');
    const lrHungaryCanvas = document.getElementById('lrHungaryChart');

    const safeToNumber = (v) => {
        if (v === null || v === undefined) return null;
        const s = String(v).trim();
        if (!s || s.toLowerCase() === 'dnf') return null;
        const n = Number(s);
        return Number.isFinite(n) ? n : null;
    };

    function computeLinearFit(points) {
        const xs = points.map(p => p.x);
        const ys = points.map(p => p.y);
        const n = xs.length;
        if (n === 0) return { m: 0, b: 0 };
        const sumX = xs.reduce((a, b) => a + b, 0);
        const sumY = ys.reduce((a, b) => a + b, 0);
        const sumXY = xs.reduce((a, x, i) => a + x * ys[i], 0);
        const sumXX = xs.reduce((a, x) => a + x * x, 0);
        const denom = (n * sumXX - sumX * sumX) || 1;
        const m = (n * sumXY - sumX * sumY) / denom;
        const b = (sumY - m * sumX) / n;
        return { m, b };
    }

    function buildTrendline(points, fit) {
        if (points.length === 0) return [];
        const xs = points.map(p => p.x);
        const minX = Math.min(...xs);
        const maxX = Math.max(...xs);
        return [
            { x: minX, y: fit.m * minX + fit.b },
            { x: maxX, y: fit.m * maxX + fit.b }
        ];
    }

    function createScatterChart(ctx, title, scatterData, trendData) {
        if (!ctx) return;
        new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [
                    {
                        label: 'Actual Position Change',
                        data: scatterData,
                        backgroundColor: 'rgba(255, 107, 53, 0.8)',
                        borderColor: 'rgba(255, 107, 53, 1)',
                        pointRadius: 4,
                    },
                    {
                        label: 'Linear Fit',
                        data: trendData,
                        type: 'line',
                        borderColor: 'rgba(255, 193, 169, 0.9)',
                        borderWidth: 2,
                        fill: false,
                        pointRadius: 0,
                        tension: 0,
                    }
                ]
            },
            options: {
                plugins: {
                    legend: {
                        labels: { color: '#e7e7ea' }
                    },
                    title: {
                        display: true,
                        text: title,
                        color: '#ff8e63',
                        font: { family: 'Orbitron', weight: '700' }
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `Q: ${ctx.raw.x}, Δ: ${ctx.raw.y}`
                        }
                    }
                },
                scales: {
                    x: {
                        title: { display: true, text: 'Final Qualifying Position', color: '#b0b0b0' },
                        ticks: { color: '#b0b0b0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    },
                    y: {
                        title: { display: true, text: 'Position Change (Race - Qualifying)', color: '#b0b0b0' },
                        ticks: { color: '#b0b0b0' },
                        grid: { color: 'rgba(255,255,255,0.05)' }
                    }
                }
            }
        });
    }

    async function loadCsvAndRender() {
        try {
            const resp = await fetch(csvPath);
            const text = await resp.text();
            const rows = text.split(/\r?\n/).map(r => r.split(','));
            // Header indices based on file
            const headers = rows[0];
            const idxDutchQ = headers.indexOf('Dutch Final Qualifying Position');
            const idxDutchDelta = headers.indexOf('Dutch Position Change');
            const idxHUNQ = headers.indexOf('Hungarian Final Qualifying Position');
            const idxHUNDelta = headers.indexOf('Hungarian Position Change');

            const dutchPoints = [];
            const hunPoints = [];
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                if (!row || row.length < headers.length) continue;
                const dq = safeToNumber(row[idxDutchQ]);
                const dd = safeToNumber(row[idxDutchDelta]);
                const hq = safeToNumber(row[idxHUNQ]);
                const hd = safeToNumber(row[idxHUNDelta]);
                if (dq !== null && dd !== null) dutchPoints.push({ x: dq, y: dd });
                if (hq !== null && hd !== null) hunPoints.push({ x: hq, y: hd });
            }

            const dutchFit = computeLinearFit(dutchPoints);
            const dutchTrend = buildTrendline(dutchPoints, dutchFit);
            const hunFit = computeLinearFit(hunPoints);
            const hunTrend = buildTrendline(hunPoints, hunFit);

            createScatterChart(lrDutchCanvas, 'Dutch GP: Qualifying vs Position Change', dutchPoints, dutchTrend);
            createScatterChart(lrHungaryCanvas, 'Hungarian GP: Qualifying vs Position Change', hunPoints, hunTrend);
        } catch (e) {
            console.warn('Failed to render LR charts. If opening from file://, run a local server.', e);
        }
    }

    if (lrDutchCanvas && lrHungaryCanvas) {
        loadCsvAndRender();
    }
});

// Add CSS for tooltip
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    .tooltip {
        position: absolute;
        background: rgba(26, 26, 46, 0.95);
        color: #ff6b35;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 1000;
        border: 1px solid rgba(255, 107, 53, 0.3);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        pointer-events: none;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: rgba(26, 26, 46, 0.95) transparent transparent transparent;
    }
    
    .loaded {
        animation: fadeIn 0.5s ease-in;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    .printing .tab-content {
        display: block !important;
    }
    
    .printing .nav-tabs {
        display: none;
    }
`;
document.head.appendChild(tooltipStyle);
