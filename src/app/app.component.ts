import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'highlight-app';
  code = `let a = 100`;
  code2 = `const firstName = "Olcay Usta"`;

  initWorker() {
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('./app.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
        this.code = data;
      };
      worker.postMessage(this.code);
    }
  }

  ngOnInit(): void {
    // this.initWorker();
  }

}
