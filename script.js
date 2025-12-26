// ----------------------
//   APPLICATION STATE
// ----------------------
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
            question: "How much time can you dedicate per week?",
            options: ["1–5 hours", "5–10 hours", "10–20 hours", "20+ hours"]
        },
        {
            question: "What is your primary learning goal?",
            options: ["Career advancement", "Personal interest", "Skill development", "Academic credit"]
        },
        {
            question: "Which learning format do you prefer?",
            options: ["Self-paced online", "Structured", "In-person", "Mixed"]
        }
    ],

    courseDatabase: [
        {
            id: 1,
            title: "Web Development Fundamentals",
            description: "Learn HTML, CSS, and JavaScript to build responsive websites.",
            duration: "8 weeks",
            level: "Beginner",
            field: "Technology",
            jobs: ["Frontend Developer", "Web Designer"],
            cheatsheet: "https://web.dev/learn/css/",
            youtube: ["https://www.youtube.com/watch?v=UB1O30fR-EE"],
            roadmap: "https://roadmap.sh/frontend",
            image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress"
        },
        {
            id: 2,
            title: "Data Science Essentials",
            description: "Master data analysis, visualization, and ML basics.",
            duration: "10 weeks",
            level: "Intermediate",
            field: "Technology",
            jobs: ["Data Analyst", "ML Engineer"],
            cheatsheet: "https://pandas.pydata.org/Pandas_Cheat_Sheet.pdf",
            youtube: ["https://www.youtube.com/watch?v=ua-CiDNNj30"],
            roadmap: "https://roadmap.sh/data-science",
            image: "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress"
        },
        {
            id: 3,
            title: "UI/UX Design Principles",
            description: "Design intuitive interfaces with proper UX workflows.",
            duration: "6 weeks",
            level: "Beginner",
            field: "Design",
            jobs: ["UI Designer", "Product Designer"],
            cheatsheet: "https://www.smashingmagazine.com/2018/01/ux-cheat-sheet/",
            youtube: ["https://www.youtube.com/watch?v=Ovj4hFxko7c"],
            roadmap: "https://roadmap.sh/ui-ux",
            image: "https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress"
        },
        {
            id: 4,
            title: "Machine Learning Basics",
            description: "Supervised and unsupervised ML fundamentals.",
            duration: "12 weeks",
            level: "Advanced",
            field: "Technology",
            jobs: ["AI Engineer", "ML Engineer"],
            cheatsheet: "https://stanford.edu/~shervine/teaching/cs-229/",
            youtube: ["https://www.youtube.com/watch?v=Gv9_4yMHFhI"],
            roadmap: "https://roadmap.sh/ai",
            image: "https://images.pexels.com/photos/3861972/pexels-photo-3861972.jpeg?auto=compress"
        }
    ],

    userAnswers: []
};

// ----------------------
//   DOM ELEMENTS
// ----------------------
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


// ----------------------
//   THEME HANDLING
// ----------------------
function toggleTheme() {
    if (state.currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        state.currentTheme = "dark";
        localStorage.setItem("theme", "dark");
        elements.themeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
    } else {
        document.documentElement.removeAttribute("data-theme");
        state.currentTheme = "light";
        localStorage.setItem("theme", "light");
        elements.themeToggle.innerHTML = `<i class="fas fa-moon"></i>`;
    }
}

function loadTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        state.currentTheme = "dark";
        elements.themeToggle.innerHTML = `<i class="fas fa-sun"></i>`;
    }
}


// ----------------------
//   NAVIGATION
// ----------------------
function showPage(pageId) {
    document.querySelectorAll(".active-page, .auth-page").forEach(p => p.style.display = "none");
    document.getElementById(pageId).style.display = "block";
    window.scrollTo(0, 0);
}

function navigateTo(id) {
    if (id === "quiz") startQuiz();
    showPage(id);
}


// ----------------------
//   AUTH (LOGIN / SIGNUP)
// ----------------------
function loginUser(email, password) {
    if (!email || !password) {
        alert("Enter email & password");
        return;
    }
    
    state.currentUser = {
        name: email.split("@")[0],
        email
    };
    
    elements.userAvatar.textContent = state.currentUser.name.charAt(0).toUpperCase();
    elements.username.textContent = state.currentUser.name;
    document.getElementById('authButtons').style.display = 'none';
    elements.userProfile.style.display = 'flex';
    
    showPage('home');
}


function signupUser(name, email, password) {
    if (!name || !email || !password) {
        alert("Fill all fields");
        return;
    }

    fetch("http://127.0.0.1:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Signup:", data);

        // SAVE EMAIL FOR QUIZ & BOOKMARK
        localStorage.setItem("userEmail", email);

        state.currentUser = { name, email };

        elements.authButtons.style.display = "none";
        elements.userProfile.style.display = "flex";
        elements.userAvatar.textContent = name[0].toUpperCase();
        elements.username.textContent = name;

        showPage("home");
    })
    .catch(err => {
        console.error(err);
        alert("Signup failed");
    });
}



function logoutUser() {
    state.currentUser = null;
    state.userAnswers = [];
    elements.userProfile.style.display = "none";
    elements.authButtons.style.display = "flex";
    showPage("home");
}


// ----------------------
//   QUIZ SYSTEM
// ----------------------
function startQuiz() {
    state.userAnswers = [];
    showQuizQuestion(0);
}

function showQuizQuestion(index) {
   if (index >= state.quizData.length) {
    elements.progressBar.style.width = "100%";

    // ✅ SAVE QUIZ TO BACKEND
    saveQuizAnswers(state.userAnswers);

    showRecommendations();
    return;
}

    const q = state.quizData[index];
    const pct = (index / state.quizData.length) * 100;
    elements.progressBar.style.width = pct + "%";

    let options = q.options.map((o, i) =>
        `<div class="option" data-index="${i}">${o}</div>`
    ).join("");

    elements.quizContent.innerHTML = `
        <div class="question"><h3>${q.question}</h3>
            <div class="options">${options}</div>
        </div>
        <div class="quiz-navigation">
            ${index > 0 ? `<button class="btn btn-outline" id="prevQuestion">Previous</button>` : `<div></div>`}
            <button class="btn btn-primary" id="nextQuestion" disabled>Next</button>
        </div>
    `;

    document.querySelectorAll(".option").forEach(opt => {
        opt.addEventListener("click", function () {
            document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
            this.classList.add("selected");
            state.userAnswers[index] = this.textContent;
            document.getElementById("nextQuestion").disabled = false;
        });
    });

    if (index > 0) {
        document.getElementById("prevQuestion").addEventListener("click", () =>
            showQuizQuestion(index - 1)
        );
    }

    document.getElementById("nextQuestion").addEventListener("click", () =>
        showQuizQuestion(index + 1)
    );
}
// ----------------------
//   RECOMMENDATION ENGINE
// ----------------------
function calculateRecommendations() {
    const fieldInterest = state.userAnswers[0];
    const skillLevel = state.userAnswers[1];

    let filtered = state.courseDatabase.filter(course =>
        course.field === fieldInterest && course.level === skillLevel
    );

    if (filtered.length < 3) {
        filtered = state.courseDatabase.filter(course =>
            course.field === fieldInterest
        );
    }

    if (filtered.length < 3) {
        filtered = [...state.courseDatabase].sort(() => 0.5 - Math.random());
    }

    return filtered.slice(0, 4);
}


// ----------------------
//   SHOW RECOMMENDED COURSES
// ----------------------
function showRecommendations() {
    saveQuizAnswers(state.userAnswers);
    const recommended = calculateRecommendations();
    showPage("recommended-courses");

    let html = "";

    recommended.forEach(c => {
        html += `
            <div class="course-card recommended-card" data-course-id="${c.id}">
                <div class="course-img">
                    <img src="${c.image}" alt="${c.title}">
                </div>
                <div class="course-content">
                    <h3 class="course-title">${c.title}</h3>
                    <p class="course-description">${c.description}</p>
                    <div class="course-meta">
                        <span><i class="far fa-clock"></i> ${c.duration}</span>
                        <span><i class="fas fa-user-graduate"></i> ${c.level}</span>
                    </div>

                    <!-- ⭐ Bookmark Button -->
                    <button class="btn bookmark-btn" data-id="course-${c.id}">
                        <i class="fas fa-bookmark"></i> Bookmark
                    </button>
                </div>

                <div class="course-details" style="display:none;"></div>
            </div>
        `;
    });

    elements.recommendedCoursesList.innerHTML = html;

    initRecommendedCourseClicks();
    initBookmarkButtons();
}


// ----------------------
//   RECOMMENDED CARD CLICK EVENTS
// ----------------------
function initRecommendedCourseClicks() {
    document.querySelectorAll(".recommended-card").forEach(card => {
        card.addEventListener("click", function (e) {
            if (e.target.closest(".bookmark-btn")) return;

            const cid = parseInt(card.getAttribute("data-course-id"));
            const course = state.courseDatabase.find(c => c.id === cid);

            const details = card.querySelector(".course-details");

            document.querySelectorAll(".course-details").forEach(d => d.style.display = "none");

            details.innerHTML = `
                <div class="related-section">
                    <h4>Jobs</h4>
                    <ul>${course.jobs.map(j => `<li>${j}</li>`).join("")}</ul>

                    <h4>Cheatsheet</h4>
                    <a href="${course.cheatsheet}" target="_blank">${course.cheatsheet}</a>

                    <h4>YouTube</h4>
                    <ul>${course.youtube.map(u => `<li><a href="${u}" target="_blank">${u}</a></li>`).join("")}</ul>

                    <h4>Roadmap</h4>
                    <a href="${course.roadmap}" target="_blank">${course.roadmap}</a>
                </div>
            `;

            details.style.display = "block";
        });
    });
}


// ----------------------
//   GLOBAL EVENT LISTENERS
// ----------------------
document.addEventListener("DOMContentLoaded", () => {
    loadTheme();

    elements.themeToggle.addEventListener("click", toggleTheme);

    // NAVBAR LINKS
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const id = link.getAttribute("href").substring(1);
            navigateTo(id);
        });
    });

    // LOGIN/SIGNUP clicks
    elements.loginBtn.addEventListener("click", () => showPage("loginPage"));
    elements.signupBtn.addEventListener("click", () => showPage("signupPage"));

    elements.goToLogin.addEventListener("click", e => {
        e.preventDefault();
        showPage("loginPage");
    });

    elements.goToSignup.addEventListener("click", e => {
        e.preventDefault();
        showPage("signupPage");
    });

    // AUTH SUBMIT
    elements.loginSubmit.addEventListener("click", () => {
        loginUser(
            document.getElementById("loginEmail").value,
            document.getElementById("loginPassword").value
        );
    });

    elements.signupSubmit.addEventListener("click", () => {
        signupUser(
            document.getElementById("signupName").value,
            document.getElementById("signupEmail").value,
            document.getElementById("signupPassword").value
        );
    });

    elements.logoutBtn.addEventListener("click", logoutUser);

    elements.startQuizBtn.addEventListener("click", () => {
        if (!state.currentUser) {
            alert("Please login first");
            showPage("loginPage");
            return;
        }
        startQuiz();
        showPage("quiz");
    });

    initCertificationCardClickable();
});


// ----------------------
//   CERTIFICATION CARDS → CLICKABLE CARDS
// ----------------------
function initCertificationCardClickable() {
    document.querySelectorAll(".certification-card").forEach(card => {
        const link = card.querySelector("a.btn-primary");
        if (!link) return;

        card.style.cursor = "pointer";
        card.setAttribute("tabindex", "0");

        card.addEventListener("click", e => {
            if (e.target.closest(".bookmark-btn")) return;
            if (e.target.tagName === "A") return;
            window.open(link.href, "_blank");
        });

        card.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                window.open(link.href, "_blank");
            }
        });
    });
}
// ---------------------------------------------
// BOOKMARK SYSTEM
// ---------------------------------------------

// Ensure bookmarks array exists in localStorage
if (!localStorage.getItem("bookmarks")) {
    localStorage.setItem("bookmarks", JSON.stringify([]));
}

function getBookmarks() {
    return JSON.parse(localStorage.getItem("bookmarks")) || [];
}

function saveBookmarks(list) {
    localStorage.setItem("bookmarks", JSON.stringify(list));
}

function addBookmark(item) {
    const bookmarks = getBookmarks();
    if (bookmarks.some(b => b.id === item.id)) return; // avoid duplicates
    bookmarks.push(item);
    saveBookmarks(bookmarks);
}

function removeBookmark(id) {
    let bookmarks = getBookmarks();
    bookmarks = bookmarks.filter(b => b.id !== id);
    saveBookmarks(bookmarks);
}

function isBookmarked(id) {
    const bookmarks = getBookmarks();
    return bookmarks.some(b => b.id === id);
}

function toggleBookmark(item) {
    if (!item || !item.id) return;

    if (isBookmarked(item.id)) {
        removeBookmark(item.id);
    } else {
        addBookmark(item);
    }
    updateAllBookmarkButtons();
}


// ---------------------------------------------
// INIT + UPDATE BOOKMARK BUTTONS
// ---------------------------------------------
function updateAllBookmarkButtons() {
    document.querySelectorAll(".bookmark-btn").forEach(btn => {
        const id = btn.dataset.id;
        if (isBookmarked(id)) {
            btn.innerHTML = `<i class="fas fa-check"></i> Bookmarked`;
            btn.classList.add("bookmarked");
        } else {
            btn.innerHTML = `<i class="fas fa-bookmark"></i> Bookmark`;
            btn.classList.remove("bookmarked");
        }
    });
}

function initBookmarkButtons() {
    document.querySelectorAll(".bookmark-btn").forEach(btn => {
        // prevent attaching multiple listeners to the same button
        if (btn.dataset.bookmarkListenerAttached === "true") return;

        btn.addEventListener("click", e => {
            e.stopPropagation(); // don't trigger card click
            e.preventDefault();

            const id = btn.dataset.id;
            let item = null;

            // Course bookmark (home / recommended)
            if (id.startsWith("course-")) {
                const numericId = parseInt(id.split("-")[1], 10);
                const course = state.courseDatabase.find(c => c.id === numericId);
                if (!course) return;
                item = {
                    id: id,
                    type: "course",
                    title: course.title,
                    image: course.image
                };
            }

            // Certification bookmark
            else if (id.startsWith("cert-")) {
                const card = btn.closest(".certification-card");
                if (!card) return;
                const titleEl = card.querySelector(".certification-title");
                const imgEl = card.querySelector("img");
                if (!titleEl || !imgEl) return;

                item = {
                    id: id,
                    type: "cert",
                    title: titleEl.innerText.trim(),
                    image: imgEl.src
                };
            }

            toggleBookmark(item);
        });

        btn.dataset.bookmarkListenerAttached = "true";
    });

    updateAllBookmarkButtons();
}


// ---------------------------------------------
// INJECT BOOKMARK BUTTONS INTO EXISTING CARDS
// ---------------------------------------------

// 1) Home → Popular Courses (static in HTML)
function injectHomeCourseBookmarkButtons() {
    const homeSection = document.getElementById("home");
    if (!homeSection) return;

    const cards = homeSection.querySelectorAll(".course-card");
    cards.forEach(card => {
        const content = card.querySelector(".course-content");
        const titleEl = card.querySelector(".course-title");
        if (!content || !titleEl) return;

        const titleText = titleEl.innerText.trim();
        const course = state.courseDatabase.find(c => c.title === titleText);
        if (!course) return;

        // Avoid duplicate bookmark button
        if (content.querySelector(".bookmark-btn")) return;

        const btn = document.createElement("button");
        btn.className = "btn bookmark-btn";
        btn.dataset.id = `course-${course.id}`;
        btn.innerHTML = `<i class="fas fa-bookmark"></i> Bookmark`;

        content.appendChild(btn);
    });
}


// ---------------------------------------------
// BOOKMARKS PAGE (SECTION) HANDLING
// ---------------------------------------------
function ensureBookmarksSectionExists() {
    let section = document.getElementById("bookmarks");
    if (!section) {
        section = document.createElement("section");
        section.id = "bookmarks";
        section.className = "active-page section";
        section.style.display = "none";
        section.innerHTML = `
            <div class="container">
                <div class="section-title">
                    <h2>Your Bookmarks</h2>
                    <p>All the courses and certifications you've saved.</p>
                </div>
                <div id="bookmarksContent"></div>
            </div>
        `;
        // Insert before footer
        const footer = document.querySelector("footer");
        document.body.insertBefore(section, footer);
    }
}

function showBookmarks() {
    ensureBookmarksSectionExists();
    const section = document.getElementById("bookmarks");
    const contentDiv = document.getElementById("bookmarksContent");
    const bookmarks = getBookmarks();

    if (!contentDiv) return;

    if (bookmarks.length === 0) {
        contentDiv.innerHTML = `
            <p style="text-align:center; color: var(--text-light);">
                No bookmarks yet. Go explore courses and certifications to save your favorites!
            </p>
        `;
    } else {
        let html = `<div class="courses">`;

        bookmarks.forEach(item => {
            html += `
                <div class="course-card">
                    <div class="course-img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="course-content">
                        <h3 class="course-title">${item.title}</h3>
                        <p class="course-description">
                            ${item.type === "course" ? "Saved Course" : "Saved Certification"}
                        </p>
                        <button class="btn btn-outline remove-bookmark-btn" data-id="${item.id}">
                            <i class="fas fa-trash"></i> Remove
                        </button>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        contentDiv.innerHTML = html;

        // Hook remove buttons
        document.querySelectorAll(".remove-bookmark-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.dataset.id;
                removeBookmark(id);
                showBookmarks();
                updateAllBookmarkButtons();
            });
        });
    }

    showPage("bookmarks");
}


// ---------------------------------------------
// HOOK NAVBAR "BOOKMARKS" LINK
// ---------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
    // Make sure section exists
    ensureBookmarksSectionExists();

    // Inject bookmark buttons into existing cards
    injectHomeCourseBookmarkButtons();
    injectCertificationBookmarkButtons();

    // Initialize button behaviors
    initBookmarkButtons();

    // Hook navbar Bookmarks link (if present)
    const bookmarksNavLink = document.querySelector('a[href="#bookmarks"]');
    if (bookmarksNavLink) {
        bookmarksNavLink.addEventListener("click", e => {
            e.preventDefault();
            showBookmarks();
        });
    }
});
function renderDashboard() {
    // Quiz answers
    const interest = state.userAnswers[0] || "Not Taken";
    const skill = state.userAnswers[1] || "Not Taken";

    // Count recommended courses
    const recommendedCount = calculateRecommendations().length;

    // Bookmarks
    const bookmarks = getBookmarks();
    const courseBookmarks = bookmarks.filter(b => b.type === "course").length;
    const certBookmarks = bookmarks.filter(b => b.type === "cert").length;

    // Clear old charts
    document.querySelectorAll("canvas").forEach(c => {
        const ctx = c.getContext("2d");
        ctx && ctx.clearRect(0, 0, c.width, c.height);
    });

    // Interest Chart
    new Chart(document.getElementById("interestChart"), {
        type: "bar",
        data: {
            labels: [interest],
            datasets: [{
                label: "Interest Area",
                data: [1],
            }]
        }
    });

    // Skill Chart
    new Chart(document.getElementById("skillChart"), {
        type: "pie",
        data: {
            labels: [skill],
            datasets: [{
                data: [1],
            }]
        }
    });

    // Course Recommendation Chart
    new Chart(document.getElementById("courseChart"), {
        type: "doughnut",
        data: {
            labels: ["Recommended"],
            datasets: [{
                data: [recommendedCount],
            }]
        }
    });

    // Bookmark Chart
    new Chart(document.getElementById("bookmarkChart"), {
        type: "bar",
        data: {
            labels: ["Courses", "Certifications"],
            datasets: [{
                label: "Bookmarks",
                data: [courseBookmarks, certBookmarks],
            }]
        }
    });
}
function navigateTo(id) {
    showPage(id);
    if (id === "dashboard") {
        renderDashboard();
    }
}
function saveQuizAnswers(quizAnswers) {
  const email = localStorage.getItem("userEmail");

  fetch("http://127.0.0.1:5000/api/quiz/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      quizAnswers: quizAnswers
    })
  })
  .then(res => res.json())
  .then(data => console.log("Quiz saved:", data));
}


// Example quiz completion
function onQuizComplete() {
  const quizAnswers = [
    "Technology",
    "Beginner",
    "5-10 hours"
  ];

  saveQuizAnswers(quizAnswers);
}
function saveBookmark(course) {
  const email = localStorage.getItem("userEmail");

  fetch("http://127.0.0.1:5000/api/bookmark/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email,
      course: course
    })
  })
  .then(res => res.json())
  .then(data => console.log("Bookmark saved:", data));
}
// Example bookmark button
function onBookmarkClick() {
  const course = {
    title: "Web Development Fundamentals",
    level: "Beginner",
    duration: "8 weeks"
  };

  saveBookmark(course);
}
