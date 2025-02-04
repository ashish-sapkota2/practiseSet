import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.css'
})
export class BarComponent implements AfterViewInit {
  @ViewChild('barCanvas') barCanvas!: { nativeElement: any };
  barChart: any;
  canvas: any;
  ctx: any;
  public chartMode: 'sex' | 'age' | 'ward' | 'religion' = 'sex';
  public barChartLabels: string[] = []; 
  public barChartData: number[] = [];

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.fetchUserData();
  }

  fetchUserData(): void {
    this.userService.getUsers().subscribe(data => {
      console.log("data:", data)
      if (this.chartMode === 'sex') {
        this.generateSexChart(data);
      } else if (this.chartMode === 'age') {
        this.generateAgeChart(data);
      } else if (this.chartMode === 'ward') {
        this.generateWardChart(data);
      } else {
        this.generateReligionChart(data);
      }
    });
  }

  generateSexChart(data: any[]): void {
    let maleCount = 0, femaleCount = 0, otherCount = 0;

    data.forEach(user => {
      if (user.sex === 'पुरुष') {
        maleCount++;
      } else if (user.sex === 'महिला') {
        femaleCount++;
      } else {
        otherCount++;
      }
    });

    this.barChartLabels = ['पुरुष', 'महिला', 'अन्य'];
    // console.log(this.barChartLabels)
    this.barChartData = [maleCount, femaleCount, otherCount];

    this.barChartbuilder();
  }

  generateAgeChart(data: any[]): void {
    let below18 = 0;
    let between18and59 = 0;
    let above60 = 0;
    data.forEach(user => {
      if (user.age < 18) {
        below18++;
      } else if (user.age >= 18 && user.age <= 59) {
        between18and59++;
      } else {
        above60++;
      }
    });

    this.barChartLabels = ['Below 18', '18-59', '60+'];
    this.barChartData = [below18, between18and59, above60];

    this.barChartbuilder();
  }

  generateReligionChart(data: any[]): void {
    let religionMap = new Map<string, number>();

    data.forEach(user => {
      let religion = user.religion || 'Unknown'; 
      religionMap.set(religion, (religionMap.get(religion) || 0) + 1);
    });

    this.barChartLabels = Array.from(religionMap.keys()); // Extract unique religion names
    this.barChartData = Array.from(religionMap.values()); // Extract respective counts

    this.barChartbuilder();
  }
  
  generateWardChart(data:any[]):void{
    let wardMap = new Map<string,number>();
    data.forEach(user=>{
      let ward = user.ward;
      wardMap.set(ward,(wardMap.get(ward) || 0) +1);
    });

    
    this.barChartLabels = Array.from(wardMap.keys()); // Extract unique religion names
    this.barChartData = Array.from(wardMap.values()); // Extract respective counts

    this.barChartbuilder();
  }
  barChartbuilder(): void {
    if (this.barChart) {
      this.barChart.destroy();
    }
    console.log("data",this.barChartLabels)

     this.canvas = this.barCanvas.nativeElement;
     this.ctx = this.canvas.getContext('2d');
    
    const backgroundColors=['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff', '#ff9f40','#b6babb','#341f7c','#6e1f7c']
    const datasetLabels = this.barChartLabels;
    this.barChart = new Chart(this.ctx, {
      type: 'bar',
      data: {
        labels: this.barChartLabels,
        datasets: [
          {
          label:'Bar',
          backgroundColor: backgroundColors.slice(0, this.barChartLabels.length),
          borderColor: '#000000',
          borderWidth: 1,
          data: this.barChartData,
        }
      ]
      },

    });
  }

  changeChartMode(mode: 'sex' | 'age' | 'ward'| 'religion'): void {
    this.chartMode = mode;
    this.fetchUserData();
  }
}
