const content = require('commonContent');
const selectors = require('steps/check-your-appeal/selectors');
const DateUtils = require('utils/DateUtils');
const moment = require('moment');
const paths = require('paths');

const languages = ['en', 'cy'];

/* eslint-disable max-len */
Feature('Appellant PIP, one month ago, attends hearing with dates cannot attend using date-picker @batch-01');

languages.forEach(language => {
  const commonContent = content[language];
  const datesYouCantAttend = selectors[language].theHearing.datesYouCantAttend;
  const datesYouCantAttendHearingAnswer = `${datesYouCantAttend} ${selectors[language].answer}`;
  const datesYouCantAttendHearingChange = `${datesYouCantAttend} ${selectors[language].change}`;

  Before(I => {
    I.createTheSession(language);
    I.seeCurrentUrlEquals(paths.start.benefitType);
  });

  After(I => {
    I.endTheSession();
  });

  Scenario(`${language.toUpperCase()} - Selects date of when they cannot attend the hearing`, async I => {
    const randomWeekDay = DateUtils.getDateInMilliseconds(
      DateUtils.getRandomWeekDayFromDate(moment().utc().startOf('day').add(9, 'weeks'))
    );
    I.enterDetailsFromStartToNINO(commonContent);
    I.enterAppellantContactDetailsAndContinue(commonContent, language);
    I.selectDoYouWantToReceiveTextMessageReminders(commonContent, '#doYouWantTextMsgReminders-no');
    I.enterDetailsFromNoRepresentativeToUploadingEvidence(commonContent);
    await I.enterDetailsFromAttendingTheHearingDatePickerToEnd(commonContent, language, randomWeekDay);
    I.confirmDetailsArePresent(language);
    I.see(DateUtils.formatDate(moment(randomWeekDay), 'DD MMMM YYYY', language), datesYouCantAttendHearingAnswer);
  }).retry(1);

  Scenario(`${language.toUpperCase()} - Selects a date when they cannot attend the hearing, then edits the date`, async I => {
    const randomWeekDayIn8Weeks = DateUtils.getDateInMilliseconds(
      DateUtils.getRandomWeekDayFromDate(moment().utc().startOf('day').add(8, 'weeks'))
    );
    const randomWeekDayIn10Weeks = DateUtils.getDateInMilliseconds(
      DateUtils.getRandomWeekDayFromDate(moment().utc().startOf('day').add(10, 'weeks'))
    );

    I.enterDetailsFromStartToNINO(commonContent);
    I.enterAppellantContactDetailsAndContinue(commonContent, language);
    I.selectDoYouWantToReceiveTextMessageReminders(commonContent, '#doYouWantTextMsgReminders-no');
    I.enterDetailsFromNoRepresentativeToUploadingEvidence(commonContent);
    await I.enterDetailsFromAttendingTheHearingDatePickerToEnd(commonContent, language, randomWeekDayIn8Weeks);
    I.see(DateUtils.formatDate(moment(randomWeekDayIn8Weeks), 'DD MMMM YYYY', language), datesYouCantAttendHearingAnswer);

    // Now edit the single date from 5 to 6 weeks.
    I.click(commonContent.change, datesYouCantAttendHearingChange);
    I.seeCurrentUrlEquals(paths.hearing.hearingAvailability);
    I.click(commonContent.continue);
    await I.deselectDates(language, [randomWeekDayIn8Weeks]);
    I.wait(2);
    await I.selectDates(language, [randomWeekDayIn10Weeks]);
    I.click(commonContent.continue);
    I.see(DateUtils.formatDate(moment(randomWeekDayIn10Weeks), 'DD MMMM YYYY', language), datesYouCantAttendHearingAnswer);
  }).retry(1);
});
