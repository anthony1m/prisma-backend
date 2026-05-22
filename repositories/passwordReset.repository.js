const prisma = require("../utils/prisma");

function upsertOtp({ userId, otpHash, expiresAt }) {
  return prisma.passwordresetotp.upsert({
    where: {
      userId,
    },
    update: {
      otpHash,
      expiresAt,
      verifiedAt: null,
    },
    create: {
      userId,
      otpHash,
      expiresAt,
    },
  });
}

function findOtpByUserId(userId) {
  return prisma.passwordresetotp.findUnique({
    where: {
      userId,
    },
  });
}

function markOtpVerified(userId) {
  return prisma.passwordresetotp.update({
    where: {
      userId,
    },
    data: {
      verifiedAt: new Date(),
    },
  });
}

function deleteOtpByUserId(userId) {
  return prisma.passwordresetotp.deleteMany({
    where: {
      userId,
    },
  });
}

module.exports = {
  deleteOtpByUserId,
  findOtpByUserId,
  markOtpVerified,
  upsertOtp,
};
