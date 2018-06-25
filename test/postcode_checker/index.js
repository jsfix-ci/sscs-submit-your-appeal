// this is to simulate the upload evidence api. It's not part of the main app.

const express = require('express');
const http = require('http');

const app = express();

/* eslint-disable no-console */

app.set('port', 3011);
app.get('/postcodes/:postcode', (req, res) => {
  const postcode = req.params.postcode;
  console.log(`postcode request for ${postcode}`);

  const cannedRes = {
    'EH8 8DX': {
      country: {
        gss_code: 'E92000001',
        name: 'Scotland'
      },
      local_authority: {
        name: 'Westminster',
        gss_code: 'E09000033'
      },
      centre: {
        type: 'Point',
        coordinates: [
          -0.141587558526369,
          51.50100893654096
        ]
      }
    },
    default: {
      country: {
        gss_code: 'E92000001',
        name: 'England'
      },
      local_authority: {
        name: 'Westminster',
        gss_code: 'E09000033'
      },
      centre: {
        type: 'Point',
        coordinates: [
          -0.141587558526369,
          51.50100893654096
        ]
      }
    }
  };
  const resJson = (postcode in cannedRes) ? cannedRes[postcode] : cannedRes.default;

  res.send(JSON.stringify(resJson));
});

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`);
});

/* eslint-enable no-console */
