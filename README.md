<div align="center">


# 🔬 Skin Cancer Detection System
  
</a>

### *AI-Powered Medical Image Analysis for Early Detection*

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python&logoColor=white)](https://www.python.org/)
[![YOLO](https://img.shields.io/badge/YOLO-v12-00FFFF?logo=yolo&logoColor=white)](https://github.com/ultralytics/ultralytics)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![OpenCV](https://img.shields.io/badge/OpenCV-4.x-5C3EE8?logo=opencv&logoColor=white)](https://opencv.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success" alt="Status"/>
  <img src="https://img.shields.io/github/stars/NayeemHossenJim/Skin-Cancer-Detection?style=social" alt="Stars"/>
  <img src="https://img.shields.io/github/forks/NayeemHossenJim/Skin-Cancer-Detection?style=social" alt="Forks"/>
</p>
</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Demo](#-demo)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Model Details](#-model-details)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Disclaimer](#-disclaimer)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🌟 Overview

**Skin Cancer Detection System** is an advanced computer vision application that leverages deep learning to assist in the early detection and identification of skin lesions. Built with **YOLO (You Only Look Once)** object detection architecture, this tool provides real-time analysis of dermatological images to help identify potential areas of concern.

### 🎯 Purpose

This system is designed to:
- 🔍 **Detect and localize** skin lesions in medical images
- ⚡ **Provide instant analysis** with confidence scores
- 🖼️ **Visualize results** with annotated bounding boxes
- 🌐 **Offer easy access** through a modern web interface

### ⚕️ Medical Application

Early detection of skin cancer significantly improves treatment outcomes. This AI-powered tool aims to assist healthcare professionals and individuals in:
- Initial screening of suspicious skin lesions
- Prioritizing cases for dermatological examination
- Tracking changes in existing lesions over time
- Educational purposes in medical training

> **⚠️ Important:** This tool is designed as an assistive technology and should not replace professional medical diagnosis. Always consult qualified healthcare providers for medical decisions.

---

## ✨ Key Features

<table>
<tr>
<td>

### 🎯 Core Capabilities
- ✅ Real-time lesion detection
- ✅ Multiple lesion classification
- ✅ High-accuracy YOLO architecture
- ✅ Confidence score reporting
- ✅ Bounding box visualization

</td>
<td>

### 🛠️ Technical Features
- ✅ FastAPI backend
- ✅ Modern responsive UI
- ✅ Image preprocessing pipeline
- ✅ RESTful API endpoints
- ✅ Base64 image encoding

</td>
</tr>
<tr>
<td>

### 🌐 User Interface
- ✅ Drag-and-drop upload
- ✅ Real-time processing feedback
- ✅ Interactive results display
- ✅ Download annotated images
- ✅ Mobile-responsive design

</td>
<td>

### 📊 Analysis Features
- ✅ Object counting
- ✅ Confidence scoring
- ✅ Bounding box coordinates
- ✅ Visual annotations
- ✅ Detection summary

</td>
</tr>
</table>

---

## 🎬 Demo

### Web Interface

The application features an intuitive web interface that allows users to:

👉 Try it online (no setup needed): https://www.jimml.signalsmind.com

1. **Upload Image**: Drag and drop or click to select dermatological images
2. **Processing**: AI model analyzes the image in real-time
3. **View Results**: See detected lesions with bounding boxes and confidence scores
4. **Download**: Save annotated images for records

### Sample Output

```json
{
  "detections": [
    {
      "class": "melanoma",
      "confidence": 0.87,
      "box": [145.3, 230.1, 289.7, 374.5]
    }
  ],
  "image": "data:image/jpeg;base64,...",
  "total_objects": 1
}
```

---

## 💻 Technology Stack

<div align="center">

### Core Technologies

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white)

### Libraries & Frameworks

| Category | Technologies |
|----------|-------------|
| **Deep Learning** | Ultralytics YOLO, PyTorch |
| **Computer Vision** | OpenCV, Pillow (PIL) |
| **Data Processing** | NumPy, Base64 |
| **Web Framework** | FastAPI, Uvicorn |
| **Frontend** | HTML5, CSS3, JavaScript |
| **Templating** | Jinja2 |

</div>

---

## 📥 Installation

### Prerequisites

- Python 3.8 or higher
- pip package manager
- Git
- 4GB+ RAM recommended
- Webcam or image files for testing

### Quick Start

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/NayeemHossenJim/Skin-Cancer-Detection.git
cd Skin-Cancer-Detection
```

#### 2️⃣ Create Virtual Environment

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\activate
```

**Linux/macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
```

#### 3️⃣ Install Dependencies

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

#### 4️⃣ Verify Model File

Ensure the trained model is present:
```
output/best.pt
```

If the model file is missing, you'll need to train or download a pre-trained model.

---

## 🚀 Usage

### Starting the Application

#### Method 1: Run with Uvicorn

```bash
uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

#### Method 2: Run with Python

```bash
python -m uvicorn app:app --reload
```

### Accessing the Application

Once started, open your browser and navigate to:

- **Web Interface**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative Docs**: http://localhost:8000/redoc

### Using the Web Interface

1. **Open** http://localhost:8000 in your browser
2. **Upload** a skin lesion image (JPG, PNG, GIF, WebP)
3. **Wait** for AI processing (typically 1-3 seconds)
4. **View** detection results with annotated bounding boxes
5. **Download** the annotated image if needed

### Using the API

#### Python Example

```python
import requests

# Detect skin lesions in an image
url = "http://localhost:8000/detect/"
files = {"file": open("skin_lesion.jpg", "rb")}
response = requests.post(url, files=files)

results = response.json()
print(f"Total lesions detected: {results['total_objects']}")

for detection in results['detections']:
    print(f"Class: {detection['class']}")
    print(f"Confidence: {detection['confidence']:.2%}")
    print(f"Location: {detection['box']}")
```

#### cURL Example

```bash
curl -X POST "http://localhost:8000/detect/" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "file=@skin_lesion.jpg"
```

#### JavaScript Example

```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]);

fetch('http://localhost:8000/detect/', {
    method: 'POST',
    body: formData
})
.then(response => response.json())
.then(data => {
    console.log('Detections:', data.detections);
    console.log('Total objects:', data.total_objects);
});
```

---

## 🧠 Model Details

### Architecture

- **Model**: YOLO (You Only Look Once)
- **Version**: YOLOv8 (Ultralytics)
- **Task**: Object Detection
- **Input**: RGB images (various sizes)
- **Output**: Bounding boxes, class labels, confidence scores

### Model File

- **Location**: `output/best.pt`
- **Format**: PyTorch weights
- **Size**: Varies based on model variant

### Training Details

The model has been trained to detect and classify various types of skin lesions. Key characteristics:

- **Classes**: Custom trained for skin lesion types
- **Confidence Threshold**: Configurable (default varies)
- **IoU Threshold**: Non-maximum suppression
- **Preprocessing**: Automatic image normalization

### Performance Considerations

- **Inference Speed**: Real-time (< 100ms per image on GPU)
- **GPU Acceleration**: Automatically utilized if available
- **CPU Fallback**: Supported but slower
- **Batch Processing**: Single image per request

---

## 📚 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Web interface homepage |
| `POST` | `/detect/` | Detect skin lesions in uploaded image |
| `GET` | `/docs` | Interactive API documentation (Swagger UI) |
| `GET` | `/redoc` | Alternative API documentation (ReDoc) |

### POST /detect/

Upload an image and receive detection results.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body: Form data with file field

**Request Example:**
```python
files = {"file": ("image.jpg", open("image.jpg", "rb"), "image/jpeg")}
response = requests.post("http://localhost:8000/detect/", files=files)
```

**Response:**
```json
{
  "detections": [
    {
      "class": "melanoma",
      "confidence": 0.87,
      "box": [145.3, 230.1, 289.7, 374.5]
    },
    {
      "class": "nevus",
      "confidence": 0.76,
      "box": [45.1, 120.3, 189.6, 264.8]
    }
  ],
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "total_objects": 2
}
```

**Response Fields:**
- `detections`: Array of detected objects
  - `class`: Lesion type/classification
  - `confidence`: Detection confidence (0-1)
  - `box`: Bounding box coordinates [x1, y1, x2, y2]
- `image`: Base64-encoded annotated image
- `total_objects`: Count of detected lesions

**Status Codes:**
- `200`: Success
- `422`: Validation error (invalid file format)
- `500`: Internal server error

---

## 📁 Project Structure

```
Skin-Cancer-Detection/
│
├── 📂 output/                      # Model files
│   └── best.pt                    # Trained YOLO model
│
├── 📂 static/                     # Static assets
│   ├── style.css                 # Application styles
│   └── script.js                 # Frontend JavaScript
│
├── 📂 templates/                  # HTML templates
│   └── index.html                # Main web interface
│
├── 📄 app.py                      # FastAPI application
├── 📄 requirements.txt            # Python dependencies
├── 📄 README.md                   # This file
└── 📄 LICENSE                     # License information
```

### Key Files

- **app.py**: Main FastAPI application with detection endpoint
- **output/best.pt**: Trained YOLO model weights
- **templates/index.html**: Web interface
- **static/style.css**: UI styling
- **static/script.js**: Frontend interaction logic
- **requirements.txt**: Python package dependencies

---

## ⚠️ Disclaimer

### Medical Device Notice

This software is provided for **educational and research purposes only**. It is NOT:

- ❌ A certified medical device
- ❌ Approved for clinical diagnosis
- ❌ A replacement for professional medical advice
- ❌ Validated for regulatory compliance (FDA, CE, etc.)

### Usage Guidelines

- ✅ **DO** use for preliminary screening
- ✅ **DO** consult healthcare professionals
- ✅ **DO** verify results with medical experts
- ✅ **DO** use as an educational tool
- ❌ **DO NOT** rely solely on this tool for diagnosis
- ❌ **DO NOT** use as a substitute for medical care
- ❌ **DO NOT** make treatment decisions based on results

### Accuracy and Limitations

- Model accuracy depends on training data quality
- Performance varies with image quality and lighting
- May produce false positives or false negatives
- Requires validation in clinical settings
- Not suitable for emergency medical situations

### Legal Notice

The developers and contributors of this software are not responsible for any medical decisions made based on the output of this system. Always seek professional medical advice from qualified healthcare providers.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help improve this project:

### How to Contribute


1. **Fork the repository**
   ```bash
   # Click the "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Skin-Cancer-Detection.git
   cd Skin-Cancer-Detection
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Add new features
   - Fix bugs
   - Improve documentation
   - Enhance UI/UX

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes

### Development Guidelines

- Follow PEP 8 style guidelines for Python code
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation as needed
- Maintain backward compatibility
- Write meaningful commit messages

### Areas for Contribution

- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **Features**: Propose and implement new features
- 📚 **Documentation**: Improve README and code comments
- 🎨 **UI/UX**: Enhance the web interface
- 🧪 **Testing**: Add unit and integration tests
- 🔧 **Performance**: Optimize code and model inference
- 🌐 **Localization**: Add multi-language support

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Nayeem Hossen Jim

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 📧 Contact

**Nayeem Hossen Jim**

- 📧 **Email**: [nayeemhossenjim@gmail.com](mailto:nayeemhossenjim@gmail.com)
- 💼 **GitHub**: [@NayeemHossenJim](https://github.com/NayeemHossenJim)
- 🔗 **Project**: [Skin-Cancer-Detection](https://github.com/NayeemHossenJim/Skin-Cancer-Detection)

---

## 🙏 Acknowledgments

- **Ultralytics**: For the YOLO framework
- **FastAPI**: For the excellent web framework
- **OpenCV Community**: For computer vision tools
- **Medical Community**: For guidance on skin lesion analysis
- **Open Source Contributors**: For inspiring this project

---

## 📊 Project Statistics

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/NayeemHossenJim/Skin-Cancer-Detection)
![GitHub language count](https://img.shields.io/github/languages/count/NayeemHossenJim/Skin-Cancer-Detection)
![GitHub top language](https://img.shields.io/github/languages/top/NayeemHossenJim/Skin-Cancer-Detection)
![GitHub last commit](https://img.shields.io/github/last-commit/NayeemHossenJim/Skin-Cancer-Detection)

</div>

---

## ⭐ Show Your Support

If you find this project helpful for your research or learning, please consider:

- ⭐ **Starring** the repository on GitHub
- 🔀 **Forking** to create your own version
- 📢 **Sharing** with others who might benefit
- 🐛 **Reporting** issues and bugs
- 💡 **Suggesting** new features and improvements


---

<div align="center">

*Making early skin cancer detection accessible to everyone*

</div>
