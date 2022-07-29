//  Product :Digi PerformanceManagement System 1.0 
// /Date : 1 March, 2022
// --Author :Prasanth,Praveen,Sindhu,Anusha,Madhava,Manikanta
// --Description :This page contains get data from GetAppraisalCycle,GetRoleType,GetMyDetails,EmployeeKraMap ,LearningAndDevelopement,Staff,in open Window 
// --Last Modified Date : 26 July , 2022
// --Last Modified Changes :   Added comments
// --Last Modified By : Manikanta
// --Copyrights : AmazeINC-Bangalore-2022

import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pipreport',
  templateUrl: './pipreport.component.html',
  styleUrls: ['./pipreport.component.css']
})
export class PIPReportComponent implements OnInit {
  constructor(private PerformanceManagementService: PerformancemanagementService) { }
  //Variable Declaration
  count: any;
  roleTypeList: any;
  roleTypeid: any;
  manager: any;
  managerList: any;
  StaffAppraisalList: any;
  FilteredStaffAppraisalList: any;
  search: any;
  dumpmanagerList: any;
  uniquelist: any;
  StaffID: any;
  roleid: any;
  employee: any;
  rolelist: any;
  rolelistCopy: any;
  p: any = 1;
  count1: any = 10;
  department: any;
  role: any;
  rate: any;
  comments: any;
  pipActionID: any;
  updaterate: any;
  separation: any;
  list: any;
  Score: any;
  Type: any
  lastworkingdate: any;
  Notes: any;
  staffID: any;
  StaffPIPActionItemList: any;
  Attachment: any;
  empComments: any;
  submitted: any;
  currentUrl: any
  viewMode = 'tab1';
  RemovedFromPIPList: any;
  RelivedfromOrgPIPList: any;

  ngOnInit(): void {
    //Variable Initialisation and Default Method Calls//
    this.currentUrl = window.location.href;
    this.Type = "Select Type"
    this.Score = "0"

    this.StaffID = sessionStorage.getItem('EmaployedID')
    this.roleid = sessionStorage.getItem('roleid');
    // this.GetMyDetails();
    this.ConductappraisalStaffList();
    this.GetPiPActionItemsForStaff();
    this.HighScore();
    this.employee = 0;
    this.dumpmanagerList = 0;

  }

  public ViewScores(event: any) {
    debugger;
    this.staffID = event.id;
    let StaffTypeID = event.type;

    // this.router.navigate(['/StaffScoreFullDetails', StaffID, StaffID]);

  }

  getEmployee(even: any) {
    this.employee = even.target.value;
    // this.PerformanceManagementService.GetConductappraisalStaffListforpip().subscribe(
    //   res => {
    //     debugger;
    //     let temp: any = res
    //       this.StaffAppraisalList = temp.filter((x: { id: any; })=>x.id==this.employee);;
    //       this.role=this.StaffAppraisalList[0].role
    //       this.department=this.StaffAppraisalList[0].departmentName
    //       this.rate=this.StaffAppraisalList[0].finalrating
    //       this.StaffAppraisalList = temp

    //   }
    // )
  }

  public getpipActionID(details: any) {
    this.pipActionID = details.id
  }

//Method to get ConductappraisalStaffList from staff Table 
  public ConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffListforpip().subscribe({
      next: res => {
        debugger
        if (this.roleid == 4) {
          let temp: any = res.filter(x => x.supervisor == this.StaffID)
          this.StaffAppraisalList = temp.filter((x: { hrSubmittedDate: null; }) => x.hrSubmittedDate != null);
        }
        else {
          let temp: any = res
          this.StaffAppraisalList = temp.filter((x: { hrSubmittedDate: null; }) => x.hrSubmittedDate != null);
        }


        const key = 'employee';
        const key1 = 'month'
        this.uniquelist = [...new Map(this.StaffAppraisalList.map((item: { [x: string]: any; }) =>

          [(item[key]), item])).values()]
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting ConductappraisalStaffListforpip');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }
//Method to  Get PiPActionItemsForStaff from PiPActionItemsForStaff
  public GetPiPActionItemsForStaff() {
    this.PerformanceManagementService.GetPiPActionItemsForStaff().subscribe({
      next: res => {
        debugger
        this.RemovedFromPIPList = res.filter(x => x.removeFromPIP == 1)
        let temp: any = res.filter(x => x.staffID == this.StaffID)
        this.StaffPIPActionItemList = temp
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting PiPActionItemsForStaff');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  
  public GetStaffExitFormality() {
    this.PerformanceManagementService.GetStaffExitFormality().subscribe({
      next: res => {
        debugger
        this.RelivedfromOrgPIPList = res.filter(x => x.pipReleivedFromOrg == 1)

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting StaffExitFormality');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }





//Metho to update ReAppraisalHRrating from PiPActionItemsForStaff Table
  update() {
    debugger
    if (this.Score == undefined || this.Score == 0) {
      Swal.fire("Please enter the Rating");
    }
    else {
      var entity = {
        'StaffID': this.staffID,
        'CIOScores': this.Score
      }
      this.PerformanceManagementService.UpdateReAppraisalHRrating(entity).subscribe({
        next: data => {
          debugger
          Swal.fire("Updated Successfully");
          this.ngOnInit();
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Updating ReAppraisalHRrating');
          // Insert error in Db Here//
          var obj = {
            'PageName': this.currentUrl,
            'ErrorMessage': err.error.message
          }
          this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
            data => {
              debugger
            },
          )
        }
      })

    }

  }

  public show() {
    this.submitted = 1
  }

//Method to get Score from  HighScores Table 
  public HighScore() {
    debugger
    this.PerformanceManagementService.GetHighScores().subscribe({
      next: data => {
        debugger
        this.list = data.filter(x => x.score > 2);

      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting HighScores');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }

  remove() {
    var eb = {
      'StaffID': this.staffID,
      'Notes': this.Notes,
      'lastworkingdate': this.lastworkingdate,
      'type': this.Type,
      'PIPReleivedFromOrg': 1

    }
    this.PerformanceManagementService.InsertStaffExitFormalityPIP(eb).subscribe({
      next: data => {
        debugger
        Swal.fire("Successfully Moved to Exit Formality!!");
        this.staffID = "",
          this.Notes = "",
          this.lastworkingdate = "",
          this.Type = ""
        this.ngOnInit();
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting Expenses List Web');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }





  files: File[] = [];
  onSelect(event: { addedFiles: any; }) {
    debugger
    console.log(event);
    this.files.push(event.addedFiles[0]);
    this.uploadattachments();
    console.log("content", this.files);
  }


  onRemove(event: any) {
    debugger
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  //Method to uploadattachments from ProjectAttachments
  public uploadattachments() {
    debugger
    this.PerformanceManagementService.ProjectAttachments(this.files).subscribe({
      next: res => {
        debugger
        this.Attachment = res;
        alert("ATTACHMENT UPLOADED");
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Project Attachments');
        // Insert error in Db Here//
        var obj = {
          'PageName': this.currentUrl,
          'ErrorMessage': err.error.message
        }
        this.PerformanceManagementService.InsertExceptionLogs(obj).subscribe(
          data => {
            debugger
          },
        )
      }
    })
  }
//method to UpdatePipEmployeeKraMap in EmployeeKraMap
  public UpdatePipEmployeeKraMap() {
    debugger
    if (this.empComments == undefined || this.empComments == 0) {
      Swal.fire("Please enter the Rating");
    }
    else {
      var entity = {
        'StaffName': this.StaffID,
        'StaffTypeID': 1,
        'PIPActionID': this.pipActionID,
        'PipComments': this.empComments,
        'PipAttachment': this.Attachment
      }
      this.PerformanceManagementService.UpdatePipEmployeeKraMap(entity)
        .subscribe(data => {
          debugger
          Swal.fire("Submitted Sucssessfully");
        })


    }
    this.show();

  }
}