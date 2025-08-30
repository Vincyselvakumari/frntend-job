


import React, { useEffect, useState } from "react";
import Jobcard from "../Components/Jobcard";
import "./Jobcard.css";
import amazonLogo from '../assets/amazonlogo.png';
import teslaLogo from '../assets/teslalogo.png';
import swiggyLogo from '../assets/swiggylogo.png';
import axios from "axios";

const Joblist = () => {
  const [jobs, setJobs] = useState([]);
  const [newJobs, setNewJobs] = useState([]); 
  const [filters, setFilters] = useState({
    searchText: "",
    location: "",
    jobtype: "",
    salary: [0, 1000000],
  });

  const handleDeleteJob = (id) => {
    setNewJobs(prev => prev.filter(job => job.id !== id));
  };

  const filterJobs = (jobs, { searchText, location, jobtype, salary }) => {
    return jobs.filter(job => {
      // title/role filter
      const matchesText = searchText
        ? job.title.toLowerCase().includes(searchText.toLowerCase())
        : true;

      // location filter
      const matchesLocation =
        location && location !== "Preferred Location"
          ? job.company.toLowerCase().includes(location.toLowerCase())
          : true;

      // job type filter
      const matchesJobtype =
        jobtype && jobtype !== "Job Type"
          ? job.jobType.toLowerCase() === jobtype.toLowerCase()
          : true;

      // salary filter (only works for backend jobs where min/max are present)
      let matchesSalary = true;
      if (job.minSalary && job.maxSalary) {
        matchesSalary =
          job.minSalary >= salary[0] && job.maxSalary <= salary[1];
      }

      return matchesText && matchesLocation && matchesJobtype && matchesSalary;
    });
  };

  useEffect(() => {
    // your dummy jobs remain as is
    setJobs([
      {
        id: 1,
        title: "Full Stack Developer",
        company: "Amazon",
        companyLogo: amazonLogo,
        jobType: "Onsite",
        experience: "1-3 yr Exp",
        salary: "12LPA",
        postedAgo: "24h Ago",
      },
      {
        id: 2,
        title: "Node Js Developer",
        company: "Tesla",
        companyLogo: teslaLogo,
        jobType: "Onsite",
        experience: "1-3 yr Exp",
        salary: "12LPA",
        postedAgo: "24h Ago",
      },
      {
        id: 3,
        title: "UX/UI Designer",
        company: "Swiggy",
        companyLogo: swiggyLogo,
        jobType: "Onsite",
        experience: "1-3 yr Exp",
        salary: "12LPA",
        postedAgo: "24h Ago",
      },
      {
        id: 4,
        title: "Full Stack Developer",
        company: "Amazon",
        companyLogo: amazonLogo,
        jobType: "Onsite",
        experience: "1-3 yr Exp",
        salary: "12LPA",
        postedAgo: "24h Ago",
      },
      {
        id: 5,
        title: "Node Js Developer",
        company: "Tesla",
        companyLogo: teslaLogo,
        jobType: "Onsite",
        experience: "1-3 yr Exp",
        salary: "12LPA",
        postedAgo: "24h Ago",
      },
      {
        id: 6,
        title: "UX/UI Designer",
        company: "Swiggy",
        companyLogo: swiggyLogo,
        jobType: "Onsite",
        experience: "1-3 yr Exp",
        salary: "12LPA",
        postedAgo: "24h Ago",
      },
      {
        id: 7,
        title: "Full Stack Developer",
        company: "Amazon",
        companyLogo: amazonLogo,
        jobType: "Onsite",
        experience: "1-3 yr Exp",
        salary: "12LPA",
        postedAgo: "24h Ago",
      },
      {
        id: 8,
        title: "Node Js Developer",
        company: "Tesla",
        companyLogo: teslaLogo,
        jobType: "Onsite",
        experience: "1-3 yr Exp",
        salary: "12LPA",
        postedAgo: "24h Ago",
      },
    ]);
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/jobs");
        // Map backend jobs to match dummy job card fields
        const mapped = res.data.map(job => ({
          id: job.id,
          title: job.title,
          company: job.company,
          companyLogo: amazonLogo, 
          jobType: job.jobType || "Onsite",
          experience: "1-3 yr Exp", // placeholder since DB doesn't have it
          salary: job.minSalary && job.maxSalary 
                    ? `₹${job.minSalary} - ₹${job.maxSalary}`
                    : "Not specified",
          postedAgo: "Just Now",
          isBackend: true,
        }));
        setNewJobs(mapped); 
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };
    fetchJobs();
  }, []);

  const allJobs = [...newJobs, ...jobs];
  const filteredJobs = filterJobs(allJobs, filters);

  return (
    <div className="job-list">
      <div className="job-row" id="top-row">
        {filteredJobs.slice(0, 4).map((job) => (
          <Jobcard key={job.id} job={job} onDelete={job.isBackend ? handleDeleteJob : undefined}/>
        ))}
      </div>

      <div className="job-row">
        {filteredJobs.slice(4, 8).map((job) => (
          <Jobcard key={job.id} job={job} onDelete={job.isBackend ? handleDeleteJob : undefined} />
        ))}
      </div>
    </div>
  );
};

export default Joblist;