/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { BrowseComponentsPage, BrowseDeleteDialog, BrowseUpdatePage } from './browse.page-object';

const expect = chai.expect;

describe('Browse e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let browseUpdatePage: BrowseUpdatePage;
    let browseComponentsPage: BrowseComponentsPage;
    let browseDeleteDialog: BrowseDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Browses', async () => {
        await navBarPage.goToEntity('browse');
        browseComponentsPage = new BrowseComponentsPage();
        expect(await browseComponentsPage.getTitle()).to.eq('zipFlix2App.browse.home.title');
    });

    it('should load create Browse page', async () => {
        await browseComponentsPage.clickOnCreateButton();
        browseUpdatePage = new BrowseUpdatePage();
        expect(await browseUpdatePage.getPageTitle()).to.eq('zipFlix2App.browse.home.createOrEditLabel');
        await browseUpdatePage.cancel();
    });

    it('should create and save Browses', async () => {
        const nbButtonsBeforeCreate = await browseComponentsPage.countDeleteButtons();

        await browseComponentsPage.clickOnCreateButton();
        await promise.all([
            browseUpdatePage.setVideoIdInput('videoId'),
            browseUpdatePage.setThumbnailInput('thumbnail'),
            browseUpdatePage.setCategoryInput('category')
        ]);
        expect(await browseUpdatePage.getVideoIdInput()).to.eq('videoId');
        expect(await browseUpdatePage.getThumbnailInput()).to.eq('thumbnail');
        expect(await browseUpdatePage.getCategoryInput()).to.eq('category');
        await browseUpdatePage.save();
        expect(await browseUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await browseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Browse', async () => {
        const nbButtonsBeforeDelete = await browseComponentsPage.countDeleteButtons();
        await browseComponentsPage.clickOnLastDeleteButton();

        browseDeleteDialog = new BrowseDeleteDialog();
        expect(await browseDeleteDialog.getDialogTitle()).to.eq('zipFlix2App.browse.delete.question');
        await browseDeleteDialog.clickOnConfirmButton();

        expect(await browseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
