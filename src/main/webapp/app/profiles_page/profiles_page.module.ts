import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZipFlix2SharedModule } from 'src/main/webapp/app/shared';
import { PROFILES_PAGE_ROUTE, Profiles_PageComponent } from '.';

@NgModule({
    imports: [ZipFlix2SharedModule, RouterModule.forChild([PROFILES_PAGE_ROUTE])],
    declarations: [Profiles_PageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipFlix2ProfilesPageModule {}
