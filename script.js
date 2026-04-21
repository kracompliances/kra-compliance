// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const themeText = document.getElementById('themeText');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    setTheme(next);
    localStorage.setItem('theme', next);
});

function setTheme(theme) {
    if (theme === 'dark') {
        html.setAttribute('data-theme', 'dark');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'Light';
    } else {
        html.removeAttribute('data-theme');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'Dark';
    }
}

// Animate on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .package, .fear-box, .about-wrap, .contact-box').forEach(el => observer.observe(el));

// FAQ Accordion
document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;
        const wasActive = item.classList.contains('active');
        
        // Close all other FAQs
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        
        // Toggle current one
        if (!wasActive) {
            item.classList.add('active');
        }
    });
});

// WhatsApp package selector
function selectPackage(packageName) {
    const msg = encodeURIComponent(`Hello, I am interested in the ${packageName}. Please share more details about getting started.`);
    window.open(`https://wa.me/254768696410?text=${msg}`, '_blank');
}

// Lead Magnet Popup - exit intent + 45s timer
const popup = document.getElementById('leadPopup');
const closePopup = document.getElementById('closePopup');
const submitLead = document.getElementById('submitLead');

let popupShown = sessionStorage.getItem('popupShown');

if (!popupShown) {
    // Show after 45 seconds
    setTimeout(() => {
        if (!popupShown) showPopup();
    }, 45000);
    
    // Exit intent for desktop
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0 && !popupShown) showPopup();
    });
}

function showPopup() {
    if (popup) {
        popup.style.display = 'flex';
        popupShown = true;
        sessionStorage.setItem('popupShown', 'true');
    }
}

if (closePopup) {
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });
}

if (submitLead) {
    submitLead.addEventListener('click', () => {
        const email = document.getElementById('emailInput').value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (email && emailRegex.test(email)) {
            const msg = encodeURIComponent(`Hello, please send me the KRA Compliance Checklist. My email: ${email}`);
            window.open(`https://wa.me/254768696410?text=${msg}`, '_blank');
            popup.style.display = 'none';
        } else {
            alert('Please enter a valid email address');
        }
    });
}

// Close popup on outside click
if (popup) {
    popup.addEventListener('click', (e) => {
        if (e.target === popup) popup.style.display = 'none';
    });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Ensure packages animate in after load
window.addEventListener('load', () => {
    document.querySelectorAll('.package').forEach((el, i) => {
        setTimeout(() => {
            el.style.opacity = '1';
        }, 200 + (i * 150));
    });
});