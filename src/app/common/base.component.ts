import { Component,  InjectionToken,  Injector,  OnDestroy, Type } from '@angular/core';
import { Subject } from 'rxjs';
import { ServiceLocator } from './serviceLocator';
import { Store } from '@ngrx/store';
import { AppStates } from '../store/app-state';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
    template: '',
    providers: [BsModalService],
})
export abstract class BaseComponent implements OnDestroy {
    protected destroy$ = new Subject();
    /* Store from ngrx */
    protected store: Store<AppStates>;
    // private modalService: BsModalService;
    bsModalRef?: BsModalRef;
    protected constructor() {
      this.store = this.getService<Store<AppStates>>(Store);
      // this.modalService = this.getService(BsModalService);

    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.complete();
    }

    protected getService<T>(token: Type<T> | InjectionToken<T>) {
      return ServiceLocator.injector.get(token);
  }

  // openModalWithComponent(component : any) {
  //   const initialState: ModalOptions = {
  //     initialState: {
  //       list: ['Open a modal with component', 'Pass your data', 'Do something else', '...'],
  //       title: 'Modal with component'
  //     }
  //   };
  //   this.bsModalRef = this.modalService.show(component, initialState);
  //   this.bsModalRef.content.closeBtnName = 'Close';
  // }
}
