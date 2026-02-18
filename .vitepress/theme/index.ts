import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import Layout from './Layout.vue';
import HomePage from './HomePage.vue';
import PubBadge from './components/PubBadge.vue';
import './style.css';

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    app.component('HomePage', HomePage);
    app.component('PubBadge', PubBadge);
  },
} satisfies Theme;
