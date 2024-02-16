# Use the latest Ubuntu as the base image
FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    cmake \
    unzip \
    pkg-config \
    libudev-dev \
    libssl-dev \
    git \
    wget \
    ca-certificates

RUN apt-get clean \
    && rm -rf /var/lib/apt/lists/*


RUN apt-get remove -y nodejs npm || true

RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Solana CLI tools
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.18.1/install)"
ENV PATH="/root/.local/share/solana/install/active_release/bin:$PATH"

# Install Yarn
RUN npm install -g yarn

ENV DEBIAN_FRONTEND=

WORKDIR /workspace

CMD ["/bin/bash"]

# Create a non-root user and switch to it
RUN useradd -m solanauser
USER solanauser