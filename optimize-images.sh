#!/bin/bash
# Install optimization tools
echo "Installing image optimization tools..."
pip install -q Pillow

# Python script for image optimization
python3 << 'PYTHON_EOF'
import os
from PIL import Image
import sys

def optimize_image(input_path, output_path, quality=85, max_width=1920):
    """Optimize an image by resizing and compressing"""
    try:
        with Image.open(input_path) as img:
            # Convert RGBA to RGB if necessary
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            
            # Resize if too large
            if img.width > max_width:
                ratio = max_width / img.width
                new_height = int(img.height * ratio)
                img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            
            # Save with optimization
            img.save(output_path, optimize=True, quality=quality)
            
            # Get file sizes
            original_size = os.path.getsize(input_path)
            optimized_size = os.path.getsize(output_path)
            reduction = ((original_size - optimized_size) / original_size) * 100
            
            print(f"✓ {os.path.basename(input_path)}: {original_size//1024}KB → {optimized_size//1024}KB (-{reduction:.1f}%)")
            return True
    except Exception as e:
        print(f"✗ Error optimizing {input_path}: {e}")
        return False

# Target large images
assets_dir = "assets"
large_images = [
    "factory_add_9.jpg",
    "new_factory_1.jpg",
    "about_img.png",
    "portfolio_garment.png",
    "mixboard_2.png",
    "hero_factory.png",
    "solar_system.jpg",
    "csr_activities.jpg",
    "sustainability.png",
    "about_factory_real.jpg",
    "automation_hq_2.jpg",
    "automation_hq_3.jpg",
    "automation_hq_1.jpg",
    "automation_hq_4.jpg",
]

print("Starting image optimization...")
optimized_count = 0

for filename in large_images:
    input_path = os.path.join(assets_dir, filename)
    if os.path.exists(input_path):
        # Create backup
        backup_path = input_path + ".backup"
        if not os.path.exists(backup_path):
            os.rename(input_path, backup_path)
            if optimize_image(backup_path, input_path, quality=85, max_width=1920):
                optimized_count += 1
        else:
            print(f"⊘ Skipped {filename} (backup exists)")

print(f"\nOptimized {optimized_count} images successfully!")
PYTHON_EOF

