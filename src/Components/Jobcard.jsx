

import React from "react";
import './Jobcard.css';
import { UserPlus, Layers, X } from 'lucide-react';
import { useEffect } from "react";
import axios from "axios";

export const Jobcard = ({ job, onDelete }) => {
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/jobs/${job.id}`);
  //     if (onDelete) onDelete(job.id);
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to delete job.");
  //   }
  // };

  return (
    <div className="cards">
      <div className={`job-card ${job.isBackend ? 'new-job' : ''}`} >
        <div className="job-card-header">
          <div className="img-box">
            <img src={job.companyLogo} alt="" className="company-logo"/>

            
          </div>
          <span className="posted-time">{job.postedAgo}</span>

          {/* Show delete button ONLY for backend jobs (not dummy) */}
          {/* {job.isBackend && (
            <button className="close-btn" onClick={handleDelete}>
              <X size={18} />
            </button>
          )} */}
        </div>

        <div className="job-title">
          <h3 className="job-title">{job.title}</h3>
        </div>

        <div className="job-meta">
          <div className="exp"> 
            <UserPlus size={18} className="user"/>
            <span>{job.experience}</span>
          </div>
          <div className="type">
            <img size={18} src="src/assets/Build.png" className="buil"/>
            <span>{job.jobType}</span>
          </div>
          <div className="sal"> 
            <Layers size={16} className="layer"/>
            <span>{job.salary}</span>
          </div>
        </div>

        <div className="job-desc">
          <ul>
            <li>A user-friendly interface lets you browse stunning photos and videos</li>
            <li>Filter destinations based on interests and travel style, and create personalized </li>
          </ul>
        </div>

        <div className="btn-container">
          <button className="apply-btn">Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default Jobcard;
