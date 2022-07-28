import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-key-performace-indicatorform',
  templateUrl: './key-performace-indicatorform.component.html',
  styleUrls: ['./key-performace-indicatorform.component.css']
})
export class KeyPerformaceIndicatorformComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService,
    private ActivatedRoute: ActivatedRoute) { }


  performanceIndicator: any;
  description: any;
  kpilist: any;
  id: any;
  indicatorlist: any;
  kraid: any;
  kratypelist: any;
  kpiName: any;
  indicatorid: any;
  performancelist: any;
  rating: any;
  performanceIndicatorId: any;
  goaltypelist: any;
  goaltypeid: any;
  kraType: any
  dumpgoallist: any;
  kratypeid: any;
  currentUrl: any


  ngOnInit(): void {
    this.currentUrl = window.location.href;

    this.kraid = 0;
    this.GetKPI();
    this.GetKeyResultArea();
    this.GetPerformanceIndicatorMaster();
    this.GetKraMaster();
    this.goaltypeid = "";

    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.GetKPI();
      }
    })

    this.performanceIndicatorId = 0;
  }




  GetKPI() {
    this.PerformanceManagementService.GetKPI().subscribe({
      next: data => {
        debugger
        this.kpilist = data;
        this.kpilist = this.kpilist.filter((x: { id: any; }) => x.id == Number(this.id));
        this.kraid = this.kpilist[0].kraID;
        // this.performanceIndicator=this.kpilist[0].performanceIndicator;
        this.description = this.kpilist[0].description;
        this.kpiName = this.kpilist[0].kpiName;
        this.indicatorid = this.kpilist[0].performanceIndicatorId;
        this.goaltypeid = this.kpilist[0].kraTypeID;
        console.log("Kpilist", this.kpilist);
        this.GetKraMaster();
        this.GetKeyResultArea();
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting KPI');
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
    this.PerformanceManagementService.GetKeyResultArea().subscribe({
      next: data => {
        debugger
        this.kratypelist = data;
        console.log("kratype", this.kratypelist);
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

  getkraid(even: any) {
    debugger
    this.kraid = even.target.value;

  }



  getindicatorid(even: any) {
    this.indicatorid = even.target.value;
  }


  public GetPerformanceIndicatorMaster() {
    this.PerformanceManagementService.GetPerformanceIndicatorMaster().subscribe({
      next: data => {
        debugger
        this.performancelist = data;
        console.log("performancetype", this.performancelist);
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting PerformanceIndicatorMaster');
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





  save() {
    var json = {
      "KraID": this.kraid,
      // "PerformanceIndicator":this.performanceIndicator,
      "Description": this.description,
      "KpiName": this.kpiName,
      "PerformanceIndicatorId": this.indicatorid

    };
    this.PerformanceManagementService.InsertKPI(json).subscribe({
      next: data => {
        debugger
        Swal.fire("Successfully Submitted...!");
        location.href = "#/KeyPerformanceIndicator"
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Inserting KPI');
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

  Update() {
    debugger
    var json = {
      "ID": this.id,
      "KraID": this.kraid,
      // "PerformanceIndicator":this.performanceIndicator,
      "Description": this.description,
      "KpiName": this.kpiName,
      "PerformanceIndicatorId": this.indicatorid

    };

    this.PerformanceManagementService.UpdateKPI(json).subscribe({
      next: data => {
        debugger
        let indicatorlist = data;
        Swal.fire("Updated Successfully");
        location.href = "#/KeyPerformanceIndicator";
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Updating KPI');
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

  cancel() {
    location.href = "#/KeyPerformanceIndicator";
  }



  getgoaltype(event: any) {
    this.goaltypeid = event.target.value;

    this.PerformanceManagementService.GetKeyResultArea().subscribe({
      next: data => {
        debugger
        this.kratypelist = data.filter(x => x.kraTypeID == this.goaltypeid);
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



  public GetKraMaster() {
    this.PerformanceManagementService.GetKraMaster().subscribe({
      next: data => {
        debugger
        this.goaltypelist = data;
      }, error: (err: { error: { message: any; }; }) => {
        Swal.fire('Issue in Getting KraMaster');
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
