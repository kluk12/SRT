import { Component , signal, ChangeDetectorRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, CalendarApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { EventInput } from '@fullcalendar/core';
import {  TrainingGeneratorDialogComponent, TrainingGeneratorDialogModule } from '../training-generator/training-generator.component';
import { DialogService,  DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-admin-reservation',
    templateUrl: './admin-reservation.component.html',
    styleUrl: './admin-reservation.component.scss'
  })
export class AdminReservationComponent {

  ref: DynamicDialogRef | undefined;
  
  calendarVisible = signal<boolean>(true);
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
    initialView: 'timeGridDay',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    //eventContent: this.handleEvents.bind(this),

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef,
    // public config: DynamicDialogConfig,
    // public ref: DynamicDialogRef,
    private dialogService: DialogService,
  ) {
  }
  oninit() {
    // const myModal = document.getElementById('staticBackdrop')
    // //const myInput = document.getElementById('staticBackdrop')
    // console.log(myModal)
    // myModal.addEventListener('shown.bs.modal', () => {
    //  // myInput.focus()
    // })
    // this.calendarOptions.update((options) => ({
    //   ...options,
    //   initialView: 'dayGridMonth',
    // }));
  }
  ngAfterViewInit() {
    this.addTouchHandlers();
  }

  addTouchHandlers() {
    const events = document.querySelectorAll('.fc-event');

    events.forEach(event => {
      let timer;
      event.addEventListener('touchstart', (e) => {
        timer = setTimeout(() => {
          alert('Long press detected on event: ' + event.innerHTML);
        }, 500); // Dłuższe przytrzymanie trwa 1000 ms
      });

      event.addEventListener('touchend', (e) => {
        clearTimeout(timer); // Anuluj dłuższe przytrzymanie, jeśli dotyk zostanie zwolniony przed upływem 1000 ms
      });
    });
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

   // const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    this.show(calendarApi);
    calendarApi.unselect(); // clear date selection

    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //     allDay: selectInfo.allDay,
    //   });
    // }
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
  show(calendarApi:CalendarApi) {
    this.ref = this.dialogService.open(TrainingGeneratorDialogComponent, {
       // width: '400px',
        data: {
          calendarApi: calendarApi,
            // shuntingRequestId: shuntingRequestId,
          
        },
        header: 'Dodaj/Edytuj trening ',
        styleClass: 'submanuver-add-edit-dialog',
        contentStyle: {  'overflow': 'auto' },
    });
    this.ref.onClose.subscribe((w) => {
        if (w)
            console.log(w);
        // calendarApi.addEvent({
        //   id: createEventId(),
        //   title,
        //   start: selectInfo.startStr,
        //   end: selectInfo.endStr,
        //   allDay: selectInfo.allDay,
        // });
           // this.loadItems(this.lastTableLazyLoadEvent);
    });
  }
}
@NgModule({
  declarations: [AdminReservationComponent],
  imports: [CommonModule,FullCalendarModule ,CommonModule,TrainingGeneratorDialogModule,DynamicDialogModule,],
  providers: [DialogService],
  exports: [AdminReservationComponent ]

})
export class AdminReservationModule {}


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

