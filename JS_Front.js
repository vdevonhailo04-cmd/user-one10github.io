/* =========================
   SIDEBAR FUNCTIONALITY
========================= */

function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("collapsed");
}

function collapseSidebar() {
    const sidebar = document.getElementById("sidebar");
    const container = document.querySelector(".container");
    const mainWrapper = document.querySelector(".main-wrapper");

    sidebar.classList.toggle("collapsed");

    if (sidebar.classList.contains("collapsed")) {
        container.style.marginLeft = "80px";
        mainWrapper.style.marginLeft = "80px";
    } else {
        container.style.marginLeft = "280px";
        mainWrapper.style.marginLeft = "260px";
    }

    localStorage.setItem("sidebarCollapsed", sidebar.classList.contains("collapsed"));
}

/* =========================
   NAVIGATION
========================= */

function goBack() {
    if (document.referrer !== "") {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
}

function goToContent(language) {
    const languageMap = {
        'HTML': 'page_html.html',
        'CSS': 'page_css.html',
        'JavaScript': 'page_JS.html',
        'PHP': 'page_php.html',
        'Java': 'page_java.html',
        'C#': 'page_C.html'
    };

    if (languageMap[language]) {
        window.location.href = languageMap[language];
    }
}

/* =========================
   LOGOUT
========================= */

function handleLogout() {
    if (confirm("Are you sure you want to logout?")) {
        localStorage.clear();
        window.location.href = "login.html";
    }
}

/* =========================
   SEARCH FUNCTION (HOME PAGE ONLY)
========================= */

function searchTopics() {
    const input = document.getElementById("searchInput");
    if (!input) return;

    const filter = input.value.toLowerCase().trim();
    const cards = document.querySelectorAll(".card");
    let found = false;

    cards.forEach(card => {
        // Get title text
        const titleElement = card.querySelector("h3");
        const title = titleElement ? titleElement.textContent.toLowerCase() : "";
        
        // Get all tags text
        const tagElements = card.querySelectorAll(".card-tags li");
        const tags = Array.from(tagElements).map(tag => tag.textContent.toLowerCase());
        
        // Check if title OR any tag matches the search
        const titleMatch = title.includes(filter);
        const tagMatch = tags.some(tag => tag.includes(filter));
        
        if (filter === "" || titleMatch || tagMatch) {
            card.style.display = "";
            found = true;
        } else {
            card.style.display = "none";
        }
    });

    // Show/hide no results message
    const noResults = document.getElementById("noResults");
    if (noResults) {
        if (filter !== "" && !found) {
            noResults.style.display = "block";
            noResults.textContent = `No cards found matching "${input.value}"`;
        } else {
            noResults.style.display = "none";
        }
    }
}



/* =========================
   COPY CODE (FIXED)
========================= */

function copyCode(button) {
    let codeBlock;
    
    if (typeof button === 'string') {
        codeBlock = document.getElementById(button)?.textContent || '';
    } else {
        codeBlock = button.previousElementSibling?.textContent || '';
    }
    
    if (!codeBlock) return;
    
    navigator.clipboard.writeText(codeBlock).then(() => {
        const originalText = button.textContent;
        button.textContent = "✅ Copied!";
        button.style.background = "#28a745";
        setTimeout(() => {
            button.textContent = originalText || "📋 Copy Code";
            button.style.background = "";
        }, 2000);
    }).catch(() => {
        alert("Copy failed! Please copy manually.");
    });
}

/* =========================
   PHP STRING DEMO
========================= */

function phpStringOp(operation) {
    const text = document.getElementById("phpInput")?.value || '';
    let result, description, phpCode;

    switch (operation) {
        case 'strlen':
            result = text.length;
            description = 'strlen() - Get string length';
            phpCode = `strlen("${text}") = ${result}`;
            break;

        case 'strtoupper':
            result = text.toUpperCase();
            description = 'strtoupper() - Convert to uppercase';
            phpCode = `strtoupper("${text}") = "${result}"`;
            break;

        case 'strtolower':
            result = text.toLowerCase();
            description = 'strtolower() - Convert to lowercase';
            phpCode = `strtolower("${text}") = "${result}"`;
            break;

        case 'str_word_count':
            result = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
            description = 'str_word_count() - Count words';
            phpCode = `str_word_count("${text}") = ${result}`;
            break;
    }

    const demoPreview = document.getElementById("demoPreview");
    if (demoPreview) {
        demoPreview.innerHTML = `
            <strong>${description}:</strong><br><br>
            <code style="background:#f5f5f5;padding:10px;display:block;border-radius:5px;font-family:monospace;">
            &lt;?php<br>${phpCode}<br>?&gt;</code><br>
            <strong>Result: ${result}</strong>
        `;
    }
}

/* =========================
   LIVE HTML RUNNER
========================= */

function runLiveDemo() {
    const editor = document.getElementById("liveEditor");
    const output = document.querySelector(".demo-output");
    
    if (!editor || !output) return;
    
    const htmlContent = editor.value;
    output.innerHTML = `<h3>Live Preview</h3><div>${htmlContent}</div>`;
}

document.addEventListener("DOMContentLoaded", function () {
    const editor = document.getElementById("liveEditor");
    if (editor) {
        editor.addEventListener("input", function () {
            const output = document.querySelector(".demo-output");
            if (output) {
                output.innerHTML = "<h3>Live Preview</h3><p>Click Run Code</p>";
            }
        });
    }
});

/* =========================
   PRACTICE CHECK
========================= */

function checkPractice() {
    const code = document.querySelector(".practice-editor")?.value.toLowerCase() || '';
    let score = 0;
    
    if (code.includes("<h1")) score++;
    if (code.includes("<p")) score++;
    if (code.includes("<img")) score++;
    if (code.includes("<a")) score++;

    if (score === 4) {
        alert("🎉 Perfect! You completed the challenge!");
    } else {
        alert(`⚠️ You included ${score}/4 required elements. Keep trying!`);
    }
}

/* =========================
   DEMO STYLE UPDATER (CSS)
========================= */

function updateDemo() {
    const color = document.getElementById("demoColor")?.value || '#000';
    const bg = document.getElementById("demoBg")?.value || '#fff';
    const size = document.getElementById("demoSize")?.value || '20';
    const preview = document.getElementById("demoPreview");

    if (preview) {
        preview.style.color = color;
        preview.style.backgroundColor = bg;
        preview.style.fontSize = size + "px";
        preview.style.padding = "15px";
        preview.style.borderRadius = "8px";
        preview.style.transition = "all 0.3s ease";
    }
}


/* =========================
   JAVASCRIPT TEXT MANIPULATION
========================= */

function manipulateText(operation) {
    const text = document.getElementById("textInput")?.value || '';
    const preview = document.getElementById("demoPreview");
    
    if (!preview) return;
    
    let result = '';
    
    switch (operation) {
        case 'uppercase':
            result = text.toUpperCase();
            break;
        case 'lowercase':
            result = text.toLowerCase();
            break;
        case 'reverse':
            result = text.split('').reverse().join('');
            break;
        case 'length':
            result = `Length: ${text.length}`;
            break;
    }
    
    preview.innerHTML = `<strong>Result:</strong> ${result}`;
}

/* =========================
   JAVA ARRAY OPERATIONS
========================= */

function arrayOperation(operation) {
    const input = document.getElementById("arrayInput")?.value || '';
    const preview = document.getElementById("demoPreview");
    
    if (!preview) return;
    
    const numbers = input.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (numbers.length === 0) {
        preview.innerHTML = "Please enter valid numbers separated by commas.";
        return;
    }
    
    let result = '';
    
    switch (operation) {
        case 'sum':
            result = numbers.reduce((a, b) => a + b, 0);
            break;
        case 'average':
            result = (numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2);
            break;
        case 'length':
            result = numbers.length;
            break;
    }
    
    preview.innerHTML = `<strong>${operation.toUpperCase()}:</strong> ${result}`;
}

/* =========================
   C# CALCULATOR
========================= */

function calculate(operation) {
    const num1 = parseFloat(document.getElementById("num1")?.value) || 0;
    const num2 = parseFloat(document.getElementById("num2")?.value) || 0;
    const output = document.getElementById("demoPreview");

    let result = 0;
    let symbol = "";

    switch (operation) {
        case "add":
            result = num1 + num2;
            symbol = "+";
            break;
        case "subtract":
            result = num1 - num2;
            symbol = "-";
            break;
        case "multiply":
            result = num1 * num2;
            symbol = "×";
            break;
        default:
            result = "Invalid operation";
    }

    if (output) {
        output.innerHTML = `
            <div style="font-size: 24px; padding: 20px; background: linear-gradient(135deg, #f5f6fa, #ffffff); border-radius: 12px; border-left: 5px solid var(--primary-color);">
                ${num1} ${symbol} ${num2} = 
                <span style="color: var(--primary-color); font-size: 28px; font-weight: bold;">${result}</span>
            </div>
        `;
    }
}
//  MODAL
function openProfileModal() {
    const modal = document.getElementById("profileModal");
    modal.style.display = "flex";
    setTimeout(() => modal.classList.add("show"), 10);
    document.body.style.overflow = "hidden"; // Prevent body scroll
}

function closeProfileModal() {
    const modal = document.getElementById("profileModal");
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
        document.body.style.overflow = ""; // Restore body scroll
    }, 300);
}

// Close on Escape key
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        closeProfileModal();
    }
});

// Close on backdrop click
window.onclick = function(event) {
    const modal = document.getElementById("profileModal");
    if (event.target === modal) {
        closeProfileModal();
    }
};

/* =========================
   THEME SYSTEM (FIXED)
========================= */

function updateTheme() {
    const theme = {
        primary: document.getElementById("primaryColor")?.value || "#FF6B6B",
        secondary: document.getElementById("secondaryColor")?.value || "#4ECDC4",
        accent: document.getElementById("accentColor")?.value || "#FFE66D",
        bg: document.getElementById("bgColor")?.value || "#F9FAFB",
        card: document.getElementById("cardColor")?.value || "#FFFFFF"
         
    };
     updateColorPreviews(); 
    updateLivePreview(); 

    applyTheme(theme);
    localStorage.setItem("savedTheme", JSON.stringify(theme)); 
}

function updateLivePreview() {
    
    setTimeout(() => {
        document.querySelectorAll('.preview-nav-item, .preview-card, .preview-btn').forEach(el => {
            el.style.transition = 'all 0.3s ease';
        });
    }, 100);
}

function updateSearchColors(theme) {
    const root = document.documentElement;
    const isDark = isDarkColor(theme.bg);
    
    root.style.setProperty("--search-bg", isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)");
    root.style.setProperty("--search-bg-focus", isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.08)");
    root.style.setProperty("--search-border", isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.15)");
    root.style.setProperty("--search-text", isDark ? "#fff" : "#222");
    root.style.setProperty("--search-placeholder", isDark ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)");
}

function updateColorPreviews() {
    const colors = ['primary', 'secondary', 'accent', 'bg', 'card'];
    colors.forEach(type => {
        const input = document.getElementById(type + 'Color');
        const preview = document.getElementById(type + 'Preview');
        if (input && preview) {
            preview.style.backgroundColor = input.value;
        }
    });
}

function saveTheme() {
    const theme = {
        primary: document.getElementById("primaryColor")?.value || "#FF6B6B",
        secondary: document.getElementById("secondaryColor")?.value || "#4ECDC4",
        accent: document.getElementById("accentColor")?.value || "#FFE66D",
        bg: document.getElementById("bgColor")?.value || "#F9FAFB",
        card: document.getElementById("cardColor")?.value || "#FFFFFF"
    };

    localStorage.setItem("savedTheme", JSON.stringify(theme));
    applyTheme(theme);
    alert("Theme saved successfully!");
}

function resetTheme() { 
    const confirmReset = confirm("Are you sure you want to reset the theme?");

    if (!confirmReset) return;

    const defaultTheme = {
        primary: "#2F80ED",    
        secondary: "#27AE60",  
        accent: "#F2994A",      
        bg: "#F9FAFB",          
        card: "#FFFFFF"         
    };

    // Update color picker values
    const colorInputs = {
        primaryColor: defaultTheme.primary,
        secondaryColor: defaultTheme.secondary,
        accentColor: defaultTheme.accent,
        bgColor: defaultTheme.bg,
        cardColor: defaultTheme.card
    };

    Object.entries(colorInputs).forEach(([id, value]) => {
        const input = document.getElementById(id);
        if (input) input.value = value;
    });

    localStorage.removeItem("savedTheme");
    applyTheme(defaultTheme);
    alert("Theme has been reset.");
}

function loadTheme() {
    const saved = localStorage.getItem("savedTheme");
    
    if (saved) {
        try {
            const theme = JSON.parse(saved);
            applyTheme(theme);
            
            // Update color picker values to match saved theme
            const colorInputs = {
                primaryColor: theme.primary,
                secondaryColor: theme.secondary,
                accentColor: theme.accent,
                bgColor: theme.bg,
                cardColor: theme.card
            };

            Object.entries(colorInputs).forEach(([id, value]) => {
                const input = document.getElementById(id);
                if (input) input.value = value;
            });
            return;
        } catch (e) {
            console.warn("Failed to load saved theme:", e);
        }
    }

    // Default theme
    const defaultTheme = {
        primary: "#2F80ED",
        secondary: "#27AE60",
        accent: "#F2994A",
        bg: "#F9FAFB",
        card: "#FFFFFF"
    };
    applyTheme(defaultTheme);
}

function applyTheme(theme) {
    const root = document.documentElement;

    // Apply main theme colors
    root.style.setProperty("--primary-color", theme.primary);
    root.style.setProperty("--secondary-color", theme.secondary);
    root.style.setProperty("--accent-color", theme.accent);
    root.style.setProperty("--bg-color", theme.bg);
    root.style.setProperty("--card-color", theme.card);
    
    // APPLY SIDEBAR COLORS - THIS WAS MISSING!
    root.style.setProperty("--sidebar-bg", darkenColor(theme.primary, 0.8));
    root.style.setProperty("--sidebar-hover", lightenColor(theme.primary, 0.2));
    root.style.setProperty("--sidebar-text", lightenColor(theme.primary, 0.7));
    root.style.setProperty("--sidebar-active", theme.primary);
    
    // Update search colors for dark/light mode
    updateSearchColors(theme);
    
    // Dark mode detection
    if (isDarkColor(theme.bg)) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
    
    
}

function darkenColor(hex, factor) {
    const color = hexToRgb(hex);
    return `rgb(${Math.round(color.r * factor)}, ${Math.round(color.g * factor)}, ${Math.round(color.b * factor)})`;
}

function lightenColor(hex, factor) {
    const color = hexToRgb(hex);
    return `rgb(${Math.round(color.r + (255 - color.r) * factor)}, ${Math.round(color.g + (255 - color.g) * factor)}, ${Math.round(color.b + (255 - color.b) * factor)})`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function isDarkColor(hex) {
    const c = hex.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 255;
    const g = (rgb >> 8) & 255;
    const b = rgb & 255;
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness < 128;
}

/* =========================
   NAVIGATION HIGHLIGHT
========================= */

function setActiveNavLink() {
    const path = window.location.pathname.split("/").pop();
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === path || link.dataset.page === path.replace('.html', '')) {
            link.classList.add("active");
        }
    });
}

/* =========================
   INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", function() {
    // Load sidebar state
    const sidebarCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    const sidebar = document.getElementById("sidebar");
    const container = document.querySelector(".container");
    const mainWrapper = document.querySelector(".main-wrapper");

    if (sidebarCollapsed && sidebar) {
        sidebar.classList.add("collapsed");
        if (container) container.style.marginLeft = "80px";
        if (mainWrapper) mainWrapper.style.marginLeft = "80px";
    }

    // Load theme FIRST
    loadTheme();
    
    // Set active nav link
    setActiveNavLink();
    
    // Search input handlers - ONLY on index.html for home search
    if (window.location.pathname.includes('index.html')) {
        const searchInputs = document.querySelectorAll("#searchInput");
        searchInputs.forEach(input => {
            input.onkeyup = searchTopics;
        });
    } else {
        const searchInputs = document.querySelectorAll("#searchInput");
        searchInputs.forEach(input => {
            input.onkeyup = searchContent;
        });
    }
});

window.onload = function() {
    setActiveNavLink();
};