let prismLoaded = false; // Prevent multiple loads

async function loadPrism() {
    const scripts = [
        "https://cdn.jsdelivr.net/npm/prismjs/prism.js",
        "https://cdn.jsdelivr.net/npm/prismjs/components/prism-python.min.js",
        "https://cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.js"
    ];

    for (const script of scripts) {
        await loadScript(script);
    }
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve();
        };
        script.onerror = () => {
            console.error(`Failed to load script: ${src}`);
            reject();
        };
        document.head.appendChild(script);
    });
}

// Call loadPrism() before running Prism-based functions
loadPrism().then(() => {
    if (typeof Prism !== "undefined") {
        Prism.highlightAll();
    } else {
        console.error("Prism.js failed to load properly.");
    }
});


async function processCodeBlocks() {
    await loadPrism(); // Ensure Prism is loaded before processing

    document.querySelectorAll(".code-snippet").forEach(async function (block) {
        const filePath = block.getAttribute("data-code");
        const language = block.getAttribute("data-lang") || "plaintext";

        try {
            const response = await fetch(filePath);
            if (!response.ok) throw new Error(`Failed to load ${filePath}`);
            const code = await response.text();

            // Create a <pre><code> block
            const pre = document.createElement("pre");
            const codeElement = document.createElement("code");

            pre.classList.add("code-block");
            codeElement.className = `language-${language} line-numbers`;
            codeElement.textContent = code;


            pre.appendChild(codeElement);
            block.replaceWith(pre);

            if (typeof Prism !== "undefined") {
                Prism.highlightElement(codeElement);
            } else {
                console.error("Prism.js is not available.");
            }
        } catch (error) {
            console.error("Error loading code:", error);
            block.textContent = `Error loading ${filePath}`;
        }
    });
}