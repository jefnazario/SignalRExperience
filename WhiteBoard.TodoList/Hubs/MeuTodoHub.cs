using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
using WhiteBoard.TodoList.Controllers;

namespace WhiteBoard.TodoList.Hubs
{
    public class MeuTodoHub : Hub
    {
        private static ConcurrentDictionary<string, List<int>> _mapa = new ConcurrentDictionary<string, List<int>>(); 

        public void NotificarNovaTarefa(string novaTarefa, string responsavel)
        {
            Clients.Others.atualizarListaDeTarefas(new Tarefa(novaTarefa, false));
        }

        public override Task OnConnected()
        {
            _mapa.TryAdd(Context.ConnectionId, new List<int>());

            Clients.All.informarOnline(Context.ConnectionId);
            return base.OnConnected();
        }
    }
}