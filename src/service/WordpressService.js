import { requests } from '.'
const baseUrl = 'https://reqres.in/api';
const WordpressService = {
  registerUser: (data) => {
    return requests(baseUrl).post(`/register`, data)
  },
  loginUser: (data) => {
    return requests(baseUrl).post(`/login`, data)
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
  getGlobalColors: () => {
    return requests(baseUrl).get(`/get-global-colors-wordpress-components`)
  },
}
export default WordpressService