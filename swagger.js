const swaggerAutoGen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Clothing API',
    description: 'Clothing API',
  },
  host: 'clothing-store-api.onrender.com',
  schemes: ['https', 'http'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutoGen(outputFile, endpointsFiles, doc)
