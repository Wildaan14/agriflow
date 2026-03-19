# Master Dockerfile for AgriFlow Backend (Hugging Face Optimized)
FROM python:3.10-slim

WORKDIR /app

# 1. Install system dependencies
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 2. Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 3. Copy all backend files
COPY . .

# 4. Expose the port (HF uses 7860 by default)
ENV PORT=7860
EXPOSE 7860

# 5. Run the FastAPI application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
