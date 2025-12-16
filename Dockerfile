#--------------------------------
# TAHAP 1: BUILDER (BENGKEL)
#--------------------------------
FROM node:24-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci
COPY . .
RUN npm run build

#--------------------------------
# TAHAP 2: PRODUCTION (OPERASIONAL)
#--------------------------------
FROM node:24-alpine
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --omit=dev --ignore-scripts

# Salin hasil build dari tahap 'builder'
COPY --from=builder /app/dist ./dist

# --- TAMBAHKAN BARIS DI BAWAH INI ---
# Salin juga Prisma Client yang sudah digenerate ke dalam folder dist
COPY --from=builder /app/src/generated ./dist/generated

COPY --from=builder /app/prisma ./prisma
# Ekspos port yang digunakan oleh aplikasi
EXPOSE 10000

# Perintah default untuk menjalankan aplikasi saat kontainer dimulai
CMD ["node", "dist/server.js"]