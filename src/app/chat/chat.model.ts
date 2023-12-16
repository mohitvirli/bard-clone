/**
 * Model for the message.
 */
export interface Message {
  type: 'user' | 'bot';
  isLoading?: boolean;
  message: string;
}

/**
 * Model for the suggestion topic.
 */
export interface SuggestionTopic {
  title: string;
  prompt: string;
}

/**
 * Model for the suggestion card.
 */
export interface Suggestion {
  title: string;
  topics: SuggestionTopic[];
}
