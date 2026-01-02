# react-better-frames

A user-friendly windowing system for React applications.

## Demo

A simple interactive demo can be found here:

https://billdestein.github.io/react-better-frames-demo/

The source code for the demo is here:

https://github.com/billdestein/react-better-frames-demo

## Key Concepts

The following paragraphs will walk you through the development of a very simple windowed React application called 'Hello'.

Key concepts are the container div, the Canvas and the Frame.

The container div is what it sounds like.  It's a generic div, typically a large div, that will contain some number of Frames.  The container div must be assigned an Id that is globally unique.  

Canvas is a Typescript class.  An application typically creates a single instance of the Canvas class.  The Canvas constructor takes a single argument, and that is the ID of the container div.  Once the Canvas instance is create, it is used to add frames to the container div, remove frames from the container div, and to manage many other features.

A Frame can be thought of as a miniature React app.  Each frame can have its own user experience, and its own business logic.  A frame is implemented as a React function component that returns an element of type React.JSX.Element.

# Getting Started

This guide will walk you through setting up a new React project configured with TypeScript using the officially supported create-react-app tool.

### Prerequisites
Make sure you have Node.js installed on your system, which includes npm (Node Package Manager).

### Step 1: Create a New Project

Navigate to the directory where you want to create your project and run the following command. The key is to include the --template typescript flag.

```bash
<<<<<<< HEAD
    npx create-react-app my-ts-app --template typescript
```

=======
npx create-react-app hello-app --template typescript
```

### Step 2: Wait for Installation

The command will create a new directory, download all necessary dependencies (React, ReactDOM, TypeScript, Webpack, Babel, etc.), and set up the project structure. This might take a few minutes.

### Step 3: Navigate to Your Project Directory

Once the installation is complete, change your current directory to your new project folder:

```bash
   cd hello-app
```

### Step 4: Start the Development Server

You can now start the local development server to view your new application in your browser:

```bash
    npm start
```

This command opens your default web browser to http://localhost:3000 and displays the default React starter page. The development server will watch your files and automatically reload the page when you make changes.

### Step 5: Project Structure

After running the command, your project structure will look similar to a standard JavaScript React app, but with some key differences:

```
hello-app/
├── node_modules/
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx          <-- TypeScript React component file
│   ├── App.test.tsx     <-- TypeScript test file
│   ├── index.css
│   ├── index.tsx        <-- Entry point of your app, uses TypeScript
│   ├── react-app-env.d.ts <-- TypeScript declaration file
│   ├── reportWebVitals.ts
│   └── setupTests.ts
├── .gitignore
├── package.json
├── package-lock.json
└── tsconfig.json        <-- TypeScript configuration file
```

Note 1:  The .tsx extension indicates a file containing TypeScript code and JSX.

Note 2: The tsconfig.json file contains all the compiler options for your TypeScript project.
You are now ready to start building your application with the benefits of TypeScript's static type checking!

>>>>>>> 1f9dc02 (More work)

