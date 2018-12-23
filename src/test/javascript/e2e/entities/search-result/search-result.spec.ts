/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SearchResultComponentsPage, SearchResultDeleteDialog, SearchResultUpdatePage } from './search-result.page-object';

const expect = chai.expect;

describe('SearchResult e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let searchResultUpdatePage: SearchResultUpdatePage;
    let searchResultComponentsPage: SearchResultComponentsPage;
    let searchResultDeleteDialog: SearchResultDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load SearchResults', async () => {
        await navBarPage.goToEntity('search-result');
        searchResultComponentsPage = new SearchResultComponentsPage();
        expect(await searchResultComponentsPage.getTitle()).to.eq('zipFlix2App.searchResult.home.title');
    });

    it('should load create SearchResult page', async () => {
        await searchResultComponentsPage.clickOnCreateButton();
        searchResultUpdatePage = new SearchResultUpdatePage();
        expect(await searchResultUpdatePage.getPageTitle()).to.eq('zipFlix2App.searchResult.home.createOrEditLabel');
        await searchResultUpdatePage.cancel();
    });

    it('should create and save SearchResults', async () => {
        const nbButtonsBeforeCreate = await searchResultComponentsPage.countDeleteButtons();

        await searchResultComponentsPage.clickOnCreateButton();
        await promise.all([
            searchResultUpdatePage.setVideoIdInput('videoId'),
            searchResultUpdatePage.setLinkInput('link'),
            searchResultUpdatePage.setThumbnailInput('thumbnail'),
            searchResultUpdatePage.setCategoryInput('category')
        ]);
        expect(await searchResultUpdatePage.getVideoIdInput()).to.eq('videoId');
        expect(await searchResultUpdatePage.getLinkInput()).to.eq('link');
        expect(await searchResultUpdatePage.getThumbnailInput()).to.eq('thumbnail');
        expect(await searchResultUpdatePage.getCategoryInput()).to.eq('category');
        await searchResultUpdatePage.save();
        expect(await searchResultUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await searchResultComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last SearchResult', async () => {
        const nbButtonsBeforeDelete = await searchResultComponentsPage.countDeleteButtons();
        await searchResultComponentsPage.clickOnLastDeleteButton();

        searchResultDeleteDialog = new SearchResultDeleteDialog();
        expect(await searchResultDeleteDialog.getDialogTitle()).to.eq('zipFlix2App.searchResult.delete.question');
        await searchResultDeleteDialog.clickOnConfirmButton();

        expect(await searchResultComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
