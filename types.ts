export interface Task {
  id: string;
  text: string;
  tag: string;
  tagClasses: string;
  completed: boolean;
}

export interface PhaseData {
  id: number;
  title: string;
  tasks: Task[];
}

export interface BeerStyle {
  id: string;
  name: string;
  family: string;
  description: string;
  parameters: {
    ibu: string;
    abv: string;
    srm: string;
  };
  recipe: {
    malts: string[];
    hops: string[];
    yeast: string;
    other?: string[];
  };
  brewing: {
    mashingTemp: string;
    fermentationTemp: string;
    boilTime: string;
  };
  notes?: string;
}
