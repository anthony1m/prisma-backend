const aboutUsRepository = require("../repositories/aboutUs.repository");
const aboutUsBannerRepository = require("../repositories/aboutUsBanner.repository");
const contactUsRepository = require("../repositories/contactUs.repository");
const contactUsMainBannerRepository = require("../repositories/contactUsMainBanner.repository");
const groupHistoryRepository = require("../repositories/groupHistory.repository");
const groupMissionRepository = require("../repositories/groupMission.repository");
const homeRepository = require("../repositories/home.repository");
const homeFooterRepository = require("../repositories/homeFooter.repository");
const mainBannerRepository = require("../repositories/mainBanner.repository");
const missionRepository = require("../repositories/mission.repository");
const navigationbarRepository = require("../repositories/navigationbar.repository");
const ourServiceRepository = require("../repositories/ourService.repository");
const ourValuesRepository = require("../repositories/ourValues.repository");
const singaporeLeadershipRepository = require("../repositories/singaporeLeadership.repository");
const strategicObjectivesRepository = require("../repositories/strategicObjectives.repository");
const strategicPresenceRepository = require("../repositories/strategicPresence.repository");
const teamMemberRepository = require("../repositories/teamMember.repository");
const theExpansionRepository = require("../repositories/theExpansion.repository");
const whoWeAreRepository = require("../repositories/whoWeAre.repository");

module.exports = {
  ...aboutUsRepository,
  ...aboutUsBannerRepository,
  ...contactUsRepository,
  ...contactUsMainBannerRepository,
  ...groupHistoryRepository,
  ...groupMissionRepository,
  ...homeRepository,
  ...homeFooterRepository,
  ...mainBannerRepository,
  ...missionRepository,
  ...navigationbarRepository,
  ...ourServiceRepository,
  ...ourValuesRepository,
  ...singaporeLeadershipRepository,
  ...strategicObjectivesRepository,
  ...strategicPresenceRepository,
  ...teamMemberRepository,
  ...theExpansionRepository,
  ...whoWeAreRepository,
};
