-- CreateTable
CREATE TABLE "Opportunity" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "ideaTitle" TEXT NOT NULL,
    "valueProposition" TEXT NOT NULL,
    "targetCustomer" TEXT NOT NULL,
    "customerProblem" TEXT NOT NULL,
    "revenuePotential" TEXT,
    "strategicFit" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "opportunityId" TEXT NOT NULL,
    "answersJson" TEXT NOT NULL,
    "currentModel" TEXT NOT NULL,
    "secondaryModel" TEXT NOT NULL,
    "recommendedTransition" TEXT NOT NULL,
    "complexity" TEXT NOT NULL,
    "opportunityScore" INTEGER NOT NULL,
    "goDecision" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Assessment_opportunityId_fkey" FOREIGN KEY ("opportunityId") REFERENCES "Opportunity" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AnalysisResult" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "assessmentId" TEXT NOT NULL,
    "executiveSummary" TEXT NOT NULL,
    "opportunityEvaluationJson" TEXT NOT NULL,
    "strategicRationaleJson" TEXT NOT NULL,
    "priorityActionsJson" TEXT NOT NULL,
    "keyRisksJson" TEXT NOT NULL,
    "decisionRationale" TEXT NOT NULL,
    "roadmapJson" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AnalysisResult_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "Assessment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AnalysisResult_assessmentId_key" ON "AnalysisResult"("assessmentId");
