import * as React from 'react'

export interface FeedbacksT {
  userFrom: string
  userTo: string
  [key: string]:
    | {
        feedbackType: string
        answer: string | number
      }
    | string
  // feedbacks: {
  //   period: {
  //     userTo: string;
  //     userFrom: string;
  //     questions : {
  //       id: string;
  //       answer: string;
  //     }
  //   }
  // }
}

type DispatchFeedbacksContext = any

export const DispatchFeedbackContext =
  React.createContext<DispatchFeedbacksContext | null>(null)
export const FeedbacksContext = React.createContext<FeedbacksT[] | null>(null)

type SetFeedbacks = {
  action: 'add'
  payload: FeedbacksT[]
}

const reducer = (
  state: FeedbacksT[] | null,
  update: SetFeedbacks,
): FeedbacksT[] | null => {
  if (update.action === 'add') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }): any => {
  const [state, dispatch] = React.useReducer(reducer, [])
  console.log('feedbacks', state)

  return (
    <DispatchFeedbackContext.Provider value={dispatch}>
      <FeedbacksContext.Provider value={state}>
        {children}
      </FeedbacksContext.Provider>
    </DispatchFeedbackContext.Provider>
  )
}

export default UIProvider
