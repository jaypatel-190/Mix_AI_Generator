const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      temperature: 0,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates summaries based on given text.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });
    console.log("response: ", response);
    const aiMessage = response.choices[0].message.content;
    console.log("aiMessage: ", aiMessage);

    return res.status(200).json(aiMessage);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      temperature: 0,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates paragraphs based on given text.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });
    console.log("response: ", response);
    const aiMessage = response.choices[0].message.content;
    console.log("aiMessage: ", aiMessage);

    return res.status(200).json(aiMessage);
  } catch (err) {
    console.log("err: ", err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    // const { data } = await openai.createCompletion({
    //   model: "text-davinci-003",
    //   prompt: `Answer question similar to how yoda from star war would.
    //   Me: 'what is your name?'
    //   yoda: 'yoda is my name'
    //   Me: ${text}`,
    //   max_tokens: 300,
    //   temperature: 0.7,
    // });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      temperature: 0,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates chatbot responses based on given text.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });
    console.log("response: ", response);
    const aiMessage = response.choices[0].message.content;
    console.log("aiMessage: ", aiMessage);

    return res.status(200).json(aiMessage);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    // const { data } = await openai.createCompletion({
    //   model: "text-davinci-002",
    //   prompt: `/* convert these instruction into javascript code \n${text}`,
    //   max_tokens: 400,
    //   temperature: 0.25,
    // });
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      temperature: 0,
      stream: false,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates javascript code based on given text.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });
    console.log("response: ", response);
    const aiMessage = response.choices[0].message.content;
    console.log("aiMessage: ", aiMessage);

    return res.status(200).json(aiMessage);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;

    const image = await openai.images.generate({
      model: "dall-e-2",
      prompt: `generate a scifi image of ${text}`,
      size: "512x512",
    });
    console.log("image: ", image);
    const image_url = image.data[0].url;
    console.log("image_url: ", image_url);

    return res.status(200).json(image_url);
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
