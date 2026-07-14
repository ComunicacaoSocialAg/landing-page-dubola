import cv2
import numpy as np

# Load original high-quality clean background
bg = cv2.imread('/Users/bruno/Documents/Dubola Alimentos/site/public/hero-final-clean.jpg')
if bg is None:
    print("Error loading background image")
    exit(1)

labels = {
    'goiaba': {
        'path': '/Users/bruno/Documents/Dubola Alimentos/site/public/ketchup-goiaba-label.png',
        'roi_coords': (200, 650, 420, 650)
    },
    'picante': {
        'path': '/Users/bruno/Documents/Dubola Alimentos/site/public/ketchup-picante-label.png',
        'roi_coords': (200, 650, 600, 850)
    },
    'tradicional': {
        'path': '/Users/bruno/Documents/Dubola Alimentos/site/public/ketchup-tradicional-label.png',
        'roi_coords': (200, 650, 260, 480)
    }
}

sift = cv2.SIFT_create()

for name, info in labels.items():
    # Load label with alpha channel
    lbl_rgba = cv2.imread(info['path'], cv2.IMREAD_UNCHANGED)
    if lbl_rgba is None:
        print(f"Failed to load label: {name}")
        continue
    
    # Extract ROI from background
    y1, y2, x1, x2 = info['roi_coords']
    roi = bg[y1:y2, x1:x2].copy()
    roi_gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    
    # SIFT Feature Matching
    lbl_gray = cv2.cvtColor(lbl_rgba[:, :, :3], cv2.COLOR_BGR2GRAY)
    kp1, des1 = sift.detectAndCompute(lbl_gray, None)
    kp2, des2 = sift.detectAndCompute(roi_gray, None)
    
    bf = cv2.BFMatcher()
    matches = bf.knnMatch(des1, des2, k=2)
    good = []
    for m, n in matches:
        if m.distance < 0.75 * n.distance:
            good.append(m)
            
    src_pts = np.float32([kp1[m.queryIdx].pt for m in good]).reshape(-1, 1, 2)
    dst_pts = np.float32([kp2[m.trainIdx].pt for m in good]).reshape(-1, 1, 2)
    
    H, mask = cv2.findHomography(src_pts, dst_pts, cv2.RANSAC, 5.0)
    
    # Warp label image and alpha channel to fit the ROI
    h_roi, w_roi, _ = roi.shape
    warped_rgb = cv2.warpPerspective(lbl_rgba[:, :, :3], H, (w_roi, h_roi))
    warped_alpha = cv2.warpPerspective(lbl_rgba[:, :, 3], H, (w_roi, h_roi))
    
    # Normalize alpha to 0-1
    alpha_mask = warped_alpha.astype(float) / 255.0
    alpha_mask = np.expand_dims(alpha_mask, axis=2)
    
    # Calculate shading from the original ROI
    # We use the grayscale channel of the original bottle label to extract highlights and shadows
    shading_base = roi_gray.astype(float)
    # The average white level of the original label is around 220
    shading = shading_base / 220.0
    # Clip shading to prevent extreme highlights/shadows
    shading = np.clip(shading, 0.4, 1.25)
    shading_3ch = np.stack([shading, shading, shading], axis=2)
    
    # Apply shading to the new label
    shaded_label = warped_rgb.astype(float) * shading_3ch
    shaded_label = np.clip(shaded_label, 0, 255)
    
    # Blend the shaded new label onto the background ROI using the alpha mask
    blended_roi = (shaded_label * alpha_mask) + (roi.astype(float) * (1.0 - alpha_mask))
    blended_roi = np.clip(blended_roi, 0, 255).astype(np.uint8)
    
    # Write back to background
    bg[y1:y2, x1:x2] = blended_roi
    print(f"Applied high-res shaded label to {name} bottle!")

# Save the final high-quality background
cv2.imwrite('/Users/bruno/Documents/Dubola Alimentos/site/public/hero-final-clean.jpg', bg, [int(cv2.IMWRITE_JPEG_QUALITY), 95])
print("Final composite saved to public/hero-final-clean.jpg!")
