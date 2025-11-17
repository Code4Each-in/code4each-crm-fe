import { requests } from '.'
import config from '/config';
const baseUrl = config.CRM_API_URL + '/api';
const WordpressService = {
  registerUser: (data) => {
    return requests(baseUrl).post(`/register`, data)
  },
  loginUser: (data) => {
    return requests(baseUrl).post(`/login`, data)
  },
  subscriptionPayment: (data) => {
    return requests(baseUrl).post(`/subscriptionPayment`, data)
  },
  fetchDashboardData: (data) => {
    return requests(baseUrl).get(`/dashboard`)
  },
  resendLink: (data) => {
    return requests(baseUrl).get(`/email/resend`)
  },
  agencyDetails: (data, headers) => {
    return requests(baseUrl).post(`/agency-website-details`, data, { headers })
  },
  getCategoryOption: () => {
    return requests(baseUrl).get(`/get-website-categories`)
  },
  regenerateWebsite: (data) => {
    return requests(baseUrl).post(`/components/regenerate`, data)
  },
  getWebsiteTemplates: () => {
    return requests(baseUrl).get(`/website-templates`)
  },
  getGlobalColors: (data) => {
    return requests(baseUrl).get(`/get-components-global-colors`, {
      params: data
    },)
  },
  updateGlobalColors: (data) => {
    return requests(baseUrl).post(`/update-global-colors`, data)
  },
  getGlobalVariables: (data) => {
    return requests(baseUrl).get(`/global-variables`, {
      params: data
    },)
  },
  Components: {
    getActiveComponents: (data) => {
      return requests(baseUrl).get(`/fetch-active-components-detail`, {
        params: data
      },)
    },
    getAllComponents: (data) => {
      return requests(baseUrl).get(`/fetch-components`, {
        params: data
      },)
    },
    changeComponent: (data) => {
      return requests(baseUrl).post(`/change-component`, data)
    },
    changeComponentPosition: (data) => {
      return requests(baseUrl).post(`/update-component-position`, data)
    },
    getComponentsToAdd: (data) => {
      return requests(baseUrl).get(`/get-components`, {
        params: data
      })
    },
    addComponent: (data) => {
      return requests(baseUrl).post(`/add-new-section`, data)
    },
  },
  CustomizeColors: {
    getDefaulColors: (data) => {
      return requests(baseUrl).get(`/color-combinations`, {
        params: data
      },)
    },
    changeDefaulColors: (data) => {
      return requests(baseUrl).post(`/update-color-combination`, data)
    },
  },
  CustomizeFonts: {
    getDefaulFonts: (data) => {
      return requests(baseUrl).get(`/get-fonts`, {
        params: data
      },)
    },
    changeDefaulFonts: (data) => {
      return requests(baseUrl).post(`/change-font-family`, data)
    },
  },
  WebsiteSettings: {
    getSiteDetail: (data) => {
      return requests(baseUrl).get(`/settings`, {
        params: data
      },)
    },
    updateSiteSettings: (data, headers) => {
      return requests(baseUrl).post(`/update-settings`, data, { headers })
    },
  },
  ResetPassword: {
    resetPassword: (data) => {
      return requests(baseUrl).post(`/reset-password`, data)
    },
    forgotPassword: (data) => {
      return requests(baseUrl).post(`/forgot-password`, data)
    },
  },

  ComponentsFormField: {
    getComponentsFormField: (data) => {
      return requests(baseUrl).get(`/get-component-form-fields`, {
        params: data
      },)
    },
    updateComponentsFormField: (data) => {
      return requests(baseUrl).post(`/update-component-form-fields`, data)
    },

    updateComponentImages: (data, headers) => {
      return requests(baseUrl).post(`/upload-images`, data, { headers })
    },
    getComponentsImages: (data) => {
      return requests(baseUrl).get(`/uploaded-images`, {
        params: data
      },)
    },
    deleteComponentImage: (data) => {
      return requests(baseUrl).delete(`/delete-uploaded-images`, {
        params: data
      })
    },
  },

  VerifyEmail: {
    verifyEmail: (data, id) => {
      return requests(baseUrl).get(`/email/verify/${id}`, {
        params: data, // Add query parameters as an object
      })
    },

  },

  GoogleLogin: {
    googleLogin: (data) => {
      return requests(baseUrl).get(`/auth/google`)
    },
    googleSignUp: (data) => {
      return requests(baseUrl).get(`/auth/google/register`, {
        params: data,
      })
    },
  },

  FeedBack: {
    submitFeedback: (data) => {
      return requests(baseUrl).post(`/feedback`, data)
    }
  },

  SocialLinks: {
    postSocialLinks: (data) => {
      return requests(baseUrl).post(`/update-social-links`, data)
    },
    getSocialLinks: (data) => {
      return requests(baseUrl).get(`/get-social-links`, {
        params: data
      },)
    },
  },

  Menus: {
    addMenu: (data) => {
      return requests(baseUrl).post(`/add-site-menus`, data)
    },
    editMenu: (data) => {
      return requests(baseUrl).post(`/update-site-menu`, data)
    },
    getMenus: (data) => {
      return requests(baseUrl).get(`/get-site-menus`, {
        params: data
      },)
    },
    deleteMenu: (data) => {
      return requests(baseUrl).delete(`/delete-site-menu`, {
        params: data
      })
    },
    changePosition: (data) => {
      return requests(baseUrl).post(`/change-menu-position`, data)
    },
  },

  Payment: {
    fetchPlans: (data) => {
      return requests(baseUrl).get(`/get-plans`)
    },
    createOrder: (data) => {
      return requests(baseUrl).post(`/create-order`, data)
    },
  },

  FormBuilder: {
    fetchForms: (data) => {
      return requests(baseUrl).get('/get-forms', { params: data });
    },
    submitCustomFields: (data) => {
      return requests(baseUrl).post(`/create-customfromfields`, data)
    },
    updateFormStatus: (data) => {
      return requests(baseUrl).post(`/update-form-status`, data)
    },
    deleteForm: (data) => {
      return requests(baseUrl).delete(`/delete-form`, {
        params: data
      })
    },
    updateCustomFields: (data) => {
      return requests(baseUrl).post(`/update-customfields`, data)
    },
    getFormSubmissions: (data) => {
      return requests(baseUrl).get('/get-form-submissions', { params: data });
    },
    // createEmailTemplate: (data) => {
    //   return requests(baseUrl).post(`/create-email-template`, data)
    // },
    getSettingEmailOptions: (data) => {
      return requests(baseUrl).get('/get-setting-email-options', { params: data });
    }, 
    updateSettingEmailOptions: (data) => {
      return requests(baseUrl).post(`/update-setting-email-options`, data)
    },
  },

  SEOKeywords: {
    saveSEOKeywords: (data) => {
      return requests(baseUrl).post(`/save-seo-keywords`, data)
    }
  },

  TemplatePages: {
    getTemplatePage: (data) => {
      return requests(baseUrl).get('/get-template-pages', { params: data });
    },
    saveTemplatePage: (data) => {
      return requests(baseUrl).post(`/add-template-pages`, data)
    },
    updateTemplatePage: (data) => {
      return requests(baseUrl).post(`/update-template-pages`, data)
    },
    deleteTemplatePage: (data) => {
      return requests(baseUrl).delete(`/delete-template-pages`, { params: data });
    },
  },

  CustomComponentsAndFieldValues: {
    getCustomComponentsAndFieldValues: (data) => {
      return requests(baseUrl).get('/get-custom-components-and-fieldvalues', { params: data });
    },
    saveCustomComponentsFieldValues: (data) => {
      if (data instanceof FormData) {
        return requests(baseUrl).post(`/add-custom-components-field-values`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      return requests(baseUrl).post(`/add-custom-components-field-values`, data)
    },
    deleteCustomComponent: (data) => {
      return requests(baseUrl).delete(`/delete-custom-components`, { params: data });
    },
    getComponentsByType: (data) => {
      return requests(baseUrl).get('/get-custom-components-by-type', { params: data });
    },
    replaceCustomComponent: (data) => {
      return requests(baseUrl).post(`/replace-custom-component`, data)
    },
    getComponentForNewSection: (data) => {
      return requests(baseUrl).get('/get-custom-components-for-new-section', { params: data });
    },
    addNewSection: (data) => {
      return requests(baseUrl).post(`/add-new-custom-component-section`, data)
    },
    addGlobalSwitchValue: (data) => {
      return requests(baseUrl).post(`/add-global-switch-value`, data)
    },
    addForm: (data) => {
      return requests(baseUrl).post(`/add-form`, data)
    },
  },

  BillingDetails :{
    userBillingDetails: (data) => {
      return requests(baseUrl).post(`/add-userbillingdetails`, data)
    }
  },

  ReferredUsers: {
    getReferralUsersData: (data) => {
      return requests(baseUrl).get('/get-referred-users', { params: data });
    },
    trackClick: (data) => {
      return requests(baseUrl).post(`/track-referral-click`, data)
    },
    fetchTotalReferredUsers: (data) => {
      return requests(baseUrl).get('/get-total-referred-users', { params: data });
    },
    fetchTotalEarnings: (data) => {
      console.log("Fetching total earnings with data:", data);
      return requests(baseUrl).get('/get-total-earnings', { params: data });
    },
    fetchTotalWithdrawalAmount: (data) => {
      return requests(baseUrl).get('/get-total-withdrawal-amount', { params: data });
    },
    fetchMonthlyEarnings: (data) => {
      return requests(baseUrl).get('/get-monthly-earnings', { params: data });
    },
    fetchWithdrawalHistory: (data) => {
      return requests(baseUrl).get('/get-withdrawal-history', { params: data });
    },
    fetchUserPlanHistory: (data) => {
      return requests(baseUrl).get('/get-referred-users-plan-history', { params: data });
    }
  },

  AffiliateDetails: {
    fetchAffiliateStats: (data) => {
      return requests(baseUrl).get('/get-affiliate-stats', { params: data });
    },
    sendWithdrawalData: (data) => {
      return requests(baseUrl).post('/post-withdrawal-data', data);
    },
    fetchAffiliateAccountDetails: (data) =>{
      return requests(baseUrl).get('/get-affiliate-account-details', { params: data });
    }
  }

}
export default WordpressService