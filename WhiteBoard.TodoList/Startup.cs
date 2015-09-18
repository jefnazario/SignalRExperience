using Microsoft.Owin;
using Owin;
using WhiteBoard.TodoList;

[assembly: OwinStartup(typeof(Startup))]
namespace WhiteBoard.TodoList
{
    public class Startup
    {
        public void Configuration(IAppBuilder config)
        {
            config.MapSignalR();
        }
    }
}