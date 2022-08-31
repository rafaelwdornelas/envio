const nodemailer = require("nodemailer");
var randomstring = require("randomstring");
const os = require("os");
const fs = require("fs");

const hostName = os.hostname();
var enviados = 0;
var list;

async function getemails() {
  return new Promise(async (resolve, reject) => {
    let listaemails = [
      "wandersonrosacunha-whateveryouwant@mail-tester.com",
      "rafaelwdornelas@bol.com.br",
      "rafaelwdornelasstl@gmail.com",
    ];
    resolve(listaemails);
  });
}

(async function () {
  console.log(hostName);

  do {
    list = await getemails();
    console.log(list.length);
    if (list.length < 1) {
      await sleep(60000);
    }
  } while (list.length < 1);

  for (let value of list.splice(0, 5)) {
    sendEmail(value);
  }

  total = list.length;
})();

async function sendEmail(email) {
  email = email + "|||";
  let mailarray = email.split("|");
  let INT8 = await randomstring.generate({
    length: 8,
    charset: "numeric",
  });
  let KEY8 = await randomstring.generate(8);

  //captura o html do email
  let html = fs.readFileSync("./html.html", "utf8");
  let dkim = fs.readFileSync("../dkim_private.pem", "utf8");

  html = await Change_HTML(html);
  //%emailcliente%
  html = html.replace(/%emailcliente%/g, mailarray[0]);
  html = html.replace(/%cpf%/g, formataCPF(mailarray[1]));
  html = html.replace(/%nome%/g, mailarray[2].toUpperCase());

  html = html.replace(
    /<\/html>/g,
    '<br><br><br><br><br><br><br><font color="#E6E6E6">t_' +
      randomstring.generate(between(1, 50)) +
      "</font></html>"
  );
  /* 
  //RANDON HTML
  let htmlarry = html.split("\n");
  let novohtml = "";
  htmlarry.forEach(function (item) {
    if (item.includes("<")) {
      novohtml += "\n".repeat(between(50, 250)) + item + "\n";
      item + "\n";
    } else {
      novohtml += item + "\n";
    }
  });

  html = novohtml; */
  //RANDON HTML

  let subject = `Emissão Nota-Fiscal Nr: ${randomstring.generate(9)}`;
  try {
    let transporter = nodemailer.createTransport({
      service: "postfix",
      host: "localhost",
      secure: false,
      port: 25,
      tls: { rejectUnauthorized: false },
      dkim: {
        domainName: hostName,
        keySelector: hostName.split(".")[0],
        privateKey: dkim,
      },
    });

    let fakefile = randomstring.generate(between(10, 250));
    // create a buffer
    const buff = Buffer.from(fakefile, "utf-8");
    // decode buffer as Base64
    const base64 = buff.toString("base64");

    let info = await transporter.sendMail({
      from: '"Faturas" <' + "adm@" + hostName + ">",
      to: mailarray[0],
      subject: subject,
      html: html,
      textEncoding: "base64",
      encoding: "utf-8",
      headers: {
        "X-Ovh-Tracer-Id":
          between(1000, 999999) +
          between(1000, 999999) +
          between(1000, 999999) +
          between(1000, 999999),
        "X-VADE-SPAMSTATE": "clean",
        "X-VADE-SPAMSCORE": "49",
        "X-VADE-SPAMCAUSE": await randomstring.generate(980),
        "X-VR-SPAMSTATE": "ok",
        "X-VR-SPAMSCORE": "-100",
        "X-VR-SPAMCAUSE": await randomstring.generate(154),
        "Return-Path":
          "bounce-id=D" +
          between(100, 200) +
          "=U" +
          between(1000, 10000) +
          hostName +
          between(1000, 999999) +
          between(1000, 999999) +
          between(1000, 999999) +
          "@" +
          hostName,
      },
      /* attachments: [
        {
          filename: "Logo_" + INT8 + KEY8 + ".png",
          content: base64,
          encoding: "base64",
          cid: "uniq-Logo_" + INT8 + KEY8 + ".png",
        },
      ], */
    });
    enviados++;
    if (enviados % 500 === 0) {
      console.log(`Sent: ${hostName} - total enviados: ${enviados}`);
    }
  } catch (error) {
    enviados++;
    console.log(`Sent: Error ${error.message}`);
  }
  if (list.length == 0) {
    console.log(`Envio Finalizado: ${hostName} - total enviados: ${enviados}`);
    process.exit(1);
  }
  if (list.length !== 0) sendEmail(list.shift());
}

async function Change_HTML(html) {
  let KEY15 = await randomstring.generate(15);
  let KEY10 = await randomstring.generate(10);
  let KEY9 = await randomstring.generate(9);
  let KEY8 = await randomstring.generate(8);
  let KEY7 = await randomstring.generate(7);
  let KEY6 = await randomstring.generate(6);
  let KEY5 = await randomstring.generate(5);
  let INT15 = await randomstring.generate({
    length: 15,
    charset: "numeric",
  });
  let INT10 = await randomstring.generate({
    length: 10,
    charset: "numeric",
  });
  let INT9 = await randomstring.generate({
    length: 9,
    charset: "numeric",
  });
  let INT8 = await randomstring.generate({
    length: 8,
    charset: "numeric",
  });
  let INT7 = await randomstring.generate({
    length: 7,
    charset: "numeric",
  });
  let INT6 = await randomstring.generate({
    length: 6,
    charset: "numeric",
  });
  let INT5 = await randomstring.generate({
    length: 5,
    charset: "numeric",
  });
  let INT4 = await randomstring.generate({
    length: 4,
    charset: "numeric",
  });
  let INT3 = await randomstring.generate({
    length: 3,
    charset: "numeric",
  });
  let INT2 = await randomstring.generate({
    length: 2,
    charset: "numeric",
  });
  let INT1 = await randomstring.generate({
    length: 2,
    charset: "numeric",
  });

  html = html.replace(/%R15%/g, KEY15);
  html = html.replace(/%R10%/g, KEY10);
  html = html.replace(/%R9%/g, KEY9);
  html = html.replace(/%R8%/g, KEY8);
  html = html.replace(/%R7%/g, KEY7);
  html = html.replace(/%R6%/g, KEY6);
  html = html.replace(/%R5%/g, KEY5);
  html = html.replace(/%RND15%/g, INT15);
  html = html.replace(/%RND10%/g, INT10);
  html = html.replace(/%RND9%/g, INT9);
  html = html.replace(/%RND8%/g, INT8);
  html = html.replace(/%RND7%/g, INT7);
  html = html.replace(/%RND6%/g, INT6);
  html = html.replace(/%RND5%/g, INT5);
  html = html.replace(/%RND4%/g, INT4);
  html = html.replace(/%RND3%/g, INT3);
  html = html.replace(/%RND2%/g, INT2);
  html = html.replace(/%RND1%/g, INT1);

  return html;
}
function between(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function formataCPF(cpf) {
  //retira os caracteres indesejados...
  cpf = cpf.replace(/[^\d]/g, "");

  //realizar a formatação...
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}