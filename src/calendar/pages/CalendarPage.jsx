import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { addHours } from 'date-fns'

import { CalendarEventBox, CalendarModal, FabAddNew, Navbar, FabDelete } from "../"
import { getMessagesES, localizer } from '../../helpers'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'

//SE DEBE IR AL EVENTO
// const events = [{
//     title: 'cumpleaños',
//     notes: 'comprar cosas',
//     start: new Date(),
//     end: addHours(new Date(), 2),
//     bgColor: '#fafafa',
//     user: {
//         _id: '123',
//         name: 'Alvaro'
//     }
// }]

export const CalendarPage = () => {

    const { user } = useAuthStore();
    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

    const eventStyleGetter = (event, start, end, isSelected) => {
        // console.log({ event, start, end, isSelected })

        const isMyEvent = (user.uid === event.user._id) || (user.uid === event.user.uid);


        const style = {
            backgroundColor: isMyEvent ? '#347CF7': '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            color: 'black',

        }

        return {
            style
        }
    }

    const onDoubleClick = (event) => {
        console.log("double Click", event)
        openDateModal()
    }

    const onSelect = (event) => {
        console.log("Click", event)
        setActiveEvent(event);

    }

    const onViewChange = (event) => {
        console.log("View Change", event)
        localStorage.setItem('lastView', event);
        setLastView(event)
    }

    useEffect(() => {
        startLoadingEvents()
    }, [])


    return (
        <>
            <Navbar />
            <Calendar
                culture='es'
                localizer={localizer}
                defaultView={lastView}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: CalendarEventBox
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
            />

            <CalendarModal />
            <FabAddNew />

            <FabDelete />
        </>
    )
}
