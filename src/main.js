// File: src/main.js
import { createApp } from 'vue';
import './style.css';
import App from './app.vue';
import i18n from "./i18n.js";
import PrimeVue from 'primevue/config';
import Material from '@primeuix/themes/material';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import Tooltip from 'primevue/tooltip';
import {
    Button,
    Card,
    Drawer,
    FloatLabel,
    Image,
    InputNumber,
    InputText,
    Select,
    SelectButton,
    Tag,
    Toast,
    ToastService,
    Toolbar
} from "primevue";
import router from "./router.js";
import pinia from "./pinia.js";

/**
 * @summary Main entry point configuring Vue 3, PrimeVue Material preset, Pinia, Vue Router, and Vue I18n.
 * @author John Doe
 */
const primeUiLicenseKey = import.meta.env.VITE_PRIME_UI_LICENSE_KEY;

createApp(App)
    .use(i18n)
    .use(PrimeVue, {
        theme: {
            preset: Material,
            options: { darkModeSelector: false }
        },
        ripple: true,
        license: primeUiLicenseKey
    })
    .use(ToastService)
    .component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-drawer', Drawer)
    .component('pv-float-label', FloatLabel)
    .component('pv-image', Image)
    .component('pv-input-number', InputNumber)
    .component('pv-input-text', InputText)
    .component('pv-select', Select)
    .component('pv-select-button', SelectButton)
    .component('pv-tag', Tag)
    .component('pv-toast', Toast)
    .component('pv-toolbar', Toolbar)
    .directive('tooltip', Tooltip)
    .use(pinia)
    .use(router)
    .mount('#app');