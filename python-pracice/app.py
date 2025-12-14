import asyncio
import time

users = []

# generate id for users
def generate_id():
    return int(time.time()*1000)

# adding user handler using asuncio
async def add_user_handler(user):
    await asyncio.sleep(2)
    users.append(user)
    return "User added successfully"
# updating user handler using asuncio
async def update_user_handler(user_id, new_data):
    await asyncio.sleep(2)
    for user in users:
        if user["id"] == user_id:
            user.update(new_data)
            return "User updated successfully"
    raise Exception("User not found")
# deleting user handler using asuncio
async def delete_user_handler(user_id):
    await asyncio.sleep(2)
    for i, user in enumerate(users):
        if user["id"] == user_id:
            users.pop(i)
            return "User deleted successfully"
    raise Exception("User not found")


# CRUD functions
# add 
async def add_user():
    name = input("Enter name: ").strip()
    email = input("Enter email: ").strip()
    
    if not name or not email:
        print("name and email are required!")
        return
    
    user= {
        "id" : generate_id(),
        "name" : name,
        "email" : email,
    }
    
    res = await add_user_handler(user)
    print(res)
# update
async def update_user():
    try:
        user_id = int(input("Enter user ID to update: "))
        name = input("Enter new name: ").strip()
        email = input("Enter new email: ").strip()

        new_data = {}
        if name:
            new_data["name"] = name
        if email:
            new_data["email"] = email

        res = await update_user_handler(user_id, new_data)
        print(res)

    except Exception as e:
        print("Error:", e)
# delete
async def delete_user():
    try:
        user_id = int(input("Enter user ID to delete: "))
        res = await delete_user_handler(user_id)
        print(res)

    except Exception as e:
        print("Error:", e)
    
# show users method
def show_users():
    if not users:
        print("No users available")
        return
    
    print("Current Users:\n")
    for user in users:
        print(user)
        
        
        
# main menu methods
async def main():
    while True:
        print("""
========= USER MANAGEMENT SYSTEM =========
1. Show Users
2. Add User
3. Update User
4. Delete User
0. Exit
=========================================
        """)
        option = input("Choose an option: ").strip()
        
        if option == "1":
            show_users()
        elif option == "2":
                await add_user()
        elif option == "3":
            await update_user()
        elif option == "4":
            await delete_user()
        elif option == "0":
            print("Exiting Program...")
            break
        else:
            print("Invalid option, try again!")
            
            
asyncio.run(main())