
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
    link.addEventListener('click', function () {
      const arrow = this.querySelector('.arrow');
      if (this.getAttribute('aria-expanded') === 'true') {
        arrow.innerHTML = '&#9660;'; 
      } else {
        arrow.innerHTML = '&#9654;'; 
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


document.addEventListener("DOMContentLoaded", () => {
  // Add the header/footer and any other html includes
  includeHTML("header-placeholder", "template/header.html");
  includeHTML("footer-placeholder", "template/footer.html");

  // Load the footer after DOM content is fully loaded
  createHeaderNavigation("navigation-powerzero", "/projects/powerzero/navigation.json")
});


