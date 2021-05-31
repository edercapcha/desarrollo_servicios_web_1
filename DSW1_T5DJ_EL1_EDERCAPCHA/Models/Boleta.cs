using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DSW1_T5DJ_EL1_EDERCAPCHA.Models
{
    public class Boleta
    {
        public int Numero { get; set; }
		public DateTime Fecha { get; set; }
		public String Dni { get; set; }
		public String Cliente { get; set; }
		public String Servicio { get; set; }
		public Decimal Costo { get; set; }
	}
}