export class Carrito {
    constructor(id, producto){
        this.id = id,
        this.producto = producto
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
}