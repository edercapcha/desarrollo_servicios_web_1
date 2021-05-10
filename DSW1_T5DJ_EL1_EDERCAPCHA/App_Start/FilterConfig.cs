using System.Web;
using System.Web.Mvc;

namespace DSW1_T5DJ_EL1_EDERCAPCHA
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
