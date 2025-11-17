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
import WordpressService from "@/service/WordpressService";

const route = useRoute();
const store = useStore();
const ModalShowing = ref(false);
const showSignUpModal = ref(false);
const forgetModalShow = ref(false);
const loginModalShow = ref(false);
const alertShow = ref(false);
const backendError = ref("");
const userType = ref('user');
const totalAgentJoined = ref(0);
const totalPaidToAffiliates = ref(0);
const average_monthly_earnings = ref(0);
const sale5 = ref(0);
const sale10 = ref(0);
const sale20 = ref(0);
const openFaq = ref(null);

const faqs = ref([
  { q: "How much can I really earn?", a: "You earn 10% commission on every 6-month (₹399) and 1-year (₹299) plan. That's ₹239 or ₹358 per sale." },
  { q: "When do I get paid?", a: "Commissions are paid monthly. You'll receive your earnings on the 15th of each month for the previous month's sales." },
//   { q: "How long do cookies last?", a: "We use a generous 30-day cookie..." },
//   { q: "What marketing materials do you provide?", a: "You'll get access to..." },
  { q: "Can I promote on social media and paid ads?", a: "Yes! You can promote SpeedySites through social media, blogs, YouTube, email newsletters" },
  { q: "Is there a minimum sales requirement?", a: "No minimum sales required! Whether you refer 1 customer or 100, you'll earn the same 10% commission rate. This program is perfect for beginners and experienced marketers alike." },
]);



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

const fetchActiveAgents = async () => {
  const response =  await WordpressService.AffiliateDetails.fetchAffiliateStats();
  if (response && response.status === 200 && response.data.success) {
    totalAgentJoined.value = response.data.response.total_affiliates;
    totalPaidToAffiliates.value = Math.floor(response.data.response.total_paid_affiliates);
    average_monthly_earnings.value = Math.floor(response.data.response.average_monthly_earnings);
    const calculator = response.data.response.earning_calculator;
    sale5.value = Math.floor(calculator["5_sales"]);
    sale10.value = Math.floor(calculator["10_sales"]);
    sale20.value = Math.floor(calculator["20_sales"]);
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
    await fetchActiveAgents();
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
<template>
    <body>
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
        <section class="hero">
            <div class="hero-content">
                <div class="ss_badge">
                    <span class="icon">📈</span>
                    <span>Earn up to 10% commission</span>
                </div>
                
                <h1>
                    Turn Your Network Into
                    <span class="gradient-text">Passive Income</span>
                </h1>
                
                <p>
                    Join the SpeedySites Affiliate Program and earn generous commissions by recommending 
                    the fastest website builder to your audience. Get paid for every 6-month and 1-year plan.
                </p>
                
                <div class="button-group">
                    <a href="/affiliate-signup" class="btn btn-primary">
                        Join Affiliate Program
                        <span>→</span>
                    </a>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">10%</div>
                        <div class="stat-label">Commission Rate</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">₹0</div>
                        <div class="stat-label">Joining Cost</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Stats Section -->
        <section class="section section-gradient">
            <div class="container">
                <div class="section-title">
                    <h2>Success By The Numbers</h2>
                    <p class="section-subtitle">
                        Join hundreds of successful affiliates earning consistent commissions
                    </p>
                </div>

                <div class="feature-grid">
                    <div class="card">
                        <div class="icon-circle icon-success">
                            <span class="icon icon-lg">💵</span>
                        </div>
                        <div class="stat-value" id="totalPaid">₹{{ totalPaidToAffiliates }}</div>
                        <div class="stat-label">Total Paid to Affiliates</div>
                    </div>

                    <div class="card">
                        <div class="icon-circle icon-primary">
                            <span class="icon icon-lg">👥</span>
                        </div>
                        <div class="stat-value">{{ totalAgentJoined }}</div>
                        <div class="stat-label">Active Affiliates</div>
                    </div>

                    <div class="card">
                        <div class="icon-circle icon-accent">
                            <span class="icon icon-lg">🏆</span>
                        </div>
                        <div class="stat-value">₹{{ average_monthly_earnings }}</div>
                        <div class="stat-label">Average Monthly Earnings</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Commission Details -->
        <section class="section">
            <div class="container">
                <div class="section-title">
                    <h2>Simple & Transparent Commissions</h2>
                    <p class="section-subtitle">
                        Earn 10% commission on every 6-month and 1-year plan purchased through your affiliate link
                    </p>
                </div>

                <div class="commission-cards">
                    <div class="commission-card">
                        <div class="commission-header">
                            <div>
                                <h3>6-Month Plan</h3>
                                <p class="commission-price">Customer pays ₹399</p>
                            </div>
                            <span class="icon icon-lg">📈</span>
                        </div>
                        
                        <div class="earning-box">
                            <div class="earning-label">You Earn</div>
                            <div class="earning-amount">₹399</div>
                            <div class="earning-note">per sale</div>
                        </div>

                        <ul class="feature-list">
                            <li class="feature-item">
                                <span class="check-icon">✓</span>
                                <span>Instant commission tracking</span>
                            </li>
                            <!-- <li class="feature-item">
                                <span class="check-icon">✓</span>
                                <span>30-day cookie duration</span>
                            </li>
                            <li class="feature-item">
                                <span class="check-icon">✓</span>
                                <span>Monthly payouts via PayPal</span>
                            </li> -->
                        </ul>
                    </div>

                    <div class="commission-card">
                        <div class="commission-header">
                            <div>
                                <h3>1-Year Plan</h3>
                                <p class="commission-price">Customer pays ₹299</p>
                            </div>
                            <span class="icon icon-lg">📊</span>
                        </div>
                        
                        <div class="earning-box">
                            <div class="earning-label">You Earn</div>
                            <div class="earning-amount">₹299</div>
                            <div class="earning-note">per sale</div>
                        </div>

                        <ul class="feature-list">
                            <li class="feature-item">
                                <span class="check-icon">✓</span>
                                <span>Instant commission tracking</span>
                            </li>
                            <!-- <li class="feature-item">
                                <span class="check-icon">✓</span>
                                <span>30-day cookie duration</span>
                            </li>
                            <li class="feature-item">
                                <span class="check-icon">✓</span>
                                <span>Monthly payouts via PayPal</span>
                            </li> -->
                        </ul>
                    </div>
                </div>

                <div class="calculator-card">
                    <h3 class="calculator-title">Earning Potential Calculator</h3>
                    
                    <div class="calculator-grid">
                        <div class="calculator-item">
                            <div class="calculator-label">5 Sales/Month</div>
                            <div class="calculator-value">₹{{ sale5 }}+</div>
                            <div class="calculator-note">Monthly Income</div>
                        </div>
                        
                        <div class="calculator-item">
                            <div class="calculator-label">10 Sales/Month</div>
                            <div class="calculator-value" style="color: hsl(190, 55%, 75%)">₹{{ sale10 }}+</div>
                            <div class="calculator-note">Monthly Income</div>
                        </div>
                        
                        <div class="calculator-item">
                            <div class="calculator-label">20 Sales/Month</div>
                            <div class="calculator-value" style="color: hsl(340, 65%, 80%)">₹{{ sale20 }}+</div>
                            <div class="calculator-note">Monthly Income</div>
                        </div>
                    </div>

                    <p style="text-align: center; color: hsl(260, 20%, 50%); font-size: 0.875rem; margin-top: 2rem;">
                        Based on average mix of 6-month and 1-year plans
                    </p>
                </div>
            </div>
        </section>

        <!-- How It Works -->
        <section class="section section-gradient">
            <div class="container">
                <div class="section-title">
                    <h2>How It Works</h2>
                    <p class="section-subtitle">
                        Start earning in three simple steps
                    </p>
                </div>

                <div class="steps-container">
                    <div class="step-card">
                        <div class="step-number">1</div>
                        <div class="icon-circle icon-primary" style="margin-top: 2rem;">
                            <span class="icon icon-lg">👤</span>
                        </div>
                        <h3 class="card-title">Sign Up Free</h3>
                        <p class="card-text">Create your affiliate account in minutes. No fees, no hidden costs.</p>
                    </div>

                    <div class="step-card">
                        <div class="step-number">2</div>
                        <div class="icon-circle icon-secondary" style="margin-top: 2rem;">
                            <span class="icon icon-lg">🔗</span>
                        </div>
                        <h3 class="card-title">Share Your Link</h3>
                        <p class="card-text">Promote SpeedySites using your unique affiliate link on social media, blogs, or email.</p>
                    </div>

                    <div class="step-card">
                        <div class="step-number">3</div>
                        <div class="icon-circle icon-accent" style="margin-top: 2rem;">
                            <span class="icon icon-lg">💰</span>
                        </div>
                        <h3 class="card-title">Earn Commissions</h3>
                        <p class="card-text">Get 10% commission on every 6-month and 1-year plan purchase.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Testimonials -->
        <!-- <section class="section">
            <div class="container">
                <div class="section-title">
                    <h2>Success Stories</h2>
                    <p class="section-subtitle">
                        See what our top affiliates are saying
                    </p>
                </div>

                <div class="testimonial-grid">
                    <div class="testimonial-card">
                        <div class="stars">
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                        </div>
                        <div class="quote-icon">"</div>
                        <p class="testimonial-text">
                            "I've been with SpeedySites affiliate program for 6 months and already earned over ₹4,500. 
                            The conversion rate is amazing because the product truly delivers."
                        </p>
                        <div class="testimonial-footer">
                            <div class="avatar"></div>
                            <div class="testimonial-author">
                                <div class="author-name">Sarah Mitchell</div>
                                <div class="author-role">Tech Blogger</div>
                            </div>
                            <div class="testimonial-earning">
                                <div class="earning-highlight">₹4,500+</div>
                                <div class="earning-text">earned</div>
                            </div>
                        </div>
                    </div>

                    <div class="testimonial-card">
                        <div class="stars">
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                        </div>
                        <div class="quote-icon">"</div>
                        <p class="testimonial-text">
                            "Best affiliate program I've joined. The 30-day cookie duration and 10% commission on annual plans 
                            make it incredibly lucrative. My clients love SpeedySites!"
                        </p>
                        <div class="testimonial-footer">
                            <div class="avatar"></div>
                            <div class="testimonial-author">
                                <div class="author-name">Marcus Johnson</div>
                                <div class="author-role">Digital Marketing Consultant</div>
                            </div>
                            <div class="testimonial-earning">
                                <div class="earning-highlight">₹6,200+</div>
                                <div class="earning-text">earned</div>
                            </div>
                        </div>
                    </div>

                    <div class="testimonial-card">
                        <div class="stars">
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                            <span class="star">★</span>
                        </div>
                        <div class="quote-icon">"</div>
                        <p class="testimonial-text">
                            "I recommend SpeedySites to all my clients who need fast websites. The passive income adds up 
                            quickly - it's become a significant revenue stream for my agency."
                        </p>
                        <div class="testimonial-footer">
                            <div class="avatar"></div>
                            <div class="testimonial-author">
                                <div class="author-name">Emily Chen</div>
                                <div class="author-role">Web Design Agency Owner</div>
                            </div>
                            <div class="testimonial-earning">
                                <div class="earning-highlight">₹8,900+</div>
                                <div class="earning-text">earned</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- FAQ -->
        <section class="section section-gradient">
            <div class="container">
                <div class="section-title">
                    <h2>Frequently Asked Questions</h2>
                    <p class="section-subtitle">
                        Everything you need to know about our affiliate program
                    </p>
                </div>

                <div class="faq-container">
                    <div 
                    class="faq-item" 
                    v-for="(faq, index) in faqs" 
                    :key="index" 
                    :class="{ open: openFaq === index }"
                    @click="openFaq = openFaq === index ? null : index"
                    >
                        <div class="faq-question">
                            <span>{{ faq.q }}</span>
                            <span class="faq-icon">▼</span>
                        </div>

                        <div class="faq-answer">
                            {{ faq.a }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Final CTA -->
        <section class="cta-section">
            <div class="container">
                <div class="cta-box">
                    <div class="cta-content">
                        <div class="ss_badge">
                            <span class="icon">✨</span>
                            <span>Limited Time: Join Now</span>
                        </div>

                        <h2 style="font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin-bottom: 1.5rem;">
                            Ready to Start Earning?
                        </h2>
                        
                        <p style="font-size: 1.125rem; opacity: 0.9; margin-bottom: 2.5rem; max-width: 700px; margin-left: auto; margin-right: auto;">
                            Join {{ totalAgentJoined }}+ successful affiliates earning consistent passive income. 
                            Sign up free and get your unique affiliate link in minutes.
                        </p>
                        
                        <div class="button-group">
                            <a href="/affiliate-signup" class="btn" style="background: hsl(260, 35%, 20%); color: hsl(270, 40%, 98%); box-shadow: 0 4px 12px rgba(0,0,0,0.2);">
                                Join Free Today
                                <span>→</span>
                            </a>
                            
                            <!-- <a href="#contact" class="btn btn-outline">
                                Contact Support
                            </a> -->
                        </div>

                        <div class="cta-features">
                            <div class="cta-feature">
                                <div class="dot"></div>
                                <span>Free to join</span>
                            </div>
                            <div class="cta-feature">
                                <div class="dot"></div>
                                <span>No sales quota</span>
                            </div>
                            <div class="cta-feature">
                                <div class="dot"></div>
                                <span>Monthly payouts</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
    </body>
</template>
<script setup>
</script>
<style scoped>
        :root {
            /* Pastel Color Palette */
            --color-background: hsl(270, 40%, 98%);
            --color-foreground: hsl(260, 35%, 20%);
            --color-primary: hsl(260, 65%, 65%);
            --color-primary-foreground: hsl(0, 0%, 100%);
            --color-secondary: hsl(190, 55%, 75%);
            --color-accent: hsl(340, 65%, 80%);
            --color-success: hsl(150, 50%, 70%);
            --color-muted: hsl(270, 35%, 92%);
            --color-muted-foreground: hsl(260, 20%, 50%);
            --color-border: hsl(270, 30%, 88%);
            
            /* Gradients */
            --gradient-hero: linear-gradient(135deg, hsl(260, 65%, 85%), hsl(190, 60%, 85%), hsl(340, 65%, 88%));
            --gradient-section: linear-gradient(180deg, hsl(270, 40%, 98%), hsl(0, 0%, 100%));
            --gradient-card: linear-gradient(135deg, hsl(0, 0%, 100%), hsl(270, 35%, 96%));
            
            /* Shadows */
            --shadow-soft: 0 4px 20px -4px hsl(260, 65%, 65%, 0.15);
            --shadow-glow: 0 0 30px hsl(260, 65%, 75%, 0.3);
        }

        body {
            font-family: 'Inter', system-ui, -apple-system, sans-serif;
            background: hsl(270, 40%, 98%) !important;
            color: hsl(260, 35%, 20%);
            line-height: 1.6;
            overflow-x: hidden;
        }

        /* Hero Section */
        .hero {
            position: relative;
            background: linear-gradient(135deg, hsl(260, 65%, 85%), hsl(190, 60%, 85%), hsl(340, 65%, 88%));;
            padding: 5rem 1rem 8rem;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+');
            opacity: 0.3;
        }

        .hero-content {
            position: relative;
            text-align: center;
            max-width: 1000px;
            margin: 0 auto;
        }

        .ss_badge {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            padding: 0.5rem 1rem;
            border-radius: 9999px;
            margin-bottom: 2rem;
            box-shadow: 0 4px 20px -4px hsl(260, 65%, 65%, 0.15);
            font-size: 0.875rem;
            font-weight: 500;
        }

        .hero h1 {
            font-size: clamp(2rem, 5vw, 4rem);
            font-weight: 800;
            line-height: 1.2;
            margin-bottom: 1.5rem;
        }

        .gradient-text {
            display: block;
            background: linear-gradient(to right, hsl(260, 65%, 65%), hsl(190, 55%, 75%), hsl(340, 65%, 80%));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero p {
            font-size: 1.125rem;
            opacity: 0.9;
            margin-bottom: 2.5rem;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
        }

        .button-group {
            display: flex;
            gap: 1rem;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 4rem;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            border-radius: 1rem;
            font-size: 1.125rem;
            font-weight: 600;
            text-decoration: none;
            border: none;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary {
            background: hsl(260, 65%, 65%);
            color: hsl(0, 0%, 100%);
            box-shadow: 0 0 30px hsl(260, 65%, 75%, 0.3);
        }

        .btn-primary:hover {
            transform: scale(1.05);
            opacity: 0.9;
        }

        .btn-outline {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            color: hsl(260, 35%, 20%);
            border: 2px solid rgba(146, 99, 184, 0.3);
        }

        .btn-outline:hover {
            background: white;
        }

        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            max-width: 900px;
            margin: 0 auto;
        }

        .stat-card {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(10px);
            padding: 1.5rem;
            border-radius: 1.5rem;
            box-shadow: 0 4px 20px -4px hsl(260, 65%, 65%, 0.15);
        }

        .stat-value {
            font-size: 2rem;
            font-weight: 700;
            color: hsl(260, 65%, 65%);
            margin-bottom: 0.5rem;
        }

        .stat-label {
            font-size: 0.875rem;
            color: hsl(260, 20%, 50%);
        }

        /* Stats Section */
        .section {
            padding: 5rem 1rem;
        }

        .section-gradient {
            background: linear-gradient(180deg, hsl(270, 40%, 98%), hsl(0, 0%, 100%));
        }

        .section-title {
            text-align: center;
            margin-bottom: 1rem;
        }

        .section-title h2 {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 800;
            margin-bottom: 1rem;
        }

        .section-subtitle {
            font-size: 1.125rem;
            color: hsl(260, 20%, 50%);
            max-width: 700px;
            margin: 0 auto;
            text-align: center;
            margin-bottom: 4rem;
        }

        .feature-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }

        .card {
            background: linear-gradient(135deg, hsl(0, 0%, 100%), hsl(270, 35%, 96%));
            padding: 2rem;
            border-radius: 1.5rem;
            box-shadow: 0 4px 20px -4px hsl(260, 65%, 65%, 0.15);
            border: 2px solid hsl(270, 30%, 88%);
            transition: all 0.3s ease;
        }

        .card:hover {
            transform: scale(1.05);
            box-shadow: 0 0 30px hsl(260, 65%, 75%, 0.3);
        }

        .icon-circle {
            width: 4rem;
            height: 4rem;
            border-radius: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1.5rem;
            transition: all 0.3s ease;
        }

        .card:hover .icon-circle {
            transform: scale(1.1);
        }

        .icon-primary { background: rgba(146, 99, 184, 0.2); }
        .icon-secondary { background: rgba(117, 192, 202, 0.2); }
        .icon-accent { background: rgba(230, 153, 179, 0.2); }
        .icon-success { background: rgba(137, 207, 161, 0.2); }

        .card-title {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            text-align: center;
        }

        .card-text {
            color: hsl(260, 20%, 50%);
            text-align: center;
        }

        /* Commission Cards */
        .commission-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
            margin-bottom: 4rem;
        }

        .commission-card {
            background: linear-gradient(135deg, hsl(0, 0%, 100%), hsl(270, 35%, 96%));
            padding: 2rem;
            border-radius: 1.5rem;
            box-shadow: 0 4px 20px -4px hsl(260, 65%, 65%, 0.15);
            border: 2px solid hsl(270, 30%, 88%);
            transition: all 0.3s ease;
        }

        .commission-card:hover {
            box-shadow: 0 0 30px hsl(260, 65%, 75%, 0.3);
        }

        .commission-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1.5rem;
        }

        .commission-header h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .commission-price {
            color: hsl(260, 20%, 50%);
        }

        .earning-box {
            background: rgba(146, 99, 184, 0.1);
            padding: 1.5rem;
            border-radius: 1rem;
            margin-bottom: 1.5rem;
        }

        .earning-label {
            font-size: 0.875rem;
            color: hsl(260, 20%, 50%);
            margin-bottom: 0.5rem;
        }

        .earning-amount {
            font-size: 2.5rem;
            font-weight: 700;
            color: hsl(260, 65%, 65%);
        }

        .earning-note {
            font-size: 0.875rem;
            color: hsl(260, 20%, 50%);
            margin-top: 0.5rem;
        }

        .feature-list {
            list-style: none;
        }

        .feature-item {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 0.75rem;
            font-size: 0.875rem;
        }

        .check-icon {
            color: hsl(150, 50%, 70%);
            flex-shrink: 0;
        }

        /* Calculator */
        .calculator-card {
            background: linear-gradient(135deg, rgba(146, 99, 184, 0.1), rgba(117, 192, 202, 0.1), rgba(230, 153, 179, 0.1));
            padding: 3rem 2rem;
            border-radius: 2rem;
            box-shadow: 0 0 30px hsl(260, 65%, 75%, 0.3);
            border: 2px solid rgba(146, 99, 184, 0.3);
        }

        .calculator-title {
            font-size: 2rem;
            font-weight: 700;
            text-align: center;
            margin-bottom: 2rem;
        }

        .calculator-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
        }

        .calculator-item {
            text-align: center;
        }

        .calculator-label {
            font-size: 0.875rem;
            color: hsl(260, 20%, 50%);
            margin-bottom: 0.5rem;
        }

        .calculator-value {
            font-size: 2rem;
            font-weight: 700;
            color: hsl(260, 65%, 65%);
            margin-bottom: 0.25rem;
        }

        .calculator-note {
            font-size: 0.75rem;
            color: hsl(260, 20%, 50%);
        }

        /* How It Works */
        .steps-container {
            position: relative;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
        }

        .step-card {
            position: relative;
            background: linear-gradient(135deg, hsl(0, 0%, 100%), hsl(270, 35%, 96%));
            padding: 2rem;
            border-radius: 1.5rem;
            box-shadow: 0 4px 20px -4px hsl(260, 65%, 65%, 0.15);
            border: 2px solid hsl(270, 30%, 88%);
            text-align: center;
            transition: all 0.3s ease;
        }

        .step-card:hover {
            transform: scale(1.05);
        }

        .step-number {
            position: absolute;
            top: 2rem;
            left: 50%;
            transform: translateX(-50%);
            width: 3rem;
            height: 3rem;
            background: white;
            border: 4px solid hsl(270, 30%, 88%);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 700;
            box-shadow: 0 4px 20px -4px hsl(260, 65%, 65%, 0.15);
            z-index: 10;
        }

        /* Testimonials */
        .testimonial-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 2rem;
        }

        .testimonial-card {
            background: linear-gradient(135deg, hsl(0, 0%, 100%), hsl(270, 35%, 96%));
            padding: 1.5rem;
            border-radius: 1.5rem;
            box-shadow: 0 4px 20px -4px hsl(260, 65%, 65%, 0.15);
            border: 2px solid hsl(270, 30%, 88%);
            transition: all 0.3s ease;
        }

        .testimonial-card:hover {
            box-shadow: 0 0 30px hsl(260, 65%, 75%, 0.3);
        }

        .stars {
            display: flex;
            gap: 0.25rem;
            margin-bottom: 1rem;
        }

        .star {
            color: hsl(340, 65%, 80%);
            font-size: 1.25rem;
        }

        .quote-icon {
            color: rgba(146, 99, 184, 0.3);
            font-size: 2rem;
            margin-bottom: 1rem;
        }

        .testimonial-text {
            margin-bottom: 1.5rem;
            line-height: 1.7;
        }

        .testimonial-footer {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding-top: 1rem;
            border-top: 1px solid hsl(270, 30%, 88%);
        }

        .avatar {
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            background: hsl(270, 35%, 92%);
        }

        .testimonial-author {
            flex: 1;
        }

        .author-name {
            font-weight: 600;
            margin-bottom: 0.25rem;
        }

        .author-role {
            font-size: 0.875rem;
            color: hsl(260, 20%, 50%);
        }

        .testimonial-earning {
            text-align: right;
        }

        .earning-highlight {
            font-weight: 700;
            color: hsl(150, 50%, 70%);
        }

        .earning-text {
            font-size: 0.75rem;
            color: hsl(260, 20%, 50%);
        }

        /* FAQ */
        .faq-container {
            max-width: 900px;
            margin: 0 auto;
        }

        .faq-item {
            background: linear-gradient(135deg, hsl(0, 0%, 100%), hsl(270, 35%, 96%));
            border: 2px solid hsl(270, 30%, 88%);
            border-radius: 1rem;
            padding: 1.5rem;
            margin-bottom: 1rem;
            box-shadow: 0 4px 20px -4px hsl(260, 65%, 65%, 0.15);
        }

        .faq-question {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-weight: 600;
            cursor: pointer;
            user-select: none;
        }

        .faq-icon {
            transition: transform 0.3s ease;
        }

        .faq-item.active .faq-icon {
            transform: rotate(180deg);
        }

        .faq-answer {
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease;
            color: hsl(260, 20%, 50%);
            padding-top: 0;
        }

        .faq-item.active .faq-answer {
            max-height: 500px;
            padding-top: 1rem;
        }

        /* Final CTA */
        .cta-section {
            padding: 70px 0px 170px 0px;
        }

        .cta-box {
            position: relative;
            background: linear-gradient(135deg, hsl(260, 65%, 85%), hsl(190, 60%, 85%), hsl(340, 65%, 88%));;
            border-radius: 3rem;
            padding: 4rem 2rem;
            box-shadow: 0 0 30px hsl(260, 65%, 75%, 0.3);
            overflow: hidden;
            text-align: center;
        }

        .cta-box::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+');
            opacity: 0.3;
        }

        .cta-content {
            position: relative;
            max-width: 800px;
            margin: 0 auto;
        }

        .cta-features {
            display: flex;
            justify-content: center;
            gap: 2rem;
            flex-wrap: wrap;
            margin-top: 3rem;
            font-size: 0.875rem;
            opacity: 0.8;
        }

        .cta-feature {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .dot {
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            background: hsl(150, 50%, 70%);
        }

        /* Responsive */
        @media (max-width: 768px) {
            .hero {
                padding: 3rem 1rem 4rem;
            }

            .section {
                padding: 3rem 1rem;
            }

            .commission-cards,
            .feature-grid,
            .testimonial-grid {
                grid-template-columns: 1fr;
            }

            .btn {
                width: 100%;
                justify-content: center;
            }
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .animate-fade-in {
            animation: fadeInUp 0.6s ease-out;
        }

        /* Icons using Unicode */
        .icon {
            display: inline-block;
            font-size: 1.5rem;
        }

        .icon-lg {
            font-size: 2rem;
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
.subscription-form-side .btn {
    --c: #1d2b64;
    color: #1d2b64;
    font-size: 16px;
    border: .2em solid var(--c);
    border-radius: .5em;
    padding: 10px 20px 8px;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: .1em;
    text-align: center;
    position: relative;
    overflow: hidden;
    z-index: 1;
    transition: .5s;
    margin: 0;
    border-radius: 5px !important;
}
.subscription-form-side .btn:hover {
    color: #fff;
}
.subscription-heading {
    margin-bottom: 0px;
    font-size: 31px !important;
    line-height: 35px !important;
    font-weight: 700 !important;
    color: #1d2b64;
    display: flex;
    align-items: center;
}
.add-listing .btn {
    --c: #1d2b64;
    color: #fff;
    background-color: #1d2b64;
    font-size: 16px;
    border: .2em solid #1d2b64;
    padding: 10px 10px 8px;
    font-weight: 700;
    text-align: center;
    position: relative;
    overflow: hidden;
    z-index: 1;
    margin: 0;
    border-radius: 5px !important;
    transition: 0.3s;
}
.add-listing .btn:hover {
    color: #1d2b64;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  font-size: 1.1rem;
  font-weight: 600;
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height .3s ease;
  color: hsl(260, 20%, 50%);
}

.faq-item.open .faq-answer {
  max-height: 200px;
}

.faq-icon {
  transition: transform .3s ease;
}

.faq-item.open .faq-icon {
  transform: rotate(180deg);
}

</style>