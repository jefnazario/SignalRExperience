using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace WhiteBoard.Hubs
{
    public class DrawingBoard : Hub
    {
        public Task BroadcastPoint(float x, float y)
        {
            return Clients.Others.drawPoint(x, y, Clients.Caller.color);
        }
        public Task BroadcastClear()
        {
            return Clients.Others.clear();
        }

        public Task SendText(string text)
        {
            //É possível adicionar aqui um serviço/método/ouqualquercoisa para salvar o texto no banco

            return Clients.Others.writeText(text);
        }

        public Task SaveText(string text)
        {
            return Clients.All.showTextSaved(text);
        }
    }
}