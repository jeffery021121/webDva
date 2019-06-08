import request from '../utils/request'

export function query() {
	return request('/api/users')
}
export function postInfor() {
	return request('http://127.0.0.1:7001/ddd', {
		contentType: 'json',
		method: 'POST',
	})
}
export function getInfor() {
	return request('http://127.0.0.1:7001/ccc')
}
