import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-key-result-area',
  templateUrl: './key-result-area.component.html',
  styleUrls: ['./key-result-area.component.css']
})
export class KeyResultAreaComponent implements OnInit {


  constructor(private PerformanceManagementService: PerformancemanagementService) { }

  keyresultlist: any;
  count: any;
  search: any;
  roleTypeid: any;
  roleTypeList: any;
  newrolelist: any;
  short: any;
  currentUrl: any;
  dummkeyresultlist: any;

  ngOnInit(): void {
    this.currentUrl = window.location.href;
    this.GetKeyResultArea();
    this.GetRoleType();
    this.roleTypeid = 0;
  }

  getRoleID(even: any) {
    this.roleTypeid = even.target.value;
    debugger
    if (even.target.value != 0) {
      this.keyresultlist = this.dummkeyresultlist.filter((x: { role: any; }) => x.role == this.roleTypeid);
      this.count = this.keyresultlist.length;
    }
    else {
      this.GetKeyResultArea()
    }
  }

  public GetRoleType() {
    this.PerformanceManagementService.GetRoleType().subscribe({
      next: data => {
        debugger
        this.roleTypeList = data;
        console.log("type", this.roleTypeList);
        this.roleTypeid = 0;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting RoleType');
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

  public GetKeyResultArea() {
    debugger
    this.PerformanceManagementService.GetKeyResultArea()

      .subscribe({
        next: data => {
          debugger
          this.keyresultlist = data;
          this.dummkeyresultlist = data;
          this.count = this.keyresultlist.length;
          console.log("result", this.keyresultlist);
        }, error: (err: { error: { message: any; }; }) => {
          Swal.fire('Issue in Getting KeyResultArea');
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


//Method to delete KRA//
  public delete(ID: any) {
    debugger
    Swal.fire({
      title: 'Are you sure?',
      text: 'You Want to delete it.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value == true) {
        this.PerformanceManagementService.DeleteKeyResultArea(ID).subscribe({
          next: data => {
            debugger
            Swal.fire('Deleted Successfully')
            this.GetKeyResultArea();
          }, error: (err: { error: { message: any; }; }) => {
            Swal.fire('Issue in Deleting KeyResultArea');
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
    })
  }











}
function x(x: any): any {
  throw new Error('Function not implemented.');
}

