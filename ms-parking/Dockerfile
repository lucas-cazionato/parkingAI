# Use the official Python image as a base image
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y libpq-dev gcc && rm -rf /var/lib/apt/lists/*

# Set the working directory inside the container
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip3 install --no-cache-dir -r requirements.txt

# Copy the rest of the app's code
COPY . .

# Expose the port that Flask runs on
EXPOSE 5000

# Command to run the application
ENTRYPOINT [ "python" ]

CMD ["src/app/app.py"]
