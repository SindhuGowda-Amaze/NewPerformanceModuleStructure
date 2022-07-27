import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
@Component({
  selector: 'app-employee-tile-dashboard',
  templateUrl: './employee-tile-dashboard.component.html',
  styleUrls: ['./employee-tile-dashboard.component.css']
})
export class EmployeeTileDashboardComponent implements OnInit {

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
  ResultAreaList:any;
  HrSubmittedDate:any;
  CycleEndDate:any;
  EmployeeKradash: any
  ManagerSubmittedDate:any
  EmployeeSubmittedDate:any
  AppraisalSubmitionDate:any;
  appraisallist:any;
  GoalSettingDate:any;
  SbuSubmittedDate:any;

  ngOnInit(): void {

    this.Department = "";
    this.RoleType = "";
    this.PerformanceManagementService.GetMyDetails().subscribe(data => {
      debugger
      this.stafflist = data;
      this.stafflistCopy = this.stafflist
      this.count = this.stafflist.length;
    });

    this.PerformanceManagementService.GetDepartment().subscribe(data => {
      debugger
      this.Departmentlist = data;
    });

    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.EmployeeKradash = data.filter(x => x.staffid == sessionStorage.getItem('EmaployedID'));
    });


    this.PerformanceManagementService.GetKRAByStaffID(sessionStorage.getItem('EmaployedID')).subscribe(data => {
      debugger
      this.ResultAreaList = data;
      this.CycleStartDate=this.ResultAreaList[0].cycleStartDate
      this.CycleEndDate=this.ResultAreaList[0].cycleEndDate
      this.ManagerSubmittedDate=this.ResultAreaList[0].managerSubmittedDate
      this.HrSubmittedDate=this.ResultAreaList[0].hrSubmittedDate
      this.EmployeeSubmittedDate=this.ResultAreaList[0].employeeSubmittedDate
      this.SbuSubmittedDate=this.ResultAreaList[0].sbuSubmittedDate

      this.AppraisalSubmitionDate=this.ResultAreaList[0].appraisalSubmitionDate

    })



      this.PerformanceManagementService.GetAppraisalCycle().subscribe(
        data => {
          debugger
        this.appraisallist=data;
        this.GoalSettingDate=this.appraisallist[0].goalSettingDate
        this.count=this.appraisallist.length;
        })

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
      this.count = this.stafflist.length;
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
  CycleStartDate:any;
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe(data => {
      debugger
      this.Staffkra = data.filter(x => x.staffName == details.staffid);
      this.count = this.Staffkra.length;
    });
  }



  


}
