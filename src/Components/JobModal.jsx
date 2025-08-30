
import React,{useState} from 'react';
import './JobModal.css';
import axios from 'axios';
import { X ,ArrowUpDown,IndianRupee} from "lucide-react";



const JobModal = ({ onClose, onJobCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    jobType: "",          
    minSalary: "",
    maxSalary: "",
    deadline: "",
    jobDescription: ""
  });

  const change = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const submitWithStatus = async (status) => {
    
    const payload = {
      ...formData,
      minSalary: formData.minSalary ? parseInt(formData.minSalary, 10) : null,
      maxSalary: formData.maxSalary ? parseInt(formData.maxSalary, 10) : null,
      status
    };

    try {
      await axios.post("http://localhost:5000/api/jobs", payload);
      if (onJobCreated) onJobCreated(); //  to refresh
      if (onClose) onClose();           // close modal
    } catch (err) {
      console.error(err);
      alert("Failed to save job. Check backend console.");
    }
  };

  const onPublish = (e) => {
    e.preventDefault();
    submitWithStatus("published");
  };

  const onSaveDraft = (e) => {
    e.preventDefault();
    submitWithStatus("draft");
  };

  return (
    <div className='Jobform-container'>
      <form className="job-form" onSubmit={onPublish}>
        <div className='title'><h2>Create Job Opening</h2>

<button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Job Title */}
        <div className='form-row'>
        <div className="form-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Full Stack Developer"
            value={formData.title}
            onChange={change}
            required
          />
        </div>

        {/* Company */}
        <div className="form-group">
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            name="company"
            placeholder="Amazon, Microsoft, Swiggy"
            value={formData.company}
            onChange={change}
            required
          />
        </div></div>

        {/* Location */}
        <div className='form-row'>
          <div className="form-group">
          <label htmlFor="location">Location</label>
          <select id="location" name="location" value={formData.location} onChange={change} required>
            <option value="" disabled>Choose Preferred Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Remote">Remote</option>
          </select>
        </div>

        {/* Job Type */}
        <div className="form-group">
          <label htmlFor="jobType">Job Type</label>
          <select id="jobType" name="jobType" value={formData.jobType} onChange={change} required>
            <option value="" disabled>Select Job Type</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full Time</option>
            <option value="Part-time">Part Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div></div>

        {/* Min Salary */}
        <div className='saldat'>
       <div className='form-row'> <div className="form-group">
          <label htmlFor="minSalary">Salary Range</label>
          <div className='salary-input'>
          <input
            type="number"
            id="minSalary"
            name="minSalary"
            placeholder=" 0"
            value={formData.minSalary}
            onChange={change}
            min="0"
          /></div>
        </div>

        {/* Max Salary */}
        <div className="form-group">
     
            <span> -</span>

             <div className='salary-input'>
          <input
            type="number"
            id="maxSalary"
            name="maxSalary"
            placeholder=" 12,00,000"
            value={formData.maxSalary}
            onChange={change}
            min="0"
          />
        </div></div>

        {/* Deadline */}
       <div className='deadd'><div className="form-group" id="date">
          <label htmlFor="deadline">Application Deadline</label>
          <div className='datey'><input
            type="date"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={change}
            required
          /></div>
        </div></div></div></div> 

        {/* Job Description */}
        <div className="form-group">
          <label htmlFor="jobDescription">Job Description</label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            placeholder="Please share a description to let the candidate know more about the job role"
            value={formData.jobDescription}
            onChange={change}
          />
        </div>

        {/* Actions */}
        <div className="form-actions">
          <button className="draft-btn" onClick={onSaveDraft} type="button">Save Draft</button>
          <button className="publish-btn" type="submit">Publish »</button>
        </div>
      </form>
    </div>
  );
};

export default JobModal;