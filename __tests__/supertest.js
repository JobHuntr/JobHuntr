const request = require('supertest');
const { createUser } = require('../server/controllers/userController');
const db = require('../server/models/jobHunterModels');
const { mocked } = require(`jest-mock`)
const bcrypt = require('bcrypt')
// jest.mock('bcrypt')
// jest.mock('../server/models/jobHunterModels');

//const mockConnection = mocked(db);

const server = 'http://localhost:3000';

describe('User Creation', () => {
  const newUser = {
    username: 'testusername1',
    password: 'testpassword'
  }
  afterAll( async () => {
    await db.query('DELETE FROM "users" WHERE username = $1', [newUser.username])
  })

  describe('POST to /user/signup', () => {
    it('should create a new user', async () => {
      return await request(server)
        .post('/user/signup')
        .send(newUser)
        .expect(200)
    })
    describe('create User', () => {
      it('check if entry was added to DB', async () => {
        const result = await db.query('SELECT * FROM "users" WHERE username = $1', [newUser.username]);
        expect(result.rows[0].username).toBe(newUser.username);
      })
      it('check if password has been hashed', async () => {
        const result = await db.query('SELECT * FROM "users" WHERE username = $1', [newUser.username]);
        expect(result.rows[0].password).not.toBe(newUser.password)
      })
      it('should not create duplicate', async () => {
      return await request(server)
        .post('/user/signup')
        .send(newUser)
        .expect(400)
      })
    })
    describe('create Token', () => {
      it('should create a new token', async () => {
        console.log(res.cookie['token'])
        expect(res.cookie['token']).toBeDefined();
      })
    })
  })
})
// describe('Nhat - User Creation', () => {

//   let mockRequest, mockResponse, mockNext;

//   beforeEach(() => {
//     // Mock request object
//     mockRequest = {
//       body: {
//         username: 'testUser',
//         password: 'testPassword'
//       }
//     };

//     // Mock response object
//     mockResponse = {
//       locals: {},
//       status: jest.fn(() => mockResponse),
//       send: jest.fn()
//     };

//     // Mock next function
//     mockNext = jest.fn();
//   });

//   afterEach(() => {
//     jest.clearAllMocks();
//   })

//   describe('POST', () => {
//     it('should create a new user', async () => {
//       bcrypt.hash.mockImplementationOnce((password, saltOrRounds) => Promise.resolve('hashedPassword'));
//       db.query.mockResolvedValueOnce({ rows: [{id: 1, username: 'testUser', password: 'hashedPassword'}]})
//       await createUser(mockRequest, mockResponse, mockNext);

//       expect(mockResponse.status).toHaveBeenCalledWith(200);
//       expect(mockNext).toHaveBeenCalled();
//     })
//   })
// })