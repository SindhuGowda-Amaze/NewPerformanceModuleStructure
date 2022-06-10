import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-apprasial-report',
  templateUrl: './apprasial-report.component.html',
  styleUrls: ['./apprasial-report.component.css']
})
export class ApprasialReportComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  count: any;
  roleTypeList: any;
  roleTypeid: any;
  manager: any;
  managerList: any;
  StaffAppraisalList: any;
  search: any;
  dumpmanagerList: any;
  uniquelist: any;
  StaffID: any;
  roleid: any;
  employee: any;
  rolelist: any;
  rolelistCopy: any;
  p: any = 1;
  departmentAppraisalList: any;
  departmentid: any;
  count1: any = 10;
  ngOnInit(): void {
    this.StaffID = sessionStorage.getItem('EmaployedID')
    this.roleid = sessionStorage.getItem('roleid');
    this.departmentid=0;
    this. GetDepartment() ;
    this.GetRoleType();
    this.GetMyDetails();
    this.ConductappraisalStaffList();
    this.manager = 0;
    this.dumpmanagerList = 0;

  }


  getRoleID(even: any) {
    this.roleTypeid = even.target.value;
  }

  public GetRoleType() {
    this.PerformanceManagementService.GetRoleType().subscribe(
      data => {
        this.roleTypeList = data;
        console.log("type", this.roleTypeList);
        this.roleTypeid = 0;
      }
    )
  }



  getManager(even: any) {
    this.manager = even.target.value;
  }

  

  getdepartmentID(even: any) {
    this.departmentid = even.target.value;
  }

  public GetFilteredDepartment() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.StaffAppraisalList = data.filter(x => x.department == this.departmentid)
    })
  }

  public GetDepartment() {
    this.PerformanceManagementService.GetDepartmentMaster().subscribe(
      data => {
        this.departmentAppraisalList = data;
        console.log("departmentName", this.departmentAppraisalList);
        // this.roleTypeid = 0;
      }
    )
  }

  public GetMyDetails() {
    debugger
    this.PerformanceManagementService.GetMyDetails().subscribe(
      data => {
        debugger
        this.managerList = data.filter(x =>(x.supervisor == null || x.supervisor != null)  && x.role=='Manager')     // 10422 HR is taken as manager for all managers 
        const key = 'manager';
        const key1 = 'month'
        this.uniquelist = [...new Map(this.managerList.map((item: { [x: string]: any; }) =>

          [(item[key]), item])).values()]

      }
    )
  }

  public ConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(
      res => {
        debugger;
        let temp: any = res
        if (this.roleid == 3) {
          this.StaffAppraisalList = temp;
          this.dumpmanagerList = this.StaffAppraisalList

        }
        else if (this.roleid == 4) {
          this.StaffAppraisalList = temp;
          this.dumpmanagerList = this.StaffAppraisalList
          //  this.StaffAppraisalList = this.dumpmanagerList.filter((x: { cioScores: null;approver1:any }) => x.cioScores != null && x.approver1==this.StaffID)
          this.StaffAppraisalList = this.dumpmanagerList.filter((x: { approver1: any }) => x.approver1 == this.StaffID)

        }
      }
    )
  }


  fileName = 'Adjustment Report.xlsx';
  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('download');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, this.fileName);
  }

  public GetFilteredRoleType() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.StaffAppraisalList = data.filter(x => x.type == this.roleTypeid)
    })
  }


  public GetFilteredManager() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(data => {
      debugger
      this.StaffAppraisalList = data.filter(x => x.managername == this.manager)
    })
  }

  public FilterAttendence() {
    debugger
  
    let searchCopy = this.search.toLowerCase();
    this.StaffAppraisalList = this.dumpmanagerList.filter((x: { name: string }) =>x.name.toLowerCase().includes(searchCopy));
    this.count = this.StaffAppraisalList.length;
  }
}








function x(x: any, manager: any): any {
  throw new Error('Function not implemented.');
}

