# Task Management System

A full-stack task management platform built to enhance both personal and collaborative productivity. It provides intuitive task handling, insightful analytics, and seamless team participation, making it suitable for students, teams, and organizations.

---

## 🌟 Features

### 1. Personal Task Management
- Create, edit, delete tasks  
- Categorize tasks as:  
  - Completed  
  - In Progress  
  - Incomplete  
- Track total tasks, completed tasks, and completion rate  
- Gain insights through built-in analytics to improve productivity  

### 2. Team Collaboration
- Create and join teams  
- Participate in multiple groups simultaneously  
- Manage shared tasks within teams  
- Switch between teams smoothly  
- Team-level task tracking and completion monitoring  

### 3. Productivity Ranking
- Users are ranked based on task completions  
- Motivates consistent engagement and healthy competition  

---

## 🗂️ System Architecture / Schema Overview

The platform uses relational database entities linked through foreign keys to maintain structure and consistency.

### Key Entities
- **CustomUser** – Stores user details such as username, email, password, and role  
- **PersonalTask** – Manages individual user tasks  
- **Team** – Defines team profiles and membership  
- **TeamTask** – Represents tasks assigned within teams  
- **TeamTaskCompletion** – Tracks which members completed which tasks  

### Relationships
- Users ↔ PersonalTask (one-to-many)  
- Team ↔ TeamTask (one-to-many)  
- Users ↔ Team (many-to-many)  
- Users ↔ TeamTaskCompletion (records completion history within teams)  

---

## 🚀 Tech Stack  
- **Frontend:** HTML, CSS, JavaScript / React  
- **Backend:** Django / NodeJS / Express / Flask  
- **Database:** MySQL / PostgreSQL / SQLite  
- **Authentication:** Session / Token-based  

---
   ```bash
   git clone https://github.com/sai-snehith2002/Task-Management-System.git

## Frontend Interface

- **CustomUser Login Page**
<img width="774" height="338" alt="image" src="https://github.com/user-attachments/assets/ae5a3ec9-1c4a-497c-a4eb-54329c703b93" />

- **CustomUser Task Creation Page**
<img width="752" height="347" alt="image" src="https://github.com/user-attachments/assets/c8185fa5-b2ed-42b0-97c9-016e1aa6c4e7" />

- **CustomUser Status Page**
<img width="749" height="346" alt="image" src="https://github.com/user-attachments/assets/183aca3f-72d5-4bce-8d1d-ac80d8152911" />

- **Teams Page**
<img width="753" height="371" alt="image" src="https://github.com/user-attachments/assets/194e458a-72df-44bc-a281-4ec7dee4c63f" />

