import { Injectable } from '@angular/core';
import { 
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument 
} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import {  Usuario } from '../models/modelEjemplo';

@Injectable()
export class ConnectfbService {
  dataCollection: AngularFirestoreCollection<any>;
  data: Observable<any[]>;
  dataDoc: AngularFirestoreDocument<any>;

  constructor(public afs:AngularFirestore) {
  }

  getData(collection) {

    this.dataCollection = this.afs.collection(collection);
        this.data = this.dataCollection.snapshotChanges().map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data() as any;
            data.id = a.payload.doc.id;
            return data;
          });
        });
    return this.data; 
  }

  addData(collection,data) {
    this.dataCollection = this.afs.collection(collection);
    this.dataCollection.add(data);

  }

  deleteData(collection:string,data:any) {
    this.dataDoc = this.afs.doc(`${collection}/${data.id}`);
    this.dataDoc.delete();
  }

  updateData(collection,data) {
    this.dataDoc = this.afs.doc(`${collection}/${data.id}`);
    this.dataDoc.update(data);
  }
}