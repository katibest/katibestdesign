// Function to include components
async function includeComponents() {
    try {
        // Determine if we're on the homepage or a project page
        const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/');
        const basePath = isHomePage ? './' : '../';
        
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

        // Update navigation paths based on current page
        const nav = document.getElementById('nav-placeholder');
        const links = nav.getElementsByTagName('a');
        
        for (let link of links) {
            if (link.classList.contains('nav-home-link')) {
                // Set home link based on current page
                link.href = isHomePage ? 'index.html' : '../index.html';
            } else if (link.classList.contains('nav-about-link')) {
                // Set about link based on current page
                link.href = isHomePage ? '#about' : '../index.html#about';
            } else if (link.classList.contains('nav-contact-link')) {
                // Set contact link based on current page
                link.href = isHomePage ? '#contact' : '../index.html#contact';
            } else if (link.href.includes('/projects/')) {
                // Update project links based on current page
                const projectPath = link.href.split('/projects/')[1];
                link.href = isHomePage ? `projects/${projectPath}` : projectPath;
            }
        }

        // Add dropdown styles
        const style = document.createElement('style');
        style.textContent = `
            .dropdown-menu {
                opacity: 0;
                visibility: hidden;
                transform: translateY(-5px);
                transition: all 0.2s ease;
                pointer-events: none;
            }
            .group:hover .dropdown-menu {
                opacity: 1;
                visibility: visible;
                transform: translateY(0);
                pointer-events: auto;
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

    } catch (error) {
        console.error('Error loading components:', error);
        // Add fallback navigation
        const navPlaceholder = document.getElementById('nav-placeholder');
        if (navPlaceholder) {
            navPlaceholder.innerHTML = `
                <header class="bg-white shadow-sm sticky top-0 z-50">
                    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
                        <a href="../index.html" class="text-2xl font-bold text-periwinkle font-poppins">Kati Best</a>
                        <ul class="flex space-x-8 text-lg font-medium">
                            <li><a href="../index.html" class="text-gray-700 hover:text-periwinkle">Home</a></li>
                            <li><a href="../index.html#about" class="text-gray-700 hover:text-periwinkle">About Me</a></li>
                            <li><a href="../index.html#contact" class="text-gray-700 hover:text-periwinkle">Contact</a></li>
                        </ul>
                    </nav>
                </header>
            `;
        }
        
        // Add fallback footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            footerPlaceholder.innerHTML = `
                <footer class="bg-palemint py-8">
                    <div class="container mx-auto px-4">
                        <div class="max-w-5xl mx-auto text-center">
                            <h3 class="text-periwinkle font-bold mb-2 font-poppins">CONNECT</h3>
                            <p class="text-gray-700 font-sans">best.kati@gmail.com</p>
                            <p class="text-gray-700 font-sans">513-257-3664</p>
                        </div>
                    </div>
                </footer>
            `;
        }
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', includeComponents); 