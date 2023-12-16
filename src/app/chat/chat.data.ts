import { Suggestion } from "./chat.model";

/**
 * Mock data required for the App.
 */
export const mockSuggestionList: Suggestion[] = [
  {
    title: 'Understand',
    topics: [
      {
        title: 'pack accordingly',
        prompt: 'Suggest how to pack for a 3 day trip to London'
      },
      {
        title: 'refactor code',
        prompt: 'Help me Refactor code for a React App'
      },
      {
        title: 'home routines',
        prompt: 'What is the best routines to follow at home?'
      }
    ]
  },
  {
    title: 'Create',
    topics: [
      {
        title: 'language study plan',
        prompt: 'Suggest 2 month study plan for French'
      },
      {
        title: 'word riddle',
        prompt: 'What is the word riddle of the day?'
      },
      {
        title: 'taglines for my store',
        prompt: 'suggest prompt according to the title'
      }
    ]
  },
  {
    title: 'Explore',
    topics: [
      {
        title: 'local plumber',
        prompt: 'suggest prompt according to the title'
      },
      {
        title: 'comparison shop',
        prompt: 'suggest prompt according to the title'
      },
      {
        title: 'see the sights',
        prompt: 'suggest prompt according to the title'
      }
    ]
  }
]