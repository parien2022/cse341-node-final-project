const swaggerAutoGen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Clothing API',
    description: 'Clothing API',
  },
  host: 'localhost:8082',
  schemes: ['http', 'https'],
}

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/index.js']

swaggerAutoGen(outputFile, endpointsFiles, doc)
