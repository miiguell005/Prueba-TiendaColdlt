using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using TiendaColdlt.Negocio.Facturas;
using TiendaColdlt.ObjetosNegocio;

namespace TiendaColdlt.Controllers
{
    public class FacturasController : ApiController
    {
        private FacturasModulo modulo = new FacturasModulo();

        // GET: api/Facturas
        [Route("api/Facturas")]
        public dynamic GetFactura()
        {
            return modulo.GetFacturas();
        }
        
        // POST: api/Facturas
        [ResponseType(typeof(Factura))]
        [Route("api/Facturas")]
        public Factura PostFactura(Factura factura)
        {
            return modulo.CrearFactura(factura);
           
        }
    }
}