import * as React from 'react'
import Feedbacks from './components/Feedbacks/Feedbacks'
import { AccountContext } from '../../context/AccountProvider'
import { FeedbacksContext, FeedbacksT } from '../../context/FeedbackProvider'
import MainLayout from '../../layouts/MainLayout'
import NoFeedbackFound from './components/NoFeedbackFound'

interface Props {
  feedbackFor: 'me' | 'team'
}
const ReviewFeedback = ({ feedbackFor }: Props) => {
  const feedbackContext = React.useContext(FeedbacksContext)
  const currentUser = React.useContext(AccountContext)

  let feedbacks: FeedbacksT[] = []
  let title = ''
  let subtitle = ''

  console.log(feedbackContext)
  if (!feedbackContext) return <></>

  if (feedbackFor === 'me') {
    feedbacks = feedbackContext.filter((e) => e.userTo === currentUser?.id)
    title = 'My feedback'
    subtitle = 'Feedback received'
  } else if (feedbackFor === 'team') {
    feedbacks = feedbackContext.filter((e) => e.userFrom === currentUser?.id)
    title = 'Team feedback'
    subtitle = 'Feedback given'
  }

  return (
    <MainLayout loggedIn>
      {feedbacks.length > 0 ? (
        <Feedbacks
          feedbackFor={feedbackFor}
          feedbacks={feedbacks}
          title={title}
          subtitle={subtitle}
        />
      ) : (
        <NoFeedbackFound />
      )}
    </MainLayout>
  )
}

export default ReviewFeedback
