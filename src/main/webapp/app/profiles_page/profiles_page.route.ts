import { Route } from '@angular/router';

import { Profiles_PageComponent } from '.';

export const PROFILES_PAGE_ROUTE: Route = {
    path: '',
    component: Profiles_PageComponent,
    data: {
        authorities: [],
        pageTitle: 'Profiles_page.title'
    }
};
