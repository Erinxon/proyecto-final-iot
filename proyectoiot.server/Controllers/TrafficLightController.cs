using Microsoft.AspNetCore.Mvc;
using proyectoiot.server.models;
using proyectoiot.server.Response;
using proyectoiot.server.Services;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace proyectoiot.server.Controllers
{
    [ApiController]
    [Route("api/[Controller]")]
    public class TrafficLightController : ControllerBase
    {
        private readonly ICruceServices cruceServices;

        public TrafficLightController(ICruceServices cruceServices)
        {
            this.cruceServices = cruceServices;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<Cruce>>>> Get()
        {
            var response = new ApiResponse<IEnumerable<Cruce>>();
            try
            {
                response.Data = await this.cruceServices.GetCruces();
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al obtener los datos";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<int>>> Post([FromBody] List<Cruce> cruce)
        {
            var response = new ApiResponse<int>();
            try
            {
                response.Data = await this.cruceServices.AddCruce(cruce);
            }
            catch (Exception ex)
            {
                response.Message = "Ocurrió un error al obtener los datos";
                return BadRequest(response);
            }

            return Ok(response);
        }

        [HttpDelete]
        public async Task<ActionResult> Delete()
        {
            try
            {
                await this.cruceServices.DeleteData();
            }
            catch (Exception ex)
            {
                return BadRequest("Ocurrió un error eliminando los datos");
            }

            return Ok();
        }
    }
}
