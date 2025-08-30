// import { useState } from 'react'
// import React from 'react'
// import Navbar from './Components/Navbar'
// import Searchfilters from './Components/Searchfilters'

// import Joblist from './Components/Joblist'


// function App() {


//   return (
//    <> <div className='header-section'>
//    <Navbar/>
//     <Searchfilters /></div>
//      <Joblist />
//     </> 
//   )
// }

// export default App
import { useState } from 'react'
import React from 'react'
import Navbar from './Components/Navbar'
import Searchfilters from './Components/Searchfilters'
import Joblist from './Components/Joblist'
import JobModal from './Components/JobModal'
 

function App() {
  const [showJobForm, setShowJobForm] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const handleJobCreated = () => {
    setRefresh(r => r + 1);
    setShowJobForm(false);
  };
  const [filters, setFilters] = useState({
    searchText: "",
    location: "Preferred Location",
    jobtype: "Job Type",
    salary: [50000, 80000],
  });


  return (
    <>
      <div className='header-section'>
        <Navbar onCreateJobClick={() => setShowJobForm(true)} />
        <Searchfilters  filters={filters} setFilters={setFilters}/>
      </div>

      <Joblist filters={filters} refresh={refresh} />

      {showJobForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <JobModal
              onClose={() => setShowJobForm(false)}
              onJobCreated={handleJobCreated}
            />
            <button className="modal-close" onClick={() => setShowJobForm(false)}>✖</button>
          </div>
        </div>
      )}
    </>
  )
}

export default App