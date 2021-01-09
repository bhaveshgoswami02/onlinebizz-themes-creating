import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  collection="pages"
  constructor(public db:AngularFirestore,public auth:AuthService) { }

  add(content){
    return this.db.collection("users").doc(this.auth.getUid()).collection(this.collection).doc(content.slug).set(content)
  }

  update(id,content){
    return this.db.collection("users").doc(this.auth.getUid()).collection(this.collection).doc(id).update(content)
  }

  delete(id){
    return this.db.collection("users").doc(this.auth.getUid()).collection(this.collection).doc(id).delete()
  }

  getAll(){
    return this.db.collection("users").doc(this.auth.getUid()).collection(this.collection).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getSingle(id){
    return this.db.collection("users").doc(this.auth.getUid()).collection(this.collection).doc(id).valueChanges()
  }

  updatePage(data) {
    this.db.collection("users").doc(this.auth.getUid()).collection(this.collection).add(data)
  }

  getPageByStaticUid(uid) {
    return this.db.collection("users").doc(uid).collection(this.collection).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  copyPage(uid) {
    this.getPageByStaticUid(uid).subscribe(res=>{
      let allPage = []
      allPage = res
      console.log("all Page",allPage)
      allPage.forEach(element=>{
        delete element.id
        this.updatePage(element)
      })
    })
  }

  deleteAndCopy(uid) {
    return this.db.collection("users").doc(this.auth.getUid()).collection(this.collection).get().pipe(
      map(actions => actions.docs.map(a => {
        const data = a.data() as any;
        const id = a.id;
        return { id, ...data };
      }))
    ).subscribe(res=>{
      let oldData = []
      oldData = res
      oldData.forEach(element=>{
        this.delete(element.id)
      })
      this.copyPage(uid)
    })
  }
}
