using Microsoft.AspNetCore.Mvc;
using MQTTnet;
using MQTTnet.Client.Options;
using System.Threading;

namespace proyectoiot.server.Controllers
{
    [ApiController]
    [Route("[Controller]")]
    public class TrafficLightController : ControllerBase
    {
        public TrafficLightController()
        {

        }

        [HttpGet]
        public async void Get()
        {

            var options = new MqttClientTcpOptions
            {
                Server = "ef02917c4f1f48e68eddb5377d2e9151.s2.eu.hivemq.cloud",
                Port = 8883,
               
            };

            try
            {
                
            }
            catch (System.Exception ex)
            {
                var error = ex.Message;
            }
        }
    }
}
