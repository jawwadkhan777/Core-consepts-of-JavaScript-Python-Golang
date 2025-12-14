
// let users = [];

// function addUserHandler() {
//     const name = document.getElementById("name").value.trim();
//     const email = document.getElementById("email").value.trim();

//     // console.log(name, email);

//     if(!name || !email) return alert("Both fields are required");
//     const user = {id: Date.now() ,name, email}
    
//     addUsers(user, msg=> {
//         alert(msg)
//     })

// }

// // add users in users array
// function addUsers(user, callback) {
//     users.push(user);
//     new Promise(()=> {setTimeout(()=> {
//         callback("user added successfully");
        
//     }, 1000)});
    
//     saveToLocalStorage();
//     console.log(users);
// }

let users = [];

function saveToFile() {
  localStorage.setItem("users", JSON.stringify(users));
}

function loadFromFile() {
  const data = localStorage.getItem("users");
  console.log("Data: ", data);
  
  users = data ? JSON.parse(data) : [];
  console.log("Users: ", users);
  
}

// Initial load
loadFromFile();

// Add user (using callback)
function addUser(user, callback) {
  users.push(user);
  saveToFile();
  callback("User added successfully");
}

// Update user (returns Promise)
function updateUser(id, newData) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return reject("User not found");

    users[index] = { ...users[index], ...newData };
    saveToFile();
    resolve("User updated successfully");
  });
}

// Delete user (returns Promise)
function deleteUser(id) {
  return new Promise((resolve, reject) => {
    const index = users.findIndex(u => u.id === id);

    if (index === -1) return reject("User not found");

    users.splice(index, 1);
    saveToFile();
    resolve("User deleted successfully");
  });
}

function getAllUsers() {
  return users;
}

// ---------------------------
// 4. Async/Await Example (simulating server delay)
// ---------------------------

function simulateFetchUsers() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(users);
    }, 1000); // 1 second delay
  });
}

async function fetchUsersAsync() {
  const data = await simulateFetchUsers();
  return data;
}

// ---------------------------
// 5. UI Functions
// ---------------------------

function handleAddUser() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();

  if (!name || !email) return alert("Both fields required");

  const newUser = {
    id: Date.now(),
    name,
    email
  };

  addUser(newUser, msg => {
    alert(msg);
    loadUsersUI();
  });
}

function loadUsersUI() {
  loadFromFile();
  const list = document.getElementById("usersList");
  list.innerHTML = "";

  users.forEach(u => {
    const li = document.createElement("li");
    li.innerHTML = `
      <b>${u.name}</b> (${u.email})
      <button onclick="removeUser(${u.id})">Delete</button>
      <button onclick="editUser(${u.id})">Edit</button>
    `;
    list.appendChild(li);
  });
}

// Delete button handler
function removeUser(id) {
  deleteUser(id)
    .then(msg => {
      alert(msg);
      loadUsersUI();
    })
    .catch(err => alert(err));
}

// Edit button handler
function editUser(id) {
  const newName = prompt("Enter new name:");
  if (!newName) return;

  updateUser(id, { name: newName })
    .then(msg => {
      alert(msg);
      loadUsersUI();
    })
    .catch(err => alert(err));
}

// ---------------------------
// 6. Async/Await button output
// ---------------------------

async function runAsyncFetch() {
  document.getElementById("asyncOutput").innerText = "Loading...";

  const data = await fetchUsersAsync();

  document.getElementById("asyncOutput").innerText = JSON.stringify(data, null, 2);
}
