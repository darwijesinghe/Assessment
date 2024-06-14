using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace WebApplication
{
    public class MvcApplication : HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
        }

        protected void Application_Error(object sender, EventArgs e)
        {
            // applicaton error handling. This is only for the simplicity.
            // if need, we can implement this method more to show custom error pages
            // and log the error to file, db or cloud

            var error = Server.GetLastError();
            Response.Clear();
            Response.Write(error.Message);
            Response.End();
        }
    }
}
