from PIL import Image
import os
from pathlib import Path

def compress_image(input_path, output_path, quality=75):
    try:
        img = Image.open(input_path)
        
        # Convert RGBA to RGB if needed
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        
        # Save with compression
        img.save(output_path, 'JPEG', quality=quality, optimize=True)
        
        # Get file sizes
        original_size = os.path.getsize(input_path) / (1024 * 1024)
        compressed_size = os.path.getsize(output_path) / (1024 * 1024)
        
        print(f"✓ {os.path.basename(input_path)}: {original_size:.2f}MB → {compressed_size:.2f}MB")
        
    except Exception as e:
        print(f"✗ Error with {input_path}: {e}")

# Create output directory structure
source_dir = Path("صور شركات")
output_dir = Path("صور شركات")

# Compress all images
for img_path in source_dir.rglob("*.jpg"):
    output_path = output_dir / img_path.relative_to(source_dir)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    compress_image(str(img_path), str(output_path), quality=75)

for img_path in source_dir.rglob("*.jpeg"):
    output_path = output_dir / img_path.relative_to(source_dir)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    compress_image(str(img_path), str(output_path), quality=75)

for img_path in source_dir.rglob("*.png"):
    output_path = output_dir / img_path.relative_to(source_dir)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    compress_image(str(img_path), str(output_path), quality=75)

print("\n✅ Compression complete!")
