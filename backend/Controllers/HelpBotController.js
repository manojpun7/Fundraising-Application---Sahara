import axios from "axios";

const helpBotController = async (req, res) => {
  const { question } = req.body;
  console.log(question);
  const prompt = `
  your name is Eva.
  I have built a fundraising platform named "Sahara" with the motto "By the People, For the People."  
  Our mission is to "Empower Lives Through Generosity" and to show that "In Times of Crisis, We Stand Together."  

  The platform enables people to:  
  - Donate blood  
  - Contribute food and clothes  
  - Raise and donate funds  

  Additionally, individuals in need can apply for financial assistance by submitting an application explaining their situation in 20 words or less. Questions can be anythings just respond as chatgpt. when its out of website related question you can response as a normal ai. 

  Here's my question about the system: ${question}
  answers of these questions should be just 2 sentences long.
`;

  try {
    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.BOT_API}`,
      method: "post",
      data: {
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      },
    });
    console.log(response);

    let answer = response.data.candidates[0].content.parts[0].text;
    return res.status(200).json({ success: true, data: answer });
  } catch (error) {}
};
export { helpBotController };
