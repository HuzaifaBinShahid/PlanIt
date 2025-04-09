import React from "react";

const About = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 my-5 flex-column  px-4">
      <p>
        📝 <strong className="text-warning">PlanIt</strong> is a modern <strong>to-do list app</strong>{" "}
        built with the powerful <strong  className="text-warning">MERN stack</strong> (📦 MongoDB, ⚙️
        Express.js, ⚛️ React, and 🖥️ Node.js), launched in{" "}
        <strong  className="text-warning">April 2025</strong> 🚀.
        <br />
        What started as a simple idea is now{" "}
        <strong>growing day by day</strong> with 🔁 new features and smart
        upgrades.
      </p>

      <p>
        🌟 Designed for performance and ease of use, <strong>PlanIt</strong>{" "}
        helps users stay organized with a clean UI and responsive UX. The
        roadmap includes exciting features like:
      </p>

      <ul className="text-start">
        <li>⏰ Task Reminders</li>
        <li>📌 Priority Marking</li>
        <li>🤝 Collaborative Lists</li>
        <li>📊 Smart Insights &amp; Stats</li>
      </ul>

      <p>
        🧠 The goal is to create more than just a to-do app — it's a{" "}
        <strong>smart productivity companion</strong> that evolves with your
        needs.
        <br />
        I'm passionate about pushing this project further 💪 and would love to
        see it grow with community ideas, feedback, and maybe even a few
        awesome contributors 🛠️💬.
      </p>

      <p  className="text-warning">Let's build something cool together! 🚧✨</p>
    </div>
  );
};

export default About;
