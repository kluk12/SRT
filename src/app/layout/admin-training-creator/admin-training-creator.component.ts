import { TreningService } from '../../service/TreningService';
import { Component, signal, ChangeDetectorRef, NgModule, ViewChild } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, CalendarApi, EventInput, EventSourceApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { TrainingGeneratorDialogComponent, TrainingGeneratorDialogModule } from '../training-generator/training-generator.component';
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ValidationMessageModule } from "../validation-message/validation-message.component";
import { InputNumber, InputNumberModule } from 'primeng/inputnumber';
import { LocationOptions, Training, TypeOptions } from '../../models/models.dto';
import { DropdownModule } from 'primeng/dropdown';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-admin-training-creator',
  templateUrl: './admin-training-creator.component.html',
  styleUrl: './admin-training-creator.component.scss'
})
export class AdminTrainingCreatorComponent {
  @ViewChild('modalbutton') modalbutton: Button;
  @ViewChild('calendar') calendarcomp: CalendarApi;

  typeOptions = TypeOptions;
  ref: DynamicDialogRef | undefined;
  calendarTrening: EventInput[]=[];
  calendarTreningSource: EventSourceApi[]=[];
  // calendarVisible = signal<boolean>(true);
  calendarOptions = signal<CalendarOptions>( null);
  currentEvents = signal<EventApi[]>([]);

  constructor(private changeDetector: ChangeDetectorRef,
    // public config: DynamicDialogConfig,
    // public ref: DynamicDialogRef,
    private treningService: TreningService,
    private formBuilder: FormBuilder,
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
  getEvents() {
    this.treningService.findAdmin().subscribe(x => {
      if (x.success) {
        const trainings = x.data.map(data => new Training(data));
        console.log(trainings);
        // Uaktualnianie sygnału poprzez iterację
        trainings.forEach(training => {
          this.calendarTrening.push(  {
            id: training?.id.valueOf().toString(),
            title: training.title,
            start: training.dateFrom,
            end: training.dateTo,
          } )
          
          //this.handleEvents(this.calendarTrening );
          // (currentEvents => [
          //   ...currentEvents, // Kopia bieżących wydarzeń
          //   {
          //     id: training.id,
          //     title: training.title,
          //     start: training.dateFrom,
          //     end: training.dateTo,
          //   },
          // ]);
        });
   
        console.log(this.calendarTrening);
        this.calendarOptions.set(
        {
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
          initialEvents: this.calendarTrening, // alternatively, use the `events` setting to fetch from a feed
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
        // this.calendarOptions.update( (options) => (
        //   {
        //     ...options,
         
        //   initialView: 'timeGridDay',
        //   initialEvents: this.calendarTrening, // alternatively, use the `events` setting to fetch from a feed
        
        //   select: this.handleDateSelect.bind(this),
        //   eventClick: this.handleEventClick.bind(this),
        //   eventsSet: this.handleEvents.bind(this),
        //   //eventContent: this.handleEvents.bind(this),
      
        //   /* you can update a remote database when these fire:
        //   eventAdd:
        //   eventChange:
        //   eventRemove:
        //   */
        // }));
      }
    });
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
  // handleCalendarToggle() {
  //   this.calendarVisible.update((bool) => !bool);
  // }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {

    // const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;
    console.log(selectInfo, calendarApi);
    this.formData.patchValue({
      dateFrom: new Date(selectInfo.startStr),
      dateTo: new Date(selectInfo.endStr)
    });
    //     end: selectInfo.endStr,
    this.show(calendarApi);

    // calendarApi.unselect(); // clear date selection

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
    this.calendarOptions.update((options) => ({
      ...options,
      initialEvents: this.currentEvents,
    }));
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
  show(calendarApi: CalendarApi) {
    let myModal = document.getElementById('staticBackdrop')
    //const myModalAlternative = new bootstrap.Modal('#myModal')
    let modalToggle = document.getElementById('toggleMyModal');
    console.log(myModal, this.modalbutton, modalToggle);
    myModal.addEventListener('shown.bs.modal', (x) => {
      console.log(x);
    })
    // this.ref = this.dialogService.open(TrainingGeneratorDialogComponent, {
    //    // width: '400px',
    //     data: {
    //       calendarApi: calendarApi,
    //         // shuntingRequestId: shuntingRequestId,

    //     },
    //     header: 'Dodaj/Edytuj trening ',
    //     styleClass: 'submanuver-add-edit-dialog',
    //     contentStyle: {  'overflow': 'auto' },
    // });
    // this.ref.onClose.subscribe((w) => {
    //     if (w)
    //         console.log(w);
    //     // calendarApi.addEvent({
    //     //   id: createEventId(),
    //     //   title,
    //     //   start: selectInfo.startStr,
    //     //   end: selectInfo.endStr,
    //     //   allDay: selectInfo.allDay,
    //     // });
    //        // this.loadItems(this.lastTableLazyLoadEvent);
    // });
  }
  formData: FormGroup = new FormGroup({});
  islogin: boolean = false;
  LocationOptions = LocationOptions;
 

  ngOnInit(): void {
    this.getEvents();
    this.InitForm();

  }
  InitForm() {
    this.formData = this.formBuilder.group({
      //day: [1],
      dateFrom: [new Date()],
      dateTo: [new Date(new Date().setHours(new Date().getHours() + 1))],
      title: [''],
      type: [1],
      price: [20],
      textAddition: [''],
      numberPeople: [20],
      locationId: [null],
    });
  }

  Submit() {
    console.log(this.formData.valid, this.formData.getRawValue());
    if (this.formData.valid) {
      var item = new Training(this.formData.getRawValue());
      console.log(item);

      // later
      this.treningService.Add(item).subscribe(x => {
        console.log(x);

      }
      );
    }
  }
  onOptionClick($event: SelectButtonOptionClickEvent) {
    console.log($event);
    this.formData.patchValue({ title: $event.option.name });
  }
  event() {
    console.log('event');
  }
}
@NgModule({
  declarations: [AdminTrainingCreatorComponent],
  imports: [CommonModule,
    FullCalendarModule,
    CommonModule,
    TrainingGeneratorDialogModule,
    DynamicDialogModule,
    DropdownModule,
    ReactiveFormsModule,
    SelectButtonModule,
    CalendarModule,
    InputTextModule,
    ValidationMessageModule,
    InputNumberModule],
  providers: [DialogService],
  exports: [AdminTrainingCreatorComponent]

})
export class AdminTrainingCreatorModule { }


// let eventGuid = 0;
// const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

// export const INITIAL_EVENTS: EventInput[] = [
//   {
//     id: createEventId(),
//     title: 'All-day event',
//     start: TODAY_STR
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: TODAY_STR + 'T00:00:00',
//     end: TODAY_STR + 'T03:00:00',
    
//   },
//   {
//     id: createEventId(),
//     title: 'Timed event',
//     start: TODAY_STR + 'T12:00:00',
//     end: TODAY_STR + 'T15:00:00'
//   }
// ];

// export function createEventId() {
//   return String(eventGuid++);
// }

