# Master Dockerfile for AgriFlow Monolith (FastAPI)
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies if any (e.g., libpq for psycopg2)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Copy root requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy all codes
COPY . .

# Run the Master Monolith
# Port 8000 is standard, HF Spaces uses 7860 by default for Gradio/Docker but we can override.
ENV PORT=10000
CMD ["python", "main.py"]
