# User Management System (JavaScript & Python)

This repository contains two simple **User Management System** projects implemented using **Vanilla JavaScript** and **Python**.  
Both projects focus on core programming fundamentals such as arrays/lists, objects/dictionaries, functions, callbacks, promises, and asynchronous programming.

The primary goal of these projects is to demonstrate **logic and concept understanding**, not UI or styling.

---

## 📌 Part 1: User Management System (Vanilla JavaScript)

### 📄 Project Description

This project is a browser-based **User Management System** built using **Vanilla JavaScript**.  
It allows users to:

- Add users
- Update users
- Delete users
- View all users

User data is stored locally, and asynchronous behavior is simulated using `setTimeout`, Promises, and `async/await`.

---

### 🛠 Technologies Used

- HTML (minimal UI)
- Vanilla JavaScript (ES6+)

---

### 📂 Project Structure

```
/javascript-user-management
│
├── index.html
└── app.js
```


---

### 🧠 Core Concepts Used (JavaScript)

- **Arrays** – Used to store users.
- **Objects** – Each user is represented as an object (`id`, `name`, `email`).
- **Functions** – Separate functions are created for adding, updating, deleting, and retrieving users.
- **Callbacks** – Used to execute logic after certain operations.
- **Promises** – Handle asynchronous update and delete operations.
- **Async / Await** – Simplifies promise handling and improves readability.
- **setTimeout** – Simulates delayed execution similar to server responses.
- **Local Storage** – Used to persist user data in the browser.

---

### ▶️ How to Run (JavaScript)

1. Open the `index.html` file in any modern web browser.
2. Use the provided buttons to add, update, delete, and fetch users.

---

## 📌 Part 2: User Management System (Python)

### 📄 Project Description

This project is a **terminal-based User Management System** developed using **Python**.  
It provides the same functionality as the JavaScript version:

- Add users
- Update users
- Delete users
- View all users

Asynchronous behavior is implemented using Python’s `asyncio` library to simulate JavaScript-like Promises and `setTimeout`.

---

### 🛠 Technologies Used

- Python 3.x
- asyncio (Python standard library)

---

### 📂 Project Structure

```
/python-user-management
│
└── app.py
```


---

### 🧠 Core Concepts Used (Python)

- **Lists** – Used to store users.
- **Dictionaries** – Each user is stored as a dictionary (`id`, `name`, `email`).
- **Functions** – Encapsulate business logic for user operations.
- **Callbacks** – Functions passed as arguments and executed after completion.
- **Async / Await** – Used for asynchronous execution.
- **Promises Equivalent** – Async functions act like Promises:
  - `return` → resolve
  - `raise Exception` → reject
- **setTimeout Equivalent** – `asyncio.sleep()` simulates delayed execution.
- **Exception Handling** – `try / except` blocks ensure safe error handling.

---

### ▶️ How to Run (Python)

1. Ensure Python **3.7 or higher** is installed.
2. Navigate to the Python project directory.
3. Run the application using:

```bash
python app.py

