const {bot} = require('./clients');
const {createCanvas, loadImage} = require("canvas");

const getRandomCoord = (range) => Math.round(Math.random() * range);

const processImg = async (link, width, height) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const img = await loadImage(link);

  ctx.drawImage(img, 0, 0, img.width, img.height);
  ctx.font = '80px HelveticaNeue';
  ctx.fillStyle = '#c62928';
  ctx.fillText('💋', getRandomCoord(width - 80), getRandomCoord(height - 80));

  return canvas.toBuffer();
}


const loveHandler = async (ctx) => {
  const userId = ctx.message.from.id;

  try {
    const {photos: [[_, photo]]} = await telegram.getUserProfilePhotos(userId, 0 , 1);
    const {width, height, file_id} = photo;
    const link = await telegram.getFileLink(file_id);
    const modifiedAvatar = await processImg(link, width, height);

    ctx.replyWithPhoto({source: modifiedAvatar});
  } catch (e) {
    ctx.reply('Лох');
  }
}

module.exports = {
  loveHandler
};