import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { ZipFlix2SharedLibsModule, ZipFlix2SharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';
import { SafePipe } from '../core/safe-pipe.pipe';

@NgModule({
    imports: [ZipFlix2SharedLibsModule, ZipFlix2SharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective, SafePipe],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }, SafePipe],
    entryComponents: [JhiLoginModalComponent],
    exports: [ZipFlix2SharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, SafePipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipFlix2SharedModule {
    static forRoot() {
        return {
            ngModule: ZipFlix2SharedModule
        };
    }
}
