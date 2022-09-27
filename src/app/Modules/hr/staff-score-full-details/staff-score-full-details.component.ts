import { Component, OnInit } from '@angular/core';
import { PerformancemanagementService } from 'src/app/Pages/Services/performancemanagement.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-staff-score-full-details',
  templateUrl: './staff-score-full-details.component.html',
  styleUrls: ['./staff-score-full-details.component.css']
})
export class StaffScoreFullDetailsComponent implements OnInit {
  ResultAreaList: any;
  managerattachment: any;
  sbuAttachment: any;
  hrAttachment: any;
  empID: any;
  employeeattachment: any;
  SbuAttachmentType: any;
  hrAttachmentType: any;
  ManagerAttachmentType: any;
  SelfAttachmentType: any;
  kpiID: any;

  constructor(private PerformanceManagementService: PerformancemanagementService, private route: ActivatedRoute) { }

  StaffTypeID: any;
  StaffID: any;
  avgScore: any;
  groupHeadAvgScores: any;
  divisionAvgScores: any;
  cioAvgScores: any;
  Manager: any;
  GroupHead: any;
  DivisionHead: any;
  CIOHead: any;
  p: any = 1;
  count1: any = 25;
  search: any
  StaffDetailsBYConductAppraisals: any;
  selfcomment: any;
  managercomments: any;
  hrcomment: any;
  DepartmentName: any;
  Role: any;
  HrSubmittedDate: any;
  ManagerSubmittedDate: any;
  EmployeeSubmittedDate: any;
  goallist: any;
  StaffScoresListsCopy: any;
  goal: any;
  appraislid: any;
  
  Stafflist1: any;
  EmployeeID: any;
  EmployeeName: any;
  StaffScoresLists: any;
  Appraisaldate: any;
  StartDate: any;
  EndDate: any;
  SupervisorName: any;
  overallScore: any;
  StaffType: any;
  StaffAppraisalList: any;
  ngOnInit() {

    this.goal = "0"
    this.route.params.subscribe(params => {
      debugger;
      // this.StaffType = params['StaffID'];
      this.appraislid = params['StaffID'];
      if (params['StaffTypeID'] != undefined) {
        this.StaffID = params['StaffTypeID'];
        this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(
          res => {
            debugger;
            let temp: any = res
            this.StaffDetailsBYConductAppraisals = temp.filter((x: { id: any; }) => x.id == this.StaffID);
            this.EmployeeName = this.StaffDetailsBYConductAppraisals[0].name;
            this.StartDate = this.StaffDetailsBYConductAppraisals[0].cycleStartDate;
            this.EndDate = this.StaffDetailsBYConductAppraisals[0].cycleEndDate;
            this.SupervisorName = this.StaffDetailsBYConductAppraisals[0].superviosrName;
            this.Appraisaldate = this.StaffDetailsBYConductAppraisals[0].appraisalSubmitionDate;
            this.DepartmentName = this.StaffDetailsBYConductAppraisals[0].departmentName
            this.Role = this.StaffDetailsBYConductAppraisals[0].role
            this.HrSubmittedDate = this.StaffDetailsBYConductAppraisals[0].hrSubmittedDate
            this.ManagerSubmittedDate = this.StaffDetailsBYConductAppraisals[0].managerSubmittedDate
            this.EmployeeSubmittedDate = this.StaffDetailsBYConductAppraisals[0].employeeSubmittedDate
          }
        )
        this.PerformanceManagementService.GetStaffScoresByStaffandYear(2021, this.StaffID).subscribe(data => {
          debugger;
          let temp: any = data
          this.StaffScoresLists = temp.filter((x: { apprisalID: any; }) => x.apprisalID == this.appraislid)
          this.StaffScoresListsCopy = this.StaffScoresLists
          this.StaffType = temp[0].staffType;
          //  this.Appraisaldate = data[0].appraisalDate;
          //  this.StartDate = data[0].fromDate;
          //  this.EndDate = data[0].toDate;
          this.overallScore = temp[0].overallScore;
          this.avgScore = temp[0].avgScore;
          this.groupHeadAvgScores = temp[0].groupHeadAvgScores;
          this.divisionAvgScores = temp[0].divisionAvgScores;
          this.cioAvgScores = temp[0].cioAvgScores;
          //this.SupervisorName = data[0].userName
          for (let i = 0; i < this.StaffScoresLists.length; i++) {
            if (this.StaffScoresLists[i].score == null) {
              this.Manager = false;
            }
            else {
              this.Manager = true;
            }

            if (this.StaffScoresLists[i].groupHeadScores == null) {
              this.GroupHead = false;
            }
            else {
              this.GroupHead = true;
            }
            if (this.StaffScoresLists[i].divisionScores == null) {
              this.DivisionHead = false;
            }
            else {
              this.DivisionHead = true;
            }
            if (this.StaffScoresLists[i].cscores == null) {
              this.CIOHead = false;
            }
            else {
              this.CIOHead = true;
            }

          }
        })
      }
    }
    );

    this.PerformanceManagementService.GetKeyResultArea().subscribe(
      res => {
        debugger;
        this.goallist = res
      }
    )
  }

  public Filtergoals() {
    debugger
    let searchCopy = this.goal.toLowerCase();
    if (searchCopy == 0) {
      this.ngOnInit();
    }
    else {
      this.StaffScoresLists = this.StaffScoresListsCopy.filter((x: { resultAreaName: string; }) => x.resultAreaName.toLowerCase().includes(searchCopy));
    }

  }

  public ConductappraisalStaffList() {
    this.PerformanceManagementService.GetConductappraisalStaffList().subscribe(
      res => {
        debugger;
        let temp: any = res
        this.StaffAppraisalList = temp
      }
    )
  }

  //Methods to get Comments//
  viewself(Scores: any) {
    this.selfcomment = Scores.selfComments;
  }

  manager(Scores: any) {
    this.managercomments = Scores.groupHeadComments;
  }

  divisionComments: any;
  sbu(Scores: any) {
    this.divisionComments = Scores.divisionComments;
  }

  hrcomments(Scores: any) {
    this.hrcomment = Scores.cioComments;
  }

  AllAttachments(Scores: any) {
    debugger
    this.empID = Scores.empID;
    this.kpiID=Scores.kpiID

    this.PerformanceManagementService.GetKRAByStaffID(this.StaffID).subscribe(data => {
      debugger
      this.ResultAreaList = data.filter((x: {
        kpiid: any;staffName: any; }) =>x.staffName == this.empID && x.kpiid==this.kpiID);


      this.employeeattachment = this.ResultAreaList[0].photo
      this.managerattachment = this.ResultAreaList[0].mPhoto
      this.sbuAttachment = this.ResultAreaList[0].sbuPhoto
      this.hrAttachment = this.ResultAreaList[0].hPhoto

      this.SbuAttachmentType = this.ResultAreaList[0].sbuAttachmentType;
      this.hrAttachmentType = this.ResultAreaList[0].hrAttachmentType;
      this.ManagerAttachmentType = this.ResultAreaList[0].managerAttachmentType;
      this.SelfAttachmentType=this.ResultAreaList[0].selfAttachmentType

      console.log("resultarea", this.ResultAreaList)

    
    })
  } 
}


