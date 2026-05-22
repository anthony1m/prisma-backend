#!/bin/sh
set -e

echo "Generating Prisma client..."
npx prisma generate

echo "Applying Prisma migrations..."
npx prisma migrate deploy

echo "Starting API server..."
node server.js
