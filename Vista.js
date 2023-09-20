var objc = JSON.parse($response.body);

    objc = {
  "status": 1,
  "number": 0,
  "msg": "success",
  "posterList": [
    {
      "status": 1,
      "id": 6,
      "title": "                                                                ",
      "imgUrl": "https://raw.githubusercontent.com/Yu9191/-/main/A559C8EF-B4C6-4A94-8488-3D0BF36A6673.jpeg",
      "imgPath": "https://raw.githubusercontent.com/Yu9191/-/main/A559C8EF-B4C6-4A94-8488-3D0BF36A6673.jpeg",
      "position": 0
    }
  ],
  "inviteUrl": "https:\/\/ktx.cn\/webshare\/?a=1#\/inviteBuyList?redirectType=inviteBuyList&parentid=708628"
}

$done({body : JSON.stringify(objc)});
