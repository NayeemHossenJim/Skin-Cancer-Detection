import cv2
import numpy as np
from fastapi import FastAPI,File, UploadFile
from ultralytics import YOLO

app = FastAPI()

@app.get("/")
async def read_root():
 return {"message": "Hello, World!"}

model = YOLO("C:/Code/Object-Detection/output/best.pt")

@app.post("/detect/")
async def detect_objects(file: UploadFile):
    # Read and decode image
    image_bytes = await file.read()
    image = np.frombuffer(image_bytes, np.uint8)
    image = cv2.imdecode(image, cv2.IMREAD_COLOR)

    # Perform detection
    results = model.predict(image)

    detections = []
    for box in results[0].boxes:  # YOLOv8 returns a list of Results objects
        x1, y1, x2, y2 = box.xyxy[0].tolist()  # Convert tensors to lists
        conf = float(box.conf[0])
        cls = int(box.cls[0])
        label = results[0].names[cls]

        detections.append({
            "class": label,
            "confidence": conf,
            "box": [x1, y1, x2, y2]
        })
    return {"detections": detections}