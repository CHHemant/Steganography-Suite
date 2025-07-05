from PIL import Image
import binascii

def encode_message(img_bytes, message):
    img = Image.open(img_bytes)
    encoded = img.copy()
    width, height = img.size
    msg_bin = ''.join([format(ord(i), "08b") for i in message])
    msg_bin += '00000011'  # End marker (ETX)
    data_idx = 0

    for y in range(height):
        for x in range(width):
            pixel = list(img.getpixel((x, y)))
            for n in range(3):  # RGB
                if data_idx < len(msg_bin):
                    pixel[n] = pixel[n] & ~1 | int(msg_bin[data_idx])
                    data_idx += 1
            encoded.putpixel((x, y), tuple(pixel))
            if data_idx >= len(msg_bin):
                break
        if data_idx >= len(msg_bin):
            break
    return encoded

def decode_message(img_bytes):
    img = Image.open(img_bytes)
    width, height = img.size
    bits = ""
    for y in range(height):
        for x in range(width):
            pixel = img.getpixel((x, y))
            for n in range(3):  # RGB
                bits += str(pixel[n] & 1)
    chars = [bits[i:i+8] for i in range(0, len(bits), 8)]
    msg = ""
    for c in chars:
        if c == "00000011":  # End marker (ETX)
            break
        msg += chr(int(c, 2))
    return msg
