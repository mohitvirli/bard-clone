import hljs from 'highlight.js';

/**
 * Function to santiize code content without actually being executed in HTML.
 *
 * - Uses the text to be set to the innerHTMl and get the content as a
 *   valid HTML string.
 *
 * @param text The text
 * @returns
 */
const santiizeText = (text: string): string =>  {
  const el = document.createElement('div');
  el.innerText = text;
  return el.innerHTML;
};

/**
 * Parse the response to make it more readable. For example, prettify the code
 * contents.
 *
 * TODO: Can add more formatting depending on use cases.
 *
 * @param response The message
 * @returns The formatted message
 */
export const parseResponse = (response: string): string => {
  if (typeof response !== 'string') return '';

  let message = response;

  // Check for code blocks which is in ``` blocks and prettify using HighlightJS
  message = message.replaceAll(/```([^]*?)```/g, (matched, content) => {
    // Generally, the first element in the the string is the language.
    const language: string = (content.match(/^.*/g) ?? [])[0];
    let value: string;

    // If language is valid, use it as the highlight language, else use auto.
    try {
      // Remove the language from the response.
      value = hljs.highlight(language, content.replace(language + '\n', '')).value;
    } catch {
      value = hljs.highlightAuto(content).value;
    }

    return `<pre><code>${value}</code></pre>`;
  });

  // Parse all the code in `` blocks to use it as inline code.
  message = message.replaceAll(/`(.+?)`/g, (matched, content) => {
    return `<code>${santiizeText(content)}</code>`;
  });

  // Replace all the new lines with <br> tags.
  message = message.replaceAll(/\n/g, '<br>');

  return message;
}