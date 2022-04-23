// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
