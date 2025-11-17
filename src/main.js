import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStore } from './stores/store';
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import WordpressService from "@/service/WordpressService";

const app = createApp(App)
app.config.errorHandler = (err, vm, info) => {
    console.error(err);
};

app.use(vue3GoogleLogin, {
    clientId: '725628821892-6lojkrl63celrm16gh182sdujfpagk5b.apps.googleusercontent.com'

})
app.use(createPinia())
app.use(useStore());
app.use(router);

const urlParams = new URLSearchParams(window.location.search)
const referralCode = urlParams.get('ref')

if (referralCode) {
    const response = await WordpressService.ReferredUsers.trackClick({
        referral_code: referralCode
    });
}

app.mount('#app')

