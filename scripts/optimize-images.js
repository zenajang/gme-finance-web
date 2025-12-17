const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const QUALITY = 80;
const MAX_WIDTH = 1920;

const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg'];
const SKIP_PATTERNS = ['_original', '_backup'];

let totalSaved = 0;
let processedCount = 0;
let skippedCount = 0;

async function getImageFiles(dir, files = []) {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await getImageFiles(fullPath, files);
    } else {
      const ext = path.extname(item).toLowerCase();
      const shouldSkip = SKIP_PATTERNS.some(p => item.includes(p));

      if (IMAGE_EXTENSIONS.includes(ext) && !shouldSkip) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const fileName = path.basename(filePath);
  const dirName = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);
  const outputPath = path.join(dirName, `${baseName}.webp`);

  // 이미 WebP 버전이 있으면 스킵
  if (fs.existsSync(outputPath)) {
    console.log(`⏭️  Skip: ${fileName} (WebP exists)`);
    skippedCount++;
    return;
  }

  try {
    const originalSize = fs.statSync(filePath).size;
    const image = sharp(filePath);
    const metadata = await image.metadata();

    let pipeline = image;

    // 이미지가 MAX_WIDTH보다 크면 리사이즈
    if (metadata.width && metadata.width > MAX_WIDTH) {
      pipeline = pipeline.resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    // WebP로 변환
    await pipeline
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const savedBytes = originalSize - newSize;
    const savedPercent = ((savedBytes / originalSize) * 100).toFixed(1);

    totalSaved += savedBytes;
    processedCount++;

    const originalKB = (originalSize / 1024).toFixed(1);
    const newKB = (newSize / 1024).toFixed(1);

    console.log(`✅ ${fileName} → ${baseName}.webp`);
    console.log(`   ${originalKB}KB → ${newKB}KB (${savedPercent}% 감소)`);

  } catch (error) {
    console.error(`❌ Error: ${fileName}`, error.message);
  }
}

async function optimizeExistingWebp() {
  console.log('\n🔄 기존 WebP 파일 재압축...\n');

  const webpFiles = [];

  async function findWebp(dir) {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        await findWebp(fullPath);
      } else if (item.endsWith('.webp') && stat.size > 200 * 1024) {
        // 200KB 이상인 WebP만 재압축
        webpFiles.push(fullPath);
      }
    }
  }

  await findWebp(IMAGES_DIR);

  for (const filePath of webpFiles) {
    const fileName = path.basename(filePath);
    const originalSize = fs.statSync(filePath).size;

    try {
      const tempPath = filePath + '.tmp';

      await sharp(filePath)
        .webp({ quality: QUALITY })
        .toFile(tempPath);

      const newSize = fs.statSync(tempPath).size;

      if (newSize < originalSize) {
        fs.unlinkSync(filePath);
        fs.renameSync(tempPath, filePath);

        const savedPercent = (((originalSize - newSize) / originalSize) * 100).toFixed(1);
        totalSaved += (originalSize - newSize);
        processedCount++;

        console.log(`✅ ${fileName}: ${(originalSize/1024).toFixed(1)}KB → ${(newSize/1024).toFixed(1)}KB (${savedPercent}% 감소)`);
      } else {
        fs.unlinkSync(tempPath);
        console.log(`⏭️  ${fileName}: 이미 최적화됨`);
        skippedCount++;
      }
    } catch (error) {
      console.error(`❌ ${fileName}:`, error.message);
    }
  }
}

async function main() {
  console.log('🖼️  이미지 최적화 시작\n');
  console.log(`📁 폴더: ${IMAGES_DIR}`);
  console.log(`📐 최대 너비: ${MAX_WIDTH}px`);
  console.log(`🎨 품질: ${QUALITY}\n`);

  // PNG, JPG → WebP 변환
  console.log('📷 PNG/JPG → WebP 변환...\n');
  const files = await getImageFiles(IMAGES_DIR);

  for (const file of files) {
    await optimizeImage(file);
  }

  // 기존 WebP 재압축
  await optimizeExistingWebp();

  // 결과 출력
  console.log('\n' + '='.repeat(50));
  console.log('📊 결과');
  console.log('='.repeat(50));
  console.log(`✅ 처리됨: ${processedCount}개`);
  console.log(`⏭️  스킵됨: ${skippedCount}개`);
  console.log(`💾 총 절감: ${(totalSaved / 1024 / 1024).toFixed(2)}MB`);
  console.log('='.repeat(50));
}

main().catch(console.error);
