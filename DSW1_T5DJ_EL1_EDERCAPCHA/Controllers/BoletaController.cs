using DSW1_T5DJ_EL1_EDERCAPCHA.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace DSW1_T5DJ_EL1_EDERCAPCHA.Controllers
{
    public class BoletaController : Controller
    {
        // GET: Boleta
        string cadena = ConfigurationManager.
           ConnectionStrings["cn"].ConnectionString;
        IEnumerable<Boleta> boletaByFecha(DateTime? anno_ini, DateTime? anno_fin)
        {
            if (anno_ini == null)
            {
                anno_ini = DateTime.Now;
            }
            if (anno_fin == null)
            {
                anno_fin = DateTime.Now;
            }
            List<Boleta> temporal = new List<Boleta>();
            using (SqlConnection cn = new SqlConnection(cadena))
            {

                SqlCommand cmd = new SqlCommand("dsw_boleta_sp_get_byFecha", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@FechaInicio", anno_ini);
                cmd.Parameters.AddWithValue("@FechaFin", anno_fin);
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Boleta p = new Boleta()
                    {
                        Numero = dr.GetInt32(0),
                        Fecha = dr.GetDateTime(1),
                        Dni = dr.GetString(2),
                        Cliente = dr.GetString(3),
                        Servicio = dr.GetString(4),
                        Costo = dr.GetDecimal(5),
                    };
                    temporal.Add(p);
                }
                dr.Close();
                cn.Close();
            }
            return temporal;
        }


        public ActionResult Index(DateTime? anno_ini, DateTime? anno_fin)
        {
            ViewBag.lista = new List<Boleta>(boletaByFecha(anno_ini, anno_fin));
            return View();
        }
    }
}