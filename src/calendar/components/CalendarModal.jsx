import { addHours } from 'date-fns/esm';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';

import DatePicker, { registerLocale, setDefaultLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import es from 'date-fns/locale/es';
import { differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'
import { useCalendarStore, useUiStore } from '../../hooks';
registerLocale('es', es)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

//Mosal sobre todo
Modal.setAppElement('#root');

export const CalendarModal = () => {

    // const [isOpen, setIsOpen] = useState(true);
    const { isDateModelOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const [formSubmited, setformSubmited] = useState(false);


    const [formValues, setFormValues] = useState({
        title: 'alvaro',
        notes: 'notes',
        start: new Date(),
        end: addHours(new Date(), 2)
    })

    const titleClass = useMemo(() => {
        if (!formSubmited) return ''
        return (formValues.title.length > 0)
            ? 'is-valid'
            : 'is-invalid'
    }, [formValues.title, formSubmited])

    useEffect(() => {
        if(activeEvent!=null){
            setFormValues({...activeEvent})
        }
    }, [activeEvent])


    const onInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }
    const onDateChange = (event, changing) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        console.log("cerrando modal")
        // setIsOpen(false)
        closeDateModal()

    }

    const onSubmit = async (event) => {
        event.preventDefault();
        setformSubmited(true);
        const diference = differenceInSeconds(formValues.end, formValues.start)
        console.log(diference)

        if (isNaN(diference) || diference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error')
            return;
        }
        if (formValues.title.length <= 0) {
            // Swal.fire('Debe ingresar un titulo', 'Revisar las fechas ingresadas', 'error')
            return;
        }
        console.log(formValues)
        //TODO: 
        await startSavingEvent(formValues);
        closeDateModal();
        setformSubmited(false);
    }

    return (
        <Modal
            isOpen={isDateModelOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onCloseModal}
            style={customStyles}
            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={2000}
            contentLabel="Example Modal">
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        selected={formValues.start}
                        className="form-control"
                        onChange={(date) => onDateChange(date, "start")}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={formValues.start}
                        selected={formValues.end}
                        className="form-control"
                        onChange={(date) => onDateChange(date, "end")}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control  ${titleClass}`} //is-valid o is-invalid
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
