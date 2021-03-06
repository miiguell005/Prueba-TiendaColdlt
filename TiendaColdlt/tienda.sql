USE [master]
GO
/****** Object:  Database [Coldlt]    Script Date: 08/05/2020 10:01:28 ******/
CREATE DATABASE [Coldlt]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Coldlt', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQL2019\MSSQL\DATA\Coldlt.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'Coldlt_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQL2019\MSSQL\DATA\Coldlt_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [Coldlt] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Coldlt].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Coldlt] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Coldlt] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Coldlt] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Coldlt] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Coldlt] SET ARITHABORT OFF 
GO
ALTER DATABASE [Coldlt] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Coldlt] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Coldlt] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Coldlt] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Coldlt] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Coldlt] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Coldlt] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Coldlt] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Coldlt] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Coldlt] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Coldlt] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Coldlt] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Coldlt] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Coldlt] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Coldlt] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Coldlt] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Coldlt] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Coldlt] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [Coldlt] SET  MULTI_USER 
GO
ALTER DATABASE [Coldlt] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Coldlt] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Coldlt] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Coldlt] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [Coldlt] SET DELAYED_DURABILITY = DISABLED 
GO
USE [Coldlt]
GO
/****** Object:  Table [dbo].[Factura]    Script Date: 08/05/2020 10:01:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Factura](
	[IdFactura] [int] IDENTITY(1,1) NOT NULL,
	[Cliente] [varchar](255) NOT NULL,
	[ValorTotal] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_Factura] PRIMARY KEY CLUSTERED 
(
	[IdFactura] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Item]    Script Date: 08/05/2020 10:01:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Item](
	[IdItem] [int] IDENTITY(1,1) NOT NULL,
	[IdProducto] [int] NOT NULL,
	[IdFactura] [int] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[ValorTotal] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_Item] PRIMARY KEY CLUSTERED 
(
	[IdItem] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Producto]    Script Date: 08/05/2020 10:01:28 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Producto](
	[IdProducto] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [varchar](255) NULL,
	[Codigo] [varchar](128) NULL,
	[Valor] [decimal](18, 2) NULL,
 CONSTRAINT [PK_Producto] PRIMARY KEY CLUSTERED 
(
	[IdProducto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Factura] ON 

INSERT [dbo].[Factura] ([IdFactura], [Cliente], [ValorTotal]) VALUES (1, N'asdasd', CAST(400.00 AS Decimal(18, 2)))
INSERT [dbo].[Factura] ([IdFactura], [Cliente], [ValorTotal]) VALUES (2, N'Julian', CAST(3400.00 AS Decimal(18, 2)))
INSERT [dbo].[Factura] ([IdFactura], [Cliente], [ValorTotal]) VALUES (3, N'Maria', CAST(46000.00 AS Decimal(18, 2)))
INSERT [dbo].[Factura] ([IdFactura], [Cliente], [ValorTotal]) VALUES (4, N'Martha', CAST(9300.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[Factura] OFF
SET IDENTITY_INSERT [dbo].[Item] ON 

INSERT [dbo].[Item] ([IdItem], [IdProducto], [IdFactura], [Cantidad], [ValorTotal]) VALUES (1, 17, 1, 1, CAST(400.00 AS Decimal(18, 2)))
INSERT [dbo].[Item] ([IdItem], [IdProducto], [IdFactura], [Cantidad], [ValorTotal]) VALUES (2, 18, 2, 1, CAST(1500.00 AS Decimal(18, 2)))
INSERT [dbo].[Item] ([IdItem], [IdProducto], [IdFactura], [Cantidad], [ValorTotal]) VALUES (3, 19, 2, 1, CAST(1500.00 AS Decimal(18, 2)))
INSERT [dbo].[Item] ([IdItem], [IdProducto], [IdFactura], [Cantidad], [ValorTotal]) VALUES (4, 20, 2, 1, CAST(400.00 AS Decimal(18, 2)))
INSERT [dbo].[Item] ([IdItem], [IdProducto], [IdFactura], [Cantidad], [ValorTotal]) VALUES (5, 21, 3, 2, CAST(46000.00 AS Decimal(18, 2)))
INSERT [dbo].[Item] ([IdItem], [IdProducto], [IdFactura], [Cantidad], [ValorTotal]) VALUES (6, 22, 4, 2, CAST(4000.00 AS Decimal(18, 2)))
INSERT [dbo].[Item] ([IdItem], [IdProducto], [IdFactura], [Cantidad], [ValorTotal]) VALUES (7, 23, 4, 1, CAST(1700.00 AS Decimal(18, 2)))
INSERT [dbo].[Item] ([IdItem], [IdProducto], [IdFactura], [Cantidad], [ValorTotal]) VALUES (8, 24, 4, 1, CAST(3600.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[Item] OFF
SET IDENTITY_INSERT [dbo].[Producto] ON 

INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (5, N'Papas fritas', N'5044213', CAST(1700.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (7, N'pollo frito', N'223', CAST(25000.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (8, N'Pollo asado', N'2254', CAST(23000.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (10, N'choclitos', N'990', CAST(3500.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (11, N'Doritos', N'4555', CAST(2500.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (12, N'Tostacos pequeños', N'66541', CAST(1300.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (13, N'Queso x libra', N'7602', CAST(2500.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (14, N'Hueo', N'223', CAST(400.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (16, N'salchicha', N'56', CAST(1500.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (17, N'Pan', N'5092', CAST(400.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (18, N'Papas fritas', N'504421', CAST(1500.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (19, N'salchicha', N'5622', CAST(1200.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (20, N'Pan', N'50922', CAST(500.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (21, N'Pollo asado 1/2', N'2254', CAST(13000.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (22, N'cocacola', N'90005495', CAST(2000.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (23, N'Colombiana', N'123', CAST(1700.00 AS Decimal(18, 2)))
INSERT [dbo].[Producto] ([IdProducto], [Nombre], [Codigo], [Valor]) VALUES (24, N'Tostacos', N'6654', CAST(3600.00 AS Decimal(18, 2)))
SET IDENTITY_INSERT [dbo].[Producto] OFF
ALTER TABLE [dbo].[Item]  WITH CHECK ADD  CONSTRAINT [FK_Item_Factura] FOREIGN KEY([IdFactura])
REFERENCES [dbo].[Factura] ([IdFactura])
GO
ALTER TABLE [dbo].[Item] CHECK CONSTRAINT [FK_Item_Factura]
GO
ALTER TABLE [dbo].[Item]  WITH CHECK ADD  CONSTRAINT [FK_Item_Producto] FOREIGN KEY([IdProducto])
REFERENCES [dbo].[Producto] ([IdProducto])
GO
ALTER TABLE [dbo].[Item] CHECK CONSTRAINT [FK_Item_Producto]
GO
USE [master]
GO
ALTER DATABASE [Coldlt] SET  READ_WRITE 
GO
