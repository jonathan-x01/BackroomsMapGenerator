# Backrooms Map Generator
[![pages-build-deployment](https://github.com/jonathan-x01/BackroomsMapGenerator/actions/workflows/pages/pages-build-deployment/badge.svg)](https://github.com/jonathan-x01/BackroomsMapGenerator/actions/workflows/pages/pages-build-deployment)

## Summary
This project is designed as a prototype for the [Project Backrooms](https://github.com/jonathan-x01/project-backroom-1.20.4) mod. With the new update, I restructured my project to allow others to easily create and implement their own algorithms into the map generator to allow more of a variety and help bring the adventure of the Backrooms into reality. I am still working on it to help make it easier to create and debug algorithms, but for now, I have made it easier to just implement the algorithm.

Deployment: https://jonathan-x01.github.io/BackroomsMapGenerator/

## Tutorial
It's very easy to implement your own algorithm, as it uses a registry.

### Implementing Algorithms
To implement/create your own algorithm, you will have to first create the file. 

1. Within `js/algorithms/algorithms`, create a new JS file with your algorithm name.
2. Create a class with the name of your algorithm. Now, make it extend the Algorithm class.
   ``` javascript
   class YourAlgorithm extends Algorithm {
      constructor(){
         super(width, height)
     }
   }
   ```
3. Next, for it to work properly, you will have to override the `generate()` function. This is where your logic will be.
   ``` javascript
   class YourAlgorithm extends Algorithm {
      constructor(){
         super(width, height)
     }

     generate(){
        // The logic of your algorithm.
     }
   }
   ```
4. Next, it won't work unless you import it into the `index.html` file. Placement matters, I have included a comment on where you place the `<script type="text/javascript" src="js/algorithms/algorithm/yourAlgorithm.js"></script>` at. That will be at the bottom of the `<body></body>` tags.
5. Now, you have to register your algorithm. So, within the `js/main.js` file, I put comments within the file of where you would add it. Everything you would need is close to the top.
6. (WIP)
