// 카카오톡 등 SNS 미리보기용 이미지 생성 (1200x630)
// 메인 히어로 이미지(main_nexo.png) 기준으로 생성
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const W = 1200;
const H = 630;

async function main() {
  const inputPath = join(__dirname, '../public/main_nexo.png');
  const outputPath = join(__dirname, '../public/og-share.png');

  await sharp(inputPath)
    .resize(W, H, {
      fit: 'cover',
      position: 'top',
    })
    .png()
    .toFile(outputPath);

  console.log('✅ public/og-share.png 생성 완료 (source: main_nexo.png, 1200x630)');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
