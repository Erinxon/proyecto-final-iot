import { Injectable } from '@angular/core';
import { connect, IClientOptions, MqttClient } from 'mqtt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MqttService {
  private connectUrl = environment.connectUrl;
  private MQTT_SERVICE_OPTIONS = environment.MQTT_SERVICE_OPTIONS as IClientOptions;
  private mqttClient!: MqttClient;

  constructor() { }

  connectToMqtt(){
    this.mqttClient = connect(this.connectUrl,this.MQTT_SERVICE_OPTIONS);
    this.mqttClient.on('connect', function () {
      console.log('Connected');
    });
  }

  subscribeTopic(topic = 'my/test/topic'){
    return this.mqttClient.subscribe(topic);
  }

  publishMessage(message: string, topic = 'my/test/topic'){
    return this.mqttClient.publish(topic, message);
  }

  getMqttClient(){
    return this.mqttClient;
  }

}
