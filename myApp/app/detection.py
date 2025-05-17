import cv2
import numpy as np
from ultralytics import YOLO

image_path = "Images/image1.jpg"
img = cv2.imread(image_path)
height, width, _ = img.shape

model = YOLO("yolov8m.pt")

results = model(img)
detections = results[0].boxes.data.cpu().numpy()  # (x1, y1, x2, y2, conf, class)

# Extract bounding boxes and ignore tables
object_boxes = []
classNames = model.names

for box in detections:
    x1, y1, x2, y2, conf, cls = box
    class_name = classNames[int(cls)]

    if class_name == "diningtable" or class_name == "table":
        continue

    object_boxes.append((int(x1), int(y1), int(x2), int(y2)))
    cv2.rectangle(img, (int(x1), int(y1)), (int(x2), int(y2)), (0, 0, 255), 2)


grid_size = 100
potential_zones = []

for y in range(0, height - grid_size, grid_size):
    for x in range(0, width - grid_size, grid_size):
        zone = (x, y, x + grid_size, y + grid_size)
        potential_zones.append(zone)

# Check intersection
def intersects(a, b):
    ax1, ay1, ax2, ay2 = a
    bx1, by1, bx2, by2 = b
    return not (ax2 < bx1 or ax1 > bx2 or ay2 < by1 or ay1 > by2)

# Find empty zones
empty_zones = []
for zone in potential_zones:
    is_empty = True
    for obj in object_boxes:
        if intersects(zone, obj):
            is_empty = False
            break
    if is_empty:
        empty_zones.append(zone)

# Draw empty zones (green)
for zx1, zy1, zx2, zy2 in empty_zones:
    cv2.rectangle(img, (zx1, zy1), (zx2, zy2), (0, 255, 0), 2)

resized_img = cv2.resize(img, (1280, 720))
cv2.imshow("Resized Image", resized_img)

cv2.waitKey(0)
cv2.destroyAllWindows()