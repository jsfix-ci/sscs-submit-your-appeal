function createTheSession(language) {
  const I = this;

  I.amOnPage(`/entry?lng=${language}`, `to create a session in ${language.toUpperCase()}`);
}

module.exports = { createTheSession };
