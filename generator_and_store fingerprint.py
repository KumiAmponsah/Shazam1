import subprocess
from datetime import datetime
import requests

# Supabase connection details
supabase_url = "https://fmewejfctycmlihkdtqx.supabase.co"
supabase_api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZXdlamZjdHljbWxpaGtkdHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5MDM5NjQsImV4cCI6MjAzNjQ3OTk2NH0.YT6nAH9R1-BFsHDkU4IFgmiHNNPDc5kJCl3hngbqRpU"

def generate_audio_fingerprint(audio_file):
    try:
        # Full path to fpcalc.exe and command to run
        fpcalc_path = r'C:\Users\cypri\Downloads\chromaprint-fpcalc-1.5.1-windows-x86_64\fpcalc.exe'
        command = f'"{fpcalc_path}" "{audio_file}"'

        # Run the command and capture output and errors
        result = subprocess.run(command, shell=True, capture_output=True, text=True)

        # Check if there was an error
        if result.returncode != 0:
            print(f"Error generating fingerprint: {result.stderr}")
            return None
        else:
            return result.stdout.strip()  # Return the generated fingerprint as a string

    except Exception as e:
        print(f"Exception occurred: {e}")
        return None

def upload_fingerprint_to_supabase(fingerprint):
    try:
        # Construct the API endpoint URL
        endpoint = f"{supabase_url}/rest/v1/fingers"

        # Construct the headers with API key
        headers = {
            "apikey": supabase_api_key,
            "Content-Type": "application/json",
            "Prefer": "return=representation"
        }

        # Create the payload with fingerprint data
        payload = {
            "fingerprint_data": fingerprint,
            "created_at": datetime.utcnow().isoformat()
        }

        # Make the POST request to upload fingerprint to Supabase
        response = requests.post(endpoint, json=payload, headers=headers)

        # Check if the request was successful
        if response.status_code == 201:
            print("Fingerprint uploaded successfully to Supabase.")
        else:
            print(f"Error uploading fingerprint: {response.text}")

    except Exception as e:
        print(f"Exception occurred: {e}")

# Example usage
if __name__ == "__main__":
    audio_file_path = r"C:\Users\cypri\PycharmProjects\sound\.venv\Scripts\Do It Again (Live) - Elevation Worship.mp3"

    # Generate audio fingerprint
    fingerprint = generate_audio_fingerprint(audio_file_path)

    if fingerprint:
        # Upload fingerprint to Supabase
        upload_fingerprint_to_supabase(fingerprint)
