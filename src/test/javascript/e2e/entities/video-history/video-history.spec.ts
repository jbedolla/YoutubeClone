/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { VideoHistoryComponentsPage, VideoHistoryDeleteDialog, VideoHistoryUpdatePage } from './video-history.page-object';

const expect = chai.expect;

describe('VideoHistory e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let videoHistoryUpdatePage: VideoHistoryUpdatePage;
    let videoHistoryComponentsPage: VideoHistoryComponentsPage;
    let videoHistoryDeleteDialog: VideoHistoryDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load VideoHistories', async () => {
        await navBarPage.goToEntity('video-history');
        videoHistoryComponentsPage = new VideoHistoryComponentsPage();
        expect(await videoHistoryComponentsPage.getTitle()).to.eq('zipFlix2App.videoHistory.home.title');
    });

    it('should load create VideoHistory page', async () => {
        await videoHistoryComponentsPage.clickOnCreateButton();
        videoHistoryUpdatePage = new VideoHistoryUpdatePage();
        expect(await videoHistoryUpdatePage.getPageTitle()).to.eq('zipFlix2App.videoHistory.home.createOrEditLabel');
        await videoHistoryUpdatePage.cancel();
    });

    it('should create and save VideoHistories', async () => {
        const nbButtonsBeforeCreate = await videoHistoryComponentsPage.countDeleteButtons();

        await videoHistoryComponentsPage.clickOnCreateButton();
        await promise.all([
            videoHistoryUpdatePage.setTimestampInput('2000-12-31'),
            videoHistoryUpdatePage.videoSelectLastOption(),
            videoHistoryUpdatePage.profileSelectLastOption()
        ]);
        expect(await videoHistoryUpdatePage.getTimestampInput()).to.eq('2000-12-31');
        await videoHistoryUpdatePage.save();
        expect(await videoHistoryUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await videoHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last VideoHistory', async () => {
        const nbButtonsBeforeDelete = await videoHistoryComponentsPage.countDeleteButtons();
        await videoHistoryComponentsPage.clickOnLastDeleteButton();

        videoHistoryDeleteDialog = new VideoHistoryDeleteDialog();
        expect(await videoHistoryDeleteDialog.getDialogTitle()).to.eq('zipFlix2App.videoHistory.delete.question');
        await videoHistoryDeleteDialog.clickOnConfirmButton();

        expect(await videoHistoryComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
