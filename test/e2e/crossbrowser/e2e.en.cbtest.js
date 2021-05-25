/* eslint-disable no-process-env */


const content = require('commonContent');
const testData = require(`test/e2e/data.${language}`);

Feature(`Crossbrowser - PIP E2E SYA - Full Journey`);

Scenario(`English - PIP E2E SYA Journey @functional @crossbrowser @e2e`, I => {
  const language = 'en';
  const commonContent = content[language];

  I.createTheSession(language);

  I.wait(2);
  I.enterDetailsFromStartToNINO(commonContent, language);
  I.enterAppellantContactDetailsManuallyAndContinue(commonContent);
  I.checkOptionAndContinue(commonContent, '#doYouWantTextMsgReminders-no');
  I.enterDetailsFromNoRepresentativeToNoUploadingEvidence(commonContent);
  I.enterDoYouWantToAttendTheHearing(commonContent, '#attendHearing-no');
  I.continueFromnotAttendingHearing(commonContent);
  I.skipPcq();
  I.checkYourAppealToConfirmationPage(language, testData.signAndSubmit.signer);

  I.endTheSession();
}).retry(3);


Scenario(`Welsh - PIP E2E SYA Journey @functional @crossbrowser @e2e`, I => {
  const language = 'cy';
  const commonContent = content[language];

  I.createTheSession(language);

  I.wait(2);
  I.enterDetailsFromStartToNINO(commonContent, language);
  I.enterAppellantContactDetailsManuallyAndContinue(commonContent);
  I.checkOptionAndContinue(commonContent, '#doYouWantTextMsgReminders-no');
  I.enterDetailsFromNoRepresentativeToNoUploadingEvidence(commonContent);
  I.enterDoYouWantToAttendTheHearing(commonContent, '#attendHearing-no');
  I.continueFromnotAttendingHearing(commonContent);
  I.skipPcq();
  I.checkYourAppealToConfirmationPage(language, testData.signAndSubmit.signer);

  I.endTheSession();
}).retry(3);

