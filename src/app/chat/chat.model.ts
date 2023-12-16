export interface SuggestionTopic {
  title: string;
  prompt: string;
}

export interface Suggestion {
  title: string;
  topics: SuggestionTopic[];
}