const request = require('supertest');
const { createUser } = require('../server/controllers/userController');
const db = require('../server/models/jobHunterModels');
const { mocked } = require(`jest-mock`)
const bcrypt = require('bcrypt')
jest.mock('bcrypt')
jest.mock('../server/models/jobHunterModels');

//const mockConnection = mocked(db);

const server = 'http://localhost:3000';

describe('User Creation', () => {
  describe('POST', () => {
      it('should create a new user', async () => {
        const DB = await { query: jest.fn() } 
        const repository = { }
      })
    //   const mockDB = {
    //     query: jest.fn().mockResolvedValueOnce(''),
    //   };
    //   mockConnection.mockReturnValueOnce(mockDB);

    //   const { app } = require('../server');
    //   await request(app)
    //     .post('/user/signup')
    //     .send({       
    //       body: {
    //         username: 'nhat10',
    //         password: '1234'
    // }})
    //     .expect(200)
    
      
      // const mockRequest = {
        // body: {
        //   username: 'nhat10',
        //   password: '1234'
        
      // };

      // const mockResponse = {
      //   locals: {},
      //   send: jest.fn(),
      //   status: jest.fn()
      // };

      // const mockNext = jest.fn();

      // await createUser(mockRequest, mockResponse, mockNext)
      // expect(mockNext).toHaveBeenCalledTimes(1)
  })
})

describe('Nhat - User Creation', () => {

  let mockRequest, mockResponse, mockNext;

  beforeEach(() => {
    // Mock request object
    mockRequest = {
      body: {
        username: 'testUser',
        password: 'testPassword'
      }
    };

    // Mock response object
    mockResponse = {
      locals: {},
      status: jest.fn(() => mockResponse),
      send: jest.fn()
    };

    // Mock next function
    mockNext = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('POST', () => {
    it('should create a new user', async () => {
      bcrypt.hash.mockImplementationOnce((password, saltOrRounds) => Promise.resolve('hashedPassword'));
      db.query.mockResolvedValueOnce({ rows: [{id: 1, username: 'testUser', password: 'hashedPassword'}]})
      await createUser(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockNext).toHaveBeenCalled();
    })
  })
})