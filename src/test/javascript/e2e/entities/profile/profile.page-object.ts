import { element, by, ElementFinder } from 'protractor';

export class ProfileComponentsPage {
    createButton = element(by.id('jh-create-entity'));
    deleteButtons = element.all(by.css('jhi-profile div table .btn-danger'));
    title = element.all(by.css('jhi-profile div h2#page-heading span')).first();

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

export class ProfileUpdatePage {
    pageTitle = element(by.id('jhi-profile-heading'));
    saveButton = element(by.id('save-entity'));
    cancelButton = element(by.id('cancel-save'));
    usernameInput = element(by.id('field_username'));
    lastLoggedInInput = element(by.id('field_lastLoggedIn'));
    imageIdInput = element(by.id('field_imageId'));
    userSelect = element(by.id('field_user'));
    friendsSelect = element(by.id('field_friends'));

    async getPageTitle() {
        return this.pageTitle.getAttribute('jhiTranslate');
    }

    async setUsernameInput(username) {
        await this.usernameInput.sendKeys(username);
    }

    async getUsernameInput() {
        return this.usernameInput.getAttribute('value');
    }

    async setLastLoggedInInput(lastLoggedIn) {
        await this.lastLoggedInInput.sendKeys(lastLoggedIn);
    }

    async getLastLoggedInInput() {
        return this.lastLoggedInInput.getAttribute('value');
    }

    async setImageIdInput(imageId) {
        await this.imageIdInput.sendKeys(imageId);
    }

    async getImageIdInput() {
        return this.imageIdInput.getAttribute('value');
    }

    async userSelectLastOption() {
        await this.userSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async userSelectOption(option) {
        await this.userSelect.sendKeys(option);
    }

    getUserSelect(): ElementFinder {
        return this.userSelect;
    }

    async getUserSelectedOption() {
        return this.userSelect.element(by.css('option:checked')).getText();
    }

    async friendsSelectLastOption() {
        await this.friendsSelect
            .all(by.tagName('option'))
            .last()
            .click();
    }

    async friendsSelectOption(option) {
        await this.friendsSelect.sendKeys(option);
    }

    getFriendsSelect(): ElementFinder {
        return this.friendsSelect;
    }

    async getFriendsSelectedOption() {
        return this.friendsSelect.element(by.css('option:checked')).getText();
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

export class ProfileDeleteDialog {
    private dialogTitle = element(by.id('jhi-delete-profile-heading'));
    private confirmButton = element(by.id('jhi-confirm-delete-profile'));

    async getDialogTitle() {
        return this.dialogTitle.getAttribute('jhiTranslate');
    }

    async clickOnConfirmButton() {
        await this.confirmButton.click();
    }
}
