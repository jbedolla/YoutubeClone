import { element, by, ElementFinder } from 'protractor';

export class VideoComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-video div table .btn-danger'));
    title = element.all(by.css('jhi-video div h2#page-heading span')).first();

    async clickOnCreateButton() {
        await this.createButton.click();
    }

    async clickOnLastDeleteButton() {
        await this.deleteButtons.last().click();
    }

    async countDeleteButtons() {
        return this.deleteButtons.count();
    }

    async getTitle() {
        return this.title.getAttribute('jhiTranslate');
    }
}

export class VideoUpdatePage {
    pageTitle = element(by.id('jhi-video-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    titleInput = element(by.id('field_title'));
    descriptionInput = element(by.id('field_description'));
    categoryInput = element(by.id('field_category'));
    linkInput = element(by.id('field_link'));
    avgRatingInput = element(by.id('field_avgRating'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTitleInput(title) {
        await this.titleInput.sendKeys(title);
    }

    async getTitleInput() {
        return this.titleInput.getAttribute('value');
    }

    async setDescriptionInput(description) {
        await this.descriptionInput.sendKeys(description);
    }

    async getDescriptionInput() {
        return this.descriptionInput.getAttribute('value');
    }

    async setCategoryInput(category) {
        await this.categoryInput.sendKeys(category);
    }

    async getCategoryInput() {
        return this.categoryInput.getAttribute('value');
    }

    async setLinkInput(link) {
        await this.linkInput.sendKeys(link);
    }

    async getLinkInput() {
        return this.linkInput.getAttribute('value');
    }

    async setAvgRatingInput(avgRating) {
        await this.avgRatingInput.sendKeys(avgRating);
    }

    async getAvgRatingInput() {
        return this.avgRatingInput.getAttribute('value');
    }

    async save() {
        await this.saveButton.click();
    }

    async cancel() {
        await this.cancelButton.click();
    }

    getSaveButton(): ElementFinder {
        return this.saveButton;
    }
}

export class VideoDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-video-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-video'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
