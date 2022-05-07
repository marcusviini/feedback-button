import { useState } from 'react';

import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

import  bugImageUrl from '../../assets/bug.svg';
import  ideaImageUrl from '../../assets/idea.svg';
import  otherImageUrl from '../../assets/other.svg';



export const feedbackTypes = {
  BUG:{
    title: 'Problema',
    image:{
      source:bugImageUrl,
      alt:'Imagem de um inseto'
    }
  },
  IDEA:{
    title: 'Ideia',
    image:{
      source: ideaImageUrl,
      alt:'Imagem de uma lampada'
    }
  },
  OTHER:{
    title: 'Outro',
    image:{
      source: otherImageUrl,
      alt:'Imagem de uma nuvem de pensamento'
    }
  }
}

export type FeedbackType = keyof typeof feedbackTypes;


export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false)

  function handleRestarFeedBack() {
    setFeedbackSent(false)
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {
        feedbackSent ? (
          <FeedbackSuccessStep onFeedBackRestartRequested={handleRestarFeedBack} />
        ):(
          <>
            {!feedbackType ? (
            
            <FeedbackTypeStep onFeedBackTypeChanged={setFeedbackType}  />
            
            ) : (

              <FeedbackContentStep 
                feedbackType={feedbackType}
                onFeedBackRestartRequested={handleRestarFeedBack}
                onFeedbackSent={()=>setFeedbackSent(true)}
              />
          
            )}
          </>
        )
      }
    </div>
  )
}