import os
import json

keys_dir = "src/keys"
key_file = "src/key.json"

# Find the first JSON file in the src/keys directory
keys_files = sorted([f for f in os.listdir(keys_dir) if f.endswith('.json')])
if not keys_files:
    print("No JSON files found in src/keys directory")
    exit()

print(keys_files[0])
first_key_file = os.path.join(keys_dir, keys_files[0])

# Read the first file in src/keys directory as JSON
with open(first_key_file, 'r') as f:
    first_key_data = json.load(f)

# Read src/key.json
with open(key_file, 'r') as f:
    key_data = json.load(f)

# Get the id from src/key.json and increment by one
new_id = key_data['id'] + 1

# Set the new id in the first JSON file
first_key_data['id'] = new_id

# Write the updated JSON data into a new file
with open(key_file, 'w') as f:
    json.dump(first_key_data, f)

print(f"New JSON file with updated id ({new_id}) created")

# Remove the original JSON file
os.remove(first_key_file)
print(f"Original JSON file removed: {first_key_file}")