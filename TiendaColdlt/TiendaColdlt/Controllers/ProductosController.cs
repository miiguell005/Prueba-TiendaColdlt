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
using TiendaColdlt.Negocio.Productos;
using TiendaColdlt.ObjetosNegocio;

namespace TiendaColdlt.Controllers
{
    public class ProductosController : ApiController
    {

        ProductosModulo modulo = new ProductosModulo();

        // GET: api/Productos
        [HttpGet]
        [Route("api/Productos")]
        public dynamic GetProducto(int? cantidad = null, int? pagina = null, string codigo = null, string nombre = null)
        {
            //int? cantidad, int? pagina, string codigo, string nombre
            //Se crea el objeto de filtro
            var filtro = new FiltroProductosDto()
            {
                Cantidad = cantidad,
                Codigo = codigo,
                Nombre = nombre,
                Pagina = pagina
            };

            return modulo.GetProductos(filtro);
        }

        // GET: api/Productos/5
        [HttpGet]
        [Route("api/Productos/{id}")]
        public Producto GetProducto(int id)
        {
            return modulo.GetProducto(id);
        }

        // PUT: api/Productos/5
        [HttpPut]
        [Route("api/Productos/{id}")]
        public Producto PutProducto(int id, Producto productoDto)
        {
            return modulo.EditarProducto(id, productoDto);
        }

        // POST: api/Productos
        [HttpPost]
        [Route("api/Productos")]
        public Producto PostProducto(Producto producto)
        {
            return modulo.CrearProducto(producto);
        }

        // DELETE: api/Productos/5
        [HttpDelete]
        [Route("api/Productos/{id}")]
        public Producto DeleteProducto(int id)
        {
            return modulo.EliminarProducto(id);
        }

    }
}