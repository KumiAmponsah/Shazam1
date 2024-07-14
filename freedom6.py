import subprocess
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

def fetch_all_fingerprints_from_supabase():
    try:
        # Construct the API endpoint URL
        endpoint = f"{supabase_url}/rest/v1/fingers"

        # Construct the headers with API key
        headers = {
            "apikey": supabase_api_key,
            "Content-Type": "application/json"
        }

        # Make the GET request to fetch all fingerprints from Supabase
        response = requests.get(endpoint, headers=headers)

        # Check if the request was successful
        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error fetching fingerprints from Supabase: {response.text}")
            return None

    except Exception as e:
        print(f"Exception occurred: {e}")
        return None

def compare_fingerprint_with_supabase(audio_file):
    try:
        # Generate audio fingerprint for the current audio file
        fingerprint = generate_audio_fingerprint(audio_file)

        if not fingerprint:
            return

        # Fetch all fingerprints from Supabase
        fingerprints = fetch_all_fingerprints_from_supabase()

        if not fingerprints:
            return

        # Extract fingerprint data from Supabase response
        supabase_fingerprints = [fingerprint_record['fingerprint_data'] for fingerprint_record in fingerprints]

        # Compare generated fingerprint with fingerprints from Supabase
        if fingerprint in supabase_fingerprints:
            print("Match found: Same audio fingerprint in Supabase.")
        else:
            print("No match found: Audio fingerprint not found in Supabase.")

    except Exception as e:
        print(f"Exception occurred: {e}")

# Example usage
if __name__ == "__main__":
    audio_file_path = r"C:\Users\cypri\PycharmProjects\sound\.venv\Scripts\Elevation_Worship_-_Same_God_CeeNaija.com_.mp3"

    # Compare audio fingerprint with Supabase
    compare_fingerprint_with_supabase(audio_file_path)
