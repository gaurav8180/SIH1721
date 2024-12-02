import os
import logging
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import pytesseract
import cv2
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# Configuration
UPLOAD_FOLDER = 'static/uploaded_files'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

# Ensure upload directory exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Configure upload settings
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16 MB max file size

# Load banned substances
def load_banned_substances():
    try:
        banned_substances_df = pd.read_csv('data/banned_substances.csv')
        return set(banned_substances_df['substance_name'].str.lower())
    except Exception as e:
        logger.error(f"Error loading banned substances: {e}")
        return set()

BANNED_SUBSTANCES = load_banned_substances()

def allowed_file(filename):
    """Check if the file has an allowed extension"""
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def extract_text_from_image(filepath):
    """Extract text from image using Tesseract OCR"""
    try:
        image = cv2.imread(filepath)
        text = pytesseract.image_to_string(image)
        return text
    except Exception as e:
        logger.error(f"Error extracting text: {e}")
        return ""

def find_banned_substances(text):
    """Find banned substances in extracted text"""
    text_lower = text.lower()
    return [substance for substance in BANNED_SUBSTANCES if substance in text_lower]

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Handle file upload and analysis"""
    # Check if file is present
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']

    # Check if filename is empty
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    # Validate file
    if file and allowed_file(file.filename):
        # Secure the filename
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        try:
            # Save the file
            file.save(filepath)
            
            # Extract text
            text = extract_text_from_image(filepath)
            
            # Find banned substances
            found_substances = find_banned_substances(text)
            
            # Remove the uploaded file after processing
            os.remove(filepath)
            
            return jsonify({
                "text": text,
                "found_substances": found_substances
            }), 200

        except Exception as e:
            logger.error(f"Upload processing error: {e}")
            return jsonify({"error": "File processing failed"}), 500

    return jsonify({"error": "File type not allowed"}), 400

@app.errorhandler(413)
def request_entity_too_large(error):
    """Handle file size exceeded error"""
    return jsonify({"error": "File too large"}), 413

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)