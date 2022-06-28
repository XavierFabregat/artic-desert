// import axios from 'axios';
import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineGithub } from 'react-icons/ai';
import mask from '../../assets/mask.svg';
import './Welcome.css';

const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

export const Welcome: React.FC = () => {
  const client_id = '71c6863d3d338f86fe07';

  // const handleLogin = () => {
  //   axios.get(
  //     `https://github.com/login/oauth/authorize?client_id=${client_id}`,
  //   );
  // };

  return (
    <div className="wrapper">
      <div className="company-name">
        <h1 className="top"> &lt;Arctic </h1>
        <h1 className="bot"> Desert/&gt; </h1>
      </div>
      <motion.svg
        className="ades"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 372 372"
        initial="hidden"
        animate="visible"
        fill="#277197">
        <g>
          <motion.path
            variants={pathVariants}
            d="M186,0C83.439,0,0,83.439,0,186s83.439,186,186,186s186-83.439,186-186S288.561,0,186,0z M186,20
		c82.958,0,151.897,61.168,164.086,140.771l-43.497-16.99l-62.519-62.519c-1.885-1.885-4.467-2.958-7.109-2.929
		c-2.666,0.01-5.217,1.084-7.087,2.983l-44.769,45.463l-41.001-27.161c-3.775-2.501-8.76-2.152-12.151,0.85l-38.871,34.414
		l-55.204,32.723H21.024C30.207,84.698,100.684,20,186,20z M312.613,167.605H77.1l26.998-16.003c0.544-0.322,1.057-0.695,1.53-1.115
		l33.833-29.954l41.467,27.469c3.987,2.644,9.292,2.089,12.647-1.32l43.479-44.153l56.874,56.874
		c0.978,0.977,2.146,1.741,3.433,2.244L312.613,167.605z M186,352c-79.883,0-146.762-56.72-162.493-132h43.061
		c5.522,0,10-4.477,10-10s-4.478-10-10-10H20.596c-0.343-4.092-0.536-8.225-0.576-12.395h331.959
		c-0.04,4.17-0.232,8.303-0.575,12.395H236.059c-5.522,0-10,4.477-10,10s4.478,10,10,10h112.435C332.762,295.28,265.883,352,186,352
		z"
            stroke="#277197"
            strokeWidth="1"
          />
          <motion.path
            variants={pathVariants}
            d="M205.303,269h-6.595l-20.569-28.811c-2.585-3.62-7.251-5.099-11.449-3.625l-23.328,8.184l-17.192-12.723
		c-2.148-1.59-4.846-2.254-7.483-1.843c-2.641,0.41-5.007,1.86-6.571,4.026L86.988,269h-3.657c-5.522,0-10,4.477-10,10
		s4.478,10,10,10h8.735c0.009,0,0.017,0.001,0.026,0.001c0.006,0,0.011-0.001,0.017-0.001h113.194c5.522,0,10-4.477,10-10
		S210.825,269,205.303,269z M135.724,263.977c2.663,1.971,6.131,2.495,9.259,1.397l21.242-7.452L174.134,269h-62.476l10.747-14.88
		L135.724,263.977z"
            stroke="#277197"
            strokeWidth="1"
          />
          <motion.path
            variants={pathVariants}
            d="M254.058,269h-17.999c-5.522,0-10,4.477-10,10s4.478,10,10,10h17.999c5.522,0,10-4.477,10-10S259.58,269,254.058,269z"
            stroke="#277197"
            strokeWidth="1"
          />
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </motion.svg>
      <div className="main-title">
        <h1>Where Teams Build Software.</h1>
      </div>
      <div className="login-button">
        <a
          className="a-tag"
          href={`https://github.com/login/oauth/authorize?client_id=${client_id}`}>
          <span>Login with GitHub</span>
        </a>
        <AiOutlineGithub fontSize="45px" />
      </div>
      <img className="mask" src={mask} alt="" />
    </div>
  );
};
