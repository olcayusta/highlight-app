import {
  AfterViewInit,
  ApplicationRef, ChangeDetectorRef,
  ComponentFactoryResolver,
  Directive,
  ElementRef, EmbeddedViewRef, HostBinding,
  Inject,
  Injector,
  ViewContainerRef
} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import {MyButtonComponent} from './my-button/my-button.component';

@Directive({
  selector: '[appAddButton]'
})
export class AddButtonDirective implements AfterViewInit {

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private cdr: ChangeDetectorRef
  ) {
    el.nativeElement.style.display = 'none';
  }

  run() {
  }

  ngAfterViewInit(): void {
    const frag = document.createDocumentFragment();
    const nodes: NodeList = this.el.nativeElement.childNodes;

    const PRES = this.vcr.element.nativeElement.querySelectorAll('pre');

    if (PRES.length > 0) {
    }

    PRES.forEach((node) => {
      console.log(node);

      const PRE_CONTAINER = document.createElement('div');
      frag.appendChild(PRE_CONTAINER);
      PRE_CONTAINER.classList.add('pre-container');

      const factory = this.cfr.resolveComponentFactory(MyButtonComponent);
      const compRef = this.vcr.createComponent(factory);
      const hostView = compRef.hostView as EmbeddedViewRef<any>;
      PRE_CONTAINER.appendChild(hostView.rootNodes[0]);

      const pre = document.createElement('pre');
      PRE_CONTAINER.appendChild(pre);
      this.cdr.detectChanges();

      const worker = new Worker('./app.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        // console.log(`page got message: ${data}`);
        node.querySelector('code').innerHTML = data;
        pre.appendChild(node.querySelector('code'));
        node.replaceWith(PRE_CONTAINER);
        worker.terminate();
        this.el.nativeElement.style.display = 'block';
      };
      worker.postMessage(node.querySelector('code').textContent);
    });
  }

}
