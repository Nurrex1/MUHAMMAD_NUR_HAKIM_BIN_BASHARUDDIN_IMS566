/**
 * ==========================================================================
 * ASSIGNMO - APPLICATION CORE ENGINE CONTROLLER
 * HIGH VISIBILITY TAB STATE MANAGEMENT & ROUTING PLATFORM
 * ==========================================================================
 */

document.addEventListener("DOMContentLoaded", function () {
    
    // --- APP RUNTIME TEST STATE MAPPINGS ---
    const AUTH_STATE = {
        validEmail: "admin@example.com",
        validPassword: "password123",
        currentUser: "Douglas McGee",
        isLoggedIn: false
    };

    // --- CHART ENGINE INSTANCE TRACKING OBJECTS ---
    let dashboardPieChartInstance = null;
    let analyticsPieChartInstance = null;
    let analyticsBarChartInstance = null;

    // --- SINGLE-PAGE NAVIGATION & VIEW CONTROLLERS ---
    function switchAuthSubView(targetViewId) {
        document.querySelectorAll(".auth-view").forEach(view => {
            view.classList.add("d-none");
        });
        const targetView = document.getElementById(targetViewId);
        if (targetView) {
            targetView.classList.remove("d-none");
        }

        // Switch dynamic backdrop contextual visuals matches inside screen elements
        const sideImage = document.getElementById("auth-side-image");
        if (sideImage) {
            sideImage.className = "col-lg-6 d-none d-lg-block";
            if (targetViewId === "view-register") {
                sideImage.classList.add("bg-register-image-variant");
            } else if (targetViewId === "view-forgot") {
                sideImage.classList.add("bg-password-image-variant");
            } else {
                sideImage.classList.add("bg-login-image");
            }
        }
    }

    function switchMainAppWorkspace(targetWorkspaceViewId) {
        // Hide workspace modules instantly
        document.querySelectorAll(".main-workspace-view").forEach(view => {
            view.classList.add("d-none");
        });
        
        const destinationView = document.getElementById(`app-view-${targetWorkspaceViewId}`);
        if (destinationView) {
            destinationView.classList.remove("d-none");
        }

        // Sync highlight statuses across top sticky menu items seamlessly
        document.querySelectorAll(".header-center-tabs .tab-link").forEach(tabBtn => {
            tabBtn.classList.remove("active");
            if (tabBtn.getAttribute("data-nav") === targetWorkspaceViewId) {
                tabBtn.classList.add("active");
            }
        });

        // Safe lifecycle evaluation triggers for vector visualization modules
        if (targetWorkspaceViewId === "dashboard") {
            renderDashboardPieChart();
        } else if (targetWorkspaceViewId === "charts") {
            renderAnalyticsCharts();
        }
    }

    // --- SECURITY ACCESS SIGN-IN REGISTRY FLOWS ---
    function executeSecureSessionLogin() {
        AUTH_STATE.isLoggedIn = true;
        document.getElementById("auth-container").classList.add("d-none");
        document.getElementById("wrapper").classList.remove("d-none");
        document.getElementById("profileUserName").textContent = AUTH_STATE.currentUser;
        
        // Load target home canvas
        switchMainAppWorkspace("dashboard");
    }

    function executeSessionLogout() {
        AUTH_STATE.isLoggedIn = false;
        document.getElementById("loginForm").reset();
        document.getElementById("errorMessage").classList.add("d-none");
        
        document.getElementById("wrapper").classList.add("d-none");
        document.getElementById("auth-container").classList.remove("d-none");
        switchAuthSubView("view-login");
        
        // Clean out rendering cache elements from engine allocations
        if (dashboardPieChartInstance) { dashboardPieChartInstance.destroy(); dashboardPieChartInstance = null; }
        if (analyticsPieChartInstance) { analyticsPieChartInstance.destroy(); analyticsPieChartInstance = null; }
        if (analyticsBarChartInstance) { analyticsBarChartInstance.destroy(); analyticsBarChartInstance = null; }
    }

    // --- ATTACH INTERACTIVE EVENT PORTAL INTERFACES ---
    document.querySelectorAll(".switch-auth-trigger").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const target = this.getAttribute("data-target");
            switchAuthSubView(target);
        });
    });

    document.getElementById("loginForm").addEventListener("submit", function (e) {
        e.preventDefault();
        const emailInput = document.getElementById("loginEmail").value.trim();
        const passwordInput = document.getElementById("loginPassword").value;
        const errBanner = document.getElementById("errorMessage");

        if (emailInput === AUTH_STATE.validEmail && passwordInput === AUTH_STATE.validPassword) {
            errBanner.classList.add("d-none");
            executeSecureSessionLogin();
        } else {
            errBanner.classList.remove("d-none");
        }
    });

    document.querySelectorAll(".data-bypass-login").forEach(btn => {
        btn.addEventListener("click", function() {
            executeSecureSessionLogin();
        });
    });

    document.getElementById("registerForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Registration simulated successfully! Diverting back to entry portal.");
        switchAuthSubView("view-login");
    });

    document.getElementById("forgotForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Password verification records updated successfully.");
        switchAuthSubView("view-login");
    });

    // --- HIGH-VISIBILITY TOP NAVIGATION TAB EVENT LISTENERS ---
    document.querySelectorAll(".nav-view-btn, .tab-link").forEach(linkBtn => {
        linkBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const targetWorkspace = this.getAttribute("data-view");
            if (targetWorkspace) {
                switchMainAppWorkspace(targetWorkspace);
            }
        });
    });

    // Profile Context Overlay Menu Controllers
    const userDropdownAnchor = document.getElementById("userMenuDropdown");
    const userDropdownContent = document.getElementById("userDropdownContent");
    
    userDropdownAnchor.addEventListener("click", function (e) {
        e.stopPropagation();
        userDropdownContent.classList.toggle("d-none");
    });

    document.addEventListener("click", function () {
        if (userDropdownContent) userDropdownContent.classList.add("d-none");
    });

    // --- REALTIME SEARCH FILTER DATA-TABLE INTERFACES ---
    const filterTableRows = (searchTerm) => {
        const query = searchTerm.toLowerCase().trim();
        const rows = document.querySelectorAll("#assignmentTrackingTable tbody tr");
        
        rows.forEach(row => {
            const cellsText = row.textContent.toLowerCase();
            if (cellsText.includes(query)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    };

    document.getElementById("tableFilterInput").addEventListener("input", function() {
        filterTableRows(this.value);
    });

    document.getElementById("globalSearchInput").addEventListener("input", function() {
        switchMainAppWorkspace("tables");
        document.getElementById("tableFilterInput").value = this.value;
        filterTableRows(this.value);
    });

    // --- LOGOUT MODAL VIEW CONTROLLERS ---
    const logoutModalOverlay = document.getElementById("logoutModalOverlay");
    
    document.getElementById("logoutButtonTrigger").addEventListener("click", function (e) {
        e.preventDefault();
        logoutModalOverlay.classList.remove("d-none");
    });

    const hideLogoutModal = () => { logoutModalOverlay.classList.add("d-none"); };
    document.getElementById("modalCloseXBtn").addEventListener("click", hideLogoutModal);
    document.getElementById("modalCancelBtn").addEventListener("click", hideLogoutModal);
    
    document.getElementById("modalConfirmLogoutBtn").addEventListener("click", function () {
        hideLogoutModal();
        executeSessionLogout();
    });

    // --- INTERACTIVE SYSTEM OVERLAY TO-TOP LINK BUTTON MECHANICS ---
    const scrollBtn = document.getElementById("scrollToTopBtn");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 150) {
            scrollBtn.style.display = "block";
        } else {
            scrollBtn.style.display = "none";
        }
    });

    scrollBtn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // --- CORE GRAPHICS ENGINE DEFINITIONS (CHART.JS IMPLEMENTATION) ---
    function renderDashboardPieChart() {
        if (dashboardPieChartInstance) return; 
        const ctx = document.getElementById("dashboardPieChart");
        if (!ctx) return;

        dashboardPieChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ["Assignments to Submit", "Assignment Submitted"],
                datasets: [{
                    data: [2, 6],
                    backgroundColor: ['#4e73df', '#36b9cc'],
                    hoverBackgroundColor: ['#2e59d9', '#2c9faf'],
                    hoverBorderColor: "rgba(234, 236, 244, 1)",
                }],
            },
            options: {
                maintainAspectRatio: false,
                tooltips: { backgroundColor: "rgb(255,255,255)", bodyFontColor: "#858796", borderColor: '#dddfeb', borderWidth: 1, xPadding: 15, yPadding: 15, displayColors: false, caretPadding: 10 },
                legend: { display: false },
                cutoutPercentage: 80,
            },
        });
    }

    function renderAnalyticsCharts() {
        if (analyticsPieChartInstance && analyticsBarChartInstance) return;

        const pieCtx = document.getElementById("analyticsPieChart");
        if (pieCtx && !analyticsPieChartInstance) {
            analyticsPieChartInstance = new Chart(pieCtx, {
                type: 'doughnut',
                data: {
                    labels: ["Assignments to Submit", "Assignment Submitted"],
                    datasets: [{
                        data: [2, 6],
                        backgroundColor: ['#4e73df', '#36b9cc'],
                        hoverBackgroundColor: ['#2e59d9', '#2c9faf'],
                        hoverBorderColor: "rgba(234, 236, 244, 1)",
                    }],
                },
                options: {
                    maintainAspectRatio: false,
                    tooltips: { backgroundColor: "rgb(255,255,255)", bodyFontColor: "#858796", borderColor: '#dddfeb', borderWidth: 1, xPadding: 15, yPadding: 15, displayColors: false, caretPadding: 10 },
                    legend: { display: false },
                    cutoutPercentage: 80,
                },
            });
        }

        // FIXED: Re-engineered 3-bar metric array to display matching core indicator data fields
        const barCtx = document.getElementById("analyticsBarChart");
        if (barCtx && !analyticsBarChartInstance) {
            analyticsBarChartInstance = new Chart(barCtx, {
                type: 'bar',
                data: {
                    labels: ["Assignment to Submit", "Assignment Submitted", "Total Assignment"],
                    datasets: [{
                        backgroundColor: ["#f6c23e", "#1cc88a", "#4e73df"],
                        hoverBackgroundColor: ["#f4b619", "#17a673", "#2e59d9"],
                        data: [2, 6, 8],
                        barPercentage: 0.4
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    legend: { display: false },
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                max: 10,
                                stepSize: 2
                            },
                            gridLines: {
                                color: "rgba(0, 0, 0, .05)",
                                zeroLineColor: "rgba(0, 0, 0, .1)"
                            }
                        }],
                        xAxes: [{
                            gridLines: {
                                display: false
                            }
                        }]
                    },
                    tooltips: {
                        backgroundColor: "rgb(255,255,255)",
                        bodyFontColor: "#858796",
                        titleFontColor: "#5a5c69",
                        borderColor: '#dddfeb',
                        borderWidth: 1,
                        xPadding: 15,
                        yPadding: 15,
                        displayColors: false,
                        caretPadding: 10
                    }
                }
            });
        }
    }
});