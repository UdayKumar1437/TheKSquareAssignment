const { PORT } = require('../utils');
const route = require('express').Router();
const users = require('../db.json').users;

route.get('/getUsers', (req, res) => {
    console.log('Received GET request to /getUsers');

    // Log the request query parameters to check if they are received or not
    console.log('Request Query Params:', req.query);

    // Get query params and parse them to integers Default to 1 and 2
    let { sort, page = 1, size = 2 } = req.query;

    const pageInt = parseInt(page);
    const sizeInt = parseInt(size);

    // Added for Debugging
    console.log('Parsed Page:', pageInt, 'Parsed Size:', sizeInt);

    const startIndex = (pageInt - 1) * sizeInt;
    const endIndex = startIndex + sizeInt;
    // Added for Debugging
    console.log('Calculated Start Index:', startIndex, 'Calculated End Index:', endIndex);

    let paginatedUsers = users.slice(startIndex, endIndex);
    console.log('Paginated Users:', paginatedUsers); // Debugging

    // Sorting logic (dynamically sorting by any field)
    if (sort) {
        const sortField = sort.trim().toLowerCase();
        paginatedUsers = paginatedUsers.sort((a, b) => {
            if (a[sortField] < b[sortField]) return -1;
            if (a[sortField] > b[sortField]) return 1;
            return 0;
        });
        console.log('Sorted Paginated Users:', paginatedUsers);
    }

    // Pagination info
    const totalResults = users.length;
    const previousPage = pageInt > 1 ? `http://localhost:${PORT}/getUsers?page=${pageInt - 1}&size=${sizeInt}` : null;
    const nextPage = endIndex < totalResults ? `http://localhost:${PORT}/getUsers?page=${pageInt + 1}&size=${sizeInt}` : null;

    // Added for Debugging
    console.log('Previous Page:', previousPage);
    console.log('Next Page:', nextPage);

    // Send response
    res.json({
        data: paginatedUsers,
        paging: {
            previous: previousPage,
            next: nextPage,
            totalResults
        }
    });
});

module.exports = route;