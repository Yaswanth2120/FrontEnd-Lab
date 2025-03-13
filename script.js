const works = {
    "task1": { "title": "Project 1", "url": "works/task1/index.html" },
    "task2": { "title": "Project 2", "url": "works/task2/index.html" },
    "task3": { "title": "Project 3", "url": "works/task3/index.html" },
    "task4": { "title": "Project 4", "url": "works/task4/index.html" },
};

// Function to dynamically create navbar buttons
function loadProjects() {
    let navbar = document.querySelector(".navbar");
    navbar.innerHTML = ""; // Clear existing content

    // Create the Home button
    let homeButton = document.createElement("button");
    homeButton.textContent = "Home";
    homeButton.classList.add("nav-btn", "home-btn");
    homeButton.onclick = function () {
        setActiveButton(homeButton);
        loadProject("works/landing.html");
        updateContentTitle("Welcome", "My portfolio homepage");
    };
    navbar.appendChild(homeButton);

    // Create buttons for each project
    for (let key in works) {
        let button = document.createElement("button");
        button.textContent = works[key].title;
        button.classList.add("nav-btn");
        button.dataset.project = key;
        button.onclick = function () {
            setActiveButton(button);
            loadProject(works[key].url);
            updateContentTitle(works[key].title, "Project details and showcase");
        };
        navbar.appendChild(button);
    }
}

// Function to set active button
function setActiveButton(activeButton) {
    // Remove active class from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    activeButton.classList.add('active');
}

// Function to update the content title
function updateContentTitle(title, subtitle = "") {
    document.querySelector('.content-title').textContent = title;
    document.querySelector('.content-subtitle').textContent = subtitle;
}

// Function to update the iframe source dynamically
function loadProject(url) {
    let frame = document.getElementById("projectFrame");
    let loading = document.querySelector(".loading");
    
    if (frame) {
        // Show loading spinner
        loading.classList.add("active");
        
        // Set iframe source
        frame.src = url;
        console.log(`Updated iframe source to: ${url}`);
        
        // Hide loading spinner when iframe loads
        frame.onload = function() {
            loading.classList.remove("active");
        };
    } else {
        console.error("Iframe not found!");
    }
}

// Set current year in footer
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Load projects when the page loads
window.onload = function () {
    loadProjects();
    // Set home as active by default and load landing page
    const homeButton = document.querySelector('.home-btn');
    setActiveButton(homeButton);
    loadProject("works/landing.html");
    updateContentTitle("Welcome", "My portfolio homepage");
};