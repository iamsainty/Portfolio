# Hey Sainty - Portfolio

## Project Overview

Hey Sainty is a portfolio website designed to showcase my skills, projects, and works. The portfolio includes detailed sections about me, my skills, projects, certifications, education, experience, blogs, and more.

## Main Features

- **About Me:** Information about my background and professional journey.
- **Skills:** A comprehensive list of technical and soft skills.
- **Projects:** Showcase of my significant projects with descriptions and links.
- **Certifications:** List of certifications I have achieved.
- **Education:** Details of my educational background.
- **Experience:** Professional experience and roles I have undertaken.
- **Blogs:** My blog posts filtered by tags and categories.
- **Contact:** Multiple ways to reach out to me.

## Technologies Used

This portfolio is built using the MERN stack:

- **Frontend:** React, React Router, React Bootstrap, styled-components
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Other Libraries:** Various libraries and packages for enhanced functionality

## Setup Instructions

To run this project locally, follow these steps:

1. **Clone the repository:**
    ```sh
    git clone https://github.com/iamsainty/portfolio.git
    cd portfolio
    ```

2. **Install frontend dependencies:**
    ```sh
    cd client
    npm install
    ```

3. **Install backend dependencies:**
    ```sh
    cd ../server
    npm install
    ```

4. **Set up environment variables:**
    Create a `.env` file in the `server` directory with the following content:
    ```
    MONGODB_URI=your_mongodb_connection_string
    PORT=your_server_port
    ```

5. **Run the development server:**
    ```sh
    cd ../client
    npm start
    cd ../server
    npm run dev
    ```

## Usage

The portfolio has top and bottom navigation bars to smoothly switch between pages:

- **Home:** Overview of the portfolio.
- **About:** Detailed information about me.
- **Skills:** List of skills.
- **Projects:** Description of projects with links.
- **Certifications:** List of certifications.
- **Education:** Educational background.
- **Experience:** Professional experience.
- **Blogs:** Blog posts filtered by tags.
- **Contact:** Various methods to get in touch.

## Deployment

The portfolio is hosted with:

- **Backend:** Vercel
- **Frontend:** Firebase

To deploy updates:

1. **Frontend:**
    ```sh
    npm run build
    firebase deploy
    ```

2. **Backend:**
    ```sh
    vercel --prod
    ```

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.

## Seeking Feedback

I am seeking help and feedback from the developer community to improve my portfolio. Any suggestions or improvements are appreciated!

## Contact

You can reach out to me through the contact section on my [homepage](https://hey-sainty.web.app). Alternatively, you can connect with me on:

- **LinkedIn:** [iamsainty](https://linkedin.com/in/iamsainty)
- **GitHub:** [iamsainty](https://github.com/iamsainty)
- **Instagram:** [iam__sainty](https://instagram.com/iam__sainty)
- **X (Twitter):** [iam__sainty](https://twitter.com/iam__sainty)
