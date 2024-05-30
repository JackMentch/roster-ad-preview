#!/bin/bash

# File path
file_path="src/key.json"

# Directory to store versions
versions_dir="file_versions"

# Create directory if it doesn't exist
if [ ! -d "$versions_dir" ]; then
    mkdir "$versions_dir"
fi

# Iterate over commits
git log --follow --format="%H %at" -- $file_path | while read -r commit_hash commit_timestamp
do
    # Convert timestamp to a human-readable format (YYYY-MM-DD_HH-MM-SS)
    timestamp=$(python -c "import datetime; print(datetime.datetime.utcfromtimestamp($commit_timestamp).strftime('%Y-%m-%d_%H-%M-%S'))")
    
    # Checkout file at the specific commit
    git checkout $commit_hash -- $file_path
    
    # Copy the file to the versions directory with the timestamp as the filename
    cp $file_path "$versions_dir/file_$timestamp.txt"
done
