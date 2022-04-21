import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import { connect, IClientOptions } from 'mqtt';
import { environment } from 'src/environments/environment';
import { MqttService } from './services/mqtt.service';
import { ToastrService } from 'ngx-toastr';

export interface Historial {
  pasos: number;
  ubicacion: string;
  cruzado: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  tiempo: number = 40;
  interval!: any;
  started: boolean = false;
  previousColor: string = '';

  @ViewChild('red') red: ElementRef | undefined;
  @ViewChild('yellow') yellow: ElementRef | undefined;
  @ViewChild('green') green: ElementRef | undefined;

  historialPasos: Historial[] = [];

  pagina: number = 1;

  constructor(private changeDetectorRef: ChangeDetectorRef, 
    private mqttService: MqttService, private toastr: ToastrService) {

  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    this.startTimer();
    this.mqttService.connectToMqtt();
    this.mqttService.subscribeTopic();
    this.mqttService.getMqttClient()
    .on('message',  (topic, message) => {
      if(message.toString() === 'request'){
        this.started = true;
        setTimeout(() => {
          this.iniciar();
          this.started = false;
        }, 2000)
      }else if(message.toString() === 'stop'){
        this.started = false;
      }
      else{
        this.removeColor(message.toString());
      }
      console.log('Received message:', topic, message.toString());
    });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.tiempo > 0) {
        this.tiempo--;
      } else {
        if (this.isCurrentColorgreen) {
          this.mqttService.publishMessage('green');
          this.previousColor = 'green';
        } else if (this.isCurrentColoryellow) {
          this.historialPasos = this.historialPasos.map((h) => {
            return {
              ...h,
              cruzado: true,
            };
          });
          this.mqttService.publishMessage('yellow');
        } else {
          this.mqttService.publishMessage('red');
          this.previousColor = 'red';
        }
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  get isCurrentColorRed() {
    const dOMTokenList = this.red?.nativeElement.classList as DOMTokenList;
    return dOMTokenList?.contains('red');
  }

  get isCurrentColoryellow() {
    const dOMTokenList = this.yellow?.nativeElement.classList as DOMTokenList;
    return dOMTokenList?.contains('yellow');
  }

  get isCurrentColorgreen() {
    const dOMTokenList = this.green?.nativeElement.classList as DOMTokenList;
    return dOMTokenList?.contains('green');
  }

  removeColor(color: any) {
    if (color === 'green') {
      const green = this.green?.nativeElement.classList as DOMTokenList;
      green.remove('green');
      this.addColor('yellow');
      this.tiempo = 4;
    } else if (color === 'yellow') {
      const yellow = this.yellow?.nativeElement.classList as DOMTokenList;
      yellow.remove('yellow');
      if (this.previousColor === 'red') {
        this.addColor('green');
        this.toastr.warning('No Cruzar');
        this.tiempo = 40;
      } else {
        this.addColor('red');
        this.toastr.success('Cruzar');
        this.tiempo = 20;
      }
    } else {
      const red = this.red?.nativeElement.classList as DOMTokenList;
      red.remove('red');
      this.addColor('yellow');
      this.tiempo = 4;
    }
  }

  addColor(color: any) {
    if (color === 'green') {
      const green = this.green?.nativeElement.classList as DOMTokenList;
      green.add('green');
    } else if (color === 'yellow') {
      const yellow = this.yellow?.nativeElement.classList as DOMTokenList;
      yellow.add('yellow');
    } else {
      const red = this.red?.nativeElement.classList as DOMTokenList;
      red.add('red');
    }
  }

  solicitarCruce() {
    this.mqttService.publishMessage('request')
  }

  iniciar(){
    this.tiempo -= 2;
    this.tiempo = this.tiempo < 0 ? 0 : this.tiempo;
    const paso = {
      id: this.historialPasos.length + 1,
      pasos: 10,
      ubicacion:
        Math.floor(Math.random() * 255) +
        1 +
        '.' +
        Math.floor(Math.random() * 255) +
        '.' +
        Math.floor(Math.random() * 255) +
        '.' +
        Math.floor(Math.random() * 255),
      cruzado: false,
    };
    this.historialPasos.push(paso);
  }

  detener() {
    this.mqttService.publishMessage('stop');
  }

  get getHistorialPasos() {
    return this.historialPasos.filter((h) => h.cruzado);
  }

  get geTotalPasos() {
    return this.getHistorialPasos.reduce((total, h) => total + h.pasos, 0);
  }

  get geTotalMetros() {
    return (
      this.getHistorialPasos.reduce((total, h) => total + h.pasos, 0) * 0.1
    );
  }
}
