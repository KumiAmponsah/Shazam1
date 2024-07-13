import subprocess

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
            print(result.stdout)

    except Exception as e:
        print(f"Exception occurred: {e}")

# Example usage
if __name__ == "__main__":
    audio_file_path = r"C:\Users\cypri\PycharmProjects\sound\.venv\Scripts\Do It Again (Live) - Elevation Worship.mp3"
    generate_audio_fingerprint(audio_file_path)
