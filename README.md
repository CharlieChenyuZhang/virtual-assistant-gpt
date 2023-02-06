# known bugs:

- only support chrome and english
- if users don't speak at all, then nothing happens -- need to handle error peacefully
- add the indicatoin whether it's thinking, talking or listening

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
