import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isSuperAdmin=false
  constructor(public afAuth: AngularFireAuth, public db: AngularFirestore,public router: Router, public common: CommonService) {
    this.common.showLoader()
    this.afAuth.authState.subscribe(res => {
      if (res) {
        localStorage.setItem("uid", res.uid)
        localStorage.setItem("email", res.email)
        if(res.email==environment.superadmin){
          this.isSuperAdmin=true
          this.router.navigateByUrl("/admin/all-webiste")
        }
        else{
          this.isSuperAdmin=false
        }
        
        //this.router.navigateByUrl("/dashboard")
      }
      else {
        localStorage.removeItem("uid")
        localStorage.removeItem("email")
        //this.router.navigateByUrl("/auth")
      }
      this.common.stopLoader()
    })
  }

  createAccount(cred: { email: string, password: string }, profileInfo,mainMenu) {
    this.common.showLoader()
    profileInfo.active=true
    return this.afAuth.createUserWithEmailAndPassword(cred.email, cred.password).then(res => {
      localStorage.setItem("uid", res.user.uid)
      localStorage.setItem("email", res.user.email)
      this.router.navigateByUrl("/admin")
      this.common.showToast("success", "Successfull", "Your Account is Successfully Created")
      let today = firebase.firestore.Timestamp.fromDate(new Date()).toDate()
      let seventhDay=today.getDate()+7
      today.setDate(seventhDay)
      let validity = firebase.firestore.Timestamp.fromDate(today)
      // console.log("now")
      // console.log("mainMenu",mainMenu)
      this.db.collection("reseller").doc(profileInfo.resellerCode).update({created_websites:firebase.firestore.FieldValue.increment(1)})
      this.db.collection("users").doc(res.user.uid).set(Object.assign({}, {validity:validity,mainMenu,...profileInfo})).catch(err=>{
        // console.log(err)
      })
  
    }).catch(err => {
      // code to generate a notification alert of wrong credentials
      this.common.showToast("error", "Error", err)
      return err
    }).finally(() => {
      // console.log("stop loader")
      this.common.stopLoader()
    })
  }

  signIn(email, password) {
    this.common.showLoader()
    // console.log(email, password)
    return this.afAuth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem("uid", res.user.uid)
      localStorage.setItem("email", res.user.email)
      this.common.showToast("success", "Successfull", "You are LoggedIn successfully")
      // console.log(res.user.email)
      if(res.user.email==environment.superadmin){
        // console.log("jhcfbhj")
        this.isSuperAdmin=true
        this.router.navigateByUrl("/admin/all-webiste")
      }
      else{
        this.router.navigateByUrl("/admin")
      }
      this.common.stopLoader()
      return res.user.uid
    }).catch(err => {
      this.common.stopLoader()
      // code to generate a notification alert of wrong credentials
      this.common.showToast("error", "Error", err)
      return err
    }).finally(() => {
      this.common.stopLoader()
    })
  }

  resetPassword(email) {
    this.common.showLoader()
    return this.afAuth.sendPasswordResetEmail(email).then(res => {
      this.router.navigateByUrl("/auth")
      this.common.showToast("success", "Reset link Send", "Check your email for password reset link")
    }).catch(err=>{
      this.common.showToast("error","",err.message)
    }).finally(() => {
      this.common.stopLoader()
    })
  }

  isAuthenticated() {
    if (localStorage.getItem("uid")) {
      return true
    }
    else {
      return false
    }
  }

  logOut() {
    this.common.showLoader()
    localStorage.removeItem("uid")
    localStorage.removeItem("email")
    this.isSuperAdmin=false
    this.afAuth.signOut().then(res=>{
      this.common.stopLoader()
      window.location.reload();
    })
  }

  getUid() {
    return localStorage.getItem("uid")
  }
  getEmail() {
    return localStorage.getItem("email")
  }

  getProfile() {
    return this.db.collection("users").doc(this.getUid()).valueChanges()
  }

  updateProfile(profileInfo: { firstName: string, lastName: string, mobile: string, gender: string }) {
    return this.db.collection("users").doc(this.getUid()).set(profileInfo).then(res => {
      this.common.showToast("success", "Update Successful", "Profile Details Updated Successfully")
      return res
    }).catch(err => {
      this.common.showToast("error", "Error Occoured", "Unable to perform this operation")
      return err
    })
  }


  isDomainExist(input){    
    return new Promise(resolve=>{
      this.db.collection("users",ref=>ref.where("domainName","==",input)).get()
       .subscribe(
          (data) => {
              resolve(data.docs.length);
       })
    })
  }

  isResellerExist(input){    
    return new Promise(resolve=>{
      this.db.collection("reseller",ref=>ref.where("code","==",input).where("active","==",true)).get()
       .subscribe(
          (data) => {
              if(data.docs.length>0){
                resolve(data.docs[0].data());
              }
              else{
                resolve(false);
              }
       })
    })
  }

  // extendValidity(years,payment){
  //   return new Promise(resolve=>{
  //     this.db.collection("users").doc(this.getUid()).get()
  //      .subscribe(
  //       (res) => {
  //         let oldvalidity = res.data().validity.toDate()
  //         // console.log(oldvalidity)
  //         let extendDays=oldvalidity.getDate() + 365*years
  //         oldvalidity.setDate(extendDays)
  //         let newValidity = firebase.firestore.Timestamp.fromDate(oldvalidity)
  //         let newres = this.db.collection("users").doc(this.getUid()).update(Object.assign({},{validity:newValidity,payment:payment}))
  //         resolve(newres);
  //      })
  //   })
  // }
}
