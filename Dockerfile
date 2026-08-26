# Multi-stage production build for ShikshaSetu AI

# Stage 1: Build the Vite React Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Python FastAPI Backend + Static Asset Serving
FROM python:3.11-slim
WORKDIR /app

# Install Python dependencies
COPY backend/requirements.txt ./backend/
RUN pip install --no-cache-dir -r backend/requirements.txt

# Copy backend and built frontend
COPY . .
COPY --from=frontend-builder /app/dist ./dist

# Environment variables
ENV PORT=8000
ENV HOST=0.0.0.0
ENV SERVE_FRONTEND=true

EXPOSE 8000

CMD ["sh", "-c", "uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
