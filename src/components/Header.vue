<script setup>

import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import { useBebidasStore } from '../stores/bebidas';
import { useNotificacionStore } from '../stores/notificaciones';



const route = useRoute()
// APLICAR DESTRUCTURIN ROMPE LA REACTIVIDAD
const store = useBebidasStore()
const storeNotificaciones = useNotificacionStore()



// propiedad computada para saber que estamos en la pagina de inicio
// si la propiedad computada es inicio muestra el formulario
// y lo se gracias a route name
// y declarando las rutaas con el name
const paginaInicio = computed(()=>route.name == 'inicio')

// console.log(route)

const handleSubmit = () => {

  if(Object.values(store.busqueda).includes('')){
    // asi o como abajo puedo llamar es mejor esta primera
    storeNotificaciones.texto = 'Todos los campos son obligatorios'
    storeNotificaciones.mostrar = true
    storeNotificaciones.error = true

    // storeNotificaciones.$patch({
    //   texto: 'Todos los campos son obligatorios',
    //   mostrar: true,
    //   error: true
    // })

    return
  }
store.obtenerReceta()

}

</script>
<template>
    <header
    class="bg-slate-800"
    :class="{'header' :paginaInicio}"
    >
        <div class="mx-auto container px-5 py-16">

            <div class="flex justify-between items-center">
              <div>
                <RouterLink
                  :to="{name: 'inicio'}"
                  >
                  <img class="w-32" src="/img/logo.svg" alt="Logotipo">
                </RouterLink>
              </div>

              <nav class="flex gap-4 text-white">
                <router-link
                  :to="{name: 'inicio'}"
                  class=" uppercase font-bold"
                  active-class="text-orange-500"
                >
                  inicio
                </router-link>

                <router-link
                  :to="{name: 'favoritos'}"
                  class="text-white uppercase font-bold"
                  active-class="text-orange-500"
                >
                  favoritos
                </router-link>

              </nav>
            </div>




            <form 
            @submit.prevent="handleSubmit"
            v-if="paginaInicio"
            class="md:w-1/2 2xl:w-1/3 bg-orange-400 my-32 p-10 rounded-lg shadow space-y-6"
            >
                <div class="space-y-4">
                    <label 
                      class="block text-white uppercase font-extrabold text-lg"
                      for="ingrediente">Nombre o Ingrediente</label>
                    <input 
                      id="ingrediente" 
                      type="text"
                      class="p-3 w-full rounded-lg focus:outline-none"
                      placeholder="Nombre o ingrediente ej. Vodka ,Tequila, etc."
                      v-model="store.busqueda.nombre"
                      >
                </div>

                <div class="space-y-4">
                    <label 
                      class="block text-white uppercase font-extrabold text-lg"
                      for="categoria">Nombre o Ingrediente</label>
                    <select 
                      id="categoria"     
                      v-model="store.busqueda.categoria"               
                      class="p-3 w-full rounded-lg focus:outline-none"
                      >

                      <option value="">-- Seleccione --</option>
                      <option 
                          v-for="categoria in store.categorias" 
                          key="{{ cateogira.strCategory }}"
                          :value="categoria.strCategory"
                          >{{ categoria.strCategory }}</option>
                          

                      </select>
                </div>

                <input 
                
                    type="submit"
                    value="Buscar Recetas"
                    class="bg-orange-800 hover:bg-orange-900 cursor-pointer text-white font-extrabold w-full p-2 rounded-lg uppercase"
                    >

            </form>

        </div>

    </header>
</template>

<style>
.header {
  background-image: url('/img/bg.jpg');
  background-size: cover;
  background-position: center;
}
</style>

