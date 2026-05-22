const prisma = require("../utils/prisma");

function upsertOtp({ userId, otpHash, expiresAt }) {
  return prisma.emailverificationotp.upsert({
    where: {
      userId,
    },
    update: {
      otpHash,
      expiresAt,
    },
    create: {
      userId,
      otpHash,
      expiresAt,
    },
  });
}

function findOtpByUserId(userId) {
  return prisma.emailverificationotp.findUnique({
    where: {
      userId,
    },
  });
}

function deleteOtpByUserId(userId) {
  return prisma.emailverificationotp.deleteMany({
    where: {
      userId,
    },
  });
}

module.exports = {
  deleteOtpByUserId,
  findOtpByUserId,
  upsertOtp,
};
