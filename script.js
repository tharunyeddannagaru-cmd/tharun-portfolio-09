/* =========================
   TYPING ANIMATION
========================= */
const texts = [
    "CSE-AI Student",
    "Full Stack Developer",
    "AI Enthusiast",
    "AWS Learner"
];

let count = 0;
let index = 0;

function typeText() {
    if (count === texts.length) count = 0;

    let currentText = texts[count];
    let letter = currentText.slice(0, ++index);

    const typingEl = document.getElementById("typing");
    if (typingEl) typingEl.textContent = letter;

    if (letter.length === currentText.length) {
        count++;
        index = 0;
        setTimeout(typeText, 1000);
    } else {
        setTimeout(typeText, 120);
    }
}

/* =========================
   PARTICLES
========================= */
function loadParticles() {
    if (typeof tsParticles !== "undefined") {
        tsParticles.load("particles-js", {
            particles: {
                number: { value: 80 },
                color: { value: "#00ffff" },
                links: {
                    enable: true,
                    color: "#00ffff",
                    distance: 150
                },
                move: {
                    enable: true,
                    speed: 1
                },
                opacity: { value: 0.3 },
                size: { value: 2 }
            }
        });
    }
}

/* =========================
   CERTIFICATE POPUP
========================= */
function openCertificate(src) {
    const modal = document.getElementById("certificateModal");
    const popupImage = document.getElementById("popupImage");

    if (modal && popupImage) {
        modal.style.display = "flex";
        popupImage.src = src;
    }
}

/* =========================
   SKILLS ANIMATION
========================= */
let skillsStarted = false;

function animateBar(barClass, textClass, target) {
    const bar = document.querySelector(barClass);
    const text = document.querySelector(textClass);

    let current = 0;

    const interval = setInterval(() => {
        if (current >= target) {
            clearInterval(interval);
        } else {
            current++;
            if (bar) {
                bar.style.width = current + "%";
                bar.style.boxShadow = `0 0 ${current / 3}px cyan`;
            }
            if (text) text.innerText = current + "%";
        }
    }, 15);
}

function animateCircle(circleClass, target) {
    const circle = document.querySelector(circleClass);
    if (!circle) return;

    circle.style.transform = "rotate(-180deg) scale(0.5)";
    circle.style.opacity = "0";

    setTimeout(() => {
        circle.style.transition = "all 0.8s ease";
        circle.style.transform = "rotate(0deg) scale(1)";
        circle.style.opacity = "1";
    }, 200);

    let current = 0;

    const interval = setInterval(() => {
        if (current >= target) {
            clearInterval(interval);
        } else {
            current++;
            circle.innerHTML = current + "%";
            circle.style.background =
                `radial-gradient(circle, #02111d 55%, transparent 56%),
                 conic-gradient(cyan ${current}%, rgba(255,255,255,0.1) 0)`;

            circle.style.boxShadow = `0 0 ${current / 3}px cyan`;
        }
    }, 15);
}

function animateSkills() {
    if (skillsStarted) return;
    skillsStarted = true;

    animateBar(".python", ".python-text", 90);
    animateBar(".java", ".java-text", 85);
    animateBar(".ai", ".ai-text", 82);
    animateBar(".aws", ".aws-text", 70);

    animateCircle(".communication", 88);
    animateCircle(".leadership", 84);
    animateCircle(".teamwork", 92);
    animateCircle(".problem", 90);
}

/* =========================
   MAIN LOAD
========================= */
window.addEventListener("DOMContentLoaded", function () {

    // Typing
    typeText();

    // Particles
    loadParticles();

    // AOS
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1200,
            once: true
        });
    }

    // Modal Close
    const closeBtn = document.querySelector(".close");
    const modal = document.getElementById("certificateModal");

    if (closeBtn && modal) {
        closeBtn.onclick = function () {
            modal.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }

    // Chatbot toggle
    const bot = document.getElementById("chatbot");
    const box = document.getElementById("chat-box");

    if (bot && box) {
        bot.onclick = function () {
            box.style.display =
                box.style.display === "block" ? "none" : "block";
        };
    }

    // Theme Toggle
    const themeBtn = document.getElementById("theme-toggle");

    if (themeBtn) {
        themeBtn.onclick = function () {
            document.body.classList.toggle("light-mode");

            if (document.body.classList.contains("light-mode")) {
                themeBtn.innerHTML = "☀";
            } else {
                themeBtn.innerHTML = "🌙";
            }
        };
    }

    // Loader
    const loader = document.getElementById("loader");
    if (loader) {
        setTimeout(() => {
            loader.style.display = "none";
        }, 3000);
    }

    // Skills Scroll Animation
    const skillsSection = document.getElementById("skills");

    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkills();
                    observer.unobserve(skillsSection);
                }
            });
        }, {
            threshold: 0.35
        });

        observer.observe(skillsSection);
    }
});

/* =========================
   CHATBOT REPLIES
========================= */
function chatReply(type) {
    const response = document.getElementById("chat-response");
    if (!response) return;

    if (type === "about") {
        response.innerHTML =
            "I am Tharun, a 3rd-year CSE-AI student passionate about AI, Full Stack Development and Cloud Computing.";
    }

    if (type === "skills") {
        response.innerHTML =
            "My skills include Python, Java, AI/ML, AWS, HTML, CSS and JavaScript.";
    }

    if (type === "projects") {
        response.innerHTML =
            "My major projects are AI Resume Screener, AI Agent and this Premium Portfolio Website.";
    }

    if (type === "contact") {
        response.innerHTML =
            "📧 Email: tharunyeddannagaru@gmail.com <br>📞 Phone: +91 7569329359";
    }
}