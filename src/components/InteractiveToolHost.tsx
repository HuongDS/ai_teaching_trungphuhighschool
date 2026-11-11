'use client';

import React from 'react';
import { Lesson } from '@/data/curriculum';
import AuthorGame from './interactive/AuthorGame';
import AiClassifier from './interactive/AiClassifier';
import SuperpowersDemo from './interactive/SuperpowersDemo';
import PromptSurgeon from './interactive/PromptSurgeon';
import SocraticSimulator from './interactive/SocraticSimulator';
import HallucinationDetective from './interactive/HallucinationDetective';
import RoleplayLiterature from './interactive/RoleplayLiterature';
import WritingClinic from './interactive/WritingClinic';
import QuizActiveRecall from './interactive/QuizActiveRecall';
import SlideComparison from './interactive/SlideComparison';
import CareerOrientationMap from './interactive/CareerOrientationMap';
import FinalProjectGuide from './interactive/FinalProjectGuide';
import RubricProclamation from './interactive/RubricProclamation';

interface InteractiveToolHostProps {
  lesson: Lesson;
}

export default function InteractiveToolHost({ lesson }: InteractiveToolHostProps) {
  switch (lesson.interactiveType) {
    case 'author-game':
      return (
        <div className="space-y-6">
          <AuthorGame />
          <AiClassifier />
        </div>
      );
    case 'superpowers-demo':
      return <SuperpowersDemo />;
    case 'prompt-surgeon':
      return <PromptSurgeon />;
    case 'socratic-sim':
      return <SocraticSimulator />;
    case 'hallucination-detect':
      return <HallucinationDetective />;
    case 'roleplay-lit':
      return <RoleplayLiterature />;
    case 'writing-clinic':
      return <WritingClinic />;
    case 'quiz-generator':
      return <QuizActiveRecall />;
    case 'slide-compare':
      return <SlideComparison />;
    case 'career-map':
      return <CareerOrientationMap />;
    case 'final-project-guide':
      return <FinalProjectGuide />;
    case 'rubric-proclamation':
      return <RubricProclamation />;
    default:
      return null;
  }
}
