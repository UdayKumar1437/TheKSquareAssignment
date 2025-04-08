import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DenseTable from './Components/Table';
import { Button } from '@mui/material';
import TypographyTheme from './Components/Heading';
import PageSelector from './Components/PageSelector';
import {pageNumbersGenerate} from './utils';

function App() {

  // State variables
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(2);
  const [sort, setSort] = useState('id');
  const [paging, setPaging] = useState({ previous: null, next: null, totalResults: 0 });

  // Function to fetch users data
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/getUsers`, {
        params: { page, size, sort }
      });
      // Update state
      setUsers(response.data.data);
      setPaging(response.data.paging);
    } catch (error) {
      // Handle error
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users whenever page, size, or sort changes
  useEffect(() => {
    fetchUsers();
  }, [page, size, sort]);

  // Pagination button click handlers
  const handlePrevious = () => {
    if (paging.previous) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (paging.next) {
      setPage(page + 1);
    }
  };

  // Generate page numbers dynamically
  const pageNumbers = pageNumbersGenerate(Math.ceil(paging.totalResults / size))
 

  // Handle size change and reset page
  const handleSizeChange = (e) => {
    console.log(e.target.value);
    setSize(e.target.value);
    setPage(1); // Reset page to 1 whenever page size changes
  };

  return (
    <div className="App">
      <TypographyTheme Text="Users List" />
      {/* Page Size Selector */}
      <PageSelector size={size} handleSizeChange={handleSizeChange} />
      {/* Table */}
      <DenseTable rows={users} sort={setSort} />

      {/* Pagination Controls */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px' }}>
        {/* Previous Page Button */}
        <div>
          <Button
            variant='outlined'
            disabled={!paging.previous}
            onClick={handlePrevious}
          >
            Previous
          </Button>

          {/* Page Numbers */}
          <div style={{ display: 'inline-block', margin: '0 10px' }}>
            {pageNumbers.map((number) => (
              <Button
                variant='outlined'
                key={number}
                onClick={() => setPage(number)}
                style={{
                  margin: '0 5px',
                  color: page === number ? 'blue' : 'black',
                  fontWeight: page === number ? 'bold' : 'normal', // Highlight current page
                }}
              >
                {number}
              </Button>
            ))}
          </div>

          {/* Next Page Button */}
          <Button
            variant='outlined'
            disabled={!paging.next}
            onClick={handleNext}
          >
            Next
          </Button>
        </div>
        <p>Total Results: <span style={{ fontWeight: 'bold' }}>{paging.totalResults}</span></p>
      </div>
    </div>
  );
}

export default App;
