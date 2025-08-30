import React from 'react';
import './header.css';
import {useState} from 'react';
import { Search,MapPin,Users} from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'
            
import searchicon from '../assets/search.png'




function Searchfilters({ filters, setFilters }) {
  return (
    <div className='search-box'>
      <div className='filter'>
        <Search size={18} className="filter-icon"/>
        <input
          type='text'
          placeholder='Search By Job Title, Role'
          className='filter-input'
          value={filters.searchText}
          onChange={e => setFilters({ ...filters, searchText: e.target.value })}
        />
      </div>

      <div className='divide'></div>

      <div className='filter'> 
        <MapPin size={18} className="filter-icon"/>
        <select
          className='filter-select'
          value={filters.location}
          onChange={e => setFilters({ ...filters, location: e.target.value })}
        >
          <option value="Preferred Location">Preferred Location</option>
          <option value="chennai">Chennai</option>
          <option value="bangalore">Bangalore</option>
          <option value="remote">Remote</option>
        </select>
      </div>

      <div className='divide'></div>

      <div className='filter'>
        <Users size={18} className='filter-icon'/>
        <select
          className='filter-select'
          value={filters.jobtype}
          onChange={e => setFilters({ ...filters, jobtype: e.target.value })}
        >
          <option value="Job Type">Job Type</option>
          <option value="Internship">Internship</option>
          <option value="fulltime">Full Time</option>
          <option value="parttime">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      <div className='divide'></div>

      <div className='salary-filter'> 
        <div className='salary-header'> 
          <span>Salary Per Month</span>
          <span className='salary-value'>
            ₹{filters.salary[0]/1000}k - ₹{filters.salary[1]/1000}k
          </span>
        </div>
        <Slider
          range
          min={50000}
          max={100000}
          step={5000}
          value={filters.salary}
          onChange={value => setFilters({ ...filters, salary: value })}
          className='filter-range'
        />
      </div>
    </div>
  );
}

export default Searchfilters