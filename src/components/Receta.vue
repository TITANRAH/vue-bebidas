<script setup>
import { useBebidasStore } from '../stores/bebidas';


const storeBebidas = useBebidasStore()

defineProps({
    receta: {
        type: Object
    }
})

</script>
<template>
    <div class="border shadow-lg">

        <div class="overflow-hidden">
            <img 
                :src="receta.strDrinkThumb" 
                :alt="'Imagen de ' + receta.strDrink"
                class="hover:scale-125 transition-transform hover:rotate-2"
                >
        </div>

       

        <div class="p-5">
            <!-- truncate agrega 3 puntos si el texto es mas largo -->
            <h2 class="text-1xl truncate font-extrabold">{{ receta.strDrink }}</h2>
            <button
            class="bg-orange-400 mt-5 hover:bg-orange-500 w-full p-3 font-bold text-white text-lg"
            @click="storeBebidas.seleccionarBebida(receta.idDrink)"
            >
                Ver Receta
            </button>
        </div>
    </div>
</template>


