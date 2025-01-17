# Build Instructions

This `build` folder contains the source files and tools needed to customize and generate the CSS and other assets for this project. The compiled files are output to the `static` folder, which is served by GitHub Pages.

## Overview

1. Customize the design (e.g., colors, fonts) by modifying the Sass files in the `build/scss` folder.
2. Compile the Sass files to generate the final CSS.
3. The compiled CSS is saved to the `static` folder and automatically used by the website.

The steps below will guide you through the process of setting up and running the build process.


### Step 1: Install Sass

To customize and compile the CSS, you need to install Sass, a CSS preprocessor. The recommended method is using the **Sass standalone installer**. If you're already familiar with tools like Node.js and npm, you can use that instead.


1. Visit the [Sass Install Page](https://sass-lang.com/install).
    - `npm install -g sass`
    - You can use brew, npm, etc. to install as well.  Just get it working.

2. Follow the instructions for your operating system:
    - **Windows**: Download and run the Windows installer.
    - **Mac/Linux**: Use the provided commands to install Sass using Homebrew or the appropriate package manager.

3. Once installed, verify the installation by running the following command in your terminal or command prompt:

    ```bash
    sass --version
    ```


### Step 2: Set Up the Sass Files (ONLY REQUIRED FIRST TIME)

1. **Create the Folder Structure**
   Inside the `build` folder, create the following directories and files:

    ```
    /build
     /scss
       _variables.scss    # For overriding Bootstrap's default variables
       custom.scss        # The main Sass file that compiles everything
    ```

2. **Download the Bootstrap Source Files**
   Download the Bootstrap Sass source files:
   - Visit the [Bootstrap GitHub Repository](https://github.com/twbs/bootstrap).
   - Click the gree CODE button and select download zip.
   - Extract it and locate the `scss` folder.

   Copy the `scss` folder into your `build` directory, so it looks like this:

   ```
   /build
     /scss
       /bootstrap         # The full Bootstrap source Sass files
       _variables.scss    # For your custom variables
       custom.scss        # Your entry point
   ```

3. **Link Your Custom Variables**
   Open `custom.scss` and include your custom variables and Bootstrap:

   ```
   // Import Bootstrap's functions and default variables
   @import "bootstrap/functions";
   @import "bootstrap/variables";

   // Override Bootstrap's variables
   @import "variables";

   // Import the rest of Bootstrap
   @import "bootstrap/bootstrap";
   ```

4. **Add Custom Variables**
   Open `_variables.scss` and define your custom colors, fonts, or any other styles you want to override. For example:

   ```
   $primary: #3498db;                               // Custom primary color
   $secondary: #2ecc71;                             // Custom secondary color
   $font-family-sans-serif: 'Arial, sans-serif';    // Custom font
   ```


### Step 3: Compile Your Sass Files

Once you've configured Bootstrap to your liking by editing `_variables.scss`, it's time to compile your Sass files into a single CSS file for your website.

#### 3.1 Run the Sass Compiler
Use the following command to compile your `custom.scss` file into CSS. This assumes you're in the `ROOT` directory:


```bash
sass build/scss/custom.scss static/custom.css
```

- **Input File**: `scss/custom.scss` (your main Sass file)
- **Output File**: `../static/custom.css` (the compiled CSS file saved in your `static` folder)


#### 3.2 Verify the Compiled CSS
Check the `static` folder for the generated `custom.css` file. Open it in a text editor to confirm that the output looks correct.


#### 3.3 Recompile After Changes
Every time you make changes to `_variables.scss` or other Sass files, rerun the above command to regenerate the CSS.


#### Optional: Watch for Changes
If you’re actively working on customizations, you can use Sass’s **watch mode** to automatically recompile when changes are made. Run:

```bash
sass --watch build/scss/custom.scss:static/custom.css
```

This will monitor the `custom.scss` file and recompile it every time you save changes.

Once your CSS is compiled, you’re ready to use it in your static website!

content = """


### Step 4: Preview Your Website Locally

Once you've compiled your CSS and created your `index.html` file, you can preview your website locally using a simple development server.

Run the following commands in your terminal:

```bash
cd path/to/your/project
python3 -m http.server
```

Then open your browser and navigate to:

```text
http://localhost:8000
```
