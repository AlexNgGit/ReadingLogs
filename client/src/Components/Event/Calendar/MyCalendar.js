import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
//import {useCallback, useMemo, useState} from "react";
//import {useDrop} from "react-dnd";
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.scss'
import {useCallback, useState} from "react";

const DragAndDropCalendar = withDragAndDrop(Calendar)
const localizer = momentLocalizer(moment)

export function MyCalendar() {
    const [events, setNewEvents] = useState([]);


    const onDragStart = ({event, action, direction}) =>  {
        console.log(`Event: ${event}, action: ${action}, direction: ${direction}.`);
    }


    const onEventDrop = ({ event, start, end, allDay }) =>  {
            console.log(`Event: ${event}, Start: ${start}, end: ${end}.`);
    }

    const onDropFromOutside = ({ start, end, allDay }) =>  {console.log(`Start: ${start}, end: ${end}.`);}

    const onDragOver = useCallback((dragEvent)=> {
        console.log("HELLO I AM BEING DRAGGED")
    })
    return (
        <div >
            <DragAndDropCalendar
                selectable
                localizer={localizer}
                events={[]}
                onDragStart={onDragStart}
                onEventDrop={onEventDrop}
                onDropFromOutside={onDropFromOutside}
                onDragOver={onDragOver}
                draggableAccessor={()=>true}
                resizable
            />
        </div>
    )
}