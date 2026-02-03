// 카카오톡 등 SNS 미리보기용 이미지 생성 (1200x630)
// position: 'top' 으로 상단(NEXO 텍스트) 유지, 하단만 크롭
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const W = 1200;
const H = 630;

async function main() {
  const inputPath = join(__dirname, '../public/hero-main.png');
  const outputPath = join(__dirname, '../public/og-share.png');

  await sharp(inputPath)
    .resize(W, H, {
      fit: 'cover',
      position: 'top', // 상단 고정 → NEXO 텍스트 보존, 하단만 잘림
    })
    .png()
    .toFile(outputPath);

  console.log('✅ public/og-share.png 생성 완료 (1200x630, 상단 정렬)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
