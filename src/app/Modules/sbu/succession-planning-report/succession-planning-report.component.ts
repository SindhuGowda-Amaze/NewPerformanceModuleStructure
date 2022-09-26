import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-succession-planning-report',
  templateUrl: './succession-planning-report.component.html',
  styleUrls: ['./succession-planning-report.component.css']
})
export class SuccessionPlanningReportComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }

  ngOnInit(): void {
    
  }

}
