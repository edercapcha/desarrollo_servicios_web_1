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
    public class PedidoController : Controller
    {

        string cadena = ConfigurationManager.
            ConnectionStrings["cn"].ConnectionString;
        IEnumerable<PedidoByRangoAnios> pedidosbyyears(int? anno_ini, int? anno_fin)
        {
            if (anno_ini == null)
            {
                anno_ini = 1990;
            }
            if (anno_fin == null)
            {
                anno_fin = 2021;
            }
            List<PedidoByRangoAnios> temporal = new List<PedidoByRangoAnios>();
            using (SqlConnection cn = new SqlConnection(cadena))
            {
                
                SqlCommand cmd = new SqlCommand("dsw_pedido_sp_get_rangoanios", cn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@p_int_anno_ini", anno_ini);
                cmd.Parameters.AddWithValue("@p_int_anno_fin", anno_fin);
                cn.Open();
                SqlDataReader dr = cmd.ExecuteReader();
                while (dr.Read())
                {
                    PedidoByRangoAnios p = new PedidoByRangoAnios()
                    {
                        IdPedido = dr.GetInt32(0),
                        Fecha = dr.GetString(1),
                        Direccion = dr.GetString(2),
                        Ciudad = dr.GetString(3),
                    };
                    temporal.Add(p);
                }
                dr.Close();
                cn.Close();
            }
            return temporal;
        }



        // GET: Pedido
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult PedidosByYears(int? anno_ini, int? anno_fin)
        {
            ViewBag.pedidos = new List<PedidoByRangoAnios>(pedidosbyyears(anno_ini, anno_fin));
            return View();
        }

        // GET: Pedido/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: Pedido/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Pedido/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Pedido/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: Pedido/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: Pedido/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: Pedido/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
