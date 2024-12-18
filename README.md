# My Family

## Getting Started

- run `npm install` to install dependencies
- run `npm run dev` to run application

## Project Plan

### **Week 1: Backend and Database Foundations**

| Day | Task                     | Details                                                                                                                                                                                                                                                                                                                                                                                          | Tools/Technologies                              |
| --- | ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------- |
| 1   | **Project Setup**        | - Set up Node.js and Express app.<br>- Add TypeScript for type safety.<br>- Initialize PostgreSQL with a database schema.<br>- Install key libraries like bcrypt, jsonwebtoken, etc.                                                                                                                                                                                                             | Node.js, Express, PostgreSQL, TypeORM/Sequelize |
| 2   | **Authentication**       | - Build register, login, logout APIs.<br>- Use bcrypt for hashing passwords.<br>- JWT for session management.<br>- Add request validation (e.g., express-validator).                                                                                                                                                                                                                             | bcrypt, JWT, express-validator                  |
| 3   | **Database Design**      | - Build schemas for Users, Families, Events, Memories:<br>&nbsp;&nbsp;- **Users**: id, email, password, created_at.<br>&nbsp;&nbsp;- **Families**: id, name, created_by, created_at.<br>&nbsp;&nbsp;- **Connections**: id, family_id, related_family_id, relation.<br>&nbsp;&nbsp;- **Events**: id, title, family_id, date.<br>&nbsp;&nbsp;- **Memories**: id, file_url, family_id, uploaded_by. | PostgreSQL, TypeORM/Sequelize                   |
| 4   | **Family Tree API**      | - Build routes to create, retrieve, and connect families.<br>- Example endpoints:<br>&nbsp;&nbsp;POST `/api/families` (create family)<br>&nbsp;&nbsp;POST `/api/families/connect` (connect two families).                                                                                                                                                                                        | RESTful API in Node.js                          |
| 5   | **Event Management API** | - Build endpoints for creating events.<br>- Example endpoints:<br>&nbsp;&nbsp;POST `/api/events` (add event)<br>&nbsp;&nbsp;GET `/api/events` (list events by family).                                                                                                                                                                                                                           | Node.js, Express                                |
| 6   | **AWS S3 Integration**   | - Configure file uploads for memories.<br>- Use Multer to handle uploads.<br>- Store files in S3 and return URLs.                                                                                                                                                                                                                                                                                | AWS S3, Multer                                  |
| 7   | **SQS Integration**      | - Set up SQS to notify family members when events or memories are added.<br>- Example: “Alice uploaded a photo for [Birthday Party].”                                                                                                                                                                                                                                                            | AWS SQS                                         |

---

### **Week 2: Frontend and Deployment**

| Day | Task                          | Details                                                                                                                                                                  | Tools/Technologies          |
| --- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- |
| 8   | **Frontend Initialization**   | - Set up React app with Vite.<br>- Configure Tailwind CSS for styling.<br>- Set up basic routing with React Router.                                                      | React, Vite, Tailwind CSS   |
| 9   | **Authentication UI**         | - Create pages for register, login, and logout.<br>- Integrate with backend APIs.                                                                                        | React, Axios                |
| 10  | **Family Tree Visualization** | - Build a dynamic family tree component.<br>- Use animations to expand/collapse branches.<br>- Render data from the Family Tree API.                                     | React, Framer Motion or SVG |
| 11  | **Event Management UI**       | - Add forms to create and view events.<br>- Use permissions to control visibility.                                                                                       | React, Tailwind CSS         |
| 12  | **Memories UI**               | - Add a photo/video gallery page.<br>- Allow uploading files tied to families.<br>- Use S3 URLs to display memories.                                                     | React, Axios                |
| 13  | **Notifications UI**          | - Display family notifications from SQS messages (e.g., new memory or event added).<br>- Use a notification dropdown or toast messages.                                  | React, AWS SDK              |
| 14  | **Deployment**                | - Deploy backend and database to a cloud provider (e.g., AWS or Heroku).<br>- Deploy frontend to Vercel or Netlify.<br>- Configure environment variables for production. | AWS EC2/RDS, Vercel/Netlify |

### Extra

- Setup alerts/reminders to update JWT secret/database passwords
- Setup envvars in production
- crash alerts
- document database setup
- swagger/openapi
- cleanup types
- sql injections
- move queries to db folder??
