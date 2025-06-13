import OpenAI from "openai";
import { SUPPORTED_LANGUAGES } from "../constans";
import type { FromLanguage, Language } from "../types.d";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

const ChatRole = {
  User: 'user',
  System: 'system',
  Assistant: 'assistant'
} as const;

export async function translate(
  {
    fromLanguage,
    toLanguage,
    text
  }: {
    fromLanguage: FromLanguage;
    toLanguage: Language;
    text: string;
  }) {
  const messages = [
    {
      role: ChatRole.System,
      content: 'You are a helpful assistant that translates text from one language to another. Do not answer questions, just translate. The original language is surrounded by `{{` and `}}`. You can also recive {{auto}} which means the language detected by the model. The translated language is surrounded by `[[` and `]]`.'
    },
    {
      role: ChatRole.User,
      content: 'Hola mundo {{Spanish}} [[English]]'
    },
    {
      role: ChatRole.Assistant,
      content: 'Hello world'
    },
    {
      role: ChatRole.User,
      content: '¿Cómo estás? {{auto}} [[Deutsch]]'
    },
    {
      role: ChatRole.Assistant,
      content: 'Wie geht es dir?'
    },
    {
      role: ChatRole.User,
      content: `Buen provecho {{Spanish}} [[French]]`
    },
    {
      role: ChatRole.Assistant,
      content: 'Bon appétit'
    }
  ];

  const fromCode = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage];

  const toCode = SUPPORTED_LANGUAGES[toLanguage];

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      ...messages,
      {
        role: ChatRole.User,
        content: `${text} {{${fromCode}}} [[${toCode}]]`
      }
    ],
  });

  return completion.choices[0]?.message?.content;
}