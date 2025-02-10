
function includeHTML(elementId, filePath) {
  fetch(filePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${filePath}: ${response.statusText}`);
      }
      return response.text();
    })
    .then(html => {
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = html;

        // Add arrow toggle functionality after the content is loaded
        if (elementId === "header-placeholder") {
          setupArrowToggles(); // Ensure toggles are set up after loading header

        }
      } else {
        console.warn(`Element with ID '${elementId}' not found.`);
      }
    })
    .catch(error => {
      console.error(error);
    });
}


function setupArrowToggles() {
  document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(link => {
    link.addEventListener('click', function (event) {
      event.preventDefault(); // Prevent default link behavior if applicable

      const arrow = this.querySelector('.arrow'); // The arrow inside the clicked link
      const targetId = this.getAttribute('href'); // Get the target collapsible content ID
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';

        // Toggle only the clicked section
        if (isExpanded) {
          arrow.innerHTML = '&#9660;';
        } else {
          arrow.innerHTML = '&#9654;';
        }
      }
    });
  });
}


function createHeaderNavigation(elementId, jsonFilePath) {
  const element = document.getElementById(elementId);
  if (!element) {
    // OK if not found, just exit quietly
    return;
  }

  const index = parseInt(element.getAttribute("index"), 10); // Read the index as an integer

  fetch(jsonFilePath)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Failed to load ${jsonFilePath}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      const { index: indexData, pages } = data;

      // Handle invalid index cases
      const isIndexValid = idx => idx >= 0 && idx < pages.length;

      const leftPage = isIndexValid(index - 1) ? pages[index - 1] : null;
      const rightPage = isIndexValid(index + 1) ? pages[index + 1] : null;

      const headerHTML = `
        <div class="project-navigation">
          <div class="nav-column left-column">
            ${leftPage ? `<a href="${leftPage.nav}">← ${leftPage.title}</a>` : ""}
          </div>
          <div class="nav-column middle-column">
            <a href="${indexData.nav}">${indexData.title}</a>
          </div>
          <div class="nav-column right-column">
            ${rightPage ? `<a href="${rightPage.nav}">${rightPage.title} →</a>` : ""}
          </div>
        </div>
      `;

      // Insert the generated HTML into the element
      element.innerHTML = headerHTML;
    })
    .catch(error => {
      console.error("Error loading navigation JSON:", error);
      element.innerHTML = `<p>Error loading navigation data</p>`;
    });
}

function loadScripts(scripts, callback) {
    let loaded = 0;
    scripts.forEach(src => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            loaded++;
            if (loaded === scripts.length && typeof callback === "function") {
                callback();
            }
        };
        script.onerror = () => {
            console.error(`Error loading ${src}`);
            loaded++;
            if (loaded === scripts.length && typeof callback === "function") {
                callback();
            }
        };
        document.body.appendChild(script);
    });
}

function googleAnalytics(trackingId) {
    // Detect if running on localhost or a development environment
    const isLocalhost = window.location.hostname === "localhost" || 
                        window.location.hostname === "127.0.0.1" || 
                        window.location.hostname.startsWith("192.168.") || 
                        window.location.hostname.endsWith(".local");

    if (isLocalhost) {
        return; // Exit without loading Analytics
    }

    // Create script element for gtag.js
    const scriptTag = document.createElement("script");
    scriptTag.async = true;
    scriptTag.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
    document.head.appendChild(scriptTag);

    // Initialize gtag function
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }

    // Inject gtag configuration
    scriptTag.onload = () => {
        gtag('js', new Date());
        gtag('config', trackingId);
    };

    // Error handling
    scriptTag.onerror = () => {
        console.error("Failed to load Google Analytics script.");
    };
}


document.addEventListener("DOMContentLoaded", () => {
    // Add the header/footer and any other HTML includes
    includeHTML("header-placeholder", "template/header.html");
    includeHTML("footer-placeholder", "template/footer.html");

    // Insert Google Analyticxs
    googleAnalytics("G-L3YH0XY175");

    // List of scripts to load dynamically
    const scriptsToLoad = ["/static/js/include_code.js"];

    // Load scripts and then process code blocks
    loadScripts(scriptsToLoad, () => {
        if (typeof processCodeBlocks === "function") {
            processCodeBlocks();
        } else {
            console.error("processCodeBlocks is not defined after loading scripts.");
        }
    });

    // Load navigation last
    createHeaderNavigation("navigation-powerzero", "/projects/powerzero/navigation.json");
});

