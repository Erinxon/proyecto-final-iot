export const environment = {
  production: true,
  MQTT_SERVICE_OPTIONS: {
    host: '6436817f2603402d9cb925eb1359e52a.s2.eu.hivemq.cloud',
    port: 8884,
    protocol: 'wss',
    username: 'Equipo1IoT',
    connectTimeout: 4000,
    password: 'Equipo1iot',
    clean:true
  },
  connectUrl: 'wss://6436817f2603402d9cb925eb1359e52a.s2.eu.hivemq.cloud:8884/mqtt',
  apiUrl: 'https://traffic-light-iot.herokuapp.com/api'
};
