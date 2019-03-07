# streamlabs

First of all, thank you for the opportunity to do this test, I learned a lot and was a really good exercise.

# the application

My first screen show a button to loggin on twitch, the next screen show a field to select the name of your streamer and after click in "let's watch" the embided video begin, on the bottom of the screen is shown the followers from the channel, it's can take some time if the channel do not receive so much followers, I used to test on Dizzy or KingRichard.

I did the project in nodeJs and reactJs, although I'm not expert on these tecnologies I guess that was the best choice for this activity.

# questions

 - How would you deploy the above on AWS? (ideally a rough architecture diagram will help)
    I've never used AWS before, so I would need to learn more before say something about this question.

 - Where do you see bottlenecks in your proposed architecture and how would you approach scaling this app starting from 100 reqs/day to 900MM reqs/day over 6 months?
    I guess that the listen parte will be a bottleneck because of the how much events will be triggered from all the people that is watching. Sorry but now a days I don't have so much experience to propose a architecture to solve this scaling problem.