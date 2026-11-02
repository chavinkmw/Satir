export type LayerKey =
  | 'behavior'
  | 'body_sensation'
  | 'feeling'
  | 'feeling_about_feeling'
  | 'perception'
  | 'expectation'
  | 'yearning';

export interface IcebergLayerMeta {
  key: LayerKey;
  order: number;
  nameTh: string;
  nameEn: string;
  isAboveWater: boolean;
  depthMeters: string;
  descriptionTh: string;
  keywordsTh: string[];
  bandColor: {
    bg: string;
    border: string;
    hoverBg: string;
    activeBg: string;
    textColor: string;
  };
  color: {
    bg: string;
    border: string;
    text: string;
    lightBg: string;
    accent: string;
  };
}

export interface Choice {
  id: string;
  text: string;
  explanation: string;
}

export interface LayerQuestion {
  layerKey: LayerKey;
  questionPrompt: string;
  choices: Choice[];
  correctChoiceId: string;
  teachingNote: string;
  scriptClue?: string;
}

export interface DialogueLine {
  speaker: string;
  role: 'patient' | 'peer' | 'mother' | 'doctor' | 'narrator';
  text: string;
  stageDirection?: string;
  highlightLayer?: LayerKey;
  highlightNote?: string;
}

export interface ScenarioScene {
  id: string;
  sceneNumber: string;
  title: string;
  subtitle: string;
  location: string;
  dialogues: DialogueLine[];
}

export interface SatirFormulationRow {
  layerKey: LayerKey;
  layerNameTh: string;
  layerNameEn: string;
  patientAnswer: string;
  scriptEvidence: string;
  clinicalMeaning: string;
}

export interface Scenario {
  id: string;
  titleTh: string;
  subtitleTh: string;
  category: 'workplace' | 'relationship' | 'family' | 'student';
  categoryLabel: string;
  characterName: string;
  summary: string;
  detailedContext: string;
  triggerEvent: string;
  scenes: ScenarioScene[];
  satirFormulation: SatirFormulationRow[];
  questions: Record<LayerKey, LayerQuestion>;
}

export interface UserAnswerRecord {
  [layerKey: string]: string; // choiceId
}

export interface LayerResultReview {
  layerKey: LayerKey;
  layerMeta: IcebergLayerMeta;
  selectedChoiceId: string;
  selectedChoiceText: string;
  correctChoiceId: string;
  correctChoiceText: string;
  isCorrect: boolean;
  explanation: string;
  teachingNote: string;
  scriptEvidence?: string;
}
