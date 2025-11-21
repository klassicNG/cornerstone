# Cornerstone: Active Recovery Platform

## 🏛️ Mission

Cornerstone is an active recovery platform designed to replace addiction with structure. Unlike passive trackers that focus on avoidance (counting days), Cornerstone focuses on construction (building a life). It combines daily scheduling, habit formation, and spiritual grounding to help men build a life of purpose.

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Vercel Postgres
- **Auth:** NextAuth.js (v5)

## 📋 MVP Features (v0.1)

1.  **User Identity:** Secure login to keep recovery data private.
2.  **Daily Structure:** A "Today's Plan" dashboard to visualize the day's mission.
3.  **Active Task Management:** Ability to add tasks with categories (Faith, Skill, Fitness).
4.  **Visual Progress:** A simple mechanism to complete tasks and visualize daily wins.
5.  **The Foundation:** A "Streak/Consistency" counter based on task completion, not just abstinence.

## 🗄️ Database Schema (MVP)

### Users Table

| Column     | Type    | Notes       |
| :--------- | :------ | :---------- |
| `id`       | UUID    | Primary Key |
| `name`     | VARCHAR |             |
| `email`    | VARCHAR | Unique      |
| `password` | VARCHAR | Hashed      |

### Tasks Table

| Column     | Type    | Notes                               |
| :--------- | :------ | :---------------------------------- |
| `id`       | UUID    | Primary Key                         |
| `user_id`  | UUID    | Foreign Key (Links to Users)        |
| `title`    | VARCHAR | The task description                |
| `status`   | VARCHAR | 'pending' or 'completed'            |
| `category` | VARCHAR | 'faith', 'fitness', 'skill', 'work' |
| `date`     | DATE    | The scheduled date                  |
