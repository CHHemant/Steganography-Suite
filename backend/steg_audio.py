import wave
import numpy as np
import io

# Helper functions
def _text_to_bits(text):
    return ''.join(format(ord(c), '08b') for c in text)

def _bits_to_text(bits):
    chars = [bits[i:i+8] for i in range(0, len(bits), 8)]
    out = ""
    for c in chars:
        if c == "00000011":  # End-of-text marker (ETX)
            break
        out += chr(int(c, 2))
    return out

def encode_audio(wav_bytes, message):
    """
    Hide a text message inside a WAV audio file using LSB steganography.
    Returns an in-memory BytesIO object of the new WAV file.
    """
    # Open audio
    with wave.open(wav_bytes, 'rb') as audio:
        params = audio.getparams()
        frames = audio.readframes(audio.getnframes())
        audio_bytes = np.frombuffer(frames, dtype=np.uint8)

    # Prepare message bits
    msg_bits = _text_to_bits(message)
    msg_bits += '00000011'  # End marker (ETX)

    if len(msg_bits) > len(audio_bytes):
        raise ValueError("Message is too long to encode in this audio file.")

    # Hide message in LSB of audio bytes
    for i, bit in enumerate(msg_bits):
        audio_bytes[i] = (audio_bytes[i] & ~1) | int(bit)

    # Write new audio to buffer
    out_buf = io.BytesIO()
    with wave.open(out_buf, 'wb') as out_audio:
        out_audio.setparams(params)
        out_audio.writeframes(audio_bytes.tobytes())
    out_buf.seek(0)
    return out_buf

def decode_audio(wav_bytes):
    """
    Extract a hidden text message from a WAV audio file using LSB steganography.
    """
    with wave.open(wav_bytes, 'rb') as audio:
        frames = audio.readframes(audio.getnframes())
        audio_bytes = np.frombuffer(frames, dtype=np.uint8)
    
    bits = ""
    for b in audio_bytes:
        bits += str(b & 1)
    return _bits_to_text(bits)
