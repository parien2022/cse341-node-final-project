const mockingoose = require('mockingoose');
const ordersController = require('../controllers/orders');
const orderModel = require('../models/orders');
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


  describe('Testing Orders', () => {
    test('Get all Orders', async () => {
        const orders = [];
        mockingoose(orderModel).toReturn(orders, 'find');
        const req = {}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await ordersController.getOrders(req, res);
        expect(res.status).toBeCalledWith(200);
    })


    test('Get Orders by ID', async () => {
        const orderId = new ObjectId("65c0eb0849d439ae1d680957");
        const orders = {
            _id: orderId,
            user: "gardelC",
            date: "02/05/24",
            conditions: "delivered",
          };
        mockingoose(orderModel).toReturn(orders, 'find');
        const req = {params: {id: orderId.toString()}}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await ordersController.getOrder(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(orders);
    })


    test('Get Orders by Conditions', async () => {
        const orderId = new ObjectId("65c0eb0849d439ae1d680957");
        const condition = "delivered";

        const orders = {
          _id: orderId,
          user: "gardelC",
          date: "02/05/24",
          conditions: "delivered",
        };
        mockingoose(orderModel).toReturn(orders, 'find');
        const req = {params: {conditions: condition}}
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await ordersController.getOrderByStatus(req, res);
        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith(orders);
    })


    test('Insert Order', async () => {
        const req = {
            body:{
                user: 'messiL',
                date: '02/14/2024',
                conditions: 'Preparing',
            }
        }
        mockingoose(orderModel).toReturn({ req }, 'insertOne');
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await ordersController.createOrder(req, res);
        expect(res.status).toBeCalledWith(201);
    })


    test('Update Order', async () => {

        const req = {
            body:{
              user: 'messiL',
              date: '02/14/2024',
              conditions: 'Preparing',
            },
            params: {id: "65d4bf6a377f90093b5e3e61"}
        };
        mockingoose(orderModel).toReturn({ req }, 'updateOne');
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        await ordersController.updateOrder(req, res);
        expect(res.status).toBeCalledWith(204);
    })


    test('Delete Order', async () => {

        const req = {
            params: {id: "65d55ef98706498c049d40e5"}
        }
        mockingoose(orderModel).toReturn({ req }, 'deleteOne');
        const res = {
            setHeader: jest.fn(),
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        }
        await ordersController.deleteOrder(req, res);
        expect(res.status).toBeCalledWith(204);
    })
})
