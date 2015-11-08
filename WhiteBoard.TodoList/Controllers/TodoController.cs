using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using WhiteBoard.TodoList.Hubs;

namespace WhiteBoard.TodoList.Controllers
{
    [RoutePrefix("todo")]
    public class TodoController : ApiController //ApiControllerWithHub<TodoHub>
    {
        [HttpGet]
        [Route("listar")]
        public Task<HttpResponseMessage> ObterTarefas()
        {
            HttpResponseMessage response;
            try
            {
                var tarefas = IniciarTarefasEmMemoria();

                response = Request.CreateResponse(HttpStatusCode.OK, tarefas);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }

            var tsc = new TaskCompletionSource<HttpResponseMessage>();
            tsc.SetResult(response);

            return tsc.Task;
        }

        [HttpPost]
        [Route("nova")]
        public Task<HttpResponseMessage> NovaTarefa(string tarefa)
        {
            HttpResponseMessage response;
            try
            {
                var tarefas = IniciarTarefasEmMemoria();

                tarefas.Add(new Tarefa(tarefa, false));
                
                response = Request.CreateResponse(HttpStatusCode.OK, tarefas);
            }
            catch (Exception ex)
            {
                response = Request.CreateResponse(HttpStatusCode.BadRequest, ex.Message);
            }

            var tsc = new TaskCompletionSource<HttpResponseMessage>();
            tsc.SetResult(response);

            return tsc.Task;
        }

        protected List<Tarefa> IniciarTarefasEmMemoria()
        {
            return new List<Tarefa>
                {
                    new Tarefa("tarefa 1", false),
                    new Tarefa("tarefa 2", false),
                    new Tarefa("tarefa 3", true),
                    new Tarefa("tarefa 4", false)
                };
        } 
    }

    public class Tarefa
    {
// ReSharper disable once InconsistentNaming
        public string descricao { get; set; }
// ReSharper disable once InconsistentNaming
        public bool completa { get; set; }

        public Tarefa(string desc, bool done)
        {
            descricao = desc;
            completa = done;
        }
    }
}