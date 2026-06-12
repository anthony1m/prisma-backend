const ourPartnerRepository = require("../repositories/ourPartner.repository");

const BANK_PARTNERS_TITLE = "BANK PARTNERS";
const OTHER_PARTNERS_TITLE = "OTHER PARTNERS";

function getOurPartnerPage() {
  return ourPartnerRepository.getOurPartnerPage();
}

function getOurPartnerMainBanner(id) {
  return ourPartnerRepository.getOurPartnerMainBanner(id);
}

function getOurPartnerBankPartners(id) {
  return ourPartnerRepository.getOurPartnerBankPartners(id);
}

function getOurPartnerOtherPartners(id) {
  return ourPartnerRepository.getOurPartnerOtherPartners(id);
}

function getOurPartnerSection(section, id) {
  return ourPartnerRepository.getOurPartnerSection(section, id);
}

function searchOurPartner(filters) {
  return ourPartnerRepository.searchOurPartner(filters);
}

function upsertOurPartnerMainBanner(data) {
  return ourPartnerRepository.upsertOurPartnerMainBanner(data);
}

function upsertOurPartnerBankPartners(data) {
  return ourPartnerRepository.upsertOurPartnerBankPartners({
    ...data,
    title: BANK_PARTNERS_TITLE,
  });
}

function upsertOurPartnerOtherPartners(data) {
  return ourPartnerRepository.upsertOurPartnerOtherPartners({
    ...data,
    title: OTHER_PARTNERS_TITLE,
  });
}

function deleteOurPartnerMainBanner(id) {
  return ourPartnerRepository.deleteOurPartnerMainBanner(id);
}

function deleteOurPartnerBankPartners(id) {
  return ourPartnerRepository.deleteOurPartnerBankPartners(id);
}

function deleteOurPartnerOtherPartners(id) {
  return ourPartnerRepository.deleteOurPartnerOtherPartners(id);
}

function deleteOurPartnerSection(section, id) {
  return ourPartnerRepository.deleteOurPartnerSection(section, id);
}

module.exports = {
  deleteOurPartnerBankPartners,
  deleteOurPartnerMainBanner,
  deleteOurPartnerOtherPartners,
  deleteOurPartnerSection,
  getOurPartnerPage,
  getOurPartnerBankPartners,
  getOurPartnerMainBanner,
  getOurPartnerOtherPartners,
  getOurPartnerSection,
  searchOurPartner,
  upsertOurPartnerBankPartners,
  upsertOurPartnerMainBanner,
  upsertOurPartnerOtherPartners,
};
