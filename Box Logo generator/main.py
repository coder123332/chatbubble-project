from flask import Flask, request, send_file, render_template
from PIL import Image, ImageDraw, ImageFont
import textwrap
import io

app = Flask(__name__)

def create_image_with_text(text, text_color, frame_color, is_italic):
    # Load the font
    try:
        if is_italic:
            font = ImageFont.truetype("Montserrat-BlackItalic.ttf", 40)
        else:
            font = ImageFont.truetype("Montserrat-Black.ttf", 40)
    except IOError:
        font = ImageFont.load_default()

    # Force text to uppercase
    text = text.upper()

    # Initialize drawing context
    dummy_image = Image.new('RGBA', (1, 1))
    draw = ImageDraw.Draw(dummy_image)

    # Wrap text and calculate dimensions
    lines = textwrap.wrap(text, width=40)
    max_line_width = max(draw.textbbox((0, 0), line, font=font)[2] for line in lines)
    total_text_height = sum(draw.textbbox((0, 0), line, font=font)[3] - draw.textbbox((0, 0), line, font=font)[1] for line in lines)

    # Define padding and frame width
    left_right_padding = 10
    top_padding = -4
    bottom_padding = 16
    frame_width = 5

    # Calculate image dimensions
    image_width = max_line_width + 2 * left_right_padding
    image_height = total_text_height + top_padding + bottom_padding

    # Create a blank image with a transparent background
    image = Image.new('RGBA', (image_width, image_height), (255, 255, 255, 0))  # Fully transparent background
    draw = ImageDraw.Draw(image)

    # Draw the text on the image
    y_text = top_padding
    for line in lines:
        text_bbox = draw.textbbox((0, 0), line, font=font)
        line_width = text_bbox[2] - text_bbox[0]
        line_height = text_bbox[3] - text_bbox[1]
        draw.text(((image_width - line_width) / 2, y_text), line, font=font, fill=text_color)
        y_text += line_height

    # Draw a frame around the text
    draw.rectangle([(0, 0), (image_width-1, image_height-1)], outline=frame_color, width=frame_width)

    # Apply shear transformation if is_italic is True
    if is_italic:
        shear_angle = 0.2  # Slight skew
        image = image.transform(
            (image_width, image_height),
            Image.Transform.AFFINE,
            (1, shear_angle, 0, 0, 1, 0),
            Image.BICUBIC
        )

    # Save the image to a BytesIO object
    img_io = io.BytesIO()
    image.save(img_io, 'PNG')
    img_io.seek(0)

    return img_io

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate', methods=['POST'])
def generate():
    text = request.form['text']
    text_color = request.form['text_color']
    frame_color = request.form['frame_color']
    is_italic = request.form.get('is_italic') == 'on'

    img_io = create_image_with_text(text, text_color, frame_color, is_italic)
    return send_file(img_io, mimetype='image/png', as_attachment=True, download_name='output_image.png')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
