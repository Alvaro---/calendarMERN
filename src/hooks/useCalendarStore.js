import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import calendarApi from "../api/calendarApi";
import { convertDatesToDatesEvent } from "../helpers";
import {
	onAddNewEvent,
	onDeleteEvent,
	onLoadEvents,
	onSetActiveEvent,
	onUpdateEvent,
} from "../store";

export const useCalendarStore = () => {
	const dispatch = useDispatch();

	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const startSavingEvent = async (calendarEvent) => {
		try {
			if (calendarEvent.id) {
				//actualizando
				const { data } = await calendarApi.put(
					`events/update/${calendarEvent.id}`,
					calendarEvent
				);
				dispatch(onUpdateEvent({ ...calendarEvent, user }));
				return;
			}
			//nuevo
			const { data } = await calendarApi.post("/events/new", calendarEvent);
			console.log(data);
			dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
			// dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
		} catch (error) {
			console.log("?", error);
			Swal.fire("Error al guardar", error.response.data.msg, "error");
		}
	};

	const startDeletingEvent = async () => {
		try {
			await calendarApi.delete(`/events/delete/${activeEvent.id}`);
			dispatch(onDeleteEvent());
		} catch (error) {
			console.log(error);
			Swal.fire("Error al eliminar", error.response.data.msg, "error");
		}
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await calendarApi.get("/events");
			console.log(data);
			const events = convertDatesToDatesEvent(data.eventos);
			console.log(events);
			dispatch(onLoadEvents(events));
		} catch (error) {
			console.log("Error cargando evento", error);
		}
	};

	return {
		//*Propiedades
		activeEvent,
		events,
		hasEventSelected: !!activeEvent,
		//*Metodos
		setActiveEvent,
		startSavingEvent,
		startDeletingEvent,
		startLoadingEvents,
	};
};
