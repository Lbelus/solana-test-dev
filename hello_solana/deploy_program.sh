#!/bin/bash

# Path to the .env file
ENV_FILE="hello_world_client/.env"

# Deploy the program and save the output
# solana program deploy hello_world/target/deploy/hello_world_solana.so > deploy_output.txt

# Extract the Program ID and format it
PROGRAM_ID=$(grep -o 'Program Id: .*' deploy_output.txt | awk '{print $3}')
echo "Extracted Program ID: $PROGRAM_ID"

if [ ! -f "$ENV_FILE" ]; then
    echo "Creating $ENV_FILE file..."
fi

echo "SOLANA_PROGRAM_ID=$PROGRAM_ID" >> "$ENV_FILE"
echo "Updated $ENV_FILE with new program ID."
