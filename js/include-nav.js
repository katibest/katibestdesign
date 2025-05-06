// Function to include navigation
async function includeNav() {
    try {
        // Determine if we're on the homepage or a project page
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        const navPath = isHomePage ? '/components/nav.html' : '../components/nav.html';
        
        const response = await fetch(navPath);
        const html = await response.text();
        document.getElementById('nav-placeholder').innerHTML = html;

        // Update paths based on current page
        const nav = document.getElementById('nav-placeholder');
        const links = nav.getElementsByTagName('a');
        
        for (let link of links) {
            if (link.getAttribute('href').startsWith('../')) {
                // For project pages, remove the '../' prefix
                link.setAttribute('href', link.getAttribute('href').substring(3));
            }
        }
    } catch (error) {
        console.error('Error loading navigation:', error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', includeNav); 