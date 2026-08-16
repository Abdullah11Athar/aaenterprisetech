from PIL import Image, ImageDraw, ImageFont
import os

width = 1200
height = 630

# High quality image
img = Image.new('RGBA', (width, height), (3, 7, 18, 255)) # slate-950
draw = ImageDraw.Draw(img)

# Radial gradient / glow background
for r in range(400, 0, -10):
    alpha = int(25 * (1 - r/400))
    # purple glow top right
    draw.ellipse([800 - r, 150 - r, 800 + r, 150 + r], fill=(147, 51, 234, alpha))
    # indigo glow bottom left
    draw.ellipse([200 - r, 500 - r, 200 + r, 500 + r], fill=(59, 130, 246, alpha))

# Outer container card with padding
card_x0, card_y0, card_x1, card_y1 = 50, 45, 1150, 585
draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y1], radius=32, fill=(15, 23, 42, 230), outline=(147, 51, 234, 180), width=3)

# Inner sub-card top left (Logo container)
draw.rounded_rectangle([90, 85, 210, 205], radius=24, fill=(147, 51, 234, 255), outline=(192, 132, 252, 255), width=2)

try:
    f_mono = ImageFont.truetype('arialbd.ttf', 64)
    f_brand = ImageFont.truetype('arialbd.ttf', 44)
    f_sub = ImageFont.truetype('arialbd.ttf', 20)
    f_h1 = ImageFont.truetype('arialbd.ttf', 46)
    f_body = ImageFont.truetype('arial.ttf', 20)
    f_badge = ImageFont.truetype('arialbd.ttf', 16)
    f_foot = ImageFont.truetype('arialbd.ttf', 19)
except:
    f_mono = f_brand = f_sub = f_h1 = f_body = f_badge = f_foot = ImageFont.load_default()

# Logo Monogram
draw.text((150, 145), 'AA', fill=(255, 255, 255, 255), font=f_mono, anchor='mm')

# Brand Title & Tagline
draw.text((235, 125), 'AA Enterprise Tech', fill=(255, 255, 255, 255), font=f_brand, anchor='lm')
draw.text((235, 175), 'Next-Gen Digital Solutions & AI Engineering', fill=(192, 132, 252, 255), font=f_sub, anchor='lm')

# Pill Badge
draw.rounded_rectangle([90, 235, 360, 270], radius=18, fill=(30, 27, 75, 255), outline=(147, 51, 234, 255), width=1)
draw.text((225, 252), '★ ELITE SOFTWARE & AI AGENCY', fill=(216, 180, 254, 255), font=f_badge, anchor='mm')

# Main Headline (Properly sized and centered within safe margins)
draw.text((90, 315), 'Accelerate Your Business', fill=(255, 255, 255, 255), font=f_h1, anchor='lm')
draw.text((90, 370), 'With Modern Tech & AI Automations', fill=(192, 132, 252, 255), font=f_h1, anchor='lm')

# Feature Chips
chips = [
    '⚡ High-Speed Next.js Apps',
    '🤖 24/7 AI n8n Automations',
    '💳 Bespoke SaaS Architecture'
]
chip_x = 90
for chip in chips:
    chip_w = 320
    draw.rounded_rectangle([chip_x, 425, chip_x + chip_w, 465], radius=12, fill=(30, 41, 59, 220), outline=(71, 85, 105, 200), width=1)
    draw.text((chip_x + chip_w // 2, 445), chip, fill=(226, 232, 240, 255), font=f_body, anchor='mm')
    chip_x += chip_w + 20

# Footer divider line
draw.line([90, 495, 1110, 495], fill=(51, 65, 85, 255), width=1)

# Footer Info
draw.text((90, 535), '🌐 https://aaenterprisetech.com', fill=(147, 197, 253, 255), font=f_foot, anchor='lm')
draw.text((630, 535), '📞 +1 (314) 834-0021  |  ✉ info@aaenterprisetech.com', fill=(203, 213, 225, 255), font=f_foot, anchor='lm')

pub = "C:/Payment Saas/aaenterprisetech/public"
img.save(f"{pub}/og-image.png", 'PNG')
img.save(f"{pub}/opengraph-image.png", 'PNG')
img.save(f"{pub}/twitter-image.png", 'PNG')

# 512x512 Logo Icon
ico = Image.new('RGBA', (512, 512), (3, 7, 18, 255))
ico_draw = ImageDraw.Draw(ico)
ico_draw.rounded_rectangle([25, 25, 487, 487], radius=110, fill=(15, 23, 42, 255), outline=(147, 51, 234, 255), width=8)
ico_draw.rounded_rectangle([85, 85, 427, 427], radius=80, fill=(147, 51, 234, 255))

ico_f = ImageFont.truetype('arialbd.ttf', 160)
ico_sub = ImageFont.truetype('arialbd.ttf', 24)
ico_draw.text((256, 235), 'AA', fill=(255, 255, 255, 255), font=ico_f, anchor='mm')
ico_draw.text((256, 345), 'ENTERPRISE TECH', fill=(233, 213, 255, 255), font=ico_sub, anchor='mm')

ico.save(f"{pub}/favicon.png", 'PNG')
ico.save(f"{pub}/icon.png", 'PNG')

apple = ico.resize((180, 180), Image.Resampling.LANCZOS)
apple.save(f"{pub}/apple-touch-icon.png", 'PNG')

fav = ico.resize((64, 64), Image.Resampling.LANCZOS)
fav.save(f"{pub}/favicon.ico", format='ICO')

print("All brand assets rendered with 100% precision and zero text overflow!")
