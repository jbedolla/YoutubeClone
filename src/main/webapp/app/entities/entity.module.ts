import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ZipFlix2ProfileModule } from './profile/profile.module';
import { ZipFlix2VideoModule } from './video/video.module';
import { ZipFlix2SearchResultModule } from './search-result/search-result.module';
import { ZipFlix2VideoHistoryModule } from './video-history/video-history.module';
import { ZipFlix2RatingModule } from './rating/rating.module';
import { ZipFlix2BrowseModule } from './browse/browse.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        ZipFlix2ProfileModule,
        ZipFlix2VideoModule,
        ZipFlix2SearchResultModule,
        ZipFlix2VideoHistoryModule,
        ZipFlix2RatingModule,
        ZipFlix2BrowseModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ZipFlix2EntityModule {}
