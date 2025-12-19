# ---------- Build stage ----------
FROM node:22-alpine AS build

WORKDIR /app

# Copia arquivos de dependência
COPY package*.json ./

RUN npm ci

# Copia o restante do código
COPY . .

# Build do frontend
RUN npm run build


# ---------- Runtime stage ----------
FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=production

# Copia apenas o necessário para rodar
COPY --from=build /app/package*.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Porta do Vite preview
EXPOSE 4500

# Roda o preview
CMD ["npm", "run", "preview", "--", "--port", "4500", "--host"]
