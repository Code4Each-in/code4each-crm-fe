<template>
    <nav class="navbar navbar-light bg-white navbar-static-top navbar-expand-lg header-sticky">
        <div class="container">
            <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target=".navbar-collapse">
                <i class="fa fa-align-left"></i>
            </button>
            <a class="navbar-brand-logo" style="cursor: pointer;">
                <img class="img-fluid" src="/images/ss_logo.png" alt="logo">
            </a>
            <div class="add-listing d-none d-sm-block">
                <a class="btn btn-lg button-trial rounded-pill hover-top" @click="showModal('login')">LOGIN / SIGNUP 
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
        </div>
    </nav>
    <div class="MuiBox-root css-wsba2g">
        <div class="MuiBox-root css-0">
            <div class="compalinace-page">
                <div class="compalinace-content">
                    <div class="content-container">
                        <p class="content-head">Privacy Policy</p>
                        <div class="content-seprater"></div>
                        <p class="content-text">
                            This privacy policy sets out how SpeedySites
                            uses and protects any information that you give
                            SpeedySites when you visit their website and/or agree to purchase from them.
                        </p>
                        <p class="content-text">
                            SpeedySites is committed to ensuring that your privacy is protected. Should we
                            ask you to provide certain information by which you can be identified when using this website,
                            and then you can be assured that it will only be used in accordance with this privacy statement.
                        </p>
                        <p class="content-text">
                            SpeedySites may change this policy from time to time by updating
                            this page. You should check this page from time to time to ensure that you adhere to these changes.
                        </p>
                        <p class="content-text"><strong>We may collect the following information:</strong></p>
                        <ul class="unorder-list">
                            <li class="list-item">
                                <p class="content-text list-text">Name</p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    Contact information including email address
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    Demographic information such as postcode, preferences and interests, if required
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    Other information relevant to customer surveys and/or offers
                                </p>
                            </li>
                        </ul>
                        <p class="content-text"><strong>What we do with the information we gather</strong></p>
                        <p class="content-text">
                            We require this information to understand your needs and provide you with a better service,
                            and in particular for the following reasons:
                        </p>
                        <ul class="unorder-list">
                            <li class="list-item">
                                <p class="content-text list-text">Internal record keeping.</p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    We may use the information to improve our products and services.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    We may periodically send promotional emails about new products,
                                    special offers or other information which we think you may
                                    find interesting using the email address which you have provided.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    From time to time, we may also use your information to contact you for market research purposes. We may contact you by email,
                                    phone, fax or mail. We may use the information to customise the website according to your interests.
                                </p>
                            </li>
                        </ul>
                        <p class="content-text">
                            We are committed to ensuring that your information is secure.
                            In order to prevent unauthorised access or disclosure we have put in suitable measures.
                        </p>
                        <p class="content-text"><strong>How we use cookies</strong></p>
                        <p class="content-text">
                            A cookie is a small file which asks permission to be placed on your computer's hard drive.
                            Once you agree, the file is added and the cookie helps analyze  web traffic or lets you know when you visit a particular site.
                            Cookies allow web applications to respond to you as an individual. The web application can tailor its operations to your needs,
                            likes and dislikes by gathering and remembering information about your preferences.
                        </p>
                        <p class="content-text">
                            We use traffic log cookies to identify which pages are being used.
                            This helps us analyze data about webpage traffic and improve our website
                            in order to tailor it to customer needs. We only use this information for statistical analysis
                            purposes and then the data is removed from the system.
                        </p>
                        <p class="content-text">
                            Overall, cookies help us provide you with a better website, by enabling us to monitor which pages
                            you find useful and which you do not. A cookie in no way gives us access to your computer or any
                            information about you, other than the data you choose to share with us.
                        </p>
                        <p class="content-text">
                            You can choose to accept or decline cookies. Most web browsers automatically accept cookies,
                            but you can usually modify your browser setting to decline cookies if you prefer.
                            This may prevent you from taking full advantage of the website.
                        </p>
                        <p class="content-text"><strong>Controlling your personal information</strong></p>
                        <p class="content-text">
                            You may choose to restrict the collection or use of your personal information in the following ways:
                        </p>
                        <ul class="unorder-list">
                            <li class="list-item">
                                <p class="content-text list-text">
                                    whenever you are asked to fill in a form on the website,
                                    look for the box that you can click to indicate that you do not want the information
                                    to be used by anybody for direct marketing purposes
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    if you have previously agreed to us using your personal information for
                                    direct marketing purposes, you may change your mind at any time by writing to or emailing us at
                                    
                                </p>
                            </li>
                        </ul>
                        <p class="content-text">
                            We will not sell, distribute or lease your personal information to third parties unless
                            we have your permission or are required by law to do so. We may use your personal information
                            to send you promotional information about third parties which we think you may find interesting
                            if you tell us that you wish this to happen.
                        </p>
                        <p class="content-text">
                            If you believe that any information we are holding on you is incorrect or incomplete, please write to House No. 962, GBP ECO Homes 1, Barwala Road, Dera Bassi, SAS Nagar, Punjab, 140507 Rampur Sainia BO PUNJAB 140507. or contact  us at or as soon as possible. We will promptly correct any information found to be incorrect.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="footer-section">
        <div class="container w-container">
        <div class="subscription-wrapper">
            <div class="subscription-text-side">
            <h3 class="subscription-heading">
                Questions? Feedback? Contact us for prompt assistance and support
            </h3>
            </div>
            <div class="subscription-form-side">
            <a
                class="btn btn-lg button-trial rounded-pill hover-top"
                href="https://calendly.com/arsh-speedysites/30min"
                target="_blank"
                rel="noopener noreferrer"
                >BOOK A DEMO
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </a>
            </div>
        </div>
        <div class="footer-grid">
            <div class="footer-section-company">
            <div class="footer-logo-block">
                <img
                src="/images/white_sslogo.png"
                loading="lazy"
                alt="Footer Logo Image"
                class="footer-logo-image"
                />
            </div>
            <p class="footer-description">
                Instant Websites, Zero Coding, Maximum Impact!
            </p>
            </div>
            <div class="footer-section-affiliate">
            <h4 class="footer-heading">Affiliate Program</h4>
            <ul class="footer-list">
                <li><a href="/affiliate" class="footer-link">Become an Affiliate</a></li>
            </ul>
            </div>

            <div class="footer-section-legal">
            <h4 class="footer-heading">Legal</h4>
            <ul class="footer-list">
                <li><a href="/privacy-policy" class="footer-link">Privacy Policy</a></li>
                <li><a href="/terms-and-conditions" class="footer-link">Terms & Conditions</a></li>
                <li><a href="/refund-policy" class="footer-link">Refund Policy</a></li>
                <li><a href="/shipping" class="footer-link">Shipping</a></li>
                <li><a href="/contact-us" class="footer-link">Contact Us</a></li>
            </ul>
            </div>
        </div>

        <div class="footer-divider"></div>

        <div class="footer-bottom">
            <p class="footer-copyright">
            © {{ currentYear }} SpeedySites. All Rights Reserved
            </p>

            <div class="social-links">
            <a
                target="_blank"
                :href="config.FACEBOOK_URL"
                class="social-single-link w-inline-block"
            >
                <i class="fa fa-facebook-f"></i>
            </a>
            <a
                :href="config.INSTAGRAM_URL"
                target="_blank"
                class="social-single-link w-inline-block"
            >
                <i class="fa fa-instagram"></i>
            </a>
            <a
                :href="config.YOUTUBE_URL"
                target="_blank"
                class="social-single-link w-inline-block"
            >
                <i class="fa fa-youtube-play"></i>
            </a>
            </div>
        </div>
        </div>
    </div>
    <AuthSignupModal :showSignUpModal="showSignUpModal" :userType="userType" :referralCode="referralCode" @closeModal="showSignUpModal=false" @showAnotherModal="handleShowModal"></AuthSignupModal>
    <AuthLoginModal :showLoginModal="loginModalShow" :referralCode="referralCode" @closeModal="loginModalShow=false" @showAnotherModal="handleShowModal" ></AuthLoginModal>
    <EmailResetModal :showResetModal="forgetModalShow" @closeModal="forgetModalShow=false" @showAnotherModal="handleShowModal" ></EmailResetModal>
    <AlertForSignupModal :alertShowModal="alertShow" @closeModal="alertShow=false" @showAnotherModal="handleShowModal"></AlertForSignupModal>
</template>
<script setup>
import {
    onMounted,
    ref,
} from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@/stores/store";
import config from "/config.js";
import AuthSignupModal from "@/components/common/modals/AuthSignupModal.vue";
import AuthLoginModal from "@/components/common/modals/AuthLoginModal.vue";
import EmailResetModal from "@/components/common/modals/EmailResetModal.vue";
import AlertForSignupModal from "@/components/common/modals/AlertForSignupModal.vue";

const route = useRoute();
const store = useStore();
const ModalShowing = ref(false);
const showSignUpModal = ref(false);
const forgetModalShow = ref(false);
const loginModalShow = ref(false);
const alertShow = ref(false);
const backendError = ref("");
const userType = ref('user');

const showModal = (modal) => {
  hideModal();
  ModalShowing.value = true;
  backendError.value = "";

  if (modal === "forget") {
    loginModalShow.value =
      showSignUpModal.value =
      alertShow.value =
        false;
    forgetModalShow.value = true;

  } else if (modal === "login") {
    loginModalShow.value = true;
    forgetModalShow.value =
      showSignUpModal.value =
      alertShow.value =
        false;

  } else if (modal === "signup") {
    userType.value = 'user';
    showSignUpModal.value = true;
    forgetModalShow.value =
      loginModalShow.value =
      alertShow.value =
        false;

  } else if (modal === "agent") {
    userType.value = 'agent';
    loginModalShow.value = true;
    forgetModalShow.value =
      showSignUpModal.value =
      alertShow.value =
        false;

  } else if (modal === "feedback") {
    store.updateFeedbackModalStore();
  }
};  

onMounted(async () => {
  window.onload = () => {
  setTimeout(() => {
    if (!(showSignUpModal.value || loginModalShow.value || forgetModalShow.value) && !loginExist.value) {
      showModal("alert");
    }
  }, 15000);
  };
  if (route.query.ref) {
    referralCode.value = route.query.ref;
  }
  const storedToken = localStorage.getItem("access_token");
  if (storedToken) {
    loginExist.value = storedToken;
  }
  if (route.query.login) {
    loginModalShow.value = true;
  }
});

const handleShowModal = (modal) => {
  if(modal === 'signup'){
    alertShow.value = false
  }
 showModal(modal)
};

const hideModal = () => {
  ModalShowing.value = false;
  forgetModalShow.value = false;
  loginModalShow.value = false;
  alertShow.value = false;
};
</script>
<style scoped>
.header-conatiner { 
    display: flex; 
    align-items: center; 
    padding: 24px; 
}
.header-text { 
    font-size: 18px; 
    line-height: 24px; 
    color: #fff; 
    margin: 0 0 0 18px; 
}
.compalinace-page { 
    background: #0a1d38; 
    font-family: Lato, sans-serif; 
    font-style: normal; 
    font-weight: 400; 
}
@media screen and (min-width: 768px) { 
    .content-container { 
        margin: 0 auto; 
        max-width: 1000px; 
    } 
    .header-conatiner { 
        margin: 0 auto; 
        max-width: 1000px; 
    } 
}
.compalinace-content { 
    background: #ffffff; 
    padding: 32px 24px; 
    height: 1255px;
}
.content-head { 
    font-size: 24px; 
    line-height: 30px; 
    color: #213554; 
    margin: 0; 
    font-weight: 700;
}
.content-seprater { 
    width: 28px; 
    height: 5px; 
    background-color: #213554; 
    margin-top: 16px; 
}
.updated-date { 
    margin: 16px 0 0; 
    color: #213554ab; 
    font-weight: 700;
}
.content-text { 
    color: #515978; 
    margin: 16px 0 0; 
}
.content-text { 
    font-size: 14px; 
    line-height: 20px; 
}
.merchant-logo { 
    width: 74.6px; 
    height: 64px; 
    background: #fefefe; 
    box-shadow: 0px 0px 8px #00000040; 
    border-radius: 8px; 
    display: flex; 
    justify-content: center; 
    align-items: center; 
}
@media screen and (max-width: 330px) { 
    .merchant-logo { 
        width: 87px; 
    } 
}
@media all and (min-width: 768px), (min-width: 383px) { 
    .merchant-logo { 
        width: 64px; 
    } 
}
.logo-container { 
    display: flex; 
    justify-content: center; 
    align-items: center; 
    width: 50px; 
    height: 50px; 
    background: #0a1d38; 
    box-shadow: 11.0003px 22.0007px 53.9016px rgba(0, 0, 0, 0.1), 22.0007px 11.0003px 53.9854px -2.03719px rgba(255, 255, 255, 0.1); 
    border-radius: 50%; 
}
.logo-text {
    color: #fff; 
    font-weight: 700; 
    font-size: 32px; 
}
.list-item { 
    display: list-item; 
    padding-left: 5px; 
}
.unorder-list { 
    margin: 0; 
}
.list-text { 
    margin-top: 8px; 
}
.compalinace-page {
    background: none;
}
.content-container { 
    margin: initial; 
    max-width: initial; 
}
.footer-section {
    background-color: #1d2b64eb; 
    color: #ffffff;
    padding: 48px 0;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 24px;
}

.footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 32px;
}

@media (min-width: 768px) {
    .footer-grid {
        grid-template-columns: repeat(3, 1fr);
        max-width: 75%;
    }
}

.footer-section {
    display: flex;
    flex-direction: column;
}

.footer-title {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
}

.footer-heading {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 16px;
}

.footer-description {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
}

.footer-list {
    list-style: none;
    padding-left: 0px !important;
}

.footer-list li {
    margin-bottom: 8px;
}

.footer-link {
    color: rgba(255, 255, 255, 0.8);
    text-decoration: none;
    font-size: 18px;
    transition: color 0.3s ease;
}

.footer-link:hover {
    color: #fb923c; 
}

.footer-divider {
    height: 1px;
    background-color: rgba(255, 255, 255, 0.2);
    margin: 32px 0;
}

.footer-bottom {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
}

@media (min-width: 768px) {
    .footer-bottom {
        flex-direction: row;
        justify-content: space-between;
    }
}

.social-links {
    display: flex;
    gap: 16px;
}

.subscription-wrapper{
  margin-top: -95px !important;
}
.footer-grid {
  margin: 44px;
}
.footer-logo-block img.footer-logo-image {
  width: 75% !important;
  margin: -12px !important;
  padding-bottom: 22px !important;
}
.footer-description {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}
.social-single-link:hover{
  color: #fff !important;
  background-color: #1d2b64 !important;
}
.social-single-link{
  background-color: #fff !important;
  color: #1d2b64 !important;
}

@media screen and (max-width: 992px) {
  .subscription-wrapper{
    margin-top: -142px !important;
  }
  .footer-section {
    margin-top: 0px !important;
  }
  .compalinace-content{
    height: 2240px !important;
  }
}
</style>