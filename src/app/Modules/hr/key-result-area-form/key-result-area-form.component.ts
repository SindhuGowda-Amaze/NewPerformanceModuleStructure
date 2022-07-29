import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-key-result-area-form',
  templateUrl: './key-result-area-form.component.html',
  styleUrls: ['./key-result-area-form.component.css']
})
export class KeyResultAreaFormComponent implements OnInit {

  constructor(private PerformanceManagementService: PerformancemanagementService,
    private ActivatedRoute: ActivatedRoute) { }

  kraName: any;
  description: any;
  kratypelist: any;
  kratypeid: any;
  id: any;
  keyresultlist: any;
  role: any;
  roleTypeid: any;
  roleTypeList: any;
  kraType: any;
  short: any;
  tablecount: any;
  entity: any;
  kratype: any;
  rolename: any;
  keyresultArray: any = [];
  ngOnInit(): void {

    this.GetKraMaster();
    this.GetRoleType();
    this.roleTypeid = "";
    this.kratypeid="";

    this.ActivatedRoute.params.subscribe(params => {
      this.id = params['id'];
      if (this.id != undefined && this.id != null) {
        this.GetKeyResultArea();
        this.kratypeid = "";
      }
      else {

      }
    })
  }

  GetKeyResultArea() {
    this.PerformanceManagementService.GetKeyResultArea().subscribe(
      data => {
        debugger
        this.keyresultlist = data;
        this.keyresultlist = this.keyresultlist.filter((x: { id: any; }) => x.id == Number(this.id));
        this.kraName = this.keyresultlist[0].kraName;
        this.kratypeid = this.keyresultlist[0].kraTypeID;
        // this.rolename=this.keyresultArray[0].type;
        this.roleTypeid = this.keyresultlist[0].role;
        this.description = this.keyresultlist[0].description
        // this.kratype=this.kratypelist[0].kraType
        this.GetKraMaster();
      }
    )
  }

  public GetKraMaster() {
    this.PerformanceManagementService.GetKraMaster().subscribe(
      data => {
        this.kratypelist = data;
        console.log("kratype", this.kratypelist);
        // this.kratypeid = "";
      }
    )
  }

  getRoleID(even: any) {
    this.roleTypeid = even.target.value;
    var list = this.roleTypeList.filter((x: { id: any; }) => x.id == this.roleTypeid);
    this.rolename = list[0].short
    console.log("type", this.roleTypeList);
  }

  public GetRoleType() {
    this.PerformanceManagementService.GetRoleType().subscribe(
      data => {
        this.roleTypeList = data;
        this.rolename = this.roleTypeList[0].type
        console.log("type", this.roleTypeList);
        this.roleTypeid = "";
      }
    )
  }

  getkratypeid(event: any) {
    debugger
    this.kratypeid = event.target.value
  }

  Add() {
    debugger
    this.tablecount = 1;
    var json = {
      "KRAName": this.kraName,
      "KraTypeID": this.kratypeid,
      "Type": this.rolename,
      "Role": this.roleTypeid,
      "Description": this.description
    };
    debugger
    this.keyresultArray.push(json)
    this.kraName = "";
    this.kratypeid = "";
    this.rolename = "";
    this.roleTypeid = "";
    this.description = "";
  }


  save() {
    debugger
    for (let i = 0; i <= this.keyresultArray.length; i++) {
      debugger
      var entity = {
        "KRAName": this.keyresultArray[i].KRAName,
        "KraTypeID": this.keyresultArray[i].KraTypeID,
        "Role": this.keyresultArray[i].Role,
        "Description": this.keyresultArray[i].Description
      };
      this.PerformanceManagementService.InsertKeyResultArea(entity).subscribe(
        data => {
          debugger
          let kratypelist = data;
          Swal.fire("Successfully Submitted...!");
          this.tablecount = 0;
          location.href = "#/KeyResultArea";
          console.log("kralist", this.kratypelist);
        })
    }
  }

  cancel() {
    location.href = "#/hr/KeyResultArea";
  }

  Update() {
    debugger
    var json = {
      "ID": this.id,
      "KRAName": this.kraName,
      "KraTypeID": this.kratypeid,
      "Role": this.roleTypeid,
      "Description": this.description
    };
    this.PerformanceManagementService.UpdateKeyResultArea(json).subscribe(
      data => {
        debugger
        Swal.fire("Updated Successfully");
        location.href = "#/hr/KeyResultArea";
      })
  }
}
