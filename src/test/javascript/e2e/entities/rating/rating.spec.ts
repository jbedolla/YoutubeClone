/* tslint:disable no-unused-expression */
import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { RatingComponentsPage, RatingDeleteDialog, RatingUpdatePage } from './rating.page-object';

const expect = chai.expect;

describe('Rating e2e test', () => {
    let navBarPage: NavBarPage;
    let signInPage: SignInPage;
    let ratingUpdatePage: RatingUpdatePage;
    let ratingComponentsPage: RatingComponentsPage;
    let ratingDeleteDialog: RatingDeleteDialog;

    before(async () => {
        await browser.get('/');
        navBarPage = new NavBarPage();
        signInPage = await navBarPage.getSignInPage();
        await signInPage.autoSignInUsing('admin', 'admin');
        await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
    });

    it('should load Ratings', async () => {
        await navBarPage.goToEntity('rating');
        ratingComponentsPage = new RatingComponentsPage();
        expect(await ratingComponentsPage.getTitle()).to.eq('zipFlix2App.rating.home.title');
    });

    it('should load create Rating page', async () => {
        await ratingComponentsPage.clickOnCreateButton();
        ratingUpdatePage = new RatingUpdatePage();
        expect(await ratingUpdatePage.getPageTitle()).to.eq('zipFlix2App.rating.home.createOrEditLabel');
        await ratingUpdatePage.cancel();
    });

    it('should create and save Ratings', async () => {
        const nbButtonsBeforeCreate = await ratingComponentsPage.countDeleteButtons();

        await ratingComponentsPage.clickOnCreateButton();
        await promise.all([
            ratingUpdatePage.setVideoIdInput('videoId'),
            ratingUpdatePage.setViewerIdInput('viewerId'),
            ratingUpdatePage.setTimestampInput('2000-12-31'),
            ratingUpdatePage.setRatingInput('5'),
            ratingUpdatePage.videoSelectLastOption(),
            ratingUpdatePage.profileSelectLastOption()
        ]);
        expect(await ratingUpdatePage.getVideoIdInput()).to.eq('videoId');
        expect(await ratingUpdatePage.getViewerIdInput()).to.eq('viewerId');
        expect(await ratingUpdatePage.getTimestampInput()).to.eq('2000-12-31');
        expect(await ratingUpdatePage.getRatingInput()).to.eq('5');
        await ratingUpdatePage.save();
        expect(await ratingUpdatePage.getSaveButton().isPresent()).to.be.false;

        expect(await ratingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1);
    });

    it('should delete last Rating', async () => {
        const nbButtonsBeforeDelete = await ratingComponentsPage.countDeleteButtons();
        await ratingComponentsPage.clickOnLastDeleteButton();

        ratingDeleteDialog = new RatingDeleteDialog();
        expect(await ratingDeleteDialog.getDialogTitle()).to.eq('zipFlix2App.rating.delete.question');
        await ratingDeleteDialog.clickOnConfirmButton();

        expect(await ratingComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    });

    after(async () => {
        await navBarPage.autoSignOut();
    });
});
