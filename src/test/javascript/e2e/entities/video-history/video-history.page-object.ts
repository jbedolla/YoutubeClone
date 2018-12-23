import { element, by, ElementFinder } from 'protractor';

export class VideoHistoryComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-video-history div table .btn-danger'));
    title = element.all(by.css('jhi-video-history div h2#page-heading span')).first();

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

export class VideoHistoryUpdatePage {
    pageTitle = element(by.id('jhi-video-history-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    timestampInput = element(by.id('field_timestamp'));
    videoSelect = element(by.id('field_video'));
    profileSelect = element(by.id('field_profile'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setTimestampInput(timestamp) {
        await this.timestampInput.sendKeys(timestamp);
    }

    async getTimestampInput() {
        return this.timestampInput.getAttribute('value');
    }

    async videoSelectLastOption() {
        await this.videoSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async videoSelectOption(option) {
        await this.videoSelect.sendKeys(option);
    }

    getVideoSelect(): ElementFinder {
        return this.videoSelect;
    }

    async getVideoSelectedOption() {
        return this.videoSelect.element(by.css('option:checked')).getText();
    }

    async profileSelectLastOption() {
        await this.profileSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async profileSelectOption(option) {
        await this.profileSelect.sendKeys(option);
    }

    getProfileSelect(): ElementFinder {
        return this.profileSelect;
    }

    async getProfileSelectedOption() {
        return this.profileSelect.element(by.css('option:checked')).getText();
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

export class VideoHistoryDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-videoHistory-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-videoHistory'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
