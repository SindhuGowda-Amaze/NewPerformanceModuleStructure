import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pip',
  templateUrl: './pip.component.html',
  styleUrls: ['./pip.component.css']
})
export class PipComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }
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


  ngOnInit(): void {
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
  StaffPIPActionItemList1: any;

  public ConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffListforpip().subscribe({
      next: (res: any[]) => {
        debugger
        debugger;
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

  PipComments: any;
  PipAttachment: any;
  public GetPiPActionItemsForStaff() {
    this.PerformanceManagementService.GetPiPActionItemsForStaff().subscribe({
      next: res => {
        debugger
        let temp: any = res.filter(x => x.staffID == this.StaffID)
        this.StaffPIPActionItemList = temp

        this.StaffPIPActionItemList1 = res
        this.PipComments = this.StaffPIPActionItemList1[0].pipComments
        this.PipAttachment = this.StaffPIPActionItemList1[0].attachment
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
      'type': this.Type
    }
    this.PerformanceManagementService.InsertStaffExitFormality(eb).subscribe({
      next: data => {
        debugger
        Swal.fire("Successfully Moved to Exit Formality!!");
        this.staffID = "",
          this.Notes = "",
          this.lastworkingdate = "",
          this.Type = ""
        this.ngOnInit();
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Inserting StaffExitFormality');
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

  public UpdatePipEmployeeKraMap() {
    debugger
    if (this.empComments == undefined || this.empComments == 0) {
      Swal.fire("Please enter the Rating");
    }
    else {
      var entity = {
        'StaffName': this.StaffID,
        // 'StaffTypeID':1,
        'PIPActionID': this.pipActionID,
        'PipComments': this.empComments,
        'PipAttachment': this.Attachment
      }
      this.PerformanceManagementService.UpdatePipEmployeeComments(entity).subscribe({
        next: data => {
          debugger
          Swal.fire("Submitted Sucssessfully");
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Updating PipEmployeeCommentsb');
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
    this.show();

  }
}