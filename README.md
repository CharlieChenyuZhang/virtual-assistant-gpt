# TODO

purchase chenyu.ai (currently available for 150 CAD) or chenyu.com or chenyu.cn domain

# todos / feature

- have a language toggle at the top righr corner to toggle it to 简体中文
- user sign in through google or through a valid
- refactor the js to typescript
- It also provides a comprehensive learning experience, covering all aspects of
  language learning, including grammar, vocabulary, listening,
  speaking, and reading.

# known bugs:

- only support chrome and english
- if users don't speak at all, then nothing happens -- need to handle error peacefully
- cut too quickly when the user is not speaking
  - solution 1: constently listening, case 1: if the user interupt me while AI is thinking, case 2: users wait till I finish
  - solution 2: push button to talk. Keep on pushing the button to record what you want to say. This might have a better experience on mobile browser. [simpler approach]

# design principle

- each modeul has to be easy to swap (for example, I can swap google TTS to Amazon's TTS module easily) unified interface

# fixed bugs:

- add the indicatoin whether it's thinking, talking or listening (meme mode)
-

# future features:

if I add the sentiment analysis to the software, I can choose different memes based on the conversation. here is an example
https://giphy.com/gifs/StudioModerna-cat-kitty-meow-vgPYVqMaopBV0kbqEX

https://play.google.com/store/apps/details?id=com.outfit7.talkingtom&hl=en_CA&gl=US&pli=1

# how to run the application

```
npm i
npm start
```

# current features

There are three iterations already

version 1: `Dictaphone.js`
![demo-dictaphone](https://user-images.githubusercontent.com/22360911/216835597-3dd15e06-4819-44f9-93ad-15dec3f531d4.png)

version 2: `BetterUI.js`
Only kept one button with no text showing in UI. Need to click on `start` button and have one sentence only.
![demo-BetterUI](https://user-images.githubusercontent.com/22360911/216835593-37f9749f-a191-492f-8207-d037a57e1c61.png)

version 3: `InteractiveUI.js`
![Screenshot 2023-02-06 at 3 17 39 PM](https://user-images.githubusercontent.com/22360911/217076113-4a041f37-3a25-402e-8d34-0d0831e04694.png)
This version ask a follow up question and start listening to users again to engage the conversation.
