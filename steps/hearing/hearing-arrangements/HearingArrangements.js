const { Question, form } = require('@hmcts/one-per-page');
const content = require('./content');
const urls = require('urls');

class HearingArrangements extends Question {

    get url() {
        return urls.hearing.hearingArrangements;
    }

    get form() {

        return form();
    }

    get i18NextContent() {
        return content;
    }

    next() {
    }
}

module.exports = HearingArrangements;
