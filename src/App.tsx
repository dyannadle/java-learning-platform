import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LearningPath } from './pages/LearningPath';
import { ProjectsGallery } from './pages/ProjectsGallery';
import { ProjectDetail } from './pages/ProjectDetail';
import { CodePlayground } from './pages/CodePlayground';
import { Leaderboard } from './pages/Leaderboard';
import { Roadmap } from './pages/Roadmap';
import { Glossary } from './pages/Glossary';
import { ConceptDetail } from './pages/ConceptDetail';

import { AuthProvider } from './context/AuthContext';
import { ModuleGuard } from './components/layout/ModuleGuard';

// Lazy Load Modules to improve Site Performance
const ModuleOneIntro = React.lazy(() => import('./modules/ModuleOneIntro').then(module => ({ default: module.ModuleOneIntro })));
const ModuleTwoVariables = React.lazy(() => import('./modules/ModuleTwoVariables').then(module => ({ default: module.ModuleTwoVariables })));
const ModuleThreeOOP = React.lazy(() => import('./modules/ModuleThreeOOP').then(module => ({ default: module.ModuleThreeOOP })));
const ModuleFourCollections = React.lazy(() => import('./modules/ModuleFourCollections').then(module => ({ default: module.ModuleFourCollections })));
const ModuleFiveControlFlow = React.lazy(() => import('./modules/ModuleFiveControlFlow').then(module => ({ default: module.ModuleFiveControlFlow })));
const ModuleSixExceptions = React.lazy(() => import('./modules/ModuleSixExceptions').then(module => ({ default: module.ModuleSixExceptions })));
const ModuleSevenStreams = React.lazy(() => import('./modules/ModuleSevenStreams').then(module => ({ default: module.ModuleSevenStreams })));
const ModuleEightConcurrency = React.lazy(() => import('./modules/ModuleEightConcurrency').then(module => ({ default: module.ModuleEightConcurrency })));
const ModuleNineIO = React.lazy(() => import('./modules/ModuleNineIO').then(module => ({ default: module.ModuleNineIO })));
const ModuleTenGenerics = React.lazy(() => import('./modules/ModuleTenGenerics').then(module => ({ default: module.ModuleTenGenerics })));
const ModuleElevenPatterns = React.lazy(() => import('./modules/ModuleElevenPatterns').then(module => ({ default: module.ModuleElevenPatterns })));
const ModuleTwelveSpringCore = React.lazy(() => import('./modules/ModuleTwelveSpringCore').then(module => ({ default: module.ModuleTwelveSpringCore })));
const ModuleThirteenREST = React.lazy(() => import('./modules/ModuleThirteenREST').then(module => ({ default: module.ModuleThirteenREST })));
const ModuleFourteenJPA = React.lazy(() => import('./modules/ModuleFourteenJPA').then(module => ({ default: module.ModuleFourteenJPA })));
const ModuleFifteenSecurity = React.lazy(() => import('./modules/ModuleFifteenSecurity').then(module => ({ default: module.ModuleFifteenSecurity })));
const ModuleSixteenTesting = React.lazy(() => import('./modules/ModuleSixteenTesting').then(module => ({ default: module.ModuleSixteenTesting })));
const ModuleSeventeenMicroservices = React.lazy(() => import('./modules/ModuleSeventeenMicroservices').then(module => ({ default: module.ModuleSeventeenMicroservices })));
const ModuleEighteenEvents = React.lazy(() => import('./modules/ModuleEighteenEvents').then(module => ({ default: module.ModuleEighteenEvents })));
const ModuleNineteenDocker = React.lazy(() => import('./modules/ModuleNineteenDocker').then(module => ({ default: module.ModuleNineteenDocker })));
const ModuleTwentyKubernetes = React.lazy(() => import('./modules/ModuleTwentyKubernetes').then(module => ({ default: module.ModuleTwentyKubernetes })));
const ModuleTwentyOneReactive = React.lazy(() => import('./modules/ModuleTwentyOneReactive').then(module => ({ default: module.ModuleTwentyOneReactive })));
const ModuleTwentyTwoGraphQL = React.lazy(() => import('./modules/ModuleTwentyTwoGraphQL').then(module => ({ default: module.ModuleTwentyTwoGraphQL })));
const ModuleTwentyThreeJVM = React.lazy(() => import('./modules/ModuleTwentyThreeJVM').then(module => ({ default: module.ModuleTwentyThreeJVM })));
const ModuleTwentyFourLocking = React.lazy(() => import('./modules/ModuleTwentyFourLocking').then(module => ({ default: module.ModuleTwentyFourLocking })));
const ModuleTwentyFivePerformance = React.lazy(() => import('./modules/ModuleTwentyFivePerformance').then(module => ({ default: module.ModuleTwentyFivePerformance })));
const ModuleTwentySixModern = React.lazy(() => import('./modules/ModuleTwentySixModern').then(module => ({ default: module.ModuleTwentySixModern })));
const ModuleTwentySevenSystemDesign = React.lazy(() => import('./modules/ModuleTwentySevenSystemDesign').then(module => ({ default: module.ModuleTwentySevenSystemDesign })));

// Loading Spinner for Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen bg-slate-950 text-slate-500">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<LandingPage />} />

              <Route path="/learn" element={<LearningPath />} />
              <Route path="/learn/module-1" element={<ModuleGuard moduleId={1}><ModuleOneIntro /></ModuleGuard>} />
              <Route path="/learn/module-2" element={<ModuleGuard moduleId={2}><ModuleTwoVariables /></ModuleGuard>} />
              <Route path="/learn/module-3" element={<ModuleGuard moduleId={3}><ModuleThreeOOP /></ModuleGuard>} />
              <Route path="/learn/module-4" element={<ModuleGuard moduleId={4}><ModuleFourCollections /></ModuleGuard>} />
              <Route path="/learn/module-5" element={<ModuleGuard moduleId={5}><ModuleFiveControlFlow /></ModuleGuard>} />
              <Route path="/learn/module-6" element={<ModuleGuard moduleId={6}><ModuleSixExceptions /></ModuleGuard>} />
              <Route path="/learn/module-7" element={<ModuleGuard moduleId={7}><ModuleSevenStreams /></ModuleGuard>} />
              <Route path="/learn/module-8" element={<ModuleGuard moduleId={8}><ModuleEightConcurrency /></ModuleGuard>} />
              <Route path="/learn/module-9" element={<ModuleGuard moduleId={9}><ModuleNineIO /></ModuleGuard>} />
              <Route path="/learn/module-10" element={<ModuleGuard moduleId={10}><ModuleTenGenerics /></ModuleGuard>} />
              <Route path="/learn/module-11" element={<ModuleGuard moduleId={11}><ModuleElevenPatterns /></ModuleGuard>} />
              <Route path="/learn/module-12" element={<ModuleGuard moduleId={12}><ModuleTwelveSpringCore /></ModuleGuard>} />
              <Route path="/learn/module-13" element={<ModuleGuard moduleId={13}><ModuleThirteenREST /></ModuleGuard>} />
              <Route path="/learn/module-14" element={<ModuleGuard moduleId={14}><ModuleFourteenJPA /></ModuleGuard>} />
              <Route path="/learn/module-15" element={<ModuleGuard moduleId={15}><ModuleFifteenSecurity /></ModuleGuard>} />
              <Route path="/learn/module-16" element={<ModuleGuard moduleId={16}><ModuleSixteenTesting /></ModuleGuard>} />
              <Route path="/learn/module-17" element={<ModuleGuard moduleId={17}><ModuleSeventeenMicroservices /></ModuleGuard>} />
              <Route path="/learn/module-18" element={<ModuleGuard moduleId={18}><ModuleEighteenEvents /></ModuleGuard>} />
              <Route path="/learn/module-19" element={<ModuleGuard moduleId={19}><ModuleNineteenDocker /></ModuleGuard>} />
              <Route path="/learn/module-20" element={<ModuleGuard moduleId={20}><ModuleTwentyKubernetes /></ModuleGuard>} />
              <Route path="/learn/module-21" element={<ModuleGuard moduleId={21}><ModuleTwentyOneReactive /></ModuleGuard>} />
              <Route path="/learn/module-22" element={<ModuleGuard moduleId={22}><ModuleTwentyTwoGraphQL /></ModuleGuard>} />
              <Route path="/learn/module-23" element={<ModuleGuard moduleId={23}><ModuleTwentyThreeJVM /></ModuleGuard>} />
              <Route path="/learn/module-24" element={<ModuleGuard moduleId={24}><ModuleTwentyFourLocking /></ModuleGuard>} />
              <Route path="/learn/module-25" element={<ModuleGuard moduleId={25}><ModuleTwentyFivePerformance /></ModuleGuard>} />
              <Route path="/learn/module-26" element={<ModuleGuard moduleId={26}><ModuleTwentySixModern /></ModuleGuard>} />
              <Route path="/learn/module-27" element={<ModuleGuard moduleId={27}><ModuleTwentySevenSystemDesign /></ModuleGuard>} />

              <Route path="/projects" element={<ProjectsGallery />} />
              <Route path="/projects/:projectId" element={<ProjectDetail />} />
              <Route path="/playground" element={<CodePlayground />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/roadmap" element={<Roadmap />} />
              <Route path="/glossary" element={<Glossary />} />
              <Route path="/glossary/:slug" element={<ConceptDetail />} />
              <Route path="*" element={<div className="p-10 text-center text-slate-500">404: Page Not Found</div>} />
            </Route>
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
