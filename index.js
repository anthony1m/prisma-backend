require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const { PrismaMariaDb } = require("@prisma/adapter-mariadb");

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function main() {
  const homePage = await prisma.page.upsert({
    where: {
      title: "Home",
    },
    update: {},
    create: {
      title: "Home",
    },
  });

  const pageId = homePage.id;

  await prisma.mainbanner.upsert({
    where: {
      pageId,
    },
    update: {
      title: "One Ambition, One Vision, One Global Reach",
      description: "Welcome to our company homepage.",
      imageURL: "/uploads/bghomebanner.png",
    },
    create: {
      title: "One Ambition, One Vision, One Global Reach",
      description: "Welcome to our company homepage.",
      imageURL: "/uploads/bghomebanner.png",
      pageId,
    },
  });

  await prisma.whoweare.upsert({
    where: {
      pageId,
    },
    update: {
      title: "Who We Are",
      description: "We are a company focused on growth, quality, and global reach.",
      imageURL: "/uploads/whoweare.png",
      button: "Read More",
    },
    create: {
      title: "Who We Are",
      description: "We are a company focused on growth, quality, and global reach.",
      imageURL: "/uploads/whoweare.png",
      button: "Read More",
      pageId,
    },
  });

  const services = [
    {
      title: "Real Estate Development",
      description: "We develop high-quality real estate projects.",
      imageURL: "/uploads/ourservices1.jpg",
    },
    {
      title: "Trading Import & Export",
      description: "We handle international trade and supply.",
      imageURL: "/uploads/ourservices2.jpg",
    },
    {
      title: "Logistics & Transport",
      description: "We provide logistics and transport services.",
      imageURL: "/uploads/ourservices3.jpg",
    },
  ];

  for (const service of services) {
    await prisma.ourservices.upsert({
      where: {
        pageId_title: {
          pageId,
          title: service.title,
        },
      },
      update: {
        description: service.description,
        imageURL: service.imageURL,
      },
      create: {
        ...service,
        pageId,
      },
    });
  }

  await prisma.ourmission.upsert({
    where: {
      pageId,
    },
    update: {
      title: "Our Mission",
      description: "To deliver reliable services across different industries.",
      imageURL: "/uploads/mission.jpg",
    },
    create: {
      title: "Our Mission",
      description: "To deliver reliable services across different industries.",
      imageURL: "/uploads/mission.jpg",
      pageId,
    },
  });

  await prisma.navigationbar.upsert({
    where: {
      id: 1,
    },
    update: {
      imageURL: "/uploads/aldlogo.png",
      button: "Contact Us",
    },
    create: {
      id: 1,
      imageURL: "/uploads/aldlogo.png",
      button: "Contact Us",
    },
  });

  await prisma.groupmission.upsert({
    where: {
      pageId,
    },
    update: {
      title: "Group Philosophy",
      description: "One ambition, one vision, one global reach.",
      imageURL: "/uploads/group-mission.jpg",
    },
    create: {
      title: "Group Philosophy",
      description: "One ambition, one vision, one global reach.",
      imageURL: "/uploads/group-mission.jpg",
      pageId,
    },
  });

  await prisma.homefooter.upsert({
    where: {
      id: 1,
    },
    update: {
      title: "Footer",
      description: "Copyright information and footer links.",
      imageURL: "/uploads/aldlogo.png",
    },
    create: {
      id: 1,
      title: "Footer",
      description: "Copyright information and footer links.",
      imageURL: "/uploads/aldlogo.png",
    },
  });


  const hometeammembers = [
    {
      title: "AMADOU LAMINE DIOP",
      description: "Chairman of the Board of Directors, ALD & Partners and Chairman of the Board of Directors, ALD & Partners Singapore Pte Ltd. ",
      imageURL: "/uploads/teammember1.jpg",
    },
    {
      title: "ABABACAR SECK",
      description: "CEO & Vice-Chairman of the Board of Directors, ALD & Partners and CEO & Vice-Chairman of the Board of Directors, ALD & Partners Singapore Pte. Ltd.",
      imageURL: "/uploads/teammember2.jpg",
    },
    
  ];

  for (const hometeammember of hometeammembers) {
    await prisma.hometeammember.upsert({
      where: {
        pageId_title: {
          pageId,
          title: hometeammember.title,
        },
      },
      update: {
        description: hometeammember.description,
        imageURL: hometeammember.imageURL,
      },
      create: {
        ...hometeammember,
        pageId,
      },
    });
  }
  const fullHomePage = await prisma.page.findUnique({
    where: {
      id: pageId,
    },
    include: {
      mainBanner: true,
      whoWeAre: true,
      services: true,
      mission: true,
      groupMission: true,
      homeTeamMembers: true,
    },
  });

  const navigationbar = await prisma.navigationbar.findUnique({
    where: {
      id: 1,
    },
  });

  const homefooter = await prisma.homefooter.findUnique({
    where: {
      id: 1,
    },
  });

  console.log({
    page: fullHomePage,
    navigationbar,
    homefooter,
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
