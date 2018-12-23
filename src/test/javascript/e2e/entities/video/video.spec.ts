/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VideoComponentsPage, VideoDeleteDialog, VideoUpdatePage } from './video.page-object';

const expect = chai.expect;

describe('Video e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let videoUpdatePage: VideoUpdatePage;
    let videoComponentsPage: VideoComponentsPage;
    let videoDeleteDialog: VideoDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Videos', async () => {
        await navBarPage.goToEntity('video');
        videoComponentsPage = new VideoComponentsPage();
        expect(await videoComponentsPage.getTitle()).to.eq('zipFlix2App.video.home.title');
    });

    it('should load create Video page', async () => {
        await videoComponentsPage.clickOnCreateButton();
        videoUpdatePage = new VideoUpdatePage();
        expect(await videoUpdatePage.getPageTitle()).to.eq('zipFlix2App.video.home.createOrEditLabel');
        await videoUpdatePage.cancel();
    });

    it('should create and save Videos', async () => {
        const nbButtonsBeforeCreate = await videoComponentsPage.countDeleteButtons();

        await videoComponentsPage.clickOnCreateButton();
        await promise.all([
            videoUpdatePage.setTitleInput('title'),
            videoUpdatePage.setDescriptionInput('description'),
            videoUpdatePage.setCategoryInput('category'),
            videoUpdatePage.setLinkInput('link'),
            videoUpdatePage.setAvgRatingInput('5')
        ]);
        expect(await videoUpdatePage.getTitleInput()).to.eq('title');
        expect(await videoUpdatePage.getDescriptionInput()).to.eq('description');
        expect(await videoUpdatePage.getCategoryInput()).to.eq('category');
        expect(await videoUpdatePage.getLinkInput()).to.eq('link');
        expect(await videoUpdatePage.getAvgRatingInput()).to.eq('5');
        await videoUpdatePage.save();
        expect(await videoUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await videoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Video', async () => {
        const nbButtonsBeforeDelete = await videoComponentsPage.countDeleteButtons();
        await videoComponentsPage.clickOnLastDeleteButton();

        videoDeleteDialog = new VideoDeleteDialog();
        expect(await videoDeleteDialog.getDialogTitle()).to.eq('zipFlix2App.video.delete.question');
        await videoDeleteDialog.clickOnConfirmButton();

        expect(await videoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
