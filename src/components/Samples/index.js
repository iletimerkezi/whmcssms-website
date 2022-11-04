import React from 'react';
import chunks from 'array.chunk'
import Translate from '@docusaurus/Translate';
import reactStringReplace from 'react-string-replace'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const SampleTrList  = [
  "Sayın {firstname} {lastname}, doğrulama kodunuz: {code}.",
  "Sayin {firstname} {lastname}, {domain} icin hosting hizmeti aktif hale getirilmistir. KullaniciAdi: {username} Sifre: {password}",
  "{username}, Yonetici paneline giris yapti.",
  "({firstname} {lastname}), Siteye giris yapti",
  "Sayin {firstname} {lastname}, {duedate} son odeme tarihli bir faturaniz bulunmaktadir. Detayli bilgi icin sitemizi ziyaret edin.",
  "Sayin {firstname} {lastname}, {duedate} son odeme tarihli {total} TL tutarinda bir {invoiceid} fatura olusturulmustur.",
  "Domain yenilenirken hata olustu. ({domain})",
  "Sayin {firstname} {lastname}, hizmetiniz duraklatildi. ({domain})",
  "Sayin {firstname} {lastname}, alan adiniz kayit edilemedi. Lutfen en kisa surede bizimle iletisime gecin ({domain})",
  "Yeni bir ticket acildi. ({subject})",
  "Sayin {firstname} {lastname}, alan adiniz basariyla yenilendi. ({domain})",
  "Yeni domain kayit edildi. ({domain})",
  "Sayin {firstname} {lastname}, ({subject}) konu baslikli destek talebiniz yanitlandi.",
  "Sayin {firstname} {lastname}, hizmetiniz tekrar aktiflestirildi. ({domain})",
  "Sayin {firstname} {lastname}, {domain} alan adiniz {expirydate}({x} gun sonra) tarihinde sona erecektir. Yenilemek icin sitemizi ziyaret edin.",
  "Sayin {firstname} {lastname}, ({ticketmask}) numarali ticket kapatilmistir.",
  "Sayin {firstname} {lastname}, {duedate} son odeme tarihli bir faturaniz bulunmaktadir. Detayli bilgi icin sitemizi ziyaret edin.",
  "Sayin {firstname} {lastname}, {duedate} son odeme tarihli gecikmis bir faturaniz bulunmaktadir. Detayli bilgi icin sitemizi ziyaret edin.",
  "Sayin {firstname} {lastname}, Bizi tercih ettiginiz icin tesekkur ederiz. Email: {email} Sifre: {password}",
  "Sayin {firstname} {lastname}, ({ticketid}) numarali ticketınız gönderilmiştir.",
  "Sayin {firstname} {lastname}, {duedate} son odeme tarihli gecikmis bir faturaniz bulunmaktadir. Detayli bilgi icin sitemizi ziyaret edin.",
  "({subject}) konulu ticket cevaplandı.",
  "Sayin {firstname} {lastname}, alan adiniz basariyla kayit edildi. ({domain})",
  "Sayin {firstname} {lastname}, {orderid} numarali siparisiniz onaylanmistir.",
  "Domain kayit edilirken hata olustu. ({domain})",
  "Sayin {firstname} {lastname}, {duedate} son odeme tarihli faturaniz odenmistir. Odemenizi zamanında yaptığınız icin tesekkur ederiz.",
  "Sayin {firstname} {lastname}, ürün/hizmet paketiniz degistirildi. ({domain})",
  "Domain yenilendi. ({domain})",
  "Yeni bir müşteri kayıt oldu. {firstname},{lastname},{email},{password}"
]

const SampleEnList  = [
  "Dear {firstname} {lastname}, your verification code is {code}.",
  "Dear {firstname} {lastname}, hosting service has been activated for {domain}. Username: {username} Password: {password}",
  "{username} is logged into the Admin panel.",
  "({firstname} {lastname}), logged into the site",
  "Dear {firstname} {lastname}, {duedate} you have an invoice with the last payment date. Visit our website for detailed information.",
  "Dear {firstname} {lastname}, {invoiceid} invoice has been created for {total} TL with {duedate} due date.",
  "Error renewing domain ({domain})",
  "Dear {firstname} {lastname}, your service has been paused. ({domain})",
  "Dear {firstname} {lastname}, your domain name could not be registered. Please contact us as soon as possible ({domain})",
  "A new ticket has been opened. ({subject})",
  "Dear {firstname} {lastname}, your domain has been renewed successfully. ({domain})",
  "New domain registered. ({domain})",
  "Dear {firstname} {lastname}, your support request ({subject}) has been answered.",
  "Dear {firstname} {lastname}, your service has been reactivated. ({domain})",
  "Dear {firstname} {lastname}, your {domain} will expire on {expirydate}({x} days later). Visit our site to renew.",
  "Dear {firstname} {lastname}, ticket number ({ticketmask}) has been closed.",
  "Dear {firstname} {lastname}, {duedate} you have an invoice with the last payment date. Visit our website for detailed information.",
  "Dear {firstname} {lastname}, {duedate} you have an overdue invoice with the last payment date. Visit our website for detailed information.",
  "Dear {firstname} {lastname}, Thank you for choosing us. Email: {email} Password: {password}",
  "Dear {firstname} {lastname}, your ticket with ({ticketid}) has been sent.",
  "Dear {firstname} {lastname}, {duedate} you have an overdue invoice with the last payment date. Visit our website for detailed information.",
  "Ticket on ({subject}) has been answered.",
  "Dear {firstname} {lastname}, your domain name has been successfully registered. ({domain})",
  "Dear {firstname} {lastname}, your order with {orderid} has been confirmed.",
  "There was an error registering the domain ({domain})",
  "Dear {firstname} {lastname}, {duedate} your invoice with the due date has been paid. Thank you for making your payment on time.",
  "Dear {firstname} {lastname}, your product/service package has been changed. ({domain})",
  "Domain renewed. ({domain})",
  "A new customer has registered. {firstname},{lastname},{email},{password}"
]

function SMS({body}) {

  const message = reactStringReplace(
    body,
    /(\{.*?\})/gm,
    (match, i) => <span key={`sms-${i}`} className="badge badge--cta">{match}</span>
  );

  return (
    <div className="col col--4 margin-top--md">
      <div className="card card-samples">
        <div className="card__body">
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

export default function Samples() {
  const {i18n} = useDocusaurusContext();
  let rows     = chunks(i18n.currentLocale === 'en' ? SampleEnList : SampleTrList, 3)

  const samples = rows.map((cols, idx) => {
    let row = cols.map((body, idx) => {
      return <SMS key={`sms-${idx}`} body={body} />
    })

    return <div key={`row-${idx}`} className="row">{row}</div>
  })

  return (
    <section className="samples padding-top--lg padding-bottom--lg">
      <div className="container">
				<h5 className="welcome-title">
					<Translate>Neler Yapabilirsiniz?</Translate>
				</h5>
        {samples}
      </div>
    </section>
  );
}
