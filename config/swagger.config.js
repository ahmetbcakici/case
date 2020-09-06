export default {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Trendyol Case',
      version: '1.0.0',
      description: 'Lorem ipsum dolor sit amet.',
      license: {
        name: 'MIT',
        url: 'https://choosealicense.com/licenses/mit/',
      },
      contact: {
        name: 'Trendyol',
        url: 'https://trendyol.com',
        email: 'info@trendyol.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:8080/api/',
      },
    ],
  },
  apis: [
    './controllers/*'
  ]
}