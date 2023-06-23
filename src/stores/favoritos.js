import { defineStore } from "pinia";
import { useBebidasStore } from "./bebidas";
import { watch, ref, onMounted, computed } from "vue";
import { useModalStore } from "./modal";
import { useNotificacionStore } from "./notificaciones";


export const useFavoritosStore = defineStore('favoritos', () => {
    
    const notificacionesStore = useNotificacionStore()
    const storeModal = useModalStore()
    const storeBebidas = useBebidasStore()
    const favoritos = ref([])


    onMounted(()=>{
        favoritos.value = JSON.parse(localStorage.getItem('favoritos')) ?? []
    })

    // observa si hay cambios y sincroiniza el arreglo cuando cambie, y lo sube a localstorage
    watch(favoritos, () => {
        sicronizarLocalStorage()
    }, {
        deep: true
    })

    function existeFavorito(id){
        const favoritosLocalStorage = JSON.parse(localStorage.getItem('favoritos')) ?? []

        return favoritosLocalStorage.some(favorito => favorito.idDrink === id)
    }

    function eliminarFavorito(){
        favoritos.value = favoritos.value.filter(favorito => favorito.idDrink != storeBebidas.receta.idDrink)
        notificacionesStore.mostrar = true;
        notificacionesStore.texto = 'Eliminado de favorito'

        // setTimeout(() => {

        //     // despues de 3 segtudnos cierrate notificacion
        //     notificacionesStore.$reset()
        // }, 3000);
    
    }

    function agregarFavorito(){
        favoritos.value.push(storeBebidas.receta)

        notificacionesStore.mostrar = true;
        notificacionesStore.texto = 'Agregado a Favoritos'

        // setTimeout(() => {

        //     // despues de 3 segtudnos cierrate notificacion
        //     notificacionesStore.$reset()
        // }, 3000);

    }

    function handleClickFavorito() {
        if(existeFavorito(storeBebidas.receta.idDrink)){
            eliminarFavorito()
        }else{
            agregarFavorito()
        }
        storeModal.modal= false;
    }

    function sicronizarLocalStorage() {
        localStorage.setItem('favoritos', JSON.stringify(favoritos.value))
    }

    const noFavoritos = computed(()=> favoritos.value.length === 0)

    return {
        favoritos,
        handleClickFavorito,
        existeFavorito, 
        noFavoritos
    }
})