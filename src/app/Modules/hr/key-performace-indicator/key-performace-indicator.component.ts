import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-key-performace-indicator',
  templateUrl: './key-performace-indicator.component.html',
  styleUrls: ['./key-performace-indicator.component.css']
})
export class KeyPerformaceIndicatorComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService) { }

  indicatorlist: any;
  count: any;
  search: any;
  kratypelist: any;
  kraid: any;
  dummindicatorlist: any;
  kraName: any;
  kratypeid:any;
  dummkeyresultlist:any;
  kralist:any;
  ngOnInit(): void {
     this.GetKPI();
    this.GetKraMaster();
    this.GetKeyResultArea();
    this.kraid = 0;
this.kratypeid="";
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
        this.PerformanceManagementService.DeleteKPI(ID).subscribe(
          data => {
            debugger
            Swal.fire('Deleted Successfully')
            location.reload();
          })
      }
    })
  }

  public GetKeyResultArea() {
    debugger
    this.PerformanceManagementService.GetKeyResultArea().subscribe(
      data => {
        this.kralist = data;
        this.dummkeyresultlist = data;
        console.log("kratype", this.kratypelist);
      }
    )
  }

  public GetKraMaster() {
    debugger
    this.PerformanceManagementService.GetKraMaster().subscribe(
      data => {
        this.kratypelist = data;
        this.dummkeyresultlist = data;
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

  getkratypeid(event: any) {
    debugger
    this.kratypeid = event.target.value
    this.indicatorlist = this.dummkeyresultlist.filter((x: { kraTypeID: any; }) => x.kraTypeID == this.kratypeid);
    this.count = this.indicatorlist.length;
    

  }


}
