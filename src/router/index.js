import { createRouter, createWebHistory } from 'vue-router'
import WordpressService from "@/service/WordpressService";
import LoginView from '../views/LoginView.vue'
import EmailVerify from '../views/EmailVerify.vue'
import DashboardView from '../views/Dashboard.vue'
import MyHomeView from '../views/HomeView.vue'
import CustomizeView from '../views/CustomizeView.vue'
import MenusView from '../views/MenusView.vue'
import CustomizeColors from '../views/CustomizeWebsiteColors.vue'
import SiteSettings from '../views/SiteSettings.vue'
import CustomizeWebsiteFonts from '../views/CustomizeWebsiteFonts.vue'
import CustomizeSocialLinks from '../views/CustomizeSocialLinks.vue'
import CustomizeRearrange from '../views/CustomizeRearrange.vue'
import RessetPassword from "@/components/forget_password/RessetPassword.vue";
import FrontLayout from "../views/layouts/Front.vue"
import DashboardLayout from "../views/layouts/Dashboard.vue"
import BlankLayout from "../views/layouts/Blank.vue"
import PlansView from '../views/PlansView.vue'
import FormBuilder from '../views/FormBuilder.vue'
import SEOKeywords from '../views/SEOKeywords.vue'
import TemplatePages from '../views/TemplatePages.vue'
import CustomizePages from '../views/CustomizePages.vue'
import ReferredUsers from '../views/ReferredUsers.vue'
import Refund from '@/views/Refund.vue';
import TermsAndConditions from '@/views/TermsAndConditions.vue';
import Shipping from '@/views/Shipping.vue';
import PrivacyPolicy from '@/views/Privacy.vue';
import ContactUs from '@/views/ContactUs.vue';
import AffiliateView from '../views/AffiliateView.vue';
import AffiliateSignup from '@/views/AffiliateSignup.vue';
import AffiliateLogin from '@/views/AffiliateLogin.vue';
import AffiliateDashboard from '../views/AffiliateDashboard.vue';
import AffiliatePaymentHistoryView from '../views/AffiliatePaymentHistoryView.vue';
import AffiliateForgotPassword from '@/views/AffiliateForgotPassword.vue';
import GoogleImproveBusiness from '../views/GoogleImproveBusiness.vue';
import DomainMappingSetting from '../views/DomainMappingSetting.vue';
import SocialMediaSettings from '../views/SocialMedia.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Public',
      component: FrontLayout,
      redirect: '/',
      children:[
        {
          path:'/',
          name: 'Home',
          component: MyHomeView
        }
      ]
    },
    {
      path: '/login',
      redirect: '/',
      // name: 'login',
      // component: LoginView,
      // meta: { title: 'Login', layout:FrontLayout }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, title: 'Dashboard', layout:DashboardLayout }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/customize',
      name: 'customize',
      component: CustomizeView,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: RessetPassword,
      meta: { title: 'Reset Password', layout:FrontLayout }

    },
    {
      path: '/customize/colors',
      name: 'customize_colors',
      component: CustomizeColors
    },
    {
      path: '/customize/components',
      name: 'customize_components',
      component: CustomizeView
    },
    {
      path: '/customize/fonts',
      name: 'customize_fonts',
      component: CustomizeWebsiteFonts
    },
    {
      path: '/customize/social-links',
      name: 'customize_social_links',
      component: CustomizeSocialLinks
    },
    {
      path: '/settings',
      name: 'site_settings',
      component: SiteSettings
    },
    {
      path: '/email/verify',
      name: 'email_verify',
      component: EmailVerify,
      meta: { title: 'Email verify' }
    },
    {
      path: '/home',
      name: 'homePage',
      component: MyHomeView
    },
    {
      path: '/customize/menus',
      name: 'menusPage',
      component: MenusView
    },
    {
      path: '/customize/rearrange',
      name: 'rearrangePage',
      component: CustomizeRearrange
    },
    {
      path: '/plans',
      name: 'plans',
      component: PlansView
    },
    {
      path: '/form-builder',
      name: 'form_builder',
      component: FormBuilder,
      meta: { requiresAuth: true, title: 'Form Builder', layout:DashboardLayout }
    },
    {
      path: '/customize/seo-keywords',
      name: 'seoKeywordsPage',
      component: SEOKeywords
    },
    {
      path: '/customize/template-pages',
      name: 'templatePages',
      component: TemplatePages
    },
    {
      path: '/customize/customize-pages',
      name: 'customize_customizepages',
      component: CustomizePages
    },
    {
      path: '/checkout/:planId',
      name: 'Checkout',
      component: () => import('@/views/Checkout.vue'),
    },
    {
      path: '/referred-user',
      name: 'referred_user',
      component: ReferredUsers,
    },
    {
      path: '/refund-policy',
      name: 'refund_policy',
      component: Refund,
    },
    { 
      path: '/terms-and-conditions',
      name: 'terms_and_conditions',
      component: TermsAndConditions,
    },
    {
      path: '/shipping',
      name: 'shipping',
      component: Shipping,
    },
    {
      path: '/privacy-policy',
      name: 'privacy_policy',
      component: PrivacyPolicy,
    },
    {
      path: '/contact-us',
      name: 'contact_us',
      component: ContactUs,
    },
    {
      path: '/affiliate',
      name: 'affiliate_view',
      component: AffiliateView,
    },
    {
      path: '/affiliate-signup',
      name: 'affiliate_signup',
      component: AffiliateSignup,
    },
    {
      path: '/affiliate-login',
      name: 'affiliate_login',
      component: AffiliateLogin,
    },
    {
      path: '/affiliate-dashboard',
      name: 'affiliate_dashboard',
      component: AffiliateDashboard,
    },
    {
      path: '/affiliate-paymenthistory',
      name: 'affiliate_history',
      component: AffiliatePaymentHistoryView,
    },
    {
      path: "/affiliate-forgot-password",
      name: "affiliate-forgot-password",
      component: AffiliateForgotPassword,
    },
    {
      path: "/google-business-setting",
      name: "google-business-setting",
      component: GoogleImproveBusiness,
    },
    {
      path: "/domains",
      name: "domains",
      component: DomainMappingSetting,
    },
    {
      path: "/social-media-settings",
      name: "SocialMediaSettings",
      component: SocialMediaSettings,
    }
  ]
});

router.beforeEach(async (to, from, next) => {
  const pageTitle = to.meta.title || 'SpeedySites';
  document.title = pageTitle;

  let userType = null;
  if (to.path === "/affiliate-dashboard" || to.path === "/dashboard") {
    try {
      const userResponse = await WordpressService.fetchDashboardData();
      userType = userResponse?.data?.user?.user_type;

      // ------------------------------
      // RULE 1: Normal user cannot access affiliate dashboard
      // ------------------------------
      if (to.path === "/affiliate-dashboard" && userType === "user") {
        return next("/dashboard");
      }

      // ------------------------------
      // RULE 2: Agent cannot access normal dashboard
      // ------------------------------
      if (to.path === "/dashboard" && userType === "agent") {
        return next("/affiliate-dashboard");
      }
    } catch (err) {
      console.error(err);
    }
  }

  if (to.path === "/home" && isLoggedIn()) {
    next("/dashboard");
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isLoggedIn()) {
      next("/");
    } else {
      next();
    }
  } else {
    next();
  }
});

function isLoggedIn() {
  return localStorage.getItem('access_token') !== null && !undefined;
}

export default router;