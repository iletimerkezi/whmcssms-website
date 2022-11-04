export async function onRequestPost({request}) {

  let form        = await request.json()
  const signupRsp = await createAccount(form)

  if(signupRsp.status === 500) {
    return errorRsp(['Please try later.'])
  }

  let signup = await signupRsp.json()
  let errors = parseSignupResponse(signup);

  if(errors.length > 0) {
    return errorRsp(errors)
  }

  let isEmailValid = form.email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );

  if(! isEmailValid) {
    return errorRsp(['Please enter valid email address.'])
  }

  const emailRsp = await sendEmail(form)
  if(! emailRsp.ok) {
    return errorRsp(['Please try again, we could not send the email to your email address.'])
  }

  return new Response(JSON.stringify({
    success: true,
  }), {
    status: 200,
    headers: {
      "content-type": "application/json"
    },
  })
}

function parseSignupResponse(response) {
  let falseFlag      = "Already member, if you forget password, try to recover."
  let errorContainer = [];

  for(const err in response.data?.error) {
    if(err.includes('is_')) {
      continue
    }

    if(response.data?.error[err] === falseFlag) {
      continue
    }

    errorContainer.push(response.data.error[err]);
  }

  return errorContainer
}

function errorRsp(errors) {
  return new Response(JSON.stringify({
    success: false,
    errNo: 422,
    errors: errors
  }), {
    status: 422,
    header: {
      "content-type": "application/json"
    }
  })
}

async function createAccount(form) {

  return fetch('https://app.ilet.io/api/panel/signup', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      aggrement: true,
      gsm: form.gsm,
      name_surname: form.name_surname,
      password: form.password,
      ref: "whmcssms.com",
      type:	"kurumsal"
    })
  })
}

async function sendEmail(form) {

  let trContent = `
    Merhaba,
    <br />
    <br />
    Eklentiyi indirmek için <a href="https://www.whmcssms.com/whmcs8.zip">tıklayınız</a>.
    <br />
    <br />
    <ul>
      <li>İndirdiğiniz zip dosyasını açın, </li>
      <li>FTP ile sitenizin dosyalarınızın bulunduğu sunucuya bağlanın, </li>
      <li>Zipini açtığınız dosyanın içindeki dosyaları, sunucunuzda "modules/addons/" klasörü altına yükleyin.</li>
      <li>Yönetim panelinizde, Menu-> Sistem Ayarları -> Uygulamalar & Entegrasyon -> Eklentiler sayfasına gidin ve İletimerkezi Sms eklentisini aktifleştirin.</li>
      <li>Kaydettikten sonra, aynı sayfada admin gruplarına yetki vermeyi unutmayın.</li>
      <li>Menu->Eklentiler->İletimerkezi Sms Eklentinin sayfasına gidin.</li>
      <li>Eklenti ayarlar sayfasında üye olurken kullandığınız gsm numarası, şifre ve başlık bilgilerinizi yazarak sistemi kullanmaya başlayabilirsiniz.</li>
    </ul>
    <br />
    <br />
    Kurulum aşamasında herhangi bir problem yaşarsanız, bizimle <b>0212-543-4210</b> veya
    <b>
      <a href="mailto:destek@emarka.com.tr">
        destek@emarka.com.tr
      </a>
    </b> iletişime geçebilirsiniz.
  `

  let enContent = `
    Hi,
    <br />
    <br />
    <a href="https://www.whmcssms.com/whmcs8.zip">Click</a> to download the plugin.
    <br />
    <br />
    <ul>
      <li>Open the zip file you downloaded,</li>
      <li>Connect to the server where your site's files are located with FTP,</li>
      <li>Upload the files in the file you unzipped under the "modules/addons/" folder on your server.</li>
      <li>In your administration panel, go to Menu -> System Settings -> Apps & Integrations -> Addon Modules and activate the İletimerkezi SMS addon.</li>
      <li>After saving, don't forget to authorize admin groups on the same page.</li>
      <li>Go to Menu -> Addons -> İletimerkezi SMS Plugin's page.</li>
      <li>You can start using the system by typing the gsm number, password and title information you used while registering on the plugin settings page.</li>
    </ul>
    <br />
    <br />
    If you have any problems during installation, contact us at <b>0212-543-4210</b> or
    <b>
      <a href="mailto:destek@emarka.com.tr">
        destek@emarka.com.tr
      </a>
    </b> you can contact us.
  `

  return fetch(new Request('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: [{ email: form.email, name: form.name_surname }],
          },
        ],
        from: {
          email: 'no-reply@whmcssms.com',
          name: 'WHMCS SMS',
        },
        subject: 'WHMCS SMS Addon Setup Information',
        content: [
          {
            type: 'text/html',
            value: form.lang === 'tr' ? trContent : enContent,
          },
        ],
      }),
  }))
}