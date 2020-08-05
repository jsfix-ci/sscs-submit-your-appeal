const language = 'en';

const content = require('commonContent');
const testData = require(`test/e2e/data.${language}`);

Feature(`${language.toUpperCase()} - E2E SYA - Full Journey`);

Scenario(`${language.toUpperCase()} - E2E SYA Journey @functional`, I => {
  const commonContent = content[language];

  I.createTheSession(language);

  I.wait(2);
  I.enterDetailsFromStartToNINO(commonContent, language);
  I.enterAppellantContactDetailsWithMobileAndContinue(commonContent, language, '07411222222');
  I.checkOptionAndContinue(commonContent, '#doYouWantTextMsgReminders-yes');
  I.checkOptionAndContinue(commonContent, '#useSameNumber-yes');
  I.readSMSConfirmationAndContinue(commonContent);
  I.enterDetailsFromNoRepresentativeToUploadingEvidence(commonContent);
  I.enterDoYouWantToAttendTheHearing(commonContent, '#attendHearing-yes');
  I.selectDoYouNeedSupportAndContinue(commonContent, '#arrangements-no');
  I.selectHearingAvailabilityAndContinue(commonContent, '#scheduleHearing-no');
  I.checkYourAppealToConfirmationPage(language, testData.signAndSubmit.signer);

  I.endTheSession();
}).retry(1);
