# Dockerfile for Hugging Face Space (Monorepo setup)
FROM python:3.10-slim

WORKDIR /app

# 1. Install system dependencies (needed for Postgres/Psycopg2)
RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 2. Salin file requirements.txt dari folder backend ke dalam container
COPY agriflow-backend/requirements.txt .

# 3. Instal semua library yang dibutuhkan
RUN pip install --no-cache-dir -r requirements.txt

# 4. Salin SELURUH isi folder backend ke direktori kerja (/app)
# Ini akan membuat folder 'services', file 'main.py' dll berada di root container.
COPY agriflow-backend/ .

# 5. Port standar Hugging Face Spaces
EXPOSE 7860

# 6. Jalankan aplikasi menggunakan Uvicorn
# Pastikan main:app menunjuk ke file 'main.py' di dalam /app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
