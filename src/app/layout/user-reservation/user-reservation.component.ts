import { Component , signal, ChangeDetectorRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { DialogModule ,} from 'primeng/dialog';
import { DialogService } from 'primeng/dynamicdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RreservationDialogComponent } from '../reservation-dialog/reservation-dialog.component';
import { CommonModuleModule } from '../../models/common-module/common-module.module';
@Component({
  selector: 'app-user-reservation',

  templateUrl: './user-reservation.component.html',
  styleUrl: './user-reservation.component.scss',
})
export class UserReservationComponent {


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
    editable: false,
    selectable: true,
    selectMirror: false,
    dayMaxEvents: false,
    eventClick: this.handleEventClick.bind(this),
    //eventsSet: this.handleEvents.bind(this),

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  });
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef,
private dialogService: DialogService,
  ) {}

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }
  handleEditable() {
    this.calendarOptions.update((options) => ({
      ...options,
      editable: !options.editable,
    }));
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.openDialog(23);
    // if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
    //   clickInfo.event.remove();
    // }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
  openDialog(id?: number) {
    const ref = this.dialogService.open(RreservationDialogComponent, {
        data: {
            id: id,
        },
        header:`Rezerwacja` ,
        styleClass: '',

    });

//     ref.onClose.subscribe((data) => {
//         // if (data) {
//         //     this.loadItems();
//         // }
//     });
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

@NgModule({
  declarations: [UserReservationComponent],
  imports: [CommonModuleModule,FullCalendarModule, DynamicDialogModule],
  exports: [UserReservationComponent]
})
export class UserReservationModule {}
