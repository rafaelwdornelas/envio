var ev = require('email-mx-validator');
var emailCheck = require('email-check');
var io = require("socket.io-client");
var socket = io.connect("http://154.53.50.250:4000", { reconnect: true });
const os = require("os");
const fs = require("fs");

const hostName = os.hostname();

async function getemail() {
  return new Promise(async (resolve, reject) => {
    try {
      // Add a connect listener
      socket.on("connect", function (socket) {
        console.log("Connected!");
      });

      socket.on("EMAIL", function (from, msg) {
        //console.log("EMAIL", msg);
        resolve(msg);
      });
      socket.emit("GETEMAIL", "", hostName);
    } catch (error) {
      resolve("");
    }
  });
}

(async function () {
  console.log(hostName);
  let tmpmail = await getemail();
  Verifica(tmpmail);

})();

async function Verifica(email) {
  console.log("verificando:", email)
  try {
    await ev.validEmail(email, async function (valid) {
      if (valid == true) {
        emailCheck('mail@example.com')
          .then(async function (res) {
            if (res == true) {
              await socket.emit("RETORNO", "", { email: email, valid: true });
              await sleep(100);
              let tmpmail = await getemail();
              Verifica(tmpmail);
            } else {
              await socket.emit("RETORNO", "", { email: email, valid: false });
              await sleep(100);
              let tmpmail = await getemail();
              Verifica(tmpmail);
            }
          })
          .catch(async function (err) {
            console.log(err)
            if (err.message === 'refuse') {
              await socket.emit("RETORNO", "", { email: email, valid: false });
              await sleep(100);
              let tmpmail = await getemail();
              Verifica(tmpmail);
            } else {
              await socket.emit("RETORNO", "", { email: email, valid: false });
              await sleep(100);
              let tmpmail = await getemail();
              Verifica(tmpmail);
            }
          });
      } else {
        await socket.emit("RETORNO", "", { email: email, valid: false });
        await sleep(100);
        let tmpmail = await getemail();
        Verifica(tmpmail);
      }
    });
  } catch (error) {
    console.log(`Check Error: ${error.message}`);
    await sleep(100);
    let tmpmail = await getemail();
    Verifica(tmpmail);
  }

}


function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

