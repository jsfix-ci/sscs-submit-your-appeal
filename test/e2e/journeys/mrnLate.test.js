const content = require('commonContent');
const DateUtils = require('utils/DateUtils');
const paths = require('paths');
const testData = require('test/e2e/data');

const appellant = testData.appellant;

const oneMonthAndOneDayLate = {
  mrnDate: DateUtils.oneMonthAndOneDayAgo(),
  label: 'one month late'
};

const thirteenMonthsAndOneDayLate = {
  mrnDate: DateUtils.thirteenMonthsAndOneDayAgo(),
  label: 'thirteen months late'
};

const languages = ['en', 'cy'];

Feature('Appellant has a dated MRN @batch-03');

languages.forEach(language => {
  Before(I => {
    I.createTheSession(language);
    I.seeCurrentUrlEquals(paths.start.benefitType);
  });

  After(I => {
    I.endTheSession();
  });

  const commonContent = content[language];

  [oneMonthAndOneDayLate, thirteenMonthsAndOneDayLate].forEach(obj => {
    Scenario(`${language.toUpperCase()} - Appellant has a MRN that is over ${obj.label}`, I => {
      I.wait(2);
      I.enterBenefitTypeAndContinue(commonContent, testData.benefitType.code);
      // I.chooseLanguagePreference(commonContent, testData.languagePreferenceWelsh);
      I.enterPostcodeAndContinue(commonContent, testData.appellant.contactDetails.postCode);
      I.checkOptionAndContinue(commonContent, '#isAppointee-no');
      I.continueFromIndependance(commonContent);
      I.checkOptionAndContinue(commonContent, '#haveAMRN-yes');
      I.enterDWPIssuingOfficeAndContinue(commonContent, testData.mrn.dwpIssuingOffice);
      I.enterAnMRNDateAndContinue(commonContent, obj.mrnDate);
      I.checkOptionAndContinue(commonContent, '#checkedMRN-yes');
      I.enterReasonsForBeingLateAndContinue(commonContent, testData.mrn.reasonWhyMRNisLate);
      I.enterAppellantNameAndContinue(commonContent, appellant.title, appellant.firstName, appellant.lastName);
      I.enterAppellantDOBAndContinue(commonContent, appellant.dob.day, appellant.dob.month, appellant.dob.year);
      I.enterAppellantNINOAndContinue(commonContent, appellant.nino);
      I.enterAppellantContactDetailsAndContinue(commonContent, language);
      I.checkOptionAndContinue(commonContent, '#doYouWantTextMsgReminders-no');
      I.enterDetailsFromNoRepresentativeToEnd(commonContent);
      I.confirmDetailsArePresent(language, true, obj.mrnDate);
    }).retry(1);
  });
});
