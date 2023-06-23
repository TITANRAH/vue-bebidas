import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useFavoritosStore } from "./favoritos";
import { useBebidasStore } from "./bebidas";


export const useModalStore = defineStore('modal', ()=>{
    const bebidasStore = useBebidasStore()
    const favoritosStore = useFavoritosStore()

    const modal = ref(false)

    function handleClickModal (){
        modal.value = !modal.value
    }

    const textoBoton = computed(()=>{
        return favoritosStore.existeFavorito(bebidasStore.receta.idDrink) ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'
    })

    
    return {
        modal,
        handleClickModal,
        textoBoton
    }

})
// uso del modal:

// // insstalo headlessvue 

// 1. creo el componente modal 

// 2. creo el modal store 

// 3. en modal store creo la store , y dentro creo un ref modal en false 
// y una funcion handleModal que hara que ese modal false sea igual a su contrario y viceversa 

// 4. en el componente modal llamo llamo a la store de modal y determinoen la propiedad show del modal 
// la variable booleana creada en el store modal=false 

// 5. a su vez llamo a la store de modal en la store de bebidas y en la funcion que muestra la receta del elemento 
// seleccionado dentro de esa funcion llamo a la funcion del store que cambia la propiedad booleana de tru a false y viceversa

// 6. a su vez en el mismo componente modal llamo a la misma funcion en la propiedad @close del dialog 
// con esto se cerrara al presiuonar fuera del modal 

