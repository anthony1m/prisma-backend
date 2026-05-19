const ourPartnerRepository = require("../repositories/ourPartner.repository");

const BANK_PARTNERS_TITLE = "BANK PARTNERS";
const OTHER_PARTNERS_TITLE = "OTHER PARTNERS";

function getOurPartnerPage() {
  return ourPartnerRepository.getOurPartnerPage();
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

module.exports = {
  getOurPartnerPage,
  upsertOurPartnerBankPartners,
  upsertOurPartnerMainBanner,
  upsertOurPartnerOtherPartners,
};
