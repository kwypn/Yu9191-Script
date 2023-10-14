/*

使命闹钟

[rewrite_local]
^https://ars.alar.my/api/v2/user/sync url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/Alarmy.js

[MITM]
hostname = ars.alar.my

*/

var objc = JSON.parse($response.body);

    objc = {
  "env": "PROD",
  "userID": "7AF5862C-7649-472E-AAAC-8D7965B5877A",
  "subscription": [
    {
      "expiresDateMs": 4669109147000,
      "periodType": "TRIAL",
      "latestPurchaseDateMs": 1668504347000,
      "originalPurchaseDateMs": 1668504348000,
      "originalTransactionID": "550001242190807",
      "productID": "droom.sleepIfUCanFree.premium.yearly01.4",
      "willAutoRenew": false,
      "isActive": true
    }
  ],
  "syncDateMs": 1697273328311
}

$done({body : JSON.stringify(objc)});
