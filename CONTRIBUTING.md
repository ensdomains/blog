# Welcome to ENS blog contributing guide

Thank you for investing your time in contributing to our project! Any contribution you make will be reflected on blog.ens.domains ✨.

Read our Code of Conduct to keep our community approachable and respectable.

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

Use the table of contents icon on the top left corner of this document to get to a specific section of this guide quickly.

## Quick Start Guide for Writing Articles on ens.blog.domains with GitHub Codespaces (Recommended)

This guide will walk you through setting up your writing environment for blog.ens.domains. It's super easy, even if you're not a developer!

### Step 1: Open the GitHub Repository

- Go to the repository on GitHub.
- Click on Code and then navigate to Codespaces.
- Click on Create codespace from the main branch.

### Step 2: Choose a Resource Version (if asked)

If a prompt asks you about resource versions, just go with the smallest one. It's plenty for what you'll be doing.

### Step 3: Wait for Codespace Setup

Your codespace will start getting set up. This could take a few minutes as the system prepares the blog environment for you.

### Step 4: Create a New Branch

- You'll want to create a new branch to work on your article.
- Press ``Ctrl + Shift + P`` to open the command palette.
- Type and select Git: Create Branch....
- Name your branch something like ``article/your_topic_here``.

### Step 5: Navigate to the Content Directory

- Open the content directory.
- Create a new folder for your article. Note: Don't use spaces in folder names. Use underscores instead.

### Step 6: Adding Resources (like images)

If you add resources and see a terminal error, don't worry!

- Press ``Ctrl + Shift + B`` to rebuild the optimized resources bundle.

### Step 7: Preview Your Changes

- Open your browser and go to [http://localhost:3000/](http://localhost:3000/).
- You can see a live preview of your article there.

### Step 8: Commit and Publish Your Changes

- Open the Source Control tab on the left or press Ctrl + Shift + G.
- Commit your changes with a meaningful message.
- Sync/Push your changes.
- Finally, create a pull request on GitHub to get your article published.

## Quick Start Guide for Writing Articles on blog.ens.domains Locally

This guide assumes you've got [Visual Studio Code](https://code.visualstudio.com/), [NodeJS](https://nodejs.org/en), and [pnpm](https://pnpm.io/) installed. If not, go ahead and install those first. We recommend to run this on Linux or WSL.

### Step 1: Clone the GitHub Repository in VS Code

- Open VS Code.
- Go to View > Command Palette or press Ctrl + Shift + P.
- Type and select Git: Clone.
- Paste in the URL of the ens.blog.domains GitHub repository and choose where you'd like to clone it.

### Step 2: Open the Repository

- Once the repository is cloned, click Open on the pop-up dialogue to navigate into your new repository.

### Step 3: Install Dependencies and Build Assets

- Open the terminal in VS Code (View > Terminal).
- Navigate to the blog directory and run:
        ``pnpm install`` and
        ``pnpm build:assets``

### Step 4: Create a New Branch

- In the bottom-left corner, you'll see the current branch name (probably main).
- Click on it, and then click on + New branch.
- Name it article/your_topic_here and hit Enter.

### Step 5: Navigate to the Content Directory

- Using the file explorer in VS Code, go to the content directory.
- Create a new folder for your article. Note: Avoid spaces in folder names; use underscores instead.

### Step 6: Adding Resources (like images)

- Drag and drop your images or other resources into the folder you just created and run the ``pnpm build:assets`` task or press ``Ctrl + Shift + B``.

### Step 7: Preview Your Changes

- Open the terminal again and, depending on the project's setup, run the local server. The command to do so is ``pnpm run dev``.
- Open your browser and go to [http://localhost:3000/](http://localhost:3000/).

### Step 8: Commit Your Changes

- Go to the Source Control panel (icon looks like a forked branch).
- You'll see all the changes you've made.
- Add a commit message describing your changes and click the checkmark icon at the top to commit.

### Step 9: Push the Changes

- After committing, go to the three-dot menu (...) in the Source Control panel.
- Click Push to push your changes to GitHub.

### Step 10: Create a Pull Request

- Open your browser and navigate to the GitHub repository.
- You should see a pop-up about your recently pushed branch. Click Compare & pull request to initiate the pull request.

And there you go! You've just written, committed, and submitted an article for ens.blog.domains without leaving the comfort of VS Code.
