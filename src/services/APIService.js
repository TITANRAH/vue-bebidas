import api from "../lib/axios";

export default {

    obtenerCategorias(){
        return api.get('/list.php?c=list');
    },
    buscarRecetas({categoria, nombre}){
        // aplique destructuring de busqueda
    // buscarRecetas(busqueda){
        // le paso la busqueda que es el objeto en el store 
        // esta busqueda trae nombre y categoria continua en store en la funcion 
        // de obtenerReceta
        // console.log('busqueda desde el servicio', busqueda);

        return api.get(`/filter.php?c=${categoria}&i=${nombre}`)
    }
}