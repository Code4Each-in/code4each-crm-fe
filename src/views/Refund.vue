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
                        <p class="content-head">Cancellation &amp; Refund Policy</p>
                        <div class="content-seprater"></div>
                        <p class="content-text">
                            SpeedySites believes in helping its customers as far as possible,
                            and has therefore a liberal cancellation policy. Under this policy:
                        </p>
                        <ul class="unorder-list">
                            <li class="list-item">
                                <p class="content-text list-text">
                                    Cancellations will be considered only if the request is made within
                                    7 days of placing the order. However, the cancellation request
                                    may not be entertained if the orders have been communicated to
                                    the vendors/merchants and they have initiated the process of shipping them.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    SpeedySites does not accept cancellation
                                    requests for perishable items like flowers, eatables etc.
                                    However, refund/replacement can be made if the customer establishes
                                    that the quality of product delivered is not good.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    In case of receipt of damaged or defective items please report the
                                    same to our Customer Service team. The request will, however,
                                    be entertained once the merchant has checked and determined the
                                    same at his own end. This should be reported within
                                    7 days of receipt of the
                                    products.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    In case you feel that the product received is not as shown on the site
                                    or as per your expectations, you must bring it to the notice of our
                                    customer service within 7 days of
                                    receiving the product. The Customer Service Team after looking into your
                                    complaint will take an appropriate decision.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    In case of any Refunds approved by the
                                    SpeedySites, it’ll take
                                    6-8 days for the refund to
                                    be processed to the end customer.
                                </p>
                            </li>
                        </ul>
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

  } else if (modal === "alert") {
    alertShow.value = true;
    forgetModalShow.value =
      loginModalShow.value =
      showSignUpModal.value =
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
    height: 520px;
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
    height: 920px !important;
  }
}
</style>