const request = require("request").defaults();
const os = require("os");
const fs = require("fs");
const hostName = os.hostname();

const KeyApi = "Qc76OXcZpe99-mIurz68Vfbz503zFOLG0QrrrTKL";
const Email = "luizfcunhaalves@gmail.com";
var zone_identifier = "a8dcd760d16113352ec6c850d3a3ea8c";
var dkim;
(async function () {
  console.log(hostName);
  dkim = await fs.readFileSync("../dkim_public.txt", "utf8");
  await changeDNS(dkim);
  console.log("DNS ATUALIZADO");
})();

function changeDNS(dkim) {
  return new Promise(async (resolve, reject) => {
    var curl01 = await __curl({
      url: `https://api.cloudflare.com/client/v4/zones/${zone_identifier}/dns_records`,
      method: "POST",
      timeout: 20000,
      headers: {
        Authorization: "Bearer " + KeyApi,
        "Content-Type": "application/json",
        "X-Auth-Email": Email,
      },
      json: {
        type: "TXT",
        name: hostName.split(".")[0] + "._domainkey." + hostName.split(".")[0],
        content: "v=DKIM1; k=rsa; p=" + dkim,
        ttl: 1,
        priority: 10,
        proxied: false,
      },
    });
    curl01 = curl01.body;
    var json01 = curl01;
    console.log(hostName.split(".")[0], "Sucesso?", json01.success);

    resolve();
  });
}

function __curl($options) {
  return new Promise((resolve, reject) => {
    request($options, (err, res, body) => {
      resolve({ err: err, res: res, body: body });
    });
  });
}
