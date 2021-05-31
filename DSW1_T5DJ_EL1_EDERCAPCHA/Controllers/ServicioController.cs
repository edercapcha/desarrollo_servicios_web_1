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
    public class ServicioController : Controller
    {
        // GET: Servicio
        string cadena = ConfigurationManager.
    ConnectionStrings["cn"].ConnectionString;
        IEnumerable<Servicio> listServicio()
        {
            List<Servicio> temporal = new List<Servicio>();
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                SqlCommand cmd = new SqlCommand("dsw_servicio_sp_get_combo", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    Servicio p = new Servicio()
                    {
                        idservicio = dr.GetInt32(0),
                        desservicio = dr.GetString(1),
                        costo = dr.GetDecimal(2),
                    };
                    temporal.Add(p);
                }
                dr.Close();
                cn.Close();
            }
            return temporal;
        }
        // POST
        public String registrar(DateTime? fch, String dni, String nom, String dir, int? ser)
        {
            String result = "";
            try
            {
                SqlConnection cn = new SqlConnection(cadena);
                SqlCommand cmd = new SqlCommand("dsw_registro_sp_ins_all", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@fch", fch);
                cmd.Parameters.AddWithValue("@dni", dni);
                cmd.Parameters.AddWithValue("@nom", nom);
                cmd.Parameters.AddWithValue("@dir", dir);
                cmd.Parameters.AddWithValue("@ser", ser);
                cn.Open();
                if (cmd.ExecuteNonQuery() > 0)
                {
                    result = "Registro agregado";
                }
                else
                {
                    result = "Error en registro";
                }
                cn.Close();
            }
            catch (Exception e)
            {

            }
            return result;
        }

        
        public ActionResult Index(DateTime? fch, String dni, String nom, String dir, int? ser)
        {
            if(fch!=null && dni != null && nom != null && dir != null && ser != null)
            {
                ViewBag.result = registrar(fch, dni, nom, dir, ser);
            }
            ViewBag.servicios = new List<Servicio>(listServicio());
            return View();
        }
        
        
        public ActionResult Registrar(DateTime fch, String dni, String nom, String dir, int ser)
        {
            return View();
        }
    }
}