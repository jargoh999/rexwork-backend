// import fs from 'fs';
// import fetch from 'node-fetch';
// import FormData from 'form-data';

//   it('should upload an image successfully', async () => {
//     const formData = new FormData();
//     const filePath = 'C:\\Users\\DELL\\Pictures\\Camera Roll\\WIN_20231115_19_58_58_Pro.jpg';
//     formData.append('file', fs.createReadStream(filePath));

//     const response = await fetch('https://file-upload-as-a-service.onrender.com/api/upload', {
//       method: 'POST',
//       body: formData,
//     });
//     console.log('Upload Result:', response);
//     const result = await response.json();
//     console.log('Upload Result:', result);
    
//     // Add assertions based on expected response structure
//     expect(response.status).toBe(200);
//     expect(result).toHaveProperty('url', expect.any(String)); 
//     // Add more assertions as needed
//   }, 100000);
