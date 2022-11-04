import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import WhmcsMainScreen from '@site/static/img/whmcs-sms-main-screen.png';

export default function HomeHero() {

  return (
    <header>
      <div className="container">
        <h1 className="welcome-title padding-top-lg">
          <Translate>Ücretsiz Whmcs SMS Eklentisi</Translate>
        </h1>
        <h3 className="welcome-title-desc">
          <Translate>Müşterilerinizi SMS ile siparişleri hakkında bilgilendirin.</Translate>
          <br />
          <Translate>Yeni siparişlerden anında haberdar olun!</Translate>
        </h3>
        <div className="btn-container">
          <Link
            className="welcome-title-desc btn-cta button button--primary padding-vert--sm padding-horiz--md margin-top--md"
            to="#download">
            <Translate>Ücretsiz İndir</Translate>
          </Link>
        </div>
        <img src={WhmcsMainScreen} />
      </div>
    </header>
  );
}