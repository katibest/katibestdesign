// Function to include navigation and footer
async function includeComponents() {
    try {
        // Determine if we're on the homepage or a project page
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        const isProjectPage = window.location.pathname.includes('/projects/');
        const basePath = isProjectPage ? '../' : './';
        
        console.log('Current page:', window.location.pathname);
        console.log('Is homepage:', isHomePage);
        console.log('Is project page:', isProjectPage);
        console.log('Base path:', basePath);

        // Load navigation
        const navPath = `${basePath}components/nav.html`;
        console.log('Loading navigation from:', navPath);
        const navResponse = await fetch(navPath);
        
        if (!navResponse.ok) {
            throw new Error(`Navigation HTTP error! status: ${navResponse.status}`);
        }
        
        const navHtml = await navResponse.text();
        const navPlaceholder = document.getElementById('nav-placeholder');
        
        if (!navPlaceholder) {
            throw new Error('Navigation placeholder not found');
        }
        
        navPlaceholder.innerHTML = navHtml;
        console.log('Navigation loaded successfully');

        // Update navigation links based on data attributes
        const navLinks = navPlaceholder.querySelectorAll('[data-nav-link]');
        navLinks.forEach(link => {
            const linkType = link.getAttribute('data-nav-link');
            let href = '';

            switch (linkType) {
                case 'home':
                    href = isProjectPage ? '../index.html' : 'index.html';
                    break;
                case 'about':
                    href = isProjectPage ? '../about.html' : 'about.html';
                    break;
                case 'contact':
                    href = isProjectPage ? '../index.html#contact' : 'index.html#contact';
                    break;
                case 'project':
                    const project = link.getAttribute('data-project');
                    href = isProjectPage ? `../projects/${project}.html` : `projects/${project}.html`;
                    break;
            }

            link.setAttribute('href', href);
            console.log(`Updated ${linkType} link:`, href);
        });

        // Load footer
        const footerPath = `${basePath}components/footer.html`;
        console.log('Loading footer from:', footerPath);
        const footerResponse = await fetch(footerPath);
        
        if (!footerResponse.ok) {
            throw new Error(`Footer HTTP error! status: ${footerResponse.status}`);
        }
        
        const footerHtml = await footerResponse.text();
        const footerPlaceholder = document.getElementById('footer-placeholder');
        
        if (!footerPlaceholder) {
            throw new Error('Footer placeholder not found');
        }
        
        footerPlaceholder.innerHTML = footerHtml;
        console.log('Footer loaded successfully');

    } catch (error) {
        console.error('Error loading components:', error);
        // Fallback navigation
        document.getElementById('nav-placeholder').innerHTML = `
            <header class="bg-white shadow-sm sticky top-0 z-50">
                <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
                    <a href="${isProjectPage ? '../index.html' : 'index.html'}" class="text-2xl font-bold text-periwinkle font-poppins">Kati Best</a>
                    <ul class="flex space-x-8 text-lg font-medium">
                        <li><a href="${isProjectPage ? '../about.html' : 'about.html'}" class="text-gray-700 hover:text-periwinkle">About Me</a></li>
                        <li><a href="${isProjectPage ? '../index.html#contact' : 'index.html#contact'}" class="text-gray-700 hover:text-periwinkle">Contact</a></li>
                    </ul>
                </nav>
            </header>
        `;
        // Fallback footer
        document.getElementById('footer-placeholder').innerHTML = `
            <footer class="bg-periwinkle text-white py-8">
                <div class="container mx-auto px-4 text-center">
                    <p>&copy; ${new Date().getFullYear()} Kati Best. All rights reserved.</p>
                </div>
            </footer>
        `;
    }
}

// Add dropdown styles
const style = document.createElement('style');
style.textContent = `
    .dropdown-menu {
        opacity: 0;
        visibility: hidden;
        transform: translateY(-5px);
        transition: all 0.3s ease;
        pointer-events: none;
    }
    .group:hover .dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
        pointer-events: auto;
        transition-delay: 0.1s;
    }
    .dropdown-item {
        transition: all 0.15s ease;
    }
    .dropdown-item:hover {
        background-color: #f8f9fa;
        transform: translateX(2px);
    }
`;
document.head.appendChild(style);

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', includeComponents); 