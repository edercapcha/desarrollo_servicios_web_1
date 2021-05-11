using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DSW1_T5DJ_EL1_EDERCAPCHA.Models
{
    public class ProductoBI
    {
        public int? IdProducto { get; set; }
        public String Descripcion { get; set; }
        public int? IdProveedor { get; set; }
        public String Proveedor  { get; set; }
        public int? IdCategoria { get; set; }
        public String Categoria { get; set; }
        public String Medida { get; set; }
        public decimal? Precio { get; set; }
        public decimal? Stock { get; set; }
        public int? Habilitado { get; set; }
        public DateTime? FechaModificacion { get; set; }
        public DateTime? FechaCreacion { get; set; }
    }
}