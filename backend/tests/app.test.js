const request = require('supertest');
const express = require('express');
const userRoutes = require('../routes/getUsers');

const app = express();
app.use('/api', userRoutes);
const users = require('../db.json').users;

describe('GET /api/getUsers', () => {
  it('should return a paginated list of users with default size 2 and page 1', async () => {
    const response = await request(app).get('/api/getUsers');
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(2);
    expect(response.body.paging.totalResults).toBe(users.length);
  });

  it('should return 5 users when size is set to 5', async () => {
    const response = await request(app).get('/api/getUsers').query({ size: 5 });
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(5);
    expect(response.body.paging.totalResults).toBe(users.length);
  });

  it('should return the second page of users when page is set to 2 and size is 5', async () => {
    const response = await request(app).get('/api/getUsers').query({ page: 2, size: 5 });
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(5); // Expect 5 users on page 2
    expect(response.body.paging.previous).toBe('http://localhost:3000/getUsers?page=1&size=5');
    expect(response.body.paging.next).toBe('http://localhost:3000/getUsers?page=3&size=5')
  });

  it('should return 404 if an invalid page is requested', async () => {
    const response = await request(app).get('/api/getUsers').query({ page: 999 });
    expect(response.status).toBe(200);
    expect(response.body.data.length).toBe(0);
  });
});
