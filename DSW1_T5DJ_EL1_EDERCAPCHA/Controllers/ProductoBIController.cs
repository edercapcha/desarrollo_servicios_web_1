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
    public class ProductoBIController : Controller
    {
        string cadena = ConfigurationManager.ConnectionStrings["cn"].ConnectionString;
        IEnumerable<ProductoBI> getproductos()
        {
            List<ProductoBI> temporal = new List<ProductoBI>();
            using (SqlConnection cn = new SqlConnection(cadena))
            {

                SqlCommand cmd = new SqlCommand("dsw_productobi_sp_get_all", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    ProductoBI p = new ProductoBI()
                    {
                        IdProducto = dr.GetInt32(0),
                        Descripcion = dr.GetString(1),
                        //IdProveedor = dr.GetInt32(2),
                        Proveedor = dr.GetString(3),
                        //IdCategoria = dr.GetInt32(4),
                        Categoria = dr.GetString(5),
                        Medida = dr.GetString(6),
                        Precio = dr.GetDecimal(7),
                        //Stock = dr.GetInt32(8),
                        //Habilitado = dr.GetInt32(9)
                        //FechaModificacion = dr.GetDateTime(10),
                        //FechaCreacion = dr.GetDateTime(11),
                    };
                    temporal.Add(p);
                }
                dr.Close();
                cn.Close();
            }
            return temporal;
        }
        public ActionResult Registrar()
        {
            ViewBag.productosbi = new List<ProductoBI>(getproductos());
            return View();
        }
    }
}