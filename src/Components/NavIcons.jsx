import React from 'react';
import { Link } from 'react-router-dom';
import { CheckSquareOutlined, SolutionOutlined } from '@ant-design/icons';
import { GithubOutlined } from '@ant-design/icons';

const NavIcons = () => {
  return (
    <ul className="list-unstyled d-flex flex-column pl-4 position-absolute">
      <li>
        <Link to="/" className="nav-icon-link d-flex align-items-center">
          <div className="icon-container" style={{backgroundColor: "#F4F8D3"}}>
            <CheckSquareOutlined/>
          </div>
          <span className="icon-text">PlanIt</span>
        </Link>
      </li>
      <li>
        <Link to="/about" className="nav-icon-link d-flex align-items-center">
          <div className="icon-container bg-primary">
            <SolutionOutlined  className="text-white" />
          </div>
          <span className="icon-text">About</span>
        </Link>
      </li>
      <li>
        <a 
          href="https://www.linkedin.com/in/huzaifabinshahid/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-icon-link d-flex align-items-center"
        >
          <div className="icon-container bg-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </div>
          <span className="icon-text">LinkedIn</span>
        </a>
      </li>
      <li>
        <a 
          href="https://github.com/HuzaifaBinShahid" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="nav-icon-link d-flex align-items-center"
        >
          <div className="icon-container" style={{ backgroundColor: '#333' }}>
            <GithubOutlined className="text-white" />
          </div>
          <span className="icon-text">GitHub</span>
        </a>
      </li>
    </ul>
  );
};

export default NavIcons;