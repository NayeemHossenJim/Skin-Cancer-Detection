FROM python:3.10-slim

# Reduce image size and noise, avoid interactive prompts
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    DEBIAN_FRONTEND=noninteractive

# Set work directory
WORKDIR /app

# Install minimal system deps for OpenCV headless runtime
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        libgl1 \
        libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# Copy only requirements first for better layer caching
COPY requirements.txt .

# Prefer prebuilt wheels to avoid compilation and reduce layers
# Install CPU-only PyTorch stack first so ultralytics reuses it (smaller than CUDA builds)
RUN pip install --prefer-binary --no-cache-dir \
    --index-url https://download.pytorch.org/whl/cpu \
    torch==2.3.1 torchvision==0.18.1 torchaudio==2.3.1 \
    && pip install --prefer-binary --no-cache-dir -r requirements.txt

# Now copy the rest of the app
COPY . .

# Use non-root user for safety (no impact on size, but good practice)
RUN useradd -m appuser && chown -R appuser:appuser /app
USER appuser

# Expose port
EXPOSE 8000

# Run a single worker to minimize memory usage
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "1", "--no-access-log"]