const mockingoose = require('mockingoose');
const usersController = require('../controllers/users');
const userModel = require('../models/users');
const {startDb} = require('../db/connection');
const {ObjectId} = require('mongodb');


beforeAll((done) => {
    startDb((err) => {
      if (err) {
        console.error('Error initializing database:', err);
        done(err);
      } else {
        console.log('Database initialized successfully');
        done();
      }
    });
  });


describe('Testing Users', () => {
    let generatedId
    test('Get all Users', async () => {
        const users = [];
        mockingoose(userModel).toReturn(users, 'find');
        const req = {}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await usersController.getAll(req, res);
        expect(res.status).toBeCalledWith(200);
    })


    test('Get User by ID', async () => {
        const userId = new ObjectId("65c0eab049d439ae1d680954");
        const users = {
            _id: userId,
            name: "Carlos",
            lastName: "Gardel",
            mail: "gardel@mail.com",
            phone: "1193506",
            city: "Buenos Aires",
            user: "gardelC",
            password: "gardel123"
          }
        mockingoose(userModel).toReturn(users, 'find');
        const req = {params: {id: userId.toString()}}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await usersController.getSingle(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(users);
    })

    test('Insert User', async () => {
        const req = {
            body:{
                name: "Federico",
                lastName: "Valverde",
                mail: "valverde@mail.com",
                phone: "07221998",
                city: "Uruguay",
                user: "ValverdeF",
                password: "Valverde123"
            }
        }
        mockingoose(userModel).toReturn({ req }, 'insertOne');
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await usersController.createUser(req, res);
        expect(res.status).toBeCalledWith(201);
        generatedId = res.json.mock.calls[0][0]._id;
    })


    test('Update User', async () => {
        const req = {
            body:{
                name: "Federico",
                lastName: "Valverde",
                mail: "federico@mail.com",
                phone: "07221998",
                city: "Uruguay",
                user: "ValverdeF",
                password: "Valverde123"
            },
            params: {id: "65d56875b42d93452ef591df"}
        }
        mockingoose(userModel).toReturn({ req }, 'updateOne');
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        await usersController.updateUser(req, res);
        expect(res.status).toBeCalledWith(204);
    })

    test('Delete user', async () => {
        const req = {
            params: {id: generatedId.toString()}
        }
        mockingoose(userModel).toReturn({ req }, 'deleteOne');
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        await usersController.deleteUser(req, res);
        expect(res.status).toBeCalledWith(204);
    })
})
