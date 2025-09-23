// Application State
const state = {
    currentUser: null,
    currentPage: 'home',
    currentTheme: 'light',
    quizData: [
        {
            question: "Which field are you most interested in?",
            options: ["Technology", "Business", "Design", "Science", "Arts", "Healthcare"]
        },
        {
            question: "What's your current skill level?",
            options: ["Beginner", "Intermediate", "Advanced", "Expert"]
        },
        {
            question: "How much time can you dedicate to learning per week?",
            options: ["1-5 hours", "5-10 hours", "10-20 hours", "20+ hours"]
        },
        {
            question: "What is your primary learning goal?",
            options: ["Career advancement", "Personal interest", "Skill development", "Academic credit"]
        },
        {
            question: "Which learning format do you prefer?",
            options: ["Self-paced online", "Structured with deadlines", "In-person classes", "Mixed format"]
        }
    ],
    courseDatabase: [
        {
            id: 1,
            title: "Web Development Fundamentals",
            description: "Learn HTML, CSS, and JavaScript to build responsive websites from scratch.",
            duration: "8 weeks",
            level: "Beginner",
            field: "Technology",
            tags: ["programming", "frontend", "web"]
        },
        {
            id: 2,
            title: "Data Science Essentials",
            description: "Master data analysis, visualization, and basic machine learning concepts.",
            duration: "10 weeks",
            level: "Intermediate",
            field: "Technology",
            tags: ["data", "analysis", "python", "statistics"]
        },
        {
            id: 3,
            title: "UI/UX Design Principles",
            description: "Create intuitive and beautiful user interfaces with proven design methodologies.",
            duration: "6 weeks",
            level: "Beginner",
            field: "Design",
            tags: ["design", "interface", "user experience"]
        },
        {
            id: 4,
            title: "Digital Marketing Strategy",
            description: "Learn to create effective digital marketing campaigns across multiple platforms.",
            duration: "8 weeks",
            level: "Intermediate",
            field: "Business",
            tags: ["marketing", "business", "social media"]
        },
        {
            id: 5,
            title: "Introduction to Psychology",
            description: "Explore the fundamental concepts and theories of human behavior and mental processes.",
            duration: "12 weeks",
            level: "Beginner",
            field: "Science",
            tags: ["psychology", "science", "behavior"]
        },
        {
            id: 6,
            title: "Financial Accounting",
            description: "Understand the principles of financial accounting and financial statement analysis.",
            duration: "10 weeks",
            level: "Intermediate",
            field: "Business",
            tags: ["finance", "accounting", "business"]
        },
        {
            id: 7,
            title: "Graphic Design Fundamentals",
            description: "Learn the principles of visual design, typography, and color theory.",
            duration: "6 weeks",
            level: "Beginner",
            field: "Design",
            tags: ["design", "graphic", "visual arts"]
        },
        {
            id: 8,
            title: "Machine Learning Basics",
            description: "Introduction to machine learning algorithms and their practical applications.",
            duration: "12 weeks",
            level: "Advanced",
            field: "Technology",
            tags: ["programming", "AI", "data science"]
        }
    ],
    userAnswers: []
};

// DOM Elements
const elements = {
    authButtons: document.getElementById('authButtons'),
    userProfile: document.getElementById('userProfile'),
    userAvatar: document.getElementById('userAvatar'),
    username: document.getElementById('username'),
    logoutBtn: document.getElementById('logoutBtn'),
    loginBtn: document.getElementById('loginBtn'),
    signupBtn: document.getElementById('signupBtn'),
    startQuizBtn: document.getElementById('startQuizBtn'),
    progressBar: document.getElementById('progressBar'),
    quizContent: document.getElementById('quizContent'),
    loginPage: document.getElementById('loginPage'),
    signupPage: document.getElementById('signupPage'),
    goToLogin: document.getElementById('goToLogin'),
    goToSignup: document.getElementById('goToSignup'),
    loginSubmit: document.getElementById('loginSubmit'),
    signupSubmit: document.getElementById('signupSubmit'),
    recommendedCoursesList: document.getElementById('recommendedCoursesList'),
    themeToggle: document.getElementById('themeToggle')
};

// Theme functions
function toggleTheme() {
    if (state.currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'dark');
        state.currentTheme = 'dark';
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.removeAttribute('data-theme');
        state.currentTheme = 'light';
        elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        state.currentTheme = 'dark';
        elements.themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.removeAttribute('data-theme');
        state.currentTheme = 'light';
        elements.themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Navigation functions
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.active-page, .auth-page').forEach(page => {
        page.style.display = 'none';
    });
    
    // Show the requested page
    document.getElementById(pageId).style.display = 'block';
    
    // Special handling for section pages
    if (pageId === 'home' || pageId === 'how-it-works' || pageId === 'quiz' || 
        pageId === 'recommended-courses') {
        document.getElementById(pageId).classList.add('section');
    }
    
    state.currentPage = pageId;
}

function navigateTo(sectionId) {
    if (sectionId === 'quiz') {
        startQuiz();
    }
    showPage(sectionId);
    window.scrollTo(0, 0);
}

// Authentication functions
function loginUser(email, password) {
    // Simple validation
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }
    
    // In a real app, this would communicate with a backend
    state.currentUser = {
        name: email.split('@')[0],
        email: email
    };
    
    // Update UI
    elements.userAvatar.textContent = state.currentUser.name.charAt(0).toUpperCase();
    elements.username.textContent = state.currentUser.name;
    document.getElementById('authButtons').style.display = 'none';
    elements.userProfile.style.display = 'flex';
    
    // Return to home page
    showPage('home');
}

function signupUser(name, email, password) {
    // Simple validation
    if (!name || !email || !password) {
        alert('Please fill all fields');
        return;
    }
    
    // In a real app, this would communicate with a backend
    state.currentUser = {
        name: name,
        email: email
    };
    
    // Update UI
    elements.userAvatar.textContent = state.currentUser.name.charAt(0).toUpperCase();
    elements.username.textContent = state.currentUser.name;
    document.getElementById('authButtons').style.display = 'none';
    elements.userProfile.style.display = 'flex';
    
    // Return to home page
    showPage('home');
}

function logoutUser() {
    state.currentUser = null;
    state.userAnswers = [];
    document.getElementById('authButtons').style.display = 'flex';
    elements.userProfile.style.display = 'none';
    showPage('home');
}

// Quiz functions
function startQuiz() {
    state.userAnswers = [];
    showQuizQuestion(0);
}

function showQuizQuestion(index) {
    if (index >= state.quizData.length) {
        showRecommendations();
        return;
    }
    
    const question = state.quizData[index];
    const progress = ((index) / state.quizData.length) * 100;
    elements.progressBar.style.width = `${progress}%`;
    
    let optionsHTML = '';
    question.options.forEach((option, i) => {
        optionsHTML += `
            <div class="option" data-index="${i}">
                ${option}
            </div>
        `;
    });
    
    elements.quizContent.innerHTML = `
        <div class="question">
            <h3>${question.question}</h3>
            <div class="options">
                ${optionsHTML}
            </div>
        </div>
        <div class="quiz-navigation">
            ${index > 0 ? '<button class="btn btn-outline" id="prevQuestion">Previous</button>' : '<div></div>'}
            <button class="btn btn-primary" id="nextQuestion" disabled>Next</button>
        </div>
    `;
    
    // Add event listeners to options
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            document.querySelectorAll('.option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Enable next button
            document.getElementById('nextQuestion').disabled = false;
            
            // Store the selected answer
            const selectedIndex = parseInt(this.getAttribute('data-index'));
            state.userAnswers[index] = question.options[selectedIndex];
        });
    });
    
    // Add event listeners to navigation buttons
    if (index > 0) {
        document.getElementById('prevQuestion').addEventListener('click', function() {
            showQuizQuestion(index - 1);
        });
    }
    
    document.getElementById('nextQuestion').addEventListener('click', function() {
        showQuizQuestion(index + 1);
    });
}

function showRecommendations() {
    // Calculate recommendations based on user answers
    const recommendations = calculateRecommendations();
    
    // Show recommendations section
    showPage('recommended-courses');
    
    // Display recommended courses
    let coursesHTML = '';
    recommendations.forEach(course => {
        coursesHTML += `
            <div class="course-card">
                <div class="course-img">
                    <i class="fas fa-graduation-cap"></i>
                </div>
                <div class="course-content">
                    <h3 class="course-title">${course.title}</h3>
                    <p class="course-description">${course.description}</p>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${course.duration}</span>
                        <span><i class="fas fa-user-graduate"></i> ${course.level}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    elements.recommendedCoursesList.innerHTML = coursesHTML;
}

function calculateRecommendations() {
    // Simple recommendation algorithm based on user answers
    // In a real application, this would be much more sophisticated
    
    const fieldInterest = state.userAnswers[0]; // Technology, Business, Design, etc.
    const skillLevel = state.userAnswers[1]; // Beginner, Intermediate, etc.
    
    // Filter courses by field and skill level
    let filteredCourses = state.courseDatabase.filter(course => {
        return course.field === fieldInterest && course.level === skillLevel;
    });
    
    // If not enough courses match exactly, broaden the criteria
    if (filteredCourses.length < 3) {
        filteredCourses = state.courseDatabase.filter(course => {
            return course.field === fieldInterest;
        });
    }
    
    // If still not enough, just take random courses
    if (filteredCourses.length < 3) {
        filteredCourses = [...state.courseDatabase].sort(() => 0.5 - Math.random()).slice(0, 4);
    }
    
    return filteredCourses.slice(0, 4); // Return up to 4 recommendations
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Load saved theme
    loadTheme();
    
    // Theme toggle
    elements.themeToggle.addEventListener('click', toggleTheme);
    
    // Navigation
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            navigateTo(targetId);
        });
    });
    
    // Authentication
    elements.loginBtn.addEventListener('click', function() {
        showPage('loginPage');
    });
    
    elements.signupBtn.addEventListener('click', function() {
        showPage('signupPage');
    });
    
    elements.logoutBtn.addEventListener('click', logoutUser);
    
    elements.startQuizBtn.addEventListener('click', function() {
        if (!state.currentUser) {
            showPage('loginPage');
            alert('Please login first to take the quiz');
            return;
        }
        startQuiz();
        showPage('quiz');
    });
    
    elements.goToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        showPage('loginPage');
    });
    
    elements.goToSignup.addEventListener('click', function(e) {
        e.preventDefault();
        showPage('signupPage');
    });
    
    elements.loginSubmit.addEventListener('click', function() {
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        loginUser(email, password);
    });
    
    elements.signupSubmit.addEventListener('click', function() {
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;
        signupUser(name, email, password);
    });
});