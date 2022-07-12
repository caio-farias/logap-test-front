import React from 'react'
import './index.scss'

const FeedbackText = ({ errorMessage, successMessage }: { errorMessage: string; successMessage: string }) => {
	if (errorMessage.length > 0) return <span className="error-text">{errorMessage}</span>
	if (successMessage.length > 0) return <span className="success-text">{successMessage}</span>
	return <span></span>
}

export default FeedbackText
