/*
用药助手13.15
脚本作者：@ios151 
特别说明：CK且用且珍惜,<临床指南→指南专题>没有100%解锁.如需解锁完整版单独使用yyzsck.js版
免责声明：仅供学习 请勿传播，请勿在闲鱼售卖
更新时间: 2023.9.10.23.26

[rewrite_local]
#纯会员数据共享(单独使用的话放本地)
^https://newdrugs.dxy.cn url script-request-header https://raw.githubusercontent.com/Yu9191/Script/main/yyzsck.js
#修改个人用户信息
^https://newdrugs.dxy.cn url script-response-body https://raw.githubusercontent.com/Yu9191/Script/main/yyzs2.js
#pdf获取 测试远程不行 放本地用吧
#^https:\/\/file1\.dxycdn\.com\/ url script-response-body https://raw.githubusercontent.com/Yu9191/Rewrite/main/pdf-url.js

[mitm]
hostname = newdrugs.dxy.cn, file1.dxycdn.com

*/
const newHeaders = {
  'Host': 'newdrugs.dxy.cn',
  'Cookie': 'CASTGC=TGT-19038-EIV0xzdoCmcRBfKTZx7nxl3IJ3pKVWKgsD6-50; app-username=dxy_82r4dr55; JSESSIONID=0557B59A6079A8B782D9FA7C03022F70; _ga_LTBPLJJK75=GS1.1.1694358437.1.1.1694358477.0.0.0; _ga=GA1.1.1023557386.1694358438; CLASS_CASTGC=aa0b073a240299ed03f950100b9835bbaad2d6510d3934a65bfbddc787022c130b2f79abd52b6bfcc2becbc82c2fb2985290b7bc11d2cb9368a21b126c35f6cb64e8157fd5842243de8ec62c1bd14b5dee0535035fa593c2289feb5d61a589405283df3af04aecb2bdccada15fa4e8a82014d80f99780a4d02cb7bead317dd62b64278b667c1aa336fcbca1b0044871e13e80edbc9f8ef228bc8e8fe41370f26b503af2de60c4190a4e0dffa241fcbba49f22ee81cb550f12fd08f8b1720beb8ba376fc9a33b804b313ebfdfd11e31a8a5fe251965d40a1a406f850a368a27ad52082d1daf4f199ed6c0b909607226ac4bc2f104d3512bf60ccf346de9195bee; JUTE_BBS_DATA=7e6902d1d51e6cd1316e7b37a96e32ce4cc89d061d4b56ab922218e52484981e6acecc7e7d6bee264e1497023d96df102f188ff0ca9399c85ef1b97edde76c991429820d5dd195ec3d463c809bc30fd1; JUTE_SESSION_ID=677e7201-0f9e-4ec6-bd6a-de533b31c7e9'，
  'app-sandbox': '0',
  'Accept': '*/*',
  'app-version': '13.15',
  'app-os': '15.1.1',
  'app-username': 'dxy_82r4dr55',
  'app-mc': '8A8DA63419E74D65B3BF66DDA5B44FA412345678udidfor7',
  'app-mt': 'iPhone_iOS15.1.1',
  'Accept-Encoding': 'br;q=1.0, gzip;q=0.9, deflate;q=0.8',
  'app-hard-name': 'iPhone',
  'Referer': 'https://newdrugs.dxy.cn',
  'User-Agent': 'drugspro/13.15 (cn.dxy.drugspro; build:1292; iOS 15.1.1) Alamofire/5.6.4',
  'Accept-Language': 'zh-Hans-CN;q=1.0, en-CN;q=0.9, zh-Hant-HK;q=0.8',
  'Connection': 'keep-alive',
  'app-ac': '4124c5f1-1029-4fda-b06f-a87ac5ad8d9f',
  'DXY-AUTH-TOKEN': 'TGT-19038-EIV0xzdoCmcRBfKTZx7nxl3IJ3pKVWKgsD6-50',
  'app-os-version': '15.1.1'
};

const requestHeaders = $request.headers;
Object.assign(requestHeaders, newHeaders);
//console.log(JSON.stringify(requestHeaders));

$done({ headers: requestHeaders });
