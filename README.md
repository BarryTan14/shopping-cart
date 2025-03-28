# Assignment 1

Follow the steps below to view the HTML page:

### 1. Open the Project Folder

- Open the project directory in your **File Explorer**.

### 2. Locate the HTML File

- Inside the project folder, locate the HTML file (usually `index.html` or similar).

### 3. Open the HTML File in Your Browser

- Double-click the HTML file, and it will automatically open in your default web browser.

---

# Assignment 2

Follow the steps below to get the project up and running:

### 1. Install Dependencies

In the project directory, run the following command to install the necessary dependencies:

```bash
npm install
```

### 2. Start the Development Server

Once the dependencies are installed, you can start the app by running:

```bash
npm start
```

### 3. Run Tests

To run the tests, use the following command:

```bash
npm test
```

---

# Technical Decisions

### Routing with React Router

I chose to use **React Router** because it allows seamless navigation between different pages (Main Page, Product Detail Page, Cart Page) without the need for full-page reloads, improving the user experience.

React Router's **dynamic routes** also make it easy to display individual product details, enabling a more fluid and responsive interaction.

### React State Management

I chose to use **React's `useState` and `useContext`** for state management because they allow the cart data to be updated in real-time, ensuring that the cart icon and its contents reflect changes immediately when items are added or removed.

React's built-in state management tools, like `useState`, are ideal for local component states. If a global state is needed, **Context API** provides an efficient way to share the cart data across different components without the complexity of prop drilling.

### Cart Actions (Add, Remove, Update Quantity)

I chose to implement the ability to **add, remove**, and **update the quantity** of products in the cart because these are the core functionalities required for any e-commerce cart, allowing users to directly interact with the cart and see updates in real-time.

---

# Assumptions Made During the Project

- **No User Authentication**: The project assumes that there is no need for user login/authentication for adding products to the cart and does not include any user-specific data.
