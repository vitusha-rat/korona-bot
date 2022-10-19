import axios from 'axios'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const host = 'garantex.io' // для тестового сервера используйте stage.garantex.biz
const privateKey =
  'LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFb2dJQkFBS0NBUUVBdGt6aE1hemwxNXJ2OGpORnNVTHhSNVBsaVNaTytlY29LR3VjcVNrM0RBY1VsTEdtCnFBcU51TE5nRXlRdkdhbjY4TGhJTFRSandiNXNJamRhT0pDZ0pjNW14dHJ5cEFZRzkyWXdjb241RzlEOStiQUcKUDRTQTRrdGRxRnJXMlZHVDV0b25za1FpeEUrRFFydDlCQlRJZEVDVkp1MjJxaWJ3eDFTU0NWblpGcFkyQ2Y2ZQpSYk45NmVKSVZ1WXAyeWhQSllwZC9tQ1p3ejdMNXFSYlkrK1FnTVZSdnRKWEN2ZEdlUzdMaEluSzR3TkVYZlZCCmxFS1B3OWtCdXNVNWh5SnFudlhBQTJhTXRJY3lrQ2JsaWozTnVBMWNyaUZldTFqNTJtb3VISVN2SFVVWFVpeSsKbnRtcnlDTWZoMXRzY1FBajEvRjRtUW5nUVJSMW5iYmlCMFNrSHdJREFRQUJBb0lCQUN1L01UOUpmWEtLOU0vTApiQXNJeEh2bnl1cHByZ1FjYTYrZmUxM0F6VHZ1cXdxdnd3MktVczRqQllneVk3Y2w2bGsvNzlvaE8xc3dCaVVECjRYdTNnU2J4YkFxR1dqbndWRldrU1RZRFZDdFBzTkx0WWVKMk9yT1RZR3RaT1R1M2J1VzBMbGlDTDFHcXZ4WVIKaGdPbnRSN29yS0pGNDFMYnUyWXFMazFlS1ZGWTNNN09ZRkRjU21oOHFZUHRlRm1MVEZLeXRhUUFmY0ZmMzZvSQpyc1BjRlhnWklDa3JibHVySVVvQ2thdEJ2ZXJsWHdENlFWbW5yOWNudzVPUVpXZWZVSHcvclVqaG9qdGUzSE45ClkrWXliWU9JNjY4YVNhdVQ4NFRGTElyVTV2bXFXRjZuWVJwTVNPTUs3TFVBNWx5QWhtaG5RQnBlUWdJTGtTQ3UKSjMwOXdaa0NnWUVBNUxUMzFFMUJPODhYU1RURDdMcFpxbkxUUzNlS2ZQREJQTVkyRVBOTUcrdFRET1BxelJvbQpDelRGbUlkMGN5SUpPZkR1Ukt1U3h5Z0pxS0NUNFhuZFZTZG9UenpUMERjY0ZlTEd2eGtXcXRPQi91aVh4ZEY3ClRYRXV1c1g5ajEzRDNSQ0ZWUTRYcW85UlhHaVM4bndRbFZodXlPTWdTK2dkck43QUp6T2dSSFVDZ1lFQXpBNHUKekRKYVJ0aFltTHljRnVRNktQUnRoaWIxVmxWckdYa0NOYm5UWHlqSVkraUF4TlQ1ZEZuWjNOVlh2S0lEQXVxSwpiT0tNb2NYRG5iMTkwVGtZRnlhVm1uQUdtWEdodmpZNW9YV29ENG9FVG12ZEo1Y1JOUTBLUlRrYlVkZDZDRUJTCndYeWRyNlljZHYyTTVOaWRSaTFnNndockhKSXJ2OFhjWityeW84TUNnWUFocHNzTWJ1MlpTa2huMmg2MTkxbDQKTGZzUEVLRE03M1BQYUc3T0lhNWlNVWNBRDQwZDdxb0lYaFJ3OUFWYlozZXFFZHhOT0YyWmRqZXRteXNITXpJdwo5R0p4dmthQVRZdVJZTlBUakhKOFlqQ3ZmRFBReEpqNjlSdG1HZm5NSFlUVFF6b0xJTTYwcHUvV3hBQlRNNVFSCkZYai9rQVBSaDI3T1g5d3dLSFY5ZlFLQmdIamQwY1JyOHVOUjFMQ3J6MzBUdEl0N3RNQW9wVnQ4L3hJNGhpR1MKcjJ3SE9TTk1uYkY1UVVVMHo0SXA4RzB3UGI1bGRKYm9Ya3FZWExVN2Y2SUZRb3E3OVJOa1ZkUmY1V0ZJdHp3Mgo5OVEwZVRhR1Y1blN0b09JOU5OcDd3KzhKWEZyd0ZrUldrbW5oK2JIYXNSR3RtblNDVDFPWUR1dExUTExuVEVFCmpyS0hBb0dBVFhCQW5Pd3RCUWVaci9lQXdoU3lvWjNUZmNkbzlKOFhqSCtHMFJ4NnBpWVFOcUFxOUZOTHhuUVkKV2NzYVhLUTZCNUwzWjQvNXFhQm00bi9SZnM4cDk3MklqQWthbS8yY3JhTkZvQUJuckNSdlhqczlveFBJcnhDSgpIYnlNQ1pEMWR3VWRrdVpnc0FCZFczakpQK1lZc3dCUkhKKzVubGwzRDNvTVhUMzFjdVE9Ci0tLS0tRU5EIFJTQSBQUklWQVRFIEtFWS0tLS0tCg' // приватный ключ, полученный на этапе создания API ключей
const uid = 'e7db8feb-a68a-4c09-b423-f6db5d87297a' // UID, полученный на этапе создания API ключей
const coronaURL =
  'https://koronapay.com/transfers/online/api/transfers/tariffs?sendingCountryId=RUS&sendingCurrencyId=810&receivingCountryId=TUR&receivingCurrencyId=840&paymentMethod=debitCard&receivingAmount=100&receivingMethod=cash&paidNotificationEnabled=true'

export const getJWT = async () => {
  try {
    let { data } = await axios.post(
      'https://dauth.' + host + '/api/v1/sessions/generate_jwt',
      {
        kid: uid,
        jwt_token: jwt.sign(
          {
            exp: Math.round(Date.now() / 1000) + 30 * 60, // JWT Request TTL: 30 minutes
            jti: crypto.randomBytes(12).toString('hex'),
          },
          Buffer.from(privateKey, 'base64').toString('ascii'),
          { algorithm: 'RS256' }
        ),
      }
    )
    return data.token
  } catch (e) {
    console.error(e)
    return false
  }
}

export const getGarantexPrice = async () => {
  const jwt = await getJWT()

  try {
    let { data } = await axios.get('https://' + host + '/api/v2/trades', {
      params: {
        order_by: 'desc',
        limit: 1,
        market: 'usdtrub',
      },
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
    return data[0].price
  } catch (e) {
    console.error(e)
  }
}

export const getCoronaPrice = async () => {
  try {
    let { data } = await axios.get(coronaURL, {
      headers: {
        authority: 'koronapay.com',
        accept: 'application/vnd.cft-data.v2.94+json',
        'accept-language': 'en',
        cookie:
          '_gcl_au=1.1.787897679.1666214840; _gid=GA1.2.1367575957.1666214840; _ym_uid=1666214841839327546; _ym_d=1666214841; _ym_visorc=w; _ym_isad=2; tmr_lvid=ec3363ba5665b91645ebf8f120c5040b; tmr_lvidTS=1666214841311; qpay-web/3.0_locale=en; _dc_gtm_UA-100141486-1=1; _dc_gtm_UA-100141486-2=1; _dc_gtm_UA-100141486-25=1; _dc_gtm_UA-100141486-26=1; _ga=GA1.1.2041353532.1666214840; tmr_reqNum=32; _ga_H68H5PL1N6=GS1.1.1666214840.1.1.1666216579.58.0.0; tmr_detect=0%7C1666216581803; ROUTEID=3b2b4419bcd50e42|Y1Byj; _gali=changeable-field-input-amount; qpay-web/3.0_csrf-token-v2=83eb4398f7690beba35d8c4184f449b4',
        referer: 'https://koronapay.com/transfers/online/',
        'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Linux"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent':
          'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
        'x-application': 'Qpay-Web/3.0',
        'x-csrf-token': '83eb4398f7690beba35d8c4184f449b4',
      },
    })
    console.log(data)
    return data[0] as { exchangeRate: number }
  } catch (e) {
    console.error(e)
  }
}
