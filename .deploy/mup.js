module.exports = {
  servers: {
    one: {
      host: '10.10.226.49',
      username: 'root',
      // pem:
      password: 'leukemia2016',
      // or leave blank for authenticate from ssh-agent
      opts: {
        port: 22,
      }
    }
  },

  meteor: {
    name: 'How-R-you-App',
    path: '../',
    servers: {
      one: {}
    },
    buildOptions: {
      //serverOnly: true,
    },
    env: {
      ROOT_URL: 'http://10.10.226.49',
      MONGO_URL: 'mongodb://localhost/How-R-you-App'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60

    //,

    //ssl: {
     // port: 443,
      //"crt": "../../How-R-you-App-certificate/www.leukemia.sundata.dk.crt",
      //"key": "../../How-R-you-App-certificate/www.leukemia.sundata.dk.key"
    //}
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};