import axios from 'axios'

const baseURL = process.env.REACT_APP_API_URL
const api = axios.create({ baseURL })

api.interceptors.request.use((config) => {
	const headers = { ...config.headers }

	headers['Access-Control-Allow-Origin'] = '*'

	headers['Content-Type'] = 'application/json'

	return { ...config, headers }
})

export default api
