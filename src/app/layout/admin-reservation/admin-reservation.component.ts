// import { Component, NgModule, ViewChild } from '@angular/core';
// import { FullCalendarModule } from '@fullcalendar/angular';
// import { CalendarOptions ,PluginDef} from '@fullcalendar/core';
// //import multiMonthPlugin from '@fullcalendar/multimonth';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import interactionPlugin from '@fullcalendar/interaction';
// import { FullCalendarComponent } from '@fullcalendar/angular';

// @Component({
//   selector: 'app-admin-reservation',
//   standalone: true,
//   imports: [AdminReservationModule ],
//   templateUrl: './admin-reservation.component.html',
//   styleUrl: './admin-reservation.component.scss'
// })
// export class AdminReservationComponent {
//   @ViewChild('calendar') calendarComponent: FullCalendarComponent;

//   calendarOptions: CalendarOptions = {
//     initialView: 'dayGridMonth',
//     plugins: [dayGridPlugin]
//   };
//   // calendarOptions: CalendarOptions = {
//   //   initialView: 'dayGridMonth',
//   //   plugins: [dayGridPlugin, interactionPlugin],
//   //   dateClick: (arg) => this.handleDateClick(arg),
//   //   events: [
//   //     { title: 'event 1', date: '2019-04-01' },
//   //     { title: 'event 2', date: '2019-04-02' }
//   //   ]
//   // };
//   // handleDateClick(arg) {
//   //   alert('date click! ' + arg.dateStr)
//   // }
// //   calendarOptions: CalendarOptions = {
// //     headerToolbar: {
// //         start: 'title',
// //         center: '',
// //         end: ''
// //     },
// //     initialView: 'dayGridMonth',

// //     //plugins: [multiMonthPlugin],
// //     // eventClick: this.handleDateClick.bind(this),
// //     //  multiMonthMaxColumns: 4,
// //     // multiMonthMinWidth: 200,
// //     // eventBackgroundColor: 'var(--primary-color)'
// // };
// // timetableDates: Date[];
// // timetableDatesInitialised: boolean = false;
//  }

//  @NgModule({
//   declarations: [AdminReservationComponent],
//   imports: [FullCalendarModule]
// })
// export class AdminReservationModule {}


import { Component , signal, ChangeDetectorRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
    selector: 'app-admin-reservation',
    templateUrl: './admin-reservation.component.html',
    styleUrl: './admin-reservation.component.scss'
  })
export class AdminReservationComponent {
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
       interactionPlugin,
      dayGridPlugin,
       timeGridPlugin,
       listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef) {
  }
  oninit() {
    const myModal = document.getElementById('staticBackdrop')
    //const myInput = document.getElementById('staticBackdrop')
    console.log(myModal)
    myModal.addEventListener('shown.bs.modal', () => {
     // myInput.focus()
    })
    // this.calendarOptions.update((options) => ({
    //   ...options,
    //   initialView: 'dayGridMonth',
    // }));
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {

    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}



let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS: EventInput[] = [
  {
    id: createEventId(),
    title: 'All-day event',
    start: TODAY_STR
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T00:00:00',
    end: TODAY_STR + 'T03:00:00'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: TODAY_STR + 'T12:00:00',
    end: TODAY_STR + 'T15:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}
import { EventInput } from '@fullcalendar/core';
import { TrainingGeneratorComponent } from '../training-generator/training-generator.component';
@NgModule({
  declarations: [AdminReservationComponent],
  imports: [CommonModule,FullCalendarModule ,CommonModule,TrainingGeneratorComponent],
  exports: [AdminReservationComponent ]

})
export class AdminReservationModule {}
