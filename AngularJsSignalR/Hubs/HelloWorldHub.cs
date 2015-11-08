using System;
using Microsoft.AspNet.SignalR;

namespace AngularJsSignalR.Hubs
{
    public class HelloWorldHub : Hub
    {
        public void GreetAll()
        {
            Clients.All.acceptGreet("Good morning! The time is " + DateTime.Now.ToString());
        }
    }
}