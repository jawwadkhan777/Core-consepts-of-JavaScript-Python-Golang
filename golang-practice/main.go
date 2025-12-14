package main

import (
	"fmt"
	"time"
)

// ---------------------------
// 1. User Struct & Storage
// ---------------------------
type User struct {
	ID    int64
	Name  string
	Email string
}

var users []User

// ---------------------------
// 2. Helper Functions
// ---------------------------

// Generate unique ID using current time in milliseconds
func generateID() int64 {
	return time.Now().UnixMilli()
}

// Simulate async callback with goroutine
func addUser(user User, callback func(string)) {
	go func() {
		time.Sleep(2 * time.Second) // simulate delay
		users = append(users, user)
		callback("User added successfully")
	}()
}

// Update user by ID using channel for async result
func updateUser(id int64, newName string, newEmail string, result chan string) {
	go func() {
		time.Sleep(2 * time.Second) // simulate delay
		for i, u := range users {
			if u.ID == id {
				if newName != "" {
					users[i].Name = newName
				}
				if newEmail != "" {
					users[i].Email = newEmail
				}
				result <- "User updated successfully"
				return
			}
		}
		result <- "User not found"
	}()
}

// Delete user by ID using channel for async result
func deleteUser(id int64, result chan string) {
	go func() {
		time.Sleep(2 * time.Second) // simulate delay
		for i, u := range users {
			if u.ID == id {
				users = append(users[:i], users[i+1:]...)
				result <- "User deleted successfully"
				return
			}
		}
		result <- "User not found"
	}()
}

// List all users
func listUsers() {
	fmt.Println("\nCurrent Users:")
	if len(users) == 0 {
		fmt.Println("No users found.")
		return
	}
	for _, u := range users {
		fmt.Printf("ID: %d | Name: %s | Email: %s\n", u.ID, u.Name, u.Email)
	}
}

// ---------------------------
// 3. Main Menu & CLI
// ---------------------------
func main() {
	for {
		fmt.Println("\n===== User Management System =====")
		fmt.Println("1. Add User")
		fmt.Println("2. Update User")
		fmt.Println("3. Delete User")
		fmt.Println("4. View All Users")
		fmt.Println("5. Exit")
		fmt.Print("Enter choice: ")

		var option int
		fmt.Scanln(&option)

		switch option {
		case 1:
			var name, email string
			fmt.Print("Enter name: ")
			fmt.Scanln(&name)
			fmt.Print("Enter email: ")
			fmt.Scanln(&email)

			user := User{
				ID:    generateID(),
				Name:  name,
				Email: email,
			}

			addUser(user, func(msg string) {
				fmt.Println(msg)
			})

			time.Sleep(1100 * time.Millisecond) // wait for async completion before next menu

		case 2:
			var id int64
			var name, email string
			fmt.Print("Enter user ID to update: ")
			fmt.Scanln(&id)
			fmt.Print("Enter new name (leave empty to skip): ")
			fmt.Scanln(&name)
			fmt.Print("Enter new email (leave empty to skip): ")
			fmt.Scanln(&email)

			resultChan := make(chan string)
			updateUser(id, name, email, resultChan)
			fmt.Println(<-resultChan)

		case 3:
			var id int64
			fmt.Print("Enter user ID to delete: ")
			fmt.Scanln(&id)

			resultChan := make(chan string)
			deleteUser(id, resultChan)
			fmt.Println(<-resultChan)

		case 4:
			listUsers()

		case 5:
			fmt.Println("Exiting Program...")
			return

		default:
			fmt.Println("Invalid option. Please try again.")
		}
	}
}
