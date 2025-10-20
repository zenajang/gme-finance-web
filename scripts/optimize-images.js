const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public', 'images');

// 최적화할 이미지 패턴
const patterns = [
  '**/background.jpg',
  '**/background.png',
  '**/loan_detail_bg.jpg',
  '**/loan_detail_bg.png',
];

// 이미지 파일 찾기
async function findImages(dir) {
  const images = [];

  function scanDir(currentDir) {
    const items = fs.readdirSync(currentDir);

    items.forEach(item => {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath);
      } else if (
        (item === 'background.jpg' || item === 'background.png' ||
         item === 'loan_detail_bg.jpg' || item === 'loan_detail_bg.png') &&
        !item.includes('.webp')
      ) {
        images.push(fullPath);
      }
    });
  }

  scanDir(dir);
  return images;
}

// 이미지 최적화
async function optimizeImage(imagePath) {
  const ext = path.extname(imagePath);
  const baseName = path.basename(imagePath, ext);
  const dirName = path.dirname(imagePath);
  const outputPath = path.join(dirName, `${baseName}.webp`);

  // 이미 WebP 버전이 있으면 스킵
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skipped (already exists): ${path.relative(publicDir, imagePath)}`);
    return;
  }

  try {
    const originalSize = fs.statSync(imagePath).size;

    await sharp(imagePath)
      .webp({ quality: 85 })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

    console.log(`✅ Optimized: ${path.relative(publicDir, imagePath)}`);
    console.log(`   ${(originalSize / 1024 / 1024).toFixed(2)}MB → ${(newSize / 1024 / 1024).toFixed(2)}MB (${savings}% reduction)`);
  } catch (error) {
    console.error(`❌ Failed to optimize ${imagePath}:`, error.message);
  }
}

// 메인 실행
async function main() {
  console.log('🔍 Scanning for images...\n');

  const images = await findImages(publicDir);

  if (images.length === 0) {
    console.log('No images found to optimize.');
    return;
  }

  console.log(`Found ${images.length} images to optimize\n`);

  for (const imagePath of images) {
    await optimizeImage(imagePath);
  }

  console.log('\n✨ Optimization complete!');
  console.log('\n📝 Next steps:');
  console.log('1. Update image references in your code to use .webp versions');
  console.log('2. Or keep both versions and let Next.js choose the best format');
}

main().catch(console.error);
