const appellant = require('test/e2e/data.en').appellant;
const config = require('config');
const postcodeLookupContentEn = require('components/postcodeLookup/content.en');
const postcodeLookupContentCy = require('components/postcodeLookup/content.cy');

const postcodeLookupEnabled = config.get('postcodeLookup.enabled') === 'true';

function enterAppellantNameAndContinue(commonContent, title, firstName, lastName) {
  const I = this;

  I.wait(3);
  I.selectOption({ id: 'title' }, title);
  I.fillField({ id: 'firstName' }, firstName);
  I.fillField({ id: 'lastName' }, lastName);
  I.click(commonContent.continue);
}

function enterAppellantNameAndContinueAfterSignIn(commonContent, title, firstName, lastName) {
  const I = this;

  I.wait(3);
  I.selectOption({ id: 'title' }, title);
  I.fillField({ id: 'firstName' }, firstName);
  I.fillField({ id: 'lastName' }, lastName);
  I.click(commonContent.saveAndContinue);
}

function enterAppellantDOBAndContinue(commonContent, day, month, year) {
  const I = this;

  I.wait(3);
  I.fillField('input[name*="day"]', day);
  I.fillField('input[name*="month"]', month);
  I.fillField('input[name*="year"]', year);
  I.click(commonContent.continue);
}

function enterAppellantDOBAndContinueAfterSignIn(commonContent, day, month, year) {
  const I = this;

  I.wait(3);
  I.fillField('input[name*="day"]', day);
  I.fillField('input[name*="month"]', month);
  I.fillField('input[name*="year"]', year);
  I.click(commonContent.saveAndContinue);
}

function enterAppellantNINOAndContinue(commonContent, nino) {
  const I = this;

  I.wait(3);
  I.fillField('#nino', nino);
  I.click(commonContent.continue);
}

function enterAppellantNINOAndContinueAfterSignIn(commonContent, nino) {
  const I = this;

  I.wait(3);
  I.fillField('#nino', nino);
  I.click(commonContent.saveAndContinue);
}

function IenterAddressDetailsManual(I) {
  if (postcodeLookupEnabled) {
    I.click({ id: 'manualLink' });
  }
  I.fillField({ id: 'addressLine1' }, appellant.contactDetails.addressLine1);
  I.fillField({ id: 'addressLine2' }, appellant.contactDetails.addressLine2);
  I.fillField({ id: 'townCity' }, appellant.contactDetails.townCity);
  I.fillField({ id: 'county' }, appellant.contactDetails.county);
  I.fillField({ id: 'postCode' }, appellant.contactDetails.postCode);
}

function IenterAddressDetails(postcodeLookupContent, I) {
  if (postcodeLookupEnabled) {
    I.fillField({ id: 'postcodeLookup' }, appellant.contactDetails.postCode);
    I.click(postcodeLookupContent.findAddress);
    I.selectOption({ css: 'form select[name=postcodeAddress]' },
      appellant.contactDetails.postcodeAddress);
  } else {
    IenterAddressDetailsManual(I);
  }
}

function enterAppellantContactDetailsManuallyAndContinue(commonContent) {
  const I = this;

  I.wait(20);
  IenterAddressDetailsManual(I);
  I.wait(20);
  I.fillField('#phoneNumber', '07466748336');
  I.click(commonContent.continue);
}

function enterAppellantContactDetailsAndContinue(commonContent, language) {
  const I = this;
  const postcodeLookupContent = language === 'en' ? postcodeLookupContentEn : postcodeLookupContentCy;

  if (postcodeLookupEnabled) {
    I.fillField({ id: 'postcodeLookup' }, 'xxxxx');
    I.click(postcodeLookupContent.findAddress);
    I.see(postcodeLookupContent.fields.postcodeLookup.error.required);
    I.fillField({ id: 'postcodeLookup' }, 'n29ed');
    I.click(commonContent.continue);
    I.see(postcodeLookupContent.fields.postcodeAddress.error.required);
    IenterAddressDetails(postcodeLookupContent, I);
  } else {
    IenterAddressDetailsManual(I);
  }
  I.click(commonContent.continue);
}

function enterAppellantContactDetailsAndContinueAfterSignIn(commonContent, language) {
  const I = this;
  const postcodeLookupContent = language === 'en' ? postcodeLookupContentEn : postcodeLookupContentCy;

  if (postcodeLookupEnabled) {
    I.fillField({ id: 'postcodeLookup' }, 'xxxxx');
    I.click(postcodeLookupContent.findAddress);
    I.see(postcodeLookupContent.fields.postcodeLookup.error.required);
    I.fillField({ id: 'postcodeLookup' }, 'n29ed');
    I.click(commonContent.continue);
    I.see(postcodeLookupContent.fields.postcodeAddress.error.required);
    IenterAddressDetails(postcodeLookupContent, I);
  } else {
    IenterAddressDetailsManual(I);
  }
  I.click(commonContent.saveAndContinue);
}

function enterAppellantContactDetailsWithMobileAndContinue(commonContent, language, mobileNumber = '07466748336') {
  const I = this;
  const postcodeLookupContent = language === 'en' ? postcodeLookupContentEn : postcodeLookupContentCy;

  IenterAddressDetails(postcodeLookupContent, I);
  I.wait(5);
  I.fillField('#phoneNumber', mobileNumber);
  I.click(commonContent.continue);
}

function enterAppellantContactDetailsWithMobileAndContinueAfterSignIn(commonContent, language, mobileNumber = '07466748336') {
  const I = this;
  const postcodeLookupContent = language === 'en' ? postcodeLookupContentEn : postcodeLookupContentCy;

  IenterAddressDetails(postcodeLookupContent, I);
  I.wait(5);
  I.fillField('#phoneNumber', mobileNumber);
  I.click(commonContent.saveAndContinue);
}


function enterAppellantContactDetailsWithEmailAndContinue(commonContent, language) {
  const I = this;
  const postcodeLookupContent = language === 'en' ? postcodeLookupContentEn : postcodeLookupContentCy;

  IenterAddressDetails(postcodeLookupContent, I);
  I.fillField('#emailAddress', 'harry.potter@wizards.com');
  I.click(commonContent.continue);
}

module.exports = {
  enterAppellantNameAndContinue,
  enterAppellantNameAndContinueAfterSignIn,
  enterAppellantDOBAndContinue,
  enterAppellantDOBAndContinueAfterSignIn,
  enterAppellantNINOAndContinue,
  enterAppellantNINOAndContinueAfterSignIn,
  enterAppellantContactDetailsAndContinue,
  enterAppellantContactDetailsAndContinueAfterSignIn,
  enterAppellantContactDetailsWithMobileAndContinue,
  enterAppellantContactDetailsWithMobileAndContinueAfterSignIn,
  enterAppellantContactDetailsWithEmailAndContinue,
  enterAppellantContactDetailsManuallyAndContinue
};
