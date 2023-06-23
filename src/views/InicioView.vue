<script setup>
import Receta from '../components/Receta.vue';
import { useBebidasStore } from '../stores/bebidas';
import { storeToRefs } from 'pinia';


const store = useBebidasStore()


</script>
<template>
    <h1 class="text-6xl font-extrabold">Recetas</h1>

    <div 
    class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 mt-10 gap-10"
    >
    <Receta
    v-for="receta in store.recetas"
    :receta ="receta"
    :key="receta.idDrink"
    />
    </div>
</template>


<!-- obtencion de recetas: 

1 en mi lib axios.js creo una url base de los endpoints de recetas
2 luego en mi services creo la funcion buscarReceta en donde le doy como 
parametros destructuring categoria y nombre 

3 estos los obtengo del objeto llamado 
busqueda un reactive creado en el store el cual lo retorno en su return para 
ocuparlo en donde desee

4 llamo al objeto de busqueda instanciando el store en header.vue en donde 
tengo el formulario con los campos nombre y categoria sus v model 
seran la instancia del store y su objeto busqueda, en este caso 
store.nombre v-model y store.categoria v-model 

5 creo la funcion en el store obtenerReceta en el cual tengo el llamado a la api 
asi const {data: {drinks}} = await APIService.buscarRecetas(busqueda) con destructuring 
por lo que llamo a mi servicio y creo un ref de un arreglo vacio llamado recetas = ref([])
y digo que recetas.value = a drinks y coloco recetas en el return del storeToRefs

6 creo un componente llamado Receta.vue y lo llamo en inicioView 

7 en el componet ereceta creo un defineProps en donde le digo que recibire 
un objeto de receta 

8 este objeto vendra de la instancia del store recetas instanciado enn el compoennte 
inicioView en donde recibo las recetas 

9 uso un v-for de recetas en el componente Receta y le paso la prop de receta que 
nacio en este v-for y asi puedo utilizar receta.nombre o receta.categoria e Receta y 
renderizar la cantidad de recetas -->


