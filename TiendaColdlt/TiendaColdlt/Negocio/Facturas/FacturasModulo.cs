using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TiendaColdlt.ObjetosNegocio;

namespace TiendaColdlt.Negocio.Facturas
{
    public class FacturasModulo : IDisposable
    {
        private ColdltEntities db = new ColdltEntities();

        /// <summary>
        /// Se consultan las facutras
        /// </summary>
        /// <returns></returns>
        public dynamic GetFacturas()
        {           
            return db.Factura.ToArray();
        }

        /// <summary>
        /// Se realiza una doble validación  para rectifica los valores totales, po si llegan a hackear el valor total en el front
        /// Se crea la factura don sus respectivos items y productos
        /// </summary>
        /// <param name="facturaDto"></param>
        /// <returns></returns>
        public Factura CrearFactura(Factura facturaDto)
        {
            db.Configuration.LazyLoadingEnabled = false;

            //Si la factura no tiene productos
            if (facturaDto.Items.Count() == 0)
                throw new Exception("La factura debe tener como mínimo 1 prodcuto");

            if (facturaDto.Cliente == null)
                throw new Exception("Ingrese el nombre del cliente a la factura");

            var idsProductos = facturaDto.Items.Select(i => i.IdProducto).Distinct().ToArray();

            //Se consultan los productos de la factura, para rectificar el valor total de los productos
            var productos = db.Producto.Where(p => idsProductos.Contains(p.IdProducto)).ToArray();

            decimal totalFactura = 0;


            foreach (var i in facturaDto.Items)
            {
                var producto = productos.Where(p => p.IdProducto == i.IdProducto).FirstOrDefault();

                i.ValorTotal = (decimal)i.Cantidad * (decimal)producto.Valor;

                totalFactura += i.ValorTotal;
                i.Producto = null;
            }

            //Guarda el costo total de la factura
            facturaDto.ValorTotal = totalFactura;

            db.Factura.Add(facturaDto);

            db.SaveChanges();

            return facturaDto;
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}