<template>
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
              <li><a href="/shipping" class="footer-link">Shipping Policy</a></li>
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
  <FeedbackModal @closeModal="store.updateFeedbackModalStore()" ></FeedbackModal>
</template>
<script setup>
import {
  ref,
  defineProps,
  onMounted,
  provide,
  inject,
  computed,
  watch,
} from "vue";
import config from "/config.js";
import FeedbackModal from "@/components/common/modals/FeedbackModal.vue";
import { useStore } from "@/stores/store";

const store = useStore();
const currentYear = new Date().getFullYear();

</script>
<style scoped>
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
  margin-top: -23px !important;
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
}
</style>