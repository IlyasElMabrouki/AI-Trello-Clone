import openai from '@/openai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { todos } = await request.json();

  //Communicate with openAI GPT
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `When responding, welcome the user always as Ilyas El Mabrouki 
        and say welcome to the TRELLO ToDo App ! Limit the response to 200 characters`,
      },
      {
        role: 'system',
        content: `Hi there, provide a summary of the following todos. 
        Count how many todos are in each category such as To do, in progress and done. 
        then tell the user to have a productive day. 
        Here's the data : ${JSON.stringify(todos)}`,
      },
    ],
  });

  return NextResponse.json(response.choices[0].message);
}
