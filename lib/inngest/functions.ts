import { inngest } from "./client";
import {PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";
import {sendWelcomeEmail} from "@/lib/nodemailer";

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.email}!` };
    },
);


export const sendSignUpEmail = inngest.createFunction(
    {id: 'sign-up-email'},
    {event:'app/user.created'},
    async ({event, step})=>{
        const userProfile = `
        -Country: ${event.data.country}
        -Investment Goals: ${event.data.investmentGoals}
        -Risk tolerance: ${event.data.riskTolerance}
        -Preferred industry: ${event.data.preferredIndustry}
        `
        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}', userProfile)

        const response = await step.ai.infer('generate-welcome-intro',{
            model: step.ai.models.gemini({model:'gemini-2.5-flash'}),
            body: {
                contents:[
                    {
                        role:'user',
                        parts:[
                            { text: prompt}
                        ]
                    }
                ]
            }
        })

        await step.run('send-welcome-email', async ()=>{
            const part = response.candidates?.[0]?.content?.parts?.[0]
            const introText = (part && 'text' in part ? part.text : null) || 'Thanks for joining signalist'

            const {data:{email, name}} = event
            return await sendWelcomeEmail({email, name, intro: introText})
        })

        return {
            success: true,
            message: 'email sent successfully'
        }
    }
)