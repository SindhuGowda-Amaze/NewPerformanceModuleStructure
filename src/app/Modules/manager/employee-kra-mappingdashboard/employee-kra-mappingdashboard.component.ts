import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-kra-mappingdashboard',
  templateUrl: './employee-kra-mappingdashboard.component.html',
  styleUrls: ['./employee-kra-mappingdashboard.component.css']
})
export class EmployeeKraMappingdashboardComponent implements OnInit {
  constructor(private PerformanceManagementService: PerformancemanagementService) { }

  kpiid: any;
  ID: any;
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
  kratypelist: any;
  kraid: any;
  indicatorlist: any;
  dummindicatorlist: any;
  StaffID:any;
  search:any;
  EmployeeKradash: any

  Apprisalcyclelist:any;
  AppraisalSubmitionDate:any;
  sDate:any;
  eDate:any;
  appraisalCycleName:any


  kratypeid:any;
  dropdownList1:any;
  GoalTypelist:any;
  kpilist:any;
kpitypelist:any;

  ngOnInit(): void {
    this.kraid="";
    this.StaffID = sessionStorage.getItem('EmaployedID');
    this.GetKPI();
    this.StaffID = sessionStorage.getItem('EmaployedID')
    this.kraid="";
    this.GetKeyResultArea();
    this.kratypeid="";
    this.Department = "";
    this.RoleType = "";
    this.appraisalCycleName=0;
  
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
      this.EmployeeKradash = data.filter(x=>x.approver1==this.StaffID);
      this.count = this.EmployeeKradash.length;
      console.log("list",this.EmployeeKradash);
    });

    this.PerformanceManagementService.GetAppraisalCycle().subscribe(data => {
      debugger
      this.Apprisalcyclelist = data.filter(x=>x.appraisalClose!=1);
    });

    this.PerformanceManagementService.GetKraMaster().subscribe(data => {
      debugger
      this.GoalTypelist = data;
    });
    this.PerformanceManagementService.GetKPI().subscribe(
      data=>{
        this.indicatorlist=data;
      }
    )

   
  }

  getkpiid(event: any) {
    this.kpiid = event.target.value;


  }


  public GetKPI() {
    debugger
    this.PerformanceManagementService.GetKPI().subscribe(
      data => {
        this.indicatorlist = data;
        this.dummindicatorlist = data;
        this.count = this.indicatorlist.length;
        console.log("kpilist", this.indicatorlist);
      }
    )
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
  public GetStaffKraDetails(details: any) {
    debugger
    this.PerformanceManagementService.GetEmployeeKraMap().subscribe(data => {
      debugger
      this.Staffkra = data.filter(x => x.kpiName != null && x.staffName == details.staffid);
      // .filter(x => x.staffName == details.staffid && x.kpiName != null);
    });

  }



  public GetKeyResultArea() {
    debugger
    this.PerformanceManagementService.GetKeyResultArea().subscribe(
      data => {
        this.kratypelist = data.filter(x=>x.kraTypeID==this.kratypeid);
        console.log("kratype", this.kratypelist);
      }
    )
  }


  getkraid(even: any) {
    debugger
    this.kraid = even.target.value;
    debugger
    if (even.target.value != 0) {
      this.indicatorlist = this.dummindicatorlist.filter((x: { kraName: any; }) => x.kraName == this.kraid);
      this.count = this.indicatorlist.length;
    }
    else {
      this.GetKPI();
    }
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
      this.EmployeeKradash = data.filter(x => x.appraisalCycleName == this.appraisalCycleName && x.approver1==this.StaffID)
    })
  }

  edit(details: any) {
    debugger
    this.kraid = details.kraid;
    this.kpiid = details.kpiid;
    this.kratypeid=details.kraTypeID
    this.ID = details.id;
    this.GetKPI();
    this.GetKeyResultArea();
    this.PerformanceManagementService.GetKeyResultArea().subscribe(
      data => {
        this.kratypelist = data;
      
      }
    )
    this.PerformanceManagementService.GetKPI().subscribe(
      data=>{
        debugger
        this.kpitypelist=data.filter(x=>x.kraFilterid==this.kraid);
        debugger
      }
    )
  }


  update() {
    debugger
    var entity = {
      "ID": this.ID,
      "kraid": this.kraid,
      "kpiid": this.kpiid
    }
    this.PerformanceManagementService.Updatekranew(entity).subscribe(
      data => {
      }
    )
    Swal.fire("Updated Successfully");
  }


  getkratypeid(event: any) {
    debugger
    this.kratypeid = event.target.value;
    this.PerformanceManagementService.GetKeyResultArea().subscribe(
      data => {
        this.kratypelist = data.filter(x=>x.kraTypeID==this.kratypeid);
        console.log("kratype", this.kratypelist);
      }
    )
  }


  getgoaltype(event:any){
    debugger
    this.kraid=event.target.value;
    debugger
    this.PerformanceManagementService.GetKPI().subscribe(
      data=>{
        debugger
        this.kpitypelist=data.filter(x=>x.kraFilterid==this.kraid);
        debugger
      }
    )
  }




}