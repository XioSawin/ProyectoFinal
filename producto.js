class Producto {
    constructor (id, nombre, descripcion, codigo, foto, precio, stock){
        this.id = id,
        this.nombre = nombre, 
        this.descripcion = descripcion,
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }

    setTimestamp(){
        let date = new Date();

        let d = date.getDate();
        let mo = date.getMonth() + 1;
        let y = date.getFullYear();
        let h = date.getHours();
        let mi = date.getMinutes();
        let s = date.getSeconds();

        let today = d + '/' + mo + '/' + y + ' ' + h + ':' + mi + ':' + s;

        this.timestamp = today;
    }

    update(nombre, descripcion, codigo, foto, precio, stock){
        this.nombre = nombre, 
        this.descripcion = descripcion,
        this.codigo = codigo;
        this.foto = foto;
        this.precio = precio;
        this.stock = stock;
    }
}

module.exports = Producto;

/*
{
    "nombre": "Botella",
    "descripcion": "Botella Aston Martin F1 TEAM 2021 con display de temperatura",
    "codigo": "STR1432",
      "foto": "https://cdn.shopify.com/s/files/1/0448/5985/0917/products/IMG_8045_69d7ac42-1c6f-44af-997a-fe5248afc80a_1024x1024.jpg?v=1614586943",
      "precio": 35,
      "stock": 10
  }
  
  {
  "nombre": "Mochila",
  "descripcion": "Mochila Aston Martin F1 TEAM 2021",
  "codigo": "SEB1234",
	"foto": "https://cdn.shopify.com/s/files/1/0448/5985/0917/products/AM21BAG01_20_282_29_20copy_1024x1024.png?v=1614333827",
	"precio": 75,
	"stock": 5
}
  */