
import fs from 'fs';
describe('Upload Image Integration Test', () => {
  it('should upload an image to Cloudinary and return the URL', async () => {
    // const filePath = path.join(__dirname, 'sample.jpg');
    const fileBuffer = fs.readFileSync("C:\\Users\\DELL\\Pictures\\Camera Roll\\WIN_20231115_19_58_58_Pro.jpg")
    .toString('base64');
    // const base64Image = fileBuffer.toString('base64');

    const response = await fetch('http://localhost:3000/api/uploadImage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: fileBuffer }),
    });
    const result = await response.json();
    console.log('Upload result:', result);
    expect(response.status).toBe(200);
    expect(result).toHaveProperty('success', true);
    expect(result.result).toHaveProperty('secure_url');
  }, 10000); 
});
