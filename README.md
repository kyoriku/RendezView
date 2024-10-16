# RendezView
*An event planner app that allows users to browse, create, edit, and delete events.*

## Table of Contents
- [Description](#description)
  - [Features](#features)
  - [Purpose and Goals](#purpose-and-goals)
- [Screenshots](#screenshots)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Setup](#setup)
  - [Usage](#usage)
- [Roadmap](#roadmap)
- [Questions](#questions)
  - [Developers](#developers)
  - [Deployed App](#deployed-app)
- [License](#license)

## Built With
[![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![jQuery](https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white)](https://jquery.com/)
[![Handlebars](https://img.shields.io/badge/Handlebars%20js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black)](https://handlebarsjs.com/)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](https://sequelize.org/)

## Description
**RendezView** is an event planner app designed to simplify event organization for individuals, event planning companies, venue owners, and vendors. It provides a centralized platform where users can discover, create, and manage events through an intuitive interface. Attendees can track their upcoming events, RSVPs, and interactions via personalized dashboards.

The app is especially useful for newcomers to a city, offering an accessible way to explore local events and foster social connections. **RendezView** also benefits businesses by allowing them to showcase their services and connect with potential clients, enhancing visibility within the event planning market.

Whether for personal or professional use, **RendezView** streamlines event planning, making it efficient and enjoyable for all users.

### Features
- **Browse and Create Events:** Users can explore and create events with a flexible form that supports any venue or address.
- **RSVP Functionality:** Logged-in users can RSVP to events, helping hosts manage attendance.
- **Modify Event Details:** Event creators can update information while users can adjust their RSVP status.
- **Personalized Dashboards:** Users manage events they’ve created through a dashboard, while attended events are tracked separately for convenience.

### Purpose and Goals
**RendezView** aims to simplify event planning and attendance, fostering community connections and streamlining logistics. It also empowers businesses by expanding their reach and visibility.

## Screenshots
![homepage](./public/images/rendezview-homepage.png)
![events](./public/images/rendezview-events.png)
![event-details](./public/images/rendezview-event-details.png)
![profile](./public/images/rendezview-profile.png)
![edit-event](./public/images/rendezview-edit-event.png)

## Installation
To install and run **RendezView** locally, follow these steps:

### Prerequisites
Make sure you have the following installed on your machine:
- **[Node.js](https://nodejs.org/en/)** (v14 or higher)
- **[MySQL](https://www.mysql.com/)** (for the database)
- **[Git](https://git-scm.com/)** (optional, but recommended for cloning the repository)


### Setup
1. Clone the repository to your local machine using Git:
   ```bash
   git clone https://github.com/kyoriku/RendezView.git
   ```

2. Navigate to the project directory:
   ```bash
   cd RendezView
   ```

3. Install the required dependencies:
   ```bash
   npm install
   ```

4. Create a .env file in the root directory and add the following variables:
   ```bash
   DB_NAME='rendezview_db'
   DB_USER='your_username'  # Replace with your MySQL username
   DB_PASSWORD='your_password'  # Replace with your MySQL password
   SESSION_SECRET='your_session_secret'  # Replace with your Session Secret
   ```

5. Make sure that your MySQL server is running. Create the database as specified in the .env file. You can do this using a MySQL client or command line:
   ```bash
   CREATE DATABASE rendezview_db;
   ```

6. If you want to add initial data to the database, run the seed script:
   ```bash
   npm run seed
   ```

### Usage:
1. To start the application, run: 
   ```bash
   npm start
   ```

   For development mode, use:
   ```bash
   npm run dev
   ```

2. Once the server is running, you can access the app by navigating to http://localhost:3001 in your browser.

## Roadmap
Future developments for **RendezView** include:
- [ ] **Create Restricted Events**: Events accessible only to invited users and private groups.
- [ ] **Ability to send out invites**: Hosts can invite specific users and co-hosts.
- [ ] **Role Selection in the App**: Different roles (manager, vendor, user) with varying functionalities.
- [ ] **Customizable Color Themes**: Templated options for party planning companies to match their branding.

## Questions
If you have any inquiries, feel free to reach out to the developers:

### Developers:
- **Austin Graham**  
  - GitHub: [kyoriku](https://github.com/kyoriku)  
  - Email: [devkyoriku@gmail.com](mailto:devkyoriku@gmail.com)

- **Kevin Quach**  
  - GitHub: [quachies](https://github.com/quachies)  
  - Email: [quachies@gmail.com](mailto:quachies@gmail.com)

- **Harry MacMillan**  
  - GitHub: [harrymac1972](https://github.com/harrymac1972)  
  - Email: [harrymac1972@gmail.com](mailto:harrymac1972@gmail.com)

- **Tiffany Chan**  
  - GitHub: [tchan128](https://github.com/tchan128)  
  - Email: [tchan12899@gmail.com](mailto:tchan12899@gmail.com)

### Deployed App:
[RendezView on Heroku](https://rendezviews-6983bdd1f9ce.herokuapp.com)

## License
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&logo=mit)](https://opensource.org/licenses/MIT)

This project is licensed under the [MIT](https://opensource.org/licenses/MIT) license - see the LICENSE file for details.