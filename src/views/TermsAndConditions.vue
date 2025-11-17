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
                        <p class="content-head">Terms &amp; Conditions</p>
                        <div class="content-seprater"></div>
                        <p class="content-text">
                            For the purpose of these Terms and Conditions, The term "we", "us","our" used anywhere on this page shall mean SpeedySites, whose registered/operational office is House No. 962, GBP ECO Homes 1, Barwala Road, Dera Bassi, SAS Nagar, Punjab, 140507 Rampur Sainia BO PUNJAB 140507. "you", “your”, "user", “visitor” shall mean any natural or legal person who is visiting our website and/or agreed to purchase from us.
                        </p>
                        <p class="content-text">
                            <strong>Your use of the website and/or purchase from us are governed by following Terms and Conditions:</strong>
                        </p>
                        <ul class="unorder-list">
                            <li class="list-item">
                                <p class="content-text list-text">
                                    The content of the pages of this website is subject to change without notice.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    Neither we nor any third parties provide any warranty or
                                    guarantee as to the accuracy, timeliness, performance,
                                    completeness or suitability of the information and materials
                                    found or offered on this website for any particular purpose.
                                    You acknowledge that such information and materials may contain
                                    inaccuracies or errors and we expressly exclude liability for
                                    any such inaccuracies or errors to the fullest extent permitted
                                    by law.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    Your use of any information or materials on our website and/or product
                                    pages is entirely at your own risk, for which we shall not be liable.
                                    It shall be your own responsibility to ensure that any products, services
                                    or information available through our website and/or product pages meet your
                                    specific requirements.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    Our website contains material which is owned by or licensed to us. This material
                                    includes, but are  not limited to, the design, layout, look, appearance
                                    and graphics. Reproduction is prohibited other than in accordance with the
                                    copyright notice, which forms part of these terms and conditions.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    All trademarks reproduced in our website which are not the property of, or
                                    licensed to, the operator are acknowledged on the website.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    Unauthorized use of information provided by us  shall give rise to a claim for
                                    damages and/or be a criminal offense.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    From time to time our website may also include links to other websites. These links are
                                    provided for your convenience to provide further information.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    You may not create a link to our website from another website or document without
                                    SpeedySites’s prior written consent.
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    Any dispute arising out of use of our website and/or purchase with
                                    us and/or any engagement with us is subject to the laws of India .
                                </p>
                            </li>
                            <li class="list-item">
                                <p class="content-text list-text">
                                    We, shall be under no liability whatsoever in respect of any loss or
                                    damage arising directly or indirectly out of the decline of
                                    authorization for any Transaction, on Account of the Cardholder
                                    having exceeded the preset limit mutually agreed by us with our
                                    acquiring bank from time to time
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
    height: 710px;
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
    height: 1420px !important;
  }
}
</style>