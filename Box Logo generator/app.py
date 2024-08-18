from flask import Flask, request, send_file, render_template_string
from PIL import Image, ImageDraw, ImageFont
import textwrap
import io

app = Flask(__name__)

def create_image_with_text(text):
    # Set up image dimensions and colors
    width, height = 500, 100
    background_color = (255, 255, 255)  # white
    text_color = (0, 0, 0)  # black
    frame_color = (255, 0, 0)  # red

    # Create a blank image with white background
    image = Image.new('RGB', (width, height), background_color)
    draw = ImageDraw.Draw(image)

    # Load a font
    try:
        font = ImageFont.truetype("arial.ttf", 40)
    except IOError:
        font = ImageFont.load_default()

    # Wrap the text to fit within the width
    margin = 10
    max_width = width - 2 * margin
    lines = textwrap.wrap(text, width=40)

    # Calculate the height of the text to center it vertically
    text_height = sum([draw.textsize(line, font=font)[1] for line in lines])
    y_text = (height - text_height) // 2

    # Draw the text on the image
    for line in lines:
        text_width, text_height = draw.textsize(line, font=font)
        draw.text(((width - text_width) / 2, y_text), line, font=font, fill=text_color)
        y_text += text_height

    # Draw a red frame around the image
    frame_width = 5
    draw.rectangle([(0, 0), (width-1, height-1)], outline=frame_color, width=frame_width)

    # Save the image to a BytesIO object
    img_io = io.BytesIO()
    image.save(img_io, 'PNG')
    img_io.seek(0)

    return img_io

@app.route('/')
def index():
    return render_template_string('''
        <!doctype html>
        <html>
        <head><title>Text to Image</title></head>
        <body>
            <h1>Enter text to generate image:</h1>
            <form action="/generate" method="post">
                <input type="text" name="text" />
                <input type="submit" />
            </form>
        </body>
        </html>
    ''')

@app.route('/generate', methods=['POST'])
def generate():
    text = request.form['text']
    img_io = create_image_with_text(text)
    return send_file(img_io, mimetype='image/png', as_attachment=True, download_name='output_image.png')

if __name__ == '__main__':
    app.run(debug=True)
