import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDatemodal } from "../store";

export const useUiStore = () => {
    

    const dispatch = useDispatch();
    const { isDateModelOpen } = useSelector(state => state.ui)

    const openDateModal = () => {
        dispatch(onOpenDatemodal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    //TOOGGLE PARA ABRIR O CERRAR SOLO CAMBIANDO EL ESTADO
    // const toggleDateModal = () =>{
    //     isDateModelOpen ? openDateModal() : closeDateModal();
    // }

    return {
        //propiedades
        isDateModelOpen,

        //metodos
        openDateModal,
        closeDateModal
    }
}