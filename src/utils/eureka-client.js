const { Eureka } = require('eureka-js-client');

const eurekaClient = new Eureka({
  instance: {
    app: 'NODEJS-MAIL-SERVICE', // Unique service name
    instanceId: 'NODEJS-MAIL-SERVICE-1', // Unique instance ID
    hostName: 'localhost', // Hostname of your Node.js app
    ipAddr: '127.0.0.1', // IP address of your Node.js app
    port: {
      '$': 3000, // Port of your Node.js app
      '@enabled': true,
    },
    vipAddress: 'NODEJS-MAIL-SERVICE',
    statusPageUrl: 'http://localhost:3000/info', // Health/status endpoint
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost', // Eureka server hostname
    port: 8761, // Eureka server port
    servicePath: '/eureka/apps', // Default Eureka path
  },
});

eurekaClient.start((error) => {
  if (error) {
    console.error('Eureka registration failed:', error);
  } else {
    console.log('Eureka registration successful');
  }
});

module.exports = eurekaClient;
