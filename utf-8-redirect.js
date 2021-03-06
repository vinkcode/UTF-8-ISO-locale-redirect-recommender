const redirect = () => {
    var isoCodes = [
        'af_ZA',
        'ar_AE',
        'ar_BH',
        'ar_DZ',
        'ar_EG',
        'ar_IQ',
        'ar_JO',
        'ar_KW',
        'ar_LY',
        'ar_MA',
        'ar_OM',
        'ar_QA',
        'ar_SA',
        'ar_TN',
        'ar_YE',
        'as_IN',
        'az_AZ',
        'be_BY',
        'bg_BG',
        'bn_IN',
        'bs_BA',
        'ca_ES',
        'cs_CZ',
        'CZ.UT',
        'da_DK',
        'de_AT',
        'de_BE',
        'de_CH',
        'de_DE',
        'de_LI',
        'de_LU',
        'el_CY',
        'el_GR',
        'en_AU',
        'en_BW',
        'en_CA',
        'en_GB',
        'en_HK',
        'en_IE',
        'en_IN',
        'en_MT',
        'en_NZ',
        'en_PH',
        'en_SG',
        'en_US',
        'en_ZW',
        'es_AR',
        'es_BO',
        'es_CL',
        'es_CO',
        'es_CR',
        'es_DO',
        'es_EC',
        'es_ES',
        'es_GT',
        'es_HN',
        'es_MX',
        'es_NI',
        'es_PA',
        'es_PE',
        'es_PR',
        'es_PY',
        'es_SV',
        'es_US',
        'es_UY',
        'es_VE',
        'et_EE',
        'fi_FI',
        'fr_BE',
        'fr_CA',
        'fr_CH',
        'fr_FR',
        'fr_LU',
        'gu_IN',
        'he_IL',
        'hi_IN',
        'hr_HR',
        'hu_HU',
        'hy_AM',
        'id_ID',
        'is_IS',
        'it_CH',
        'it_IT',
        'ja_JP',
        'ka_GE',
        'kk_KZ',
        'kn_IN',
        'ko_KR',
        'ks_IN',
        'ku_TR',
        'ky_KG',
        'lt_LT',
        'lv_LV',
        'mk_MK',
        'ml_IN',
        'mr_IN',
        'ms_MY',
        'mt_MT',
        'nb_NO',
        'nl_BE',
        'nl_NL',
        'nn_NO',
        'or_IN',
        'pa_IN',
        'pl_PL',
        'pt_BR',
        'pt_PT',
        'ro_RO',
        'ru_RU',
        'ru_UA',
        'sa_IN',
        'sk_SK',
        'sl_SI',
        'sq_AL',
        'sr_ME',
        'sr_RS',
        'sv_SE',
        'ta_IN',
        'te_IN',
        'th_TH',
        'tr_TR',
        'uk_UA',
        'vi_VN',
        'zh_CN',
        'zh_HK',
        'zh_SG',
        'zh_TW'
    ];

    var success = (data) => {
        var display = (data) => {
            const countryGeo = data.results[0].address_components[5].short_name;            
            const iso = navigator.language.substring(0, 2) + '-' + countryGeo;
            const isoMatch = isoCodes.find(element => element === iso);
            const isoCountryMatch = isoCodes.find(element => element.substring(3, 5) === countryGeo);
            
            if (isoMatch !== undefined) {
                //redirect using lang+country from browser + google geolocation
                document.querySelector('.redirect').innerHTML = `/${isoMatch}/`;
                document.querySelector('.message').innerHTML = " Country and Language detected! ";
                
            } else if (isoCountryMatch !== undefined) {
                //redirect using only Country
                document.querySelector('.redirect').innerHTML = `/${isoCountryMatch.replace('_', '-')}/`;
                document.querySelector('.message').innerHTML = " Redirecting to country, with default language!";
            } else {
                // redirect using browser pure settigns
                document.querySelector('.redirect').innerHTML = `/${navigator.language}/`;
                document.querySelector('.message').innerHTML = " No matches found. Attemting redirect!";
            }
            document.querySelector('.country').value = countryGeo;
            document.querySelector('.language').value = navigator.language.substring(0, 2);
        }

        var googleapis = 
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.coords.latitude},${data.coords.longitude}&key=secret`)
            .then(response => response.json()).then(display);
    }

    var error = (data) => {
        console.log(data)
    }
    navigator.geolocation.getCurrentPosition(success, error);
}

export {redirect};
