---
title: "Overcoming CSS Challenges in React: A Journey with a Single Button"
Last_Update: "20240122"
Tags: ["CSS", "React", "classList", "chatGPT"]
---


## Introduction
In the realm of web development, sometimes what seems like a simple task can turn into an enlightening journey. My recent experience with styling a single button in a React application, using Docusaurus, served as a perfect example. The goal was straightforward – override all existing template styles on this button – but the path to achieving this ended up teaching me valuable lessons about CSS scope and React syntax.

## The Initial Challenge
The task at hand was to apply specific styling to one button, ensuring it overrode any existing styles from the template. The straightforward solution seemed to be moving the styling to the global scope. Given the temporary nature of this requirement, I was comfortable with this approach. However, this raised a question: Could this be an opportunity to delve deeper and handle it within the local CSS scope?

## Exploring CSS Local Scope
In pursuit of a more structured solution, I decided to tackle this challenge within the locally scoped CSS. This decision wasn't just about styling a button; it was about refreshing my knowledge and understanding of React's styling nuances, especially after a few years away from heavy React development.

### A Surprising Discovery with `classList`
During this process, I stumbled upon an interesting behavior of the `classList` property in HTML elements. To test whether a class was being applied correctly, I created a dummy class named "abcd". Then `Inspect -> store as global variable -> temp1.classList` To my surprise, I found that `classList` simply lists all classes attached to an element, regardless of whether they are defined in any stylesheet. This was a pivotal moment of realization – `classList` doesn’t filter out non-existent classes.

![abcd class still in classList](https://i.imgur.com/73d9Wii.png)

#### Investigating the Styles Panel
Armed with this new understanding, I turned to the styles panel. Here, I expected to see my locally scoped class being applied. However, it was missing. This prompted a deeper investigation.

![no abcd class](https://i.imgur.com/Y4IULrC.png)

## Revisiting React Syntax
The crux of the issue turned out to be syntax related. In React, you can use both global and local styles on the same element, but I needed a refresher on the correct syntax for this. The solution was elegantly simple – use a combination of string literals and the `styles` object imported from the CSS module. ChatGPT played a crucial role here, providing the syntax and guidance that expedited my resolution process.

```
className={`globalclass1 ${styles.localClass} globalclass2`}
```
*Note: This is just string interpolation, so the order does not matter in terms of functionality. Obviously CSS specificity ([W3Schools](https://www.w3schools.com/css/css_specificity.asp), [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Specificity)) determines which styles are applied

## Conclusion
This experience, while centered around a seemingly minor task, was a powerful reminder of the continuous learning journey in web development. It reinforced the importance of understanding the nuances of CSS scope and the intricacies of React's styling syntax. Most importantly, it highlighted the value of leveraging resources like ChatGPT to efficiently navigate through challenges and refresh dormant knowledge.

In the end, the button was styled as needed, but the journey offered much more than a styled component – it was a refreshing dive back into the depths of React and CSS, and a testament to the ever-evolving nature of web development. ...and guess who wrote this elegant article :laughing: 
