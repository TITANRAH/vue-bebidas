<script setup>

import { RouterLink, useRoute } from 'vue-router';
import { computed } from 'vue';
import { useBebidasStore } from '../stores/bebidas';



const route = useRoute()
// APLICAR DESTRUCTURIN ROMPE LA REACTIVIDAD
const store = useBebidasStore()



// propiedad computada para saber que estamos en la pagina de inicio
// si la propiedad computada es inicio muestra el formulario
const paginaInicio = computed(()=>route.name == 'inicio')

// console.log(route)

const handleSubmit = () => {
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

              <nav class="flex gap-4">
                <router-link
                  :to="{name: 'inicio'}"
                  class="text-white uppercase font-bold"
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

