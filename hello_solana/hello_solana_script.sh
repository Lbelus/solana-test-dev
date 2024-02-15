#!/bin/bash

cd hello_world/
cargo build-bpf
cd ..
cd hello_world_client
npm install
cd ..