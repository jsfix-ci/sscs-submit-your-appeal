'use strict';

const paths = require('paths');
const content = require('steps/sms-notify/sms-confirmation/content.en.json');

Feature('SMS Confirmation');

Before((I) => {
    I.createTheSession();
    I.amOnPage(paths.identity.enterAppellantContactDetails);
});

After((I) => {
    I.endTheSession();
});

Scenario('When I click Continue, I am taken to the Representative page', (I) => {

    I.enterAppellantDetailsWithMobileAndContinue();
    I.click('Sign up');
    I.click('Continue');
    I.selectUseSameNumberAndContinue('#useSameNumber-yes');
    I.seeInCurrentUrl(paths.smsNotify.smsConfirmation);
    I.click('Continue');
    I.seeInCurrentUrl(paths.representative.representative);

});

Scenario('When I enter a mobile number in appellant details and click use same number, I see the mobile number I provided for appellant details', (I) => {

    I.enterAppellantDetailsWithMobileAndContinue();
    I.click('Sign up');
    I.click('Continue');
    I.selectUseSameNumberAndContinue('#useSameNumber-yes');
    I.seeInCurrentUrl(paths.smsNotify.smsConfirmation);
    I.see(`${content.mobileNumber}07466748336`);

});

Scenario('When I enter a mobile number in appellant details and click use different number, I see the mobile number I provided for enter mobile', (I) => {

    I.enterAppellantDetailsWithMobileAndContinue();
    I.click('Sign up');
    I.click('Continue');
    I.selectUseSameNumberAndContinue('#useSameNumber-no');
    I.seeInCurrentUrl(paths.smsNotify.enterMobile);
    I.fillField('#enterMobile', '+447123456789');
    I.click('Continue');
    I.seeInCurrentUrl(paths.smsNotify.smsConfirmation);
    I.see(`${content.mobileNumber}+447123456789`);

});

Scenario('When I don\'t enter a mobile number in appellant details, I see the mobile number I provided for enter mobile', (I) => {

    I.enterRequiredAppellantContactDetails();
    I.click('Continue');
    I.click('Sign up');
    I.click('Continue');
    I.fillField('#enterMobile', '+447987654321');
    I.click('Continue');
    I.seeInCurrentUrl(paths.smsNotify.smsConfirmation);
    I.see(`${content.mobileNumber}+447987654321`);

});
