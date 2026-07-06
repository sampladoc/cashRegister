npm test

npm start




1. Full prompt transcript:
   https://chatgpt.com/share/6a4c286b-b990-83e8-b4f3-170092ff3d37

2. An annotated diff or decision log
Please mark inline or in a separate document:

Where you used AI output directly.
- I used AI to create the whole application as a boilerplate of sorts. It provided me with a one file solution that I analyzed and used to break the code down into modular parts.
-  <img width="210" height="252" alt="image" src="https://github.com/user-attachments/assets/87160b59-05ee-49c3-baca-c838785b04f6" />
 
Where you modified AI output and why.
- I don't know if I can say I modified the AI output. What I did was, after every change I requested, I wouuld test the results to see if it fit what I expected. When I found something I wanted to change, I would ask the AI to make the change. I would read the code and select the parts that I found to be most usable. For example I added timestamped error-logs for when/if the amounts fell outside the acceptable ranges. I also added timeStamped outputs so as to maintain an accurate history of outputs.
- <img width="787" height="322" alt="image" src="https://github.com/user-attachments/assets/11931aa7-ff34-4a67-9cad-f48b0a2ebfab" /> <img width="537" height="156" alt="image" src="https://github.com/user-attachments/assets/0e8b9b01-8901-40d1-8d86-74ef1ad102d2" />

Where you rejected AI output and why.
- I rejected the initial boilerplate that was provided. I did not like the all-in-one structure.

3. Verification information
Please explain how you confirmed that the AI-generated pieces work.

What tests did you use?
- I used both unit tests and live test using different edge cases which allowed me to improve about the performance and user experience.
- In different sections that I had doubts about I would add console.logs to see make sure the code actually worked as intented. 

Which edge cases did you test?
- Manually I tested what the paid amount was less, when the amounts had incorrect formats and tested different currencies. 

4. Tools and task mappings
Please describe how you deployed AI differently across the problem and which tools you used for each task.
- I simply used ChatGPT and copy pasted the code where necessary. I tested each part for 2 reasons. 1) to make sure the code works as expected and 2) To make sure I understand how the code is working. I am more into knowing how every part of the code interacts and why. If I haven't used AI Agents directly in code all that often because I am aware of the errors AI can make and I am afraid to intriduce bugs I would have diffulty understanding and moreover, being able to fix. 

5. A short self-critique
Please include:

If you could change part of the solution, what would you change and why?
- This is kind of a trick question because I made the changes I would make but I think I can think of a few more.
  1. I would add more validations to the input file by adding a minimum and maximum line amount.
  2. I would add the ability to choose the input and output file names.
  3. I would add what Currency is being currently used in the output.
 
Which part of the solution seems strongest, and why?
- I tried to keep the cash register logic separated from the business rules. Parsing, change calculation, strategy selection, denomination configuration, and formatting are separate pieces. That makes the solution easier to test and easier to extend. For example, if the random divisor changes, it is just a configuration value. If a new special rule is added, I can add a new strategy.

Which part of the solution seems weakest, and why?
- The random strategy guarantees correct change, but it does not guarantee a uniform probability across every possible denomination combination. If this were production software, I would clarify with the client whether they need any valid random combination or a statistically uniform random selection.

Extra comment. 
- based on the questions asked I suspect the client expect a certina type of interaction from the candidate with the AI Tools used. I've been using AI for a little over two years now working on very complex systems and architecture. I have learned to view AI as a very sophisticated Search Engine that has access to all the best examples of how different code can be written and implemneted. Now, I see my self as a code reviewer and AI as a very capable senior engineer. In an ateempt to be as efficient and productive as possible I delegate as much of the tedious tasks to the AI as possible while maintaining readibility, consistency and good practices. For this exercise I didn't see the need to make too many hands on changes. If the exercise were something that took a couple of months to complete then I could imagine there would be a lot I would be more hands on with since AI cannot produce a well architectured solution without a human being present and more hands on. I hope my solution and work style was satisfactory. 
