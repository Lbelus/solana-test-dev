# Use the latest Ubuntu as the base image
FROM ubuntu:latest
ENV DEBIAN_FRONTEND=noninteractive

# Install essential tools and sudo
RUN apt-get update && apt-get install -y \
    curl \
    git \
    wget \
    ca-certificates \
    sudo \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g yarn \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set the Solana CLI tools in the PATH
RUN sh -c "$(curl -sSfL https://release.solana.com/v1.18.1/install)"
ENV PATH="/root/.local/share/solana/install/active_release/bin:$PATH"

ENV DEBIAN_FRONTEND=

WORKDIR /workspace

EXPOSE 3000

CMD ["/bin/bash"]

