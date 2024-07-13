import subprocess
from datetime import datetime
from supabase import create_client, Client

url = "https://fmewejfctycmlihkdtqx.supabase.co"
key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtZXdlamZjdHljbWxpaGtkdHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA5MDM5NjQsImV4cCI6MjAzNjQ3OTk2NH0.YT6nAH9R1-BFsHDkU4IFgmiHNNPDc5kJCl3hngbqRpU"

supabase: Client = create_client(url, key)

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
        else:
            fingerprint_data = result.stdout.strip()
            # Store the fingerprint in Supabase
            insert_query = supabase.table('fingerprints').insert({
                'fingerprint_data': fingerprint_data,
                'created_at': datetime.now().isoformat()
            }).execute()

            # Check for errors in the response
            if 'error' in insert_query:
                print(f"Error inserting fingerprint into Supabase: {insert_query['error']}")
            else:
                print("Fingerprint successfully stored in Supabase.")
    except Exception as e:
        print(f"Exception occurred: {e}")

# Example usage
if __name__ == "__main__":
    audio_file_path = r"C:\Users\cypri\PycharmProjects\sound\.venv\Scripts\Do It Again (Live) - Elevation Worship.mp3"
    generate_audio_fingerprint(audio_file_path)
