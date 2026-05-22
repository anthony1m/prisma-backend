const { deleteByPatterns } = require("./cache");

async function invalidateAfter(promise, ...invalidators) {
  const result = await promise;
  await Promise.all(invalidators.map((invalidate) => invalidate()));

  return result;
}

function invalidateHomeCache() {
  return deleteByPatterns(["home:*"]);
}

function invalidateAboutUsCache() {
  return deleteByPatterns(["about-us:*"]);
}

function invalidateContactUsCache() {
  return deleteByPatterns(["contact-us:*"]);
}

function invalidateNavbarCache() {
  return deleteByPatterns(["navigationbar:*"]);
}

function invalidateFooterCache() {
  return deleteByPatterns(["home-footer:*"]);
}

function invalidatePartnersCache() {
  return deleteByPatterns(["our-partner:*"]);
}

function invalidateTeamMembersCache() {
  return deleteByPatterns(["team-members:*"]);
}

function invalidateExpansionsCache() {
  return deleteByPatterns(["the-expansions:*"]);
}

function invalidatePagesCache() {
  return deleteByPatterns(["page:*", "pages:*"]);
}

function invalidateSearchCache() {
  return deleteByPatterns(["search:*"]);
}

function invalidateHomeCacheAfter(promise) {
  return invalidateAfter(promise, invalidateHomeCache);
}

function invalidateAboutUsCacheAfter(promise) {
  return invalidateAfter(promise, invalidateAboutUsCache);
}

function invalidateContactUsCacheAfter(promise) {
  return invalidateAfter(promise, invalidateContactUsCache);
}

function invalidateNavbarCacheAfter(promise) {
  return invalidateAfter(promise, invalidateNavbarCache);
}

function invalidateFooterCacheAfter(promise) {
  return invalidateAfter(promise, invalidateFooterCache);
}

function invalidatePartnersCacheAfter(promise) {
  return invalidateAfter(promise, invalidatePartnersCache);
}

function invalidateTeamMembersCacheAfter(promise) {
  return invalidateAfter(promise, invalidateTeamMembersCache);
}

function invalidateExpansionsCacheAfter(promise) {
  return invalidateAfter(promise, invalidateExpansionsCache);
}

function invalidatePagesCacheAfter(promise) {
  return invalidateAfter(promise, invalidatePagesCache);
}

module.exports = {
  invalidateAboutUsCache,
  invalidateAboutUsCacheAfter,
  invalidateAfter,
  invalidateContactUsCache,
  invalidateContactUsCacheAfter,
  invalidateExpansionsCache,
  invalidateExpansionsCacheAfter,
  invalidateFooterCache,
  invalidateFooterCacheAfter,
  invalidateHomeCache,
  invalidateHomeCacheAfter,
  invalidateNavbarCache,
  invalidateNavbarCacheAfter,
  invalidatePagesCache,
  invalidatePagesCacheAfter,
  invalidatePartnersCache,
  invalidatePartnersCacheAfter,
  invalidateSearchCache,
  invalidateTeamMembersCache,
  invalidateTeamMembersCacheAfter,
};
