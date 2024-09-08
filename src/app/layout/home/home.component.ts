import { routes } from './../../app.routes';
import { TreningService } from './../../service/TreningService';
import { CommonModule } from '@angular/common';
import { Component, NgModule, signal, ViewChild, viewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { HourlyActivities, Training, TrainingWeek } from '../../models/models.dto';
import { co } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  weekDates: { day: string, date: Date }[] = [];
  trainingWeek: TrainingWeek;
  hours = [
    // { time: '6 AM - 7 AM', activities: ['Cardio', '', 'Yoga', 'Cardio', '', '', 'Yoga'] },
    // { time: '7 AM - 8 AM', activities: ['', 'Weight Lifting', 'Yoga', '', 'Cardio', 'Yoga', ''] },
  ];
loading=signal<boolean>(true);

constructor(private treningService: TreningService,
  private routes: Router
) { }

  ngOnInit() {
    this.calculateWeekDates();
    this.trainingWeek = {
      currentWeekItems: [],
      nextWeekItems: []
    }
    this.treningService.find().subscribe((x) => {
      if(x.success) {
        this.trainingWeek = x.data;
        console.log(this.trainingWeek)
        this.trainingWeek.currentWeekItems = x.data.currentWeekItems;
        this.trainingWeek.currentWeekItems.forEach(x => {
          
          // var tmp = x.activities.shift();
          // if (tmp !== undefined) {
          //   x.activities.push(tmp);
          // }
        })
        this.trainingWeek.nextWeekItems = x.data.nextWeekItems;
        this.trainingWeek.nextWeekItems.forEach(x => {
          // var tmp = x.activities.shift();
          // if (tmp !== undefined) {
          //   x.activities.push(tmp);
          // }
        })
        console.log(this.trainingWeek)
      }
    });
  }

  ngAfterViewInit() {
    this.loading.set(false);
  }
  


  private calculateWeekDates(): void {
    const today = new Date();
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
  }

  private getDayName(date: Date): string {
    const dayNames = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];
    return dayNames[date.getDay() === 0 ? 6 : date.getDay() - 1]; 
  }
  reservation(id: number) {
    this.routes.navigate(['/FullBodyWorkout'], { queryParams: { id: id } });
    console.log("reservation",id);

  }
  
}
@NgModule({
  declarations: [HomeComponent],
  exports: [HomeComponent],
  imports: [CommonModule],
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