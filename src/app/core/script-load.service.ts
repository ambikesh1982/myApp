import { Injectable } from '@angular/core';

interface Script {
  name: string;
  src: string;
  loaded: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ScriptLoadService {

  myScript: Script;

  constructor() { this.myScript = { name: null, loaded: false, src: null }; }

  load(script: { name: string, url: string, id: string }) {
    return new Promise((resolve, reject) => {
      if (this.myScript.loaded) {
        resolve({ name: script.name, loaded: true, status: 'Already Loaded' });
      } else {
        const script2Load: any = document.createElement('script');
        script2Load.type = 'text/javascript';
        script2Load.src = script.url;
        script2Load.id = script.id;
        script2Load.async = true;
        if (script2Load.readyState) {
          script2Load.onreadystatechange = () => {
            if (script2Load.readyState === 'loaded' || script2Load.readyState === 'complete') {
              script2Load.onreadystatechange = null;
              this.myScript.loaded = true;
              resolve({ name: script.name, loaded: true, status: 'Loaded' });
            }
          };
        } else {
          script2Load.onload = () => {
            this.myScript.loaded = true;
            resolve({ name: script.name, loaded: true, status: 'Loaded' });
          };
        }
        script2Load.onerror = (e: Error) => {
          return resolve({ name: script.name, loaded: false, status: 'Failed_2_Load' });
        };
        document.head.appendChild(script2Load);
      }
    });
  }
}
