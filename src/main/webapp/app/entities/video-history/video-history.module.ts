import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ZipFlix2SharedModule } from 'app/shared';
import {
    VideoHistoryComponent,
    VideoHistoryDetailComponent,
    VideoHistoryUpdateComponent,
    VideoHistoryDeletePopupComponent,
    VideoHistoryDeleteDialogComponent,
    videoHistoryRoute,
    videoHistoryPopupRoute
} from './';

const ENTITY_STATES = [...videoHistoryRoute, ...videoHistoryPopupRoute];

@NgModule({
    imports: [ZipFlix2SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        VideoHistoryComponent,
        VideoHistoryDetailComponent,
        VideoHistoryUpdateComponent,
        VideoHistoryDeleteDialogComponent,
        VideoHistoryDeletePopupComponent
    ],
    entryComponents: [
        VideoHistoryComponent,
        VideoHistoryUpdateComponent,
        VideoHistoryDeleteDialogComponent,
        VideoHistoryDeletePopupComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipFlix2VideoHistoryModule {}
