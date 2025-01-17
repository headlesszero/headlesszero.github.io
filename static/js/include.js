document.addEventListener("DOMContentLoaded", () => {
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
        } else {
          console.warn(`Element with ID '${elementId}' not found.`);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  // Load the footer after DOM content is fully loaded
  includeHTML("header-placeholder", "content/header.html");
  includeHTML("footer-placeholder", "content/footer.html");
});