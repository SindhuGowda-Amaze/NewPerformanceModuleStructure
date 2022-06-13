import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';

@Component({
  selector: 'app-managerratingdash',
  templateUrl: './managerratingdash.component.html',
  styleUrls: ['./managerratingdash.component.css']
})
export class ManagerratingdashComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }

  stafflist: any;
  term: any;
  p: any = 1;
  count1: any = 10;
  stafflistCopy: any;
  Departmentlist: any;
  RoleTypeList: any;
  RoleType: any;
  Department: any;
  count: any;
  search:any;
  Apprisalcyclelist:any;
  AppraisalSubmitionDate:any;
  sDate:any;
  eDate:any;
  appraisalCycleName:any
  staffID:any;

  EmployeeKradash: any

  ngOnInit(): void {
    this.staffID = sessionStorage.getItem('EmaployedID');

    this.appraisalCycleName=0;
    this.Department = "";
    this.RoleType = "";
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data;
      this.stafflistCopy = this.stafflist

    });

    this.PerformanceManagementService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.approver1 == sessionStorage.getItem('EmaployedID') && x.selfScores != null && x.employeeSubmittedDate!=null);
      this.count = this.EmployeeKradash.length;
    });

    this.PerformanceManagementService.GetAppraisalCycle().subscribe(data => {
      debugger
      this.Apprisalcyclelist = data;
    });

  }

  public getRoleType(event: any) {
    debugger
    this.RoleType = event.target.value;
  }

  public FilterRoleType() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.roleType == this.RoleType);
      this.count1 = this.stafflist.length;
    });

  }

  public filterByDepartment() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data.filter(x => x.department == this.Department);
      this.count = this.stafflist.length;
    });

  }
  Staffkra: any;
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe(data => {
      debugger
      this.Staffkra = data.filter(x => x.staffName == details.staffid);
    });

  }

  public GetApprisalcycle(event: any) {
    debugger
    this.PerformanceManagementService.GetAppraisalCycle().subscribe(data => {
      debugger
      let temp: any = data.filter(x => x.id == event.target.value);
      this.AppraisalSubmitionDate = temp[0].employeeSubmissionDate;
      this.appraisalCycleName=temp[0].appraisalCycleName
      this.sDate = temp[0].cycleStartDate;
      this.eDate = temp[0].cycleEndDate;

    });
  }

  public GetFilteredAppraisalCycle() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.appraisalCycleName == this.appraisalCycleName && x.approver1==this.staffID && x.selfScores != null && x.employeeSubmittedDate!=null)
      // && 
    })
  }



}
