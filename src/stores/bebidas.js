import { defineStore } from "pinia";
import { ref, onMounted, reactive } from "vue";
import APIService from "../services/APIService";




export const useBebidasStore = defineStore('bebidas',()=>{

const categorias = ref([])
// creo este objeto reactivo lo paso al return lo leo en el form y escribo en sus propiedades nombre 
// y catgegoria con v-model
const busqueda = reactive({

    nombre: '',
    categoria: ''
})

const recetas = ref([])

onMounted(async function (){
    // destructuring en mas niveles
    const {data: {drinks}} = await APIService.obtenerCategorias()
    categorias.value = drinks;
})

async function obtenerReceta() {

    // llamo al servicio en esta funcion del store en donde le paso el objeto busqueda creado 
    // aca en este store, este objeto esta mapeado con el formulario de la vista por 
    // lo que ingresemos en los campos seran los parametros que enviaremos al api
    // dentro de la respuesta viene el objeto data y dentrod e data viene drinks 
    // por loq ue podemos aplicar destructuring y acceder directamente a driks
    const {data: {drinks}} = await APIService.buscarRecetas(busqueda)
    console.log(drinks)
    recetas.value=drinks
}

return {
    categorias,
    busqueda,
    obtenerReceta,
    recetas
}
})