namespace proyectoiot.server.Response
{
    public class ApiResponse<T>
    {
        public ApiResponse()
        {
            Succeeded = true;
        }

        public ApiResponse(T data, string message = null)
        {
            Data = data;
            Succeeded = true;
            Message = message;
        }

        public ApiResponse(string message)
        {
            Succeeded = false;
            Message = message;
        }
        public T Data { get; set; }
        public bool Succeeded { get; set; }
        public string Message { get; set; }
    }
}
