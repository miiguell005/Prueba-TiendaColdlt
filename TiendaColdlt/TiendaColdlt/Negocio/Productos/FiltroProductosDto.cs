using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TiendaColdlt.Negocio.Productos
{
    public class FiltroProductosDto
    {
        //Cantidad de productos que van a ser visibles
        public Nullable<int> Cantidad { get; set; }

        //El número de la pagina visible
        public Nullable<int> Pagina { get; set; }

        //Permite filtrar por el nombre del producto
        public string Nombre { get; set; }

        //Permite filtrar por el código del producto
        public string Codigo { get; set; }
    }
}