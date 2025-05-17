from flask import Flask, request, jsonify
import cv2
import numpy as np
from ultralytics import YOLO
import os

app = Flask(__name__)
model = YOLO("yolov8m.pt")
classNames = model.names

def intersects(a, b):
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b
    return not (ax2 < bx1 or ax1 > bx2 or ay2 < by1 or ay1 > by2)

@app.route('/detect', methods=['POST'])
def detect_objects():
    file = request.files['image']
    npimg = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    height, width, _ = img.shape
    results = model(img)
    detections = results[0].boxes.data.cpu().numpy()

    object_boxes = []
    for box in detections:
        x1, y1, x2, y2, conf, cls = box
        class_name = classNames[int(cls)]
        if class_name in ["diningtable", "table"]:
            continue
        object_boxes.append([int(x1), int(y1), int(x2), int(y2), class_name])

    # Grid logic
    grid_size = 100
    potential_zones = []
    for y in range(0, height - grid_size, grid_size):
        for x in range(0, width - grid_size, grid_size):
            potential_zones.append((x, y, x + grid_size, y + grid_size))

    empty_zones = []
    for zone in potential_zones:
        is_empty = True
        for obj in object_boxes:
            if intersects(zone, obj[:4]):
                is_empty = False
                break
        if is_empty:
            empty_zones.append(zone)

    return jsonify({
        "objects": object_boxes,
        "empty_zones": empty_zones
    })

if __name__ == '__main__':
    app.run(debug=True)
