import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';

@Component({
  selector: 'app-key-result-area',
  templateUrl: './key-result-area.component.html',
  styleUrls: ['./key-result-area.component.css']
})
export class KeyResultAreaComponent implements OnInit {

  
  constructor(private PerformanceManagementService: PerformanceManagementService) { }

  keyresultlist: any;
  count: any;
  search: any;
  roleTypeid: any;
  roleTypeList: any;
  newrolelist: any;
  short: any;

  ngOnInit(): void {
    this.GetKeyResultArea();
    this.GetRoleType();
    this.roleTypeid=0;

  }

  getRoleID(even: any) {
    this.roleTypeid = even.target.value;
    debugger
    if (even.target.value != 0) {
      this.keyresultlist = this.dummkeyresultlist.filter((x: { role: any; }) => x.role == this.roleTypeid);
      this.count=this.keyresultlist.length;
    }
    else {
      this.GetKeyResultArea()
    }
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



  dummkeyresultlist: any;

  public GetKeyResultArea() {
    debugger
    this.PerformanceManagementService.GetKeyResultArea().subscribe(
      data => {
        this.keyresultlist = data;
        this.dummkeyresultlist = data;
        this.count = this.keyresultlist.length;
        console.log("result", this.keyresultlist);
      })
  }



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
        this.PerformanceManagementService.DeleteKeyResultArea(ID).subscribe(
          data=>{
          debugger
          Swal.fire('Deleted Successfully')
          this.GetKeyResultArea();
        })
      }
    })
  }











}
function x(x: any): any {
  throw new Error('Function not implemented.');
}

