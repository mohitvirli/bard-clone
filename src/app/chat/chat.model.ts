export interface SuggestionTopic {
  title: string;
  prompt: string;
}

export interface Suggestion {
  title: string;
  topics: SuggestionTopic[];
}

export interface Message {
  type: 'user' | 'bot';
  isLoading?: boolean;
  message: string;
}