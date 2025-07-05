# Steganography Suite

Steganography Suite is a full-stack web application for hiding (embedding) secret messages inside images (and optionally audio files) and for extracting those hidden messages. It uses Least Significant Bit (LSB) steganography, making it a great tool for cybersecurity education, CTF practice, and digital privacy awareness.

---

## Why is Steganography Suite Needed?

- **Educational Value:**  
  Steganography is an important topic in cybersecurity, digital forensics, and privacy. This app helps users understand the basics of information hiding and detection.
- **Practical Demonstration:**  
  Visualizes how seemingly harmless files can carry hidden messages, which is vital for security awareness and CTF (Capture The Flag) participants.
- **Skill Building:**  
  Lets students, teachers, and enthusiasts safely experiment with steganography techniques.

---

## How Does It Work?

### 1. Hiding a Message

- The user selects an image file (or audio, if implemented).
- The user enters a secret message.
- The app encodes the message into the file using the LSB technique:
  - For images: the least significant bits of pixel color channels are altered to store the message bits.
  - For audio: the least significant bits of audio samples are used.
- The resulting "stego" file looks and plays like the original, but contains the hidden message.
- The user can download the new file and share it securely.

### 2. Extracting a Message

- The user uploads a suspect image (or audio file).
- The app reads the least significant bits from the file to reconstruct and display the hidden message, if present.

---

## Features

- **Hide messages in images (PNG, JPG)**
- **Extract hidden messages from images**
- **Simple, intuitive interface**
- **Reusable file upload and result display components**
- **Educational README and clear code structure**
- *(Optional: Can be extended to support audio files)*

---

## Project Structure

```
steganography-suite/
│
├── backend/
│   ├── app.py             # Flask backend API
│   ├── steg_image.py      # Image steganography utilities
│   ├── steg_audio.py      # (Optional) Audio steganography utilities
│   └── requirements.txt   # Python dependencies
│
├── frontend/
│   └── src/
│       ├── App.js
│       ├── FileUpload.js
│       ├── HideMessage.js
│       ├── ExtractMessage.js
│       ├── ResultDisplay.js
│   └── package.json       # NPM dependencies
│
└── README.md
```

---

## Installation & Running

### Prerequisites

- **Backend:** Python 3.7+  
- **Frontend:** Node.js 16+ and npm

---

### 1. Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py
```
- The backend API will run at `http://localhost:5000`

---

### 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```
- The React app will run at `http://localhost:3000`

---

## Usage

### Hiding a Message

1. Open `http://localhost:3000` in your browser.
2. Click the **"Hide Message"** tab.
3. Upload an image file.
4. Enter your secret message.
5. Click **"Hide Message"**.
6. Download the generated steganographic image and share it if needed.

### Extracting a Message

1. Click the **"Extract Message"** tab.
2. Upload a (potentially steganographic) image file.
3. Click **"Extract Message"**.
4. If a hidden message exists, it will be displayed.

---

## How the LSB (Least Significant Bit) Steganography Works

- Each character of the message is converted to binary.
- Each bit of the message is stored in the least significant bit of the image pixels’ color values, or of audio samples.
- The changes are visually/audibly imperceptible but can be reversed to recover the message.

**Example:**  
Original pixel: `[11001010, 10101010, 11110000]`  
With secret bit `1` embedded in the blue channel: `[11001010, 10101010, 11110001]`

---

## Customization & Extensions

- **Support More File Types:**  
  Extend `steg_audio.py` and backend routes to support audio files.
- **Visualization:**  
  Add pixel/sample change visualizations for classroom demonstrations.
- **Challenge Mode:**  
  Provide files with known secrets for practice.
- **Security Improvements:**  
  Add optional encryption for messages before embedding.

---

## Limitations

- Only works with uncompressed images (PNG recommended).
- Large messages require large carrier files.
- Not designed for production or for hiding highly sensitive data.

---

## License

For educational and research purposes only.  
**Do not use for illegal or unethical purposes.**

---

## Credits

Created for cybersecurity education and learning.
