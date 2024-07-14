import subprocess
import requests
from difflib import SequenceMatcher
from datetime import datetime
from pydub import AudioSegment
import os

# Supabase connection details
supabase_url = "https://fmewejfctycmlihkdtqx.supabase.co"
supabase_api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZXdlamZjdHljbWxpaGtkdHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5MDM5NjQsImV4cCI6MjAzNjQ3OTk2NH0.YT6nAH9R1-BFsHDkU4IFgmiHNNPDc5kJCl3hngbqRpU"

def convert_mp3_to_wav(mp3_file, wav_file):
    try:
        # Load MP3 file
        audio = AudioSegment.from_file(mp3_file, format="mp3")

        # Export as WAV
        audio.export(wav_file, format="wav")

        print(f"MP3 file '{mp3_file}' converted to WAV successfully.")
        return True

    except Exception as e:
        print(f"Error converting MP3 to WAV: {e}")
        return False

def generate_audio_fingerprint(audio_file):
    try:
        # Convert MP3 to WAV
        processed_file = "processed_audio.wav"
        if not convert_mp3_to_wav(audio_file, processed_file):
            return None

        # Generate fingerprint for processed audio
        fingerprint = generate_fingerprint_from_wav(processed_file)

        # Clean up processed file
        os.remove(processed_file)

        return fingerprint

    except subprocess.CalledProcessError as e:
        print(f"Error processing audio: {e}")
    except Exception as e:
        print(f"Exception occurred: {e}")
        return None

def generate_fingerprint_from_wav(wav_file):
    try:
        # Full path to fpcalc.exe and command to run
        fpcalc_path = r'C:\Users\cypri\Downloads\chromaprint-fpcalc-1.5.1-windows-x86_64\fpcalc.exe'
        command = f'"{fpcalc_path}" "{wav_file}"'

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

        # Compare generated fingerprint with fingerprints from Supabase
        match_found = False
        for fp in fingerprints:
            stored_fingerprint = fp['fingerprint_data']
            matcher = SequenceMatcher(None, fingerprint, stored_fingerprint)
            match_ratio = matcher.ratio()

            # Adjust threshold based on your matching criteria
            if match_ratio > 0.7:  # Example threshold, adjust as needed
                match_found = True
                break

        if match_found:
            print("Match found: Similar audio fingerprint in Supabase.")
        else:
            print("No match found: Audio fingerprint not found in Supabase.")

    except Exception as e:
        print(f"Exception occurred: {e}")

if __name__ == "__main__":
    # Example audio file to test (replace with your file path)
    audio_file_path = r"C:\Users\cypri\PycharmProjects\sound\.venv\Scripts\Do It Again (Live) - Elevation Worship.mp3"

    # Generate audio fingerprint for the specified audio file
    generated_fingerprint = generate_audio_fingerprint(audio_file_path)

    if generated_fingerprint:
        print("Generated audio fingerprint:")
        print(generated_fingerprint)
        print()

        # Compare generated fingerprint with fingerprints from Supabase
        compare_fingerprint_with_supabase(audio_file_path)
