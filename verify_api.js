const http = require('http');

async function testApi() {
    console.log('Testing GET /api/waiting-list...');
    const getRes = await new Promise((resolve) => {
        http.get('http://localhost:3000/api/waiting-list', (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });
    });
    console.log('Initial count:', getRes.count);

    console.log('Testing POST /api/waiting-list...');
    const postData = JSON.stringify({
        firstName: 'Test',
        lastName: 'Verification',
        phone: '0000000000',
        motif: 'Verification terminale'
    });

    const postOptions = {
        hostname: 'localhost',
        port: 3000,
        path: '/api/waiting-list',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': postData.length
        }
    };

    const postRes = await new Promise((resolve) => {
        const req = http.request(postOptions, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });
        req.write(postData);
        req.end();
    });
    console.log('Post result:', postRes);

    console.log('Testing GET /api/waiting-list again...');
    const getResAfter = await new Promise((resolve) => {
        http.get('http://localhost:3000/api/waiting-list', (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => resolve(JSON.parse(data)));
        });
    });
    console.log('Count after post:', getResAfter.count);
}

testApi().catch(console.error);
