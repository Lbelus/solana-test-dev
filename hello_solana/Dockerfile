FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    llvm-11 llvm-11-dev \
    clang \
    cmake \
    unzip \
    nasm \
    pkg-config \
    libssl-dev \
    git \
    wget \
    ca-certificates \
    python3 \
    python3-pip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Remove IF any existing Node.js and npm installations
RUN apt-get remove -y nodejs npm || true

# Install Node.js (LTS Version) and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Rust
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV PATH="/root/.cargo/bin:${PATH}"

# Install Solana CLI tools
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.18.1/install)"
env PATH="/root/.local/share/solana/install/active_release/bin:$PATH"

# Install Yarn
RUN npm install -g yarn

ENV DEBIAN_FRONTEND=

WORKDIR /workspace
CMD ["/bin/bash"]