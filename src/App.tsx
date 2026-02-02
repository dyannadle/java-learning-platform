import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { LearningPath } from './pages/LearningPath';
import { ModuleOneIntro } from './modules/ModuleOneIntro';
import { ModuleTwoVariables } from './modules/ModuleTwoVariables';
import { ModuleThreeOOP } from './modules/ModuleThreeOOP';
import { ModuleFourCollections } from './modules/ModuleFourCollections';
import { ModuleFiveControlFlow } from './modules/ModuleFiveControlFlow';
import { ModuleSixExceptions } from './modules/ModuleSixExceptions';
import { ModuleSevenStreams } from './modules/ModuleSevenStreams';
import { ModuleEightConcurrency } from './modules/ModuleEightConcurrency';
import { ModuleNineIO } from './modules/ModuleNineIO';
import { ModuleTenGenerics } from './modules/ModuleTenGenerics';
import { ProjectsGallery } from './pages/ProjectsGallery';
import { ProjectDetail } from './pages/ProjectDetail';

import { CodePlayground } from './pages/CodePlayground';
import { Roadmap } from './pages/Roadmap';
import { Glossary } from './pages/Glossary';
import { ConceptDetail } from './pages/ConceptDetail';

function App() {
  return (
    <BrowserRouter>
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
          <Route path="/projects" element={<ProjectsGallery />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/playground" element={<CodePlayground />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/glossary/:slug" element={<ConceptDetail />} />
          <Route path="*" element={<div className="p-10 text-center text-slate-500">404: Page Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
