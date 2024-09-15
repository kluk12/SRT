import { routes } from './../../app.routes';
import { TreningService } from './../../service/TreningService';
import { CommonModule } from '@angular/common';
import { Component, NgModule, signal, ViewChild, viewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { HourlyActivities, Training, TrainingWeek,TypeOptions,TypeOptionsPipe } from '../../models/models.dto';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  weekDates: { day: string, date: Date }[] = [];
  nextweekDates: { day: string, date: Date }[] = [];
  trainingWeek: TrainingWeek;
  hours = [
    // { time: '6 AM - 7 AM', activities: ['Cardio', '', 'Yoga', 'Cardio', '', '', 'Yoga'] },
    // { time: '7 AM - 8 AM', activities: ['', 'Weight Lifting', 'Yoga', '', 'Cardio', 'Yoga', ''] },
  ];
loading=signal<boolean>(true);
nextWeek=signal<boolean>(true);
typeOptionsList = TypeOptions;
constructor(private treningService: TreningService,
  private routes: Router,
) { }

  ngOnInit() {
    this.calculateWeekDates();
    this.trainingWeek = {
      Allitemscurrent: [],
      AllitemsNext: [],
      currentWeekItems: [],
      nextWeekItems: []
    }
    this.treningService.find().subscribe((x) => {
      if(x.success) {
        this.trainingWeek = new TrainingWeek(x.data);
        this.trainingWeek.Allitemscurrent = x.data.currentWeekItems;
        this.trainingWeek.AllitemsNext = x.data.nextWeekItems;
        console.log(this.trainingWeek)
        this.trainingWeek.currentWeekItems = x.data.currentWeekItems;
        // this.trainingWeek.currentWeekItems.forEach(x => {
          
        //   // var tmp = x.activities.shift();
        //   // if (tmp !== undefined) {
        //   //   x.activities.push(tmp);
        //   // }
        // })
        this.trainingWeek.nextWeekItems = x.data.nextWeekItems;
        // this.trainingWeek.nextWeekItems.forEach(x => {
        //   // var tmp = x.activities.shift();
        //   // if (tmp !== undefined) {
        //   //   x.activities.push(tmp);
        //   // }
        // })
        console.log(this.trainingWeek)
      }
    });
  }

  ngAfterViewInit() {
    this.loading.set(false);
  }
  
  TypeOptions(id: number): string {
    return TypeOptions.find(x=>x.value ==id)?.name ?? "";
  }
  

  private calculateWeekDates(): void {
    let today = new Date();
    const dayOfWeek = today.getDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6

    // Get the start of the week (Monday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1));

    // Calculate dates for each day of the week
    this.weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      this.weekDates.push({
        day: this.getDayName(date),
        date: date
      });
    }
const newxtstartOfWeek = new Date(startOfWeek.setDate(startOfWeek.getDate() + 7));
      for (let i = 0; i < 7; i++) {
        const date = new Date(newxtstartOfWeek);
        date.setDate(newxtstartOfWeek.getDate() + i);
        this.nextweekDates.push({
          day: this.getDayName(date),
          date: date
        });
      }
    }
  

  private getDayName(date: Date): string {
    const dayNames = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    return dayNames[date.getDay() === 0 ? 6 : date.getDay() - 1]; 
  }

  reservation(id: number) {
    this.routes.navigate(['/FullBodyWorkout'], { queryParams: { id: id } });
    console.log("reservation",id);

  }
  filtrerType(id: number) {
    this.trainingWeek.currentWeekItems = this.trainingWeek.Allitemscurrent?.filter(x => x.activities.find(y => y!=null && y?.type == id));
    this.trainingWeek.nextWeekItems = this.trainingWeek.AllitemsNext.filter(x => x.activities.find(y =>y!=null&& y?.type == id));
    console.log(this.trainingWeek.Allitemscurrent,this.trainingWeek.AllitemsNext,this.trainingWeek.currentWeekItems,id);
    }
    
    nextWeekChenge(x: boolean) {
      this.nextWeek.set(x);
    }
  
}
@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [CommonModule ],
})
export class HomeModule {}
export class tableItem {
  name: string;
  date: Data;
  maxCount: string;
  userCount: string;
  constructor(init: Partial<tableItem>) {
   Object.assign(this,init);
  }
  
}