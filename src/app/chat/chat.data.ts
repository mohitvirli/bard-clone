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
        prompt: `Find flights to Miami for New Years. What's the usual temperature then?`
      },
      {
        title: 'refactor code',
        prompt: `Improve readability of this function.

def fdr_correct(where_clauses):
  conn = sqlite3.connect(dbfile)
  c = conn.cursor()
  print len(where_clauses)
  p_vals = []
  for where_clause in where_clauses:
    c.execute("select twosided_p from comparisons where " + where_clause)
    val = c.fetchall()
    assert len(val) == 1
    where_clause
    p_vals.append(val[0][0])
    _, q_vals, _, _ = multipletests(p_vals, alpha=0.05, method='fdr_bh', returnsorted=False)
    for i, where_clause in enumerate(where_clauses):
      c.execute("update comparisons set twosided_q=%f where " % q_vals[i] + where_clause)
    conn.commit()
  c.close()`
      },
      {
        title: 'home routines',
        prompt: `Outline a great way to home routine: organizing my closet.

You are a professional home organizer, skilled at creating routines to help people organize their lives and their home, bringing order to chaos and spreading a sense of peace and calm.

Write in a soothing, calming, reassuring way. Motivate the reader.`
      }
    ]
  },
  {
    title: 'Create',
    topics: [
      {
        title: 'language study plan',
        prompt: `I want to learn a new language: Italian.

        You are a professional language tutor, skilled at creating personalized study plans for students of all levels. Create a study plan for me that will help me reach my goal of fluency. I have no knowledge of the language and would like to get to a conversational level in 3 months.

        Outline a week-by-week plan for how I can achieve my goal. Include weeks 1-12. Include a detailed curriculum.`
      },
      {
        title: 'word riddle',
        prompt: `Come up with a complex word riddle that has the answer: sunset.

You are a skilled riddle maker, known for the cleverness of your wordplay and the complexity of your puzzles, skilled at thinking up clever and challenging riddles. Be creative. Come up with a riddle that is difficult to guess.

Include hints to help the user guess.`
      },
      {
        title: 'taglines for my store',
        prompt: `I need a tagline for my online store selling handmade jewelry, based around nature themes. I want people to feel beautiful, classy, down-to-earth, special.

You are a professional copywriter, skilled at creating catchy and memorable taglines. Use your skills to create taglines that will make people want to buy my products. Explore puns, rhymes, alliteration, or anything else that helps make the taglines memorable. Identify high-level themes, consider how to integrate them, and suggest several taglines that are unique, interesting, and relevant to my store.`
      }
    ]
  },
  {
    title: 'Explore',
    topics: [
      {
        title: 'local plumber',
        prompt: 'suggest prompt according to the local plumber'
      },
      {
        title: 'comparison shop',
        prompt: 'suggest prompt according to the shop'
      },
      {
        title: 'see the sights',
        prompt: 'suggest prompt according to the sights'
      }
    ]
  }
]

/**
 * Sample Chat GPT API response.
 */
export const sampleGPTResponse = {
  "id": "chatcmpl-8W32lnx3yo55xnwaVd7sltqlIawUR",
  "object": "chat.completion",
  "created": 1702648887,
  "model": "gpt-3.5-turbo-0613",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! How can I assist you today?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 9,
    "completion_tokens": 9,
    "total_tokens": 18
  },
  "system_fingerprint": null
}