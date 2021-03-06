import { createApp } from 'vue';
import mitt from 'mitt';
import axios from 'axios';
import jsSHA from 'jssha';
import { Icon } from 'leaflet';
import LeafletIconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import LeafletIconUrl from 'leaflet/dist/images/marker-icon.png';
import LeafletShadowUrl from 'leaflet/dist/images/marker-shadow.png';

import App from './App.vue';
import router from './router';
import 'leaflet/dist/leaflet.css';
// eslint-disable-next-line
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: LeafletIconRetinaUrl,
  iconUrl: LeafletIconUrl,
  shadowUrl: LeafletShadowUrl,
});

/* eslint new-cap: ["error", { "newIsCap": false }] */

const app = createApp(App);
const authorizationHeader = () => {
  const AppID = process.env.VUE_APP_API_ID;
  const AppKey = process.env.VUE_APP_API_KEY;
  const GMTString = new Date().toGMTString();
  const ShaObj = new jsSHA('SHA-1', 'TEXT');
  ShaObj.setHMACKey(AppKey, 'TEXT');
  ShaObj.update(`x-date: ${GMTString}`);
  const HMAC = ShaObj.getHMAC('B64');
  const Authorization = `hmac username="${AppID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;
  return { Authorization, 'X-Date': GMTString };
};
const axiosInstance = axios.create({
  baseURL: 'https://ptx.transportdata.tw/MOTC/v2',
  headers: authorizationHeader(),
});

const eventBus = mitt();

app.config.globalProperties.eventBus = eventBus;
app.config.globalProperties.axiosInstance = axiosInstance;
app.use(router).mount('#app');
