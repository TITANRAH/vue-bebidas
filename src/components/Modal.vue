<script setup>
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { useModalStore } from '../stores/modal';
import { useBebidasStore } from '../stores/bebidas';
import { useFavoritosStore } from '../stores/favoritos';

const store = useModalStore()
const storeBebidas = useBebidasStore()
const storeFavoritos = useFavoritosStore()

const formatearIngredientes = () =>{

    // creamos un div
    const ingredientesDiv = document.createElement('DIV')

    // los campos son 15 en la api por eso del 1 al 15
    for(let i = 1; i <= 15; i ++){

        // si hay algo (por que algunos vienen null o vacios) del uno al 15 representado por i
        if(storeBebidas.receta[`strIngredient${i}`]){

            // ese encontrado sera un ingrediente
            const ingrediente = storeBebidas.receta[`strIngredient${i}`]

            // estra cantidad hara mach con la posicion del ingrediente encontrado
            const cantidad = storeBebidas.receta[`strMeasure${i}`]

            // creamos un parrafo
            const ingredienteCantidad = document.createElement('P')
            
            // le añadimos la clase text-lg
            ingredienteCantidad.classList.add('text-lg', 'text-gray-500')
            
            // el parrafo contendra ingrediente encontrado en la posicion x y la cantidad haciendo mach en la posicion x
            ingredienteCantidad.textContent = `${ingrediente} - ${cantidad}`
            
            // adherimos el hijo al div creado al principio
            ingredientesDiv.appendChild(ingredienteCantidad)
        }
    }

    // retornamos el div creado con su hijo creado
    return ingredientesDiv;
}

</script>

<template>
    <TransitionRoot as="template" :show="store.modal" >
      <Dialog as="div" class="relative z-10" @close="store.handleClickModal()">
        <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </TransitionChild>
        <div class="fixed inset-0 z-10 overflow-y-auto">
          <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <DialogPanel class="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6" >
                <div>
                  <div class="mt-3">

                    <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                            {{ storeBebidas.receta.strDrink }}
                        </DialogTitle>

                        <img :src="storeBebidas.receta.strDrinkThumb" :alt="'Imagen de: ' + storeBebidas.receta.strDrink"
                              class="mx-auto w-96"      >
                        <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                           Ingredientes y Cantidades
                        </DialogTitle>
                        
                        <!-- llamamos a la funcion que crea el div  y usamos outerhtml -->
                        <div v-html="formatearIngredientes().outerHTML"></div>
                        <DialogTitle as="h3" class="text-gray-900 text-4xl font-extrabold my-5">
                           Instrucciones
                        </DialogTitle>
                        <p class="text-lg text-gray-500">{{ storeBebidas.receta.strInstructions }}</p>
                   
                    </div>
                </div>
                <div class="mt-5 sm:mt-6 flex justify-between gap-4">
                    <button 
                            @click="store.handleClickModal()"
                            type="button"
                            class="w-full rounded bg-gray-600 p-3 font-bold uppercase text-white 
                            shadow hover:bg-gray-500"
                        
                            >   
                        Cerrar
                    </button>

                    <button type="button"
                            class="w-full rounded bg-orange-600 p-3 font-bold uppercase text-white 
                            shadow hover:bg-orange-500"
                            @click="storeFavoritos.handleClickFavorito"
                        >
                        {{ store.textoBoton }}
                    </button>
                </div> 
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
</template>
  