const { Question, form, field, goTo } = require('@hmcts/one-per-page');
const { whitelist } = require('utils/regex');
const Joi = require('joi');
const urls = require('urls');

class MRNOverThirteenMonthsLate extends Question {

    get url () {
        return urls.compliance.mrnOverThirteenMonthsLate;
    }

    get form() {
        return form(
            field('reasonForBeingLate').joi(
                this.content.fields.reasonForBeingLate.error.required,
                Joi.string().regex(whitelist).required()
            )
        );
    }

    next() {
        return goTo(this.journey.Appointee);
    }
}

module.exports = MRNOverThirteenMonthsLate;
