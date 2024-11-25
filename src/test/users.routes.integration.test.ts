import fetch from 'node-fetch';
import { describe, it, expect } from '@jest/globals';

const baseUrl = 'http://localhost:3000/api/users';

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NzQ0ZGFjODliNTFkZGE0OWVjZDI5ZWUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MzI1NjU3MDQsImV4cCI6MTczMjU2OTMwNH0.sVTJQNbhf3knds1nacuqhFcqFvdJa7zagJIS9mSTnJY";
describe('User Routes Integration Tests', () => {

  it('should fetch all users', async () => {
    const response = await fetch(baseUrl, { method: 'GET'
    ,headers : {"Content-Type" : "application/json"},
     });
    const users = await response.json();
    console.log('Users:', users);
    expect(response.status).toBe(200);
    expect(Array.isArray(users)).toBe(true);
  },100000);

 
  it('should create a new user', async () => {
    const newUser = {
      name: 'Test User',
      email: "testuseriiq@example.com",
      password: 'password123',
      role: 'admin'
    };
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser)
    });
    const result = await response.json();
    console.log("reff",result);
    expect(response.status).toBe(400);
    expect(result).toHaveProperty('message');
  },100000);

  it('allow us', async () => {
       const project = { 
      name : "New Project",
      description : "A new project description",
           completion : 0,
           isFavorite : false
     };
    const response = await fetch("http://localhost:3000/api/createProjectForUser/?userId=6744d3579b51dda49ecd29e8", { 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project)
    });
    const result = await response.json();
    console.log("dbre", result)
    expect(response.status).toBe(200);
   
  },100000);

    it('should get all projects created by a user', async () => {
    const response = await fetch("http://localhost:3000/api/createProjectForUser/?userId=6744d3579b51dda49ecd29e8", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const project = await response.json();
    console.log("project",project);
  },100000);



  it('should add a user to a project', async () => {
    const req = {
      projectId : "6744eac69b51dda49ecd2a00"
    }
    const response = await fetch("http://localhost:3000/api/createProjectForUser/?id=6744dac89b51dda49ecd29ee", { 
      method: 'PUT',
      body: JSON.stringify(req)
    });
    const result = await response.json();
    console.log("dbre", result)
  },100000);


  it ('should get all users in a project', async () => {
    const response = await fetch("http://localhost:3000/api/getUsersInProject/?id=6744eac69b51dda49ecd2a00", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const users = await response.json();
    console.log("users",users);
  },100000);
    });


