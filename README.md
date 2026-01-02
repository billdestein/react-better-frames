# react-better-frames

A user-friendly windowing system for use in React applications.

## Demo

A simple interactive demo can be found here:

https://billdestein.github.io/react-better-frames-demo/

The source code for the demo is here:

https://billdestein.github.io/react-better-frames-demo/

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


### Step1: Create a New Project

Navigate to the directory where you want to create your project and run the following command. The key is to include the --template typescript flag.

```bash
npx create-react-app my-ts-app --template typescript
```
