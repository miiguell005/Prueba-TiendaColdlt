using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TiendaColdlt.ObjetosNegocio;

namespace TiendaColdlt.Negocio.Productos
{
    public class ProductosModulo : IDisposable
    {
        private ColdltEntities db;

        public ProductosModulo()
        {
            db = new ColdltEntities();

            //Se desactiva para que no materialice las relaciones que tiene el producto con las demas tablas
            //Con el fin de, bajar los costos de SQL
            db.Configuration.LazyLoadingEnabled = false;
        }
        
        /// <summary>
        /// Consulta todos los productos por medio de un filtro
        /// </summary>
        /// <returns></returns>
        public dynamic GetProductos(FiltroProductosDto filtro)
        {
            int cantidad;

            var productos = db.Producto.Where(p => p.IdProducto != null);

            //Si se esta filtrando por el codigo del producto
            if (filtro.Codigo != null)
                productos = productos.Where(p => p.Codigo.Contains(filtro.Codigo));

            if (filtro.Nombre != null)
                productos = productos.Where(p => p.Nombre.Contains(filtro.Nombre));

            //Obtiene el total de produtos despues del filtro
            cantidad = productos.Count();
            productos = productos.OrderBy(p => p.Nombre);

            //Obtiene los productos segun la página seleccionada y cantidad de productos visibles
            if (filtro.Cantidad.HasValue && filtro.Pagina.HasValue && cantidad > 0)
                productos = productos.Skip((filtro.Pagina.Value - 1) * filtro.Cantidad.Value).Take(filtro.Cantidad.Value);

            return new
            {
                Cantidad = cantidad,
                Productos = productos.ToArray()
            };
        }

        /// <summary>
        /// Consulta un producto en especifico
        /// </summary>
        /// <param name="idProducto"></param>
        /// <returns></returns>
        public Producto GetProducto(int idProducto)
        {
            return db.Producto.Where(p => p.IdProducto == idProducto).FirstOrDefault();
        }

        /// <summary>
        /// Guarda los cambios realizados en el producto
        /// </summary>
        /// <param name="idProducto"></param>
        /// <param name="productoDto"></param>
        /// <returns></returns>
        public Producto EditarProducto(int idProducto, Producto productoDto)
        {
            var producto = db.Producto.Where(p => p.IdProducto == idProducto).FirstOrDefault();

            //Edita el producto
            if (producto != null)
            {
                producto.Codigo = productoDto.Codigo;
                producto.Nombre = productoDto.Nombre;
                producto.Valor = productoDto.Valor;

                db.SaveChanges();
            }
            
            else
                throw new Exception($"No se encontro el producto con IdProducto {idProducto}");

            return producto;
        }

        /// <summary>
        /// Crea el Producto en la base de datos
        /// </summary>
        /// <param name="producto"></param>
        /// <returns></returns>
        public Producto CrearProducto(Producto producto)
        {
            db.Producto.Add(producto);

            db.SaveChanges();

            return producto;
        }

        /// <summary>
        /// Elimina el producto
        /// </summary>
        /// <param name="idProducto"></param>
        /// <returns></returns>
        public Producto EliminarProducto(int idProducto)
        {
            var producto = db.Producto.Find(idProducto);

            if (producto == null)
                throw new Exception($"No se encontro el producto con IdProducto {idProducto}");

            db.Producto.Remove(producto);
            db.SaveChanges();

            return producto;
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}