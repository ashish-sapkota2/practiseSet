import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { UserService } from '../../_service/user.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrl: './pie.component.css'
})
export class PieComponent implements AfterViewInit {
  canvas: any;
  ctx: any;
  @ViewChild('pieCanvas') pieCanvas!: { nativeElement: any };
  pieChart: any;

  public pieChartLabels: string[] = ['पुरुष', 'महिला', 'अन्य']; 
  public pieChartData: number[] = [0, 0, 0]; 
  public chartMode: 'sex' | 'age' | 'ward' | 'religion' = 'sex';
  public pieChartType = 'pie'; 

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    this.userService.getUsers().subscribe(data => {
      if(this.chartMode==='sex'){

        this.generateSexPiechartData(data);
      }else if(this.chartMode==='age'){
        this.generateAgePieChart(data);
      }else if(this.chartMode='ward'){
        this.generateWardPieChart(data);
      }
      else{
        this.generateReligionChart(data);
      }
    });
  }

  generateSexPiechartData(data: any[]): void {
    let maleCount = 0;
    let femaleCount = 0;
    let otherCount = 0;

    data.forEach(user => {
      if (user.sex === 'पुरुष') { 
        maleCount++;
      } else if (user.sex === 'महिला') { 
        femaleCount++;
      } else {
        otherCount++;
      }
    });
    this.pieChartLabels=['पुरुष', 'महिला', 'अन्य'];
    this.pieChartData = [maleCount, femaleCount, otherCount];

    this.pieChartbuilder();
  }
  generateAgePieChart(data:any[]):void{
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

    this.pieChartLabels = ['Below 18', '18-59', '60+'];
    this.pieChartData = [below18, between18and59, above60];

    this.pieChartbuilder();
  }
  generateReligionChart(data: any[]): void {
    let religionMap = new Map<string, number>();

    data.forEach(user => {
      let religion = user.religion
      religionMap.set(religion, (religionMap.get(religion) || 0) + 1);
    });

    this.pieChartLabels = Array.from(religionMap.keys()); // Extract unique religion names
    this.pieChartData = Array.from(religionMap.values()); // Extract respective counts

    this.pieChartbuilder();
  }
  generateWardPieChart(data:any[]):void{
    let wardMap = new Map<string,number>();
    data.forEach(user=>{
      let ward = user.ward;
      wardMap.set(ward,(wardMap.get(ward) || 0) +1);
    });

    
    this.pieChartLabels = Array.from(wardMap.keys());
    this.pieChartData = Array.from(wardMap.values()); 

    this.pieChartbuilder();
  }

  pieChartbuilder(): void {
    if(this.pieChart){
      this.pieChart.destroy();
    }
    this.canvas = this.pieCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    // Create the pie chart
    this.pieChart = new Chart(this.ctx, {
      type: 'pie',
      data: {
        labels: this.pieChartLabels, 
        datasets: [
          {
            backgroundColor: ['#ff6384', '#36a2eb', '#ffce56','#3ec642','#1ec2d3','#b6babb','#341f7c','#6e1f7c'],
            data: this.pieChartData, 
          }
        ]
      }
    });
  }
  changeChartMode(mode: 'sex' | 'age' |'ward'| 'religion'): void {
    this.chartMode = mode;
    this.userService.getUsers().subscribe(data => {
      if(this.chartMode==='sex'){

        this.generateSexPiechartData(data);
      }else if(this.chartMode==='age'){
        this.generateAgePieChart(data);
      }else if(this.chartMode==='ward'){
        this.generateWardPieChart(data);
      }
      else{
        this.generateReligionChart(data)
      }
    });
  }
}
