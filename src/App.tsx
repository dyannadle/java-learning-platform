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
              <Route path="/learn/module-1" element={<ModuleOneIntro />} />
              <Route path="/learn/module-2" element={<ModuleTwoVariables />} />
              <Route path="/learn/module-3" element={<ModuleThreeOOP />} />
              <Route path="/learn/module-4" element={<ModuleFourCollections />} />
              <Route path="/learn/module-5" element={<ModuleFiveControlFlow />} />
              <Route path="/learn/module-6" element={<ModuleSixExceptions />} />
              <Route path="/learn/module-7" element={<ModuleSevenStreams />} />
              <Route path="/learn/module-8" element={<ModuleEightConcurrency />} />
              <Route path="/learn/module-9" element={<ModuleNineIO />} />
              <Route path="/learn/module-10" element={<ModuleTenGenerics />} />
              <Route path="/learn/module-11" element={<ModuleElevenPatterns />} />
              <Route path="/learn/module-12" element={<ModuleTwelveSpringCore />} />
              <Route path="/learn/module-13" element={<ModuleThirteenREST />} />
              <Route path="/learn/module-14" element={<ModuleFourteenJPA />} />
              <Route path="/learn/module-15" element={<ModuleFifteenSecurity />} />
              <Route path="/learn/module-16" element={<ModuleSixteenTesting />} />
              <Route path="/learn/module-17" element={<ModuleSeventeenMicroservices />} />
              <Route path="/learn/module-18" element={<ModuleEighteenEvents />} />
              <Route path="/learn/module-19" element={<ModuleNineteenDocker />} />
              <Route path="/learn/module-20" element={<ModuleTwentyKubernetes />} />

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
