// Temporary Firebase Types Declaration
// This file provides basic type support until Firebase is properly installed

declare module 'firebase/app' {
  export function initializeApp(config: any): any;
  export function getApps(): any[];
}

declare module 'firebase/firestore' {
  export function getFirestore(app?: any): any;
  export function collection(db: any, path: string): any;
  export function doc(db: any, path: string, id?: string): any;
  export function getDocs(query: any): Promise<any>;
  export function getDoc(ref: any): Promise<any>;
  export function addDoc(ref: any, data: any): Promise<any>;
  export function updateDoc(ref: any, data: any): Promise<void>;
  export function deleteDoc(ref: any): Promise<void>;
  export function query(ref: any, ...constraints: any[]): any;
  export function where(field: string, operator: string, value: any): any;
  export function orderBy(field: string, direction?: string): any;
  export class Timestamp {
    static now(): Timestamp;
    toDate(): Date;
  }
}
