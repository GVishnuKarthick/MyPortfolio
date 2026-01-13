// Create floating particles
function createParticles() {
    const container = document.getElementById('particles');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        container.appendChild(particle);
    }
}

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuToggle && mobileNav) {
    mobileMenuToggle.addEventListener('click', function() {
        mobileNav.classList.toggle('active');
        this.textContent = mobileNav.classList.contains('active') ? '✕' : '☰';
    });

    // Close mobile menu when clicking on a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            mobileMenuToggle.textContent = '☰';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = mobileNav.contains(event.target);
        const isClickOnToggle = mobileMenuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            mobileMenuToggle.textContent = '☰';
        }
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
        
    type();
}

// Parallax effect for hero section (disabled on mobile)
window.addEventListener('scroll', () => {
    if (window.innerWidth > 768) {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    }
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        const button = this.querySelector('button');
        if (button) {
            const originalText = button.textContent;
            button.textContent = 'Sending...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'Message Sent!';
                button.style.background = 'linear-gradient(45deg, #00ff41, #00ff41)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = 'linear-gradient(45deg, #00ff41, #0099ff)';
                    this.reset();
                }, 2000);
            }, 1000);
        }
    });
}

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    
    // Add intersection observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            }
        });
    });
    
    document.querySelectorAll('.project-card, .skill-category, .profile-card').forEach(el => {
        observer.observe(el);
    });
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add matrix rain effect
function matrixRain() {
    const canvas = document.createElement('canvas');
    canvas.className = 'matrix-bg';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
    const matrixArray = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px courier';
        
        for (let i = 0; i < drops.length; i++) {
            const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// Initialize matrix rain
matrixRain();

// Function to open demo links
function openDemo(projectName) {
    const demoUrls = {
        'FlappyBird': 'https://drive.google.com/drive/folders/1SF2wIV2usjJL8msZJiA2hNH-XXIIyF0T',
        'CrazyNinjaFrog': 'https://drive.google.com/drive/folders/1SF2wIV2usjJL8msZJiA2hNH-XXIIyF0T',
        'FightMania': 'https://drive.google.com/drive/folders/1SF2wIV2usjJL8msZJiA2hNH-XXIIyF0T',
        'AIDungeonMaster': 'https://drive.google.com/drive/folders/your-ai-dungeon-demo-link'
    };
    
    const url = demoUrls[projectName];
    if (url && !url.includes('your-')) {
        window.open(url, '_blank');
    } else {
        alert(`Demo for ${projectName} will be available soon!\n\nPlease update the demo URL in the JavaScript code.`);
    }
}

// Function to open GitHub repositories
function openGitHub(projectName) {
    const githubUrls = {
        'FlappyBird': 'https://github.com/GVishnuKarthick/GAME-DEVELOPMENT/releases/tag/flappy',
        'CrazyNinjaFrog': 'https://github.com/GVishnuKarthick/GAME-DEVELOPMENT/releases/tag/game',
        'FightMania': 'https://github.com/GVishnuKarthick/GAME-DEVELOPMENT/releases/tag/fightmania',
        'AIExpenseTracker': 'https://github.com/yourusername/ai-dungeon-master'
    };
    
    const url = githubUrls[projectName];
    if (url && !url.includes('yourusername')) {
        window.open(url, '_blank');
    } else {
        alert(`GitHub repository for ${projectName} will be available soon!\n\nPlease update the GitHub URL in the JavaScript code.`);
    }
}

// Function to open coding profile platforms
function openProfile(platform) {
    const profileUrls = {
        'leetcode': 'https://leetcode.com/u/G_VISHNUKARTHICK/',
        'hackerrank': 'https://www.hackerrank.com/profile/vishnukarthick12',
        'codechef': 'https://www.codechef.com/users/vishnug2023ece'
    };
    
    const url = profileUrls[platform];
    if (url) {
        window.open(url, '_blank');
    }
}

// Function to copy Discord username to clipboard
function copyDiscordUsername(event) {
    event.preventDefault();
    const discordUsername = 'yourDiscord#1234';
    navigator.clipboard.writeText(discordUsername).then(() => {
        const button = event.target;
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = 'linear-gradient(45deg, #00ff41, #00ff41)';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        alert(`Discord: ${discordUsername}\n\nYou can copy this username manually.`);
    });
}

