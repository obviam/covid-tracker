import { InfectionData } from './../../model/infection-data.model';
import { CountryData } from './../../model/country-data.model';
import { AppService } from './../../services/app.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import * as _ from 'lodash';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {

  @ViewChild('lineCanvas', { static: true }) lineCanvas: ElementRef;

  private lineChart: Chart;

  countryData: CountryData;

  constructor(
    private route: ActivatedRoute,
    private appService: AppService,
    private router: Router) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    const countryCode = this.route.snapshot.paramMap.get('code');
    if (!this.appService.isLoaded()) {
      this.router.navigate(['/home']);
      // this.appService.refreshData(this.populateData, countryCode);
    } else {
      this.populateData(countryCode);
    }
  }

  populateData(countryCode: string) {
    this.countryData = this.appService.getCountry(countryCode);
    const tmpDailyData = [...this.countryData.dailyData];
    // reverse the array so the last 7 days will be complete
    const rolling7Days = _.chain(tmpDailyData)
      .reverse()
      .chunk(7)
      .reverse()
      .value();

    const rolledUpData: Array<InfectionData> = [];
    rolling7Days.forEach(sevenDayData => {
      const weekData = Array.from(sevenDayData);
      const confirmed = weekData
        .map(data => (data as InfectionData).confirmed)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      const deaths = weekData
        .map(data => (data as InfectionData).deaths)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      const recovered = weekData
        .map(data => (data as InfectionData).recovered)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
      const infectionData = new InfectionData();
      infectionData.confirmed = confirmed;
      infectionData.deaths = deaths;
      infectionData.recovered = recovered;
      // since each sub-array is reversed, the first element is the most recent
      infectionData.date = _.head(weekData).date;
      rolledUpData.push(infectionData);
    });

    // splice it in place
    // rolledUpData.splice(0, rolledUpData.length - 8);

    const confirmedSeries = this.countryData.dailyData.map(data => data.confirmed).filter(data => data > 0);
    const xLabels = this.countryData.dailyData.map(data => data.date)
      .splice(this.countryData.dailyData.length - confirmedSeries.length);
    const deathsSeries = this.countryData.dailyData.map(data => data.deaths)
      .splice(this.countryData.dailyData.length - confirmedSeries.length);
    const recoveredSeries = this.countryData.dailyData.map(data => data.recovered)
      .splice(this.countryData.dailyData.length - confirmedSeries.length);

    const confirmedSeriesRollup = rolledUpData.map(data => data.confirmed);
    const xLabelsRollup = rolledUpData.map(data => data.date);
    const deathsSeriesRollup = rolledUpData.map(data => data.deaths);
    const recoveredSeriesRollup = rolledUpData.map(data => data.recovered);

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: xLabelsRollup,
        datasets: [
          {
            label: 'Confrimed',
            fill: true,
            backgroundColor: 'rgba(255,25,133,0.4)',
            borderColor: 'rgba(255,25,133,1)',
            data: confirmedSeriesRollup
          },
          {
            label: 'Deaths',
            fill: true,
            backgroundColor: 'rgba(79,79,79,0.4)',
            borderColor: 'rgba(79,79,79,1)',
            data: deathsSeriesRollup
          },
          {
            label: 'Recovered',
            fill: true,
            backgroundColor: 'rgba(79,255,79,0.4)',
            borderColor: 'rgba(79,255,79,1)',
            data: recoveredSeriesRollup
          }
        ]
      }/*,
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'COVID-19'
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Month'
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Value'
            }
          }]
        }
      }*/
    });
  }
}
