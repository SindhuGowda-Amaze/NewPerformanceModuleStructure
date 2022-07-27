import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PerformancemanagementService {

   //public baseURL1 = "http://localhost:4199/";
 //  public baseURL = "http://103.133.214.197/PerformanceManagement/";
 // public host = "https://digioffice.amazeone.co/DigiOfficeAsticomAPI";
//  public host1="https://support.amazeone.co/SupportAPI/";
//  public hoet2 = "http://103.133.214.197/LearningandDevelopment/";


baseURL = "http://23.101.22.93/CoreDigiPerformanceManagementAPI";
public host = "https://23.101.22.93/DigiOfficeCoreHRAPI"
public host1=" https://asticom.digiofficeapp.com/SupportAPI/"
public hoet2 = "http://23.101.22.93/LearningandDevelopmentdemo/";

 url: any;
 constructor(private http: HttpClient) {
   // console.log("environment", environment.hostUrl);
 }

 public GetCourse() {
   debugger;
   return this.http.get<any[]>(
     this.hoet2 + '/Master/GetCourse');
 }

 public InsertAppraisalCycle(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/InsertAppraisalCycle';
   return this.http.post(this.url, data);
 }

 
 public SubmitManagerAppraisal(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateManagerSubmitted';
   return this.http.post(this.url, data);
 }

 public SubmitHrAppraisal(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateHrSubmitted';
   return this.http.post(this.url, data);
 }

 public UpdateSbuSubmitted(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateSbuSubmitted';
   return this.http.post(this.url, data);
 }

 public SubmitEmployeeAppraisal(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateEmployeeSubmitted';
   return this.http.post(this.url, data);
 }


 public GetFrequency() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetFrequency"
   );
 }


 public GetAppraisalCycle() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetAppraisalCycle"
   );
 }
 public GetDepartmentMaster() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetDepartmentMaster"
   );
 }



 public DeleteAppraisalCycle(ID: any) {
   return this.http.get<any[]>(
     this.baseURL + "/Master/DeleteAppraisalCycle?ID=" + ID);
 }


 public UpdateAppraisalCycle(json: any) {
   debugger
   let APIURL = this.baseURL + "Master/UpdateAppraisalCycle";
   return this.http.post<any[]>(APIURL, json);
 }



 public GetKeyResultArea() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetKeyResultArea"
   );
 }

 // public GetKeyResultAreaByStaffID() {
 //   return this.http.get<any[]>(
 //     this.baseURL + "/Master/GetKeyResultAreaByStaffID?ID=" + ID
 //   );
 // }


 public InsertKeyResultArea(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/InsertKeyResultArea';
   return this.http.post(this.url, data);
 }


 public GetKraMaster() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetKraMaster"
   );
 }

 public GetKraMasterByID(ID:any) {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetKeyResultAreaByStaffID=" + ID
   );
 }


 public UpdateKeyResultArea(json: any) {
   debugger
   let APIURL = this.baseURL + "/Master/UpdateKeyResultArea";
   return this.http.post<any[]>(APIURL, json);
 }

 public DeleteKeyResultArea(ID: any) {
   return this.http.get<any[]>(
     this.baseURL + "/Master/DeleteKeyResultArea?ID=" + ID);
 }



 public GetKPI() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetKPI"
   );
 }

 public GetMyDetails() {
   return this.http.get<any[]>(
     this.host + "/Announcement/GetMyDetails"
   );
 }

 public GetMyDetailsForReiewRating() {
   return this.http.get<any[]>(
     this.host + "/Announcement/GetMyDetailsForReiewRating"
   );
 }

 public ClearNotificationByID(ID: any) {
   return this.http.get<any[]>(
     this.host + "/Announcement/ClearNotificationByID?ID=" + ID);
 }


 public InsertKPI(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/InsertKPI';
   return this.http.post(this.url, data);
 }



 public UpdateKPI(json: any) {
   debugger
   let APIURL = this.baseURL + "Master/UpdateKPI";
   return this.http.post<any[]>(APIURL, json);
 }


 public DeleteKPI(ID: any) {
   return this.http.get<any[]>(
     this.baseURL + "/Master/DeleteKPI?ID=" + ID);
 }

 public GetPerformanceIndicatorMaster() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetPerformanceIndicatorMaster"
   );
 }



 public GetRoleType() {
   return this.http.get<any[]>(
     this.host + "/MasterDemo/GetRoleType?UserTypeID=" + 1
   );
 }



 public GetDepartment() {
   debugger
   let APIURL = this.host + "/Announcement/GetDepartmentMaster";
   return this.http.get<any[]>(APIURL);
 }

 ///prashnat serices for kramapping


 public GetEmployeeKraMap() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetEmployeeKraMap"
   );
 }

 public GetConductappraisalStaffList() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetConductappraisalStaffList"
   );
 }

 
 public GetConductappraisalStaffListforpip() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetConductappraisalStaffListforpip"
   );
 }

 public InsertEmployeeKraMap(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/InsertEmployeeKraMap';
   return this.http.post(this.url, data);
 }

 public GetKRAByStaffID(id: any) {
   debugger;
   return this.http.get<any>(this.baseURL + "/Master/GetKRAByStaffID?StaffID=" + id);
 }
 public GetHighScores() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetHighScores"
   );
 }
 public InsertStaffScores(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/InsertStaffScores';
   return this.http.post(this.url, data);
 }
 public UpdateGroupHeadStaffScores(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateGroupHeadStaffScores';
   return this.http.post(this.url, data);
 }
 public GetStaffScores() {
   return this.http.get<any[]>(
     this.baseURL + "/Master/GetStaffScores"
   );
 }

 public UpdateCIOStaffScores(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateCIOStaffScores';
   return this.http.post(this.url, data);
 }

 public UpdateReAppraisalHRrating(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateReAppraisalHRrating';
   return this.http.post(this.url, data);
 }

 public GetStaffScoresByStaffandYear(Year: any, StaffID: any) {
   return this.http.get<any[]>(this.baseURL + '/Master/GetStaffScoresByStaffandYear?Year=' + Year + '&StaffID=' + StaffID);
 }
 public InsertStaffScoresByHR(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/InsertStaffScoresByHR';
   return this.http.post(this.url, data);
 }
 public InsertStaffScoresByManager(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/InsertStaffScoresByManager';
   return this.http.post(this.url, data);
 }

 public InsertStaffScoresBySBU(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/InsertStaffScoresBySBU';
   return this.http.post(this.url, data);
 }

 public ProjectAttachments(files: any) {
   let formdata: FormData = new FormData();
   for (let i = 0; i < files.length; i++) {
     formdata.append('file_upload', files[i], files[i].name);
   }
   this.url = this.baseURL + '/Master/ProjectAttachments';
   return this.http.post<any[]>(this.url, formdata);
 }

 public InsertNotification(data: any) {
   debugger;
   this.url = this.host + '/User/InsertNotification';
   return this.http.post(this.url, data);
 }
 public GetNotification(UserID: any) {
   return this.http.get<any[]>(
     this.host + "/User/GetNotification?UserID=" + UserID
   );
 }



 public UpdateStaffScores(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateStaffScores';
   return this.http.post(this.url, data);
 }

 
 public DeleteStaffScores(ID: any) {
   return this.http.get<any[]>(
     this.baseURL + "/Master/DeleteStaffScores?ID=" + ID);
 }


 public UpdateEmployeeSelfRating(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateEmployeeSelfRating';
   return this.http.post(this.url, data);
 }


 public UpdateHrSelfAttachment(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateHrSelfAttachment';
   return this.http.post(this.url, data);
 }

 public UpdateSbuSelfAttachment(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateSbuSelfAttachment';
   return this.http.post(this.url, data);
 }

  
 public UpdateManagerSelfAttachment(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateManagerSelfAttachment';
   return this.http.post(this.url, data);
 }

 public Updatekranew(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/Updatekranew';
   return this.http.post(this.url, data);
 }


 public UpdateBellCurveFitting(json: any) {
   debugger
   let APIURL = this.baseURL + "Master/UpdateBellCurveFitting";
   return this.http.post<any[]>(APIURL, json);
 }

 


 public GetAllCounts(TypeID:any, StaffID: any) {
   return this.http.get<any[]>(
     this.baseURL + '/Master/GetAllCounts?TypeID=' + TypeID + '&StaffID=' + StaffID);
 }


 public UpdateNotificationSeen(data: any) {
   debugger;
   this.url = this.baseURL + 'Master/UpdateNotificationSeen';
   return this.http.post(this.url, data);
 }

 
 public CloseAppraisalCycle(json: any) {
   debugger
   let APIURL = this.baseURL + "Master/CloseAppraisalCycle";
   return this.http.post<any[]>(APIURL, json);
 }

 public InsertStaffExitFormalityPIP(data: any) {
   debugger;
   this.url = this.host + '/Announcement/InsertStaffExitFormalityPIP';
   return this.http.post(this.url, data);
 }

 public InsertStaffExitFormality(data: any) {
   debugger;
   this.url = this.host + '/Announcement/InsertStaffExitFormality';
   return this.http.post(this.url, data);
 }


 public UpdatePipEmployeeKraMap(data: any) {
   debugger;
   this.url = this.baseURL + '/Master/UpdatePipEmployeeKraMap';
   return this.http.post(this.url, data);
 }

 public InsertAttachment(data: any) {
   debugger;
   this.url = this.host1 + '/Master/InsertAttachment';
   return this.http.post(this.url, data);
 }

 public InsertSupportTickets(data: any) {
   debugger;
   this.url = this.host1 + '/Master/InsertSupportTickets';
   return this.http.post(this.url, data);
 }

 public AttachmentsUploadsss(files: any) {
   debugger
   let formdata: FormData = new FormData();
   for (let i = 0; i < files.length; i++) {
     formdata.append('file_upload', files[i], files[i].name);
   }
   
   debugger
   let APIURL = this.host1 + "Master/UploadImages/";
   return this.http.post(APIURL, formdata);
 }

 public GetSupportTickets() {
   return this.http.get<any[]>(
     this.host1 + "/Master/GetSupportTickets"
   );
 }

 public GetSupportAttachment() {

   return this.http.get<any[]>(this.host1 + "/Master/GetSupportAttachment");
 }

 public DeleteSupportTickets(ID: any) {
   return this.http.get<any[]>(
     this.host1 + "/Master/DeleteSupportTickets?ID=" + ID);
 }

 public UpdateSupportTickets(data: any) {
   debugger;
   this.url = this.host1 + '/Master/UpdateSupportTickets';
   return this.http.post(this.url, data);
 }

 public UpdateStaffReviewRating(json: any) {
   debugger
   let APIURL = this.host + "Announcement/UpdateStaffReviewRating";
   return this.http.post<any[]>(APIURL, json);
 }

 public UpdateSalaryIncrementByHR(json: any) {
   debugger
   let APIURL = this.host + "Announcement/UpdateSalaryIncrementByHR";
   return this.http.post<any[]>(APIURL, json);
 }


public GetPiPActionItemsForStaff() {

 return this.http.get<any[]>(this.baseURL + "/Master/GetPiPActionItemsForStaff");
}

public InsertPiPActionItemsForStaff(data: any) {
 debugger;
 this.url = this.baseURL + '/Master/InsertPiPActionItemsForStaff';
 return this.http.post(this.url, data);
}


public UpdatePipEmployeeComments(json: any) {
 debugger
 let APIURL = this.baseURL + "Master/UpdatePipEmployeeComments";
 return this.http.post<any[]>(APIURL, json);
}

public GetStaffExitFormality() {
 return this.http.get<any[]>(
   this.host + "/Announcement/GetStaffExitFormality"
 );
}


public InsertExceptionLogs(data: any) {
  debugger;
  this.url = this.host + '/Master/InsertExceptionLogs';
  return this.http.post(this.url, data);

}

public GetExceptionLogs() {
  return this.http.get<any[]>(
    this.host + "/Master/GetExceptionLogs"

  );
}





}
