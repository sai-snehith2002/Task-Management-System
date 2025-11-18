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
