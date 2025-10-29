import io
import cv2
import base64
import numpy as np
from ultralytics import YOLO
from fastapi.responses import HTMLResponse
from PIL import Image, ImageDraw, ImageFont
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi import FastAPI, File, UploadFile, Request

app = FastAPI()

# Mount static files and templates
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

model = YOLO("output/best.pt")

@app.post("/detect/")
async def detect_objects(file: UploadFile):
    # Read and decode image
    image_bytes = await file.read()
    image = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)
    # Convert BGR to RGB for PIL
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(image_rgb)
    # Perform detection
    # Force CPU for lower memory and portability inside slim image
    results = model.predict(image, device="cpu")

    detections = []
    
    # Draw bounding boxes on the image
    draw = ImageDraw.Draw(pil_image)
    
    for box in results[0].boxes:  # YOLOv8 returns a list of Results objects
        x1, y1, x2, y2 = box.xyxy[0].tolist()  # Convert tensors to lists
        conf = float(box.conf[0])
        cls = int(box.cls[0])
        label = results[0].names[cls]

        # Draw bounding box
        draw.rectangle([x1, y1, x2, y2], outline="red", width=3)
        
        # Draw label
        text = f"{label}: {conf:.2f}"
        draw.text((x1, y1-20), text, fill="red")

        detections.append({
            "class": label,
            "confidence": conf,
            "box": [x1, y1, x2, y2]
        })
    
    # Convert PIL image to base64 for display
    buffer = io.BytesIO()
    pil_image.save(buffer, format='JPEG')
    img_str = base64.b64encode(buffer.getvalue()).decode()
    
    return {
        "detections": detections,
        "image": f"data:image/jpeg;base64,{img_str}",
        "total_objects": len(detections)
    }