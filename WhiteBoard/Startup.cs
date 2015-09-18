using Microsoft.Owin;
using Owin;
using WhiteBoard;

[assembly : OwinStartup(typeof(Startup))]
namespace WhiteBoard
{
    public class Startup
    {
        public void Configuration(IAppBuilder config)
        {
            config.MapSignalR();
        }
    }
}