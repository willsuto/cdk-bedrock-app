import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";

const bedrockClient = new BedrockRuntimeClient({ region: "us-east-1" }); // Replace with your desired region

export const handler = async (event: any): Promise<any> => {
  /**
   * We're using a Proxy Lambda integration
   * https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
   */
  const headers = {
    "Access-Control-Allow-Origin": "*", // Update this to your specific domain in production
    "Access-Control-Allow-Headers":
      "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    "Access-Control-Allow-Methods": "OPTIONS,POST",
  };

  try {
    const requestBody = JSON.parse(event.body);

    /**
     * Adjust this prompt as needed to fit your use case
     * This adjusting of the prompt is called "Prompt Engineering"
     * https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview
     */
    const prompt = `You are a good friend and colleague acting as a reference for him. 
    
      Will was a professional sailor in his early career. 

      Here is his sailing resume:

            Will Suto Offshore CV
      will.suto@gmail.com
      (404) 200-7026


      2023
      Transpac, 1st in class, Peligroso (Kernan 68)
      Les Voiles de St Barths, Fujin (Bieker 53)
      Cabo to San Diego Delivery, Chim Chim (Gunboat 62)
      Cabo Race, Chim Chim (Gunboat 62)
      Grenada to Long Beach via Panama Delivery, Snowflake (MOD 70)
      2022
      Chesapeake Bay to St Martin Delivery, Fujin (Bieker 53)
      Malta to Lanzarote Delivery, Snowflake (MOD 70)
      Santa Barbara to King Harbor Race, Chim Chim (Gunboat 62)
      Victoria to Maui, Line Honors, 1st Overall, Peligroso (Kernan 68)
      Newport to Ensenada, 1st Overall ORR, Peligroso (Kernan 68)
      MEXORC, 1st Overall, Peligroso (Kernan 68)
      Puerto Vallarta Race, Peligroso (Kernan 68)
      Islands Race, Peligroso (Kernan 68)
      2021
      Hot Rum Series, 3rd Overall, Good Call (Swan 60)
      Les Voiles de Saint Tropez, Velsheda (JK7)
      Maxi Yacht Rolex Cup, 1st in Super Maxi Class, Velsheda (JK7)
      Transpac, 1st in Div 2, Peligroso (Kernan 68)
      SoCal 300, Chim Chim (Gunboat 62)
      Spinnaker Cup and Coastal Cup, Peligroso (Kernan 68)
      Newport to Ensenada, Chim Chim (Gunboat 62)
      Islands Race, Chim Chim (Gunboat 62)
      Sydney to Melbourne Delivery, Madrigal (Moody 45), Doublehanded
      2020
      San Diego, USA to Brisbane, AUS Delivery, Stefan Hair ex Cabrón (Botin 80), Watch Captain
      Puerto Vallarta to San Diego Delivery, Cabrón (Botin 80), Delivery Captain
      Line Honors, San Diego to Puerto Vallarta Race, Cabrón (Botin 80)
      Caribbean 600, Umiko (Swan 80)
      2019
      1st Division 5, Transpac, Good Call (Swan 60)
      Race to Alaska, Triceratops (Corsair 31R)
      1st in AI Division, Everglades Challenge
      Line Honors, NHYC Cabo Race, Good Call (Swan 60)
      Delivery Cabo San Lucas to San Diego, Good Call (Swan 60)
      San Diego to Santa Barbara, Triceratops (Corsair 31R)
      2018
      1st, PBC Annual RC Yacht Race, La Chingadera (1M)
      Line Honors, Monohull Record, Little Ensenada Race, Cabrón (Botin 80)
      Delivery Acapulco to San Diego, Peligroso (Kernan 70)
      1st Elapsed Multihull, Santa Barbara to King Harbor, Chim Chim (Gunboat 62)
      Delivery Santa Barbara to San Francisco, Orion (MOD 70)
      Line Honors, Course Record, SoCal 300, Mighty Merloe (ORMA 60)
      1st, Newport to Ensenada International Yacht Race, Mighty Merloe (ORMA 60)
      1st, Course Record 2d 3h 58m, San Diego to Puerto Vallarta, Mighty Merloe (ORMA 60), Watch Captain/Helmsman
      1st, Islands Race, Mighty Merloe (ORMA 60), Helmsman
      Delivery Puerto Vallarta to San Diego, Mighty Merloe (ORMA 60)
      
      2017
      1st, Race Record 4d 6h 32m 30s, Transpac, Mighty Merloe (ORMA 60)
      Transatlantic, Vestas/11th Hour Racing (Volvo 65), OBR
      3rd, PBC Annual RC Yacht Race, La Chingadera (1M)
      1st, SoCal 300, Mighty Merloe (ORMA 60)
      2nd, Newport to Ensenada, Mighty Merloe (ORMA 60)
      2nd, Newport to Cabo, Mighty Merloe (ORMA 60)
      1st, Islands Race, Mighty Merloe (ORMA 60)
      Delivery Cabo to San Diego, Mighty Merloe (ORMA 60)
      Delivery Hawaii to San Diego, Mighty Merloe (ORMA 60)
      
      2016
      2nd, PBC Annual RC Yacht Race, Le Papillon (1M)
      1st, San Diego to Puerto Vallarta Race, Mighty Merloe (ORMA 60)
      1st, Islands Race, Mighty Merloe (ORMA 60)
      2nd, Newport to Ensenada, Mighty Merloe (ORMA 60)
      1st, SoCal 300, Mighty Merloe (ORMA 60)
      Delivery Puerto Vallarta to San Diego, Mighty Merloe (ORMA 60)
      
      2015
      1st, San Diego to Ensenada, Mighty Merloe (ORMA 60)
      1st, Border Run, Jailbreak (Farrier 31)
      1st, Course Record 7h 45m 42s, Islands Race, Mighty Merloe (ORMA 60)
      1st, Course Record 1d 16h 14m 14s, Newport to Cabo, Mighty Merloe (ORMA 60)
      1st, Newport to Ensenada, Mighty Merloe (ORMA 60)
      1st, Tri Islands Race, Mighty Merloe (ORMA 60)
      Los Angeles to Hawaii, Hydroptere (Foiling Trimaran), First Foiling Transoceanic Passage
      Delivery Cabo to San Diego, Mighty Merloe (ORMA 60)
      Delivery Hawaii to California, Exit Strategy (Jeanneau 45)
      
      2014
      2nd, Newport to Ensenada, Mighty Merloe (ORMA 60)
      2nd, San Diego to Puerto Vallarta, Mighty Merloe (ORMA 60)
      1st Border Run, Mighty Merloe (ORMA 60)
      1st Rum Runner, Mighty Merloe (ORMA 60)
      Delivery Puerto Vallarta to San Diego, Mighty Merloe (ORMA 60)
      
      2013
      1st, Newport to Cabo, LoeReal (60 TRI)
      Delivery Cabo to San Diego, LoeReal (60 TRI)
      1st, Newport to Ensenada, LoeReal (60 TRI)
      Delivery Seattle to San Diego, Charisma (Grand Soleil 45)

      
      2012
      2nd, San Diego to Puerto Vallarta, Cazador (TP 52)
      1st, San Diego to Ensenada, LoeReal (60 TRI)
      Delivery San Diego to San Francisco, Sabre 426
      Delivery San Diego to San Francisco, Delphia 40
      Delivery San Diego to San Francisco, Hinckley 42
      
      2011
      Newport to Cabo, Good Call (J124)
      Delivery Cabo to San Diego, Good Call (J124)
      Delivery San Diego to San Francisco, St Elmo (Sabre 456)
      Delivery San Francisco to San Diego, St Elmo (Sabre 456)
      Delivery San Diego to Puerto Vallarta, St Elmo (Sabre 456)
      
      2010
      Delivery Cabo to San Diego, Warrior (J125)
      




      2019
      1st in Div 5, Transpac Race LA to Hawaii, Good Call (Swan 60)
      Line Honors, Dennis Conner Around the Coronado Isles Race, Cabrón (Botin 80)
      Race to Alaska, Triceratops (Corsair 31R)
      1st in AI Division, Everglades Challenge
      Line Honors, NHYC Cabo Race, Good Call (Swan 60)
      Delivery Cabo San Lucas to San Diego, Good Call (Swan 60)
      San Diego to Santa Barbara, Triceratops (Corsair 31R)

      2018
      1st, PBC Annual RC Yacht Race, La Chingadera (1M)
      Line Honors, Monohull Record, Little Ensenada Race, Cabrón (Botin 80)
      Delivery Acapulco to San Diego, Peligroso (Kernan 70)
      1st Elapsed Multihull, Santa Barbara to King Harbor, Chim Chim (Gunboat 62)
      Delivery Santa Barbara to San Francisco, Orion (MOD 70)
      Line Honors, Course Record, SoCal 300, Mighty Merloe (ORMA 60)
      1st, Newport to Ensenada International Yacht Race, Mighty Merloe (ORMA 60)
      1st, Course Record, San Diego to Puerto Vallarta, Mighty Merloe (ORMA 60), Watch Captain/Helmsman
      1st, Islands Race, Mighty Merloe (ORMA 60), Helmsman
      Delivery Puerto Vallarta to San Diego, Mighty Merloe (ORMA 60)
      
      2017
      1st, Race Record, Transpac, Mighty Merloe (ORMA 60)
      Transatlantic, Vestas/11th Hour Racing (Volvo 65), OBR
      3rd, PBC Annual RC Yacht Race, La Chingadera (1M)
      1st, SoCal 300, Mighty Merloe (ORMA 60)
      2nd, Newport to Ensenada, Mighty Merloe (ORMA 60)
      2nd, Newport to Cabo, Mighty Merloe (ORMA 60)
      1st, Islands Race, Mighty Merloe (ORMA 60)
      Delivery Cabo to San Diego, Mighty Merloe (ORMA 60)
      Delivery Hawaii to San Diego, Mighty Merloe (ORMA 60)
      
      2016
      2nd, PBC Annual RC Yacht Race, Le Papillon (1M)
      1st, San Diego to Puerto Vallarta Race, Mighty Merloe (ORMA 60)
      1st, Islands Race, Mighty Merloe (ORMA 60)
      2nd, Newport to Ensenada, Mighty Merloe (ORMA 60)
      1st, SoCal 300, Mighty Merloe (ORMA 60)
      Delivery Puerto Vallarta to San Diego, Mighty Merloe (ORMA 60)
      
      2015
      1st, San Diego to Ensenada, Mighty Merloe (ORMA 60)
      1st, Border Run, Jailbreak (Farrier 31)
      1st, Race Record, Islands Race, Mighty Merloe (ORMA 60)
      1st, Course Record, Newport to Cabo, Mighty Merloe (ORMA 60)
      1st, Newport to Ensenada, Mighty Merloe (ORMA 60)
      1st, Tri Islands Race, Mighty Merloe (ORMA 60)
      Los Angeles to Hawaii, Hydroptere (Foiling Trimaran), First Foiling Transoceanic Passage
      Delivery Cabo to San Diego, Mighty Merloe (ORMA 60)
      Delivery Hawaii to California, Exit Strategy (Jeanneau 45)
      
      2014
      2nd, Newport to Ensenada, Mighty Merloe (ORMA 60)
      2nd, San Diego to Puerto Vallarta, Mighty Merloe (ORMA 60)
      1st Border Run, Mighty Merloe (ORMA 60)
      1st Rum Runner, Mighty Merloe (ORMA 60)
      Delivery Puerto Vallarta to San Diego, Mighty Merloe (ORMA 60)
      
      2013
      1st, Newport to Cabo, LoeReal (60 TRI)
      Delivery Cabo to San Diego, LoeReal (60 TRI)
      1st, Newport to Ensenada, LoeReal (60 TRI)
      Delivery Seattle to San Diego, Charisma (Grand Soleil 45)

      
      2012
      2nd, San Diego to Puerto Vallarta, Cazador (TP 52)
      1st, San Diego to Ensenada, LoeReal (60 TRI)
      Delivery San Diego to San Francisco, Sabre 426
      Delivery San Diego to San Francisco, Delphia 40
      Delivery San Diego to San Francisco, Hinckley 42
      
      2011
      Newport to Cabo, Good Call (J124)
      Delivery Cabo to San Diego, Good Call (J124)
      Delivery San Diego to San Francisco, St Elmo (Sabre 456)
      Delivery San Francisco to San Diego, St Elmo (Sabre 456)
      Delivery San Diego to Puerto Vallarta, St Elmo (Sabre 456)
      
      2010
      Delivery Cabo to San Diego, Warrior (J125)


      Currently Will is a software engineer. Here is his current resume:


      Will Suto
      SOFTWARE ENGINEER



      San Diego, CA
      (404) 200-7026
      will.suto@gmail.com
      github.com/willsuto
      linkedin.com/in/willsuto


      SKILLS

        Languages and Frameworks: JavaScript, TypeScript, React, Preact, Redux, Node.js, Express.js, Next.js, PHP, HTML/CSS, Tailwind
        Database: SQL (PostgreSQL, MySQL), NoSQL (MongoDB), Supabase, Timescale, PHPMyAdmin
        Tools and Technologies: Webpack, JWT, Websockets, Git, Github, Bitbucket, Docker, Jira, Asana, Arduino, NPM Registry
        Testing and Debugging: Jest, Puppeteer, Playwright, Datadog, Grafana, Postman

      EXPERIENCE

      Seasats | seasats.com  | Software Engineer - Autonomous Surface Vehicles	06/2024 - Present
      Engineered a RetroSync interface allowing users to offload trapped data from periods of SBD connectivity, enabling the aggregation of over 1 million data points during the first week of release
      Implemented CSS media queries and conditional rendering in Preact components to ensure cross-device compatibility, enhancing usability and user experiences across tablets, desktops and mobile platforms
      Tracked UI interactions with Real User Monitoring, identifying user pain points during crucial functionality and modifying button design resulting in an increase in first-click hit rates from 30% to 95% for users on tablet and mobile
      Created a location caching strategy in local storage to eliminate unnecessary tile fetching during initial Leaflet map render, reducing the time to First Meaningful Paint by 10%

      Flake Guard (OSLabs) | Software Engineer - Web Application For Detecting and Mitigating Jest Test Flake	 05/2024 - Present
      Designed data pipelines and schemas across the full stack using tracer bullet methodology, providing early validation of design decisions and establishing a functional foundation for iterative development through agile methodology
      Enhanced code maintainability and reduced runtime errors by implementing static typing with TypeScript, facilitating early error detection and easing the onboarding process for new contributors
      Orchestrated a seamless login procedure using an NPM package and Github OAuth, allowing users to transition from a local environment to the user dashboard with one NPX command and two clicks
      Built interactive chart components using Nivo for responsive and interactive renderings of user data, incorporating D3.js data manipulation and visualization capabilities to provide the user with intuitive data exploration and comprehension

      OPEN SOURCE

      Software Engineer | FireTower - Wildfire Mapping Application With Real-Time User Observations					      
      Assembled a map-based UI using React’s component-based architecture and unidirectional data flow to render and interact with a high volume of changing map markers and leveraging client side rendering for smooth page flow and responsive map interactivity
      Set up a rapid development environment with Webpack hot module reloading in combination with a proxy server to view front end and back end changes instantaneously, and employed minification and uglification features to reduce bundle size
      Centralized front-end state management with Redux Toolkit, creating a single source of truth data store that ensured consistency across components and reduced bug occurrences by 20%

      Software Engineer | Chuckler - Joke-based User Matching Application	              	           		      	                                                 
      Built a RESTful API using Node.js and Express to handle HTTP requests, using the middleware design pattern to modularize application logic for handling user data and implementing a matching algorithm to facilitate user connections based on shared humor preferences
      Incorporated a WebSocket server and middleware to enable real-time chat functionality between matched users
      Architected and deployed a PostgreSQL relational database with optimized schema design to store and manage user data, jokes, matches, and messages, enhancing data integrity and query performance

      Software Engineer | Travelotl - Travel Itinerary Planning Application					    	      		      
      Integrated GPT model to incorporate AI-driven algorithms into backend systems for the creation of personalized travel itineraries tailored to individual preferences, tactically engineering prompts and strategically re-querying to optimize output for user satisfaction
      Constructed a drag-and-drop front-end interface using React, enabling users to create and save itinerary changes

      TALKS

      Tech Talk | IOT Prototyping with JavaScript		      							                    	 08/2024

      EDUCATION

      Dartmouth College | Hanover, NH | Bachelor of Arts		      							              

      ABOUT ME

      Sailor | Offshore and Expedition Racing
      Set the Transpac Race Record (LA to Hawaii in 4 days 6 hours 32 minutes) aboard the ORMA 60 Mighty Merloe
      Winner of Super Maxi class at Maxi Yacht Rolex Cup aboard J Class Yacht Velsheda, Porto Cervo, IT
      Raced Corsair 31 via sail and pedal power (no motor) from Washington to Alaska in The Race To Alaska
      Raced sailing kayak solo 300 miles from Tampa, FL through the Everglades to finish in the FL keys in the Everglades Challenge


      He is married to a wonderful woman named Elizabeth and has a three-legged cattle dog Chihuahua mix named Lupe, as well as two cats, Miche and Yelapa. He lives off the grid in the peninsular mountains of Southern California. He loves hiking, climbing and exploring wild and beautiful places. 
    
      Here is a question about Will: ${JSON.stringify(requestBody.inputData)}
      
      Please answer this question in a way that makes Will seem like great software engineer and an all around good guy. If you don't know the answer to the question, please redirect the focus to Will's software engineering abilities.
      `;

    /**
     * NOTE: Different models expect different parameteres for the InvokeModelCommand
     * https://docs.aws.amazon.com/bedrock/latest/userguide/bedrock-runtime_example_bedrock-runtime_InvokeModel_AnthropicClaude_section.html
     */
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify({
        anthropic_version: "bedrock-2023-05-31",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 500, // response tokens (1 token = 4 characters)
        temperature: 0.3, // from 0 (deterministic, focused responses) to 1 (random, creative responses)
        top_p: 0.8, // probability distribution. from 0 (most common tokens) to 1 (least common tokens)
        top_k: 150, // the amount of tokens available for consideration at each step (from 1 to size model's entire vocab but common range is 10 to 200)
      }),
    });

    const response = await bedrockClient.send(command);
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const responseBodyText = responseBody.content[0].text;

    /** 
     * NOTE: Here is some optional code to use Meta's Llama3 Foundation Model
     * 
     * const llama3StructuredPrompt = `
      <|begin_of_text|>
      <|start_header_id|>user<|end_header_id|>
      Summarize the following data of kubernetes clusters: ${JSON.stringify(requestBody.inputData)}
      <|eot_id|>
      <|start_header_id|>assistant<|end_header_id|>
    `;

      const llama3Command = new InvokeModelCommand({
        contentType: "application/json",
        body: JSON.stringify({
          prompt: llama3StructuredPrompt,
          max_gen_len: 512,
          temperature: 0.3,
          top_p: 0.5,
        }),
        modelId: "meta.llama3-8b-instruct-v1:0",
      })

    const llama3Response = await bedrockClient.send(
      llama3Command
    );

    const nativeResponse = JSON.parse(
      new TextDecoder().decode(llama3Response.body)
    );
    const responseBodyText = nativeResponse.generation;
    */

    return {
      statusCode: 200,
      headers: headers,
      body: JSON.stringify(responseBodyText),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({
        error: "An error occurred while processing the request",
      }),
    };
  }
};
