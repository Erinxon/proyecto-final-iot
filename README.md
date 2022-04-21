# Cruce peatonal
1) En el primer escenario, el usuario habilita desde una aplicación móvil la acción de iniciar el cruce peatonal, o cancelar la operación. En caso de que el semáforo esté en rojo, no será necesario este caso de uso.

Una vez iniciada, el dispositivo de IOT, recibirá la señal, calculará la proximidad del usuario y en base a esta data, activará la señal de pare en el semáforo inteligente.

2) El semáforo inteligente recibirá el comando de iniciar la señal de pare. En caso de estar verde o amarillo, iniciará un proceso interno para reducir el tiempo de la señal activa, y acelerar la señal de cruce de peatón.

3) El Dispositivo de IOT recibirá la instrucción del semáforo inteligente de iniciar el contador de tiempo en el display, reproducir el contador de tiempo en el speaker.

Igualmente, al finalizar el proceso activará en el display una notificación de no cruzar.

El semáforo seguirá su ejecución normal, luego de ejecutado el contador de tiempo del display.

4) El Web App recibirá una señal para iniciar la vibración y para detener la vibración. Esto en base a la operación que se ejecuta del contador de tiempo en el display.

 El Web App deberá llevar un historial de cruces peatonales realizados y su ubicación. Igualmente mostrar una estadística de la cantidad de pasos realizados tanto en total de pasos como total de metros. Para esto asumiremos que cada cruce peatonal se completa en 10 pasos. Convertir los pasos en métrica de metros, para el cual asumiremos una equivalencia de que 10 pasos = 1 metro.
